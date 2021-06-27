import { CronJob } from 'cron';
import { LocalCache } from '../cache/LocalCache';
import { logging } from '../utils/logging';

const NAMESPACE = 'CleanLocalCacheJob';

export const CleanLocalCacheJob = new CronJob('0 * * * * *', async function () {
  try {
    await LocalCache.deleteExpired();
  } catch (error) {
    logging.error(NAMESPACE, error?.message, error);
  }
}, null, true, 'America/Los_Angeles');