import { Subcommand } from '../../Class/Subcommand';
import { ReplyError } from '../../Class/ReplyError';
import { LiveDao } from '../../dao/Live';
import { LiveStatus } from '../../entity/live';
import { Lib } from '../../lib/common';
import { CommandOptionType } from '../../interface/CommandOptionType';
import { MessageEmbed } from 'discord.js';
import { SubscriptionDao } from '../../dao/Subscription';

const LiveListSubcommand = new Subcommand({
  name: 'list',
  description: 'Fetches live, upcoming streams from subscribed channels.',
  type: CommandOptionType.SUB_COMMAND,
  options: [ {
    name: 'private-reply',
    description: 'If false, reply is public.',
    type: CommandOptionType.BOOLEAN,
    required: true,
  }, {
    name: 'only-live',
    description: 'If true, no upcoming streams will be shown.',
    type: CommandOptionType.BOOLEAN,
    required: true,
  }, ]
}, async (interaction, options) => {
  const privateReply = options.get('private-reply')?.value;
  const onlyLive = options.get('only-live')?.value;
  if (typeof privateReply !== 'boolean')
    throw new ReplyError('Invalid Options: "private-reply"');
  if (typeof onlyLive !== 'boolean')
    throw new ReplyError('Invalid Options: "only-live"');

  const subscriptions = await SubscriptionDao.list(interaction.channelID);
  if (subscriptions.length === 0)
    throw new ReplyError('No channel subscribed.');

  let firstReply = true;
  for (const sub of subscriptions) {
    let lives = await LiveDao.fetch(sub.channel.id, [ LiveStatus.UPCOMING, LiveStatus.LIVE ]);
    if (onlyLive)
      lives = lives.filter((live) => live.live_status === LiveStatus.LIVE);

    const prefix = Lib.getChannelPrefix(sub.channel);
    const info = prefix + sub.channel.name;
    let embeds: MessageEmbed[] | undefined = undefined;

    if (lives.length === 0)
      continue;
    else
      embeds = Lib.formatLives(lives, sub.channel);

    const msg = {
      content: info,
      embeds,
      ephemeral: privateReply,
    };
    if (firstReply) {
      firstReply = false;
      interaction.reply(msg);
    } else
      interaction.followUp(msg);
  }

  if (firstReply)
    throw new ReplyError(':dizzy_face:  There is no scheduled live from subscribed channels.');
});

export {
  LiveListSubcommand,
};