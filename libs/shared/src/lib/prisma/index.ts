import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma =
  globalThis.prisma ??
  new PrismaClient({
    log:
      process.env.APP_STAGE === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

if (process.env.APP_STAGE !== 'production') {
  globalThis.prisma = prisma;
}

export default prisma;
