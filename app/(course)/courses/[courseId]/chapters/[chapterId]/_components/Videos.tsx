
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
                    "https://hips.hearstapps.com/hmg-prod/images/ripley-pa-108-011822-01629-r-661067043d66f.jpg?resize=980:*"
                }
            />
        </div>
    );
};

export default VideoPlayer;
