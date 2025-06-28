# Ahoy Projects Microservice

A microservice for managing projects with a Node.js backend, PostgreSQL database, and frontend components.

## Architecture

- **Backend**: Express.js API with PostgreSQL database
- **Frontend**: Placeholder for future frontend implementation
- **Database**: PostgreSQL with Bitnami Helm chart
- **Containerization**: Node.js v22 Alpine images
- **Orchestration**: Kubernetes with Devspace

## Services

### Backend (Port 3002)

- RESTful API for project management
- PostgreSQL database integration
- CRUD operations for projects
- Project statistics and filtering

### Frontend (Port 3003)

- Placeholder service for future frontend
- Health check endpoint

### Database (Port 5432)

- PostgreSQL database
- Persistent storage with 1Gi volume
- Database: `ahoy_projects`
- User: `postgres`
- Password: `ahoy123`

## Devspace Setup

### Prerequisites

- Devspace CLI installed
- Kubernetes cluster running
- Helm 3.x installed

### Quick Start

1. **Navigate to the projects directory:**

   ```bash
   cd apps/projects
   ```

2. **Initialize Devspace:**

   ```bash
   devspace init
   ```

3. **Deploy the microservice:**

   ```bash
   devspace deploy
   ```

4. **Start development mode:**
   ```bash
   devspace dev
   ```

### Development Commands

```bash
# Deploy all services
devspace deploy

# Start development mode with hot reload
devspace dev

# View logs
devspace logs

# Access services
devspace open

# Clean up
devspace purge
```

## API Endpoints

### Backend API (Port 3002)

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `GET /api/projects/stats` - Get project statistics
- `GET /health` - Health check

### Frontend (Port 3003)

- `GET /` - Service info
- `GET /health` - Health check

## Database Setup

The PostgreSQL database is automatically deployed with:

- Database name: `ahoy_projects`
- Username: `postgres`
- Password: `ahoy123`
- Port: `5432`

The database schema and sample data are automatically initialized when the backend starts.

## Environment Variables

### Backend

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (3002)
- `DB_HOST` - Database host (postgres-primary)
- `DB_PORT` - Database port (5432)
- `DB_NAME` - Database name (ahoy_projects)
- `DB_USER` - Database user (postgres)
- `DB_PASSWORD` - Database password (ahoy123)

### Frontend

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (3003)

## Project Structure

```
apps/projects/
├── backend/                 # Backend API service
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # HTTP request handlers
│   │   ├── services/       # Business logic
│   │   ├── routes/         # API routes
│   │   └── server.js       # Main server file
│   ├── Dockerfile          # Backend container
│   └── package.json
├── frontend/               # Frontend service (placeholder)
│   ├── Dockerfile          # Frontend container
│   ├── package.json
│   └── server.js
├── charts/                 # Helm charts
│   ├── backend/           # Backend Helm chart
│   └── frontend/          # Frontend Helm chart
├── devspace.yaml          # Devspace configuration
└── README.md
```

## Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL pod is running: `kubectl get pods -l app.kubernetes.io/name=postgresql`
- Check database logs: `kubectl logs -l app.kubernetes.io/name=postgresql`

### Backend Issues

- Check backend logs: `devspace logs -s backend`
- Verify environment variables: `kubectl describe pod -l app=ahoy-projects-backend`

### Frontend Issues

- Check frontend logs: `devspace logs -s frontend`
- Verify service is running: `kubectl get svc -l app=ahoy-projects-frontend`

## Next Steps

1. Implement the actual frontend application
2. Add authentication and authorization
3. Set up monitoring and logging
4. Configure production deployment
5. Add automated testing
