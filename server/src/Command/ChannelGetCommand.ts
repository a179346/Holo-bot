import { Command } from '../Class/Command';
import { CommandOption } from '../Class/CommandOption';

const ChannelGetCommand = new Command('get', 'Fetches info about a channel.', async (msg, serviceSet, messages) => {
  msg.reply('service not yet implemented.');
});

ChannelGetCommand.addOption(new CommandOption('name', [ 'name', 'n' ], 'holomem name', true));

export {
  ChannelGetCommand,
};