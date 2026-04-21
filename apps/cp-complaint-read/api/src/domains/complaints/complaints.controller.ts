import { Controller, Logger } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CrComplaintDto } from '@civic-pulse-user-dashboard/complaint-read';
import { ComplaintCreatedMessage } from './messages/complaint-created.message';

@Controller()
export class ComplaintsController {
  private readonly logger = new Logger(ComplaintsController.name);

  constructor(private readonly eventBus: EventBus) {}

  @MessagePattern('complaint_created')
  async handleComplaintCreated(@Payload() dto: CrComplaintDto): Promise<{ acknowledged: boolean }> {
    this.logger.log(`Received complaint_created for complaint "${dto?.uid}"`);
    await this.eventBus.publish(new ComplaintCreatedMessage(dto));
    return { acknowledged: true };   // ← this is sent back as the ack to command service
  }
}
