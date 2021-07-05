import { TypeOrmConnection } from '../utils/typeorm-connection';
import { Repository } from 'typeorm';
import { channel } from '../entity/channel';
import { subscription } from '../entity/subscription';
import { Snowflake } from 'discord.js';
import { ICache } from '../cache/ICahce';
import { LocalCache } from '../cache/LocalCache';

const cache: ICache<subscription[]> = new LocalCache();
const cacheKey = (discord_channel_id: Snowflake) => discord_channel_id;
// 3 MINUTES
const EXPIRE_MS = 1000 * 60 * 3;

class SubscriptionDao {
  private get repository (): Repository<subscription> {
    return TypeOrmConnection.connection.getRepository(subscription);
  }

  public async list (discord_channel_id: Snowflake): Promise<subscription[]> {
    const key = cacheKey(discord_channel_id);
    const cacheVal = await cache.get(key);
    if (cacheVal !== undefined)
      return cacheVal;

    const subscriptions = await this.repository.find({
      relations: [ 'channel' ],
      where: {
        discord_channel_id
      },
    });

    await cache.set(key, subscriptions, {
      expireMs: EXPIRE_MS
    });

    return subscriptions;
  }

  public async getChannelSubs (channelId: number): Promise<subscription[]> {
    return await this.repository.find({
      channel: { id: channelId },
    });
  }

  public async remove (discord_channel_id: Snowflake, channelId: number): Promise<void> {
    await this.repository.delete({
      discord_channel_id,
      channel: { id: channelId }
    });

    const key = cacheKey(discord_channel_id);
    await cache.delete(key);
  }

  public async insert (discord_channel_id: Snowflake, channelId: number): Promise<subscription> {
    const model = new subscription();

    model.discord_channel_id = discord_channel_id;
    model.channel = new channel();
    model.channel.id = channelId;

    const sub = await this.repository.save(model);
    const key = cacheKey(discord_channel_id);
    await cache.delete(key);

    return sub;
  }
}

const subscriptionDao = new SubscriptionDao();

export {
  subscriptionDao as SubscriptionDao,
};