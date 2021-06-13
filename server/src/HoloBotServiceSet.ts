import { ServiceSet } from './Class/ServiceSet';
import { ChannelService } from './Service/ChannelService';
import { LiveService } from './Service/LiveService';
import { SubscriptionService } from './Service/SubscriptionService';

const HoloBotServiceSet = new ServiceSet('!holobot', ':robot:  A Hololive info discord bot  :robot:');

HoloBotServiceSet.addService(SubscriptionService);
HoloBotServiceSet.addService(LiveService);
HoloBotServiceSet.addService(ChannelService);

export {
  HoloBotServiceSet,
};