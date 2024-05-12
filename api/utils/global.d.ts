// global.d.ts
declare namespace NodeJS {
    interface Global {
      __db: import("@prisma/client").PrismaClient | undefined;
    }
  }
  