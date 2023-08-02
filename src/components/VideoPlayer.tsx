import { FileToUpload } from "~/pages/create";

interface VideoPlayerProps {
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  className?: string;
  url: string;
}

export const VideoPlayer = ({
  controls = true,
  autoPlay = true,
  muted = true,
  loop = false,
  className = "",
  url,
}: VideoPlayerProps) => {
  return (
    <video
      controls={controls}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      className={className}
    >
      <source src={url} type="video/mp4" />
      Your browser dont support video
    </video>
  );
};
