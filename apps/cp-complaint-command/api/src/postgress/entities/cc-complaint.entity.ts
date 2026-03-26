import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { Priority } from '@civic-pulse-user-dashboard/complaint-command';

@Entity('cc_complaints', { schema: 'cc' })
export class Complaint {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column('varchar', { name: 'complaint_number', unique: true })
  complaintNumber: string;

  @Column('uuid', { name: 'reported_by' })
  reportedBy: string;

  @Column('uuid', { name: 'address_uid', nullable: true })
  addressUid: string|null;

  @Column('varchar', { name: 'complaint_title' })
  complaintTitle: string;

  @Column('text', { nullable: true })
  description: string|null;

  @Column('varchar', { nullable: true })
  category: string|null;

  @Column('boolean', { default: false })
  visibility: boolean;

  @Column({
    name: 'priority',
    type: 'enum',
    enum: Priority,
    default: Priority.LOW,
  })
  priority: Priority;

  @Column('timestamp', { name: 'can_edit_until'})
  canEditUntil: Date|null;

  @Column('boolean', { name: 'is_edited', default: false })
  isEdited: boolean;

  @Column('timestamp', { name: 'edited_at', nullable: true })
  editedAt: Date;

  @Column('timestamp', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;
}
