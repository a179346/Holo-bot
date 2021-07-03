import { CommandInteraction, ApplicationCommandOption } from 'discord.js';

type SubcommandEvent = (interaction: CommandInteraction) => Promise<void>;

export class Subcommnad {
  public readonly options: ApplicationCommandOption;
  private readonly subcommandEvent: SubcommandEvent;

  constructor (options: ApplicationCommandOption, subcommandEvent: SubcommandEvent) {
    this.options = options;
    this.subcommandEvent = subcommandEvent;
  }

  public async run (interaction: CommandInteraction): Promise<void> {
    await this.subcommandEvent(interaction);
  }
}