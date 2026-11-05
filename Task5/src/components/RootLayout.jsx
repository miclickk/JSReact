import { Outlet, Link } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> |{' '}
        <Link to="/items">Items</Link> | <Link to="/dashboard">Dashboard</Link> |{' '}
        <Link to="/login">Login</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}