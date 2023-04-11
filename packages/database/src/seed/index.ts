import { generate_sprints, SPRINT_DATA_LIST } from "./sprint";
import { generate_stories } from "./story";
import { generate_tasks } from "./task";

(async () => {
  console.log("seeding started...");
  try {
    const sprintIds = SPRINT_DATA_LIST.map((sprint) => sprint.id);
    await Promise.all([
      ...generate_sprints(),
      ...generate_stories(sprintIds),
      ...generate_tasks(sprintIds),
    ]);
  } catch (error) {
    console.error("seeding aborted.");
    console.error(error);
    process.exit(1);
  } finally {
    console.log("seeding finished...");
    await prisma?.$disconnect();
  }
})();
