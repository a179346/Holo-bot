import { readFile } from 'fs/promises';
import { Service } from './Service';

export class ServiceSet {
  public prefix: string;
  public services: Service[] = [];
  public description: string;
  private helpMessage = '';

  constructor (prefix: string, description: string) {
    this.prefix = prefix;
    this.description = description;
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
    const template = await readFile(__dirname + '/ServiceSetHelp.md');
    let servicesMsg = '';
    for (const service of this.services) {
      servicesMsg += `${('`' + service.name + '`:').padEnd(15)}${service.description}\n`;
    }

    this.helpMessage = template.toString()
      .replace(/{{description}}/g, this.description)
      .replace(/{{prefix}}/g, this.prefix)
      .replace(/{{services}}/g, servicesMsg);
  }

  public getHelpMessage (): string {
    return this.helpMessage;
  }
}