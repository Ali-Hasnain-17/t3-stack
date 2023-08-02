import { FileToUpload, FileTypes } from "~/pages/create";
import { VideoPlayer } from "./VideoPlayer";
import Image from "next/image";

interface FilePreviewProps {
  file: FileToUpload;
  type: FileTypes;
}

export const FilePreview = ({ file, type }: FilePreviewProps) => {
  const className = "mb-5 h-48 w-full";
  if (type === FileTypes.VIDEO) {
    return (
      <VideoPlayer
        controls
        autoPlay
        muted
        loop
        className={`${className} border`}
        url={file.localUrl}
      />
    );
  }
  return (
    <Image
      width={1}
      height={1}
      className={className}
      src={file.localUrl}
      alt="Thumbnail Image"
    />
  );
};
