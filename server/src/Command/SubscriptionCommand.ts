import { Command } from '../Class/Command';
import { SubAddSubcommand } from './Subscription/SubAddSubcommand';
import { SubListSubcommand } from './Subscription/SubListSubcommand';
import { SubRemoveSubcommand } from './Subscription/SubRemoveSubcommand';

const SubscriptionCommand = new Command({
  name: 'subscription',
  description: 'Subscribe to a hololive member. Receive notification when he/she go live.',
});

SubscriptionCommand.addSubcommand(SubAddSubcommand);
SubscriptionCommand.addSubcommand(SubListSubcommand);
SubscriptionCommand.addSubcommand(SubRemoveSubcommand);

export  {
  SubscriptionCommand,
};