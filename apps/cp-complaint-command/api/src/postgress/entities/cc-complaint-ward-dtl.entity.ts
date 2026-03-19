import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cc_complaint_ward_dtl',{schema:'cc'})
export class ComplaintWardDetail {
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column('int')
    ward_number: number;

    @Column('varchar', { nullable: true })
    ward_admin: string;

    @Column('uuid', { nullable: true })
    ward_admin_uid: string;

    @Column('varchar', { nullable: true })
    city_name: string;

    @Column('varchar', { nullable: true })
    nagarsevak_name: string;

    @Column('varchar', { nullable: true })
    mayor_name: string;

    @Column('geometry', { spatialFeatureType: 'Polygon', srid: 4326, nullable: true })
    ward_boundary: string;
}
