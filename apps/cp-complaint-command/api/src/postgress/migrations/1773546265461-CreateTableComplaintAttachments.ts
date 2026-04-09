import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableComplaintAttachments1773546265461 implements MigrationInterface {
    name = 'CreateTableComplaintAttachments1773546265461'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "cc"."cc_complaint_attachments" (
                "uid" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "complaint_uid" uuid NOT NULL, 
                "file_url" character varying NOT NULL, 
                "file_type" character varying, 
                "file_size_kb" integer, 
                "is_thumbnail" boolean NOT NULL DEFAULT false, 
                "display_order" integer, 
                "uploaded_at" TIMESTAMP NOT NULL DEFAULT now(), 
                "is_active" boolean NOT NULL DEFAULT true, 
                CONSTRAINT "PK_a104c88722cf05e5cc5d8401e57" PRIMARY KEY ("uid")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
