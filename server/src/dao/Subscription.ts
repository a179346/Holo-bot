import { TypeOrmConnection } from '../utils/typeorm-connection';
import { Repository } from 'typeorm';
import { channel } from '../entity/channel';
import { subscription } from '../entity/subscription';

class SubscriptionDao {
  private get repository (): Repository<subscription> {
    return TypeOrmConnection.connection.getRepository(subscription);
  }

  public async insert (discord_channel_id: string, channelId: number): Promise<subscription> {
    const sub = new subscription();

    sub.discord_channel_id = discord_channel_id;
    sub.channel = new channel();
    sub.channel.id = channelId;

    return await this.repository.save(sub);
  }
}

const subscriptionDao = new SubscriptionDao();

export {
  subscriptionDao as SubscriptionDao,
};