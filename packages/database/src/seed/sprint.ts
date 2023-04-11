import { Sprint } from "@prisma/client";
import { prisma } from "../index";

export const SPRINT_DATA_LIST: Sprint[] = [...Array(10)].map((_, index) => ({
  id: index,
  name: `Sprint ${index}`,
  startDate: new Date(2023, index, 1),
  endDate: new Date(2023, index, 28),
}));

export const generate_sprints = () => {
  console.log("seeding sprints...");
  return SPRINT_DATA_LIST.map((sprint) =>
    prisma.sprint.upsert({
      where: {
        id: sprint.id,
      },
      update: {
        ...sprint,
      },
      create: {
        ...sprint,
      },
    })
  );
};
