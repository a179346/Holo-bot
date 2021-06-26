import { Subcommnad } from '../../Class/Subcommand';
import { ReplyError } from '../../Class/ReplyError';
import { ChannelNicknameDao } from '../../dao/ChannelNickname';
import { SubscriptionDao } from '../../dao/Subscription';
import { CommandOptionType } from '../../interface/CommandOptionType';

const SubAddSubcommand = new Subcommnad({
  name: 'add',
  description: 'Subscribe to a hololive member. Receive his/her live notification.',
  type: CommandOptionType.SUB_COMMAND,
  options: [ {
    name: 'name',
    description: 'holomem\'s name',
    type: CommandOptionType.STRING,
    required: true,
  } ]
}, async (interaction) => {
  const body = {
    nickname: 'okayu',
  };
  const channelNicknameVal = await ChannelNicknameDao.get(body.nickname);
  if (!channelNicknameVal)
    throw new ReplyError('Holomem not found: ' + body.nickname);

  await SubscriptionDao.insert(interaction.channel.id, channelNicknameVal.channel.id);
  interaction.channel.send('Subscription added: 【' + channelNicknameVal.channel.name + '】');
});

export {
  SubAddSubcommand,
};