import { Subcommand } from '../../Class/Subcommand';
import { ReplyError } from '../../Class/ReplyError';
import { ChannelNicknameDao } from '../../dao/ChannelNickname';
import { LiveDao } from '../../dao/Live';
import { LiveStatus } from '../../entity/live';
import { Lib } from '../../lib/common';
import { CommandOptionType } from '../../interface/CommandOptionType';
import { MessageEmbed } from 'discord.js';

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

  const prefix = Lib.getChannelPrefix(channelNicknameVal.channel);
  let info = prefix + channelNicknameVal.channel.name;
  const liveEmbeds: MessageEmbed[] = [];
  const upcomingEmbeds: MessageEmbed[] = [];

  if (lives.length === 0)
    info += '\nThere is no scheduled live...';
  else {
    for (const live of lives) {
      const embedOptions = new MessageEmbed({
        title: live.title,
        // description: live.
        url: Lib.youtubeVideoUrl(live.yt_video_key),
        timestamp: live.live_schedule,
        // color?: ColorResolvable;
        // fields?: EmbedFieldData[];
        author: {
          name: channelNicknameVal.channel.name,
          url: Lib.youtubeChannelUrl(channelNicknameVal.channel.yt_channel_id),
        },
        image: {
          url: Lib.youtubeThumbnailUrl(live.yt_video_key),
        },
        // video?: Partial<MessageEmbedVideo> & { proxy_url?: string };
        footer: {
          text: live.live_status,
        }
      });

      if (live.live_status === LiveStatus.LIVE)
        liveEmbeds.push(embedOptions);
      else if (live.live_status === LiveStatus.UPCOMING)
        upcomingEmbeds.push(embedOptions);
    }
  }

  interaction.reply({
    content: info,
    embeds: [ ...liveEmbeds, ...upcomingEmbeds ],
    ephemeral: privateReply,
  });
});

export {
  LiveGetSubcommand,
};