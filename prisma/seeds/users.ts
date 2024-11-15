// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

export default async function main(prisma: PrismaClient) {
  const usersData = Array.from({ length: 5 }).map(() => ({
    name: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }));

  await prisma.user.createMany({
    data: usersData,
  });

  console.log("Users seeded with hashed passwords and fake data");
}
