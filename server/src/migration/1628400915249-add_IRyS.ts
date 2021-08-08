import { MigrationInterface, QueryRunner } from 'typeorm';

export class addIRyS1628400915249 implements MigrationInterface {
    name = 'addIRyS1628400915249'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('INSERT INTO `channel` (`id`,`holo_api_id`,`yt_channel_id`,`twitter_link`,`name`,`emoji`,`photo`,`greeting`) VALUES (2024827,2024827,"UC8rcEBzJSleTkf_-agPM20g","irys_en","IRyS Ch. hololive-EN",":gem:","https://yt3.ggpht.com/UwxlX1PuB_RwJyEUW_ofbBR6saY8n5_p8A9_1bY65zygFrfqIb1GM8dIK33EJboDDnRVyw=s800-c-k-c0x00ffffff-no-rj",NULL)');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("IRys", 2024827)');
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DELET FROM `channel_nickname` WHERE `channelId`=2024827');
      await queryRunner.query('DELET FROM `channel` WHERE `id`=2024827');
    }

}
