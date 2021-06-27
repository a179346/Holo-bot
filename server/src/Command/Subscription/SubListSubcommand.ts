import { Subcommnad } from '../../Class/Subcommand';
import { SubscriptionDao } from '../../dao/Subscription';
import { subscription } from '../../entity/subscription';
import { CommandOptionType } from '../../interface/CommandOptionType';

interface SubListBody {
  'private-reply': boolean;
}

const SubListSubcommand = new Subcommnad({
  name: 'list',
  description: 'List current subscriptions.',
  type: CommandOptionType.SUB_COMMAND,
  options: [ {
    name: 'private-reply',
    description: 'If false, reply is public.',
    type: CommandOptionType.BOOLEAN,
    required: true,
  }, ],
}, async (interaction, body: SubListBody) => {
  const list = await SubscriptionDao.list(interaction.channel.id);

  let info = '【Subscription List】';
  if (list.length === 0)
    info += '\n No subscriptions';
  else {
    for (const sub of list) {
      info += formatSub(sub);
    }
  }

  interaction.reply(info, body['private-reply']);
});

function formatSub (sub: subscription) {
  const emoji = sub.channel.emoji || ':point_right:';
  const prefix = '\n' + emoji + '  ';
  return prefix + sub.channel.name;
}

export {
  SubListSubcommand,
};