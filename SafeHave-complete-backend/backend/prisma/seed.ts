import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.auditLog.deleteMany();
  await prisma.mlTrainingData.deleteMany();
  await prisma.analyticsSnapshot.deleteMany();
  await prisma.missingPerson.deleteMany();
  await prisma.forumComment.deleteMany();
  await prisma.forumPost.deleteMany();
  await prisma.caseFeedback.deleteMany();
  await prisma.supportRequest.deleteMany();
  await prisma.serviceProviderReview.deleteMany();
  await prisma.caseComment.deleteMany();
  await prisma.evidence.deleteMany();
  await prisma.caseAssignment.deleteMany();
  await prisma.report.deleteMany();
  await prisma.user.deleteMany();
  await prisma.serviceProvider.deleteMany();

  console.log('✓ Cleared existing data');

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin@123456', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@platform.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      language: 'en',
      phone: '+251900000000',
    },
  });
  console.log('✓ Created admin user');

  // Create counselors
  const counselorPassword = await bcrypt.hash('Counselor@123456', 10);
  const counselors = await Promise.all([
    prisma.user.create({
      data: {
        email: 'counselor1@platform.com',
        password: counselorPassword,
        firstName: 'Maria',
        lastName: 'Johnson',
        role: 'COUNSELOR',
        language: 'en',
        phone: '+251911111111',
      },
    }),
    prisma.user.create({
      data: {
        email: 'counselor2@platform.com',
        password: counselorPassword,
        firstName: 'Ahmed',
        lastName: 'Hassan',
        role: 'COUNSELOR',
        language: 'am',
        phone: '+251922222222',
      },
    }),
  ]);
  console.log('✓ Created counselors');

  // Create medical professionals
  const medicalPassword = await bcrypt.hash('Medical@123456', 10);
  const medicalProfessionals = await Promise.all([
    prisma.user.create({
      data: {
        email: 'doctor1@platform.com',
        password: medicalPassword,
        firstName: 'Dr. Sarah',
        lastName: 'Smith',
        role: 'MEDICAL_PROFESSIONAL',
        language: 'en',
        phone: '+251933333333',
      },
    }),
    prisma.user.create({
      data: {
        email: 'doctor2@platform.com',
        password: medicalPassword,
        firstName: 'Dr. Abebe',
        lastName: 'Tekle',
        role: 'MEDICAL_PROFESSIONAL',
        language: 'am',
        phone: '+251944444444',
      },
    }),
  ]);
  console.log('✓ Created medical professionals');

  // Create legal advisors
  const legalPassword = await bcrypt.hash('Legal@123456', 10);
  const legalAdvisors = await Promise.all([
    prisma.user.create({
      data: {
        email: 'lawyer1@platform.com',
        password: legalPassword,
        firstName: 'Esq. James',
        lastName: 'Anderson',
        role: 'LEGAL_ADVISOR',
        language: 'en',
        phone: '+251955555555',
      },
    }),
    prisma.user.create({
      data: {
        email: 'lawyer2@platform.com',
        password: legalPassword,
        firstName: 'Esq. Almaz',
        lastName: 'Girma',
        role: 'LEGAL_ADVISOR',
        language: 'am',
        phone: '+251966666666',
      },
    }),
  ]);
  console.log('✓ Created legal advisors');

  // Create moderators
  const moderatorPassword = await bcrypt.hash('Moderator@123456', 10);
  const moderators = await Promise.all([
    prisma.user.create({
      data: {
        email: 'moderator1@platform.com',
        password: moderatorPassword,
        firstName: 'Mark',
        lastName: 'Wilson',
        role: 'MODERATOR',
        language: 'en',
        phone: '+251977777777',
      },
    }),
    prisma.user.create({
      data: {
        email: 'moderator2@platform.com',
        password: moderatorPassword,
        firstName: 'Zoe',
        lastName: 'Kedir',
        role: 'MODERATOR',
        language: 'am',
        phone: '+251988888888',
      },
    }),
  ]);
  console.log('✓ Created moderators');

  // Create service providers (Organizations)
  const counselingOrg = await prisma.serviceProvider.create({
    data: {
      name: 'Community Counseling Center',
      type: 'COUNSELOR',
      email: 'info@counseling.org',
      phone: '+251-11-555-0001',
      city: 'Addis Ababa',
      country: 'Ethiopia',
      address: '123 Peace Street, Addis Ababa',
      description:
        'Professional counseling and emotional support services for trauma survivors',
      website: 'www.counseling.org',
      isVerified: true,
      rating: 4.8,
      availability: 'Monday-Saturday, 8AM-6PM',
      languages: ['en', 'am'],
      specializations: [
        'Trauma Counseling',
        'Family Therapy',
        'Child Psychology',
      ],
    },
  });

  const medicalClinic = await prisma.serviceProvider.create({
    data: {
      name: 'Hope Medical Clinic',
      type: 'MEDICAL_PROFESSIONAL',
      email: 'contact@hopemedical.org',
      phone: '+251-11-555-0002',
      city: 'Addis Ababa',
      country: 'Ethiopia',
      address: '456 Health Avenue, Addis Ababa',
      description: 'Medical services for abuse survivors including trauma care',
      website: 'www.hopemedical.org',
      isVerified: true,
      rating: 4.9,
      availability: '24/7 Emergency Services',
      languages: ['en', 'am'],
      specializations: ['Emergency Care', 'Trauma Medicine', 'Sexual Assault Care'],
    },
  });

  const legalAid = await prisma.serviceProvider.create({
    data: {
      name: 'Justice Legal Aid Society',
      type: 'LEGAL_ADVISOR',
      email: 'justice@legalaid.org',
      phone: '+251-11-555-0003',
      city: 'Addis Ababa',
      country: 'Ethiopia',
      address: '789 Justice Street, Addis Ababa',
      description: 'Free legal assistance for abuse and violence survivors',
      website: 'www.legalaid.org',
      isVerified: true,
      rating: 4.7,
      availability: 'Monday-Friday, 9AM-5PM',
      languages: ['en', 'am'],
      specializations: [
        'Criminal Law',
        'Family Law',
        'Human Rights',
      ],
    },
  });

  const ngoOrganization = await prisma.serviceProvider.create({
    data: {
      name: 'Safe Haven NGO',
      type: 'NGO',
      email: 'info@safehaven.org',
      phone: '+251-11-555-0004',
      city: 'Addis Ababa',
      country: 'Ethiopia',
      address: '321 Safe Zone, Addis Ababa',
      description: 'Comprehensive support and shelter for abuse survivors',
      website: 'www.safehaven.org',
      isVerified: true,
      rating: 4.6,
      availability: '24/7',
      languages: ['en', 'am', 'or'],
      specializations: [
        'Emergency Shelter',
        'Community Support',
        'Resource Coordination',
      ],
    },
  });

  const governmentAgency = await prisma.serviceProvider.create({
    data: {
      name: 'Ministry of Women Affairs',
      type: 'GOVERNMENT_AGENCY',
      email: 'support@mwa.gov.et',
      phone: '+251-11-155-7000',
      city: 'Addis Ababa',
      country: 'Ethiopia',
      address: 'Federal Ministry Building, Addis Ababa',
      description: 'Government agency for women protection and rights',
      website: 'www.mwa.gov.et',
      isVerified: true,
      rating: 4.5,
      availability: 'Monday-Friday, 8:30AM-5:30PM',
      languages: ['en', 'am'],
      specializations: [
        'Policy Enforcement',
        'Government Support',
        'Rights Protection',
      ],
    },
  });

  const emergencyHotline = await prisma.serviceProvider.create({
    data: {
      name: '911 Emergency Hotline',
      type: 'HOTLINE',
      email: 'emergency@911.gov.et',
      phone: '911',
      city: 'Addis Ababa',
      country: 'Ethiopia',
      description: 'Emergency response and immediate assistance',
      website: 'www.emergency.gov.et',
      isVerified: true,
      rating: 4.9,
      availability: '24/7/365',
      languages: ['en', 'am'],
      specializations: ['Emergency Response', 'Immediate Assistance'],
    },
  });

  console.log('✓ Created service providers');

  // Create ML training data
  const trainingDataSamples = [
    {
      category: 'PHYSICAL_VIOLENCE' as const,
      text: 'My husband hit me repeatedly and caused bruises on my arms',
      severity: 'HIGH' as const,
    },
    {
      category: 'SEXUAL_ASSAULT' as const,
      text: 'I was sexually assaulted by a colleague at the office',
      severity: 'CRITICAL' as const,
    },
    {
      category: 'CYBERBULLYING' as const,
      text: 'People are sending me hate messages on social media',
      severity: 'MEDIUM' as const,
    },
    {
      category: 'CHILD_ABUSE' as const,
      text: 'My child is being abused at school',
      severity: 'CRITICAL' as const,
    },
    {
      category: 'DOMESTIC_VIOLENCE' as const,
      text: 'My partner threatens me and controls my movements',
      severity: 'HIGH' as const,
    },
    {
      category: 'EMOTIONAL_ABUSE' as const,
      text: 'My family constantly belittles me and makes me feel worthless',
      severity: 'MEDIUM' as const,
    },
    {
      category: 'HARASSMENT' as const,
      text: 'Someone is stalking me and sending threatening messages',
      severity: 'HIGH' as const,
    },
    {
      category: 'WORKPLACE_ABUSE' as const,
      text: 'My boss is treating me unfairly and making my work environment toxic',
      severity: 'MEDIUM' as const,
    },
  ];

  await Promise.all(
    trainingDataSamples.map((sample) =>
      prisma.mlTrainingData.create({
        data: sample,
      }),
    ),
  );
  console.log('✓ Created ML training data');

  // Create sample reports
  const reports = await Promise.all([
    prisma.report.create({
      data: {
        title: 'Physical assault incident',
        description:
          'I was hit and beaten by an unknown person in the street. I have bruises and am afraid for my safety.',
        category: 'PHYSICAL_VIOLENCE',
        severity: 'HIGH',
        status: 'UNDER_INVESTIGATION',
        isAnonymous: true,
        language: 'en',
        location: 'Piazza, Addis Ababa',
        riskScore: 15,
        classificationScore: 0.92,
        classificationLabel: 'PHYSICAL_VIOLENCE',
      },
    }),
    prisma.report.create({
      data: {
        title: 'Online harassment',
        description:
          'I am receiving hateful and threatening messages on social media platforms. This has been happening for weeks.',
        category: 'CYBERBULLYING',
        severity: 'MEDIUM',
        status: 'PENDING_REVIEW',
        isAnonymous: true,
        language: 'en',
        riskScore: 8,
        classificationScore: 0.85,
        classificationLabel: 'CYBERBULLYING',
      },
    }),
    prisma.report.create({
      data: {
        title: 'Child in danger',
        description:
          'I suspect a child in my neighborhood is being abused. I have seen concerning marks and heard distressing sounds.',
        category: 'CHILD_ABUSE',
        severity: 'CRITICAL',
        status: 'ASSIGNED_TO_PROFESSIONAL',
        isAnonymous: true,
        language: 'en',
        riskScore: 25,
        classificationScore: 0.98,
        classificationLabel: 'CHILD_ABUSE',
      },
    }),
    prisma.report.create({
      data: {
        title: 'Family conflict',
        description:
          'My family constantly criticizes and humiliates me. They make me feel worthless and unwanted.',
        category: 'EMOTIONAL_ABUSE',
        severity: 'MEDIUM',
        status: 'PENDING_REVIEW',
        isAnonymous: true,
        language: 'en',
        riskScore: 5,
        classificationScore: 0.78,
        classificationLabel: 'EMOTIONAL_ABUSE',
      },
    }),
  ]);
  console.log('✓ Created sample reports');

  // Create case assignments
  await Promise.all([
    prisma.caseAssignment.create({
      data: {
        reportId: reports[0].id,
        assignedToId: medicalClinic.id,
        caseType: 'MEDICAL_SUPPORT',
        priority: 'HIGH',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        notes: 'Requires immediate medical evaluation and legal documentation',
        status: 'ACTIVE',
      },
    }),
    prisma.caseAssignment.create({
      data: {
        reportId: reports[2].id,
        assignedToId: counselingOrg.id,
        caseType: 'COMBINED_SUPPORT',
        priority: 'CRITICAL',
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        notes: 'Child safety is priority. Coordinate with protection services.',
        status: 'ACTIVE',
      },
    }),
  ]);
  console.log('✓ Created case assignments');

  // Create case comments
  await prisma.caseComment.create({
    data: {
      reportId: reports[0].id,
      authorId: admin.id,
      content:
        'Report received and logged. Medical evaluation recommended. Police report filed.',
      isPublic: false,
    },
  });
  console.log('✓ Created case comments');

  // Create service provider reviews
  await prisma.serviceProviderReview.create({
    data: {
      serviceProviderId: counselingOrg.id,
      rating: 5,
      feedback: 'Excellent service! Very supportive and professional staff.',
    },
  });
  console.log('✓ Created service provider reviews');

  // Create support requests
  await prisma.supportRequest.create({
    data: {
      userId: counselors[0].id,
      serviceProviderId: counselingOrg.id,
      description: 'Requesting additional counseling support for trauma survivors',
      status: 'COMPLETED',
    },
  });
  console.log('✓ Created support requests');

  // Create forum posts
  const forumPost = await prisma.forumPost.create({
    data: {
      authorId: counselors[0].id,
      title: 'Resources for trauma recovery',
      content:
        'Here are some excellent resources that can help with trauma recovery and healing.',
      category: 'RESOURCES',
      status: 'PUBLISHED',
      isAnonymous: true,
    },
  });

  // Create forum comments
  await prisma.forumComment.create({
    data: {
      postId: forumPost.id,
      content:
        'Thank you for sharing these resources. They have been very helpful.',
    },
  });
  console.log('✓ Created forum posts and comments');

  // Create analytics snapshot
  await prisma.analyticsSnapshot.create({
    data: {
      totalReports: reports.length,
      reportsByCategory: JSON.stringify({
        PHYSICAL_VIOLENCE: 1,
        CYBERBULLYING: 1,
        CHILD_ABUSE: 1,
        EMOTIONAL_ABUSE: 1,
      }),
      reportsBySeverity: JSON.stringify({
        LOW: 0,
        MEDIUM: 2,
        HIGH: 1,
        CRITICAL: 1,
      }),
      resolutionRate: 25,
      averageResolutionTime: 48,
      anonymousReportCount: 4,
      publicReportCount: 0,
      casesByType: JSON.stringify({
        COUNSELING: 1,
        MEDICAL_SUPPORT: 1,
        COMBINED_SUPPORT: 2,
      }),
      uniqueReporters: 4,
    },
  });
  console.log('✓ Created analytics snapshot');

  // Create missing persons records
  await prisma.missingPerson.create({
    data: {
      firstName: 'Abeba',
      lastName: 'Worku',
      age: 16,
      description: 'Missing since March 10, 2024. Last seen wearing blue jacket.',
      lastSeenLocation: 'Merkato Area, Addis Ababa',
      lastSeenDate: new Date('2024-03-10'),
      status: 'ACTIVE',
    },
  });
  console.log('✓ Created missing person records');

  // Create audit logs
  await prisma.auditLog.create({
    data: {
      action: 'REPORT_CREATED',
      entityType: 'Report',
      entityId: reports[0].id,
      changes: JSON.stringify({
        title: 'Physical assault incident',
        status: 'PENDING_REVIEW',
      }),
      userId: admin.id,
      ipAddress: '192.168.1.1',
    },
  });
  console.log('✓ Created audit logs');

  console.log('✅ Database seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`  - 1 Admin user`);
  console.log(`  - 2 Counselors`);
  console.log(`  - 2 Medical Professionals`);
  console.log(`  - 2 Legal Advisors`);
  console.log(`  - 2 Moderators`);
  console.log(`  - 6 Service Providers (Organizations)`);
  console.log(`  - 8 ML Training Data samples`);
  console.log(`  - 4 Sample Reports`);
  console.log(`  - 2 Case Assignments`);
  console.log(`  - 1 Missing Person Record`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
