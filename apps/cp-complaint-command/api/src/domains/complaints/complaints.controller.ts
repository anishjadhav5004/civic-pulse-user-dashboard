import { Controller, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CreateComplaintDto } from '@civic-pulse-user-dashboard/complaint-command';
import { CommandBus } from '@nestjs/cqrs';
import { AddComplaint } from './commands/add-complaint.command';
import { UpdateComplaint } from './commands/update-complaint.command';
import { DeleteComplaint } from './commands/delete-complaint.command';

@Controller('complaints')
export class ComplaintsController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  async create(@Body() createComplaintDto: CreateComplaintDto) {
    try {
      return await this.commandBus.execute(new AddComplaint(createComplaintDto));
    } catch (error) {
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateComplaintDto: any) {
    try {
      return await this.commandBus.execute(new UpdateComplaint(id, updateComplaintDto));
    } catch (error) {
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.commandBus.execute(new DeleteComplaint(id));
    } catch (error) {
      throw new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
