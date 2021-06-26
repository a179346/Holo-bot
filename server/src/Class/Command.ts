import { Subcommnad } from './Subcommand';
import { ApplicationOptions } from 'discord-slash-commands-client';
import { interaction } from '../interface/interaction';
import { ReplyError } from './ReplyError';


export class Command {
  public options: ApplicationOptions;
  private subcommands: Subcommnad[] = [];
  private subcommandMap: Map<string, Subcommnad> = new Map();


  constructor (options: ApplicationOptions) {
    this.options = options;
  }

  public addSubcommand (subcommand: Subcommnad) {
    this.subcommands.push(subcommand);
    if (!this.options.options)
      this.options.options = [];

    this.options.options.push(subcommand.options);
    this.subcommandMap.set(subcommand.options.name, subcommand);
  }

  public async run (interaction: interaction) {
    const subcommandName = interaction.options?.[0].name;
    if (!subcommandName)
      throw new ReplyError('Unknown command: ' + interaction.name);
    const subcommand = this.subcommandMap.get(subcommandName);
    if (!subcommand)
      throw new ReplyError('Unknown subcommand: ' + subcommandName);

    await subcommand.run(interaction);
  }
}