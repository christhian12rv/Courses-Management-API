import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CoursesRepository } from './repositories/courses.repository';
import { TagsRepository } from './repositories/tags.repository';
import { Tag } from './entities/tag.entity';

@Injectable()
export class CoursesService {
  constructor(
    private coursesRepository: CoursesRepository,
    private tagRepository: TagsRepository,
  ) {}

  async findAll(): Promise<Course[]> {
    return await this.coursesRepository.find({
      relations: ['tags'],
    });
  }

  async findOne(id: number): Promise<Course> {
    const course: Course = await this.coursesRepository.findOne({
      where: { id },
      relations: ['tags'],
    });

    if (!course) {
      throw new NotFoundException(`Course id ${id} not found`);
    }

    return course;
  }

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const tags = await Promise.all(
      createCourseDto.tags.map((tag) => this.preloadTagByName(tag)),
    );

    const course = this.coursesRepository.create({
      ...createCourseDto,
      tags,
    });

    return await this.coursesRepository.save(course);
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const tags =
      updateCourseDto.tags &&
      (await Promise.all(
        updateCourseDto.tags.map((tag) => this.preloadTagByName(tag)),
      ));

    const course: Course = await this.coursesRepository.preload({
      id,
      ...updateCourseDto,
      tags,
    });

    if (!course) {
      throw new NotFoundException(`Course id ${id} not found`);
    }

    return course;
  }

  async delete(id: number): Promise<Course> {
    const course: Course = await this.coursesRepository.findOneBy({ id });

    if (!course) {
      throw new NotFoundException(`Course id ${id} not found`);
    }

    return this.coursesRepository.remove(course);
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag: Tag = await this.tagRepository.findOneBy({ name });

    if (tag) {
      return tag;
    }

    return this.tagRepository.create({ name });
  }
}
