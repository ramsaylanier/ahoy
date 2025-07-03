import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/profile')({
  component: Profile,
});

function Profile() {
  return (
    <div style={{ padding: 24 }}>
      <h2>User Profile</h2>
      <p>View and edit your profile information here.</p>
    </div>
  );
}
