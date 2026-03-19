import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('cc_complaint_status_history',{schema:'cc'})
export class ComplaintStatusHistory {
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column('uuid', { name: 'complaint_uid' })
    complaintUid: string;

    @Column('varchar')
    status: string;

    @Column('uuid', { name: 'modified_by', nullable: true })
    modifiedBy: string;

    @Column('text', { nullable: true })
    remarks: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column('uuid', { name: 'assigned_to', nullable: true })
    assignedTo: string;

    @Column('timestamp', { name: 'assigned_at', nullable: true })
    assignedAt: Date;

    @Column('timestamp', { name: 'sla_deadline', nullable: true })
    slaDeadline: Date;

    @Column('boolean', { name: 'is_escalated', default: false })
    isEscalated: boolean;

    @Column('int', { name: 'escalation_level', default: 0 })
    escalationLevel: number;
}
