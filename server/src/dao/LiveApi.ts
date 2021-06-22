import axios from 'axios';
import { config } from '../system/config';
import { ChannelApiSuccessResponse } from './ChannelApi';

interface LiveApiOptions {
  channel_id?: number;
  max_upcoming_hours?: number;
  lookback_hours?: number;
  hide_channel_desc?: 1 | 0;
}

export interface LiveVedio {
  id: number;
  yt_video_key: string | null;
  bb_video_id: string | null;
  title: string;
  thumbnail: string | null;
  live_schedule: string | null;
  live_start: string | null;
  live_end: string | null;
  live_viewers: string | null;
  channel: ChannelApiSuccessResponse;
}

interface LiveApiSuccessResponse {
  live: LiveVedio[];
  upcoming: LiveVedio[];
  ended: LiveVedio[];
  cached: boolean;
}

interface LiveApiErrorResponse {
  message: string;
}

type LiveApiResponse = {
  status: 'success',
  data: LiveApiSuccessResponse,
} | {
  status: 'error',
  data: LiveApiErrorResponse,
};

class LiveApiDao {
  public async list (options: LiveApiOptions): Promise<LiveApiResponse> {
    try {
      const response = await axios({
        url: '/live',
        method: 'get',
        baseURL: config.HOLO_API.URL,
        headers: {
          'content-type': 'application/json',
          'charset': 'utf-8'
        },
        params: options,
        timeout: config.HOLO_API.TIMEOUT,
      });

      const data: {
        status: 'success',
        data: LiveApiSuccessResponse,
      } = {
        status: 'success',
        data: response.data as LiveApiSuccessResponse,
      };
      return data;
    } catch (error) {
      const message = error?.response?.data?.message || error?.message || 'Unknown error';
      const data: {
        status: 'error',
        data: LiveApiErrorResponse,
      } = {
        status: 'error',
        data: {
          message,
        },
      };

      return data;
    }
  }
}

const liveApiDao = new LiveApiDao();

export {
  liveApiDao as LiveApiDao,
};