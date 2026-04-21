import { CrComplaintDto } from '@civic-pulse-user-dashboard/complaint-read';

export class ComplaintCreatedMessage {
  constructor(public readonly dto: CrComplaintDto) {}
}
