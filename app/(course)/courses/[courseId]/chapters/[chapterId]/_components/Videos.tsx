
"use client"
import React, { MouseEvent, useRef } from "react";
import { Video } from "reactjs-media";
interface VideoPlayerProps {
    src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const disableRightClick = (event: MouseEvent<HTMLVideoElement>) => {
        event.preventDefault();
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    };

    return (
        <div>
            <Video
                src={src}
                controls={true}
                height={500}
                width={800}
                poster={
                    ""
                }
            />
        </div>
    );
};

export default VideoPlayer;
