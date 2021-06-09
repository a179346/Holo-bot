import { createConnection, Connection } from 'typeorm';
import { config } from '../system/config';
import * as path from 'path';
class TypeormConnection {
  private my_connection!: Connection;

  public async init () {
    this.my_connection = await createConnection({
      type: 'mysql',
      host: config.DB.HOST,
      port: config.DB.PORT,
      username: config.DB.USERNAME,
      password: config.DB.PASSWORD,
      database: config.DB.DATABASE,
      entities: [ path.resolve(__dirname, '../entity/*') ],
      synchronize: true,
    });
  }

  public get connection () {
    return this.my_connection;
  }
}

export const TypeOrmConnection = (new TypeormConnection());