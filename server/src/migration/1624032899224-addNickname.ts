import { MigrationInterface, QueryRunner } from 'typeorm';

export class addNickname1624032899224 implements MigrationInterface {

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`, `channelId`) VALUES (\'Calli\', 199073);');
    await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`, `channelId`) VALUES (\'Kaichou\', 14);');
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM `channel_nickname` WHERE `nickname`=\'Calli\';');
    await queryRunner.query('DELETE FROM `channel_nickname` WHERE `nickname`=\'Kaichou\';');
  }

}
