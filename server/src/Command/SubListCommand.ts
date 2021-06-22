import { Command } from '../Class/Command';
import { SubscriptionDao } from '../dao/Subscription';
import { subscription } from '../entity/subscription';

const SubListCommand = new Command('list', 'List current subscriptions.', async (msg, serviceSet, messages) => {
  const list = await SubscriptionDao.list(msg.channel.id);

  let info = '【Subscription List】';
  if (list.length === 0)
    info += '\n No subscriptions';
  else {
    for (const sub of list) {
      info += formatSub(sub);
    }
  }

  msg.channel.send(info);
});

function formatSub (sub: subscription) {
  const emoji = sub.channel.emoji || ':point_right:';
  const prefix = '\n' + emoji + '  ';
  return prefix + sub.channel.name;
}

export {
  SubListCommand,
};