import { Complaint } from "../entities/cc-complaint.entity";
import { ComplaintAddress } from "../entities/cc-complaint-address.entity";
import { ComplaintAttachment } from "../entities/cc-complaint-attachment.entity";

export abstract class IComplaintRepository {
    abstract findById(uid: string): Promise<Complaint | null>;
    abstract saveAddress(address: ComplaintAddress): Promise<ComplaintAddress>;
    abstract saveComplaint(complaint: Complaint): Promise<Complaint>;
    abstract saveAttachments(attachments: ComplaintAttachment[]): Promise<ComplaintAttachment[]>;
    abstract updateComplaint(uid: string, complaint: Partial<Complaint>): Promise<boolean>;
    abstract deleteComplaint(uid: string): Promise<boolean>;
}
