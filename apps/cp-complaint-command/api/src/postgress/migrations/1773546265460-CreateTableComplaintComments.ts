import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableComplaintComments1773546265460 implements MigrationInterface {
    name = 'CreateTableComplaintComments1773546265460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "cc"."cc_complaint_comments" (
                "uid" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "complaint_uid" uuid NOT NULL, 
                "user_uid" uuid NOT NULL, 
                "comment_text" text NOT NULL, 
                "is_official" boolean NOT NULL DEFAULT false, 
                "is_internal" boolean NOT NULL DEFAULT false, 
                "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
                "is_deleted" boolean NOT NULL DEFAULT false, 
                CONSTRAINT "PK_4c650a4707a57062c376eeb1383" PRIMARY KEY ("uid")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
