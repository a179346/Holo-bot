import { ApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver } from 'discord.js';

type RunEvent = (interaction: CommandInteraction, options: CommandInteractionOptionResolver) => Promise<void>;

export class Command {
  public readonly options: ApplicationCommandData;
  protected readonly runEvent: RunEvent;
  private initFunction?: () => Promise<void>;

  constructor (options: ApplicationCommandData, runEvent: RunEvent) {
    this.options = options;
    this.runEvent = runEvent;
  }

  public async run (interaction: CommandInteraction, options: CommandInteractionOptionResolver) {
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