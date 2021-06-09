import { Command } from '../Class/Command';

const SubAddCommand = new Command('add', 'Subscribe to a hololive member. Receive his/her live notification.', async (msg, serviceSet, messages) => {
  msg.reply('service not yet implemented.');
});

export {
  SubAddCommand,
};