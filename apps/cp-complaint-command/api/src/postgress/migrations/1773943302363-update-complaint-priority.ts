import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateComplaintPriority1773943302363 implements MigrationInterface {
    name = 'UpdateComplaintPriority1773943302363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cc"."cc_complaints" DROP COLUMN "priority"`);
        await queryRunner.query(`CREATE TYPE "cc"."cc_complaints_priority_enum" AS ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')`);
        await queryRunner.query(`ALTER TABLE "cc"."cc_complaints" ADD "priority" "cc"."cc_complaints_priority_enum" NOT NULL DEFAULT 'LOW'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cc"."cc_complaints" DROP COLUMN "priority"`);
        await queryRunner.query(`DROP TYPE "cc"."cc_complaints_priority_enum"`);
        await queryRunner.query(`ALTER TABLE "cc"."cc_complaints" ADD "priority" character varying`);
    }

}
