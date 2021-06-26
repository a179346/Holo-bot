import { CommandSet } from './Class/CommandSet';
import { ChannelCommand } from './Command/ChannelCommand';
import { SubscriptionCommand } from './Command/SubscriptionCommand';
import { LiveCommand } from './Command/LiveCommand';

const commandSet = new CommandSet();

commandSet.addCommand(ChannelCommand);
commandSet.addCommand(LiveCommand);
commandSet.addCommand(SubscriptionCommand);

export {
  commandSet,
};