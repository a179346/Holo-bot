import { Command } from '../Class/Command';
import { CommandOption } from '../Class/CommandOption';
import { ReplyError } from '../Class/ReplyError';

const ChannelGetCommand = new Command('get', 'Fetches info about a channel.', async (msg, serviceSet, messages) => {
  throw new ReplyError('service not yet implemented.');
});

ChannelGetCommand.addOption(new CommandOption('name', [ 'name', 'n' ], 'holomem name', true));

export {
  ChannelGetCommand,
};