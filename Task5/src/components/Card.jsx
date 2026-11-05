import { Link } from 'react-router-dom';

export default function Card({ item }) {
  return (
    <div className="card">
      <h3>{item.name}</h3>
      <p>Категория: {item.category}</p>
      <p>Цена: ${item.price}</p>
      <Link to={`/items/${item.id}`} style={{ color: 'blue', textDecoration: 'underline' }}>
        Подробнее
      </Link>
    </div>
  );
}