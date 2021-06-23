import { Client } from 'discord.js';
import { ReplyError } from './ReplyError';
import { ServiceSet } from './ServiceSet';
import { logging } from '../utils/logging';

const NAMESPACE = 'BOT';

class Bot {
  private serviceSets: ServiceSet[];
  private client: Client;

  constructor (serviceSets: ServiceSet[]) {
    this.client = new Client();
    this.serviceSets = serviceSets;
  }

  public async init (discordToken: string) {
    for (const serviceSet of this.serviceSets) {
      await serviceSet.init();
    }

    logging.info(NAMESPACE, 'Logging in to discord ...');
    this.client.on('ready', () => {
      logging.info(NAMESPACE, `Logged in to discord as ${this.client.user?.tag}!`);
    });

    this.client.on('message', async (msg) => {
      try {
        const content = msg.content;
        const serviceSet = this.serviceSets.find((serviceSet) => serviceSet.checkContent(content));
        if (!serviceSet) return;

        const messages = content.match(/[^ ]+/g);
        if (!messages || messages.length === 0) return;

        await serviceSet.runEvent(msg, messages);
      } catch (error) {
        if (error instanceof ReplyError)
          msg.reply(error.message);
        else
          logging.error(NAMESPACE, error?.message, { error });
      }
    });

    await this.client.login(discordToken);
  }

  public async sendMessageToChannel (discord_channel_id: string, message: string) {
    const channel = this.client.channels.cache.get(discord_channel_id);
    if (channel?.isText())
      await channel.send(message);
  }
}


export { Bot };