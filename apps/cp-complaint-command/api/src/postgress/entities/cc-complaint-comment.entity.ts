import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('cc_complaint_comments',{schema:'cc'})
export class ComplaintComment {
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column('uuid', { name: 'complaint_uid' })
    complaintUid: string;

    @Column('uuid', { name: 'user_uid' })
    userUid: string;

    @Column('text', { name: 'comment_text' })
    commentText: string;

    @Column('boolean', { name: 'is_official', default: false })
    isOfficial: boolean;

    @Column('boolean', { name: 'is_internal', default: false })
    isInternal: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column('boolean', { name: 'is_deleted', default: false })
    isDeleted: boolean;
}
