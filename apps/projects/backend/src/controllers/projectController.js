const projectService = require('../services/projectService');

class ProjectController {
  // Get all projects
  async getAllProjects(req, res) {
    try {
      const filters = {
        status: req.query.status,
        priority: req.query.priority,
        search: req.query.search
      };

      const projects = await projectService.getAllProjects(filters);
      
      res.json({
        success: true,
        data: projects,
        total: projects.length
      });
    } catch (error) {
      console.error('Controller error - getAllProjects:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch projects',
        error: error.message
      });
    }
  }

  // Get project by ID
  async getProjectById(req, res) {
    try {
      const { id } = req.params;
      const project = await projectService.getProjectById(id);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }

      res.json({
        success: true,
        data: project
      });
    } catch (error) {
      console.error('Controller error - getProjectById:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch project',
        error: error.message
      });
    }
  }

  // Create new project
  async createProject(req, res) {
    try {
      const projectData = req.body;

      // Basic validation
      if (!projectData.name || !projectData.description) {
        return res.status(400).json({
          success: false,
          message: 'Name and description are required'
        });
      }

      const newProject = await projectService.createProject(projectData);

      res.status(201).json({
        success: true,
        message: 'Project created successfully',
        data: newProject
      });
    } catch (error) {
      console.error('Controller error - createProject:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create project',
        error: error.message
      });
    }
  }

  // Update project
  async updateProject(req, res) {
    try {
      const { id } = req.params;
      const projectData = req.body;

      const updatedProject = await projectService.updateProject(id, projectData);

      if (!updatedProject) {
        return res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }

      res.json({
        success: true,
        message: 'Project updated successfully',
        data: updatedProject
      });
    } catch (error) {
      console.error('Controller error - updateProject:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update project',
        error: error.message
      });
    }
  }

  // Delete project
  async deleteProject(req, res) {
    try {
      const { id } = req.params;
      const deletedProject = await projectService.deleteProject(id);

      if (!deletedProject) {
        return res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }

      res.json({
        success: true,
        message: 'Project deleted successfully',
        data: deletedProject
      });
    } catch (error) {
      console.error('Controller error - deleteProject:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete project',
        error: error.message
      });
    }
  }

  // Get project statistics
  async getProjectStats(req, res) {
    try {
      const stats = await projectService.getProjectStats();

      res.json({
        success: true,
        data: {
          total: parseInt(stats.total) || 0,
          active: parseInt(stats.active) || 0,
          completed: parseInt(stats.completed) || 0,
          planning: parseInt(stats.planning) || 0,
          totalBudget: parseFloat(stats.total_budget) || 0,
          averageProgress: Math.round(parseFloat(stats.average_progress) || 0),
          priorityStats: {
            high: parseInt(stats.high_priority) || 0,
            medium: parseInt(stats.medium_priority) || 0,
            low: parseInt(stats.low_priority) || 0
          }
        }
      });
    } catch (error) {
      console.error('Controller error - getProjectStats:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch project statistics',
        error: error.message
      });
    }
  }
}

module.exports = new ProjectController(); 