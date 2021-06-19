import { Command } from '../Class/Command';
import { CommandOption } from '../Class/CommandOption';
import { ReplyError } from '../Class/ReplyError';
import { ChannelApiDao } from '../dao/ChannelApi';
import { ChannelNicknameDao } from '../dao/ChannelNickname';
import { Lib } from '../lib/common';

interface ChannelGetOption {
  nickname: string;
}

const ChannelGetCommand = new Command('get', 'Fetches info about a channel.', async (msg, serviceSet, messages, body: ChannelGetOption) => {
  const channelNicknameVal = await ChannelNicknameDao.get(body.nickname);
  if (!channelNicknameVal)
    throw new ReplyError('Holomem not found: ' + body.nickname);

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
    info += prefix + 'Subscriber count:  ' + channelApiVal.data.subscriber_count;
  if (channelApiVal.data.video_count)
    info += prefix + 'Video count:  ' + channelApiVal.data.video_count;

  msg.channel.send(info);
});

ChannelGetCommand.addOption(new CommandOption('nickname', [ 'name', 'n' ], 'holomem name', true));

export {
  ChannelGetCommand,
};