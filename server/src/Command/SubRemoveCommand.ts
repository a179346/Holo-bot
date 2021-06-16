import { Command } from '../Class/Command';
import { CommandOption } from '../Class/CommandOption';

const SubRemoveCommand = new Command('rm', 'Unsubscribe a hololive member. Stop receiving his/her live notification.', async (msg, serviceSet, messages) => {
  msg.reply('service not yet implemented.');
});

SubRemoveCommand.addOption(new CommandOption('name', [ 'name', 'n' ], 'holomem name', true));

export {
  SubRemoveCommand,
};