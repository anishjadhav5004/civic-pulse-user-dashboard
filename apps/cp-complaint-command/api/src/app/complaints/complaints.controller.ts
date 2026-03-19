import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { CommandBus } from '@nestjs/cqrs';
import { AddComplaint } from './commands/add-complaint.command';

@Controller('complaints')
export class ComplaintsController {
  constructor(private commandBus:CommandBus) { }

  @Post()
  create(@Body() createComplaintDto: CreateComplaintDto) {

    return this.commandBus.execute(new AddComplaint(createComplaintDto));

  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComplaintDto: UpdateComplaintDto) {
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
  }
}
