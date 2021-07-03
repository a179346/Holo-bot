import { Subcommnad } from '../../Class/Subcommand';
import { ReplyError } from '../../Class/ReplyError';
import { ChannelApiDao } from '../../dao/ChannelApi';
import { ChannelNicknameDao } from '../../dao/ChannelNickname';
import { Lib } from '../../lib/common';
import { CommandOptionType } from '../../interface/CommandOptionType';

const ChannelGetSubcommand = new Subcommnad({
  name: 'get',
  description: 'Fetches info about a channel.',
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
}, async (interaction) => {
  const subCommandOptions = interaction.options.first()?.options;
  if (!subCommandOptions)
    throw new ReplyError('Invalid Options');
  const name = subCommandOptions.get('name')?.value;
  const privateReply = subCommandOptions.get('private-reply')?.value;
  if (typeof name !== 'string')
    throw new ReplyError('Invalid Options: "name"');
  if (typeof privateReply !== 'boolean')
    throw new ReplyError('Invalid Options: "private-reply"');

  const channelNicknameVal = await ChannelNicknameDao.get(name);
  if (!channelNicknameVal)
    throw new ReplyError('Holomem not found: ' + name);

  const channelApiVal = await ChannelApiDao.getById(channelNicknameVal.channel.holo_api_id.toString());
  if (channelApiVal.status === 'error')
    throw new ReplyError(channelApiVal.data.message);
  // const prefix = '\n╰ ';
  // const prefix = '\n:arrow_forward:  ';
  const emoji = channelNicknameVal.channel.emoji || ':point_right:';
  const prefix = '\n' + emoji + '  ';

  let info = '【' + channelApiVal.data.name + '】';
  if (channelApiVal.data.yt_channel_id)
    info += prefix + 'Youtube:  ' + Lib.youtubeChannelUrl(channelApiVal.data.yt_channel_id);
  if (channelApiVal.data.twitter_link)
    info += prefix + 'Twitter:  ' + Lib.twitterUserUrl(channelApiVal.data.twitter_link);
  if (channelApiVal.data.subscriber_count)
    info += prefix + 'Subscriber count:  ' + channelApiVal.data.subscriber_count.toLocaleString('en');
  if (channelApiVal.data.video_count)
    info += prefix + 'Video count:  ' + channelApiVal.data.video_count.toLocaleString('en');

  interaction.reply({
    content: info,
    ephemeral: privateReply,
  });
});

export {
  ChannelGetSubcommand,
};