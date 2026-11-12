import { useAuth } from "./AuthContext.jsx";
import { useQuery } from "@tanstack/react-query";

const fetchUserData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
  if (!res.ok) throw new Error("Ошибка загрузки");
  return res.json();
};

export default function Profile() {
  const { user } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userData"],
    queryFn: fetchUserData,
    staleTime: 60000,
  });

  return (
    <div className="glass-card">
      <h2>Добро пожаловать!</h2>
      <p>Ваш Email: {user?.email}</p>
      <p>Ваш UID: {user?.uid}</p>

      <hr style={{ margin: '2rem 0', borderColor: 'rgba(255,255,255,0.1)' }} />

      <h3>Кэшированные данные с сервера:</h3>
      {isLoading && <p>Загрузка данных...</p>}
      {isError && <p>Не удалось загрузить данные.</p>}
      {data && (
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px' }}>
          <p>Имя: {data.name}</p>
          <p>Сайт: {data.website}</p>
          <small>При переключении вкладок эти данные берутся из кэша, а не запрашиваются заново.</small>
        </div>
      )}
    </div>
  );
}