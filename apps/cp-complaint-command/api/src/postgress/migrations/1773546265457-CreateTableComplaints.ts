import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableComplaints1773546265457 implements MigrationInterface {
    name = 'CreateTableComplaints1773546265457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "cc"."cc_complaints" (
                "uid" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "complaint_number" character varying NOT NULL, 
                "reported_by" uuid NOT NULL, 
                "address_uid" uuid, 
                "complaint_title" character varying NOT NULL, 
                "description" text, 
                "category" character varying, 
                "visibility" character varying, 
                "priority" character varying, 
                "can_edit_until" TIMESTAMP, 
                "is_edited" boolean NOT NULL DEFAULT false, 
                "edited_at" TIMESTAMP, 
                "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
                CONSTRAINT "UQ_dbc4203b7ba0076e570ee1cb1ce" UNIQUE ("complaint_number"), 
                CONSTRAINT "PK_36022aa6d6f6d2a0f9b631af8f2" PRIMARY KEY ("uid")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
