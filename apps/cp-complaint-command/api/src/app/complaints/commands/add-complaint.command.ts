import { CreateComplaintDto } from "../dto/create-complaint.dto";

export class AddComplaint {

    constructor(public readonly complaint: CreateComplaintDto) { }

}