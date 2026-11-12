import { useAuth } from "./AuthContext";
import { useQuery } from "@tanstack/react-query";

const fetchUserData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
  if (!res.ok) throw new Error("Ошибка загрузки");
  return res.json();
};

export default function Profile() {
  const { user, logout } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userData"],
    queryFn: fetchUserData,
    staleTime: 60000,
  });

  return (
    <div className="container">
      {/* Навигация теперь живет только внутри профиля */}
      <nav className="nav">
        <span style={{ fontWeight: '800', fontSize: '1.4rem', color: 'var(--primary)' }}>StartupHub</span>
        <button onClick={logout} style={{ width: 'auto', padding: '0.5rem 1.5rem', background: '#ef4444' }}>
          Выйти
        </button>
      </nav>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Настройки профиля</h2>
        <p style={{ color: 'var(--text-muted)' }}>Email: <span style={{ color: 'var(--text-main)' }}>{user?.email}</span></p>
        <p style={{ color: 'var(--text-muted)' }}>ID: <span style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>{user?.uid}</span></p>

        <hr style={{ margin: '2rem 0', borderColor: '#e5e7eb', borderTop: 'none' }} />

        <h3 style={{ marginBottom: '1rem' }}>Синхронизированные данные API</h3>
        {isLoading && <p style={{ color: 'var(--primary)' }}>Синхронизация...</p>}
        {isError && <p style={{ color: '#ef4444' }}>Сбой подключения.</p>}
        {data && (
          <div style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <p style={{ margin: '0 0 0.5rem 0' }}><strong>Сотрудник:</strong> {data.name}</p>
            <p style={{ margin: '0' }}><strong>Контакт:</strong> {data.website}</p>
          </div>
        )}
      </div>
    </div>
  );
}