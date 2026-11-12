import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/profile");
    } catch (error) {
      setError("Ошибка входа: проверьте email и пароль");
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate("/profile");
    } catch (error) {
      setError("Ошибка Google: " + error.message);
    }
  };

  return (
    <div className="login-layout">
      <div className="login-left">
        <div className="form-container">
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>С возвращением!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Введите данные для входа в систему</p>

          {error && <div style={{ color: '#ef4444', marginBottom: '1rem', background: '#fee2e2', padding: '0.8rem', borderRadius: '8px' }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email адрес" onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Войти</button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0', color: 'var(--text-muted)' }}>
            <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }}></div>
            <span style={{ padding: '0 1rem', fontSize: '0.9rem' }}>или</span>
            <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }}></div>
          </div>

          <button className="google-btn" type="button" onClick={handleGoogle}>
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width="20" />
            Продолжить с Google
          </button>

          <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)' }}>
            Нет аккаунта? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Создать</Link>
          </p>
        </div>
      </div>
      <div className="login-right">
        <h1 style={{ fontSize: '3.5rem', margin: '0 0 1rem 0' }}>StartupHub</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '400px', lineHeight: '1.6' }}>Единая платформа для управления задачами, проектами и командой.</p>
      </div>
    </div>
  );
}