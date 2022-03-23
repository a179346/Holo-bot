import { CommandInteraction, ApplicationCommandSubCommandData, CommandInteractionOptionResolver } from 'discord.js';

type SubcommandEvent = (interaction: CommandInteraction, options: Omit<CommandInteractionOptionResolver<'cached'>, 'getMessage' | 'getFocused'>) => Promise<void>;

export class Subcommand {
  public readonly options: ApplicationCommandSubCommandData;
  private readonly subcommandEvent: SubcommandEvent;

  constructor (options: ApplicationCommandSubCommandData, subcommandEvent: SubcommandEvent) {
    this.options = options;
    this.subcommandEvent = subcommandEvent;
  }

  public async run (interaction: CommandInteraction, options: Omit<CommandInteractionOptionResolver<'cached'>, 'getMessage' | 'getFocused'>): Promise<void> {
    await this.subcommandEvent(interaction, options);
  }
}