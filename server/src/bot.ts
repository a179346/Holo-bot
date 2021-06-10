import { Client } from 'discord.js';
import { ServiceSet } from './Class/ServiceSet';
import { logging } from './utils/logging';

const NAMESPACE = 'BOT';

class Bot {
  private serviceSets: ServiceSet[];
  private client: Client;

  constructor (serviceSets: ServiceSet[]) {
    this.client = new Client();
    this.serviceSets = serviceSets;
  }

  public async init (discordToken: string) {
    this.client.on('ready', () => {
      logging.info(NAMESPACE, `Logged in to discord as ${this.client.user?.tag}!`);
    });

    this.client.on('message', async (msg) => {
      try {
        const messages = msg.content.match(/[^ ]+/g);
        if (!messages || messages.length === 0) return;

        const prefix = messages[0];
        const serviceSet = this.serviceSets.find((serviceSet) => serviceSet.prefix === prefix);
        if (!serviceSet) return;

        await serviceSet.runEvent(msg, messages);
      } catch (error) {
        //
      }
    });

    await this.client.login(discordToken);
  }

  public async sendMessageToChannel (channelId: string, message: string) {
    const channel = this.client.channels.cache.get(channelId);
    if (channel?.isText())
      await channel.send(message);
  }
}


export { Bot };