import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Team } from '@/services/teamService';
import { teamService } from '@/services/teamService';

interface CreateTeamFormProps {
  onSuccess?: (team: Team) => void;
  onCancel?: () => void;
}

export function CreateTeamForm({ onSuccess, onCancel }: CreateTeamFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Basic validation
      if (!formData.name.trim() || !formData.description.trim()) {
        throw new Error('Name and description are required');
      }

      const teamData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        members: [],
      };

      const newTeam = await teamService.createTeam(teamData);
      onSuccess?.(newTeam);

      // Reset form
      setFormData({
        name: '',
        description: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create team');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Team Name *
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter team name"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description *
        </label>
        <Input
          id="description"
          name="description"
          type="text"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter team description"
          required
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? 'Creating...' : 'Create Team'}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
