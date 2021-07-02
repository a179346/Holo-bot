import { Subcommnad } from './Subcommand';
import { ReplyError } from './ReplyError';
import { CommandOptionType } from '../interface/CommandOptionType';
import { Command } from './Command';
import { ApplicationCommandData, CommandInteraction } from 'discord.js';

type CheckEvent = (interaction: CommandInteraction) => Promise<void>;

export class Layer2Command extends Command {
  private subcommands: Subcommnad[] = [];
  private subcommandMap: Map<string, Subcommnad> = new Map();
  private checkEvent?: CheckEvent;


  constructor (options: ApplicationCommandData, checkEvent?: CheckEvent) {
    super(options, Layer2Command.prototype.layer2run);
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

  private async layer2run (interaction: CommandInteraction, body: any) {
    const commamdOptions = interaction.options.first();
    if (!commamdOptions || commamdOptions.type !== CommandOptionType.SUB_COMMAND)
      throw new ReplyError('Invalid command: ' + interaction.commandName);

    const subcommandName = commamdOptions.name;
    if (!subcommandName)
      throw new ReplyError('Unknown command: ' + interaction.commandName);
    const subcommand = this.subcommandMap.get(subcommandName);
    if (!subcommand)
      throw new ReplyError('Unknown subcommand: ' + subcommandName);

    if (this.checkEvent)
      await this.checkEvent(interaction);
    await subcommand.run(interaction, body);
  }


  public async run (interaction: CommandInteraction) {
    const commamdOptions = interaction.options.first();
    if (!commamdOptions || !commamdOptions.options || commamdOptions.type !== CommandOptionType.SUB_COMMAND)
      throw new ReplyError('Invalid command: ' + interaction.commandName);

    const body = this.parseOptions(commamdOptions.options, interaction.commandName);
    await this.runEvent(interaction, body);
  }
}