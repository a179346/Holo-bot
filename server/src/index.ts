import 'reflect-metadata';
import { logging } from './utils/logging';
import { TypeOrmConnection } from './utils/typeorm-connection';
import { Lib } from './lib/common';
import { config } from './system/config';
import { bot } from './bot';
import { Jobs } from './cron';

const NAMESPACE = 'Index';
start();

async function start () {
  try {
    await Lib.retry(async () => {
      logging.info(NAMESPACE, 'connecting to db ...');
      await TypeOrmConnection.init();
    }, 3, 3000);

    await Jobs.start();

    await bot.init(config.DISCORD_BOT.TOKEN, config.DISCORD_BOT.USER_ID);
  } catch (error) {
    logging.error(NAMESPACE, (error as Error).message, error);
  }
}