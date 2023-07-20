import { MigrationInterface, QueryRunner } from 'typeorm';

export class CourseRefactoring1689693292421 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course" RENAME COLUMN "name" TO "course"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "course" RENAME COLUMN "course" TO "name"`,
    );
  }
}
