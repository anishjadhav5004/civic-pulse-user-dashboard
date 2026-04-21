import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complaint } from '../../postgress/entities/cc-complaint.entity';
import { ComplaintAddress } from '../../postgress/entities/cc-complaint-address.entity';
import { ComplaintAttachment } from '../../postgress/entities/cc-complaint-attachment.entity';
import { IComplaintRepository } from '../../postgress/repositories/complaint.repository';
import { TypeOrmComplaintRepository } from '../../postgress/repositories/typeorm-complaint.repository';
import { ComplaintsController } from './complaints.controller';
import { CreateComplaintHandler } from './handlers/add-complaint.handler';
import { LocationService } from '../../services/location.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ComplaintCreatedEventHandler } from './handlers/complaint-created-event.handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([Complaint, ComplaintAddress, ComplaintAttachment]),
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_CLIENT',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL') || 'amqp://localhost:5672'],
            queue: 'complaint_created',
            queueOptions: { durable: true },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ComplaintsController],
  providers: [
    CreateComplaintHandler,
    ComplaintCreatedEventHandler,
    LocationService,
    {
      provide: IComplaintRepository,
      useClass: TypeOrmComplaintRepository
    }
  ],
})
export class ComplaintsModule { }
