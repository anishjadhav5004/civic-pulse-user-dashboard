import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CrComplaint } from '../../mongo/entities/cr-complaint.entity';
import { IComplaintReadRepository } from '../../mongo/repositories/complaint-read.repository';
import { TypeOrmComplaintReadRepository } from '../../mongo/repositories/typeorm-complaint-read.repository';
import { ComplaintsController } from './complaints.controller';
import { ComplaintCreatedHandler } from './handlers/complaint-created.handler';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([CrComplaint]),
  ],
  controllers: [ComplaintsController],
  providers: [
    ComplaintCreatedHandler,
    {
      provide: IComplaintReadRepository,
      useClass: TypeOrmComplaintReadRepository,
    },
  ],
})
export class ComplaintsModule {}
