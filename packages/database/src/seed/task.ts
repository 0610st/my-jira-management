import { Task } from "@prisma/client";
import { prisma } from "../index";

export const generate_tasks = (sprintIds: number[]) => {
  console.log("seeding tasks...");
  let DATA_LIST: Task[] = [];

  sprintIds.forEach((sprintId) => {
    DATA_LIST = DATA_LIST.concat(
      [...Array(5)].map((_, index) => ({
        key: `task-${sprintId}-${index}`,
        sprintId: sprintId,
        summary: `Task ${sprintId}-${index}`,
        assignee: `User${Math.floor(Math.random() * 5) + 1}`,
        estimatedTime: Math.floor(Math.random() * 20 + 1) * 900,
        spentTime: Math.floor(Math.random() * 20 + 1) * 900,
      }))
    );
  });

  return DATA_LIST.map((task) =>
    prisma.task.upsert({
      where: {
        key: task.key,
      },
      update: {
        ...task,
      },
      create: {
        ...task,
      },
    })
  );
};
