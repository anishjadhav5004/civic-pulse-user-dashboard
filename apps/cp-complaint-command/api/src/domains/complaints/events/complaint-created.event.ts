import { Complaint } from '../../../postgress/entities/cc-complaint.entity';
import { ComplaintAttachment } from '../../../postgress/entities/cc-complaint-attachment.entity';
import { ComplaintAddress } from '../../../postgress/entities/cc-complaint-address.entity';

export class ComplaintCreatedEvent {
  constructor(
    public readonly complaint: Complaint,
    public readonly attachments: ComplaintAttachment[],
    public readonly address?: ComplaintAddress,
  ) {}
}
