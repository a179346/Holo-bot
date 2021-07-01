import { ApplicationOptions } from 'discord-slash-commands-client';
import { CommandOptionType } from '../interface/CommandOptionType';
import { interaction, interfaceOption } from '../interface/interaction';
import { ReplyError } from './ReplyError';

type RunEvent = (interaction: interaction, body: any) => Promise<void>;

export class Command {
  public options: ApplicationOptions;
  protected runEvent: RunEvent;
  private initFunction?: () => Promise<void>;

  constructor (options: ApplicationOptions, runEvent: RunEvent) {
    this.options = options;
    this.runEvent = runEvent;
  }

  public async run (interaction: interaction) {
    const body = this.parseOptions(interaction.options, interaction.name);
    await this.runEvent(interaction, body);
  }

  public async setInitFunction (initFunction: () => Promise<void>) {
    this.initFunction = initFunction;
  }

  public async init () {
    if (this.initFunction)
      await this.initFunction();
  }

  protected parseOptions (interfaceOption: interfaceOption, interactionName: string) {
    if (!interfaceOption)
      throw new ReplyError('Invalid command: ' + interactionName);

    const body: any = {};

    for (const option of interfaceOption) {
      if (option.type === CommandOptionType.SUB_COMMAND)
        throw new ReplyError('Invalid command: ' + interactionName);
      body[option.name] = option.value;
    }

    return body;
  }
}