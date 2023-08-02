import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FileUpload } from "~/components/FileUpload";
import { api } from "~/utils/api";

export interface FileToUpload {
  file: File | null;
  localUrl: string;
}

export enum FileTypes {
  VIDEO,
  IMAGE,
}

const CreateVideoPage: NextPage = () => {
  const session = useSession();
  const user = session.data?.user;
  const router = useRouter();

  const uploadVideo = api.video.uploadVideo.useMutation({
    onSuccess: (video) => {
      router.push(`/create/${video.id}`);
    },
  });

  function onUpload(url: string) {
    uploadVideo.mutate({ videoUrl: url });
  }

  return (
    <div className="justify-cente m-5 flex flex-col items-center gap-5">
      <h1 className="text-3xl">Upload Video</h1>
      <FileUpload
        type={FileTypes.VIDEO}
        uploadPath={`${user?.name}/videos`}
        allowCancel
        onUpload={onUpload}
      />
    </div>
  );
};

export default CreateVideoPage;
