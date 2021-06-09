import { readFile } from 'fs/promises';
import { Message } from 'discord.js';
import { Command } from './Command';
import { ServiceSet } from './ServiceSet';

export class Service {
  public name: string;
  public description: string;
  public commands: Command[] = [];
  private helpMessage = '';

  constructor (name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  addCommand (command: Command) {
    this.commands.push(command);
  }

  async runEvent (msg: Message, serviceSet: ServiceSet, messages: string[]) {
    const commandName = messages[2];
    if (!commandName || commandName === 'help') {
      const helpMessage = await this.getHelpMessage(serviceSet);
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

  async getHelpMessage (serviceSet: ServiceSet): Promise<string> {
    if (this.helpMessage)
      return this.helpMessage
        .replace(/{{prefix}}/g, serviceSet.prefix);

    const template = await readFile(__dirname + '/ServiceHelp.md');
    let commandMsg = '';
    for (const command of this.commands) {
      commandMsg += `${('`' + command.name + '`:').padEnd(15)}${command.description}\n`;
    }

    this.helpMessage = template.toString()
      .replace(/{{name}}/g, this.name)
      .replace(/{{description}}/g, this.description)
      .replace(/{{commands}}/g, commandMsg);

    return this.helpMessage
      .replace(/{{prefix}}/g, serviceSet.prefix);
  }
}