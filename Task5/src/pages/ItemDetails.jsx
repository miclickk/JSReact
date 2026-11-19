import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getItemById } from '../services/service';

export default function ItemDetails() {
  const { k } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getItemById(k)
      .then(res => setItem(res))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [k]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="card" style={{ maxWidth: '600px' }}>
      <h2>{item.name}</h2>
      <ul>
        <li><strong>ID:</strong> {item.id}</li>
        <li><strong>Категория:</strong> {item.category}</li>
        <li><strong>Статус:</strong> {item.status === 'available' ? 'В наличии' : 'Нет в наличии'}</li>
        <li><strong>Цена:</strong> ${item.price}</li>
        <li><strong>Бренд:</strong> {item.brand}</li>
        <li><strong>Рейтинг:</strong> {item.rating} / 5</li>
        <li><strong>Остаток:</strong> {item.stock} шт.</li>
      </ul>
      <p>{item.description}</p>

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => window.history.back()} style={{ marginRight: '10px' }}>Назад</button>
        <Link to="/items"><button>Все товары</button></Link>
      </div>
    </div>
  );
}