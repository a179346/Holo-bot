import { ApplicationCommandOption } from 'discord-slash-commands-client';
import { CommandOptionType } from '../interface/CommandOptionType';
import { interaction } from '../interface/interaction';
import { ReplyError } from './ReplyError';

type SubcommandEvent = (interaction: interaction, body: any) => Promise<void>;

export class Subcommnad {
  public options: ApplicationCommandOption;
  private subcommandEvent: SubcommandEvent;

  constructor (options: ApplicationCommandOption, subcommandEvent: SubcommandEvent) {
    this.options = options;
    this.subcommandEvent = subcommandEvent;
  }

  public async run (interaction: interaction): Promise<void> {
    await this.subcommandEvent(interaction, this.parseOptions(interaction));
  }

  private parseOptions (interaction: interaction) {
    if (interaction.options?.[0].type !== CommandOptionType.SUB_COMMAND)
      throw new ReplyError('Invalid command: ' + interaction.name);
    if (!Array.isArray(interaction.options[0].options))
      throw new ReplyError('Invalid command: ' + interaction.name);

    const body: any = {};
    for (const option of interaction.options[0].options) {
      if (option.type === CommandOptionType.SUB_COMMAND)
        throw new ReplyError('Invalid command: ' + interaction.name);
      body[option.name] = option.value;
    }

    return body;
  }
}