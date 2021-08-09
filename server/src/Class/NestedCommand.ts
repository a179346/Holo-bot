import { Subcommand } from './Subcommand';
import { ReplyError } from './ReplyError';
import { CommandOptionType } from '../interface/CommandOptionType';
import { Command } from './Command';
import { ApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver } from 'discord.js';

type CheckEvent = (interaction: CommandInteraction, options: CommandInteractionOptionResolver) => Promise<void>;

export class NestedCommand extends Command {
  private readonly subcommandMap: Map<string, Subcommand> = new Map();
  private checkEvent?: CheckEvent;

  constructor (options: ApplicationCommandData, subcommands: Subcommand[]) {
    super(options, NestedCommand.prototype.nestedRun);
    for (const subcommand of subcommands) {
      this.addSubcommand(subcommand);
    }
  }

  public setCheckEvent (checkEvent: CheckEvent) {
    this.checkEvent = checkEvent;
  }

  private addSubcommand (subcommand: Subcommand) {
    if (!this.options.options)
      this.options.options = [];

    this.options.options.push(subcommand.options);
    this.subcommandMap.set(subcommand.options.name, subcommand);
  }

  private async nestedRun (interaction: CommandInteraction, options: CommandInteractionOptionResolver) {
    const commamdOptions = options.data[0];
    if (!commamdOptions || !commamdOptions.options || commamdOptions.type !== CommandOptionType.SUB_COMMAND)
      throw new ReplyError('Invalid command: ' + interaction.commandName);

    const subcommandName = commamdOptions.name;
    if (!subcommandName)
      throw new ReplyError('Unknown command: ' + interaction.commandName);
    const subcommand = this.subcommandMap.get(subcommandName);
    if (!subcommand)
      throw new ReplyError('Unknown subcommand: ' + subcommandName);

    if (this.checkEvent)
      await this.checkEvent(interaction, options);
    await subcommand.run(interaction, options);
  }
}