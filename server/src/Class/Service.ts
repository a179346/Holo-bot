import { readFile } from 'fs/promises';
import { Message } from 'discord.js';
import { Command } from './Command';
import { ServiceSet } from './ServiceSet';

export class Service {
  public name: string;
  public description: string;
  private exampleCommand;
  public commands: Command[] = [];
  private helpMessage = '';

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
    if (!command) {
      msg.reply(`\nUnknown command: "${commandName}"\nRun \`${serviceSet.prefix} ${this.name} help\` for more information.`);
      return;
    }

    await command.commandEvent(msg, serviceSet, messages);
  }

  public async init () {
    await this.resetHelpMessage();
  }

  private async resetHelpMessage () {
    const template = await readFile(__dirname + '/ServiceHelp.md');
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
    return this.helpMessage
      .replace(/{{prefix}}/g, serviceSet.prefix);
  }
}