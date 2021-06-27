import { Subcommnad } from '../../Class/Subcommand';
import { ReplyError } from '../../Class/ReplyError';
import { ChannelNicknameDao } from '../../dao/ChannelNickname';
import { SubscriptionDao } from '../../dao/Subscription';
import { CommandOptionType } from '../../interface/CommandOptionType';

interface SubRemoveBody {
  name: string;
}

const SubRemoveSubcommand = new Subcommnad({
  name: 'remove',
  description: 'Unsubscribe a hololive member. Stop receiving his/her live notification.',
  type: CommandOptionType.SUB_COMMAND,
  options: [ {
    name: 'name',
    description: 'holomem\'s name',
    type: CommandOptionType.STRING,
    required: true,
  } ]
}, async (interaction, body: SubRemoveBody) => {
  const channelNicknameVal = await ChannelNicknameDao.get(body.name);
  if (!channelNicknameVal)
    throw new ReplyError('Holomem not found: ' + body.name);

  await SubscriptionDao.remove(interaction.channel.id, channelNicknameVal.channel.id);

  interaction.reply('Subscription removed: 【' + channelNicknameVal.channel.name + '】', false);
});

export {
  SubRemoveSubcommand,
};