#!/bin/bash

# Ahoy Microservices Setup Script
echo "🚀 Setting up Ahoy Microservices Architecture..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if Angular CLI is installed
if ! command -v ng &> /dev/null; then
    echo "📦 Installing Angular CLI..."
    npm install -g @angular/cli
fi

# Check if Devspace is installed
if ! command -v devspace &> /dev/null; then
    echo "📦 Installing Devspace V6..."
    curl -L -o devspace "https://github.com/devspace-cloud/devspace/releases/latest/download/devspace-darwin-amd64"
    chmod +x devspace
    sudo mv devspace /usr/local/bin/
fi

# Create necessary directories
echo "📁 Creating project structure..."
mkdir -p apps/shell/src/app/{pages,features,shared,core}
mkdir -p apps/shell/src/app/features/{auth,users,products,orders,notifications}
mkdir -p apps/shell/src/environments
mkdir -p apps/{user,product,order,notification}/src/{routes,controllers,middleware,models,utils}

# Install dependencies for shell application
echo "📦 Installing Angular shell dependencies..."
cd apps/shell
npm install
cd ../..

# Install dependencies for auth service
echo "📦 Installing Auth service dependencies..."
cd apps/auth
npm install
cd ../..

# Create environment files
echo "⚙️ Creating environment files..."
cat > apps/shell/src/environments/environment.ts << EOF
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000/api',
  authServiceUrl: 'http://localhost:3001/api/auth',
  userServiceUrl: 'http://localhost:3002/api/users',
  productServiceUrl: 'http://localhost:3003/api/products',
  orderServiceUrl: 'http://localhost:3004/api/orders',
  notificationServiceUrl: 'http://localhost:3005/api/notifications'
};
EOF

cat > apps/shell/src/environments/environment.prod.ts << EOF
export const environment = {
  production: true,
  apiBaseUrl: '/api',
  authServiceUrl: '/api/auth',
  userServiceUrl: '/api/users',
  productServiceUrl: '/api/products',
  orderServiceUrl: '/api/orders',
  notificationServiceUrl: '/api/notifications'
};
EOF

# Create basic Angular files
echo "📝 Creating basic Angular files..."
cat > apps/shell/src/index.html << EOF
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Ahoy Microservices</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body>
  <app-root></app-root>
</body>
</html>
EOF

cat > apps/shell/src/styles.scss << EOF
/* You can add global styles to this file, and also import other style files */
html, body { height: 100%; }
body { margin: 0; font-family: Roboto, "Helvetica Neue", sans-serif; }

.spacer {
  flex: 1 1 auto;
}

.sidenav-container {
  height: calc(100vh - 64px);
}

.sidenav {
  width: 250px;
}

.sidenav-content {
  padding: 20px;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
}

.active {
  background-color: rgba(0, 0, 0, 0.1);
}

mat-nav-list a {
  display: flex;
  align-items: center;
  gap: 12px;
}
EOF

# Create health check file for auth service
echo "📝 Creating health check file for auth service..."
cat > apps/auth/healthcheck.js << EOF
const http = require('http');

const options = {
  host: 'localhost',
  port: 3001,
  path: '/health',
  timeout: 2000
};

const request = http.request(options, (res) => {
  console.log(\`STATUS: \${res.statusCode}\`);
  if (res.statusCode == 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on('error', function(err) {
  console.log('ERROR');
  process.exit(1);
});

request.end();
EOF

# Create basic microservice templates
echo "📝 Creating basic microservice templates..."

# User service
cat > apps/user/package.json << EOF
{
  "name": "ahoy-user",
  "version": "1.0.0",
  "description": "User Management Microservice for Ahoy",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0",
    "joi": "^17.11.0",
    "dotenv": "^16.3.1",
    "pg": "^8.11.3"
  },
  "devDependencies": {
    "nodemon": "^3.0.2",
    "jest": "^29.7.0"
  }
}
EOF

# Product service
cat > apps/product/package.json << EOF
{
  "name": "ahoy-product",
  "version": "1.0.0",
  "description": "Product Management Microservice for Ahoy",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0",
    "joi": "^17.11.0",
    "dotenv": "^16.3.1",
    "pg": "^8.11.3"
  },
  "devDependencies": {
    "nodemon": "^3.0.2",
    "jest": "^29.7.0"
  }
}
EOF

# Order service
cat > apps/order/package.json << EOF
{
  "name": "ahoy-order",
  "version": "1.0.0",
  "description": "Order Management Microservice for Ahoy",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0",
    "joi": "^17.11.0",
    "dotenv": "^16.3.1",
    "pg": "^8.11.3"
  },
  "devDependencies": {
    "nodemon": "^3.0.2",
    "jest": "^29.7.0"
  }
}
EOF

# Notification service
cat > apps/notification/package.json << EOF
{
  "name": "ahoy-notification",
  "version": "1.0.0",
  "description": "Notification Microservice for Ahoy",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0",
    "joi": "^17.11.0",
    "dotenv": "^16.3.1",
    "nodemailer": "^6.9.7"
  },
  "devDependencies": {
    "nodemon": "^3.0.2",
    "jest": "^29.7.0"
  }
}
EOF

echo "✅ Setup completed successfully!"
echo ""
echo "🎉 Your Ahoy Microservices project is ready!"
echo ""
echo "Next steps:"
echo "1. Start your Kubernetes cluster (e.g., minikube start)"
echo "2. Run: devspace dev"
echo "3. Access the application at http://localhost:3000"
echo ""
echo "For more information, see the README.md file." 