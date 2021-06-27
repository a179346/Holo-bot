import { ApplicationCommandOptionChoice } from 'discord-slash-commands-client';

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

export const Lib = {
  delay,
  retry,
  youtubeChannelUrl,
  youtubeVideoUrl,
  twitterUserUrl,
  enumToChoices,
};