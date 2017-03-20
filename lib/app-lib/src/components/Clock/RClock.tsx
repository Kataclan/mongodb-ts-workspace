import * as React from 'react';
import * as $ from 'jquery';


function getDateWithTimeZoneOffset(dstOffset: number, rawOffset: number): Date {
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (1000 * (dstOffset + rawOffset)));
    return nd;
}

interface IClockProps {
    dstOffset?: number;
    rawOffset?: number;
    textStyle?: any;
    areSecondsVisible?: boolean;
}
interface IClockState {
    time: Date;
    id: number;
}
var _textStyle: any = {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 50
}

class RClock extends React.Component<IClockProps, IClockState>{

    static get defaultProps() {
        let props: IClockProps = {
            areSecondsVisible: true
        };
        return props;
    }
    getTime(props: IClockProps): Date {
        return typeof props.dstOffset !== "undefined" &&
            typeof props.rawOffset !== "undefinded" ?
            getDateWithTimeZoneOffset(
                props.dstOffset,
                props.rawOffset
            ) :
            new Date();
    }
    constructor(props: IClockProps) {
        super(props);
        this.state = {
            time: this.getTime(props),
            id: 0
        }
    }

    componentDidMount() {
        let id = this.state.id;
        id = setInterval(function () {
            let state = this.state;
            state.time = this.getTime(this.props);
            this.setState(state);
        }.bind(this), 1000);
        this.setState({ id: id });
    }
    componentWillUnmount() {
        clearInterval(this.state.id);
    }
    render() {
        let dateText = this.state.time.toTimeString();
        dateText = dateText.split(' ')[0];
        if (!this.props.areSecondsVisible) {
            dateText = dateText.slice(0, dateText.length - 3);
        }

        let style = typeof this.props.textStyle !== "undefined" ?
            Object.assign({}, _textStyle, this.props.textStyle) :
            _textStyle;
        return (
            <h1 style={style}>
                {dateText}
            </h1>
        );
    }
}
export default RClock;
