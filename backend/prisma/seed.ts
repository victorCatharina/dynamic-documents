import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial data...');

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
      type: 'TEXT' as const,
      inputMode: 'INTEGRATION' as const,
      validation: { required: true, minLength: 3, maxLength: 120 },
    },
    {
      key: 'numeroContrato',
      label: 'Número do Contrato',
      type: 'TEXT' as const,
      inputMode: 'INTEGRATION' as const,
      validation: { required: true },
    },
    {
      key: 'cpfCliente',
      label: 'CPF do Cliente',
      type: 'TEXT' as const,
      inputMode: 'MANUAL' as const,
      validation: { required: true },
      formatting: { mask: '000.000.000-00' },
    },
    {
      key: 'dataAtendimento',
      label: 'Data do Atendimento',
      type: 'DATE' as const,
      inputMode: 'MANUAL' as const,
      validation: { required: true },
    },
  ];

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
