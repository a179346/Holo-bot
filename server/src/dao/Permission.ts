import { TypeOrmConnection } from '../utils/typeorm-connection';
import { Repository } from 'typeorm';
import { permission, PermissionType } from '../entity/permission';

class PermissionDao {
  private get repository (): Repository<permission> {
    return TypeOrmConnection.connection.getRepository(permission);
  }

  public async list (discord_channel_id: string, permissionType: PermissionType): Promise<permission[]> {
    return await this.repository.find({
      discord_channel_id,
      permission_type: permissionType,
    });
  }

  public async remove (discord_channel_id: string, permissionType: PermissionType, roleId: string): Promise<void> {
    await this.repository.delete({
      discord_channel_id,
      permission_type: permissionType,
      role_id: roleId,
    });
  }

  public async insert (discord_channel_id: string, permissionType: PermissionType, roleId: string): Promise<permission> {
    const model = new permission();

    model.discord_channel_id = discord_channel_id;
    model.permission_type = permissionType;
    model.role_id = roleId;

    return await this.repository.save(model);
  }
}

const permissionDao = new PermissionDao();

export {
  permissionDao as PermissionDao,
};