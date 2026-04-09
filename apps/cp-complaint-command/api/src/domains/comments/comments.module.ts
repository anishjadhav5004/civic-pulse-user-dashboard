import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComplaintComment } from '../../postgress/entities/cc-complaint-comment.entity';
import { ICommentRepository } from '../../postgress/repositories/comment.repository';
import { TypeOrmCommentRepository } from '../../postgress/repositories/typeorm-comment.repository';
import { CommentsController } from './comments.controller';
import { CreateCommentHandler } from './handlers/add-comment.handler';
import { RemoveCommentHandler } from './handlers/delete-comment.handler';

@Module({
  imports: [TypeOrmModule.forFeature([ComplaintComment])],
  controllers: [CommentsController],
  providers: [
    CreateCommentHandler,
    RemoveCommentHandler,
    {
      provide: ICommentRepository,
      useClass: TypeOrmCommentRepository
    }
  ],
})
export class CommentsModule { }
