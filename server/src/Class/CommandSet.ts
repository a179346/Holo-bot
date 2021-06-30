import { Collection } from 'discord.js';
import { Command } from './Command';

export class CommandSet extends Collection<string, Command> {
}