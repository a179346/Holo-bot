import { Client, Intents } from 'discord.js';
import { ReplyError } from './ReplyError';
import { ServiceSet } from './ServiceSet';
import { logging } from '../utils/logging';
import { Client as InteractionsClient } from 'discord-slash-commands-client';
import { interaction } from '../interface/interaction';

const NAMESPACE = 'BOT';

class Bot {
  private serviceSets: ServiceSet[];
  private client: Client;

  constructor (serviceSets: ServiceSet[]) {
    this.client = new Client({
      intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ]
    });
    this.serviceSets = serviceSets;
  }

  public async init (discordToken: string, discordBotUserId: string) {
    for (const serviceSet of this.serviceSets) {
      await serviceSet.init();
    }
    this.client.interactions = new InteractionsClient(discordToken, discordBotUserId);

    logging.info(NAMESPACE, 'Logging in to discord ...');
    this.client.on('ready', () => {
      logging.info(NAMESPACE, `Logged in to discord as ${this.client.user?.tag}!`);
      // this.client.interactions.getCommands({}).then(console.log).catch(console.error);

      // this.client.interactions
      //   .deleteCommand('interaction id')
      //   .then(console.log)
      //   .catch(console.error);

      // this.client.interactions
      //   .createCommand({
      //     name: 'ping',
      //     description: 'ping pong',
      //   })
      //   .then(console.log)
      //   .catch(console.error);
    });


    this.client.on('interactionCreate', async (interaction: interaction) => {
      // console.log(interaction.name);
      // if (interaction.name === 'ping') {
      //   // send an initial reply
      //   await interaction.reply('Pong');

      //   // send a followup
      //   const messageId = await interaction.reply({
      //     content: 'Follow up message',
      //     embeds: [ new MessageEmbed().setDescription('Follow up test') ],
      //   });

      //   setTimeout(() => {
      //     // delete initial reply
      //     interaction.delete();

      //     // edit 1st followup
      //     interaction.edit('Edited follow up message', messageId);
      //   }, 5000);
      // }
    });

    this.client.on('message', async (msg) => {
      try {
        if (msg.author.bot) return;
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