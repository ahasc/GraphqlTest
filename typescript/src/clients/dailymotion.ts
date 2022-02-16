import axios from 'axios';

import { Video } from '../graphql/types/video';

export class DailymotionApiClient {
  private readonly VIDEO_API_URL = 'https://api.dailymotion.com/video';

  getVideoInfosById(id: string): Promise<Video> {
    return axios.get(`${this.VIDEO_API_URL}/${id}`).then(({ data }) => data);
  }
}
