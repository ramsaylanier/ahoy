import { createFileRoute } from '@tanstack/react-router';
// @ts-expect-error TanStack Router type mismatch workaround
export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Dashboard</h2>
      <p>Welcome to your dashboard!</p>
    </div>
  );
}
