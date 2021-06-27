import { ApplicationCommandOptionChoice } from 'discord-slash-commands-client';
import { PermissionDao } from '../dao/Permission';
import { PermissionType } from '../entity/permission';
import { interaction } from '../interface/interaction';

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

async function checkPermission (interaction: interaction, permissionType: PermissionType, ownerDefaultEnable: boolean): Promise<boolean> {
  if (ownerDefaultEnable && interaction.guild.ownerID === interaction.author?.id)
    return true;

  if (!interaction.member)
    return false;

  const permissions = await PermissionDao.list(interaction.channel.id, permissionType);
  const member = await interaction.member.fetch(true);
  for (const permission of permissions) {
    if (member.roles.cache.has(permission.role_id))
      return true;
  }

  return false;
}

export const Lib = {
  delay,
  retry,
  youtubeChannelUrl,
  youtubeVideoUrl,
  twitterUserUrl,
  enumToChoices,
  checkPermission,
};