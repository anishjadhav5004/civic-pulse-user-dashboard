import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IComplaintRepository } from './complaint.repository';
import { Complaint } from '../entities/cc-complaint.entity';
import { ComplaintAddress } from '../entities/cc-complaint-address.entity';

@Injectable()
export class TypeOrmComplaintRepository implements IComplaintRepository {
    constructor(
        @InjectRepository(Complaint)
        private readonly complaintRepo: Repository<Complaint>,
        @InjectRepository(ComplaintAddress)
        private readonly addressRepo: Repository<ComplaintAddress>
    ) { }

    async saveAddress(address: ComplaintAddress): Promise<ComplaintAddress> {
        return this.addressRepo.save(address);
    }

    async saveComplaint(complaint: Complaint): Promise<Complaint> {
        return this.complaintRepo.save(complaint);
    }

    async updateComplaint(id: string, complaint: Partial<Complaint>): Promise<void> {
        await this.complaintRepo.update(id, complaint);
    }

    async deleteComplaint(id: string): Promise<void> {
        await this.complaintRepo.delete(id);
    }
}
