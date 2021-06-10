import { Command } from '../Class/Command';

const SubRemoveCommand = new Command('rm', 'Unsubscribe a hololive member. Stop receiving his/her live notification.', async (msg, serviceSet, messages) => {
  msg.reply('service not yet implemented.');
});

export {
  SubRemoveCommand,
};