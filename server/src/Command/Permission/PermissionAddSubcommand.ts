import { Subcommand } from '../../Class/Subcommand';
import { ReplyError } from '../../Class/ReplyError';
import { CommandOptionType } from '../../interface/CommandOptionType';
import { Lib } from '../../lib/common';
import { PermissionType } from '../../entity/permission';
import { PermissionDao } from '../../dao/Permission';

const PermissionAddSubcommand = new Subcommand({
  name: 'add',
  description: 'Assign permission to a role for Holo-bot advanced commands.',
  type: CommandOptionType.SUB_COMMAND,
  options: [ {
    name: 'permission-type',
    description: 'Command the role can get access to.',
    type: CommandOptionType.STRING,
    choices: Lib.enumToChoices(PermissionType),
    required: true,
  }, {
    name: 'role',
    description: 'Role to assign permission to.',
    type: CommandOptionType.ROLE,
    required: true,
  }, ]
}, async (interaction, options) => {
  const permissionType = options.getString('permission-type') as PermissionType;
  const role = options.getRole('role');
  if (!(Object.values(PermissionType).includes(permissionType)))
    throw new ReplyError('Invalid Options: "permission-type"');
  if (!role)
    throw new ReplyError('Invalid Options: "role"');
  const roleId = Lib.ToSnowflake(role.id);

  const roleName = interaction.guild?.roles.cache.get(roleId)?.name;
  if (!roleName)
    throw new ReplyError('Unknown Role Id: "' + role.id + '". Please retry later.');

  await PermissionDao.insert(interaction.channelId, permissionType, roleId);

  interaction.reply({
    content: 'Permission added: "' + roleName + '" for "' + permissionType + '"',
    ephemeral: false,
  });
});

export {
  PermissionAddSubcommand,
};