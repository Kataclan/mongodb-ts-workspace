export class FileUpload {

    file: any;
    fileId: string;
    progress: number;
    dataTransfered: string;
    hasStarted: boolean = false;
    curPosition: number = -1;

    onUploadStart: (fileUpload: FileUpload) => void = ()=> {};
    onUploadFinish: (fileUpload: FileUpload) => void = () => {};
    onProgressUpdate: (fileUpload: FileUpload) => void = () => {};

    constructor(file: any, fileId: string) {
        this.file = file;
        this.fileId = fileId;
    }

    cancel() {

    }

}

export class UploadManager {

    endpoint: string;
    ws: WebSocket;

    filesToUpload: Array<FileUpload> = [];
    uploadingFile: FileUpload = null;

    readonly fragmentSize = 1000 * 1000;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    uploadFile(file: any, fileId: string): FileUpload {

        let fu = new FileUpload(file, fileId);

        if (this.uploadingFile == null) {
            this.uploadingFile = fu;
            this.startUpload();
        } else {
            this.filesToUpload.push(fu);
        }
        return fu;
    }

    cancelAllUploads() {

    }

    private startUpload() {

        if (this.ws == null) {

            this.ws = new WebSocket(this.endpoint);
            let ws = this.ws;
            let that = this;

            ws.onopen = (ev: Event) => {
                that.sendNextFragment();
            };

            ws.onclose = (ev: Event) => {
                // handle close
            }

            ws.onerror = (ev: Event) => {
                // handle error
            }
        }
    }

    private sendNextFragment() {

        let fragmentSize = this.fragmentSize;
        let ws = this.ws;

        if (this.uploadingFile == null)
            this.getNextFile();

        if (this.uploadingFile == null) {
            // no more files to send
            this.ws = null;
            ws.close();
            return;
        }

        // send next fragment of uploadingFile
        let f = this.uploadingFile;

        console.log("[UploadManager] Sending "+f.fileId+" at position "+f.curPosition+" of "+f.file.size);

        if (f.curPosition == -1) {

            // send file info at start
            var fileInfoMsg = JSON.stringify({
                fileId: f.fileId,
                filename: f.file.name,
                size: f.file.size,
                type: f.file.type,
                lastModifiedDate: f.file.lastModifiedDate,
                packetSize: -1
            });

            ws.onmessage = (evt: Event) => {
                f.curPosition = 0;
                f.onUploadStart(f);
                this.sendNextFragment();                
            }
            ws.send(fileInfoMsg);

            return;
        }


        if (f.curPosition == 0 && f.file.size < fragmentSize) {
            // send file at once
            ws.onmessage = (evt: Event) => {
                f.onProgressUpdate(f);
                f.onUploadFinish(f);
                this.getNextFile();
                this.sendNextFragment();
            }
            ws.send(f.file);
        }
        else {

            if ((fragmentSize + f.curPosition) >= f.file.size) {

                // send last fragment
                fragmentSize = f.file.size - f.curPosition;
                var slice = f.file.slice(f.curPosition, f.curPosition + fragmentSize)

                f.curPosition += fragmentSize;

                // send last fragment
                ws.onmessage = (evt: Event) => {
                    f.onProgressUpdate(f);
                    f.onUploadFinish(f);
                    this.getNextFile();
                    this.sendNextFragment();
                }
                ws.send(slice);
            }
            else {

                // send next fragment
                var slice = f.file.slice(f.curPosition, f.curPosition + fragmentSize)
                
                f.curPosition += fragmentSize;

                // send next fragment
                ws.onmessage = (evt: Event) => {
                    f.onProgressUpdate(f);
                    this.sendNextFragment();
                }
                ws.send(slice);
            }
        }
    }

    private getNextFile() {

        if (this.filesToUpload.length == 0) {
            this.uploadingFile = null;
            return;
        }

        this.uploadingFile = this.filesToUpload.shift();
    }

};

