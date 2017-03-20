import * as React from 'react';

interface ILoadingProps {
    containerStyle?: any;
    imgStyle?: any;
    imgSrc: string;

    text?: string;
    textStyle?: any;
}
var _defaultContainerStyle: any = {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'inherit'
}
var _defaultImgStyle: any = {
    width: 50,
    height: 50
}

var _defaultSpanTxtStyle: any = {
    margin: 0,
    padding: 0,
    fontSize: 'inherit',
    color: '#000000',
    marginTop: 15
}

class RLoading extends React.Component<ILoadingProps, {}>{
    constructor(props: ILoadingProps) {
        super(props);
    }

    render() {
        let containerStyle = typeof this.props.containerStyle === "undefined" ? _defaultContainerStyle : this.props.containerStyle;
        let imgStyle = typeof this.props.imgStyle === "undefined" ? _defaultImgStyle : this.props.imgStyle;
        let txtStyle = typeof this.props.textStyle === "undefined" ? _defaultSpanTxtStyle : this.props.textStyle;
        return (
            <div style={_defaultContainerStyle}>
                <img src={this.props.imgSrc} style={imgStyle} />
                <span style={txtStyle}>{(typeof this.props.text !== "undefined" || this.props.text !== '') && this.props.text}</span>
            </div>
        );
    }
}
export default RLoading;