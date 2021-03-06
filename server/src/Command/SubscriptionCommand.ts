import { NestedCommand } from '../Class/NestedCommand';
import { ReplyError } from '../Class/ReplyError';
import { PermissionType } from '../entity/permission';
import { Lib } from '../lib/common';
import { SubAddSubcommand } from './Subscription/SubAddSubcommand';
import { SubListSubcommand } from './Subscription/SubListSubcommand';
import { SubRemoveSubcommand } from './Subscription/SubRemoveSubcommand';

const SubscriptionCommand = new NestedCommand({
  name: 'subscription',
  description: 'Subscribe to a hololive member. Receive notification when he/she go live.',
}, [
  SubAddSubcommand,
  SubListSubcommand,
  SubRemoveSubcommand,
]);

SubscriptionCommand.setCheckEvent(async (interaction) => {
  const permissionResult = await Lib.checkPermission(interaction, PermissionType.subscription, true);
  if (!permissionResult)
    throw new ReplyError('Permission denied. Please contact the channel owner.');
});

export  {
  SubscriptionCommand,
};