const teamService = require('../services/teamService');

class TeamController {
  // Get all teams
  async getAllTeams(req, res) {
    try {
      const filters = {
        status: req.query.status,
        priority: req.query.priority,
        search: req.query.search
      };

      const teams = await teamService.getAllTeams(filters);
      
      res.json({
        success: true,
        data: teams,
        total: teams.length
      });
    } catch (error) {
      console.error('Controller error - getAllTeams:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch teams',
        error: error.message
      });
    }
  }

  // Get team by ID
  async getTeamById(req, res) {
    try {
      const { id } = req.params;
      const team = await teamService.getTeamById(id);

      if (!team) {
        return res.status(404).json({
          success: false,
          message: 'Team not found'
        });
      }

      res.json({
        success: true,
        data: team
      });
    } catch (error) {
      console.error('Controller error - getTeamById:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch team',
        error: error.message
      });
    }
  }

  // Create new team
  async createTeam(req, res) {
    try {
      const teamData = req.body;

      // Basic validation
      if (!teamData.name || !teamData.description) {
        return res.status(400).json({
          success: false,
          message: 'Name and description are required'
        });
      }

      const newTeam = await teamService.createTeam(teamData);

      res.status(201).json({
        success: true,
        message: 'Team created successfully',
        data: newTeam
      });
    } catch (error) {
      console.error('Controller error - createTeam:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create team',
        error: error.message
      });
    }
  }

  // Update team
  async updateTeam(req, res) {
    try {
      const { id } = req.params;
      const teamData = req.body;

      const updatedTeam = await teamService.updateTeam(id, teamData);

      if (!updatedTeam) {
        return res.status(404).json({
          success: false,
          message: 'Team not found'
        });
      }

      res.json({
        success: true,
        message: 'Team updated successfully',
        data: updatedTeam
      });
    } catch (error) {
      console.error('Controller error - updateTeam:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update team',
        error: error.message
      });
    }
  }

  // Delete team
  async deleteTeam(req, res) {
    try {
      const { id } = req.params;
      const deletedTeam = await teamService.deleteTeam(id);

      if (!deletedTeam) {
        return res.status(404).json({
          success: false,
          message: 'Team not found'
        });
      }

      res.json({
        success: true,
        message: 'Team deleted successfully',
        data: deletedTeam
      });
    } catch (error) {
      console.error('Controller error - deleteTeam:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete team',
        error: error.message
      });
    }
  }

  // Get team statistics
  async getTeamStats(req, res) {
    try {
      const stats = await teamService.getTeamStats();

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
      console.error('Controller error - getTeamStats:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch team statistics',
        error: error.message
      });
    }
  }
}

module.exports = new TeamController(); 