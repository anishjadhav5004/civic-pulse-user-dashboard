import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateComplaintVisibilityDate1774319745232 implements MigrationInterface {
    name = 'UpdateComplaintVisibilityDate1774319745232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cc"."cc_complaints" ALTER COLUMN "visibility" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cc"."cc_complaints" ALTER COLUMN "visibility" SET DEFAULT false`);  
        await queryRunner.query(`ALTER TABLE "cc"."cc_complaints" ALTER COLUMN "can_edit_until" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cc"."cc_complaints" ALTER COLUMN "edited_at" DROP NOT NULL`);       
        await queryRunner.query(`ALTER TABLE "cc"."cc_complaints" ALTER COLUMN "updated_at" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}