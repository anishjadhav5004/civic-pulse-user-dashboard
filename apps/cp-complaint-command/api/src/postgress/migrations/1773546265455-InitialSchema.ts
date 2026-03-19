import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1773546265455 implements MigrationInterface {
    name = 'InitialSchema1773546265455'
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "cc"`);
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "postgis"`);

        await queryRunner.query(`CREATE TABLE "cc"."cc_complaints" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "complaint_number" character varying NOT NULL, "reported_by" uuid NOT NULL, "address_uid" uuid, "complaint_title" character varying NOT NULL, "description" text, "category" character varying, "visibility" character varying, "priority" character varying, "can_edit_until" TIMESTAMP, "is_edited" boolean NOT NULL DEFAULT false, "edited_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_dbc4203b7ba0076e570ee1cb1ce" UNIQUE ("complaint_number"), CONSTRAINT "PK_36022aa6d6f6d2a0f9b631af8f2" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "cc"."cc_complaint_ward_dtl" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "ward_number" integer NOT NULL, "ward_admin" character varying, "ward_admin_uid" uuid, "city_name" character varying, "nagarsevak_name" character varying, "mayor_name" character varying, "ward_boundary" geometry(Polygon,4326), CONSTRAINT "PK_e7a6d2cfd9cf3a4cee5af3ceb98" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "cc"."cc_complaint_status_history" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "complaint_uid" uuid NOT NULL, "status" character varying NOT NULL, "modified_by" uuid, "remarks" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "assigned_to" uuid, "assigned_at" TIMESTAMP, "sla_deadline" TIMESTAMP, "is_escalated" boolean NOT NULL DEFAULT false, "escalation_level" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_9bb1a90e3855e8446f6abeb2438" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "cc"."cc_complaint_comments" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "complaint_uid" uuid NOT NULL, "user_uid" uuid NOT NULL, "comment_text" text NOT NULL, "is_official" boolean NOT NULL DEFAULT false, "is_internal" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_4c650a4707a57062c376eeb1383" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "cc"."cc_complaint_attachments" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "complaint_uid" uuid NOT NULL, "file_url" character varying NOT NULL, "file_type" character varying, "file_size_kb" integer, "is_thumbnail" boolean NOT NULL DEFAULT false, "display_order" integer, "uploaded_at" TIMESTAMP NOT NULL DEFAULT now(), "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_a104c88722cf05e5cc5d8401e57" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "cc"."cc_complaint_addresses" ("uid" uuid NOT NULL DEFAULT uuid_generate_v4(), "latitude" numeric(10,8), "longitude" numeric(11,8), "area_name" character varying, "city_name" character varying, "district_name" character varying, "state_name" character varying, "pincode" character varying, "country_code" character varying, "ward_number" integer, "constituency_uid" uuid, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_c3f89accebabbae2c0f31f37646" PRIMARY KEY ("uid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        
    }
}
    