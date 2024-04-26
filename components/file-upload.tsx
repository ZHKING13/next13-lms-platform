"use client";

import toast from "react-hot-toast";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";

interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter;
}
type UploadFileResponse =
    | { data: UploadData; error: null }
    | { data: null; error: UploadError };

type UploadData = {
    key: string;
    url: string;
    name: string;
    size: number;
};

type UploadError = {
    code: string;
    message: string;
    data: any;
};
export const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res?) => {
                onChange(res?.[0]?.url);
            }}
            onUploadError={(error: Error) => {
                toast.error(`${error?.message}`);
            }}
        />
    );
};
