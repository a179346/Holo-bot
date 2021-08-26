import { MigrationInterface, QueryRunner } from 'typeorm';

export class addEN21629977802259 implements MigrationInterface {
    name = 'addEN21629977802259'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('INSERT INTO `channel` (`id`,`holo_api_id`,`yt_channel_id`,`twitter_link`,`name`,`emoji`,`photo`,`greeting`) VALUES (2260364,2260364,"UCsUj0dszADCGbF3gNrQEuSQ","tsukumosana","Tsukumo Sana Ch. hololive-EN",":ringed_planet:","https://yt3.ggpht.com/t1XymJVoo8trXNJ1PeHTzaROF5wqlBYigFoYzw0HEthLahxAXjpqBi6c5ttOp9kWkYCkspivEg=s800-c-k-c0x00ffffff-no-rj",NULL)');
      await queryRunner.query('INSERT INTO `channel` (`id`,`holo_api_id`,`yt_channel_id`,`twitter_link`,`name`,`emoji`,`photo`,`greeting`) VALUES (2260365,2260365,"UCO_aKKYxn4tvrqPjcTzZ6EQ","ceresfauna","Ceres Fauna Ch. hololive-EN",":herb:","https://yt3.ggpht.com/0lkccaVapSr1Z3uuXWbnaQxeqRWr9Tcs4R9rLBRSrAsN9gLacpiT2OFWfFKr4NhF97_hqK3eTg=s800-c-k-c0x00ffffff-no-rj","konfauna~")');
      await queryRunner.query('INSERT INTO `channel` (`id`,`holo_api_id`,`yt_channel_id`,`twitter_link`,`name`,`emoji`,`photo`,`greeting`) VALUES (2260366,2260366,"UCmbs8T6MWqUHP1tIQvSgKrg","ourokronii","Ouro Kronii Ch. hololive-EN",":hourglass_flowing_sand:","https://yt3.ggpht.com/6670YE31bbAtAi7m_UL-KWZBdL5wvmfHlLtcS4HxsBZBQNqmAk7Y-iiIOjawO_0HYXpS4HfC=s800-c-k-c0x00ffffff-no-rj",NULL)');
      await queryRunner.query('INSERT INTO `channel` (`id`,`holo_api_id`,`yt_channel_id`,`twitter_link`,`name`,`emoji`,`photo`,`greeting`) VALUES (2260367,2260367,"UC3n5uGu18FoCy23ggWWp8tA","nanashimumei_en","Nanashi Mumei Ch. hololive-EN",":feather:","https://yt3.ggpht.com/MI8E8Wfmc_ngNZXUwu8ad0D-OtqDhmqGVULEu25z-ccscwzJpAw-7ewFXzZYLK2jHB9d5OgQDq4=s800-c-k-c0x00ffffff-no-rj",NULL)');
      await queryRunner.query('INSERT INTO `channel` (`id`,`holo_api_id`,`yt_channel_id`,`twitter_link`,`name`,`emoji`,`photo`,`greeting`) VALUES (2260368,2260368,"UCgmPnx-EEeOrZSg5Tiw7ZRQ","hakosbaelz","Hakos Baelz Ch. hololive-EN",":game_die:","https://yt3.ggpht.com/GWIwRbtVQ2TAlvH8Mf37FMpemTrwmUSbTSazp9Aul6KwdKQmvx7IbLZepDk0sp8ReW3qBhsU=s800-c-k-c0x00ffffff-no-rj","wazzzzupp")');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("Tsukumo", 2260364)');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("Sana", 2260364)');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("Ceres", 2260365)');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("Fauna", 2260365)');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("Ouro", 2260366)');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("Kronii", 2260366)');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("Nanashi", 2260367)');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("Mumei", 2260367)');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("Hakos", 2260368)');
      await queryRunner.query('INSERT INTO `channel_nickname` (`nickname`,`channelId`) VALUES ("Baelz", 2260368)');
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DELET FROM `channel_nickname` WHERE `channelId`=2260368');
      await queryRunner.query('DELET FROM `channel_nickname` WHERE `channelId`=2260367');
      await queryRunner.query('DELET FROM `channel_nickname` WHERE `channelId`=2260366');
      await queryRunner.query('DELET FROM `channel_nickname` WHERE `channelId`=2260365');
      await queryRunner.query('DELET FROM `channel_nickname` WHERE `channelId`=2260364');
      await queryRunner.query('DELET FROM `channel` WHERE `id`=2260368');
      await queryRunner.query('DELET FROM `channel` WHERE `id`=2260367');
      await queryRunner.query('DELET FROM `channel` WHERE `id`=2260366');
      await queryRunner.query('DELET FROM `channel` WHERE `id`=2260365');
      await queryRunner.query('DELET FROM `channel` WHERE `id`=2260364');
    }

}
