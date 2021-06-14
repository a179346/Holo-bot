import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { channel } from './channel';

export enum LiveStatus {
    UPCOMING = 'upcoming',
    LIVE = 'live',
    ENDED = 'ended',
}

export enum PubStatus {
    WAINTING = 'waiting',
    PUBLISHED = 'published',
}

@Entity()
export class live {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 64 })
    yt_video_key!: string;

    @Column({ length: 256 })
    title!: string;

    @Column({
      type: 'enum',
      enum: LiveStatus,
      default: LiveStatus.UPCOMING
    })
    live_status!: LiveStatus

    @Column({
      type: 'enum',
      enum: PubStatus,
      default: PubStatus.WAINTING
    })
    pub_status!: PubStatus

    @Column({ type: 'timestamp', nullable: true })
    live_schedule?: Date;

    @Column({ type: 'timestamp', nullable: true })
    live_start?: Date;

    @Column({ type: 'timestamp', nullable: true })
    live_end?: Date;

    @ManyToOne(() => channel)
    channel!: channel;
}