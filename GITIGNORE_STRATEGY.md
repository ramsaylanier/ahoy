# Gitignore Strategy for Ahoy Microservices

This document explains the gitignore strategy used in the Ahoy Microservices project.

## 🎯 Strategy: Root-Level with Service-Specific Overrides

### **Approach**
- **Primary**: Single comprehensive `.gitignore` in the root directory
- **Secondary**: Service-specific `.gitignore` files when needed for unique cases
- **Template**: `templates/service-gitignore-template` for reference

## 📁 File Structure

```
Ahoy/
├── .gitignore                    # Main gitignore (covers all services)
├── templates/
│   └── service-gitignore-template # Template for service-specific gitignore
├── apps/
│   ├── shell/                    # Angular application
│   ├── auth/                     # Node.js microservice
│   ├── user/                     # Node.js microservice
│   ├── product/                  # Node.js microservice
│   ├── order/                    # Node.js microservice
│   └── notification/             # Node.js microservice
└── charts/                       # Kubernetes Helm charts
```

## 🛠️ Root .gitignore Coverage

The root `.gitignore` covers all technologies used in the project:

### **Technologies Covered**
- ✅ **Node.js/NPM/Yarn** - All JavaScript/TypeScript services
- ✅ **Angular** - Frontend shell application
- ✅ **Docker** - Containerization
- ✅ **Kubernetes/Helm** - Orchestration and deployment
- ✅ **Devspace** - Development platform
- ✅ **Terraform** - Infrastructure as Code
- ✅ **Development Tools** - IDEs, editors, build tools
- ✅ **Security** - Secrets, keys, certificates
- ✅ **Logs & Cache** - Temporary files and build artifacts
- ✅ **Testing** - Coverage reports, test artifacts
- ✅ **Operating Systems** - macOS, Windows, Linux files

### **Key Patterns**
```bash
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*

# Build outputs
dist/
build/
.angular/

# Environment files
.env
.env.local
.env.production

# Secrets
*.secret.yaml
secrets/

# IDE files
.vscode/
.idea/

# Logs
*.log
logs/

# Cache
.cache/
.eslintcache
```

## 🔧 When to Use Service-Specific .gitignore

### **Use Service-Specific .gitignore When:**
- Service has unique file types not covered by root gitignore
- Service uses different technology stack
- Service has specific build artifacts
- Service has unique environment configurations

### **Example: Angular Service**
```bash
# apps/shell/.gitignore
# Angular-specific files
.angular/
src/environments/environment.prod.ts
src/environments/environment.staging.ts

# Angular build artifacts
dist/ahoy-shell/
```

### **Example: Node.js Service with Database**
```bash
# apps/auth/.gitignore
# Service-specific database files
*.sqlite
*.db

# Service-specific logs
auth.log
error.log

# Service-specific environment
.env.auth
```

## 📋 Best Practices

### **1. Start with Root .gitignore**
- Always use the root `.gitignore` as the primary source
- Only add service-specific rules when absolutely necessary

### **2. Keep Service-Specific Rules Minimal**
- Don't duplicate rules from root gitignore
- Only add unique patterns for that service
- Use comments to explain why the rule is needed

### **3. Regular Maintenance**
- Review gitignore files quarterly
- Remove obsolete patterns
- Update for new technologies

### **4. Security First**
- Never commit secrets or sensitive files
- Use environment variables for configuration
- Keep `.env.example` files for documentation

## 🚀 Usage Examples

### **Adding a New Service**
```bash
# 1. Check if root .gitignore covers the technology
# 2. If not, add patterns to root .gitignore
# 3. If service has unique needs, create service-specific .gitignore

# Example: Adding a Python service
echo "*.pyc" >> .gitignore
echo "__pycache__/" >> .gitignore
echo "venv/" >> .gitignore
```

### **Creating Service-Specific .gitignore**
```bash
# Copy template
cp templates/service-gitignore-template apps/new-service/.gitignore

# Customize for the service
echo "# Python-specific patterns" >> apps/new-service/.gitignore
echo "*.pyc" >> apps/new-service/.gitignore
echo "__pycache__/" >> apps/new-service/.gitignore
```

### **Checking What's Ignored**
```bash
# Check if a file is ignored
git check-ignore -v path/to/file

# List all ignored files
git status --ignored

# Show gitignore rules for a file
git check-ignore -v --stdin < <(find . -type f)
```

## 🔍 Troubleshooting

### **Common Issues**

#### **File Still Tracked After Adding to .gitignore**
```bash
# Remove from git tracking (but keep local file)
git rm --cached path/to/file

# Commit the change
git commit -m "Remove file from tracking"
```

#### **Service-Specific .gitignore Not Working**
```bash
# Check if root .gitignore is overriding
git check-ignore -v path/to/file

# Ensure service .gitignore is in correct location
ls -la apps/service-name/.gitignore
```

#### **Large Files in Repository**
```bash
# Find large files
git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | sed -n 's/^blob //p' | sort --numeric-sort --key=2 | tail -10

# Remove large files from history
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch path/to/large/file' --prune-empty --tag-name-filter cat -- --all
```

## 📚 References

- [Git Documentation - gitignore](https://git-scm.com/docs/gitignore)
- [GitHub .gitignore Templates](https://github.com/github/gitignore)
- [Node.js .gitignore Best Practices](https://docs.npmjs.com/cli/v8/using-npm/developers#keeping-files-out-of-your-package)
- [Angular .gitignore Guidelines](https://angular.io/guide/styleguide#gitignore)

## 🤝 Contributing

When adding new services or technologies:

1. **Check root .gitignore first** - Add patterns there if they apply to multiple services
2. **Use service-specific .gitignore sparingly** - Only for unique patterns
3. **Document changes** - Update this file when adding new patterns
4. **Test thoroughly** - Ensure files are properly ignored before committing

---

**Remember**: The goal is to keep the repository clean while minimizing maintenance overhead. Start simple and add complexity only when needed.
