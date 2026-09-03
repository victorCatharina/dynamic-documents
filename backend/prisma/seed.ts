import * as bcrypt from 'bcrypt';

const isTest =
  process.argv.includes('--schema=prisma/schema.test.prisma') ||
  process.env.USE_TEST_DB === 'true' ||
  process.env.NODE_ENV === 'test';

let PrismaClientClass: any;
if (isTest) {
  try {
    PrismaClientClass = require('../src/generated/prisma-test').PrismaClient;
  } catch {
    PrismaClientClass = require('@prisma/client').PrismaClient;
  }
} else {
  PrismaClientClass = require('@prisma/client').PrismaClient;
}

const prisma = new PrismaClientClass();

async function main() {
  console.log(`Seeding initial data (${isTest ? 'SQLite test/temp database' : 'MSSQL database'})...`);

  const adminEmail = 'admin@dynamicdocs.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('Admin123!', 10);
    const admin = await prisma.user.create({
      data: {
        name: 'Administrador do Sistema',
        email: adminEmail,
        passwordHash,
        role: 'ADMIN',
      },
    });
    console.log(`Default admin created: ${admin.email}`);
  } else {
    console.log(`Admin user ${adminEmail} already exists.`);
  }

  // Create default custom fields
  const defaultCustomFields = [
    {
      key: 'nomePaciente',
      label: 'Nome do Paciente',
      type: 'TEXT',
      inputMode: 'INTEGRATION',
      validation: { required: true, minLength: 3, maxLength: 120 },
    },
    {
      key: 'numeroContrato',
      label: 'Número do Contrato',
      type: 'TEXT',
      inputMode: 'INTEGRATION',
      validation: { required: true },
    },
    {
      key: 'cpfCliente',
      label: 'CPF do Cliente',
      type: 'TEXT',
      inputMode: 'MANUAL',
      validation: { required: true },
      formatting: { mask: '000.000.000-00' },
    },
    {
      key: 'dataAtendimento',
      label: 'Data do Atendimento',
      type: 'DATE',
      inputMode: 'MANUAL',
      validation: { required: true },
    },
  ];

  for (const field of defaultCustomFields) {
    await prisma.customFieldDefinition.upsert({
      where: { key: field.key },
      update: {},
      create: {
        key: field.key,
        label: field.label,
        type: field.type,
        inputMode: field.inputMode,
        validation: field.validation ? JSON.stringify(field.validation) : null,
        formatting: field.formatting ? JSON.stringify(field.formatting) : null,
      },
    });
  }
  console.log('Default custom fields seeded.');

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
