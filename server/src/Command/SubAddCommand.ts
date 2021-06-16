import { Command } from '../Class/Command';
import { CommandOption } from '../Class/CommandOption';

const SubAddCommand = new Command('add', 'Subscribe to a hololive member. Receive his/her live notification.', async (msg, serviceSet, messages) => {
  msg.reply('service not yet implemented.');
});

SubAddCommand.addOption(new CommandOption('name', [ 'name', 'n' ], 'holomem name', true));

export {
  SubAddCommand,
};