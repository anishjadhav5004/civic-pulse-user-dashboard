import { Complaint } from "../entities/cc-complaint.entity";
import { ComplaintAddress } from "../entities/cc-complaint-address.entity";

export abstract class IComplaintRepository {
    abstract findById(uid: string): Promise<Complaint | null>;
    abstract saveAddress(address: ComplaintAddress): Promise<ComplaintAddress>;
    abstract saveComplaint(complaint: Complaint): Promise<Complaint>;
    abstract updateComplaint(uid: string, complaint: Partial<Complaint>): Promise<boolean>;
    abstract deleteComplaint(uid: string): Promise<boolean>;
}
