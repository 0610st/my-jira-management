-- CreateTable
CREATE TABLE "sprints" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sprints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "key" TEXT NOT NULL,
    "sprint_id" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "assignee" TEXT NOT NULL,
    "estimated_time" INTEGER,
    "spent_time" INTEGER,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("key")
);

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_sprint_id_fkey" FOREIGN KEY ("sprint_id") REFERENCES "sprints"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
