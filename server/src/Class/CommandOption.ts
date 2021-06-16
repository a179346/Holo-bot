export class CommandOption {
  public name: string;
  public argNames: string[];
  public description: string;
  public required: boolean;

  constructor (name: string, argNames: string[], description: string, required: boolean) {
    this.name = name;
    this.argNames = argNames;
    this.description = description;
    this.required = required;
  }
}