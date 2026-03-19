import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cc_complaint_ward_dtl',{schema:'cc'})
export class ComplaintWardDetail {
    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column('int', { name: 'ward_number' })
    wardNumber: number;

    @Column('varchar', { name: 'ward_admin', nullable: true })
    wardAdmin: string;

    @Column('uuid', { name: 'ward_admin_uid', nullable: true })
    wardAdminUid: string;

    @Column('varchar', { name: 'city_name', nullable: true })
    cityName: string;

    @Column('varchar', { name: 'nagarsevak_name', nullable: true })
    nagarsevakName: string;

    @Column('varchar', { name: 'mayor_name', nullable: true })
    mayorName: string;

    @Column('geometry', { name: 'ward_boundary', spatialFeatureType: 'Polygon', srid: 4326, nullable: true })
    wardBoundary: string;
}
