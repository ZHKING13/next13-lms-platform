"use client";
import React, { MouseEvent, useRef,useEffect } from "react";
// import { Video } from "reactjs-media";
import Video from "next-video";
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
        <div className="video-containerss">
            <video
                src={src}
                controls
                height={400}
                width={800}
                poster="/b.jpeg"
                onContextMenu={disableRightClick}
                className="md:h-96"
                controlsList="nodownload"
            >
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;
