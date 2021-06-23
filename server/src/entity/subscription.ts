import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { channel } from './channel';

@Entity()
export class subscription {
    @PrimaryColumn({ length: 20 })
    discord_channel_id!: string;

    @ManyToOne(() => channel, { primary: true })
    channel!: channel;
}