import { Command } from '../Class/Command';

const LiveListCommand = new Command('list', 'Fetches live, upcoming and recently ended streams.', async (msg, serviceSet, messages) => {
  msg.reply('service not yet implemented.');
});

export {
  LiveListCommand,
};