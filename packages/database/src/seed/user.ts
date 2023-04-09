import { User } from "@prisma/client";
import { prisma } from "../index";

const DATA_LIST: Array<Omit<User, "id" | "emailVerified">> = [...Array(5)].map(
  (_, index) => ({
    name: `User${index}`,
    email: `user${index}@example.com`,
  })
);

export const generate_users = () => {
  console.log("seeding users...");
  return DATA_LIST.map((user) =>
    prisma.user.upsert({
      where: {
        email: user.email!,
      },
      update: {
        ...user,
      },
      create: {
        ...user,
      },
    })
  );
};
