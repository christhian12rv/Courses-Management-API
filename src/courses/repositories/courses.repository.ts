import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Course } from '../entities/course.entity';

@Injectable()
export class CoursesRepository extends Repository<Course> {
  constructor(private dataSource: DataSource) {
    super(Course, dataSource.createEntityManager());
  }
}
