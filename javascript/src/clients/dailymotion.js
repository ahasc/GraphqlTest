import axios from 'axios';

export class DailymotionApiClient {
  VIDEO_API_URL = 'https://api.dailymotion.com/video';

  getVideoInfosById(id) {
    return axios.get(`${this.VIDEO_API_URL}/${id}`).then(({ data }) => data);
  }
}
