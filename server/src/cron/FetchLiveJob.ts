import { CronJob } from 'cron';
import { LiveDao } from '../dao/Live';
import { LiveApiDao, LiveVedio } from '../dao/LiveApi';
import { LiveStatus } from '../entity/live';
import { logging } from '../utils/logging';

const NAMESPACE = 'FetchLiveJob';

export const FetchLiveJob = new CronJob('20 * * * * *', async function () {
  await fetchLiveDataAndInsertToDb();
}, null, true, 'America/Los_Angeles');


async function fetchLiveDataAndInsertToDb () {
  try {
    const liveApiResult = await LiveApiDao.list({
      max_upcoming_hours: 48,
      lookback_hours: 6,
      hide_channel_desc: 1,
    });

    if (liveApiResult.status !== 'success') return;
    await upsertIntoLiveDao(liveApiResult.data.live, LiveStatus.LIVE);
    await upsertIntoLiveDao(liveApiResult.data.upcoming, LiveStatus.UPCOMING);
    await upsertIntoLiveDao(liveApiResult.data.ended, LiveStatus.ENDED);
  } catch (error) {
    logging.error(NAMESPACE, error?.message, error);
  }
}

async function upsertIntoLiveDao (liveVedios: LiveVedio[], live_status: LiveStatus) {
  for (const liveVedio of liveVedios) {
    try {
      await LiveDao.upsert(liveVedio.id, {
        yt_video_key: liveVedio.yt_video_key || undefined,
        title: liveVedio.title,
        live_status,
        live_schedule: liveVedio.live_schedule ? new Date(liveVedio.live_schedule) : undefined,
        live_start: liveVedio.live_start ? new Date(liveVedio.live_start) : undefined,
        live_end: liveVedio.live_end ? new Date(liveVedio.live_end) : undefined,
        channel_id: liveVedio.channel.id,
      });
    } catch (error) {
      logging.error(NAMESPACE, error?.message, error);
    }
  }
}