import { Prisma } from "@prisma/client";

export const getPrismaClientConfig = (): Prisma.PrismaClientOptions => {
  return {
    datasources: {
      db: { url: process.env.DATABASE_URL }
    }
  };
};