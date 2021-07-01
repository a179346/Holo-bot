import { ApplicationOptions } from 'discord-slash-commands-client';
import { interaction } from '../interface/interaction';

type RunEvent = (interaction: interaction) => Promise<void>;

export class Command {
  public options: ApplicationOptions;
  private runEvent: RunEvent;
  private initFunction?: () => Promise<void>;

  constructor (options: ApplicationOptions, runEvent: RunEvent) {
    this.options = options;
    this.runEvent = runEvent;
  }

  public async run (interaction: interaction) {
    await this.runEvent(interaction);
  }

  public async setInitFunction (initFunction: () => Promise<void>) {
    this.initFunction = initFunction;
  }

  public async init () {
    if (this.initFunction)
      await this.initFunction();
  }
}