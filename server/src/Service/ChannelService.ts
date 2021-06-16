import { Service } from '../Class/Service';
import { ChannelGetCommand } from '../Command/ChannelGetCommand';

const ChannelService = new Service('channel', 'Everything about Hololive\'s channels.', 'get n=okayu');

ChannelService.addCommand(ChannelGetCommand);

export  {
  ChannelService,
};