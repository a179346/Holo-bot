import { CommandSet } from './Class/CommandSet';
import { ChannelCommand } from './Command/ChannelCommand';
import { SubscriptionCommand } from './Command/SubscriptionCommand';
import { LiveCommand } from './Command/LiveCommand';
import { PermissionCommand } from './Command/PermissionCommand';

const commandSet = new CommandSet();

commandSet.addCommand(ChannelCommand);
commandSet.addCommand(LiveCommand);
commandSet.addCommand(SubscriptionCommand);
commandSet.addCommand(PermissionCommand);

export {
  commandSet,
};