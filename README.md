# CrochetStore

CrochetStore is an e-commerce application for selling handmade crochet products directly to customers.

The project is being built from scratch with a focus on learning and applying production-grade software development practices.

## Tech Stack

### Backend
- Java 21
- Spring Boot
- Spring Web MVC
- Spring Data JPA
- PostgreSQL
- Flyway
- Maven

### Frontend
- React *(planned)*

### Testing
- JUnit
- Spring Boot Test
- PostgreSQL Testcontainers *(planned)*

## Project Structure

```text
CrochetStore/
├── backend/        # Spring Boot REST API
├── frontend/       # React application
└── README.md
```

## Current Features

- Product catalogue REST API
- Create, retrieve, update and deactivate products
- PostgreSQL persistence
- Flyway database migrations
- Product request validation
- Sample crochet product catalogue

## Development

### Backend

From the `backend` directory:

```bash
./mvnw spring-boot:run
```

On Windows PowerShell:

```powershell
.\mvnw spring-boot:run
```

The backend currently runs on:

```text
http://localhost:8081
```

## API

Current product endpoints:

```text
GET    /api/products
GET    /api/products/{id}
POST   /api/products
PUT    /api/products/{id}
DELETE /api/products/{id}
```

`DELETE` currently performs a soft delete by marking the product as inactive.

## Database Migrations

Database schema and seed data are managed using Flyway.

```text
V1__initial_schema.sql
V2__create_product_tables.sql
V3__insert_sample_products.sql
```

## Development Conventions

### TODO References

TODO comments referencing `#<number>` correspond to GitHub issues in this repository.

Example:

```java
// TODO #17: Configure PostgreSQL integration testing with Testcontainers
```

## Project Status

🚧 Under active development.