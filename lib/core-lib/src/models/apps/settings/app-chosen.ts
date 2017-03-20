export module AppChosen {

    export interface Playlist {
        id: string;
        title: string;
        thumbnail: string;
        photos: string[];
    }
    export class NodeSettings { }
    export class UserSettings {
        playlists: Playlist[];
        constructor() {
            this.playlists = new Array<Playlist>();
        }
    }
}
