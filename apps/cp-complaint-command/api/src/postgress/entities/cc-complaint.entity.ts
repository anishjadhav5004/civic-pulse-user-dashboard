import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Priority } from '../../app/complaints/types/types';

@Entity('cc_complaints',{schema:'cc'})
export class Complaint {
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column('varchar', { unique: true })
    complaint_number: string;

    @Column('uuid')
    reported_by: string;

    @Column('uuid', { nullable: true })
    address_uid: string;

    @Column('varchar')
    complaint_title: string;

    @Column('text', { nullable: true })
    description: string;

    @Column('varchar', { nullable: true })
    category: string;

    @Column('varchar', { nullable: true })
    visibility: boolean;

    @Column({
        type: 'enum',
        enum: Priority,
        default: Priority.LOW
    })
    priority: Priority;

    @Column('timestamp', { nullable: true })
    can_edit_until: Date;

    @Column('boolean', { default: false })
    is_edited: boolean;

    @Column('timestamp', { nullable: true })
    edited_at: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
