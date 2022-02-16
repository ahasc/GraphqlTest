import axios from 'axios';

const VIDEO_API_URL = 'https://api.dailymotion.com/video';

export const getVideoInfosById = (id) =>
  axios.get(`${VIDEO_API_URL}/${id}`).then(({ data }) => data);