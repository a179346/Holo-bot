import { TypeOrmConnection } from '../utils/typeorm-connection';
import { Repository } from 'typeorm';
import { channel_nickname } from '../entity/channel_nickname';
import { LocalCache } from '../cache/LocalCache';
import { ICache } from '../cache/ICahce';

const cache: ICache<channel_nickname | null> = new LocalCache();
// 15 MINUTES
const EXPIRE_MS = 1000 * 60 * 15;

class ChannelNicknameDao {
  private get repository (): Repository<channel_nickname> {
    return TypeOrmConnection.connection.getRepository(channel_nickname);
  }

  public async get (nickname: string): Promise<channel_nickname | null> {
    const lowerCaseNickname = nickname.toLowerCase();
    const cacheVal = await cache.get(lowerCaseNickname);
    if (cacheVal !== undefined)
      return cacheVal;

    const result = await this.repository.findOne(lowerCaseNickname, { relations: [ 'channel' ] }) || null;
    await cache.set(lowerCaseNickname, result, {
      expireMs: EXPIRE_MS,
    });
    return result;
  }
}

const channelNicknameDao = new ChannelNicknameDao();

export {
  channelNicknameDao as ChannelNicknameDao,
};