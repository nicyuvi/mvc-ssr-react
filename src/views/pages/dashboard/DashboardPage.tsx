import { Link } from 'react-router-dom';

export default function DashboardPage() {
  return (
    <>
      <h1>Dashboard Page</h1>
      <button>
        <Link to="/dashboard/settings">Settings Page Link</Link>
      </button>
    </>
  );
}
