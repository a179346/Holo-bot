import { Subcommand } from '../../Class/Subcommand';
import { ReplyError } from '../../Class/ReplyError';
import { CommandOptionType } from '../../interface/CommandOptionType';
import { Lib } from '../../lib/common';
import { PermissionType } from '../../entity/permission';
import { PermissionDao } from '../../dao/Permission';

const PermissionRemoveSubcommand = new Subcommand({
  name: 'remove',
  description: 'Remove permission from a role for Holo-bot advanced commands.',
  type: CommandOptionType.SUB_COMMAND,
  options: [ {
    name: 'permission-type',
    description: 'Command the role can\'t get access to.',
    type: CommandOptionType.STRING,
    choices: Lib.enumToChoices(PermissionType),
    required: true,
  }, {
    name: 'role',
    description: 'Role to remove permission from.',
    type: CommandOptionType.ROLE,
    required: true,
  }, ]
}, async (interaction, options) => {
  const permissionType = options.get('permission-type')?.value as PermissionType;
  const role = options.get('role')?.value;
  if (!(Object.values(PermissionType).includes(permissionType)))
    throw new ReplyError('Invalid Options: "permission-type"');
  if (typeof role !== 'string')
    throw new ReplyError('Invalid Options: "role"');

  const roleName = interaction.guild?.roles.cache.get(Lib.ToSnowflake(role))?.name;
  if (!roleName)
    throw new ReplyError('Unknown Role Id: "' + role + '". Please retry later.');

  await PermissionDao.remove(interaction.channelID, permissionType, role);

  interaction.reply({
    content: 'Permission removed: "' + roleName + '" for "' + permissionType + '"',
    ephemeral: false,
  });
});

export {
  PermissionRemoveSubcommand,
};