import { CreateComplaintDto } from "@civic-pulse-user-dashboard/complaint-command-dto";

export class AddComplaint {

    constructor(public readonly complaint: CreateComplaintDto) { }

}