
import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      return setError("Пароли не совпадают!");
    }
    if (password.length < 6) {
      return setError("Пароль должен быть минимум 6 символов");
    }

    try {
      await signup(email, password);
      navigate("/profile");
    } catch (error) {
      setError("Ошибка регистрации: " + error.message);
    }
  };

  return (
    <div className="login-layout">
      <div className="login-left">
        <div className="form-container">
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Создать аккаунт</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Заполните форму для регистрации</p>

          {error && <div style={{ color: '#ef4444', marginBottom: '1rem', background: '#fee2e2', padding: '0.8rem', borderRadius: '8px' }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email адрес" onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} required />
            <input type="password" placeholder="Подтвердите пароль" onChange={(e) => setConfirmPassword(e.target.value)} required />
            <button type="submit">Зарегистрироваться</button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)' }}>
            Уже есть аккаунт? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Войти</Link>
          </p>
        </div>
      </div>
      <div className="login-right">
        <h1 style={{ fontSize: '3.5rem', margin: '0 0 1rem 0' }}>StartupHub</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '400px', lineHeight: '1.6' }}>Начните работу с платформой прямо сейчас.</p>
      </div>
    </div>
  );
}