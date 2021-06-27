import { Command } from '../Class/Command';
import { LiveGetSubcommand } from './Live/LiveGetSubcommand';

const LiveCommand = new Command({
  name: 'live',
  description: 'Information about live, upcoming and recently ended streams.'
});

LiveCommand.addSubcommand(LiveGetSubcommand);

export  {
  LiveCommand,
};