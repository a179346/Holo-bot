import { Service } from '../Class/Service';
import { SubAddCommand } from '../Command/SubAddCommand';
import { SubListCommand } from '../Command/SubListCommand';
import { SubRemoveCommand } from '../Command/SubRemoveCommand';

const SubscriptionService = new Service('sub', 'Subscribe to a hololive member. Receive notification when he/she go live.');

SubscriptionService.addCommand(SubAddCommand);
SubscriptionService.addCommand(SubListCommand);
SubscriptionService.addCommand(SubRemoveCommand);

export  {
  SubscriptionService,
};