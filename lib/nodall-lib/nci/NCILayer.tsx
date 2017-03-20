//#region [ Import React ]
import * as React from 'react';
//#endregion

//#region [ Import Material-UI  ]
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconClear from 'material-ui/svg-icons/content/clear';
//#endregion

/*import { Button, Grid, Row, Col } from 'react-bootstrap';*/

import TouchGestureManager from './TouchGestureManager';

import NodWall from '../NodWallApi';

const styles = {
    div: {
        width: '100%',
        height: '100%',
        position: 'fixed',
        zIndex: 66666,
        top: 0,
        left: 0,
        //backgroundColor: 'rgba(0, 0, 199, 1)',
        backgroundImage: 'linear-gradient(#8d00cd 0%, #ff674e 100%)',
        color: 'white',
        fontFamily: 'verdana'
    }
}

interface NCILayerState {
    isOpen?: boolean;
    actions: any;
    curActionIdx: number;
    firstImage?: string;
    primaryColor?: string;
    startInfo?: boolean;
}

export default class NCILayer extends React.Component<{}, NCILayerState> {

    gestureManager: TouchGestureManager = new TouchGestureManager();
    isFirstImageShowing: boolean = true;

    touchIdsInUse: number[] = [];

    actionShowTimeout: any; // Interval for clearing
    showingInfo: boolean;
    isButtonClick: boolean;

    //#region [ Constructor ]
    constructor(props: NCILayerState) {
        super(props);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handleShowActionsInterval = this.handleShowActionsInterval.bind(this);

        this.state = { isOpen: false, startInfo: false, actions: [], curActionIdx: -1, primaryColor: '#8d00cd' };
        this.showingInfo = false;
        this.isButtonClick = false;
    }
    //#endregion

    //#region [ Handlers ]
    handleTouchStart(ev: any) {
        let te = ev as TouchEvent;
        let t = te.touches[0];
        //console.log(`Start: ${t.clientX}, ${t.clientY}`);



        let wndWidth = window.innerWidth;
        let wndHeight = window.innerHeight;

        for (let i = 0; i < te.touches.length; ++i) {
            let ct = te.touches[i];
            let id = ct.identifier;

            if (this.touchIdsInUse.indexOf(id) < 0) {

                NodWall.sendMessage("touchinject", "add", {
                    id: ct.identifier,
                    px: ct.clientX / wndWidth,
                    py: ct.clientY / wndHeight,
                })
                this.touchIdsInUse.push(id);
            }
        }

        //console.log(JSON.stringify({ touchEvent : te }));

        //NodWall.onTouchStart(te);
        //NodWall.sendMessage("_syscmd", "touchStart", { touchEvent: tx });

        this.gestureManager.handleTouchStart(te);
        te.preventDefault();

        this.showingInfo = false;
        clearInterval(this.actionShowTimeout);
        if (this.isButtonClick) {
            this.setState({
                startInfo: false
            });
            this.isButtonClick = false;
        }
        else {
            this.setState({
                startInfo: false,
                curActionIdx: -1
            });

        }
    }

    handleTouchMove(ev: any) {
        let te = ev as TouchEvent;
        let t = te.touches[0];
        //console.log(`Move: ${t.clientX}, ${t.clientY}`);

        let wndWidth = window.innerWidth;
        let wndHeight = window.innerHeight;

        for (let i = 0; i < te.touches.length; ++i) {
            let ct = te.touches[i];
            let id = ct.identifier;

            if (this.touchIdsInUse.indexOf(id) >= 0) {

                NodWall.sendMessage("touchinject", "update", {
                    id: ct.identifier,
                    px: ct.clientX / wndWidth,
                    py: ct.clientY / wndHeight,
                })
            }
        }

        this.gestureManager.handleTouchMove(te);
        te.preventDefault();
    }

    handleTouchEnd(ev: any) {
        let te = ev as TouchEvent;
        console.log("TouchEnd");

        let wndWidth = window.innerWidth;
        let wndHeight = window.innerHeight;

        for (let j = 0; j < this.touchIdsInUse.length; ++j) {
            let id = this.touchIdsInUse[j];
            let ct;

            let idxOf = -1;
            for (let i = 0; i < te.touches.length; ++i) {
                if (te.touches[i].identifier == id) {
                    idxOf = i;
                    ct = te.touches[i];
                }
            }

            if (idxOf == -1) {

                NodWall.sendMessage("touchinject", "remove", {
                    id: id,
                    px: 0.5,
                    py: 0.5,
                })

                this.touchIdsInUse.splice(j, 1);
                --j;
            }
        }

        //NodWall.onTouchEnd(te);
        //NodWall.sendMessage("_syscmd", "touchEnd", { touchEvent: tx });

        this.gestureManager.handleTouchEnd(te);
        te.preventDefault();
    }
    handleCloseClick(evt: any) {
        evt.preventDefault();
        setTimeout(() => {
            NodWall.hideNCI();
        }, 220);
        //NodWall.sendMessage("_syscmd", "clicked", { pt: 5 });

    }
    handleActionClick(action: any, idx: number) {
        this.isButtonClick = true;
        console.log('clicked on ' + action.name + ' with index ' + idx);
        if (this.showingInfo) {
            this.showingInfo = false;
            clearInterval(this.actionShowTimeout);
        }
        this.setState({
            actions: this.state.actions,
            curActionIdx: idx
        });

        let that = this;
        setTimeout(function () {
            if (idx == that.state.curActionIdx) {
                that.setState({
                    actions: that.state.actions,
                    curActionIdx: -1
                });
            }
        }, 2000);
    }
    handleShowActionsInterval() {
        if (!this.showingInfo) {
            this.showingInfo = true;
            this.setState({
                curActionIdx: 0
            },
                () => {
                    this.actionShowTimeout = setInterval(() => {
                        let idxAction = this.state.curActionIdx + 1;
                        if (idxAction <= this.state.actions.length - 1) {
                            this.setState({
                                curActionIdx: idxAction
                            });
                        }
                        else {
                            // this.setState({
                            //     curActionIdx: -1
                            // });
                            // this.showingInfo = false;
                            // clearInterval(this.actionShowTimeout);
                            this.setState({
                                curActionIdx: 0
                            });
                        }
                    }, 2000);
                }
            );

        }
    }
    //#endregion

    renderAction(action: any, idx: number): any {
        console.log('renderAction ' + action.name);

        let styles = {
            padding: 6, textAlign: 'center', width: 100,
            border: '3px solid ' + ((this.state.curActionIdx == idx) ? 'white' : 'rgba(1, 1, 1, 0)'),
            fontSize: '15px',
            transition: 'border-color 0.5s linear'
        };
        return (<div key={action.name} onTouchStart={(te) => this.handleActionClick(action, idx)} onClick={() => this.handleActionClick(action, idx)} style={styles}>{action.name}</div>);
    }

    renderActionImage(action: any, idx: number) {
        return (<div key={"action" + idx} style={{
            background: 'url(' + this.state.actions[idx].image + ') no-repeat center',
            backgroundSize: 'contain',
            margin: '15%', height: '70%', width: '70%', position: 'fixed',
            transition: 'opacity 0.5s linear',
            opacity: (idx == this.state.curActionIdx) ? 1 : 0
        }}></div>);
    }

    renderFirstImage() {
        return (<div key="firstImgDiv" style={{
            background: 'url(' + this.state.firstImage + ') no-repeat center',
            backgroundSize: 'contain',
            margin: '15%', height: '70%', width: '70%', position: 'fixed',
            transition: 'opacity 0.5s linear',
            opacity: this.isFirstImageShowing ? 1 : 0
        }}></div>);
    }

    //#region [ React Component ]
    componentWillUpdate(nextProps: any, nextState: NCILayerState) {
        if (nextState.startInfo) {
            this.handleShowActionsInterval();
        }
    }
    componentDidMount() {

    }
    render() {
        if (this.state.isOpen) {
            return (
                <MuiThemeProvider>
                    <div className="myclassName" style={styles.div}
                        onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove} onTouchEnd={this.handleTouchEnd}>
                        <div style={{ position: 'absolute', left: 0, padding: 10 }} >
                            <IconClear onClick={(evt) => this.handleCloseClick(evt)} onTouchStart={(evt) => this.handleCloseClick(evt)} style={{ width: 48, height: 48, color: 'white' }} />
                            {/*<input type="text" name="search" placeholder="Search..."
                            style={{fontFamily:'Poppins', background: 'transparent', lineHeight: '3em', border: '3px solid white', paddingLeft:10}} 
                            ></input>*/}
                        </div>
                        {this.state.firstImage == undefined ? "" : this.renderFirstImage()}
                        {this.state.actions.map((a: any, i: number) => this.renderActionImage(a, i))}
                        <div style={{ position: 'absolute', width: '99%', bottom: 20, left: '0.5%', textAlign: 'justify', display: 'flex', justifyContent: 'space-around', flexFlow: 'row wrap' }}>
                            {this.state.actions.map((a: any, i: number) => this.renderAction(a, i))}
                            <span style={{ width: '100%', display: 'inline-block', fontSize: 0, lineHeight: 0 }}></span>
                        </div>
                    </div>
                </MuiThemeProvider>
            );
        }
        else if ((window as any).appName != 'app-menu') {

            let bkgColor = this.state.primaryColor;

            /*return (
                <div>
                    <div style={{ height: 80, width: '100%', textAlign: 'center', fontFamily: 'Poppins', position: 'fixed', backgroundColor: 'rgba(255, 255, 255, 0.95)', borderBottom: '1px solid ' + bkgColor, zIndex: 6666 }}>
                        <div style={{ position: 'absolute', marginTop: 30, left: 10, backgroundColor: bkgColor, width: 32, height: 32 }} onClick={() => NodWall.exitApp()}><div style={{ background: 'url(../../../resources/images/grid-icon.png)', backgroundSize: 'contain', width: '100%', height: '100%' }}></div></div>
                        <div style={{ position: 'absolute', marginTop: 30, right: 12, backgroundColor: bkgColor, width: 32, height: 32 }} onClick={() => NodWall.sendMessage('_syscmd', 'powerToggle', {})}><div style={{ background: 'url(../../../resources/images/power-icon.png)', backgroundSize: 'contain', width: '100%', height: '100%' }}></div></div>
                        <div style={{ border: '2px solid ' + bkgColor, color: bkgColor, margin: '30px auto', minWidth: '25%', maxWidth: '40%', fontSize: 18, fontWeight: 'bold', padding: 2 }}>{(window as any).appName}</div>
                    </div>
                    <div style={{ height: 80, width: '100%' }}></div>
                </div>
            );*/

            let _barContainerStyle = {
                display: 'flex',
                alignItems: 'center',
                height: 80,
                width: '100%',
                textAlign: 'center',
                fontFamily: 'Poppins',
                position: 'fixed',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderBottom: '1px solid ' + bkgColor,
                zIndex: 6666
            };

            let _leftStyle = {
                float: 'left',
                height: '100%',
                width: 60
            };
            let _rightStyle = {
                float: 'right',
                height: '100%',
                width: 60
            };
            let _centerStyle = {
                margin: '0 auto',
                height: '100%'
            };

            return (
                <div style={{ backgroundColor: 'white', width: '100%', height: 80, padding: 1 }}>

                    <div style={{ position: 'absolute', top: 25, right: 12, width: 32, height: 32 }}>
                        <div onClick={() => NodWall.sendMessage('_syscmd', 'powerToggle', {})} style={{ background: "url('../../../resources/images/power-icon.png')", backgroundSize: 'contain', width: '100%', height: '100%' }}></div>
                    </div>
                    <div style={{ position: 'absolute', top: 25, left: 12, width: 32, height: 32 }}>
                        <div onClick={() => NodWall.exitApp()} style={{ background: "url('../../../resources/images/grid-icon.png')", backgroundSize: 'contain', width: '100%', height: '100%' }}></div>
                    </div>
                    <div style={{ margin: '0 auto', width: 120, textAlign: 'center', height: '4em', paddingTop: 24 }}>
                        <div style={{
                            border: '2px solid #8d00cd',
                            color: '#8d00cd',
                            margin: '0 auto',
                            fontSize: 18,
                            fontWeight: 'bold',
                            padding: 2
                        }}>
                            {(window as any).appName}
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (<div></div>)
        }
    }
    //#endregion 
}
