# Job Portal Backend

This is the backend service for the Job Portal application, built with NestJS, TypeScript, and PostgreSQL.

## Features

- **Authentication**: JWT-based authentication for users
- **User Management**: Registration, profile management
- **Job Management**: CRUD operations for job listings
- **Application System**: Job application processing
- **Role-Based Access**: Different features for job seekers and employers

## Technology Stack

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications
- **TypeScript**: For type safety and better developer experience
- **PostgreSQL**: Relational database for data storage
- **TypeORM**: Object-Relational Mapping for database interactions
- **JWT**: For secure authentication
- **Docker**: For containerization and easy deployment

## Project Structure

```
src/
├── app.module.ts       # Main application module
├── main.ts             # Application entry point
│
├── auth/               # Authentication module
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   ├── jwt-auth.guard.ts
│   └── users/          # User management
│
├── jobs/               # Jobs module
│   ├── entities/
│   ├── dto/
│   ├── jobs.controller.ts
│   ├── jobs.module.ts
│   └── jobs.service.ts
│
├── applications/       # Applications module
│   ├── entities/
│   ├── dto/
│   ├── applications.controller.ts
│   ├── applications.module.ts
│   └── applications.service.ts
│
├── employer/           # Employer module
│   ├── dto/
│   ├── employer.controller.ts
│   ├── employer.module.ts
│   └── employer.service.ts
│
└── profile/            # Profile module
    ├── dto/
    ├── profile.controller.ts
    ├── profile.module.ts
    └── profile.service.ts
```
## Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm or yarn
- Docker and Docker Compose (for containerized setup)
- PostgreSQL (if not using Docker)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration.

Environment Variables

Key environment variables:
- `DB_HOST`: Database host
- `DB_PORT`: Database port
- `DB_USERNAME`: Database username
- `DB_PASSWORD`: Database password
- `DB_DATABASE`: Database name
- `JWT_SECRET`: Secret for JWT signing
- `PORT`: Application port

### Running the Application

#### Using Docker (recommended)
```bash
docker-compose up -d
```
```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```


## Database

The application uses PostgreSQL with TypeORM. The database schema is defined through entities in the respective module directories.

### Migrations
For production environments, it's recommended to use migrations instead of automatic synchronization:

```bash
# Generate a migration
npm run typeorm:generate-migration -- -n MigrationName

# Run migrations
npm run typeorm:run-migrations
```
