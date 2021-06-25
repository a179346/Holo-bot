import { MigrationInterface, QueryRunner } from 'typeorm';

export class deleteCanceledLiveIndex1624640575868 implements MigrationInterface {
    name = 'deleteCanceledLiveIndex1624640575868'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE INDEX `IDX_bc2a4fcf62cceedfbc047e57e8` ON `live` (`live_status`, `id`)');
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP INDEX `IDX_bc2a4fcf62cceedfbc047e57e8` ON `live`');
    }

}
