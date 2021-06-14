import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { channel } from './channel';

@Entity()
export class subscription {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 20 })
    discord_channel_id!: string;

    @ManyToOne(() => channel)
    channel!: channel;
}