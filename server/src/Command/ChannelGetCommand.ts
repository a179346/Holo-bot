import { Command } from '../Class/Command';

const ChannelGetCommand = new Command('get', 'Fetches info about a channel.', async (msg, serviceSet, messages) => {
  msg.reply('service not yet implemented.');
});

export {
  ChannelGetCommand,
};