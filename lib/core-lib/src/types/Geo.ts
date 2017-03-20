export class GeoCoord {
    public lat: number;
    public lon: number;
    constructor(lat?: number, lon?: number) {
        this.lat = lat === null ? 0 : lat;
        this.lon = lon === null ? 0 : lon;
    }
    public isEqual(to: GeoCoord): Boolean {
        return this.lat === to.lat && this.lon === to.lon;
    }
}

export class GeoLocation {
    public address: string;
    public coord: GeoCoord;
    public moreInfo: string;
}