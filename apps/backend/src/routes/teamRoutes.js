const express = require('express');
const teamController = require('../controllers/teamController');

const router = express.Router();

// GET /api/teams - Get all teams
router.get('/', teamController.getAllTeams);

// GET /api/teams/stats - Get team statistics
router.get('/stats', teamController.getTeamStats);

// GET /api/teams/:id - Get team by ID
router.get('/:id', teamController.getTeamById);

// POST /api/teams - Create new team
router.post('/', teamController.createTeam);

// PUT /api/teams/:id - Update team
router.put('/:id', teamController.updateTeam);

// DELETE /api/teams/:id - Delete team
router.delete('/:id', teamController.deleteTeam);

module.exports = router; 