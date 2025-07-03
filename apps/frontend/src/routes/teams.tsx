import { createFileRoute } from '@tanstack/react-router';
import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../components/ui/sheet';
import { CreateTeamForm } from '../components/CreateTeamForm';
import { TeamCard } from '../components/TeamCard';
import type { Team } from '../services/teamService';
import { teamService } from '../services/teamService';

export const Route = createFileRoute('/teams')({
  component: Teams,
});

function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      setIsLoading(true);
      setError('');
      const filters: { status?: string; priority?: string; search?: string } =
        {};
      if (searchTerm) filters.search = searchTerm;
      if (statusFilter) filters.status = statusFilter;

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
    setIsCreateSheetOpen(false);
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadTeams();
  };

  const filteredTeams = teams.filter((team) => {
    if (
      searchTerm &&
      !team.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !team.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    if (statusFilter && team.status !== statusFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teams</h1>
          <p className="text-gray-600 mt-1">
            Manage your teams and their progress
          </p>
        </div>

        <Sheet open={isCreateSheetOpen} onOpenChange={setIsCreateSheetOpen}>
          <SheetTrigger asChild>
            <Button>Create Team</Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Create New Team</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <CreateTeamForm
                onSuccess={handleCreateTeam}
                onCancel={() => setIsCreateSheetOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <form onSubmit={handleSearch} className="flex gap-4 items-end">
          <div className="flex-1">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Search Teams
            </label>
            <Input
              id="search"
              type="text"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">All Statuses</option>
              <option value="planning">Planning</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <Button type="submit" variant="outline">
            Search
          </Button>

          {(searchTerm || statusFilter) && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('');
                loadTeams();
              }}
            >
              Clear
            </Button>
          )}
        </form>
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
      ) : filteredTeams.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">👥</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No teams found
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || statusFilter
              ? 'Try adjusting your search or filters'
              : 'Get started by creating your first team'}
          </p>
          {!searchTerm && !statusFilter && (
            <Button onClick={() => setIsCreateSheetOpen(true)}>
              Create Your First Team
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team) => (
            <TeamCard key={team.id} team={team} onDelete={handleDeleteTeam} />
          ))}
        </div>
      )}
    </div>
  );
}
