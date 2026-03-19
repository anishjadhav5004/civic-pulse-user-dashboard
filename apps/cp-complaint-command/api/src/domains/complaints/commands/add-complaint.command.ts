import { CreateComplaintDto } from "@civic-pulse-user-dashboard/complaint-command";

export class AddComplaint {

    constructor(public readonly complaint: CreateComplaintDto) { }

}