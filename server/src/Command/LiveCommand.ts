import { Layer2Command } from '../Class/Layer2Command';
import { LiveGetSubcommand } from './Live/LiveGetSubcommand';

const LiveCommand = new Layer2Command({
  name: 'live',
  description: 'Information about live, upcoming and recently ended streams.'
});

LiveCommand.addSubcommand(LiveGetSubcommand);

export  {
  LiveCommand,
};