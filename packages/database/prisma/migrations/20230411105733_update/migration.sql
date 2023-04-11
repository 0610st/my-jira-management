-- CreateTable
CREATE TABLE "stories" (
    "key" TEXT NOT NULL,
    "sprint_id" INTEGER,
    "summary" TEXT NOT NULL,
    "story_point" INTEGER,

    CONSTRAINT "stories_pkey" PRIMARY KEY ("key")
);

-- AddForeignKey
ALTER TABLE "stories" ADD CONSTRAINT "stories_sprint_id_fkey" FOREIGN KEY ("sprint_id") REFERENCES "sprints"("id") ON DELETE SET NULL ON UPDATE CASCADE;
