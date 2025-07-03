const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

class TeamService {
  // Get all teams with optional filtering
  async getAllTeams(filters = {}) {
    try {
      const where = {};
      if (filters.status) where.status = filters.status;
      if (filters.priority) where.priority = filters.priority;
      if (filters.search) {
        where.OR = [
          { name: { contains: filters.search, mode: 'insensitive' } },
          { description: { contains: filters.search, mode: 'insensitive' } }
        ];
      }
      const teams = await prisma.team.findMany({
        where,
        orderBy: { id: 'desc' },
        include: { users: true, projects: true }
      });
      return teams;
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw error;
    }
  }

  // Get team by ID
  async getTeamById(id) {
    try {
      const team = await prisma.team.findUnique({
        where: { id: Number(id) },
        include: { users: true, projects: true }
      });
      return team;
    } catch (error) {
      console.error('Error fetching team by ID:', error);
      throw error;
    }
  }

  // Create new team
  async createTeam(teamData) {
    try {
      const { name, description, userIds = [] } = teamData;
      const team = await prisma.team.create({
        data: {
          name,
          description,
          users: { connect: userIds.map(id => ({ id })) }
        },
        include: { users: true, projects: true }
      });
      return team;
    } catch (error) {
      console.error('Error creating team:', error);
      throw error;
    }
  }

  // Update team
  async updateTeam(id, teamData) {
    try {
      const { name, userIds } = teamData;
      const data = {};
      if (name) data.name = name;
      if (userIds) data.users = { set: userIds.map(id => ({ id })) };
      const team = await prisma.team.update({
        where: { id: Number(id) },
        data,
        include: { users: true, projects: true }
      });
      return team;
    } catch (error) {
      console.error('Error updating team:', error);
      throw error;
    }
  }

  // Delete team
  async deleteTeam(id) {
    try {
      const team = await prisma.team.delete({
        where: { id: Number(id) },
        include: { users: true, projects: true }
      });
      return team;
    } catch (error) {
      console.error('Error deleting team:', error);
      throw error;
    }
  }

  // Get team statistics
  async getTeamStats() {
    try {
      const total = await prisma.team.count();
      // Add more stats as needed using Prisma aggregations
      return { total };
    } catch (error) {
      console.error('Error fetching team stats:', error);
      throw error;
    }
  }
}

module.exports = new TeamService(); 