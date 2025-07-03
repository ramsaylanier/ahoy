import { createFileRoute } from '@tanstack/react-router';
import { TeamsView } from '@/components/teams/TeamsView';

export const Route = createFileRoute('/teams')({
  component: TeamsView,
});
