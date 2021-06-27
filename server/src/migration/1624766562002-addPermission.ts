import { MigrationInterface, QueryRunner } from 'typeorm';

export class addPermission1624766562002 implements MigrationInterface {
    name = 'addPermission1624766562002'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE `permission` (`discord_channel_id` varchar(20) NOT NULL, `permission_type` enum (\'subscription\', \'permission\') NOT NULL, `role_id` varchar(32) NOT NULL, PRIMARY KEY (`discord_channel_id`, `permission_type`, `role_id`)) ENGINE=InnoDB');
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE `permission`');
    }

}
