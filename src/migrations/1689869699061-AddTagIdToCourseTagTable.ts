import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddTagIdToCourseTagTable1689869699061
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'course_tag',
      new TableColumn({
        name: 'tagId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'course_tag',
      new TableForeignKey({
        name: 'course_tag_tag',
        columnNames: ['tagId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'tag',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('course_tag', 'course_tag_tag');

    await queryRunner.dropColumn('course_tag', 'tagId');
  }
}
