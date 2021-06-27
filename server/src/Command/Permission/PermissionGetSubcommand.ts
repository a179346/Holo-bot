import { Subcommnad } from '../../Class/Subcommand';
import { CommandOptionType } from '../../interface/CommandOptionType';
import { Lib } from '../../lib/common';
import { PermissionType } from '../../entity/permission';
import { PermissionDao } from '../../dao/Permission';

interface PermissionGetBody {
  'permission-type': PermissionType;
  'private-reply': boolean;
}

const PermissionGetSubcommand = new Subcommnad({
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
}, async (interaction, body: PermissionGetBody) => {
  const permissions = await PermissionDao.list(interaction.channel.id, body['permission-type']);

  const prefix = '\n◎    ';
  let info = '【Permission for "' + body['permission-type'] + '"】';

  for (const permission of permissions) {
    const roleName = interaction.guild.roles.cache.get(permission.role_id)?.name;
    if (roleName)
      info += prefix + roleName;
  }

  interaction.reply(info, body['private-reply']);
});

export {
  PermissionGetSubcommand,
};