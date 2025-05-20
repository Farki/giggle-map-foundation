import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePlacesTable1747669386751 implements MigrationInterface {
    name = 'CreatePlacesTable1747669386751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "place" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "location" geography(Point,4326) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_96ab91d43aa89c5de1b59ee7cca" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "place"`);
    }

}
