import { Command } from '../Class/Command';
import { CommandOptionType } from '../interface/CommandOptionType';
import { promises as fsPromises } from 'fs';
import * as path from 'path';
import { ReplyError } from '../Class/ReplyError';

let about: string;

export const AboutCommand = new Command({
  name: 'about',
  description: 'Introduction of Holo-bot.',
  options: [ {
    name: 'private-reply',
    description: 'If false, reply is public.',
    type: CommandOptionType.BOOLEAN,
    required: true,
  }, ]
}, async (interaction) => {
  const privateReply = interaction.options.get('private-reply')?.value;
  if (typeof privateReply !== 'boolean')
    throw new ReplyError('Invalid options: "private-reply"');

  interaction.reply({
    content: about,
    ephemeral: privateReply,
  });
});

AboutCommand.setInitFunction(async () => {
  about = (await fsPromises.readFile(path.resolve(__dirname, '../nonTsFiles/about.md'))).toString();
});