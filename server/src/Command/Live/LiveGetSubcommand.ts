import { Subcommand } from '../../Class/Subcommand';
import { ReplyError } from '../../Class/ReplyError';
import { ChannelNicknameDao } from '../../dao/ChannelNickname';
import { LiveDao } from '../../dao/Live';
import { LiveStatus } from '../../entity/live';
import { Lib } from '../../lib/common';
import { CommandOptionType } from '../../interface/CommandOptionType';
import { MessageEmbed } from 'discord.js';

const LiveGetSubcommand = new Subcommand({
  name: 'get',
  description: 'Fetches live, upcoming and recently ended streams.',
  type: CommandOptionType.SUB_COMMAND,
  options: [ {
    name: 'name',
    description: 'holomem\'s name (e.g., "okayu")',
    type: CommandOptionType.STRING,
    required: true,
  }, {
    name: 'private-reply',
    description: 'If false, reply is public.',
    type: CommandOptionType.BOOLEAN,
    required: true,
  }, ]
}, async (interaction, options) => {
  const name = options.getString('name');
  const privateReply = options.getBoolean('private-reply');
  if (typeof name !== 'string')
    throw new ReplyError('Invalid Options: "name"');
  if (typeof privateReply !== 'boolean')
    throw new ReplyError('Invalid Options: "private-reply"');

  const channelNicknameVal = await ChannelNicknameDao.get(name);
  if (!channelNicknameVal)
    throw new ReplyError('Holomem not found: ' + name);

  const lives = await LiveDao.fetch(channelNicknameVal.channel.id, [ LiveStatus.UPCOMING, LiveStatus.LIVE ]);

  const prefix = Lib.getChannelPrefix(channelNicknameVal.channel);
  let info = prefix + channelNicknameVal.channel.name;
  let embeds: MessageEmbed[] | undefined = undefined;

  if (lives.length === 0)
    info += '\nThere is no scheduled live...';
  else
    embeds = Lib.formatLives(lives, channelNicknameVal.channel);

  await interaction.reply({
    content: info,
    embeds,
    ephemeral: privateReply,
  });
});

export {
  LiveGetSubcommand,
};