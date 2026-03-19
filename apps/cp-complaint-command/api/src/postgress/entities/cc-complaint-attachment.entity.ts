import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('cc_complaint_attachments',{schema:'cc'})
export class ComplaintAttachment {
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column('uuid', { name: 'complaint_uid' })
    complaintUid: string;

    @Column('varchar', { name: 'file_url' })
    fileUrl: string;

    @Column('varchar', { name: 'file_type', nullable: true })
    fileType: string;

    @Column('int', { name: 'file_size_kb', nullable: true })
    fileSizeKb: number;

    @Column('boolean', { name: 'is_thumbnail', default: false })
    isThumbnail: boolean;

    @Column('int', { name: 'display_order', nullable: true })
    displayOrder: number;

    @CreateDateColumn({ name: 'uploaded_at' })
    uploadedAt: Date;

    @Column('boolean', { name: 'is_active', default: true })
    isActive: boolean;
}
