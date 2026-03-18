import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create roles
  const roles = await Promise.all([
    prisma.role.upsert({
      where: { name: 'SURVIVOR' },
      update: {},
      create: {
        name: 'SURVIVOR',
        description: 'Report victim or survivor',
        permissions: JSON.stringify(['create:reports', 'read:own_reports', 'comment:reports']),
      },
    }),
    prisma.role.upsert({
      where: { name: 'COUNSELOR' },
      update: {},
      create: {
        name: 'COUNSELOR',
        description: 'Provide counseling support',
        permissions: JSON.stringify([
          'read:reports',
          'update:reports',
          'create:case_assignments',
          'read:analytics',
        ]),
      },
    }),
    prisma.role.upsert({
      where: { name: 'DOCTOR' },
      update: {},
      create: {
        name: 'DOCTOR',
        description: 'Provide medical evaluation',
        permissions: JSON.stringify([
          'read:reports',
          'update:reports',
          'create:case_assignments',
          'read:analytics',
        ]),
      },
    }),
    prisma.role.upsert({
      where: { name: 'LAWYER' },
      update: {},
      create: {
        name: 'LAWYER',
        description: 'Provide legal assistance',
        permissions: JSON.stringify([
          'read:reports',
          'update:reports',
          'create:case_assignments',
          'read:analytics',
        ]),
      },
    }),
    prisma.role.upsert({
      where: { name: 'ADMIN' },
      update: {},
      create: {
        name: 'ADMIN',
        description: 'Platform administrator',
        permissions: JSON.stringify(['*']),
      },
    }),
    prisma.role.upsert({
      where: { name: 'MODERATOR' },
      update: {},
      create: {
        name: 'MODERATOR',
        description: 'Content moderator',
        permissions: JSON.stringify([
          'read:reports',
          'update:reports',
          'delete:comments',
          'read:analytics',
        ]),
      },
    }),
  ]);

  console.log('Roles created:', roles.length);

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin@123456', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@platform.com' },
    update: {},
    create: {
      email: 'admin@platform.com',
      passwordHash: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      roleId: roles[4].id, // ADMIN role
      isEmailVerified: true,
      isActive: true,
    },
  });

  console.log('Admin user created:', adminUser.email);

  // Create sample users for each role
  const counselorPassword = await bcrypt.hash('Counselor@123456', 10);
  const counselor = await prisma.user.upsert({
    where: { email: 'counselor1@platform.com' },
    update: {},
    create: {
      email: 'counselor1@platform.com',
      passwordHash: counselorPassword,
      firstName: 'Sarah',
      lastName: 'Johnson',
      roleId: roles[1].id, // COUNSELOR role
      isEmailVerified: true,
      isActive: true,
    },
  });

  const doctorPassword = await bcrypt.hash('Medical@123456', 10);
  const doctor = await prisma.user.upsert({
    where: { email: 'doctor1@platform.com' },
    update: {},
    create: {
      email: 'doctor1@platform.com',
      passwordHash: doctorPassword,
      firstName: 'Dr. James',
      lastName: 'Smith',
      roleId: roles[2].id, // DOCTOR role
      isEmailVerified: true,
      isActive: true,
    },
  });

  const lawyerPassword = await bcrypt.hash('Legal@123456', 10);
  const lawyer = await prisma.user.upsert({
    where: { email: 'lawyer1@platform.com' },
    update: {},
    create: {
      email: 'lawyer1@platform.com',
      passwordHash: lawyerPassword,
      firstName: 'Emily',
      lastName: 'Davis',
      roleId: roles[3].id, // LAWYER role
      isEmailVerified: true,
      isActive: true,
    },
  });

  const survivorPassword = await bcrypt.hash('Survivor@123456', 10);
  const survivor = await prisma.user.upsert({
    where: { email: 'survivor1@platform.com' },
    update: {},
    create: {
      email: 'survivor1@platform.com',
      passwordHash: survivorPassword,
      firstName: 'John',
      lastName: 'Doe',
      roleId: roles[0].id, // SURVIVOR role
      isEmailVerified: true,
      isActive: true,
    },
  });

  console.log('Sample users created');

  // Create sample service providers
  await prisma.serviceProvider.upsert({
    where: { id: 'sp-1' },
    update: {},
    create: {
      id: 'sp-1',
      name: 'National Domestic Violence Hotline',
      type: 'HOTLINE',
      phoneNumber: '1-800-799-7233',
      website: 'https://www.thehotline.org',
      description: '24/7 confidential support for domestic violence',
      isVerified: true,
    },
  });

  console.log('Service providers created');

  // Create ML training data samples
  const trainingDataSamples = [
    {
      text: 'He hit me repeatedly',
      category: 'VIOLENCE',
    },
    {
      text: 'They called me names and humiliated me',
      category: 'HARASSMENT',
    },
    {
      text: 'They excluded me from groups and spread rumors',
      category: 'BULLYING',
    },
    {
      text: 'He touched me inappropriately',
      category: 'ABUSE',
    },
  ];

  for (const data of trainingDataSamples) {
    await prisma.mLTrainingData.upsert({
      where: { id: `training-${data.category}-1` },
      update: {},
      create: {
        id: `training-${data.category}-1`,
        text: data.text,
        category: data.category,
        language: 'en',
        isValidated: true,
      },
    });
  }

  console.log('ML training data created');

  // Create initial analytics record
  await prisma.analytics.upsert({
    where: { date: new Date().toISOString().split('T')[0] as any },
    update: {},
    create: {
      date: new Date(),
      totalReports: 0,
      reportsByType: {},
      reportsBySeverity: {},
      reportsByStatus: {},
      totalUsers: 5,
      usersByRole: {
        SURVIVOR: 1,
        COUNSELOR: 1,
        DOCTOR: 1,
        LAWYER: 1,
        ADMIN: 1,
      },
    },
  });

  console.log('Analytics record created');
  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
