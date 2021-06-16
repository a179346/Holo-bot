import { Service } from '../Class/Service';
import { LiveListCommand } from '../Command/LiveListCommand';

const LiveService = new Service('live', 'Information about live, upcoming and recently ended streams.', 'list n=okayu');

LiveService.addCommand(LiveListCommand);

export  {
  LiveService,
};