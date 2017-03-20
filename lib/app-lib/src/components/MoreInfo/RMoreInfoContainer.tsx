//#region [ Import React ]
import * as React from 'react';
import * as $ from 'jquery';

import InfoIcon from 'material-ui/svg-icons/action/info';
//#endregion

//#region [ Props & State Definition ]
interface IRMoreInfoContainerProps {
	refContent?: (refContent: HTMLDivElement) => void;
	infoNode?: JSX.Element;
	infoText?: string;
	contentNode: JSX.Element;
	infoNodeHeight: number;
	infoNodeMaxHeight?: number;

	containerDivStyle?: any;
	enabled?: boolean;
}

interface IRPhotoCellState {

}
//#endregion
//#region [ Styles ]
var _containerDivStyle = {
	width: '100%',
	height: '100%',
	overflow: 'hidden'
};
var _infoDivStyle = {
	position: 'relative',
	width: '100%',
	height: 75,
	overflow: 'hidden',
	//background: 'linear-gradient(rgba(141, 0, 205, 1) 0%, rgba(255, 103, 78, 1) 100%)',
	//backgroundColor: 'rgba(141, 0, 205, 0.75)'
	backgroundColor: '#8d00cd',
	opacity: 0.7
};
let _infoContainerDivStyle = {
	textAlign: 'left',
	padding: 10,
	boxSizing: 'border-box',
	height: '100%',
	display: 'flex',
	alignItems: 'center'
};
let _infoSpanStyle = {
	color: 'white',
	fontFamily: 'Poppins',
	fontSize: 12
};
var _contentDivStyle = {
	width: '100%',
	height: 'calc(100% - 75px)',
	overflowY: 'hidden'
};
//#region

export class RMoreInfoContainer extends React.Component<IRMoreInfoContainerProps, IRPhotoCellState> {

	_containerDivRef: HTMLDivElement;

	_infoDivRef: HTMLDivElement;
	_infoNodeRef: HTMLDivElement;

	_defaultInfoDivHeight: number;
	_infoDivMaxHeight: number;
	_actualInfoDivHeight: number;
	_isInfoDivShowing: boolean;

	_contentDivRef: HTMLDivElement;
	_contentDivHeight: any;
	_contentDivMaxHeight: number;

	_containerTouchStartY: number;
	_mainContainerStartOffsetY: number;
	_contentScroll: number;

	//#region [ Constructor ]
	constructor(props: IRMoreInfoContainerProps) {
		super(props);
		//State
		this.initProps();
		this.state = {};
	}
	//#endregion
	//#region [ Handlers ]
	private initProps() {
		//Info div
		this._isInfoDivShowing = true;
		this._defaultInfoDivHeight = typeof this.props.infoNodeHeight !== "undefined" ?
			this.props.infoNodeHeight :
			75;
		this._actualInfoDivHeight = typeof this.props.infoNodeHeight !== "undefined" ?
			this.props.infoNodeHeight :
			75;
		this._infoDivMaxHeight = typeof this.props.infoNodeMaxHeight !== "undefined" ? this.props.infoNodeMaxHeight :
			150;
		//ContentDiv
		this._contentDivHeight = 'calc(100% - ' + this.props.infoNodeHeight + 'px)';
		this._contentScroll = 0;

		//Touch event handling
		this._containerTouchStartY = 0;
		this._mainContainerStartOffsetY = 0;
		this._contentScroll = 0;

		//Bindings
		this.setBindings = this.setBindings.bind(this);
	}
	private setBindings() {
		this.jQuerySetDivHeights = this.jQuerySetDivHeights.bind(this);
		this.handleContentTouchStart = this.handleContentTouchStart.bind(this);
		this.handleContentTouchMove = this.handleContentTouchMove.bind(this);
		this.handleContentTouchEnd = this.handleContentTouchEnd.bind(this);
		this.handleContentScroll = this.handleContentScroll.bind(this);
		this.bindTouchEvents = this.bindTouchEvents.bind(this);
		this.unbindTouchEvents = this.unbindTouchEvents.bind(this);

	}
	private jQuerySetDivHeights(infoDivHeight: number, animate: boolean = false) {
		console.log('Info height: ' + infoDivHeight);
		console.log('Content height: calc(100% - ' + infoDivHeight + 'px)');
		if (animate) {
			$(this._infoDivRef).stop().animate({ height: infoDivHeight });
		} else {
			$(this._infoDivRef).css({ height: infoDivHeight });
		}
		$(this._contentDivRef).css({
			height: infoDivHeight === 0 ? '100%' : 'calc(100% - ' + infoDivHeight + 'px)',
			overflow: infoDivHeight === 0 ? 'auto' : 'hidden'
		});
	}

	public handleContentTouchStart(e: TouchEvent) {
		this._containerTouchStartY = e.touches[0].pageY;
	}

	public handleContentTouchMove(e: TouchEvent) {
		let nextStartOffset = this._containerTouchStartY - e.touches[0].pageY; //Diferencia del recorrido desde el touch
		let startDistance = nextStartOffset > 0 ? nextStartOffset : -(nextStartOffset); //Distancia total recorrida desde el inicio del touch

		let infoDivNextHeight: number = this._actualInfoDivHeight;

		if (nextStartOffset > 0 && this._isInfoDivShowing) { //Sliding up && info showing
			let distance = startDistance - this._mainContainerStartOffsetY;
			infoDivNextHeight = this._actualInfoDivHeight - distance;
			if (infoDivNextHeight <= 0) {
				infoDivNextHeight = 0;
				this._isInfoDivShowing = false;
			}
			this.jQuerySetDivHeights(infoDivNextHeight);
		} else if (nextStartOffset > 0 && !this._isInfoDivShowing) { //Sliding up && info !showing

		} else if (nextStartOffset < 0 && this._isInfoDivShowing) { //Sliding down && info showing
			let distance = startDistance + this._mainContainerStartOffsetY; //Distancia recorrida desde el anterior move
			let auxHeight = this._actualInfoDivHeight + distance;
			infoDivNextHeight = auxHeight < this._infoDivMaxHeight ?
				auxHeight :
				this._infoDivMaxHeight;

			this.jQuerySetDivHeights(infoDivNextHeight);
		} else if (nextStartOffset < 0 && !this._isInfoDivShowing) { //Sliding down && info !showing
			let distance = startDistance + this._mainContainerStartOffsetY; //Distancia recorrida desde el anterior move
			if ($(this._contentDivRef).scrollTop() === 0) {
				infoDivNextHeight = distance;
				this._isInfoDivShowing = true;
				this.jQuerySetDivHeights(infoDivNextHeight);
			}
		}
		this._actualInfoDivHeight = infoDivNextHeight;
		this._mainContainerStartOffsetY = nextStartOffset;
	}

	public handleContentTouchEnd(e: TouchEvent) {
		let nextStartOffset = this._mainContainerStartOffsetY; //Diferencia del recorrido desde el touch
		let infoDivNextHeight: number = this._actualInfoDivHeight;;
		if (nextStartOffset > 0 && this._isInfoDivShowing) { //Sliding up && info showing
			infoDivNextHeight = infoDivNextHeight >= this._defaultInfoDivHeight ? this._defaultInfoDivHeight : 0;
			this.jQuerySetDivHeights(infoDivNextHeight, infoDivNextHeight === 0);
			this._isInfoDivShowing = infoDivNextHeight !== 0;
		} else if (nextStartOffset > 0 && !this._isInfoDivShowing) { //Sliding up && info !showing

		} else if (nextStartOffset < 0 && this._isInfoDivShowing) { //Sliding down && info showing
			infoDivNextHeight = this._defaultInfoDivHeight;
			this.jQuerySetDivHeights(infoDivNextHeight, true);
		} else if (nextStartOffset < 0 && !this._isInfoDivShowing) { //Sliding down && info !showing
			infoDivNextHeight = 0;
			this.jQuerySetDivHeights(infoDivNextHeight);
			this._isInfoDivShowing = false;
		}
		this._actualInfoDivHeight = infoDivNextHeight;
		//Reseteamos valores
		this._containerTouchStartY = 0;
		this._mainContainerStartOffsetY = 0;
	}
	public handleContentScroll(e: Event) {
		if (this._isInfoDivShowing) {
			e.preventDefault();
		}
		// if (this._isInfoDivShowing){
		// 	$(this._contentDivRef).scrollTop(0);
		// 	this.jQuerySetDivHeights(0, true);
		// 	this._isInfoDivShowing = false;
		// }
		//this._contentScroll = $(this._contentDivRef).scrollTop();
	}
	//#endregion

	//#region [ Render Partials ]
	//#endregion 

	//#region [ React Component ] 
	bindTouchEvents() {
		$(this._containerDivRef).on("touchstart", this.handleContentTouchStart.bind(this));
		$(this._containerDivRef).on("touchend", this.handleContentTouchEnd.bind(this));
		$(this._containerDivRef).on("touchmove", this.handleContentTouchMove.bind(this));
		$(this._contentDivRef).on("scroll", this.handleContentScroll.bind(this));
	}
	unbindTouchEvents() {
		$(this._containerDivRef).unbind("touchstart");
		$(this._containerDivRef).unbind("touchend");
		$(this._containerDivRef).unbind("touchmove");
		$(this._contentDivRef).unbind("scroll");
	}
	componentDidMount() {
		if (typeof this.props.enabled == "undefined" || this.props.enabled) {
			this.bindTouchEvents();
		}
	}
	componentWillReceiveProps(nextProps: IRMoreInfoContainerProps) {
		if (typeof this.props.enabled == "undefined" || nextProps.enabled) {
			this.bindTouchEvents();
		} else {
			this.unbindTouchEvents();
		}
	}
	componentWillMount() { }
	render() {
		_infoDivStyle.height = this._actualInfoDivHeight;
		_contentDivStyle.height = 'calc(100% - ' + this._actualInfoDivHeight + 'px)';
		return (
			<div key="content-container" ref={(r) => { this._containerDivRef = r; }} style={this.props.containerDivStyle}>
				<div
					key="more-info"
					ref={(r) => { this._infoDivRef = r; }}
					style={_infoDivStyle}>
					{
						typeof this.props.infoNode !== "undefined" ?
							this.props.infoNode :
							<div style={_infoContainerDivStyle}>
								<div style={{ float: 'left', width: 40 }}>
									<InfoIcon style={{ width: 30, height: 30, color: 'white', opacity: 0.7 }} />
								</div>
								<div style={{ float: 'left', height: '100%', display: 'flex', alignItems: 'center', paddingLeft: 10 }}>
									<span style={_infoSpanStyle}>{typeof this.props.infoText !== "undefined" ? this.props.infoText : ''}</span>
								</div>
							</div>
					}
				</div>
				<div
					key="content"
					ref={(r) => {
						this._contentDivRef = r;
						if (this.props.refContent !== undefined) {
							this.props.refContent(r);
						}
					}}
					style={_contentDivStyle}
				>
					{this.props.contentNode}
				</div>
			</div>
		);
	}
	//#endregion
}