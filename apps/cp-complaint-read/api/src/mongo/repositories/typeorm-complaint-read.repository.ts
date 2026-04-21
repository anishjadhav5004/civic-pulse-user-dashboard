import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CrComplaintDto } from '@civic-pulse-user-dashboard/complaint-read';
import { CrComplaint } from '../entities/cr-complaint.entity';
import { IComplaintReadRepository } from './complaint-read.repository';

@Injectable()
export class TypeOrmComplaintReadRepository implements IComplaintReadRepository {
  constructor(
    @InjectRepository(CrComplaint)
    private readonly repo: MongoRepository<CrComplaint>,
  ) {}

  async upsertComplaint(dto: CrComplaintDto): Promise<void> {
    await this.repo.findOneAndUpdate(
      { uid: dto.uid },
      {
        $set: {
          uid: dto.uid,
          complaintNumber: dto.complaintNumber,
          complaintTitle: dto.complaintTitle,
          description: dto.description ?? null,
          category: dto.category ?? null,
          status: dto.status,
          visibility: dto.visibility,
          priority: dto.priority,
          canEditUntil: dto.canEditUntil ? new Date(dto.canEditUntil) : null,
          reportedBy: dto.reportedBy,
          username: dto.username ?? null,
          wardNumber: dto.wardNumber ?? null,
          city: dto.city ?? null,
          state: dto.state ?? null,
          pincode: dto.pincode ?? null,
          nagarsevakName: dto.nagarsevakName ?? null,
          wardAdmin: dto.wardAdmin ?? null,
          wardAdminUid: dto.wardAdminUid ?? null,
          mayorName: dto.mayorName ?? null,
          createdAt: new Date(dto.createdAt),
          history: dto.history ?? [],
          attachments: dto.attachments ?? [],
        },
      },
      { upsert: true, returnDocument: 'after' },
    );
  }
}
