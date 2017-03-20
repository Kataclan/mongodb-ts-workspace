
export class MessageHub {

    ws: WebSocket;
    ws_url: string;
    channels: { [type: string]: Channel; } = {};
    isOpen: boolean = false;
    isChild: boolean = false;
    childWindow: any;

    onConnectCallback: () => void;

    constructor(endpoint: string) {
        console.log("[MessageHub] To endpoint " + endpoint);
        if (endpoint == "null") return;
        if (endpoint == "iframe") {
            console.log("[MessageHub] Creating as iframe");
            this.isChild = true;
            addEventListener('message', (ev: MessageEvent) => {
                let msg = ev.data;
                if (msg.channel == 'innerPost')
                    this.isOpen = msg.connected;
                else if (msg.channel !== undefined && msg.type !== undefined) {
                    this.onMessage(msg);
                }
            });
            return;
        }

        addEventListener('message', (ev: MessageEvent) => {
            let msg = ev.data;
            if (msg.channel !== undefined && msg.type !== undefined) {
                this.onMessage(msg);

                // forward message
                var msgStr = JSON.stringify(msg);
                this.sendInternal(msgStr);
            }
        });

        if (endpoint == "null") return;

        this.ws_url = endpoint;
        this.connect();
    }

    connectTo(endpoint: string) {
        this.ws_url = endpoint;
        this.connect();
    }

    connect(): void {
        if (this.isOpen) return;

        this.ws = new WebSocket(this.ws_url);
        this.ws.onopen = () => {
            this.isOpen = true;
            console.log("WebSocket to " + this.ws_url + " is open");
            if (this.childWindow != undefined)
                this.childWindow.postMessage({ channel: 'innerPost', 'connected': true }, "*");

            if (this.onConnectCallback !== undefined) {
                this.onConnectCallback();
            }
        };

        this.ws.onerror = () => {
            this.isOpen = false;
            let that = this;
            setTimeout(() => { that.connect() }, 100);
        };

        this.ws.onclose = () => {
            if (this.isOpen) {
                console.log("WebSocket to " + this.ws_url + " closed");
                this.isOpen = false;
                let that = this;
                if (this.childWindow != undefined)
                    this.childWindow.postMessage({ channel: 'innerPost', 'connected': false }, "*");
                setTimeout(() => { that.connect() }, 100);
            }
        };

        this.ws.onmessage = (event: MessageEvent) => {
            let obj = JSON.parse(event.data);
            console.log("Received message " + obj.channel + " - " + obj.type + " " + JSON.stringify(obj.data));
            this.onMessage(obj);
            if (this.childWindow !== undefined && this.childWindow != null) {
                //console.log("%c[MessageHub] Posting to child "+obj.type+" "+obj.data, "font-weight:bolder");
                this.childWindow.postMessage(obj, "*");
            }
        };
    }

    setChild(childWindow: any) {
        //console.log("%c[MessageHub] setting child iframe to "+childWindow, "font-weight:bolder");
        this.childWindow = childWindow;
        setTimeout(() => {
            if (this.childWindow != undefined)
                this.childWindow.postMessage({ channel: 'innerPost', 'connected': this.isOpen }, "*");
        }, 200);
    }

    subscribe(channel: string): Channel {
        let ch: Channel = this.channels[channel];
        if (ch === undefined) {
            ch = new Channel(this, channel);
            this.channels[channel] = ch;
        }
        return ch;
    }

    unsubscribe(channel: string) {
        if (channel in this.channels) {
            delete this.channels[channel];
        }
    }

    sendInternal(msgStr: string) {
        if (this.isOpen) {
            this.ws.send(msgStr);
        } else {
            setTimeout(this.sendInternal, 100, msgStr);
        }
    }

    sendToChild(msgChannel: string, msgType: string, msgData: any) {
        var msg = { channel: msgChannel, type: msgType, data: msgData };
        if (this.childWindow !== undefined && this.childWindow != null) {
            console.log("send to child " + JSON.stringify(msg));
            this.childWindow.postMessage(msg, "*");
        }
    }

    send(msgChannel: string, msgType: string, msgData: any) {
        var msg = { channel: msgChannel, type: msgType, data: msgData };

        //console.log("[send] "+msgChannel+" "+msgType+" - "+JSON.stringify(msgData));

        if (this.isChild) {
            //console.log("[postMessage] "+msgChannel+" "+msgType);
            parent.postMessage(msg, '*');
        } else if (this.ws == undefined) {
            //(window as any).wallSendMessage(msgChannel, msgType, msgData);
            let msg = { channel: msgChannel, type: msgType, data: msgData };
            (window as any).wallSendMessage(JSON.stringify(msg));
        }
        else {
            var msgStr = JSON.stringify(msg);
            this.sendInternal(msgStr);
        }
    }

    onMessage(msg: any) {
        //console.log('[onMessage] '+msg.channel+'-'+msg.type+' '+JSON.stringify(msg));
        if (msg.channel && this.channels[msg.channel]) {
            this.channels[msg.channel].execute(msg);
        }
    }
}

export class Channel {

    hub: MessageHub;
    name: string;
    handlers: { [type: string]: any[] } = {};

    constructor(hub: MessageHub, name: string) {
        this.hub = hub;
        this.name = name;
    }

    on(msgType: string, handler: any): Channel {
        let handlerList = this.handlers[msgType];
        if (handlerList === undefined) {
            handlerList = [];
            this.handlers[msgType] = handlerList;
        }
        handlerList.push(handler);
        return this;
    }

    execute(msgObj: any) {
        //console.log("Executing at "+this.name+" "+JSON.stringify(msgObj));
        var handlerList = this.handlers[msgObj.type]
        if (handlerList) {
            for (let i = 0; i < handlerList.length; ++i) {
                handlerList[i](msgObj.data);
            }
        }
    }

}