import { Command } from '../Class/Command';
import { CommandOption } from '../Class/CommandOption';
import { ReplyError } from '../Class/ReplyError';
import { ChannelNicknameDao } from '../dao/ChannelNickname';
import { LiveDao } from '../dao/Live';
import { LiveStatus } from '../entity/live';
import { Lib } from '../lib/common';

interface LiveListOption {
  nickname: string;
}

const LiveListCommand = new Command('list', 'Fetches live, upcoming and recently ended streams.', async (msg, serviceSet, messages, body: LiveListOption) => {
  const channelNicknameVal = await ChannelNicknameDao.get(body.nickname);
  if (!channelNicknameVal)
    throw new ReplyError('Holomem not found: ' + body.nickname);

  const lives = await LiveDao.fetch(channelNicknameVal.channel.id, [ LiveStatus.UPCOMING, LiveStatus.LIVE ]);

  let info = '【' + channelNicknameVal.channel.name + '】';
  const emoji = channelNicknameVal.channel.emoji || ':point_right:';
  const prefix = '\n' + emoji + '  ';

  if (lives.length === 0)
    info += prefix + 'There is no scheduled live...';
  else {
    for (const live of lives) {
      if (live.live_status === LiveStatus.LIVE) {
        info += prefix + 'Streaming live  :red_circle:';
        info += '\n' + Lib.youtubeVideoUrl(live.yt_video_key);
      }
    }
    for (const live of lives) {
      if (live.live_status === LiveStatus.UPCOMING) {
        if (live.live_schedule)
          info += prefix + 'Upcoming live  (' + live.live_schedule.toISOString() + ')';
        else
          info += prefix + 'Upcoming live';
        info += '\n' + Lib.youtubeVideoUrl(live.yt_video_key);
      }
    }
  }

  msg.channel.send(info);
});

LiveListCommand.addOption(new CommandOption('nickname', [ 'name', 'n' ], 'holomem name', true));

export {
  LiveListCommand,
};