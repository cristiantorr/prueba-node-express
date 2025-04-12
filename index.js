const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/cars', async (req, res) => {
  const cars = await prisma.car.findMany({
    include: {
      brand: true
    }
  });
  res.json(cars);
});

app.post('/cars', async (req, res) => {
  const { model, year, brandId } = req.body;
  const car = await prisma.car.create({
    data: { model, year, brandId }
  });
  res.json(car);
});

app.get('/brands', async (req, res) => {
  const brands = await prisma.brand.findMany({
    include: {
      cars: true
    }
  });
  res.json(brands);
});

app.post('/brands', async (req, res) => {
  const { name, country } = req.body;
  const brand = await prisma.brand.create({
    data: { name, country }
  });
  res.json(brand);
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
