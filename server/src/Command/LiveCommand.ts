import { NestedCommand } from '../Class/NestedCommand';
import { LiveGetSubcommand } from './Live/LiveGetSubcommand';
import { LiveListSubcommand } from './Live/LiveListSubcommand';

const LiveCommand = new NestedCommand({
  name: 'live',
  description: 'Information about live, upcoming and recently ended streams.'
}, [
  LiveGetSubcommand,
  LiveListSubcommand,
]);

export  {
  LiveCommand,
};