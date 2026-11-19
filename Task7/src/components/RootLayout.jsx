import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export default function RootLayout() {
  const { user, logout } = useAuth();
  const isOnline = useOnlineStatus();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
    navigate('/login');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="container">
      <nav className="nav">
        <div className="nav-header">
          <NavLink to="/" className="nav-brand" onClick={closeMenu}>
            StartupHub
          </NavLink>

          <span className={`status-pill ${isOnline ? 'online' : 'offline'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>

          <button
            type="button"
            className="menu-toggle"
            aria-label="Открыть меню"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        <div className={`nav-collapsible ${menuOpen ? 'open' : ''}`}>
          <div className="nav-links">
            <NavLink to="/" end onClick={closeMenu}>Главная</NavLink>
            <NavLink to="/items" onClick={closeMenu}>Каталог</NavLink>
            <NavLink to="/dashboard" onClick={closeMenu}>Дашборд</NavLink>
            <NavLink to="/about" onClick={closeMenu}>О проекте</NavLink>
          </div>

          <div className="nav-actions">
            {user ? (
              <>
                <NavLink to="/profile" className="nav-profile-link" onClick={closeMenu}>
                  Профиль
                </NavLink>
                <button onClick={handleLogout} className="btn-danger">
                  Выйти
                </button>
              </>
            ) : (
              <NavLink to="/login" className="btn-link" onClick={closeMenu}>
                Войти
              </NavLink>
            )}
          </div>
        </div>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}