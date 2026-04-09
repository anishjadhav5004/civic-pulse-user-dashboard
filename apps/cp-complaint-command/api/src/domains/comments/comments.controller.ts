import { Controller, Post, Body, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCommentDto } from '@civic-pulse-user-dashboard/complaint-command';
import { CommandBus } from '@nestjs/cqrs';
import { AddComment } from './commands/add-comment.command';
import { DeleteComment } from './commands/delete-comment.command';

@Controller('comments')
export class CommentsController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    try {
      return await this.commandBus.execute(new AddComment(createCommentDto));
    } catch (error) {
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.commandBus.execute(new DeleteComment(id));
    } catch (error) {
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
