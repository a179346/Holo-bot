import { NestedCommand } from '../Class/NestedCommand';
import { ChannelGetSubcommand } from './Channel/ChannelGetSubcommand';

const ChannelCommand = new NestedCommand({
  name: 'channel',
  description: 'Everything about Hololive\'s channels.',
}, [
  ChannelGetSubcommand,
]);

export  {
  ChannelCommand,
};