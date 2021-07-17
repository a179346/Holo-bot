import { CommandSet } from './Class/CommandSet';
import { ChannelCommand } from './Command/ChannelCommand';
import { SubscriptionCommand } from './Command/SubscriptionCommand';
import { LiveCommand } from './Command/LiveCommand';
import { PermissionCommand } from './Command/PermissionCommand';
import { AboutCommand } from './Command/AboutCommand';
import { GreetingCommand } from './Command/GreetingCommand';

const commandSet = new CommandSet();

commandSet.set(ChannelCommand.options.name, ChannelCommand);
commandSet.set(LiveCommand.options.name, LiveCommand);
commandSet.set(SubscriptionCommand.options.name, SubscriptionCommand);
commandSet.set(PermissionCommand.options.name, PermissionCommand);
commandSet.set(AboutCommand.options.name, AboutCommand);
commandSet.set(GreetingCommand.options.name, GreetingCommand);

export {
  commandSet,
};