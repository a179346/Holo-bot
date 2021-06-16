import { Command } from '../Class/Command';
import { ReplyError } from '../Class/ReplyError';

const LiveListCommand = new Command('list', 'Fetches live, upcoming and recently ended streams.', async (msg, serviceSet, messages) => {
  throw new ReplyError('service not yet implemented.');
});

export {
  LiveListCommand,
};