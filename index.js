const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Crear marcas

app.get('/api/brands/store', async (req, res) => {
 
  try {
    const brands = [
      { name: 'Toyota' },
      { name: 'Ford' },
      { name: 'Honda' },
      { name: 'Chevrolet' },
      { name: 'Nissan' },
      { name: 'Mazda' },
      { name: 'Volkswagen' },
      { name: 'Hyundai' },
      { name: 'Kia' },
      { name: 'Subaru' }
    ];

    // Verificar marcas existentes
    const existingBrands = await prisma.brand.findMany({
      where: {
        name: {
          in: brands.map(b => b.name)
        }
      },
      select: {
        name: true
      }
    });

    // Agregar marcas no existentes

    const repeatedBrands = existingBrands.map(b => b.name);
    const newBrands = brands.filter(b => !repeatedBrands.includes(b.name));

    const result = await prisma.brand.createMany({
      data: newBrands,
      skipDuplicates: true
    });

    res.json({
      message: 'Proceso completado',
      nuevasMarcas: newBrands.length,
      marcasRepetidas: repeatedBrands,
      totalInsertadas: result.count
    });
  } catch (error) {
    console.error('Seeding error:', error);
    res.status(500).json({ error: error });
  }
});

 app.get('/api/cars/store', async (req, res) => {
    try {
      const cars = [
        { model: 'Corolla', description: 'Sedan, compact', price: 15000, mileage: 50000, brandId: 1 },
        { model: 'Civic', description: 'Sedan, sporty', price: 16000, mileage: 40000, brandId: 1 },
        { model: 'Mustang', description: 'Coupe, muscle', price: 25000, mileage: 30000, brandId: 2 },
        { model: 'Accord', description: 'Sedan, family', price: 17000, mileage: 35000, brandId: 1 },
        { model: 'Camaro', description: 'Coupe, muscle', price: 24000, mileage: 28000, brandId: 2 },
        { model: 'Altima', description: 'Sedan, mid-size', price: 15500, mileage: 42000, brandId: 3 },
        { model: 'Sentra', description: 'Sedan, compact', price: 14000, mileage: 51000, brandId: 3 },
        { model: 'Impala', description: 'Sedan, full-size', price: 18000, mileage: 33000, brandId: 4 },
        { model: 'Fit', description: 'Hatchback, compact', price: 13000, mileage: 60000, brandId: 1 },
        { model: 'Explorer', description: 'SUV, large', price: 20000, mileage: 37000, brandId: 2 },
        { model: 'RAV4', description: 'SUV, compact', price: 28000, mileage: 15000, brandId: 1 },      // Toyota
        { model: 'CX-5', description: 'SUV, crossover', price: 27000, mileage: 22000, brandId: 6 },    // Mazda
        { model: 'Golf', description: 'Hatchback, sport', price: 23000, mileage: 18000, brandId: 7 },  // Volkswagen
        { model: 'Tucson', description: 'SUV, family', price: 26000, mileage: 25000, brandId: 8 },     // Hyundai
        { model: 'Sportage', description: 'SUV, compact', price: 24500, mileage: 28000, brandId: 9 },  // Kia
        { model: 'WRX', description: 'Sedan, sport', price: 32000, mileage: 12000, brandId: 10 },      // Subaru
        { model: 'Ranger', description: 'Pickup, midsize', price: 29000, mileage: 31000, brandId: 2 }, // Ford
        { model: 'CR-V', description: 'SUV, reliable', price: 27500, mileage: 19000, brandId: 3 },     // Honda
        { model: 'Tahoe', description: 'SUV, full-size', price: 45000, mileage: 35000, brandId: 4 },   // Chevrolet
        { model: 'Rogue', description: 'SUV, economic', price: 25000, mileage: 27000, brandId: 5 }     // Nissan
      ];
  
      const result = await prisma.car.createMany({
        data: cars,
        skipDuplicates: true
      });
  
      res.json({
        message: 'Cars inserted',
        count: result.count
      });
    } catch (error) {
      console.error('Seeding error:', error);
      res.status(500).json({ error: error });
    }
  });



app.listen(8020, () => {
  console.log('Servidor corriendo en http://localhost:8020');
});
