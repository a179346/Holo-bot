import { MigrationInterface, QueryRunner } from 'typeorm';

export class addIndices1624451565139 implements MigrationInterface {
    name = 'addIndices1624451565139'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `subscription` CHANGE `id` `id` int NOT NULL');
      await queryRunner.query('ALTER TABLE `subscription` DROP PRIMARY KEY');
      await queryRunner.query('ALTER TABLE `subscription` DROP COLUMN `id`');
      await queryRunner.query('ALTER TABLE `subscription` ADD PRIMARY KEY (`discord_channel_id`, `channelId`)');

      await queryRunner.query('CREATE INDEX `IDX_4bb9ade67c8effe81a7bab4818` ON `live` (`live_status`, `pub_status`)');
      await queryRunner.query('CREATE INDEX `IDX_b6f49334b19d582cb9c7655346` ON `live` (`channelId`, `live_status`)');
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP INDEX `IDX_b6f49334b19d582cb9c7655346` ON `live`');
      await queryRunner.query('DROP INDEX `IDX_4bb9ade67c8effe81a7bab4818` ON `live`');

      await queryRunner.query('ALTER TABLE `subscription` DROP PRIMARY KEY');
      await queryRunner.query('ALTER TABLE `subscription` ADD `id` int NOT NULL AUTO_INCREMENT');
      await queryRunner.query('ALTER TABLE `subscription` ADD PRIMARY KEY (`id`)');
      await queryRunner.query('ALTER TABLE `subscription` CHANGE `id` `id` int NOT NULL AUTO_INCREMENT');
    }

}
