import { Command } from '../Class/Command';
import { ChannelGetSubcommand } from './Channel/ChannelGetSubcommand';

const ChannelCommand = new Command({
  name: 'channel',
  description: 'Everything about Hololive\'s channels.',
});

ChannelCommand.addSubcommand(ChannelGetSubcommand);

export  {
  ChannelCommand,
};