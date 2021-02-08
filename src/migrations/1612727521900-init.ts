import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class init1612727521900 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'links',
        columns: [
          {
            name: 'hash',
            type: 'varchar(32)',
            isUnique: true,
          },
          {
            name: 'short',
            type: 'varchar(9)',
          },
          {
            name: 'long',
            type: 'varchar(512)',
          },
          {
            name: 'count',
            type: 'int',
            default: 0,
          },
        ],
      }),
    );
    await queryRunner.createIndex(
      'links',
      new TableIndex({
        name: 'IDX_HASH',
        columnNames: ['hash'],
      }),
    );
    await queryRunner.createIndex(
      'links',
      new TableIndex({
        name: 'IDX_SHORT',
        columnNames: ['short'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('links', 'IDX_HASH');
    await queryRunner.dropIndex('links', 'IDX_SHORT');
    await queryRunner.dropTable('links');
  }
}
