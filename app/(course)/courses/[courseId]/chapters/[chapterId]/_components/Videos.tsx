
"use client"
import React, { MouseEvent, useRef } from "react";

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
            <video
                ref={videoRef}
                onClick={togglePlay}
                src={src}
                onContextMenu={disableRightClick}
                controls={false} // Pour désactiver les contrôles de lecture
            />
            <button onClick={togglePlay}>Lecture/Pause</button>
        </div>
    );
};

export default VideoPlayer;
