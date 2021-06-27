import { Command } from '../Class/Command';
import { PermissionAddSubcommand } from './Permission/PermissionAddSubcommand';
import { PermissionGetSubcommand } from './Permission/PermissionGetSubcommand';
import { PermissionRemoveSubcommand } from './Permission/PermissionRemoveSubcommand';

const PermissionCommand = new Command({
  name: 'permission',
  description: 'Get or edit permissions for a role who have access to Holo-bot advanced commands.',
});

PermissionCommand.addSubcommand(PermissionAddSubcommand);
PermissionCommand.addSubcommand(PermissionGetSubcommand);
PermissionCommand.addSubcommand(PermissionRemoveSubcommand);

export  {
  PermissionCommand,
};