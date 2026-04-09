import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteComment } from '../commands/delete-comment.command';
import { ICommentRepository } from '../../../postgress/repositories/comment.repository';

@CommandHandler(DeleteComment)
export class RemoveCommentHandler implements ICommandHandler<DeleteComment> {
  constructor(private readonly repository: ICommentRepository) {}

  async execute(command: DeleteComment) {
    return this.repository.deleteComment(command.uid);
  }
}
