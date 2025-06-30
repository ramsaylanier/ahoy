# Ahoy Microservices Architecture

A modern web application built with a microservices architecture using Angular for the frontend applications and Node.js microservices, all orchestrated with Kubernetes and Devspace V6.

## 🏗️ Architecture Overview

This project implements a microservices architecture with the following components:

### Frontend Applications

1. **Shell Application** (Port 3000)

   - **Technology**: Angular 20 with Material Design
   - **Purpose**: Main user interface shell application that integrates with various microservices
   - **Features**: Module federation support, Material Design components, charts integration

2. **Projects Frontend** (Port 3001)
   - **Technology**: Angular 20
   - **Purpose**: Dedicated frontend for project management functionality
   - **Features**: Module federation support, project-specific UI components

### Microservices

1. **Projects Backend** (Port 3002)
   - **Technology**: Node.js with Express and PostgreSQL
   - **Purpose**: Project management API with database integration
   - **Features**: Project CRUD operations, PostgreSQL database integration

### Infrastructure

- **Container Orchestration**: Kubernetes
- **Development Platform**: Devspace V6
- **Database**: PostgreSQL (for projects backend)
- **Cache**: Redis (for auth service)
- **API Gateway**: Nginx (optional)

## 🚀 Quick Start

### Prerequisites

1. **Kubernetes Cluster**

   - Minikube, Docker Desktop, or any Kubernetes cluster
   - kubectl configured

2. **Devspace V6**

   ```bash
   # Install Devspace V6
   curl -L -o devspace "https://github.com/devspace-cloud/devspace/releases/latest/download/devspace-darwin-amd64"
   chmod +x devspace
   sudo mv devspace /usr/local/bin/
   ```

3. **Node.js 22+**

   ```bash
   # Install Node.js
   brew install node
   ```

4. **Angular CLI**
   ```bash
   npm install -g @angular/cli
   ```

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Ahoy
   ```

2. **Start development environment**

   ```bash
   # Start all services in development mode
   devspace dev
   ```

3. **Access the application**
   - Shell Application: http://localhost:3000
   - Projects Frontend: http://localhost:3001
   - Projects Backend: http://localhost:3002

## 🛠️ Development

### Project Structure

```
Ahoy/
├── apps/
│   ├── shell/                 # Angular shell application
│   │   ├── devspace.yaml      # Service-specific Devspace config
│   │   ├── Dockerfile
│   │   ├── federation.config.js
│   │   └── src/
│   ├── projects/              # Project management application
│   │   ├── backend/           # Projects backend API
│   │   │   ├── devspace.yaml  # Service-specific Devspace config
│   │   │   ├── Dockerfile
│   │   │   └── src/
│   │   ├── frontend/          # Projects frontend application
│   │   │   ├── devspace.yaml  # Service-specific Devspace config
│   │   │   ├── Dockerfile
│   │   │   ├── federation.config.js
│   │   │   └── src/
│   │   ├── devspace.yaml      # Projects-specific Devspace config
│   │   ├── charts/            # Helm charts for projects
│   │   └── start-dev.sh       # Development startup script
├── devspace.yaml              # Root Devspace configuration
└── README.md
```

### Devspace Configuration Structure

The project uses a **service-specific Devspace configuration** approach:

#### Root Configuration (`devspace.yaml`)

- **Purpose**: Orchestrates all services and provides shared variables
- **Features**:
  - Imports service-specific configurations
  - Defines global pipelines for all services
  - Manages shared variables and hooks

#### Service-Specific Configurations (`apps/*/devspace.yaml`)

- **Purpose**: Individual service configuration and development
- **Features**:
  - Service-specific build, deploy, and dev configurations
  - Individual pipelines for each service
  - Service-specific hooks and logging

### Development Commands

#### Working with All Services

```bash
# Start all services
devspace dev

# Build all services
devspace build

# Deploy all services
devspace deploy

# View logs for all services
devspace logs
```

#### Working with Individual Services

```bash
# Work on shell application only
cd apps/shell
devspace dev

# Work on projects
cd apps/projects
devspace dev

# Work on projects backend only
cd apps/projects/backend
devspace dev

# Work on projects frontend only
cd apps/projects/frontend
devspace dev
```

#### Service-Specific Pipelines

```bash
# From root directory, run service-specific pipelines
devspace run shell-dev           # Build, deploy, and dev shell service
devspace run projects-backend-dev # Build, deploy, and dev projects backend
devspace run projects-frontend-dev # Build, deploy, and dev projects frontend
```

#### Frontend Applications (Angular)

```bash
cd apps/shell
npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run tests
npm run lint         # Run linting

cd apps/projects/frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run tests
npm run lint         # Run linting
```

## 🐳 Docker & Kubernetes

### Building Images

```bash
# Build all services
devspace build

# Build specific service
devspace build projects
cd apps/projects && devspace build
```

### Deploying to Kubernetes

```bash
# Deploy all services to development
devspace deploy

# Deploy specific service
devspace deploy projecs
cd apps/projects && devspace deploy

# Deploy to production
devspace deploy --namespace production
```

### Kubernetes Resources

The project includes Helm charts for easy deployment:

- Deployments for each microservice
- Services for internal communication
- Ingress for external access
- ConfigMaps and Secrets for configuration
- PostgreSQL deployment for projects backend

## 🔧 Configuration

### Environment Variables

#### Shell Application

- `API_BASE_URL`: Base URL for API calls
- `NODE_ENV`: Environment (development/production)

#### Projects Backend

- `DB_HOST`: PostgreSQL host
- `DB_PORT`: PostgreSQL port
- `DB_NAME`: Database name
- `DB_USER`: Database user
- `DB_PASSWORD`: Database password
- `NODE_ENV`: Environment setting

#### Projects Frontend

- `NODE_ENV`: Environment setting
- `PORT`: Frontend port

### Secrets Management

Create Kubernetes secrets for sensitive data:

```bash
kubectl create secret generic auth-secrets \
  --from-literal=jwt-secret=your-secret-key \
  --from-literal=database-url=postgresql://user:pass@host:port/db \
  --from-literal=redis-url=redis://host:port

kubectl create secret generic user-secrets \
  --from-literal=database-url=postgresql://user:pass@host:port/db
```

## 📊 Monitoring & Health Checks

Each service includes health check endpoints:

- Shell: `GET /health`
- Auth: `GET /health`
- User: `GET /health`
- Projects Backend: `GET /health`
- Projects Frontend: `GET /health`

## 🧪 Testing

### Unit Tests

```bash
# Test shell application
cd apps/shell && npm run test

# Test projects frontend
cd apps/projects/frontend && npm run test
```

### Integration Tests

```bash
# Run integration tests
npm run test:integration
```

### E2E Tests

```bash
# Run end-to-end tests
npm run test:e2e
```

## 🚀 Production Deployment

### Prerequisites

- Kubernetes cluster
- Container registry (e.g., Docker Hub, GitHub Container Registry)
- Ingress controller (e.g., nginx-ingress)

### Deployment Steps

1. **Update registry configuration** in service-specific `devspace.yaml` files
2. **Create Kubernetes secrets** for sensitive data
3. **Deploy to production**:
   ```bash
   devspace deploy --namespace production
   ```

### Production Considerations

- Use proper secrets management
- Configure SSL/TLS certificates
- Set up monitoring and logging
- Configure auto-scaling
- Implement proper backup strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the troubleshooting guide

## 🔄 CI/CD Pipeline

The project includes Devspace pipelines for automated deployment:

- `dev`: Development pipeline for all services
- `prod`: Production pipeline for all services
- `{service}-dev`: Individual service development pipelines

Configure your CI/CD system to use these pipelines for automated deployments.

## 🎯 Benefits of Service-Specific Devspace Configuration

### For Development Teams

- **Independent Development**: Teams can work on services independently
- **Faster Iteration**: Only rebuild/redeploy the service you're working on
- **Reduced Resource Usage**: Run only the services you need
- **Better Isolation**: Service-specific configurations prevent conflicts

### For DevOps

- **Granular Control**: Deploy specific services without affecting others
- **Easier Debugging**: Service-specific logs and configurations
- **Flexible Scaling**: Scale services independently based on demand
- **Better Monitoring**: Service-specific health checks and metrics

### For CI/CD

- **Parallel Processing**: Build and test services in parallel
- **Selective Deployment**: Deploy only changed services
- **Rollback Capability**: Rollback specific services without affecting others
