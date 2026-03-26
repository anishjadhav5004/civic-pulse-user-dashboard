import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateComplaint } from '../commands/update-complaint.command';
import { IComplaintRepository } from '../../../postgress/repositories/complaint.repository';
import { LoggerService } from '@civic-pulse/shared-contracts';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateComplaint)
export class UpdateComplaintHandler
  implements ICommandHandler<UpdateComplaint>
{
  constructor(
    private readonly repository: IComplaintRepository,
    private readonly logger: LoggerService,
  ) {}

  async execute(command: UpdateComplaint): Promise<void> {
    const { uid, complaint } = command;

    try {
      const updated = await this.repository.updateComplaint(uid, complaint);

      if (!updated) {
        this.logger.warn(`Complaint "${uid}" not found`);
        throw new NotFoundException(`Complaint with uid "${uid}" not found`);
      }

      this.logger.info(`Complaint "${uid}" updated successfully`);
    } catch (err: unknown) {
      if (err instanceof NotFoundException) throw err; // don't log 404 as error
      this.logger.error(
        `Failed to update complaint "${uid}": ${err instanceof Error ? err.message : String(err)}`,
      );
      throw err;
    }
  }
}
