import { Entity, PrimaryColumn } from 'typeorm';

export enum PermissionType {
    subscription = 'subscription',
    permission = 'permission',
}

@Entity()
export class permission {
    @PrimaryColumn({ length: 20 })
    discord_channel_id!: string;

    @PrimaryColumn({
      type: 'enum',
      enum: PermissionType,
    })
    permission_type!: PermissionType;

    @PrimaryColumn({
      length: 32
    })
    role_id!: string;
}