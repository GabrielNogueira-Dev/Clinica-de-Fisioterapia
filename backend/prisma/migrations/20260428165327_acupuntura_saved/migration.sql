/*
  Warnings:

  - The values [ACUMPUNTURA] on the enum `AppointmentType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AppointmentType_new" AS ENUM ('AVALIACAO', 'SESSAO', 'VENTOSATERAPIA', 'PILATES', 'ACUPUNTURA');
ALTER TABLE "ServiceType" ALTER COLUMN "type" TYPE "AppointmentType_new" USING ("type"::text::"AppointmentType_new");
ALTER TABLE "appointments" ALTER COLUMN "type" TYPE "AppointmentType_new" USING ("type"::text::"AppointmentType_new");
ALTER TYPE "AppointmentType" RENAME TO "AppointmentType_old";
ALTER TYPE "AppointmentType_new" RENAME TO "AppointmentType";
DROP TYPE "public"."AppointmentType_old";
COMMIT;
