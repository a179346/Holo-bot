import { MigrationInterface, QueryRunner } from 'typeorm';

export class addJP61642179699630 implements MigrationInterface {
    name = 'addJP61642179699630'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('INSERT INTO `channel` (`id`,`holo_api_id`,`yt_channel_id`,`twitter_link`,`name`,`emoji`,`photo`,`greeting`) VALUES (2908909,2908909,"UCENwRMx5Yh42zWpzURebzTw","LaplusDarknesss","Laplus ch. ラプラス・ダークネス - holoX -",":flying_saucer::purple_heart:","https://yt3.ggpht.com/roGS60A8a_lDbVakIg1JU3u3hbtjHSTilMGHMizuPKh7tuoY2nl46raxuW2f_83IKFGMjL6Z=s800-c-k-c0x00ffffff-no-rj",NULL)');
      await queryRunner.query('INSERT INTO `channel` (`id`,`holo_api_id`,`yt_channel_id`,`twitter_link`,`name`,`emoji`,`photo`,`greeting`) VALUES (2908910,2908910,"UCs9_O1tRPMQTHQ-N_L6FU2g","takanelui","Lui ch. 鷹嶺ルイ - holoX -",":wilted_rose:","https://yt3.ggpht.com/KO_kRAeAQ4C4M5xJDFOFHZ79ycCRfMxttefXIDFurZE2fsVPnmlHkMdM5zjEsUTH1i97xnxKNw=s800-c-k-c0x00ffffff-no-rj",NULL)');
      await queryRunner.query('INSERT INTO `channel` (`id`,`holo_api_id`,`yt_channel_id`,`twitter_link`,`name`,`emoji`,`photo`,`greeting`) VALUES (2908911,2908911,"UC6eWCld0KwmyHFbAqK3V-Rw","hakuikoyori","Koyori ch. 博衣こより - holoX -",":test_tube:","https://yt3.ggpht.com/DNC5rGjlwA4Ae7rhpPmkv_QdjJPl8AfpQT9NcXTLvPbbriL-Y0Ni-gYfFH8uoiF6Ay1EP9VnZAk=s800-c-k-c0x00ffffff-no-rj",NULL)');
      await queryRunner.query('INSERT INTO `channel` (`id`,`holo_api_id`,`yt_channel_id`,`twitter_link`,`name`,`emoji`,`photo`,`greeting`) VALUES (2908912,2908912,"UCIBY1ollUsauvVi4hW4cumw","sakamatachloe","Chloe ch. 沙花叉クロヱ - holoX -",":fishing_pole_and_fish:","https://yt3.ggpht.com/_xNtPLKQcQxMTnOr4tAcGz0GEeESsi0bQX9mJEP3fx_50a8GUfUyOG1eyLIld2cCz6GvKABwpQ=s800-c-k-c0x00ffffff-no-rj",NULL)');
      await queryRunner.query('INSERT INTO `channel` (`id`,`holo_api_id`,`yt_channel_id`,`twitter_link`,`name`,`emoji`,`photo`,`greeting`) VALUES (2908913,2908913,"UC_vMYWcDjmfdpH6r4TTn1MQ","kazamairohach","Iroha ch. 風真いろは - holoX -",":leaves:","https://yt3.ggpht.com/YK_UCAbw_pFBHSOw_LGWI-WCJDdvMP3y9mmODQ1IFEnNVvcf-M3-q22Db5TLWuAbfboMNFTMIg=s800-c-k-c0x00ffffff-no-rj",NULL)');

      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("LaplusDarknesss", 2908909)');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("LaplusDarkness", 2908909)');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("Laplus", 2908909)');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("Darknesss", 2908909)');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("Darkness", 2908909)');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("TakaneLui", 2908910)');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("Takane", 2908910)');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("Lui", 2908910)');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("HakuiKoyori", 2908911)');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("Hakui", 2908911)');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("Koyori", 2908911)');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("SakamataChloe", 2908912)');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("Sakamata", 2908912)');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("Chloe", 2908912)');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("KazamaIroha", 2908913)');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("Kazama", 2908913)');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("Iroha", 2908913)');
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DELET FROM `channel_nickname` WHERE `channelId`=2908913');
      await queryRunner.query('DELET FROM `channel_nickname` WHERE `channelId`=2908912');
      await queryRunner.query('DELET FROM `channel_nickname` WHERE `channelId`=2908911');
      await queryRunner.query('DELET FROM `channel_nickname` WHERE `channelId`=2908910');
      await queryRunner.query('DELET FROM `channel_nickname` WHERE `channelId`=2908909');
      await queryRunner.query('DELET FROM `channel` WHERE `id`=2908913');
      await queryRunner.query('DELET FROM `channel` WHERE `id`=2908912');
      await queryRunner.query('DELET FROM `channel` WHERE `id`=2908911');
      await queryRunner.query('DELET FROM `channel` WHERE `id`=2908910');
      await queryRunner.query('DELET FROM `channel` WHERE `id`=2908909');
    }

}
