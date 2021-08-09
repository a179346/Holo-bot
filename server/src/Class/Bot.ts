import { Client, Intents, MessagePayload, MessageOptions, Snowflake } from 'discord.js';
import { CommandSet } from './CommandSet';
import { logging } from '../utils/logging';
import { ReplyError } from './ReplyError';
// import { Lib } from '../lib/common';

const NAMESPACE = 'BOT';

class Bot {
  private readonly commandSet: CommandSet;
  private readonly client: Client;

  constructor (commandSet: CommandSet) {
    this.client = new Client({
      intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ],
      messageCacheLifetime: 150,
      messageSweepInterval: 150,
    });
    this.commandSet = commandSet;
  }

  public async init (discordToken: string, discordBotUserId: string) {
    await this.commandSet.init();

    logging.info(NAMESPACE, 'Logging in to discord ...');

    this.client.on('ready', async () => {
      logging.info(NAMESPACE, `Logged in to discord as ${this.client.user?.tag}!`);
      if (!this.client.application)
        throw new Error('No client.application');

      // await this.client.application.commands.delete(Lib.ToSnowflake('interaction id'));

      const commands = await this.client.application.commands.fetch();
      // console.log(commands);
      if (commands.size < this.commandSet.size) {
        try {
          for (const command of this.commandSet.values()) {
            await this.client.application.commands.create(command.options);
          }
        } catch (error) {
          logging.error(NAMESPACE, JSON.stringify(error?.response?.data));
        }
      }
    });


    this.client.on('interactionCreate', async (interaction) => {
      if (!interaction.isCommand())
        return;
      try {
        const command = this.commandSet.get(interaction.commandName);
        if (!command)
          throw new ReplyError('Unknown command: ' + interaction.commandName);

        await command.run(interaction, interaction.options);
      } catch (error) {
        if (error instanceof ReplyError)
          interaction.reply({
            content: error.message,
            ephemeral: true,
          });
        else {
          interaction.reply({
            content: 'Unknown error occurred...',
            ephemeral: true,
          });
          logging.error(NAMESPACE, error?.message, { error });
        }
      }
    });

    await this.client.login(discordToken);
  }

  public async sendMessageToChannel (discord_channel_id: Snowflake, message: string | MessagePayload | MessageOptions) {
    const channel = await this.client.channels.fetch(discord_channel_id, {
      cache: true,
      force: false,
    });
    if (channel?.isText())
      await channel.send(message);
  }
}


export { Bot };