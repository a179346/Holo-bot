import { readFile } from 'fs/promises';
import { Service } from './Service';

export class ServiceSet {
  public prefix: string;
  public services: Service[] = [];
  private description: string;
  private helpMessage: string;

  constructor (prefix: string, description: string) {
    this.prefix = prefix;
    this.description = description;
    this.helpMessage = '';
  }

  addService (service: Service) {
    this.services.push(service);
  }

  async getHelpMessage (): Promise<string> {
    if (this.helpMessage)
      return this.helpMessage;

    const template = await readFile(__dirname + '/../ServiceSetHelp.md');
    let servicesMsg = '';
    for (const service of this.services) {
      servicesMsg += `${('`' + service.name + '`:').padEnd(15)}${service.description}\n`;
    }

    this.helpMessage = template.toString()
      .replace(/{{description}}/g, this.description)
      .replace(/{{prefix}}/g, this.prefix)
      .replace(/{{services}}/g, servicesMsg);

    return this.helpMessage;
  }
}