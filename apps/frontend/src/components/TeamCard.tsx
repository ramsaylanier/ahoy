import React from 'react';
import type { Team } from '../services/teamService';

interface TeamCardProps {
  team: Team;
  onEdit?: (team: Team) => void;
  onDelete?: (team: Team) => void;
}

export function TeamCard({ team, onEdit, onDelete }: TeamCardProps) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {team.name}
          </h3>
          <p className="text-gray-600 text-sm">{team.description}</p>
        </div>
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(team)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(team)}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(team.status)}`}
          >
            {team.status || 'Unknown'}
          </span>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(team.priority)}`}
          >
            {team.priority || 'Unknown'} Priority
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Progress:</span>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${team.progress || 0}%` }}
                />
              </div>
              <span className="text-gray-700 font-medium">
                {team.progress || 0}%
              </span>
            </div>
          </div>

          {team.budget && (
            <div>
              <span className="text-gray-500">Budget:</span>
              <span className="text-gray-700 font-medium ml-1">
                ${team.budget.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {team.members && team.members.length > 0 && (
          <div>
            <span className="text-gray-500 text-sm">Members:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {team.members.slice(0, 3).map((member) => (
                <span
                  key={member.id}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                >
                  {member.name}
                </span>
              ))}
              {team.members.length > 3 && (
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                  +{team.members.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {team.created_at && (
          <div className="text-xs text-gray-400 pt-2 border-t">
            Created: {new Date(team.created_at).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
}
