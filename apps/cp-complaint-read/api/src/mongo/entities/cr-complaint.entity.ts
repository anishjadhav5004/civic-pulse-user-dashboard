import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';
import { CrAttachment, CrStatusHistory } from '@civic-pulse-user-dashboard/complaint-read';

/**
 * MongoDB read-model for complaints.
 * Denormalized — all hot-path data is embedded to avoid joins.
 */
@Entity('cr_complaints')
export class CrComplaint {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column() uid: string;
  @Column() complaintNumber: string;
  @Column() complaintTitle: string;
  @Column({ nullable: true }) description: string | null;
  @Column({ nullable: true }) category: string | null;
  @Column() status: string;
  @Column() visibility: boolean;
  @Column() priority: string;
  @Column({ nullable: true }) canEditUntil: Date | null;

  // Reporter
  @Column() reportedBy: string;
  @Column({ nullable: true }) username: string | null;

  // Location
  @Column({ nullable: true }) wardNumber: number | null;
  @Column({ nullable: true }) city: string | null;
  @Column({ nullable: true }) state: string | null;
  @Column({ nullable: true }) pincode: string | null;

  // Ward officials
  @Column({ nullable: true }) nagarsevakName: string | null;
  @Column({ nullable: true }) wardAdmin: string | null;
  @Column({ nullable: true }) wardAdminUid: string | null;
  @Column({ nullable: true }) mayorName: string | null;

  @Column() createdAt: Date;

  @Column(() => CrStatusHistory)
  history: CrStatusHistory[];

  @Column(() => CrAttachment)
  attachments: CrAttachment[];
}
