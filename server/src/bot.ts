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

        const serviceName = messages[1];
        if (!serviceName) {
          msg.reply(`\nHi! I'm ${serviceSet.description}\nRun \`${serviceSet.prefix} help\` for more information.`);
          return;
        }

        if (serviceName === 'help') {
          const helpMessage = serviceSet.getHelpMessage();
          msg.channel.send(helpMessage);
          return;
        }

        const service = serviceSet.services.find((service) => service.name === serviceName);
        if (!service) {
          msg.reply(`\nUnknown service: "${serviceName}"\nRun \`${serviceSet.prefix} help\` for more information.`);
          return;
        }
        await service.runEvent(msg, serviceSet, messages);
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