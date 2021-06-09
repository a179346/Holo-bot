import { Message } from 'discord.js';
import { ServiceSet } from './ServiceSet';

type CommandEvent = (msg: Message, serviceSet: ServiceSet, messages: string[]) => Promise<void>;

export class Command {
  public name: string;
  public description: string;
  public commandEvent: CommandEvent;

  constructor (name: string, description: string, commandEvent: CommandEvent) {
    this.name = name;
    this.description = description;
    this.commandEvent = commandEvent;
  }
}