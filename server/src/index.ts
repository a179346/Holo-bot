import 'reflect-metadata';
import { logging } from './utils/logging';
import { TypeOrmConnection } from './utils/typeorm-connection';
import { Lib } from './lib/common';
import { config } from './system/config';
import { Bot } from './bot';
import { HoloBotServiceSet } from './HoloBotServiceSet';

const NAMESPACE = 'Index';
start();

async function start () {
  try {
    Lib.retry(async () => {
      logging.info(NAMESPACE, 'connecting to db ...');
      await TypeOrmConnection.init();
    }, 3, 3000);

    logging.info(NAMESPACE, 'init HoloBot ServiceSet');
    await HoloBotServiceSet.init();

    logging.info(NAMESPACE, 'Logging in to discord ...');
    const bot = new Bot([ HoloBotServiceSet ]);
    bot.init();
    bot.login(config.DISCORD_BOT.TOKEN);
  } catch (error) {
    logging.error(NAMESPACE, (error as Error).message, error);
  }
}