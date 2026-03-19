import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('cc_complaint_comments',{schema:'cc'})
export class ComplaintComment {
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column('uuid')
    complaint_uid: string;

    @Column('uuid')
    user_uid: string;

    @Column('text')
    comment_text: string;

    @Column('boolean', { default: false })
    is_official: boolean;

    @Column('boolean', { default: false })
    is_internal: boolean;

    @CreateDateColumn()
    created_at: Date;

    @Column('boolean', { default: false })
    is_deleted: boolean;
}
