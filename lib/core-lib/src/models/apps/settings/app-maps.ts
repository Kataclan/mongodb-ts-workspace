import { GeoLocation } from "../../../types/Geo";

export module AppMaps {
    export class MapPointTypes {
        public readonly Home = "home";
        public readonly Bar = "bar";
        public readonly Cinema = "cinema";
        public readonly Museum = "museum";
        public readonly Monument = "momument";
        public readonly Nightclub = "night_club";
        public readonly Park = "park";
        public readonly Restaurant = "restaurant";
        public readonly Theater = "movie_theater";
        public readonly None = "none";
        public readonly ShoppingMall = "shopping_mall";
    }
    export interface MapPoint {
        type: string;
        title: string;
        description: string;
        location: GeoLocation;
    }
    export interface MapConfig {
        name: string;
        home: MapPoint;
        mapPoints: Array<MapPoint>;
    }

    export interface NodeSettings {
        configs: Array<MapConfig>;
    }
    export interface UserSettings { }
}