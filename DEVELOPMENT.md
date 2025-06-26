# Development Guide - Service-Specific Devspace Configuration

This guide explains how to work with the service-specific Devspace configuration in the Ahoy Microservices project.

## 🏗️ Architecture Overview

The project uses a **hierarchical Devspace configuration** approach:

```
devspace.yaml (Root)
├── apps/shell/devspace.yaml
├── apps/auth/devspace.yaml
├── apps/user/devspace.yaml
├── apps/product/devspace.yaml
├── apps/order/devspace.yaml
└── apps/notification/devspace.yaml
```

## 🚀 Getting Started

### 1. Start All Services

```bash
# From the root directory
devspace dev
```

### 2. Work on Individual Services

```bash
# Navigate to the service directory
cd apps/shell
devspace dev

# Or use service-specific pipelines from root
devspace run shell-dev
```

## 📋 Service-Specific Commands

### Shell Application (Angular)

```bash
cd apps/shell

# Development
devspace dev                    # Start development mode
devspace build shell           # Build the application
devspace deploy               # Deploy to Kubernetes
devspace logs shell           # View logs

# Angular-specific
npm run dev                   # Start Angular dev server
npm run build                 # Build for production
npm run test                  # Run tests
```

### Auth Service

```bash
cd apps/auth

# Development
devspace dev                  # Start development mode
devspace build auth          # Build the service
devspace deploy              # Deploy to Kubernetes
devspace logs auth           # View logs

# Node.js-specific
npm run dev                  # Start development server
npm test                     # Run tests
```

### Other Microservices (User, Product, Order, Notification)

```bash
cd apps/{service-name}

# Development
devspace dev                 # Start development mode
devspace build {service}     # Build the service
devspace deploy             # Deploy to Kubernetes
devspace logs {service}     # View logs

# Node.js-specific
npm run dev                 # Start development server
npm test                    # Run tests
```

## 🔄 Pipelines

### Global Pipelines (from root)

```bash
devspace run dev            # Build, deploy, and dev all services
devspace run prod           # Deploy all services to production
```

### Service-Specific Pipelines (from root)

```bash
devspace run shell-dev      # Shell service only
devspace run auth-dev       # Auth service only
devspace run user-dev       # User service only
devspace run product-dev    # Product service only
devspace run order-dev      # Order service only
devspace run notification-dev # Notification service only
```

## 🛠️ Development Workflows

### Scenario 1: Full Stack Development

```bash
# Start all services
devspace dev

# Access services
# - Shell: http://localhost:3000
# - Auth: http://localhost:3001
# - User: http://localhost:3002
# - Product: http://localhost:3003
# - Order: http://localhost:3004
# - Notification: http://localhost:3005
```

### Scenario 2: Frontend Development Only

```bash
cd apps/shell
devspace dev

# Only the Angular application will be running
# Access at http://localhost:3000
```

### Scenario 3: Backend Service Development

```bash
cd apps/auth
devspace dev

# Only the auth service will be running
# Access at http://localhost:3001
```

### Scenario 4: Multiple Services Development

```bash
# Start specific services from root
devspace dev shell auth user

# Only shell, auth, and user services will be running
```

## 🔧 Configuration

### Root Configuration (`devspace.yaml`)

- **Variables**: Shared across all services
- **Imports**: References to service-specific configurations
- **Pipelines**: Global orchestration commands
- **Hooks**: Global lifecycle events

### Service Configuration (`apps/*/devspace.yaml`)

- **Build**: Service-specific Docker build configuration
- **Deploy**: Service-specific Kubernetes deployment
- **Dev**: Service-specific development environment
- **Pipelines**: Service-specific commands
- **Hooks**: Service-specific lifecycle events

## 📊 Monitoring and Debugging

### View Logs

```bash
# All services
devspace logs

# Specific service
devspace logs shell
devspace logs auth
```

### Health Checks

```bash
# Check service health
curl http://localhost:3000/health  # Shell
curl http://localhost:3001/health  # Auth
curl http://localhost:3002/health  # User
curl http://localhost:3003/health  # Product
curl http://localhost:3004/health  # Order
curl http://localhost:3005/health  # Notification
```

### Kubernetes Resources

```bash
# View all resources
kubectl get all

# View specific service
kubectl get pods -l app=shell
kubectl get pods -l app=auth
```

## 🚀 Deployment

### Development Deployment

```bash
# Deploy all services
devspace deploy

# Deploy specific service
devspace deploy shell
devspace deploy auth
```

### Production Deployment

```bash
# Deploy all services to production
devspace deploy --namespace production

# Deploy specific service to production
devspace deploy shell --namespace production
```

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
name: Deploy Service
on:
  push:
    paths:
      - "apps/auth/**"

jobs:
  deploy-auth:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy Auth Service
        run: |
          cd apps/auth
          devspace deploy
```

### Selective Deployment

```bash
# Deploy only changed services
devspace deploy --selector service=auth
devspace deploy --selector service=shell
```

## 🐛 Troubleshooting

### Common Issues

#### Service Not Starting

```bash
# Check service logs
devspace logs {service-name}

# Check Kubernetes pods
kubectl get pods -l app={service-name}
kubectl describe pod {pod-name}
```

#### Port Conflicts

```bash
# Check if ports are in use
lsof -i :3000
lsof -i :3001

# Kill processes if needed
kill -9 {pid}
```

#### Build Issues

```bash
# Clean and rebuild
devspace build --force {service-name}

# Check Docker images
docker images | grep ahoy
```

### Debug Mode

```bash
# Enable debug logging
devspace dev --debug

# View detailed logs
devspace logs --follow --debug
```

## 📚 Best Practices

### 1. Service Independence

- Always work in service-specific directories when possible
- Use service-specific pipelines for faster iteration
- Keep service configurations isolated

### 2. Resource Management

- Only start services you need for development
- Use `devspace purge` to clean up resources
- Monitor resource usage with `kubectl top pods`

### 3. Configuration Management

- Use environment variables for configuration
- Keep secrets in Kubernetes secrets
- Use ConfigMaps for non-sensitive configuration

### 4. Development Workflow

- Use hot reloading for faster development
- Test services independently
- Use health checks to verify service status

## 🎯 Tips and Tricks

### Quick Service Restart

```bash
# Restart specific service
devspace dev --restart shell
```

### Service Scaling

```bash
# Scale service in development
kubectl scale deployment ahoy-microservices-shell --replicas=3
```

### Database Access

```bash
# Port forward to database
kubectl port-forward svc/postgresql 5432:5432
```

### Service Communication

```bash
# Test service-to-service communication
curl http://auth-service:3001/health
curl http://user-service:3002/health
```

This development guide should help you work effectively with the service-specific Devspace configuration. For more information, refer to the main README.md file.
