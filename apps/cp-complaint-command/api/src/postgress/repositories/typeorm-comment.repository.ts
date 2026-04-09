import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICommentRepository } from './comment.repository';
import { ComplaintComment } from '../entities/cc-complaint-comment.entity';

@Injectable()
export class TypeOrmCommentRepository implements ICommentRepository {
  constructor(
    @InjectRepository(ComplaintComment)
    private readonly commentRepo: Repository<ComplaintComment>,
  ) {}

  async saveComment(comment: ComplaintComment): Promise<ComplaintComment> {
    return this.commentRepo.save(comment);
  }

  async deleteComment(uid: string): Promise<boolean> {
    const result = await this.commentRepo.update(uid, { isDeleted: true });
    return (result.affected ?? 0) > 0;
  }
}
