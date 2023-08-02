import { type NextPage } from "next";
import { api } from "~/utils/api";

const HomePage: NextPage = () => {
  const videos = api.video.getAllVideos.useQuery();
  console.log(videos);
  return (
    <>
      <div className=""></div>
    </>
  );
};

export default HomePage;
