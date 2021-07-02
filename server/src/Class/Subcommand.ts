import { CommandInteraction, ApplicationCommandOption } from 'discord.js';

type SubcommandEvent = (interaction: CommandInteraction, body: any) => Promise<void>;

export class Subcommnad {
  public options: ApplicationCommandOption;
  private subcommandEvent: SubcommandEvent;

  constructor (options: ApplicationCommandOption, subcommandEvent: SubcommandEvent) {
    this.options = options;
    this.subcommandEvent = subcommandEvent;
  }

  public async run (interaction: CommandInteraction, body: any): Promise<void> {
    await this.subcommandEvent(interaction, body);
  }
}