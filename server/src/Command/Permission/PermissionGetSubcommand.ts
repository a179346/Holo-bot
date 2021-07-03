import { Subcommand } from '../../Class/Subcommand';
import { CommandOptionType } from '../../interface/CommandOptionType';
import { Lib } from '../../lib/common';
import { PermissionType } from '../../entity/permission';
import { PermissionDao } from '../../dao/Permission';
import { ReplyError } from '../../Class/ReplyError';

const PermissionGetSubcommand = new Subcommand({
  name: 'get',
  description: 'Get roles who have access to a Holo-bot advanced command.',
  type: CommandOptionType.SUB_COMMAND,
  options: [ {
    name: 'permission-type',
    description: 'Command the roles can get access to.',
    type: CommandOptionType.STRING,
    choices: Lib.enumToChoices(PermissionType),
    required: true,
  }, {
    name: 'private-reply',
    description: 'If false, reply is public.',
    type: CommandOptionType.BOOLEAN,
    required: true,
  }, ]
}, async (interaction, options) => {
  const permissionType = options.get('permission-type')?.value as PermissionType;
  const privateReply = options.get('private-reply')?.value;
  if (!(Object.values(PermissionType).includes(permissionType)))
    throw new ReplyError('Invalid Options: "permission-type"');
  if (typeof privateReply !== 'boolean')
    throw new ReplyError('Invalid Options: "private-reply"');

  const permissions = await PermissionDao.list(interaction.channelID, permissionType);

  const prefix = '\n◎    ';
  let info = '【Permission for "' + permissionType + '"】';

  for (const permission of permissions) {
    const roleName = interaction.guild?.roles.cache.get(Lib.ToSnowflake(permission.role_id))?.name;
    if (roleName)
      info += prefix + roleName;
  }

  interaction.reply({
    content: info,
    ephemeral: privateReply,
  });
});

export {
  PermissionGetSubcommand,
};