import { generate_users } from "./user";

(async () => {
  console.log("seeding started...");
  try {
    await Promise.all([...generate_users()]);
  } catch (error) {
    console.error("seeding aborted.");
    console.error(error);
    process.exit(1);
  } finally {
    console.log("seeding finished...");
    await prisma?.$disconnect();
  }
})();
