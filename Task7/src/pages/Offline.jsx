import { useNavigate } from 'react-router-dom';

export default function Offline() {
  const navigate = useNavigate();

  const handleRetry = () => {
    if (navigator.onLine) {
      navigate('/');
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="card" style={{ maxWidth: '480px', margin: '2rem auto', textAlign: 'center' }}>
      <h2 style={{ color: 'var(--primary-hover)' }}>Вы сейчас офлайн</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
        Нет соединения с интернетом. Ранее открытые страницы и кэшированные данные остаются доступны.
      </p>
      <button onClick={handleRetry}>Повторить подключение</button>
    </div>
  );
}