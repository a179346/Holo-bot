import { Collection } from 'discord.js';
import { Command } from './Command';

export class CommandSet extends Collection<string, Command> {
  async init (): Promise<void> {
    for (const command of this.values()) {
      await command.init();
    }
  }
}