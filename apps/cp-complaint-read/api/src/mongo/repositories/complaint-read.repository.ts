import { CrComplaintDto } from '@civic-pulse-user-dashboard/complaint-read';

/**
 * Abstract repository — keeps the handler decoupled from TypeORM.
 * Receives the complete lean CrComplaintDto; no separate attachments arg needed.
 */
export abstract class IComplaintReadRepository {
  abstract upsertComplaint(dto: CrComplaintDto): Promise<void>;
}
