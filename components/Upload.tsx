import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import React from "react";

interface UploadProps {
    onChange: (info: any) => void;
}

const Upload: React.FC<UploadProps> = ({ onChange }) => {
    return (
        <CldUploadWidget
            onSuccess={(results) => {
                console.log("Public ID", results?.info);
                onChange(results?.info);
            }}
            
            uploadPreset="cobalt"
        >
            {({ open }) => {
                return <button onClick={() => open()}>Upload an Image</button>;
            }}
        </CldUploadWidget>
    );
};

export default Upload;
