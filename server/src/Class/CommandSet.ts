import { Command } from './Command';

export class CommandSet {
  public commands: Command[] = [];
  private commandMap: Map<string, Command> = new Map();

  public addCommand (command: Command) {
    this.commands.push(command);
    this.commandMap.set(command.options.name, command);
  }

  public getCommand (name: string) {
    return this.commandMap.get(name);
  }
}