import { Story } from "@prisma/client";
import { prisma } from "../index";

export const generate_stories = (sprintIds: number[]) => {
  console.log("seeding stories...");
  let DATA_LIST: Story[] = [];

  sprintIds.forEach((sprintId) => {
    DATA_LIST = DATA_LIST.concat(
      [...Array(5)].map((_, index) => ({
        key: `story-${sprintId}-${index}`,
        sprintId: sprintId,
        summary: `Story ${sprintId}-${index}`,
        storyPoint: Math.floor(Math.random() * 21),
      }))
    );
  });

  return DATA_LIST.map((story) =>
    prisma.story.upsert({
      where: {
        key: story.key,
      },
      update: {
        ...story,
      },
      create: {
        ...story,
      },
    })
  );
};
