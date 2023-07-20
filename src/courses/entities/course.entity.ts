import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from './tag.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity('course')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @JoinTable({ name: 'course_tag' })
  @ManyToMany(() => Tag, (tag) => tag.courses, { cascade: true })
  tags: Tag[];

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
