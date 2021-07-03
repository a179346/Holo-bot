import { NestedCommand } from '../Class/NestedCommand';
import { LiveGetSubcommand } from './Live/LiveGetSubcommand';

const LiveCommand = new NestedCommand({
  name: 'live',
  description: 'Information about live, upcoming and recently ended streams.'
}, [
  LiveGetSubcommand,
]);

export  {
  LiveCommand,
};