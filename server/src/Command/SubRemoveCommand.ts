import { Command } from '../Class/Command';
import { CommandOption } from '../Class/CommandOption';
import { ReplyError } from '../Class/ReplyError';
import { ChannelNicknameDao } from '../dao/ChannelNickname';
import { SubscriptionDao } from '../dao/Subscription';

interface SubRemoveOption {
  nickname: string;
}

const SubRemoveCommand = new Command('rm', 'Unsubscribe a hololive member. Stop receiving his/her live notification.', async (msg, serviceSet, messages, body: SubRemoveOption) => {
  const channelNicknameVal = await ChannelNicknameDao.get(body.nickname);
  if (!channelNicknameVal)
    throw new ReplyError('Holomem not found: ' + body.nickname);

  await SubscriptionDao.remove(msg.channel.id, channelNicknameVal.channel.id);
  msg.channel.send('Subscription removed: 【' + channelNicknameVal.channel.name + '】');
});

SubRemoveCommand.addOption(new CommandOption('nickname', [ 'name', 'n' ], 'holomem name', true));

export {
  SubRemoveCommand,
};