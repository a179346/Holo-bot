import { readFile } from 'fs/promises';
import { Message } from 'discord.js';
import { Command } from './Command';
import { ServiceSet } from './ServiceSet';
import { ReplyError } from './ReplyError';
import * as path from 'path';

export class Service {
  public name: string;
  public description: string;
  private exampleCommand;
  public commands: Command[] = [];
  private helpMessage = '';
  private helpMessageCache: { [prefix: string]: string } = {};

  constructor (name: string, description: string, exampleCommand: string) {
    this.name = name;
    this.description = description;
    this.exampleCommand = exampleCommand;
  }

  public addCommand (command: Command) {
    this.commands.push(command);
  }

  public async runEvent (msg: Message, serviceSet: ServiceSet, messages: string[]) {
    const commandName = messages[2];
    if (!commandName || commandName === 'help') {
      const helpMessage = this.getHelpMessage(serviceSet);
      msg.channel.send(helpMessage);
      return;
    }

    const command = this.commands.find((command) => command.name === commandName);
    if (!command)
      throw new ReplyError(`\nUnknown command: "${commandName}"\nRun \`${serviceSet.prefix} ${this.name} help\` for more information.`);


    await command.runEvent(msg, serviceSet, messages);
  }

  public async init () {
    await this.resetHelpMessage();
  }

  private async resetHelpMessage () {
    const filePath = path.resolve(__dirname, '../nonTsFiles/ServiceHelp.md');
    const template = await readFile(filePath);
    let commandMsg = '';
    for (const command of this.commands) {
      commandMsg += `${('`' + command.name + '`:').padEnd(15)}${command.description}\n`;
      for (const commandoption of command.commandOptions) {
        commandMsg += `          -  \`[${commandoption.argNames.join(' , ')}]\`  :  [${commandoption.required ? 'required' : 'optional'}]  ${commandoption.description}\n`;
      }
    }

    this.helpMessage = template.toString()
      .replace(/{{name}}/g, this.name)
      .replace(/{{description}}/g, this.description)
      .replace(/{{commands}}/g, commandMsg)
      .replace(/{{exampleCommand}}/g, this.exampleCommand);
  }

  private getHelpMessage (serviceSet: ServiceSet): string {
    if (this.helpMessageCache[serviceSet.prefix])
      return this.helpMessageCache[serviceSet.prefix];

    this.helpMessageCache[serviceSet.prefix] = this.helpMessage
      .replace(/{{prefix}}/g, serviceSet.prefix);
    return this.helpMessageCache[serviceSet.prefix];
  }
}