import axios from 'axios';
import { CacheOptionType, ICache } from '../cache/ICahce';
import { LocalCache } from '../cache/LocalCache';
import { config } from '../system/config';

export interface ChannelApiSuccessResponse {
  id: number;
  yt_channel_id: string | null;
  bb_space_id: string | null;
  name: string;
  description: string | null;
  photo: string | null;
  published_at: string;
  twitter_link: string | null;
  last_fetch_timestamp: number;
  view_count?: number;
  subscriber_count?: number;
  video_count?: number;
}

interface ChannelApiErrorResponse {
  message: string;
}

type ChannelApiResponse = {
  status: 'success',
  data: ChannelApiSuccessResponse,
} | {
  status: 'error',
  data: ChannelApiErrorResponse,
};

const cache: ICache<ChannelApiResponse> = new LocalCache();
// 15 MINUTES
const SUCCESS_EXPIRE_MS = 1000 * 60 * 15;
// 2 MINUTES
const ERROR_EXPIRE_MS = 1000 * 60 * 2;

class ChannelApiDao {
  public async getById (holo_api_id: string): Promise<ChannelApiResponse> {
    const cacheVal = await cache.get(holo_api_id);
    if (cacheVal !== undefined)
      return cacheVal;

    try {
      const response = await axios({
        url: '/channels/' + holo_api_id,
        method: 'get',
        baseURL: config.HOLO_API.URL,
        headers: {
          'content-type': 'application/json',
          'charset': 'utf-8'
        },
        timeout: config.HOLO_API.TIMEOUT,
      });

      response.data.last_fetch_timestamp = new Date().getTime();
      const data: {
        status: 'success',
        data: ChannelApiSuccessResponse,
      } = {
        status: 'success',
        data: response.data as ChannelApiSuccessResponse,
      };
      await cache.set(holo_api_id, data, {
        type: CacheOptionType.EXPIRE_MS,
        expireMs: SUCCESS_EXPIRE_MS,
      });
      return data;
    } catch (error) {
      let message = error?.response?.data?.message || error?.message || 'Unknown error';
      message += ' id:"' + holo_api_id + '"';
      const data: {
        status: 'error',
        data: ChannelApiErrorResponse,
      } = {
        status: 'error',
        data: {
          message,
        },
      };

      await cache.set(holo_api_id, data, {
        type: CacheOptionType.EXPIRE_MS,
        expireMs: ERROR_EXPIRE_MS,
      });
      return data;
    }
  }
}

const channelApiDao = new ChannelApiDao();

export {
  channelApiDao as ChannelApiDao,
};