import { Subcommnad } from './Subcommand';
import { ApplicationOptions } from 'discord-slash-commands-client';
import { interaction } from '../interface/interaction';
import { ReplyError } from './ReplyError';
import { CommandOptionType } from '../interface/CommandOptionType';

type CheckEvent = (interaction: interaction) => Promise<void>;


export class Command {
  public options: ApplicationOptions;
  private subcommands: Subcommnad[] = [];
  private subcommandMap: Map<string, Subcommnad> = new Map();
  private checkEvent?: CheckEvent;


  constructor (options: ApplicationOptions, checkEvent?: CheckEvent) {
    this.options = options;
    this.checkEvent = checkEvent;
  }

  public addSubcommand (subcommand: Subcommnad) {
    this.subcommands.push(subcommand);
    if (!this.options.options)
      this.options.options = [];

    this.options.options.push(subcommand.options);
    this.subcommandMap.set(subcommand.options.name, subcommand);
  }

  public async run (interaction: interaction) {
    if (interaction.options?.[0].type !== CommandOptionType.SUB_COMMAND)
      throw new ReplyError('Invalid command: ' + interaction.name);

    const subcommandName = interaction.options?.[0].name;
    if (!subcommandName)
      throw new ReplyError('Unknown command: ' + interaction.name);
    const subcommand = this.subcommandMap.get(subcommandName);
    if (!subcommand)
      throw new ReplyError('Unknown subcommand: ' + subcommandName);

    if (this.checkEvent)
      await this.checkEvent(interaction);
    await subcommand.run(interaction);
  }
}