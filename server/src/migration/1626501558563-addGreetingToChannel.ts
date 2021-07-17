import { MigrationInterface, QueryRunner } from 'typeorm';

export class addGreetingToChannel1626501558563 implements MigrationInterface {
    name = 'addGreetingToChannel1626501558563'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `channel` ADD `greeting` varchar(256) NULL');

      await queryRunner.query('UPDATE `channel` SET `greeting`="こんかぷ〜 (Konkapu~)" WHERE `id`=1');
      await queryRunner.query('UPDATE `channel` SET `greeting`="んなああああああああ (Nnaaaaa~)" WHERE `id`=2');
      await queryRunner.query('UPDATE `channel` SET `greeting`=NULL WHERE `id`=3');
      await queryRunner.query('UPDATE `channel` SET `greeting`="ぉぁょ～ (Oayo~)" WHERE `id`=4');
      await queryRunner.query('UPDATE `channel` SET `greeting`="こんあずきー (Konazki~)" WHERE `id`=5');
      await queryRunner.query('UPDATE `channel` SET `greeting`="はあちゃまっちゃま～ (Haachama chama~)" WHERE `id`=6');
      await queryRunner.query('UPDATE `channel` SET `greeting`=NULL WHERE `id`=7');
      await queryRunner.query('UPDATE `channel` SET `greeting`=NULL WHERE `id`=8');
      await queryRunner.query('UPDATE `channel` SET `greeting`=NULL WHERE `id`=9');
      await queryRunner.query('UPDATE `channel` SET `greeting`=NULL WHERE `id`=10');
      await queryRunner.query('UPDATE `channel` SET `greeting`="こんばんみぉーん (Konbanmion!!)" WHERE `id`=11');
      await queryRunner.query('UPDATE `channel` SET `greeting`="にゃっはろー！ (NyaHello!)" WHERE `id`=12');
      await queryRunner.query('UPDATE `channel` SET `greeting`="こんばんきつね! (Konban Kitsune!)" WHERE `id`=13');
      await queryRunner.query('UPDATE `channel` SET `greeting`="こんドラゴーン！ (Kondragon!)" WHERE `id`=14');
      await queryRunner.query('UPDATE `channel` SET `greeting`="こんきし〜 (Konkishi~)" WHERE `id`=16');
      await queryRunner.query('UPDATE `channel` SET `greeting`="ハロロイド〜 (Haloroido~)" WHERE `id`=17');
      await queryRunner.query('UPDATE `channel` SET `greeting`=NULL WHERE `id`=18');
      await queryRunner.query('UPDATE `channel` SET `greeting`="OBISA!" WHERE `id`=19');
      await queryRunner.query('UPDATE `channel` SET `greeting`="AAAAAAAAAAAAAAAAAAAAAAA" WHERE `id`=20');
      await queryRunner.query('UPDATE `channel` SET `greeting`="Haloooooooo" WHERE `id`=22');
      await queryRunner.query('UPDATE `channel` SET `greeting`="もぐもぐ (mogu mogu)" WHERE `id`=23');
      await queryRunner.query('UPDATE `channel` SET `greeting`="こんばんわっしょーい！ (Konbanwasshoi!)" WHERE `id`=24');
      await queryRunner.query('UPDATE `channel` SET `greeting`="こんばんドドドー！ (Konban dododo!)" WHERE `id`=25');
      await queryRunner.query('UPDATE `channel` SET `greeting`="こんまっする〜 (Konmuscle)" WHERE `id`=26');
      await queryRunner.query('UPDATE `channel` SET `greeting`="こんるし！ (Konrushi!)" WHERE `id`=27');
      await queryRunner.query('UPDATE `channel` SET `greeting`="Konmiyabi~" WHERE `id`=28');
      await queryRunner.query('UPDATE `channel` SET `greeting`="こんかなた～ (Konkanata~)" WHERE `id`=29');
      await queryRunner.query('UPDATE `channel` SET `greeting`="こんあくあ！ (KonAqua!)" WHERE `id`=30');
      await queryRunner.query('UPDATE `channel` SET `greeting`=NULL WHERE `id`=31');
      await queryRunner.query('UPDATE `channel` SET `greeting`="アローナ (​Alona)" WHERE `id`=32');
      await queryRunner.query('UPDATE `channel` SET `greeting`="こんなきり (Konnakiri)" WHERE `id`=33');
      await queryRunner.query('UPDATE `channel` SET `greeting`="ちょこーん (​Chocon~)" WHERE `id`=34');
      await queryRunner.query('UPDATE `channel` SET `greeting`="こんぺこ こんぺこ こんぺこー！ (Konpeko Konpeko Konpeko!)" WHERE `id`=36');
      await queryRunner.query('UPDATE `channel` SET `greeting`=NULL WHERE `id`=37');
      await queryRunner.query('UPDATE `channel` SET `greeting`="こんぬい〜 (Konnui~)" WHERE `id`=38');
      await queryRunner.query('UPDATE `channel` SET `greeting`="はろーぼー (Haro~bo~)" WHERE `id`=39');
      await queryRunner.query('UPDATE `channel` SET `greeting`=NULL WHERE `id`=40');
      await queryRunner.query('UPDATE `channel` SET `greeting`="こんそめー (​Konsome~)" WHERE `id`=41');
      await queryRunner.query('UPDATE `channel` SET `greeting`=NULL WHERE `id`=42');
      await queryRunner.query('UPDATE `channel` SET `greeting`="Shuba Shuba Shuba" WHERE `id`=43');
      await queryRunner.query('UPDATE `channel` SET `greeting`="​Ahoy!" WHERE `id`=44');
      await queryRunner.query('UPDATE `channel` SET `greeting`="こんやっぴー (​Konyappi!)" WHERE `id`=45');
      await queryRunner.query('UPDATE `channel` SET `greeting`="今日もかわいい!! (Kyou mo kawaii!!!)" WHERE `id`=46');
      await queryRunner.query('UPDATE `channel` SET `greeting`="こんらみです (Konlamy desu)" WHERE `id`=31879');
      await queryRunner.query('UPDATE `channel` SET `greeting`="こんねねー (Konnene~)" WHERE `id`=31880');
      await queryRunner.query('UPDATE `channel` SET `greeting`="ららーいおん (La La-ion)" WHERE `id`=31881');
      await queryRunner.query('UPDATE `channel` SET `greeting`=NULL WHERE `id`=31882');
      await queryRunner.query('UPDATE `channel` SET `greeting`="ポルカおるよ！ (Polka oru yo!)" WHERE `id`=31883');
      await queryRunner.query('UPDATE `channel` SET `greeting`=NULL WHERE `id`=169380');
      await queryRunner.query('UPDATE `channel` SET `greeting`=NULL WHERE `id`=199073');
      await queryRunner.query('UPDATE `channel` SET `greeting`="Kikkerikiii" WHERE `id`=199074');
      await queryRunner.query('UPDATE `channel` SET `greeting`="WAH!" WHERE `id`=199075');
      await queryRunner.query('UPDATE `channel` SET `greeting`=NULL WHERE `id`=199076');
      await queryRunner.query('UPDATE `channel` SET `greeting`=NULL WHERE `id`=199077');
      await queryRunner.query('UPDATE `channel` SET `greeting`="​Ohayollie!" WHERE `id`=676413');
      await queryRunner.query('UPDATE `channel` SET `greeting`=NULL WHERE `id`=676414');
      await queryRunner.query('UPDATE `channel` SET `greeting`=NULL WHERE `id`=676415');
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `channel` DROP COLUMN `greeting`');
    }

}
