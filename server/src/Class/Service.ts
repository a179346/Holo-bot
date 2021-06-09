import { Command } from './Command';

export class Service {
  public name: string;
  public description: string;
  public commands: Command[] = [];

  constructor (name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  addCommand (command: Command) {
    this.commands.push(command);
  }
}