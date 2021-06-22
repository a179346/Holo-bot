import { TypeOrmConnection } from '../utils/typeorm-connection';
import { Repository } from 'typeorm';
import { channel } from '../entity/channel';
import { subscription } from '../entity/subscription';

class SubscriptionDao {
  private get repository (): Repository<subscription> {
    return TypeOrmConnection.connection.getRepository(subscription);
  }

  public async remove (discord_channel_id: string, channelId: number): Promise<void> {
    await this.repository.delete({
      discord_channel_id,
      channel: { id: channelId }
    });
  }

  public async insert (discord_channel_id: string, channelId: number): Promise<subscription> {
    const sub = await this.repository.findOne({
      discord_channel_id,
      channel: { id: channelId }
    });
    if (sub) return sub;

    const model = new subscription();

    model.discord_channel_id = discord_channel_id;
    model.channel = new channel();
    model.channel.id = channelId;

    return await this.repository.save(model);
  }
}

const subscriptionDao = new SubscriptionDao();

export {
  subscriptionDao as SubscriptionDao,
};