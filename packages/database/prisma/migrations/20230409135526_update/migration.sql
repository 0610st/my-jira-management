-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_sprint_id_fkey";

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "sprint_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_sprint_id_fkey" FOREIGN KEY ("sprint_id") REFERENCES "sprints"("id") ON DELETE SET NULL ON UPDATE CASCADE;
