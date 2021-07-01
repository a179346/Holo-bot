import { Layer2Command } from '../Class/Layer2Command';
import { ReplyError } from '../Class/ReplyError';
import { PermissionType } from '../entity/permission';
import { Lib } from '../lib/common';
import { PermissionAddSubcommand } from './Permission/PermissionAddSubcommand';
import { PermissionGetSubcommand } from './Permission/PermissionGetSubcommand';
import { PermissionRemoveSubcommand } from './Permission/PermissionRemoveSubcommand';

const PermissionCommand = new Layer2Command({
  name: 'permission',
  description: 'Get or edit permissions for a role who have access to Holo-bot advanced commands.',
}, async (interaction) => {
  const permissionResult = await Lib.checkPermission(interaction, PermissionType.permission, true);
  if (!permissionResult)
    throw new ReplyError('Permission denied. Please contact the channel owner.');
});

PermissionCommand.addSubcommand(PermissionAddSubcommand);
PermissionCommand.addSubcommand(PermissionGetSubcommand);
PermissionCommand.addSubcommand(PermissionRemoveSubcommand);

export  {
  PermissionCommand,
};