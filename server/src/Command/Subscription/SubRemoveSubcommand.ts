import { Subcommand } from '../../Class/Subcommand';
import { ReplyError } from '../../Class/ReplyError';
import { ChannelNicknameDao } from '../../dao/ChannelNickname';
import { SubscriptionDao } from '../../dao/Subscription';
import { CommandOptionType } from '../../interface/CommandOptionType';

const SubRemoveSubcommand = new Subcommand({
  name: 'remove',
  description: 'Unsubscribe a hololive member. Stop receiving his/her live notification.',
  type: CommandOptionType.SUB_COMMAND,
  options: [ {
    name: 'name',
    description: 'holomem\'s name Ex. "okayu"',
    type: CommandOptionType.STRING,
    required: true,
  } ]
}, async (interaction, options) => {
  const name = options.getString('name');
  if (typeof name !== 'string')
    throw new ReplyError('Invalid Options: "name"');

  const channelNicknameVal = await ChannelNicknameDao.get(name);
  if (!channelNicknameVal)
    throw new ReplyError('Holomem not found: ' + name);

  await SubscriptionDao.remove(interaction.channelId, channelNicknameVal.channel.id);

  interaction.reply({
    content: 'Subscription removed: 【' + channelNicknameVal.channel.name + '】',
    ephemeral: false,
  });
});

export {
  SubRemoveSubcommand,
};