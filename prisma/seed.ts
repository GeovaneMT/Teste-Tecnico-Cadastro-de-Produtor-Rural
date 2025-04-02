import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const producer = await prisma.producer.create({
    data: {
      name: 'John Doe',
      document: '12345678901',
      farms: {
        create: [
          {
            name: 'Sunny Farm',
            state: 'SP',
            totalArea: 100.0,
            arableArea: 60.0,
            vegetationArea: 40.0,
            crops: {
              create: [
                { crop: { create: { name: 'Corn' } } },
                { crop: { create: { name: 'Soybean' } } },
              ],
            },
          },
          {
            name: 'Mountain View',
            state: 'MG',
            totalArea: 50.0,
            arableArea: 30.0,
            vegetationArea: 20.0,
            crops: {
              create: [
                { crop: { create: { name: 'Wheat' } } },
                { crop: { create: { name: 'Coffee' } } },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('Producer created:', producer);

  await prisma.crop.createMany({
    data: [
      { name: 'Rice' },
      { name: 'Barley' },
    ],
  });

  console.log('Crops created!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
