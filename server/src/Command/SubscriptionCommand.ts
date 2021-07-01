import { Layer2Command } from '../Class/Layer2Command';
import { ReplyError } from '../Class/ReplyError';
import { PermissionType } from '../entity/permission';
import { Lib } from '../lib/common';
import { SubAddSubcommand } from './Subscription/SubAddSubcommand';
import { SubListSubcommand } from './Subscription/SubListSubcommand';
import { SubRemoveSubcommand } from './Subscription/SubRemoveSubcommand';

const SubscriptionCommand = new Layer2Command({
  name: 'subscription',
  description: 'Subscribe to a hololive member. Receive notification when he/she go live.',
}, async (interaction) => {
  const permissionResult = await Lib.checkPermission(interaction, PermissionType.subscription, true);
  if (!permissionResult)
    throw new ReplyError('Permission denied. Please contact the channel owner.');
});

SubscriptionCommand.addSubcommand(SubAddSubcommand);
SubscriptionCommand.addSubcommand(SubListSubcommand);
SubscriptionCommand.addSubcommand(SubRemoveSubcommand);

export  {
  SubscriptionCommand,
};