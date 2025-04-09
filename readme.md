**Rural Producer Registry**
==========================

**Table of Contents**
-----------------

1. [Introduction](#introduction)
2. [Requirements](#requirements)
3. [Getting Started](#getting-started)
5. [Authentication](#authentication)
6. [Endpoints](#endpoints)
7. [Database Schema](#database-schema)
8. [Validation Logic](#validation-logic)
9. [Business Logic](#business-logic)
10. [Testing](#testing)

**Introduction**
---------------

This is a NodeJS backend application using Postgres as the database, built to manage rural producer registrations. The application provides endpoints for registering, editing, and deleting rural producers, as well as returning aggregated data.

**Requirements**
---------------

* NodeJS 14+
* Postgres 12+
* TypeScript 4+
* [NestJS](https://nestjs.com/)

**Getting Started**
-------------------

1. Clone the repository: `git clone https://github.com/GeovaneMT/Teste-Tecnico-Cadastro-de-Produtor-Rural.git`
2. Install dependencies: `pnpm install`
3. Create a Postgres database using the docker compose file
4. Run the application: `pnpm start`

### Authentication

The application uses token-based authentication to secure its endpoints. The authentication system is built with the following key aspects:

1. **Token Generation and Verification**  
   When a user successfully logs in via the `/sessions` endpoint, the backend verifies the submitted credentials against the stored, hashed password. If the credentials are valid, the system generates an access token (typically a JWT) that is signed using RSA keys.  
   
   The tokens are signed with a private key and can be verified by using the corresponding public key. This ensures that tokens issued by the application are tamper-resistant and that only the application can generate valid tokens.

2. **RSA Key Generation**  
   To set up the authentication system, RSA keys are required. You can generate these keys using OpenSSL as follows:
   
   ```bash
   # Generate a 2048-bit private key
   openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
   
   # Generate public key from the private key
   openssl rsa -pubout -in private_key.pem -out public_key.pem
   
   # Generate base64 string from the given files (useful for environment variables or configuration)
   openssl base64 -A -in private_key.pem -out private_key_base64.txt
   openssl base64 -A -in public_key.pem -out public_key_base64.txt

3. **Configure Environment Variables**  
Fill in .env and .env.test with the base64 strings and other required values. Use .env.example as reference.

4. **MIGRATIONS!**  
don't forget to run pnpx prisma migrate to create a prisma client

**Endpoints**
------------

### Account Endpoints

* `POST /accounts`: Create a new account

### Rural Producer Endpoints

* `POST /producers`: Create a new rural producer
* `GET /producers`: Retrieve a list of recent rural producers
* `GET /producers/:email`: Retrieve a single rural producer by emaill
* `PUT /producers/:id`: Update a rural producer
* `DELETE /producers/:id`: Delete a rural producer

### Farms Endpoints

* `POST /producer-farms`: Create a new producer-farm
* `GET /producer-farms`: Retrieve a list of recent producer-farms
* `GET /producer-farms/:id`: Retrieve a single producer-farm by ID
* `PUT /producer-farms/:id`: Update a producer-farm
* `DELETE /producer-farms/:id`: Delete a producer-farm

### Crops Endpoints

* `POST /farm-crops`: Create a new farm-crop
* `GET /farm-crops`: Retrieve a list of recent farm-crops
* `GET /farm-crops/:id`: Retrieve a single farm-crop by ID
* `PUT /farm-crops/:id`: Update a farm-crop
* `DELETE /farm-crops/:id`: Delete a farm-crop

### indicators Endpoints

* `GET /totalArea`: Returns the total area of all farms
* `GET /totalFarmsArea`: Returns the total area of all farms
* `GET /indicators`:Returns the total planted crops, by state.

**Validation Logic**
-------------------

The application uses validation logic to ensure that:

* Validates CPF and CNPJ formats
* Validates area values (total, arable, vegetation)
* Ensures crop data is consistent with farm capacity

**Business Logic**
------------------

The application uses business logic to:

* Aggregates and calculates farm and crop statistics
* Enforces constraints like available land vs. crop area

**Testing**
------------

The application includes unit tests and integration tests using Vitest and Supertest.
Run tests using:

for unit tests: `pnpm run test`
for e2e tests: run docker container to start the Postgres database in detached mode with `docker-compose up -d`,
then run `pnpm run start:dev`
then after initializes: `pnpm run test:e2e`