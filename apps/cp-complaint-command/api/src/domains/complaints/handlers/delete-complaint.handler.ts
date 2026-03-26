import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { DeleteComplaint } from '../commands/delete-complaint.command';
import { IComplaintRepository } from '../../../postgress/repositories/complaint.repository';
import { LoggerService } from '@civic-pulse/shared-contracts';

@CommandHandler(DeleteComplaint)
export class DeleteComplaintHandler
  implements ICommandHandler<DeleteComplaint>
{
  constructor(
    private readonly repository: IComplaintRepository,
    private readonly logger: LoggerService,
  ) {}

  async execute(command: DeleteComplaint): Promise<void> {
    const uid: string = command.uid;

    try {
      const deleted = await this.repository.deleteComplaint(uid);

      if (!deleted) {
        this.logger.warn(`Complaint "${uid}" not found`);
        throw new NotFoundException(`Complaint with uid "${uid}" not found`);
      }

      this.logger.info(`Complaint "${uid}" deleted successfully`);
    } catch (error) {

      throw error;
    }
  }
}
