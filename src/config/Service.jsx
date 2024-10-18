import axios from "axios";

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";

const GetVideos = async (query) => {
  const params = {
    part: "snippet",
    q: query,
    maxResults: 1,
    type: "video",
    key: process.env.NEXT_PUBLIC_YOUTUBE_APO_KEY,
  };

  const res = await axios.get(YOUTUBE_BASE_URL+"/search", { params });

  return res.data.items;
};

export default {
  GetVideos,
}