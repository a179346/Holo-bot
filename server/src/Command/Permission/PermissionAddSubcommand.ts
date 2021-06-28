import { Subcommnad } from '../../Class/Subcommand';
import { ReplyError } from '../../Class/ReplyError';
import { CommandOptionType } from '../../interface/CommandOptionType';
import { Lib } from '../../lib/common';
import { PermissionType } from '../../entity/permission';
import { PermissionDao } from '../../dao/Permission';

interface PermissionAddBody {
  'permission-type': PermissionType;
  role: string;
}

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
}, async (interaction, body: PermissionAddBody) => {
  const roleName = interaction.guild.roles.cache.get(Lib.ToSnowflake(body.role))?.name;
  if (!roleName)
    throw new ReplyError('Unknown Role Id: "' + body.role + '". Please retry later.');

  await PermissionDao.insert(interaction.channel.id, body['permission-type'], body.role);

  interaction.reply('Permission added: "' + roleName + '" for "' + body['permission-type'] + '"', false);
});

export {
  PermissionAddSubcommand,
};