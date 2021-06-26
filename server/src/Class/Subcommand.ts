import { ApplicationCommandOption } from 'discord-slash-commands-client';
import { interaction } from '../interface/interaction';

type SubcommandEvent = (interaction: interaction) => Promise<void>;

export class Subcommnad {
  public options: ApplicationCommandOption;
  private subcommandEvent: SubcommandEvent;

  constructor (options: ApplicationCommandOption, subcommandEvent: SubcommandEvent) {
    this.options = options;
    this.subcommandEvent = subcommandEvent;
  }

  public async run (interaction: interaction): Promise<void> {
    await this.subcommandEvent(interaction);
  }
}