import { Outlet, Link } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div>
      <header>
        <h1>My App</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
