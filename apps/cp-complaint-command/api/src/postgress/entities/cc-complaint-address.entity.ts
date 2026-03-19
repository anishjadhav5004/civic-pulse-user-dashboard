import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cc_complaint_addresses',{schema:'cc'})
export class ComplaintAddress {
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column('decimal', { precision: 10, scale: 8, nullable: true })
    latitude: number;

    @Column('decimal', { precision: 11, scale: 8, nullable: true })
    longitude: number;

    @Column('varchar', { nullable: true })
    area_name: string;

    @Column('varchar', { nullable: true })
    city_name: string;

    @Column('varchar', { nullable: true })
    district_name: string;

    @Column('varchar', { nullable: true })
    state_name: string;

    @Column('varchar', { nullable: true })
    pincode: string;

    @Column('varchar', { nullable: true })
    country_code: string;

    @Column('int', { nullable: true })
    ward_number: number;

    @Column('uuid', { nullable: true })
    constituency_uid: string;

    @Column('boolean', { default: true })
    is_active: boolean;
}
