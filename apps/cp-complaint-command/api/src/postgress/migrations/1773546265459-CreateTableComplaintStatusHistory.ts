import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableComplaintStatusHistory1773546265459 implements MigrationInterface {
    name = 'CreateTableComplaintStatusHistory1773546265459'

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "cc"."cc_complaint_status_history" (
                "uid" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "complaint_uid" uuid NOT NULL, 
                "status" character varying NOT NULL, 
                "modified_by" uuid, 
                "remarks" text, 
                "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
                "assigned_to" uuid, 
                "assigned_at" TIMESTAMP, 
                "sla_deadline" TIMESTAMP, 
                "is_escalated" boolean NOT NULL DEFAULT false, 
                "escalation_level" integer NOT NULL DEFAULT '0', 
                CONSTRAINT "PK_9bb1a90e3855e8446f6abeb2438" PRIMARY KEY ("uid")
            )
         `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
