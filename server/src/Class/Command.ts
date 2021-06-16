import { Message } from 'discord.js';
import { CommandOption } from './CommandOption';
import { ReplyError } from './ReplyError';
import { ServiceSet } from './ServiceSet';

type CommandEvent = (msg: Message, serviceSet: ServiceSet, messages: string[]) => Promise<void>;

export class Command {
  public name: string;
  public description: string;
  private commandEvent: CommandEvent;
  public commandOptions: CommandOption[] = [];

  constructor (name: string, description: string, commandEvent: CommandEvent) {
    this.name = name;
    this.description = description;
    this.commandEvent = commandEvent;
  }

  public async runEvent (msg: Message, serviceSet: ServiceSet, messages: string[]) {
    this.parseMessages(messages);
    await this.commandEvent(msg, serviceSet, messages);
  }

  private parseMessages (messages: string[]) {
    messages.forEach((message, i) => {
      if (i <= 2) return;
      const equalSignIndex = message.indexOf('=');
      if (equalSignIndex === -1)
        throw new ReplyError('Unknown option: ' + message);
    });
  }

  public addOption (commandOption: CommandOption) {
    this.commandOptions.push(commandOption);
  }
}