import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Tag } from '../entities/tag.entity';

@Injectable()
export class TagsRepository extends Repository<Tag> {
  constructor(private dataSource: DataSource) {
    super(Tag, dataSource.createEntityManager());
  }
}
