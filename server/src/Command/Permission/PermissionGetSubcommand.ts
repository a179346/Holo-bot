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
  const permissionType = options.getString('permission-type') as PermissionType;
  const privateReply = options.getBoolean('private-reply');
  if (!(Object.values(PermissionType).includes(permissionType)))
    throw new ReplyError('Invalid Options: "permission-type"');
  if (typeof privateReply !== 'boolean')
    throw new ReplyError('Invalid Options: "private-reply"');

  const permissions = await PermissionDao.list(interaction.channelId, permissionType);

  const prefix = '\n:ballot_box_with_check:    ';
  let info = '【Permission for "' + permissionType + '"】';

  for (const permission of permissions) {
    const roleName = interaction.guild?.roles.cache.get(permission.role_id)?.name;
    if (roleName)
      info += prefix + roleName;
  }

  await interaction.reply({
    content: info,
    ephemeral: privateReply,
  });
});

export {
  PermissionGetSubcommand,
};