import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('cc_complaint_attachments',{schema:'cc'})
export class ComplaintAttachment {
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column('uuid')
    complaint_uid: string;

    @Column('varchar')
    file_url: string;

    @Column('varchar', { nullable: true })
    file_type: string;

    @Column('int', { nullable: true })
    file_size_kb: number;

    @Column('boolean', { default: false })
    is_thumbnail: boolean;

    @Column('int', { nullable: true })
    display_order: number;

    @CreateDateColumn()
    uploaded_at: Date;

    @Column('boolean', { default: true })
    is_active: boolean;
}
