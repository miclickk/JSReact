import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function RootLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="container">
      <nav className="nav">
        <NavLink to="/" className="nav-brand">
          StartupHub
        </NavLink>

        <div className="nav-links">
          <NavLink to="/" end>Главная</NavLink>
          <NavLink to="/items">Каталог</NavLink>
          <NavLink to="/dashboard">Дашборд</NavLink>
          <NavLink to="/about">О проекте</NavLink>
        </div>

        <div className="nav-actions">
          {user ? (
            <>
              <NavLink to="/profile" className="nav-profile-link">
                Профиль
              </NavLink>
              <button onClick={handleLogout} className="btn-danger">
                Выйти
              </button>
            </>
          ) : (
            <NavLink to="/login" className="btn-link">
              Войти
            </NavLink>
          )}
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}