import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddComment } from '../commands/add-comment.command';
import { ComplaintComment } from '../../../postgress/entities/cc-complaint-comment.entity';
import { ICommentRepository } from '../../../postgress/repositories/comment.repository';

@CommandHandler(AddComment)
export class CreateCommentHandler implements ICommandHandler<AddComment> {
  constructor(private readonly repository: ICommentRepository) {}

  async execute(command: AddComment) {
    const commentDto = command.comment;

    const newComment = new ComplaintComment();
    newComment.complaintUid = commentDto.complaintUid;
    newComment.userUid = commentDto.userUid;
    newComment.commentText = commentDto.commentText;
    
    if (commentDto.isOfficial !== undefined) {
      newComment.isOfficial = commentDto.isOfficial;
    }
    
    if (commentDto.isInternal !== undefined) {
      newComment.isInternal = commentDto.isInternal;
    }

    const savedComment = await this.repository.saveComment(newComment);
    return savedComment;
  }
}
