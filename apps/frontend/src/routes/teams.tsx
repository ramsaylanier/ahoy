import { createFileRoute } from '@tanstack/react-router';
// @ts-expect-error TanStack Router type mismatch workaround
export const Route = createFileRoute('/teams')({
  component: Teams,
});

function Teams() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Teams</h2>
      <p>Manage your teams here.</p>
    </div>
  );
}
