# Como correr el proyecto en diferentes stages

## Desarrollo

Pre-requisitos:

- Node.js
- npm
- Docker

Pasos para correr el proyecto en desarrollo:

1. Clonar el repositorio
2. Instalar las dependencias con `npm install`
3. Levantar el contenedor de base de datos con `docker-compose up -d`
4. Generar el cliente de Prisma con `npx prisma generate`
5. Correr las migraciones con `npm run migrate reset`
6. Correr el proyecto con `npm run dev`
7. Acceder a `http://localhost:3000`

## Producción

Pre-requisitos:

- Docker

Pasos para correr el proyecto en producción:

1. Clonar el repositorio
2. Levantar el contenedor de producción con `docker-compose -f docker-compose.prod.yml up -d`
3. Acceder a `http://localhost:3000`
4. Para detener el contenedor, correr `docker-compose -f docker-compose.prod.yml down`
5. Para detener el contenedor y borrar los volúmenes, correr `docker-compose -f docker-compose.prod.yml down -v`
