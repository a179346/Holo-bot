import { Message } from 'discord.js';
import { CommandOption } from './CommandOption';
import { ReplyError } from './ReplyError';
import { ServiceSet } from './ServiceSet';

type CommandEvent = (msg: Message, serviceSet: ServiceSet, messages: string[], body: any) => Promise<void>;

export class Command {
  public name: string;
  public description: string;
  private commandEvent: CommandEvent;
  public commandOptions: CommandOption[] = [];
  private optionMap: { [key: string]: CommandOption } = {};

  constructor (name: string, description: string, commandEvent: CommandEvent) {
    this.name = name;
    this.description = description;
    this.commandEvent = commandEvent;
  }

  public async runEvent (msg: Message, serviceSet: ServiceSet, messages: string[]) {
    const body = this.parseMessages(messages);
    await this.commandEvent(msg, serviceSet, messages, body);
  }

  private parseMessages (messages: string[]) {
    const body: any = {};
    messages.forEach((message, i) => {
      if (i <= 2) return;
      const equalSignIndex = message.indexOf('=');
      if (equalSignIndex === -1)
        throw new ReplyError('Parse option error: "' + message + '"');
      const key = message.substring(0, equalSignIndex);
      const value = message.substring(equalSignIndex + 1);
      if (!key || !value)
        throw new ReplyError('Parse option error: "' + message + '"');
      const commandOption = this.optionMap[key];
      if (!commandOption)
        throw new ReplyError('Unknown option: "' + message + '"');
      body[commandOption.name] = value;
    });

    for (const commandOption of this.commandOptions) {
      if (commandOption.required) {
        if (!body[commandOption.name])
          throw new ReplyError('Option: [' + commandOption.argNames.join(' , ') + '] is required.');
      }
    }

    return body;
  }

  public addOption (commandOption: CommandOption) {
    for (const key of commandOption.argNames) {
      if (this.optionMap[key])
        throw new Error('Duplicate option arg: ' + key);
      this.optionMap[key] = commandOption;
    }
    this.commandOptions.push(commandOption);
  }
}