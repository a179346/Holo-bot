import { Client } from 'discord.js';
import { ServiceSet } from './Class/ServiceSet';
import { logging } from './utils/logging';

const NAMESPACE = 'BOT';

class Bot extends Client {
  private serviceSets: ServiceSet[];

  constructor (serviceSets: ServiceSet[]) {
    super();
    this.serviceSets = serviceSets;
  }

  public init () {
    this.on('ready', () => {
      logging.info(NAMESPACE, `Logged in to discord as ${this.user?.tag}!`);
    });

    this.on('message', async (msg) => {
      try {
        const messages = msg.content.match(/[^ ]+/g);
        if (!messages) return;

        const serviceSet = this.serviceSets.find((serviceSet) => serviceSet.prefix === messages[0]);
        if (!serviceSet) return;

        if (messages[1] === 'help') {
          const helpMessage = await serviceSet.getHelpMessage();
          msg.channel.send(helpMessage);
          return;
        }
      } catch (error) {
        //
      }
    });
  }
}


export { Bot };