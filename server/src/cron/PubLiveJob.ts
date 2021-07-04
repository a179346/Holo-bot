import { CronJob } from 'cron';
import { bot } from '../bot';
import { LiveDao } from '../dao/Live';
import { SubscriptionDao } from '../dao/Subscription';
import { Lib } from '../lib/common';
import { logging } from '../utils/logging';

const NAMESPACE = 'PubLiveJob';

export const PubLiveJob = new CronJob('30 * * * * *', async function () {
  await LiveNotification();
}, null, true, 'America/Los_Angeles');


async function LiveNotification () {
  try {
    await Lib.delay(2000);
    const lives = await LiveDao.fetchWaitingLives();
    for (const live of lives) {
      const subs = await SubscriptionDao.getChannelSubs(live.channel.id);
      if (subs.length > 0) {
        const prefix = Lib.getChannelPrefix(live.channel);
        let info = prefix + '【' + live.channel.name + '】 is streaming!';
        info += '\n' + Lib.youtubeVideoUrl(live.yt_video_key);

        for (const sub of subs) {
          try {
            await bot.sendMessageToChannel(sub.discord_channel_id, info);
          } catch (error) {
            //
          }
        }
      }

      await LiveDao.setPublished(live);
    }
  } catch (error) {
    logging.error(NAMESPACE, error?.message, error);
  }
}