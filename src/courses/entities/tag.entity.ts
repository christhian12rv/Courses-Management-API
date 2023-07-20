import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './course.entity';

@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Course, (course) => course.tags)
  courses: Course[];
}
