import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('cc_complaint_status_history',{schema:'cc'})
export class ComplaintStatusHistory {
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column('uuid')
    complaint_uid: string;

    @Column('varchar')
    status: string;

    @Column('uuid', { nullable: true })
    modified_by: string;

    @Column('text', { nullable: true })
    remarks: string;

    @CreateDateColumn()
    created_at: Date;

    @Column('uuid', { nullable: true })
    assigned_to: string;

    @Column('timestamp', { nullable: true })
    assigned_at: Date;

    @Column('timestamp', { nullable: true })
    sla_deadline: Date;

    @Column('boolean', { default: false })
    is_escalated: boolean;

    @Column('int', { default: 0 })
    escalation_level: number;
}
