import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IComplaintRepository } from './complaint.repository';
import { Complaint } from '../entities/cc-complaint.entity';
import { ComplaintAddress } from '../entities/cc-complaint-address.entity';
import { ComplaintAttachment } from '../entities/cc-complaint-attachment.entity';

@Injectable()
export class TypeOrmComplaintRepository implements IComplaintRepository {
  constructor(
    @InjectRepository(Complaint)
    private readonly complaintRepo: Repository<Complaint>,
    @InjectRepository(ComplaintAddress)
    private readonly addressRepo: Repository<ComplaintAddress>,
    @InjectRepository(ComplaintAttachment)
    private readonly attachmentRepo: Repository<ComplaintAttachment>,
  ) {}
  async findById(uid: string): Promise<Complaint | null> {
    return this.complaintRepo.findOne({ where: { uid } });
  }

  async saveAddress(address: ComplaintAddress): Promise<ComplaintAddress> {
    return this.addressRepo.save(address);
  }

  async saveComplaint(complaint: Complaint): Promise<Complaint> {
    return this.complaintRepo.save(complaint);
  }

  async saveAttachments(attachments: ComplaintAttachment[]): Promise<ComplaintAttachment[]> {
    return this.attachmentRepo.save(attachments);
  }

  async updateComplaint(
    uid: string,
    complaint: Partial<Complaint>,
  ): Promise<boolean> {
    const result = await this.complaintRepo.update(uid, complaint);
    return (result.affected ?? 0) > 0;
  }

  async deleteComplaint(uid: string): Promise<boolean> {
    const result = await this.complaintRepo.delete({ uid });
    return (result.affected ?? 0) > 0;
  }
}
