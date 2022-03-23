import { ChatInputApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver } from 'discord.js';

type RunEvent = (interaction: CommandInteraction, options: Omit<CommandInteractionOptionResolver<'cached'>, 'getMessage' | 'getFocused'>) => Promise<void>;

export class Command {
  public readonly options: ChatInputApplicationCommandData;
  protected readonly runEvent: RunEvent;
  private initFunction?: () => Promise<void>;

  constructor (options: ChatInputApplicationCommandData, runEvent: RunEvent) {
    this.options = options;
    this.runEvent = runEvent;
  }

  public async run (interaction: CommandInteraction, options: Omit<CommandInteractionOptionResolver<'cached'>, 'getMessage' | 'getFocused'>) {
    await this.runEvent(interaction, options);
  }

  public async setInitFunction (initFunction: () => Promise<void>) {
    this.initFunction = initFunction;
  }

  public async init () {
    if (this.initFunction)
      await this.initFunction();
  }
}