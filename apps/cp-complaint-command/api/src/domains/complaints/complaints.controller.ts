import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateComplaintDto } from '@civic-pulse-user-dashboard/complaint-command';
import { CommandBus } from '@nestjs/cqrs';
import { AddComplaint } from './commands/add-complaint.command';
import { UpdateComplaint } from './commands/update-complaint.command';
import { DeleteComplaint } from './commands/delete-complaint.command';

@Controller('complaints')
export class ComplaintsController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  create(@Body() createComplaintDto: CreateComplaintDto) {
    return this.commandBus.execute(new AddComplaint(createComplaintDto));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComplaintDto: any) {
    return this.commandBus.execute(new UpdateComplaint(id, updateComplaintDto));
    //take understanding of pathc
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteComplaint(id));
  }
}
