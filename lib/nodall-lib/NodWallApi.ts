import { MessageHub } from './MessageHub';
import { NCIManager } from './nci/NCIManager'
import * as $ from 'jquery';

export interface AppDef {
    version: string;
    identifier: string;
    description: string;
    isAvailableOffline: { nod: boolean, mob: boolean };
    isAvailableUnwired: boolean;
};


class NodWallApi {

    isMobile: boolean;
    isChild: boolean;
    hasInitialized: boolean;
    msgHub: MessageHub;

    isDebug: boolean;
    debugServer: string;

    nciLayer: NCIManager;

    primaryColor: string = '#8d00cd';

    private isInIFrame(): boolean {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    constructor() {

        (window as any).NodWall = this;
        this.hasInitialized = false;

        this.isChild = this.isInIFrame();

        if (window.location.href.indexOf('-mob/dist/') > 0 && window.location.href.indexOf('app-menu') < 0) {
            console.log("DETECTED RUN from inside an IFRAME");
            this.isMobile = true;
            this.msgHub = new MessageHub("iframe");
        }

        if (window.location.href.indexOf('-nod/dist/') > 0 || window.location.href.indexOf('/AppData/') > 0) {
            this.isDebug = true;
            this.msgHub = new MessageHub(this.isChild ? "iframe" : "null");
        }

        if (window.location.href.indexOf('app-menu-mob/dist/') > 0) {
            this.isDebug = true;
            this.isMobile = true;
            if (window.location.href.indexOf('android_asset') <= 0 && window.location.href.indexOf('data/') <= 0 && window.location.href.indexOf('file://') == 0) {
                this.connectToServer("localhost");
            } else {
                //this.msgHub = new MessageHub("null");
                let that = this;
                if (window.location.href.indexOf("192.168.1.111") > 0)
                    this.connectToServer("192.168.1.111");
                else if (window.location.href.indexOf("192.168.1.83") > 0)
                    this.connectToServer("192.168.1.83");
                else if (window.location.href.indexOf("192.168.1.78") > 0)
                    this.connectToServer("192.168.1.78");
                else
                    //this.connectToServer("192.168.1.13");
                    this.connectToServer("192.168.137.222");
                /*
                                $.get('http://nexcode.io/nodall/')
                                    .done( function (data) {
                                        that.connectToServer(data);
                                    });
                                    */
            }
        }

        if (this.msgHub == undefined)
            this.msgHub = new MessageHub("192.168.137.2");

        this.msgHub.onConnectCallback = () => { if (this.onConnect != undefined) this.onConnect(); };

        if (this.isMobile) {
            this.nciLayer = new NCIManager();

            this.msgHub.subscribe('_mobilecmd')
                .on("showNCI", () => this.showNCI())
                .on("hideNCI", () => this.hideNCI());
        }

        this.msgHub.subscribe('_syscmd').on('onVideoEnd', () => {
            console.log("[NodWallApi] Recieved onVideoEnd, goint to execute callback");
            this.onVideoEnd();
        });
    }

    //#region [ Core API ]
    subscribe(channel: string) {
        return this.msgHub.subscribe(channel);
    }

    unsubscribe(channel: string) {
        return this.msgHub.unsubscribe(channel);
    }

    sendMessage(channel: string, cmdType: string, msgObj: any = {}) {
        if (this.isMobile) { // || this.msgHub) {
            this.msgHub.send(channel, cmdType, msgObj);
        } else {
            let msg = { channel: channel, type: cmdType, data: msgObj };
            //(window as any).wallSendMessage(channel, cmdType, msgObj);
            (window as any).wallSendMessage(JSON.stringify(msg));
        }
    }

    connectToServer(host: string): void {
        this.debugServer = host;

        // establish connection if needed
        var url = "ws://" + this.debugServer + ":8000/wsapi";
        if (this.msgHub === undefined) {
            this.msgHub = new MessageHub(url);
        } else if (this.msgHub !== undefined || this.msgHub.ws_url != url) {
            this.msgHub.connectTo(url);
        }
    }

    getVersion(): string {
        return "NodWallApi 0.0.0";
    }

    getUser(): any {

    }

    openApp(appPath: string): void {
        this.sendMessage("_syscmd", "openApp", { app: appPath });
    }

    exitApp(): void {
        this.sendMessage("_syscmd", "closeApp", {});
        /*
        var msg = { channel: "_sysapp_", type: "close", data: {}};

        if (this.isChild) {
            parent.postMessage(msg, '*');
        }*/
    }

    showWebLayer(): void {
        this.setWebLayerOpacity(1);
    }

    hideWebLayer(): void {
        this.setWebLayerOpacity(0);
    }

    setWebLayerOpacity(opacity: number = 1): void {
        this.sendMessage("_syscmd", "setWebLayerOpacity", { opacity: opacity });
    }

    onConnect: () => void;
    onError: () => void;

    onReceiveMessage: (msg: any) => void = (msg: any) => {
        //console.log("[onReceiveMessage] "+JSON.stringify(msg));
    };

    //#endregion


    //#region [ Apps API ]

    getAllAppsInfo(): AppDef[] {
        return [{
            "version": "0.0.1",
            "identifier": "app-yoga",
            "description": "My app description",
            "isAvailableOffline": {
                "nod": false,
                "mob": true
            },
            "isAvailableUnwired": true
        }
        ];
    }

    launchApp(id: string): void {

    }
    //#endregion

    //#region [ NCI API ]
    showNCI(): void {
        if (this.isMobile) {
            this.nciLayer.showNCI();
            this.sendMessage('_syscmd', 'nciOpened', {});
        } else {
            this.sendMessage("_mobilecmd", "showNCI");
        }
        this.onShowNCI();
    }

    hideNCI(): void {
        if (this.isMobile) {
            this.nciLayer.hideNCI();
            this.sendMessage('_syscmd', 'nciClosed', {});
        } else {
            this.sendMessage("_mobilecmd", "hideNCI");
        }
        this.onHideNCI();
    }

    onShowNCI(): void { };
    onHideNCI(): void { };

    onTouchStart(ev: TouchEvent): void { }
    onTouchMove(ev: TouchEvent): void { }
    onTouchEnd(ev: TouchEvent): void { }
    //#endregion

    //#region [ Video API ]

    videoCurrentPos: number;
    videoDuration: number;

    getVideoCurrentPos(): number {
        return this.videoCurrentPos;
    }

    getVideoDuration(): number {
        return this.videoDuration;
    }

    videoPlaybackRate(rate: number = 1): void {
        this.sendMessage("_syscmd", "videoPlaybackRate", { rate: rate });
    }

    videoLoad(file: string): void {
        this.sendMessage("_syscmd", "videoLoad", { file: file });
    }

    videoPlay(): void {
        this.sendMessage("_syscmd", "videoPlay");
    }

    videoPause(): void {
        this.sendMessage("_syscmd", "videoPause");
    }

    videoStop(): void {
        this.sendMessage("_syscmd", "videoStop");
    }

    videoSetVolume(volume = 1): void {
        this.sendMessage("_syscmd", "videoSetVolume", { volume: volume });
    }

    videoLoop(times = -1): void {
        this.sendMessage("_syscmd", "videoLoop", { times: times })
    }

    onVideoEnd(): void { }

    //#enregion

    //#region [ TV API ]

    tvOn() {
        this.sendMessage("_syscmd", "tvOn");
    }

    tvOff() {
        this.sendMessage("_syscmd", "tvOff");
    }

    tvTune(freq: number, onid = -1, tsid = -1, sid = -1) {
        this.sendMessage("_syscmd", "tvTune", { freq: freq, onid: onid, tsid: tsid, sid: sid });
    }

    tvSetChannel(ch: string) {
        this.sendMessage("_syscmd", "tvSetChannel", { channel: ch });
    }

    tvSetVolume(volume = 1) {
        this.sendMessage("_syscmd", "tvSetVolume", { volume: volume });
    }

    //#endregion

    //#region [ Mood Layer API ]

    showMessage() {
        this.sendMessage("_syscmd", "showMessage")
    }

    showBackground() {
        this.sendMessage("_syscmd", "showBackground")
    }

    hideBackground() {
        this.sendMessage("_syscmd", "hideBackground")
    }

    showPanel() {

    }
    //#enregion

    //#region [ Ext App  API ]

    startExtApp(app: string) {
        this.sendMessage("_syscmd", "startExtApp", { app: app });
    }

    stopExtApp(app: string) {
        this.sendMessage("_syscmd", "stopExtApp", { app: app });
    }

    sendToExtApp(app: string, cmd: string, params: any[] = []) {
        this.sendMessage("_syscmd", "sendToExtApp", { app: app, cmd: cmd, params: params })
    }
    //#enregion

};

export default new NodWallApi();
