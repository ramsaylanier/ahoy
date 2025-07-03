import type { Team } from '@/services/teamService';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/card';

interface TeamCardProps {
  team: Team;
  onEdit?: (team: Team) => void;
  onDelete?: (team: Team) => void;
}

export function TeamCard({ team, onEdit, onDelete }: TeamCardProps) {
  return (
    <Card className="border-gray-200 p-6 hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row justify-between items-start mb-4 px-0">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {team.name}
          </h3>
          <p className="text-gray-600 text-sm">{team.description}</p>
        </div>
        {onEdit && (
          <button
            onClick={() => onEdit(team)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Edit
          </button>
        )}
      </CardHeader>
      <CardContent className="space-y-3 px-0">
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
      </CardContent>
      {onDelete && (
        <CardFooter className="justify-end px-0 pt-4">
          <button
            onClick={() => onDelete(team)}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Delete
          </button>
        </CardFooter>
      )}
    </Card>
  );
}
