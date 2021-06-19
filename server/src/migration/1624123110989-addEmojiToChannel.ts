import { MigrationInterface, QueryRunner } from 'typeorm';

export class addEmojiToChannel1624123110989 implements MigrationInterface {
    name = 'addEmojiToChannel1624123110989'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `channel` ADD `emoji` varchar(32) NULL');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":star2:" WHERE id=1');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":candy:" WHERE id=2');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":water_buffalo:" WHERE id=3');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":croissant:" WHERE id=4');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":hammer_pick:" WHERE id=5');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":heart:" WHERE id=6');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":pizza:" WHERE id=7');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":nail_care:" WHERE id=8');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":crescent_moon:" WHERE id=10');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":wolf:" WHERE id=11');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":cherry_blossom:" WHERE id=12');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":corn:" WHERE id=13');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":dragon:" WHERE id=14');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":heart:" WHERE id=15');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":hedgehog::dash:" WHERE id=16');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":gear:" WHERE id=17');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":art:" WHERE id=19');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":wine_glass:" WHERE id=20');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":apple:" WHERE id=21');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":crystal_ball:" WHERE id=22');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":rice_ball:" WHERE id=23');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":izakaya_lantern:" WHERE id=24');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":ram:" WHERE id=25');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":crossed_swords:" WHERE id=26');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":butterfly:" WHERE id=27');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":hibiscus:" WHERE id=28');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":dizzy:" WHERE id=29');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":anchor:" WHERE id=30');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":chipmunk:" WHERE id=31');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":apple:" WHERE id=32');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":smiling_imp:" WHERE id=33');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":kiss:" WHERE id=34');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":kiss:" WHERE id=35');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":women_with_bunny_ears_partying:" WHERE id=36');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":performing_arts:" WHERE id=37');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":fire:" WHERE id=38');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":robot:" WHERE id=39');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":purple_circle:" WHERE id=40');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":bear:" WHERE id=41');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":guitar:" WHERE id=42');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":ambulance:" WHERE id=43');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":pirate_flag:" WHERE id=44');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":space_invader:" WHERE id=45');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":comet:" WHERE id=46');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":snowman2:" WHERE id=31879');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":dumpling:" WHERE id=31880');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":leo:" WHERE id=31881');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":tongue:" WHERE id=31882');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":circus_tent:" WHERE id=31883');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":skull:" WHERE id=199073');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":chicken:" WHERE id=199074');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":octopus:" WHERE id=199075');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":trident:" WHERE id=199076');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":mag_right:" WHERE id=199077');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":woman_zombie:" WHERE id=676413');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":fallen_leaf:" WHERE id=676414');
      await queryRunner.query('UPDATE `channel` SET `emoji`=":peacock:" WHERE id=676415');
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `channel` DROP COLUMN `emoji`');
    }

}
