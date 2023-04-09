/*
  Warnings:

  - The primary key for the `sprints` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `sprints` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `sprint_id` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_sprint_id_fkey";

-- AlterTable
ALTER TABLE "sprints" DROP CONSTRAINT "sprints_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "sprints_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "sprint_id",
ADD COLUMN     "sprint_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_sprint_id_fkey" FOREIGN KEY ("sprint_id") REFERENCES "sprints"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
