import Image, { StaticImageData } from "next/image";
import { VscAccount } from "react-icons/vsc";

interface ProfileImageProps {
  src?: string | undefined | null;
  className?: string;
}

const ProfileImage = ({ src, className = "" }: ProfileImageProps) => {
  if (src == null) {
    return <VscAccount size={30} />;
  }
  return (
    <Image
      src={src as string | StaticImageData}
      alt="profile_image"
      width={30}
      height={30}
      className={`rounded-full ${className}`}
    />
  );
};

export default ProfileImage;
