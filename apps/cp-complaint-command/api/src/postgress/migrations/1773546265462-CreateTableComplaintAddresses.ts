import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableComplaintAddresses1773546265462 implements MigrationInterface {
    name = 'CreateTableComplaintAddresses1773546265462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "cc"."cc_complaint_addresses" (
                "uid" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "latitude" numeric(10,8), 
                "longitude" numeric(11,8), 
                "area_name" character varying, 
                "city_name" character varying, 
                "district_name" character varying, 
                "state_name" character varying, 
                "pincode" character varying, 
                "country_code" character varying, 
                "ward_number" integer, 
                "constituency_uid" uuid, 
                "is_active" boolean NOT NULL DEFAULT true, 
                CONSTRAINT "PK_c3f89accebabbae2c0f31f37646" PRIMARY KEY ("uid")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
