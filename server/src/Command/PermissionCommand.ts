import { NestedCommand } from '../Class/NestedCommand';
import { ReplyError } from '../Class/ReplyError';
import { PermissionType } from '../entity/permission';
import { Lib } from '../lib/common';
import { PermissionAddSubcommand } from './Permission/PermissionAddSubcommand';
import { PermissionGetSubcommand } from './Permission/PermissionGetSubcommand';
import { PermissionRemoveSubcommand } from './Permission/PermissionRemoveSubcommand';

const PermissionCommand = new NestedCommand({
  name: 'permission',
  description: 'Get or edit permissions for a role who have access to Holo-bot advanced commands.',
}, [
  PermissionAddSubcommand,
  PermissionGetSubcommand,
  PermissionRemoveSubcommand,
]);

PermissionCommand.setCheckEvent(async (interaction) => {
  if (interaction.guild === null)
    throw new ReplyError('Permission is not available in DM.');
  const permissionResult = await Lib.checkPermission(interaction, PermissionType.permission, true);
  if (!permissionResult)
    throw new ReplyError('Permission denied. Please contact the channel owner.');
});

export  {
  PermissionCommand,
};