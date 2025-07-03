# Ahoy Projects Backend

A Node.js/Express backend API for managing projects with PostgreSQL database.

## Features

- RESTful API for project management
- PostgreSQL database integration
- CRUD operations for projects
- Project statistics and filtering
- CORS enabled for frontend integration
- Error handling and logging

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env` file in the root directory:

   ```env
   PORT=3002
   NODE_ENV=development
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=ahoy_projects
   DB_PASSWORD=your_password
   DB_PORT=5432
   ```

3. **Set up PostgreSQL database:**

   ```bash
   # Create database
   createdb ahoy_projects

   # Run initialization script
   psql -d ahoy_projects -f src/config/init-db.sql
   ```

4. **Start the server:**

   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Statistics

- `GET /api/projects/stats` - Get project statistics

### Health Check

- `GET /health` - Server health status

## Query Parameters

### Filtering Projects

- `status` - Filter by project status (planning, active, completed, on-hold)
- `priority` - Filter by priority (low, medium, high)
- `search` - Search in project name and description

### Examples

```bash
# Get active projects
GET /api/projects?status=active

# Get high priority projects
GET /api/projects?priority=high

# Search for projects containing "dashboard"
GET /api/projects?search=dashboard

# Combine filters
GET /api/projects?status=active&priority=high&search=dashboard
```

## Project Data Structure

```json
{
  "id": 1,
  "name": "Project Name",
  "description": "Project description",
  "status": "active",
  "start_date": "2024-01-15",
  "end_date": "2024-06-30",
  "progress": 85,
  "team": ["John Doe", "Jane Smith"],
  "budget": 50000,
  "priority": "high",
  "created_at": "2024-01-15T10:00:00Z",
  "updated_at": "2024-01-15T10:00:00Z"
}
```

## Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": {...},
  "message": "Optional message"
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error (development only)"
}
```

## Development

The project uses a layered architecture:

- **Controllers** (`src/controllers/`) - Handle HTTP requests and responses
- **Services** (`src/services/`) - Business logic and database operations
- **Routes** (`src/routes/`) - API route definitions
- **Config** (`src/config/`) - Database and configuration files

## Database Schema

The `projects` table includes:

- `id` - Primary key
- `name` - Project name (required)
- `description` - Project description
- `status` - Project status (planning, active, completed, on-hold)
- `start_date` - Project start date
- `end_date` - Project end date
- `progress` - Progress percentage (0-100)
- `team` - Team members (JSON array)
- `budget` - Project budget
- `priority` - Priority level (low, medium, high)
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp
