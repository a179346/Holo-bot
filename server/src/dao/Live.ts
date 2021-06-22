import { TypeOrmConnection } from '../utils/typeorm-connection';
import { Repository } from 'typeorm';
import { live } from '../entity/live';
import { channel } from '../entity/channel';

class LiveDao {
  private get repository (): Repository<live> {
    return TypeOrmConnection.connection.getRepository(live);
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