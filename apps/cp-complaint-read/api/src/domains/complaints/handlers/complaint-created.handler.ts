import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ComplaintCreatedMessage } from '../messages/complaint-created.message';
import { IComplaintReadRepository } from '../../../mongo/repositories/complaint-read.repository';

@EventsHandler(ComplaintCreatedMessage)
export class ComplaintCreatedHandler implements IEventHandler<ComplaintCreatedMessage> {
  private readonly logger = new Logger(ComplaintCreatedHandler.name);

  constructor(private readonly repository: IComplaintReadRepository) {}

  async handle(event: ComplaintCreatedMessage): Promise<void> {
    this.logger.log(`Upserting complaint "${event.dto.uid}" into MongoDB read store`);

    // eslint-disable-next-line no-useless-catch
    try {
      await this.repository.upsertComplaint(event.dto);
      this.logger.log(`Complaint "${event.dto.uid}" persisted successfully`);
    } catch (error) {
      // TODO: delegate to global error handler when implemented
      throw error;
    }
  }
}
