import { Command } from '../Class/Command';
import { CommandOptionType } from '../interface/CommandOptionType';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

interface AboutBody {
  'private-reply': boolean;
}

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
}, async (interaction, body: AboutBody) => {
  interaction.reply(about, body['private-reply']);
});

AboutCommand.setInitFunction(async () => {
  about = (await fsPromises.readFile(path.resolve(__dirname, '../nonTsFiles/about.md'))).toString();
});