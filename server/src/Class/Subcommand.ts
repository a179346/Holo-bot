import { CommandInteraction, ApplicationCommandOption, CommandInteractionOptionResolver } from 'discord.js';

type SubcommandEvent = (interaction: CommandInteraction, options: CommandInteractionOptionResolver) => Promise<void>;

export class Subcommand {
  public readonly options: ApplicationCommandOption;
  private readonly subcommandEvent: SubcommandEvent;

  constructor (options: ApplicationCommandOption, subcommandEvent: SubcommandEvent) {
    this.options = options;
    this.subcommandEvent = subcommandEvent;
  }

  public async run (interaction: CommandInteraction, options: CommandInteractionOptionResolver): Promise<void> {
    await this.subcommandEvent(interaction, options);
  }
}