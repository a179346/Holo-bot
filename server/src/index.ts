import 'reflect-metadata';
import { logging } from './utils/logging';
import { TypeOrmConnection } from './utils/typeorm-connection';
import { Lib } from './lib/common';
import { config } from './system/config';
import { Bot } from './bot';
import { HoloBotServiceSet } from './HoloBotServiceSet';
import { Jobs } from './cron';

const NAMESPACE = 'Index';
start();

async function start () {
  try {
    await Lib.retry(async () => {
      logging.info(NAMESPACE, 'connecting to db ...');
      await TypeOrmConnection.init();
    }, 3, 3000);

    logging.info(NAMESPACE, 'init HoloBot ServiceSet');
    await HoloBotServiceSet.init();

    await Jobs.start();

    logging.info(NAMESPACE, 'Logging in to discord ...');
    const bot = new Bot([ HoloBotServiceSet ]);
    await bot.init(config.DISCORD_BOT.TOKEN);
  } catch (error) {
    logging.error(NAMESPACE, (error as Error).message, error);
  }
}