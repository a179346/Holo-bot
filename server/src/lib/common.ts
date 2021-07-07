import { CommandInteraction, GuildMember, MessageEmbed } from 'discord.js';
import { Snowflake, ApplicationCommandOptionChoice } from 'discord.js';
import { PermissionDao } from '../dao/Permission';
import { channel } from '../entity/channel';
import { live, LiveStatus } from '../entity/live';
import { PermissionType } from '../entity/permission';

function delay (delayMs: number): Promise<null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, delayMs);
  });
}

async function retry<T> (asyncFunc: ()=>Promise<T>, retryCount = 3, retryDelayMs = 3000): Promise<T> | never {
  try {
    const result = await asyncFunc();
    return result;
  } catch (error) {
    if (retryCount > 0) {
      await delay(retryDelayMs);
      return retry(asyncFunc, retryCount - 1);
    }
    throw error;
  }
}

function youtubeChannelUrl (channelId: string) {
  return 'https://www.youtube.com/channel/' + channelId;
}

function youtubeVideoUrl (videoKey: string) {
  return 'https://www.youtube.com/watch?v=' + videoKey;
}

function youtubeThumbnailUrl (videoKey: string) {
  return 'https://img.youtube.com/vi/' + videoKey + '/0.jpg';
}

function twitterUserUrl (twitterLink: string) {
  return 'https://twitter.com/' + twitterLink;
}

function enumToChoices (enumVal: {[key: string]: any}): ApplicationCommandOptionChoice[] {
  const choices = [];
  for (const key in enumVal) {
    if (Object.prototype.hasOwnProperty.call(enumVal, key)) {
      choices.push({
        name: key,
        value: enumVal[key],
      });
    }
  }

  return choices;
}

async function checkPermission (interaction: CommandInteraction, permissionType: PermissionType, ownerDefaultEnable: boolean): Promise<boolean> {
  // channel owner
  if (ownerDefaultEnable && interaction.guild?.ownerID === interaction.user.id)
    return true;

  // DM
  if (interaction.guild === null)
    return true;

  if (!interaction.member || !(interaction.member instanceof GuildMember))
    return false;

  const permissions = await PermissionDao.list(interaction.channelID, permissionType);
  const member = await interaction.member.fetch(true);
  for (const permission of permissions) {
    if (member.roles.cache.has(permission.role_id))
      return true;
  }

  return false;
}

function ToSnowflake (str: string): Snowflake {
  return `${BigInt(str)}`;
  // return str;
}

function getChannelPrefix (channel: channel) {
  const emoji = channel.emoji || ':point_right:';
  const prefix = '\n' + emoji + '  ';
  return prefix;
}

function formatLives (lives: live[], channel?: channel): MessageEmbed[] {
  const liveEmbeds: MessageEmbed[] = [];
  const upcomingEmbeds: MessageEmbed[] = [];

  for (const live of lives) {
    const channelInfo = channel || live.channel;

    const embedOptions = new MessageEmbed({
      title: live.title,
      url: youtubeVideoUrl(live.yt_video_key),
      timestamp: live.live_start || live.live_schedule || undefined,
      author: {
        name: channelInfo?.name || undefined,
        url: channelInfo?.yt_channel_id ? youtubeChannelUrl(channelInfo.yt_channel_id) : undefined,
        iconURL: channelInfo?.photo || undefined,
      },
      thumbnail: {
        url: liveStatusImage(live.live_status),
      },
      image: {
        url: live.thumbnail || youtubeThumbnailUrl(live.yt_video_key),
      },
      footer: {
        text: live.live_status,
      }
    });

    if (live.live_status === LiveStatus.LIVE)
      liveEmbeds.push(embedOptions);
    else if (live.live_status === LiveStatus.UPCOMING)
      upcomingEmbeds.push(embedOptions);
  }

  return [ ...liveEmbeds, ...upcomingEmbeds ];
}

function liveStatusImage (liveStatus: LiveStatus) {
  switch (liveStatus) {
    case LiveStatus.LIVE:
      return 'https://raw.githubusercontent.com/a179346/Holo-bot/images/images/live.png';

    case LiveStatus.UPCOMING:
      return 'https://raw.githubusercontent.com/a179346/Holo-bot/images/images/upcoming.png';

    case LiveStatus.ENDED:
      return 'https://raw.githubusercontent.com/a179346/Holo-bot/images/images/ended.png';
  }
}

export const Lib = {
  delay,
  retry,
  youtubeChannelUrl,
  youtubeVideoUrl,
  youtubeThumbnailUrl,
  twitterUserUrl,
  enumToChoices,
  checkPermission,
  ToSnowflake,
  getChannelPrefix,
  formatLives,
};