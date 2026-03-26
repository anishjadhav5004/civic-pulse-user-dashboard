import { UpdateComplaintDto } from '@civic-pulse-user-dashboard/complaint-command';

export class UpdateComplaint {
  constructor(
    public uid: string,
    public complaint: UpdateComplaintDto,
  ) {}
}
