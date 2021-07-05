import { TypeOrmConnection } from '../utils/typeorm-connection';
import { Repository } from 'typeorm';
import { live, LiveStatus, PubStatus } from '../entity/live';
import { channel } from '../entity/channel';
import { ICache } from '../cache/ICahce';
import { LocalCache } from '../cache/LocalCache';

const cache: ICache<live[]> = new LocalCache();

// 1 MINUTE
const EXPIRE_MS = 1000 * 60 * 1;

class LiveDao {
  private get repository (): Repository<live> {
    return TypeOrmConnection.connection.getRepository(live);
  }

  public async fetch (channelId: number, liveStatus: LiveStatus[]) {
    const cacheKey = channelId + '-' + liveStatus.join('-');
    const cacheVal = await cache.get(cacheKey);
    if (cacheVal !== undefined)
      return cacheVal;

    const lives = await this.repository.createQueryBuilder()
      .select('live')
      .where('channelId = :channelId', { channelId })
      .andWhere('live_status IN (:...liveStatus)', { liveStatus })
      .getMany();

    await cache.set(cacheKey, lives, {
      expireMs: EXPIRE_MS,
    });

    return lives;
  }

  public async setPublished (live: live): Promise<live> {
    live.pub_status = PubStatus.PUBLISHED;
    return await this.repository.save(live);
  }

  public async fetchWaitingLives (): Promise<live[]> {
    return await this.repository.find({
      relations: [ 'channel' ],
      where: {
        live_status: LiveStatus.LIVE,
        pub_status: PubStatus.WAINTING,
      },
    });
  }

  public async deleteCanceled (liveIds: number[]) {
    await this.repository.createQueryBuilder()
      .delete()
      .from(live)
      .where('live_status IN (:...liveStatus)', { liveStatus: [ LiveStatus.UPCOMING, LiveStatus.LIVE ] })
      .andWhere('id NOT IN (:...liveIds)', { liveIds })
      .execute();
  }

  public async upsert (id: number, data: Partial<live> & { channel_id?: number }) {
    const model = (await this.repository.findOne(id)) || new live();

    model.id = id;
    if (data.yt_video_key !== undefined)
      model.yt_video_key = data.yt_video_key;
    if (data.title !== undefined)
      model.title = data.title;
    if (data.live_status !== undefined)
      model.live_status = data.live_status;
    if (data.pub_status !== undefined)
      model.pub_status = data.pub_status;
    if (data.live_schedule !== undefined)
      model.live_schedule = data.live_schedule;
    if (data.live_start !== undefined)
      model.live_start = data.live_start;
    if (data.live_end !== undefined)
      model.live_end = data.live_end;
    if (data.thumbnail !== undefined)
      model.thumbnail = data.thumbnail;
    if (data.channel_id !== undefined) {
      if (!model.channel)
        model.channel = new channel();
      model.channel.id = data.channel_id;
    }

    const updatedModel = await this.repository.save(model);

    return updatedModel;
  }
}

const liveDao = new LiveDao();

export {
  liveDao as LiveDao,
};