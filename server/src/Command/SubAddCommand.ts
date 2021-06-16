import { Command } from '../Class/Command';
import { CommandOption } from '../Class/CommandOption';
import { ReplyError } from '../Class/ReplyError';

const SubAddCommand = new Command('add', 'Subscribe to a hololive member. Receive his/her live notification.', async (msg, serviceSet, messages) => {
  throw new ReplyError('service not yet implemented.');
});

SubAddCommand.addOption(new CommandOption('name', [ 'name', 'n' ], 'holomem name', true));

export {
  SubAddCommand,
};