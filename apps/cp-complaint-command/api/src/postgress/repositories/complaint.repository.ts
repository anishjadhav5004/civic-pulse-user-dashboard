import { Complaint } from "../entities/cc-complaint.entity";
import { ComplaintAddress } from "../entities/cc-complaint-address.entity";

export abstract class IComplaintRepository {
    abstract saveAddress(address: ComplaintAddress): Promise<ComplaintAddress>;
    abstract saveComplaint(complaint: Complaint): Promise<Complaint>;
    abstract updateComplaint(id: string, complaint: Partial<Complaint>): Promise<void>;
    abstract deleteComplaint(id: string): Promise<void>;
}
