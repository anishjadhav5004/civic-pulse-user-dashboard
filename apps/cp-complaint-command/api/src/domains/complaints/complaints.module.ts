import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complaint } from '../../postgress/entities/cc-complaint.entity';
import { ComplaintAddress } from '../../postgress/entities/cc-complaint-address.entity';
import { IComplaintRepository } from '../../postgress/repositories/complaint.repository';
import { TypeOrmComplaintRepository } from '../../postgress/repositories/typeorm-complaint.repository';
import { ComplaintsController } from './complaints.controller';
import { CreateComplaintHandler } from './handlers/add-complaint.handler';
import { LocationService } from '../../services/location.service';

@Module({
  imports: [TypeOrmModule.forFeature([Complaint, ComplaintAddress])],
  controllers: [ComplaintsController],
  providers: [
    CreateComplaintHandler,
    LocationService,
    {
      provide: IComplaintRepository,
      useClass: TypeOrmComplaintRepository
    }
  ],
})
export class ComplaintsModule { }
