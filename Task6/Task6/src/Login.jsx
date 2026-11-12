import { useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      navigate("/profile");
    } catch (error) {
      alert("Ошибка: " + error.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate("/profile");
    } catch (error) {
      alert("Ошибка Google: " + error.message);
    }
  };

  return (
    <div className="glass-card">
      <h2>{isLogin ? "Вход" : "Регистрация"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">{isLogin ? "Войти" : "Создать аккаунт"}</button>
      </form>
      <button className="google-btn" type="button" onClick={handleGoogle}>Войти через Google</button>

      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: 'pointer', textAlign: 'center', marginTop: '1rem' }}>
        {isLogin ? "Нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти"}
      </p>
    </div>
  );
}