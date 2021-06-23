import { TypeOrmConnection } from '../utils/typeorm-connection';
import { Repository } from 'typeorm';
import { channel } from '../entity/channel';
import { subscription } from '../entity/subscription';

class SubscriptionDao {
  private get repository (): Repository<subscription> {
    return TypeOrmConnection.connection.getRepository(subscription);
  }

  public async list (discord_channel_id: string): Promise<subscription[]> {
    return await this.repository.find({
      relations: [ 'channel' ],
      where: {
        discord_channel_id
      },
    });
  }

  public async getChannelSubs (channelId: number): Promise<subscription[]> {
    return await this.repository.find({
      channel: { id: channelId },
    });
  }

  public async remove (discord_channel_id: string, channelId: number): Promise<void> {
    await this.repository.delete({
      discord_channel_id,
      channel: { id: channelId }
    });
  }

  public async insert (discord_channel_id: string, channelId: number): Promise<subscription> {
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