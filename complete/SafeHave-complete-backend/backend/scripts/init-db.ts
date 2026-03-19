import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('[v0] Starting database initialization...');

  try {
    // Create default admin user
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@safehaven.com' },
      update: {},
      create: {
        email: 'admin@safehaven.com',
        password: await bcrypt.hash('admin123', 10),
        firstName: 'System',
        lastName: 'Admin',
        role: 'ADMIN',
        status: 'ACTIVE',
      },
    });

    console.log('[v0] Created admin user:', adminUser.id);

    // Create test counselor
    const counselor = await prisma.user.upsert({
      where: { email: 'counselor@safehaven.com' },
      update: {},
      create: {
        email: 'counselor@safehaven.com',
        password: await bcrypt.hash('counselor123', 10),
        firstName: 'John',
        lastName: 'Counselor',
        role: 'COUNSELOR',
        status: 'ACTIVE',
      },
    });

    console.log('[v0] Created counselor user:', counselor.id);

    // Create test survivor user
    const survivor = await prisma.user.upsert({
      where: { email: 'survivor@safehaven.com' },
      update: {},
      create: {
        email: 'survivor@safehaven.com',
        password: await bcrypt.hash('survivor123', 10),
        firstName: 'Jane',
        lastName: 'Survivor',
        role: 'SURVIVOR',
        status: 'ACTIVE',
      },
    });

    console.log('[v0] Created survivor user:', survivor.id);

    console.log('[v0] Database initialization completed successfully!');
  } catch (error) {
    console.error('[v0] Database initialization failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
