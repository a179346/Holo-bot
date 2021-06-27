import { Subcommnad } from '../../Class/Subcommand';
import { ReplyError } from '../../Class/ReplyError';
import { CommandOptionType } from '../../interface/CommandOptionType';
import { Lib } from '../../lib/common';
import { PermissionType } from '../../entity/permission';
import { PermissionDao } from '../../dao/Permission';

interface PermissionRemoveBody {
  'permission-type': PermissionType;
  role: string;
}

const PermissionRemoveSubcommand = new Subcommnad({
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
}, async (interaction, body: PermissionRemoveBody) => {
  const roleName = interaction.guild.roles.cache.get(body.role)?.name;
  if (!roleName)
    throw new ReplyError('Unknown Role Id: "' + body.role + '". Please retry later.');

  await PermissionDao.remove(interaction.channel.id, body['permission-type'], body.role);

  interaction.reply('Permission removed: "' + roleName + '" for "' + body['permission-type'] + '"', false);
});

export {
  PermissionRemoveSubcommand,
};