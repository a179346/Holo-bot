import { TypeOrmConnection } from '../utils/typeorm-connection';
import { Repository } from 'typeorm';
import { permission, PermissionType } from '../entity/permission';
import { LocalCache } from '../cache/LocalCache';
import { CacheOptionType, ICache } from '../cache/ICahce';

const cache: ICache<permission[]> = new LocalCache();
const cacheKey = (discord_channel_id: string, permissionType: PermissionType) => discord_channel_id + '-' + permissionType;
// 5 MINUTES
const EXPIRE_MS = 1000 * 60 * 5;

class PermissionDao {
  private get repository (): Repository<permission> {
    return TypeOrmConnection.connection.getRepository(permission);
  }

  public async list (discord_channel_id: string, permissionType: PermissionType): Promise<permission[]> {
    const key = cacheKey(discord_channel_id, permissionType);
    const cacheVal = await cache.get(key);
    if (cacheVal !== undefined)
      return cacheVal;

    const permissions = await this.repository.find({
      discord_channel_id,
      permission_type: permissionType,
    });

    await cache.set(key, permissions, {
      type: CacheOptionType.EXPIRE_MS,
      expireMs: EXPIRE_MS,
    });

    return permissions;
  }

  public async remove (discord_channel_id: string, permissionType: PermissionType, roleId: string): Promise<void> {
    await this.repository.delete({
      discord_channel_id,
      permission_type: permissionType,
      role_id: roleId,
    });

    const key = cacheKey(discord_channel_id, permissionType);
    await cache.delete(key);
  }

  public async insert (discord_channel_id: string, permissionType: PermissionType, roleId: string): Promise<permission> {
    const model = new permission();

    model.discord_channel_id = discord_channel_id;
    model.permission_type = permissionType;
    model.role_id = roleId;

    const result =  await this.repository.save(model);

    const key = cacheKey(discord_channel_id, permissionType);
    await cache.delete(key);

    return result;
  }
}

const permissionDao = new PermissionDao();

export {
  permissionDao as PermissionDao,
};