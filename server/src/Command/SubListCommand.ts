import { Command } from '../Class/Command';
import { ReplyError } from '../Class/ReplyError';

const SubListCommand = new Command('list', 'List current subscriptions.', async (msg, serviceSet, messages) => {
  throw new ReplyError('service not yet implemented.');
});

export {
  SubListCommand,
};