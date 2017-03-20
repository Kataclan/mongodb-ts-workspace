//#region [ Import React ]
import * as React from 'react';
import { MouseEventHandler } from 'react';
import WalkIcon from 'material-ui/svg-icons/maps/directions-walk';
import TimeIcon from 'material-ui/svg-icons/device/access-time';
//#endregion

//#region [ Import google.maps ]
//#endregion

///#region [ Props & State Definition ]
interface IGoogleMapState {

};
interface IRGoogleMapProps {
    //Styles
    containerStyle?: Object;
    //Map props
    defaultCenter: google.maps.LatLng,
    center?: google.maps.LatLng,
    zoom?: number;
    defaultZoom?: number;
    markers?: Array<google.maps.Marker>

    //Route props
    routeProps?: any;
    displayRouteInfo?: boolean;

    //Events
    onMapMounted: (map: google.maps.Map) => void;
};
///#endregion

export class RGoogleMap extends React.Component<IRGoogleMapProps, IGoogleMapState> {

    //Map default options if not declared in props
    private _defaultZoom = 5;
    private _defaultLat = 0;
    private _defaultLng = 0; //Tapioles
    private _defaultCenter = new google.maps.LatLng(this._defaultLat, this._defaultLng)

    private _refMapDiv: HTMLElement = null;
    private _mapOptions: google.maps.MapOptions;

    public map: google.maps.Map;

    //#region [ Constructor ]
    constructor(props: IRGoogleMapProps) {
        super(props);
        this._mapOptions = {
            center: props.defaultCenter !== null ? props.defaultCenter : this._defaultCenter,
            zoom: props.defaultZoom !== null ? props.defaultZoom : this._defaultZoom,
            disableDefaultUI: true
        };

        //Bindings
        this.setMapCenterByProps = this.setMapCenterByProps.bind(this);
        this.setMapMarkersByProps = this.setMapMarkersByProps.bind(this);
    }
    private initMap() {
        this.map = new google.maps.Map(this._refMapDiv, this._mapOptions);
        this.props.onMapMounted(this.map);
    }
    private setMapCenterByProps(props: IRGoogleMapProps) {
        if (props.center !== null) {
            this.map.setCenter(props.center);
        } else if (props.defaultCenter !== null) {
            this.map.setCenter(props.defaultCenter);
        } else {
            this.map.setCenter(this._defaultCenter);
        }
    }
    private setMapMarkersByProps(props: IRGoogleMapProps) {
        props.markers.forEach((m) => {
            m.setMap(this.map);
        });
    }
    //#endregion
    //#region [ Public methods ]
    public renderMapInfoWindow() {
        return (
            <div id="map-info-window" style={{ paddingTop: 10, paddingLeft: 10, margin: '5px 0px 0px 5px' }} key="map-info-window">
                <WalkIcon style={{ width: 20, height: 20 }} color="#ffffff" /> <span>{this.props.routeProps.DistText}</span><br />
                <TimeIcon style={{ width: 20, height: 20 }} color="#ffffff" /> <span>{this.props.routeProps.DurationText}</span>
            </div>
        );
    }
    //#endregion
    //#region [ Event Handlers ]
    //#endregion 

    //#region [ React Component ] 
    public componentDidMount() { this.initMap(); }
    public componentWillReceiveProps(nextProps: IRGoogleMapProps) {
        //Centramos mapa
        this.setMapCenterByProps(nextProps);
        //Añadimos marcadores
        this.setMapMarkersByProps(nextProps);
    }
    public render() {
        let mapComponent = (
            <div id="google-map" key="google-map" ref={(ref: HTMLElement) => { this._refMapDiv = ref; }}></div>
        );
        let routeInfoComponent = this.props.displayRouteInfo && this.props.routeProps !== null ?
            this.renderMapInfoWindow() : '';

        let content = [
            mapComponent,
            routeInfoComponent
        ];
        return (
            <div style={{ width: '100%', height: '100%' }}>{content}</div>
        );
    }
    //#endregion
}