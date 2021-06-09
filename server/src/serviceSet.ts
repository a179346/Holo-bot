import { Service } from './Class/Service';
import { ServiceSet } from './Class/ServiceSet';

const serviceSet = new ServiceSet('!holo-bot', ':robot:  A Hololive info discord bot  :robot:');
const manageService = new Service('manage', 'manage holo-bot.');
const orderService = new Service('order', 'order holo-bot.');
const playService = new Service('play', 'play holo-bot.');
serviceSet.addService(manageService);
serviceSet.addService(orderService);
serviceSet.addService(playService);

export {
  serviceSet,
};