import { Subcommnad } from '../../Class/Subcommand';
import { ReplyError } from '../../Class/ReplyError';
import { CommandOptionType } from '../../interface/CommandOptionType';
import { Lib } from '../../lib/common';
import { PermissionType } from '../../entity/permission';
import { PermissionDao } from '../../dao/Permission';

const PermissionAddSubcommand = new Subcommnad({
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
}, async (interaction) => {
  const subCommandOptions = interaction.options.first()?.options;
  if (!subCommandOptions)
    throw new ReplyError('Invalid Options');
  const permissionType = subCommandOptions.get('permission-type')?.value as PermissionType;
  const role = subCommandOptions.get('role')?.value;
  if (!(Object.values(PermissionType).includes(permissionType)))
    throw new ReplyError('Invalid Options: "permission-type"');
  if (typeof role !== 'string')
    throw new ReplyError('Invalid Options: "role"');

  const roleName = interaction.guild?.roles.cache.get(Lib.ToSnowflake(role))?.name;
  if (!roleName)
    throw new ReplyError('Unknown Role Id: "' + role + '". Please retry later.');

  await PermissionDao.insert(interaction.channelID, permissionType, role);

  interaction.reply({
    content: 'Permission added: "' + roleName + '" for "' + permissionType + '"',
    ephemeral: false,
  });
});

export {
  PermissionAddSubcommand,
};