import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from './course.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Course, (course) => course.tags)
  courses: Course[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @BeforeInsert()
  generateId() {
    if (this.id) {
      return;
    }

    this.id = uuidv4();
  }
}
