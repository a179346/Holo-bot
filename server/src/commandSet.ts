import { CommandSet } from './Class/CommandSet';
import { ChannelCommand } from './Command/ChannelCommand';
import { SubscriptionCommand } from './Command/SubscriptionCommand';
import { LiveCommand } from './Command/LiveCommand';
import { PermissionCommand } from './Command/PermissionCommand';

const commandSet = new CommandSet();

commandSet.set(ChannelCommand.options.name, ChannelCommand);
commandSet.set(LiveCommand.options.name, LiveCommand);
commandSet.set(SubscriptionCommand.options.name, SubscriptionCommand);
commandSet.set(PermissionCommand.options.name, PermissionCommand);

export {
  commandSet,
};