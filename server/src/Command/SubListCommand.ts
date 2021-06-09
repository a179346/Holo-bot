import { Command } from '../Class/Command';

const SubListCommand = new Command('list', 'List current subscriptions.', async (msg, serviceSet, messages) => {
  msg.reply('service not yet implemented.');
});

export {
  SubListCommand,
};