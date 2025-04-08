# Generate 2048-bit private key
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048

# Generate public key from the private key
openssl rsa -pubout -in private_key.pem -out public_key.pem

# Generate base64 string from the given files
openssl base64 -A -in private_key.pem -out private_key_base64.txt
openssl base64 -A -in public_key.pem -out public_key_base64.txt

**Rural Producer Registry**
==========================

**Table of Contents**
-----------------

1. [Introduction](#introduction)
2. [Requirements](#requirements)
3. [Getting Started](#getting-started)
4. [Endpoints](#endpoints)
5. [Database Schema](#database-schema)
6. [Validation Logic](#validation-logic)
7. [Business Logic](#business-logic)
8. [Testing](#testing)
9. [Deployment](#deployment)

**Introduction**
---------------

This is a NodeJS backend application using Postgres as the database, built to manage rural producer registrations. The application provides endpoints for registering, editing, and deleting rural producers, as well as returning aggregated data.

**Requirements**
---------------

* NodeJS 14+
* Postgres 12+
* TypeScript 4+
* NestJS framework

**Getting Started**
-------------------

1. Clone the repository: `git clone https://github.com/GeovaneMT/Teste-Tecnico-Cadastro-de-Produtor-Rural.git`
2. Install dependencies: `pnpm install`
3. Create a Postgres database using the docker compose and update the `database.json` file with your credentials
4. Run the application: `pnpm start`

**Endpoints**
------------

### Rural Producer Endpoints

* `POST /producers`: Create a new rural producer
* `GET /producers`: Retrieve a list of all rural producers
* `GET /producers/:id`: Retrieve a single rural producer by ID
* `PUT /producers/:id`: Update a rural producer
* `DELETE /producers/:id`: Delete a rural producer

### Farms Endpoints

* `POST /producer-farms`: Create a new rural producer-farm
* `GET /producer-farms`: Retrieve a list of all rural producer-farms
* `GET /producer-farms/:id`: Retrieve a single rural producer-farm by ID
* `PUT /producer-farms/:id`: Update a rural producer-farm
* `DELETE /producer-farms/:id`: Delete a rural producer-farm

### Crops Endpoints

* `POST /farm-crops`: Create a new rural farm-crop
* `GET /farm-crops`: Retrieve a list of all rural farm-crops
* `GET /farm-crops/:id`: Retrieve a single rural farm-crop by ID
* `PUT /farm-crops/:id`: Update a rural farm-crop
* `DELETE /farm-crops/:id`: Delete a rural farm-crop

**Database Schema**
------------------

The database schema is defined in the `database.json` file. The schema consists of the following main tables:

* `producers`: stores rural producer data
* `farms`: stores farm data
* `crops`: stores crop data

**Validation Logic**
-------------------

The application uses validation logic to ensure that:

* CPF and CNPJ numbers are valid
* Farm area calculations are correct
* Crop production data is consistent

**Business Logic**
------------------

The application uses business logic to:

* Calculate farm area and crop production data
* Ensure that each producer can plant multiple crops

**Testing**
------------

The application includes unit tests and integration tests using Jest and Supertest.

**Deployment**
--------------

The application can be deployed using a Docker-compose file. To deploy, run the following command:

`docker-compose up -d`

This will start the application and Postgres database in detached mode.