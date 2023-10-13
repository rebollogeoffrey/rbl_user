import { MigrationInterface, QueryRunner } from 'typeorm';

export class Third1697201562195 implements MigrationInterface {
  name = 'Third1697201562195';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`role\` enum ('admin', 'basic') NOT NULL DEFAULT 'basic', \`name\` varchar(100) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`url_image\` varchar(255) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `INSERT INTO \`user\` (\`id\`,\`role\`,\`name\`,\`email\`,\`password\`,\`url_image\`,\`created_at\`,\`updated_at\`) VALUES ('5c0eda5f-306d-4a6e-8f7a-6b3bf841420b','admin','William Brunelle','william.brunelle@gmail.com','Pa55w0Rd!','',DEFAULT,DEFAULT),('c90e1467-a6d7-4a75-a544-c86a0e29e7a2','basic','Laurent Pomin','laurent.pomin@gmail.com','Pa55w0Rd!','',DEFAULT,DEFAULT)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
