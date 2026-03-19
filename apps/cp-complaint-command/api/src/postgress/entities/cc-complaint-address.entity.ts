import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cc_complaint_addresses',{schema:'cc'})
export class ComplaintAddress {
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column('decimal', { precision: 10, scale: 8, nullable: true })
    latitude: number;

    @Column('decimal', { precision: 11, scale: 8, nullable: true })
    longitude: number;

    @Column('varchar', { name: 'area_name', nullable: true })
    areaName: string;

    @Column('varchar', { name: 'city_name', nullable: true })
    cityName: string;

    @Column('varchar', { name: 'district_name', nullable: true })
    districtName: string;

    @Column('varchar', { name: 'state_name', nullable: true })
    stateName: string;

    @Column('varchar', { nullable: true })
    pincode: string;

    @Column('varchar', { name: 'country_code', nullable: true })
    countryCode: string;

    @Column('int', { name: 'ward_number', nullable: true })
    wardNumber: number;

    @Column('uuid', { name: 'constituency_uid', nullable: true })
    constituencyUid: string;

    @Column('boolean', { name: 'is_active', default: true })
    isActive: boolean;
}
