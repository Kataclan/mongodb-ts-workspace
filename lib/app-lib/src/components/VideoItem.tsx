import * as React from 'react';
import { Styles } from '../../src';

interface IVideoItemProps {
    video: any;
    isVisible: boolean;
    playIconSrc: string;
    onVideoClick: (canal: any) => void;
}

export class VideoItem extends React.Component<IVideoItemProps, {}>{
    constructor(props: IVideoItemProps) {
        super(props);
    }
    render() {
        let imgStyle = (Object as any).assign(
            {},
            Styles.VideoItem.videoImg,
            {
                backgroundImage: "url('thumbs/" + this.props.video.ICON.trim() + "')",
                //backgroundSize: "cover"
            }
        );
        let infoNode = !this.props.isVisible ? <div style={{ display: 'none' }} /> : (
            <div
                key={"ch" + this.props.video.NAME}
                onClick={() => this.props.onVideoClick(this.props.video)}
                style={Styles.VideoItem.mainContainer}
            >
                <div style={Styles.VideoItem.contentContainer}>
                    <div style={imgStyle}>
                        <img src={"img/icon_play_01.png"} style={{ width: 40, height: 40, opacity: 0.8 }} />
                    </div>
                    <div style={Styles.VideoItem.videoInfoContainer}>
                        <div style={Styles.VideoItem.videoTitleContainer}>
                            <span style={Styles.VideoItem.videoTitle}>{this.props.video.NAME}</span>
                            <span style={Styles.VideoItem.videoTime}>10.25</span>
                        </div>
                        <p style={Styles.VideoItem.description}>
                            {this.props.video.DESCRIPTION == undefined || this.props.video.DESCRIPTION == "" ? "·" : this.props.video.DESCRIPTION}
                        </p>
                    </div>
                </div>
            </div>
        );
        return infoNode;
    }
}