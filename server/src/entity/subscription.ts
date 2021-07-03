import { Snowflake } from 'discord.js';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { channel } from './channel';

@Entity()
export class subscription {
    @PrimaryColumn({
      type: 'varchar',
      length: 20
    })
    discord_channel_id!: Snowflake;

    @ManyToOne(() => channel, { primary: true })
    channel!: channel;
}