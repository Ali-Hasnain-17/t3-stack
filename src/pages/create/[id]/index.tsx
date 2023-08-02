import { NextPage } from "next";
import { useRouter } from "next/router";
import { useRouter as useRouterNew } from "next/navigation";
import { FileUpload } from "~/components/FileUpload";
import { VideoPlayer } from "~/components/VideoPlayer";
import { api } from "~/utils/api";
import { FileTypes } from "..";
import { useSession } from "next-auth/react";
import { VideoDetailsForm } from "~/components/VideoDetailsForm";
import { useState } from "react";

const CreateVideoDetailsPage: NextPage = () => {
  const router = useRouter();
  const newRouter = useRouterNew();
  const session = useSession();
  const user = session.data?.user;
  const videoId = router.query.id as string;
  const [thumbnail, setThumbnail] = useState<string>();

  const videoInfo = api.video.getVideoUrl.useQuery({
    videoId,
  });
  const videoUrl = videoInfo.data?.videoUrl;

  const addVideo = api.video.addVideoDetails.useMutation({
    onSuccess: (video) => {
      router.push("/");
    },
  });

  function onUpload(url: string) {
    setThumbnail(url);
  }

  function onSubmit(title: string, description: string) {
    if (thumbnail) {
      addVideo.mutate({ videoId, title, description, thumbnailUrl: thumbnail });
    }
  }

  return (
    <div className="flex p-10">
      <div className="flex flex-grow flex-col px-5">
        <div className="flex flex-col items-center gap-5">
          <div className="text-center text-2xl">Upload thumbnail</div>
          <FileUpload
            uploadPath={`${user?.name}/thumbnails`}
            type={FileTypes.IMAGE}
            onUpload={onUpload}
            width="w-3/4"
          />
        </div>
        <div className="width-full my-5 h-0 border"></div>
        <div className="flex flex-col items-center gap-5">
          <div className="text-center text-2xl">Add Video Details</div>
          <VideoDetailsForm onSubmit={onSubmit} thumbnail={thumbnail} />
        </div>
      </div>
      <div>
        {videoUrl && (
          <VideoPlayer loop muted autoPlay controls url={videoUrl} />
        )}
      </div>
    </div>
  );
};

export default CreateVideoDetailsPage;
