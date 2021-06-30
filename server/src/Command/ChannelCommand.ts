import { Layer2Command } from '../Class/Layer2Command';
import { ChannelGetSubcommand } from './Channel/ChannelGetSubcommand';

const ChannelCommand = new Layer2Command({
  name: 'channel',
  description: 'Everything about Hololive\'s channels.',
});

ChannelCommand.addSubcommand(ChannelGetSubcommand);

export  {
  ChannelCommand,
};