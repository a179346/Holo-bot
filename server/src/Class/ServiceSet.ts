import { Message } from 'discord.js';
import { readFile } from 'fs/promises';
import { ReplyError } from './ReplyError';
import { Service } from './Service';
import * as path from 'path';

export class ServiceSet {
  public prefix: string;
  private services: Service[] = [];
  private description: string;
  private helpMessage = '';

  constructor (prefix: string, description: string) {
    this.prefix = prefix;
    this.description = description;
  }

  public checkContent (content: string) {
    const prefixLength = this.prefix.length;
    for (let i = 0; i < prefixLength; i++) {
      if (content.charAt(i) !== this.prefix.charAt(i))
        return false;
    }
    return true;
  }

  public addService (service: Service) {
    this.services.push(service);
  }

  public async init () {
    await this.resetHelpMessage();
    for (const service of this.services) {
      await service.init();
    }
  }

  private async resetHelpMessage () {
    const filePath = path.resolve(__dirname, '../nonTsFiles/ServiceSetHelp.md');
    const template = await readFile(filePath);
    let servicesMsg = '';
    for (const service of this.services) {
      servicesMsg += `${('`' + service.name + '`:').padEnd(15)}${service.description}\n`;
    }

    this.helpMessage = template.toString()
      .replace(/{{description}}/g, this.description)
      .replace(/{{prefix}}/g, this.prefix)
      .replace(/{{services}}/g, servicesMsg);
  }

  private getHelpMessage (): string {
    return this.helpMessage;
  }

  public async runEvent (msg: Message, messages: string[]) {
    const serviceName = messages[1];
    if (!serviceName)
      throw new ReplyError(`\nHi! I'm ${this.description}\nRun \`${this.prefix} help\` for more information.`);

    if (serviceName === 'help') {
      const helpMessage = this.getHelpMessage();
      msg.channel.send(helpMessage);
      return;
    }

    const service = this.services.find((service) => service.name === serviceName);
    if (!service)
      throw new ReplyError(`\nUnknown service: "${serviceName}"\nRun \`${this.prefix} help\` for more information.`);

    await service.runEvent(msg, this, messages);
  }
}