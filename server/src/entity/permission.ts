import { Snowflake } from 'discord.js';
import { Entity, PrimaryColumn } from 'typeorm';

export enum PermissionType {
    subscription = 'subscription',
    permission = 'permission',
}

@Entity()
export class permission {
    @PrimaryColumn({
      type: 'varchar',
      length: 20,
    })
    discord_channel_id!: Snowflake;

    @PrimaryColumn({
      type: 'enum',
      enum: PermissionType,
    })
    permission_type!: PermissionType;

    @PrimaryColumn({
      type: 'varchar',
      length: 32
    })
    role_id!: Snowflake;
}