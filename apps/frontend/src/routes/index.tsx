import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Welcome Home!</h2>
      <p>This is the home page. Use the navigation above to explore the app.</p>
    </div>
  );
}
