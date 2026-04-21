import { Controller, Logger } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CrComplaintDto } from '@civic-pulse-user-dashboard/complaint-read';
import { ComplaintCreatedMessage } from './messages/complaint-created.message';

@Controller()
export class ComplaintsController {
  private readonly logger = new Logger(ComplaintsController.name);

  constructor(private readonly eventBus: EventBus) {}

  @EventPattern('complaint_created')
  async handleComplaintCreated(@Payload() dto: CrComplaintDto): Promise<void> {
    this.logger.log(`Received complaint_created for complaint "${dto?.uid}"`);
    await this.eventBus.publish(new ComplaintCreatedMessage(dto));
  }
}
