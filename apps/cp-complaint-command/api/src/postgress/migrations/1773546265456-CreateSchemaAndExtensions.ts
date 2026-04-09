import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSchemaAndExtensions1773546265456 implements MigrationInterface {
    name = 'CreateSchemaAndExtensions1773546265456'
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "cc"`);
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "postgis"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
