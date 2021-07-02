import { ApplicationCommandData, CommandInteraction, CommandInteractionOption, Collection } from 'discord.js';
import { CommandOptionType } from '../interface/CommandOptionType';
import { ReplyError } from './ReplyError';

type RunEvent = (interaction: CommandInteraction, body: any) => Promise<void>;

export class Command {
  public options: ApplicationCommandData;
  protected runEvent: RunEvent;
  private initFunction?: () => Promise<void>;

  constructor (options: ApplicationCommandData, runEvent: RunEvent) {
    this.options = options;
    this.runEvent = runEvent;
  }

  public async run (interaction: CommandInteraction) {
    const body = this.parseOptions(interaction.options, interaction.commandName);
    await this.runEvent(interaction, body);
  }

  public async setInitFunction (initFunction: () => Promise<void>) {
    this.initFunction = initFunction;
  }

  public async init () {
    if (this.initFunction)
      await this.initFunction();
  }

  protected parseOptions (interfaceOption: Collection<string, CommandInteractionOption>, interactionName: string) {
    if (!interfaceOption)
      throw new ReplyError('Invalid command: ' + interactionName);

    const body: any = {};

    for (const option of interfaceOption.array()) {
      if (option.type === CommandOptionType.SUB_COMMAND)
        throw new ReplyError('Invalid command: ' + interactionName);
      body[option.name] = option.value;
    }

    return body;
  }
}