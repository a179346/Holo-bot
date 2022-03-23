import { Command } from '../Class/Command';
import { CommandOptionType } from '../interface/CommandOptionType';
import { ReplyError } from '../Class/ReplyError';
import { ChannelNicknameDao } from '../dao/ChannelNickname';
import { Lib } from '../lib/common';

export const GreetingCommand = new Command({
  name: 'greeting',
  description: 'Hololive greetings.',
  options: [ {
    name: 'name',
    description: 'holomem\'s name (e.g., "okayu")',
    type: CommandOptionType.STRING,
    required: true,
  }, ]
}, async (interaction, options) => {
  const name = options.get('name')?.value;
  if (typeof name !== 'string')
    throw new ReplyError('Invalid Options: "name"');

  const channelNicknameVal = await ChannelNicknameDao.get(name);
  if (!channelNicknameVal)
    throw new ReplyError('Holomem not found: ' + name);
  if (!channelNicknameVal.channel.greeting)
    throw new ReplyError('Sorry :( Greeting from 【' + name + '】 is currently not available.');

  const prefix = Lib.getChannelPrefix(channelNicknameVal.channel);
  let content = prefix + channelNicknameVal.channel.greeting ;
  content += '            From: ' + interaction.user.toString();

  interaction.reply({
    content,
    ephemeral: false,
  });
});