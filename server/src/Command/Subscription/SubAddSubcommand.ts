import { Subcommnad } from '../../Class/Subcommand';
import { ReplyError } from '../../Class/ReplyError';
import { ChannelNicknameDao } from '../../dao/ChannelNickname';
import { SubscriptionDao } from '../../dao/Subscription';
import { CommandOptionType } from '../../interface/CommandOptionType';

interface SubAddBody {
  name: string;
}

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
}, async (interaction, body: SubAddBody) => {
  const channelNicknameVal = await ChannelNicknameDao.get(body.name);
  if (!channelNicknameVal)
    throw new ReplyError('Holomem not found: ' + body.name);

  await SubscriptionDao.insert(interaction.channel.id, channelNicknameVal.channel.id);

  interaction.reply('Subscription added: 【' + channelNicknameVal.channel.name + '】', false);
});

export {
  SubAddSubcommand,
};