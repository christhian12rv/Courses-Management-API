import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddCourseIdToCourseTagTable1689869335289
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'course_tag',
      new TableColumn({
        name: 'courseId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'course_tag',
      new TableForeignKey({
        name: 'course_tag_course',
        columnNames: ['courseId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'course',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('course_tag', 'course_tag_course');

    await queryRunner.dropColumn('course_tag', 'courseId');
  }
}
