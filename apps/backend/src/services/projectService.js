const pool = require('../config/database');

class ProjectService {
  // Get all projects with optional filtering
  async getAllProjects(filters = {}) {
    try {
      let query = 'SELECT * FROM projects';
      const params = [];
      let paramCount = 0;

      // Build WHERE clause based on filters
      const conditions = [];
      
      if (filters.status) {
        paramCount++;
        conditions.push(`status = $${paramCount}`);
        params.push(filters.status);
      }

      if (filters.priority) {
        paramCount++;
        conditions.push(`priority = $${paramCount}`);
        params.push(filters.priority);
      }

      if (filters.search) {
        paramCount++;
        conditions.push(`(name ILIKE $${paramCount} OR description ILIKE $${paramCount})`);
        params.push(`%${filters.search}%`);
      }

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }

      query += ' ORDER BY created_at DESC';

      const result = await pool.query(query, params);
      return result.rows;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  }

  // Get project by ID
  async getProjectById(id) {
    try {
      const query = 'SELECT * FROM projects WHERE id = $1';
      const result = await pool.query(query, [id]);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching project by ID:', error);
      throw error;
    }
  }

  // Create new project
  async createProject(projectData) {
    try {
      const {
        name,
        description,
        status,
        start_date,
        end_date,
        progress,
        team,
        budget,
        priority
      } = projectData;

      const query = `
        INSERT INTO projects (name, description, status, start_date, end_date, progress, team, budget, priority)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
      `;

      const values = [
        name,
        description,
        status,
        start_date,
        end_date,
        progress,
        JSON.stringify(team),
        budget,
        priority
      ];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  // Update project
  async updateProject(id, projectData) {
    try {
      const {
        name,
        description,
        status,
        start_date,
        end_date,
        progress,
        team,
        budget,
        priority
      } = projectData;

      const query = `
        UPDATE projects 
        SET name = $1, description = $2, status = $3, start_date = $4, 
            end_date = $5, progress = $6, team = $7, budget = $8, priority = $9,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $10
        RETURNING *
      `;

      const values = [
        name,
        description,
        status,
        start_date,
        end_date,
        progress,
        JSON.stringify(team),
        budget,
        priority,
        id
      ];

      const result = await pool.query(query, values);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return result.rows[0];
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  }

  // Delete project
  async deleteProject(id) {
    try {
      const query = 'DELETE FROM projects WHERE id = $1 RETURNING *';
      const result = await pool.query(query, [id]);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return result.rows[0];
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  }

  // Get project statistics
  async getProjectStats() {
    try {
      const query = `
        SELECT 
          COUNT(*) as total,
          COUNT(CASE WHEN status = 'active' THEN 1 END) as active,
          COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed,
          COUNT(CASE WHEN status = 'planning' THEN 1 END) as planning,
          SUM(budget) as total_budget,
          AVG(progress) as average_progress,
          COUNT(CASE WHEN priority = 'high' THEN 1 END) as high_priority,
          COUNT(CASE WHEN priority = 'medium' THEN 1 END) as medium_priority,
          COUNT(CASE WHEN priority = 'low' THEN 1 END) as low_priority
        FROM projects
      `;

      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching project stats:', error);
      throw error;
    }
  }
}

module.exports = new ProjectService(); 