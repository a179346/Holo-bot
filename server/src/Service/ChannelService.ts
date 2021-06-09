import { Service } from '../Class/Service';
import { ChannelGetCommand } from '../Command/ChannelGetCommand';

const ChannelService = new Service('channel', 'Everything about Hololive\'s channels.');

ChannelService.addCommand(ChannelGetCommand);

export  {
  ChannelService,
};