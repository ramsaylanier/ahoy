import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CreateTeamForm } from '@/components/teams/CreateTeamForm';
import { TeamCard } from '@/components/teams/TeamCard';
import type { Team } from '@/services/teamService';
import { teamService } from '@/services/teamService';

export const TeamsView = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      setIsLoading(true);
      setError('');
      const filters: { status?: string; priority?: string; search?: string } =
        {};

      const teamsData = await teamService.getAllTeams(filters);
      setTeams(teamsData);
    } catch (err) {
      setError('Failed to load teams');
      console.error('Error loading teams:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTeam = async (newTeam: Team) => {
    setTeams((prev) => [newTeam, ...prev]);
    setIsDialogOpen(false);
  };

  const handleDeleteTeam = async (team: Team) => {
    if (!team.id) return;

    if (!confirm(`Are you sure you want to delete "${team.name}"?`)) {
      return;
    }

    try {
      await teamService.deleteTeam(team.id);
      setTeams((prev) => prev.filter((t) => t.id !== team.id));
    } catch (err) {
      alert('Failed to delete team');
      console.error('Error deleting team:', err);
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teams</h1>
          <p className="text-gray-600 mt-1">
            Manage your teams and their progress
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsDialogOpen(true)}>Create Team</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
            </DialogHeader>
            <div className="mt-6">
              <CreateTeamForm
                onSuccess={handleCreateTeam}
                onCancel={() => setIsDialogOpen(false)}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* Teams Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : teams.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">👥</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No teams found
          </h3>
          <p className="text-gray-600 mb-4">
            Get started by creating your first team
          </p>
          <Button onClick={() => setIsDialogOpen(true)}>Create Team</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} onDelete={handleDeleteTeam} />
          ))}
        </div>
      )}
    </div>
  );
};
