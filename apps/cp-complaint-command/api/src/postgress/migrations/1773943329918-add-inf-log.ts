import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInfLog1773943329918 implements MigrationInterface {
  name = 'AddInfLog1773943329918';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "inf_log" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
        "module_code" character varying NOT NULL DEFAULT 'GENERAL', 
        "api" character varying, 
        "log" text NOT NULL, 
        "level" character varying(10) NOT NULL, 
        "error" boolean NOT NULL DEFAULT false, 
        "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
        CONSTRAINT "PK_7f76af77916e18e30559028d0dd" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_8fce141c1a1b5528b392bfcdbc" ON "inf_log" ("module_code", "level") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8fce141c1a1b5528b392bfcdbc"`,
    );
    await queryRunner.query(`DROP TABLE "inf_log"`);
  }
}
