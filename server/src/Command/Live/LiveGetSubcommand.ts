import { Subcommand } from '../../Class/Subcommand';
import { ReplyError } from '../../Class/ReplyError';
import { ChannelNicknameDao } from '../../dao/ChannelNickname';
import { LiveDao } from '../../dao/Live';
import { LiveStatus } from '../../entity/live';
import { Lib } from '../../lib/common';
import { CommandOptionType } from '../../interface/CommandOptionType';

const LiveGetSubcommand = new Subcommand({
  name: 'get',
  description: 'Fetches live, upcoming and recently ended streams.',
  type: CommandOptionType.SUB_COMMAND,
  options: [ {
    name: 'name',
    description: 'holomem\'s name Ex. "okayu"',
    type: CommandOptionType.STRING,
    required: true,
  }, {
    name: 'private-reply',
    description: 'If false, reply is public.',
    type: CommandOptionType.BOOLEAN,
    required: true,
  }, ]
}, async (interaction, options) => {
  const name = options.get('name')?.value;
  const privateReply = options.get('private-reply')?.value;
  if (typeof name !== 'string')
    throw new ReplyError('Invalid Options: "name"');
  if (typeof privateReply !== 'boolean')
    throw new ReplyError('Invalid Options: "private-reply"');

  const channelNicknameVal = await ChannelNicknameDao.get(name);
  if (!channelNicknameVal)
    throw new ReplyError('Holomem not found: ' + name);

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

  interaction.reply({
    content: info,
    ephemeral: privateReply,
  });
});

export {
  LiveGetSubcommand,
};