import { Command } from '../Class/Command';
import { CommandOption } from '../Class/CommandOption';
import { ReplyError } from '../Class/ReplyError';
import { ChannelNicknameDao } from '../dao/ChannelNickname';
import { SubscriptionDao } from '../dao/Subscription';

interface SubAddOption {
  nickname: string;
}

const SubAddCommand = new Command('add', 'Subscribe to a hololive member. Receive his/her live notification.', async (msg, serviceSet, messages, body: SubAddOption) => {
  const channelNicknameVal = await ChannelNicknameDao.get(body.nickname);
  if (!channelNicknameVal)
    throw new ReplyError('Holomem not found: ' + body.nickname);

  await SubscriptionDao.insert(msg.channel.id, channelNicknameVal.channel.id);
  msg.channel.send('Subscription added: 【' + channelNicknameVal.channel.name + '】');
});

SubAddCommand.addOption(new CommandOption('nickname', [ 'name', 'n' ], 'holomem name', true));

export {
  SubAddCommand,
};