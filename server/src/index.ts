import 'reflect-metadata';
import { logging } from './utils/logging';
import { TypeOrmConnection } from './utils/typeorm-connection';
import { Lib } from './lib/common';

const NAMESPACE = 'Index';
start();

async function start () {
  try {
    Lib.retry(async () => {
      logging.info(NAMESPACE, 'connecting to db ...');
      await TypeOrmConnection.init();
    }, 3, 3000);
    logging.info(NAMESPACE, 'db successfully connected.');
  } catch (error) {
    logging.error(NAMESPACE, (error as Error).message, error);
  }
}
