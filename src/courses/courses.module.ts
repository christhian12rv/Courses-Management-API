import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';
import { CoursesRepository } from './repositories/courses.repository';
import { TagsRepository } from './repositories/tags.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Tag])],
  controllers: [CoursesController],
  providers: [CoursesService, CoursesRepository, TagsRepository],
})
export class CoursesModule {}
