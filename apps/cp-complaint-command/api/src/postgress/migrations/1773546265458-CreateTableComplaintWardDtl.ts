import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableComplaintWardDtl1773546265458 implements MigrationInterface {
    name = 'CreateTableComplaintWardDtl1773546265458'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "cc"."cc_complaint_ward_dtl" (
                "uid" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "ward_number" integer NOT NULL, 
                "ward_admin" character varying, 
                "ward_admin_uid" uuid, 
                "city_name" character varying, 
                "nagarsevak_name" character varying, 
                "mayor_name" character varying, 
                "ward_boundary" geometry(Polygon,4326), 
                CONSTRAINT "PK_e7a6d2cfd9cf3a4cee5af3ceb98" PRIMARY KEY ("uid")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
