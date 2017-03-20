export interface IGoogleGeoCodeRequest {
    address?: string;
    lat?: number;
    lng?: number;
    latLng?: google.maps.LatLng;
    googleRequest?: google.maps.GeocoderRequest;
    callback: (response: IGoogleGeoCodeResponse) => {};
}

export interface IGoogleGeoCodeResponse {
    results: Array<google.maps.GeocoderResult>;
    status: google.maps.GeocoderStatus;
}

class GeoCoder {

    public GeoCoder: google.maps.Geocoder;

    constructor() {
        this.GeoCoder = new google.maps.Geocoder();
    }

    public GeoCode(request: IGoogleGeoCodeRequest) {
        var callback = request.callback;

        var location, address;
        location = null;
        address = null;
        if (request.hasOwnProperty('lat') && request.hasOwnProperty('lng')) {
            location = new google.maps.LatLng(request.lat, request.lng);
        }
        else if (request.hasOwnProperty('address')) {
            address = request.address;
        }
        else {
            alert('Error: Request Not Valid');
            return;
        }

        var googleRequest: google.maps.GeocoderRequest = {
            address: address
        }
        this.GeoCoder.geocode(googleRequest, function (results, status) {
            let response: IGoogleGeoCodeResponse = {
                results: results,
                status: status
            };
            callback(response);
        });
    }
}
export var GoogleGeoCoder = new GeoCoder();