import { useEffect, useState } from 'react';
import { getAllItemsForStats } from '../services/service';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [filterCat, setFilterCat] = useState('');

  useEffect(() => {
    getAllItemsForStats().then(setData);
  }, []);

  const filteredData = filterCat ? data.filter(i => i.category === filterCat) : data;

  const totalItems = filteredData.length;
  const avgPrice = totalItems ? (filteredData.reduce((acc, i) => acc + i.price, 0) / totalItems).toFixed(2) : 0;
  const outOfStock = filteredData.filter(i => i.status === 'out_of_stock').length;
  const topRated = filteredData.filter(i => i.rating > 4).length;

  const electronicsCount = data.filter(i => i.category === 'electronics').length;
  const furnitureCount = data.filter(i => i.category === 'furniture').length;

  return (
    <div>
      <h2>Дашборд аналитики</h2>

      <div className="controls">
        <label>Фильтр статистики по категории: </label>
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)}>
          <option value="">Все</option>
          <option value="electronics">Электроника</option>
          <option value="furniture">Мебель</option>
        </select>
      </div>

      <div className="dashboard-grid">
        <div className="stat-box">Всего товаров: <strong>{totalItems}</strong></div>
        <div className="stat-box">Средняя цена: <strong>${avgPrice}</strong></div>
        <div className="stat-box">Нет в наличии: <strong>{outOfStock}</strong></div>
        <div className="stat-box">Высокий рейтинг (&gt;4): <strong>{topRated}</strong></div>
      </div>

      <div style={{marginTop: '20px'}} className="dashboard-grid">
        <div className="card">
          <h3>Разбивка по категориям (Общая)</h3>
          <p>Электроника: {electronicsCount}</p>
          <p>Мебель: {furnitureCount}</p>
        </div>
      </div>
    </div>
  );
}