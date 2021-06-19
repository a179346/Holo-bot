import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { channel_nickname } from './channel_nickname';

@Entity()
export class channel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    holo_api_id!: number;

    @Column({ length: 24 })
    yt_channel_id!: string;

    @Column({ length: 64 })
    twitter_link!: string;

    @Column({ length: 128 })
    name!: string;

    @Column({ length: 32, nullable: true })
    emoji?: string;

    @OneToMany(() => channel_nickname, (channel_nickname) => channel_nickname.channel)
    nicknames!: string[];
}