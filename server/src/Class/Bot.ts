import { Client, Intents } from 'discord.js';
import { CommandSet } from './CommandSet';
import { logging } from '../utils/logging';
import { Client as InteractionsClient } from 'discord-slash-commands-client';
import { interaction } from '../interface/interaction';
import { ReplyError } from './ReplyError';

const NAMESPACE = 'BOT';

class Bot {
  private commandSet: CommandSet;
  private client: Client;

  constructor (commandSet: CommandSet) {
    this.client = new Client({
      intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ]
    });
    this.commandSet = commandSet;
  }

  public async init (discordToken: string, discordBotUserId: string) {
    this.client.interactions = new InteractionsClient(discordToken, discordBotUserId);

    logging.info(NAMESPACE, 'Logging in to discord ...');
    this.client.on('ready', async () => {
      logging.info(NAMESPACE, `Logged in to discord as ${this.client.user?.tag}!`);

      // await this.client.interactions.deleteCommand('interaction id');

      const commands = await this.client.interactions.getCommands({});
      // console.log(commands);
      if (Array.isArray(commands) && commands.length < this.commandSet.commands.length) {
        try {
          for (const command of this.commandSet.commands) {
            await this.client.interactions.createCommand(command.options);
          }
        } catch (error) {
          logging.error(NAMESPACE, JSON.stringify(error?.response?.data));
        }
      }
    });


    this.client.on('interactionCreate', async (interaction: interaction) => {
      try {
        // console.log(interaction.guild.roles);
        // console.log(interaction.guild.ownerID);
        // console.log(interaction.author?.id);
        const command = this.commandSet.getCommand(interaction.name);
        if (!command)
          throw new ReplyError('Unknown command: ' + interaction.name);

        await command.run(interaction);
      } catch (error) {
        if (error instanceof ReplyError)
          interaction.reply(error.message, true);
        else {
          interaction.reply('Unknown error occurred...', true);
          logging.error(NAMESPACE, error?.message, { error });
        }
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