import { MigrationInterface, QueryRunner } from 'typeorm';

export class addPhotoAndThumbnail1625369955153 implements MigrationInterface {
    name = 'addPhotoAndThumbnail1625369955153'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `channel` ADD `photo` varchar(256) NULL');
      await queryRunner.query('ALTER TABLE `live` ADD `thumbnail` varchar(256) NULL');

      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLSwGrjnpZYhSj5yOV35k_CaXHeCbW1222lgtgbW=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=1');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/eUvyn2QlPppt7z5wew0upiGt2-o7c7rLKBlWynTrSdacjvtZYxZ7Sp6MuYumQJ-zSwzj6a6BDA=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=2');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLTn3QGX09ZS4rzV54zwhFWKbnJtrM5cPGsXfZPi=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=3');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLSegxVNNn4QGDwO-jO89ZDcYLSyPUQS3a4KU6QPCw=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=4');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLQQhnWKHLOLxjnXksGHHC8bnVS2UniL8Od6JTEPWQ=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=5');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLSq5U6B_Jfp0yVntj7BWcChY7uUqjDv2Cufa0isew=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=6');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLQH3CqU4dL9EWjrYl6aKn26_DAAHbCXEBVyMTaWZA=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=7');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLQrY9o5NRMtXpH3FJAqDHAZUAaLSQF30rG39h61=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=8');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLTj0OSWM9TvPy4e8v1_o99OtP3Bg7FXthdkgr2bCQ=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=9');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLRJYi-cOhqB22oEjWfdz__fHcs9iGjwz5UkPzvd-w=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=10');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLRP0h31urAKtYcu_j1foVuGyPU65_Y-VNBqLgHB5Q=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=11');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLRNGCUT1awYh91CbTr6r_v_6KspwpyAS4ZUxlucFQ=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=12');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLQWDSaTmBOPMp-zXxHeLYpKI7KG9q6t191LkMnkWg=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=13');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLQUA2htopp_nUXZScvJvh17wlOhSvcjAc-L75meCg=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=14');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLQ0BQQ-XduLbitSks-u2mY6x77v06sC5rcDVs48=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=15');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLRUGIQekUO7Yyzzx49nHpRozhPKLUmNDnEAL4Go=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=16');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLRs_MgPrlX2xo_2dvQQ05wbMkq--u_CIjR5Wt3T=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=17');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLSlv5sku0umxqGTUZnfX4c89WKyIQmlsjNqI4Yd=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=18');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLQNhNLAE1ECJuVKg9sO7PpiRd2g-kaq6VWB6Q69=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=19');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLTqeDflgueIvILxwFZSxbSdGIFTwdshGwEbrYN1=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=20');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLSJriRU-jBxQ6COzOBpZeMo2jefXzLh_qKWVq-I=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=21');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLS-qVI5LiWrtbyPF6wGK-nph-vEWf9BbDWoSDGYbA=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=22');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLT_TLZsRHyNXj_3v1QIfF5Z1LOEIKQPL_7HGH29=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=23');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLQCXDfJbZoEZ-gtUiF4nSaGU8-qiq--BSTd92Sw=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=24');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLRWpyqOZzCmuSfmKGNo8TD2L_IRUYSw1wyhHXw-=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=25');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLS1MTrG3Gn7-Vf_rVNAZ2Ou8KrmUGUXO6TmkLxe=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=26');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLR1en3cN55loPrFL1C5K19o5xGhcKkmr0noD4cO=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=27');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLQ9BDQIqfO728ZI5PmsMKb67thOI2NvpHqYFK5o=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=28');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLTgDWWow5gGLYfPKHxF8oNHegeUngIdT5HxDBo4=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=29');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLTbU5ET3bgn0Iuz1jUBNjgSe9EW8kLxIhDUrtJlPw=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=30');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLTjqfaFS9JlspGjiIah2kkxOtl4vRrxBCYKMEY5Kw=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=31');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLT4XEPRFwXpb4gZ1qco_xCOt7ems7SrUsGOkmXX=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=32');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLT7tdqZvDuxprLyB0qjVHKV53iGJ39a2FTbxX8X=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=33');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLQn_VxZ1ApMgQahrkcTtSdSAr6Jpxi4eHQiMnIlsw=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=34');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLT8t9_USgt289gErw3cmDEHmTXkXEhs6VAabZSf=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=35');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLSmHTeNNQp8A4AwsUPKzBa2ubDBWe6RSaG39mAYTw=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=36');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLQZtNrwtu1KawCZz7ph1erMEC8ZSGESvpjc_XMZ=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=37');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLS3w5WmjGJ4C-VOvMR7g3eVImLfwSTlQCofJCCkqA=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=38');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLTVWKjrovP0tGtguup9TYZicykceA45olVmEr2kvQ=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=39');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLQGNvHDfyCs8rriEj-HLxc46DTMutUuVI_spx83=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=40');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLQO9Vyz7ysAwPSio5xvkw6n0xvlyDu7A9eawqIH3w=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=41');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLRG60Hg-7N1Mmh47K7P6ghMf2hVaivdVk9I9fEWYA=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=42');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLRaQJl61Pxhsnrzz50wirogPn18pPUYL0YFAauj=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=43');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLQFVN7wLaJFbdPU56qOkNlbkrMneYpTmGpneRig=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=44');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLRL8tkRgdRpjzb1wlAajrJwXGg3p1hzt__ncFas=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=45');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLSAm13gTESsu39zgJ1TYb649BiGqYa_XCv5C6Lu=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=46');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLQDR06gp26jxNNXh88Hhv1o-pNrnlKrYruqUIOx=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=31879');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLQZBw4jihwhA_0JsKR8tRPOV1vHFdqI73hGE3OZ=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=31880');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLQXr6MeUpHI0-yNZIAaGXHvBVowhCWMwGx-zXYs=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=31881');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLQrOCnY-irlOXci6qiTqOz_nPm0F6_nSNh3QwsJ=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=31882');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLQI_iYxOpfP8bJklQ_VnS4a9jdrwRRlre_JP1Yp=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=31883');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLQ9BLV8NALtc_u9Ksfpr6aU1PVhe7bPk2hWiaFd=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=169380');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLQi2hR9UdCcWoDLz4sJYqAu9BkaYBGWex_th5ic=s800-c-k-c0x00ffffff-no-rj-mo" WHERE `id`=199073');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLRlcr4d2hFSydP7swZwUfZM5J3VWA3M41ucCVES=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=199074');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLRFAFjEvIwiZ_MrQvdY8-QbJkqvahsi3La78Jf7=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=199075');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLQpQAbNCTnAULoN1rWO6wBkhFNHTbMqDkd7gFhq=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=199076');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLTvS-8gomaJywaEKp3hnCmY92vQ9uKpy8rMAx3a=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=199077');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLRduH6Fb3Vz3FMl2-e0wNte81epj3w-LubC0nu2=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=200275');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLSILukXkRWs4cQHfyrX1HxdxAFTroZG7NpW-m8N=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=214950');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLQdamDv_y_sgGZGDeRhOqd-frNJQe2LBD68Sbw=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=214951');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLTnK8pIEgyaISVIgKeVpSjdKSTCFve8OVuH6wQ=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=676413');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLR0AplPQyxSjGhqMxJy7vAvXn-9hyaiXBoBE5vy=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=676414');
      await queryRunner.query('UPDATE `channel` SET `photo`="https://yt3.ggpht.com/ytc/AKedOLQfMF4yIvgoapLc07bB6a7ASN9iyGMgyE2UbwEM=s800-c-k-c0x00ffffff-no-rj" WHERE `id`=676415');
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `live` DROP COLUMN `thumbnail`');
      await queryRunner.query('ALTER TABLE `channel` DROP COLUMN `photo`');
    }

}
