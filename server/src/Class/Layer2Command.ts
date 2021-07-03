import { Subcommnad } from './Subcommand';
import { ReplyError } from './ReplyError';
import { CommandOptionType } from '../interface/CommandOptionType';
import { Command } from './Command';
import { ApplicationCommandData, CommandInteraction } from 'discord.js';

type CheckEvent = (interaction: CommandInteraction) => Promise<void>;

export class Layer2Command extends Command {
  private readonly subcommandMap: Map<string, Subcommnad> = new Map();
  private checkEvent?: CheckEvent;

  constructor (options: ApplicationCommandData) {
    super(options, Layer2Command.prototype.layer2run);
  }

  public setCheckEvent (checkEvent: CheckEvent) {
    this.checkEvent = checkEvent;
  }

  public addSubcommand (subcommand: Subcommnad) {
    if (!this.options.options)
      this.options.options = [];

    this.options.options.push(subcommand.options);
    this.subcommandMap.set(subcommand.options.name, subcommand);
  }

  private async layer2run (interaction: CommandInteraction) {
    const commamdOptions = interaction.options.first();
    if (!commamdOptions || !commamdOptions.options || commamdOptions.type !== CommandOptionType.SUB_COMMAND)
      throw new ReplyError('Invalid command: ' + interaction.commandName);

    const subcommandName = commamdOptions.name;
    if (!subcommandName)
      throw new ReplyError('Unknown command: ' + interaction.commandName);
    const subcommand = this.subcommandMap.get(subcommandName);
    if (!subcommand)
      throw new ReplyError('Unknown subcommand: ' + subcommandName);

    if (this.checkEvent)
      await this.checkEvent(interaction);
    await subcommand.run(interaction);
  }
}