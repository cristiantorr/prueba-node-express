# Prueba Node Express

Este es un proyecto de ejemplo que implementa una API REST utilizando Node.js, Express y Prisma como ORM para la gestión de base de datos.

## Tecnologías Utilizadas

- Node.js
- Express.js
- Prisma ORM
- Base de datos (configurada con Prisma)

## Funcionalidades

El proyecto incluye endpoints para:
- Obtener carros (GET /cars)
- Crear nuevos carros (POST /cars)
- Obtener marcas (GET /brands)
- Crear nuevas marcas (POST /brands)

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/cristiantorr/prueba-node-express.git
```

2. Instala las dependencias:
```bash
cd prueba-node-express
npm install
```

3. Configura tu base de datos en el archivo `.env` (asegúrate de crear este archivo)

4. Ejecuta las migraciones de Prisma:
```bash
npx prisma migrate dev
```

## Uso

Para iniciar el servidor:
```bash
node index.js
```

El servidor se ejecutará en `http://localhost:3000`

## Endpoints

### GET /cars
Obtiene la lista de todos los carros

### POST /cars
Crea un nuevo carro
- Body:
```json
{
  "model": "string",
  "year": "number",
  "brandId": "number"
}
```

### GET /brands
Obtiene la lista de todas las marcas

### POST /brands
Crea una nueva marca
- Body:
```json
{
  "name": "string",
  "country": "string"
}
```

## Contribuir

Si deseas contribuir al proyecto, por favor:
1. Haz fork del repositorio
2. Crea una rama para tu feature
3. Haz commit de tus cambios
4. Envía un pull request

## Licencia

ISC
