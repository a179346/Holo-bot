import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { channel } from './channel';

@Entity()
export class channel_nickname {
    @PrimaryColumn({ length: 128 })
    nickname!: string;

    @ManyToOne(() => channel)
    channel!: channel;
}