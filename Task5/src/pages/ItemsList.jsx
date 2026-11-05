import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getItems } from '../services/service';
import Card from '../components/Card';

export default function ItemsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const status = searchParams.get('status') || '';
  const sort = searchParams.get('sort') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    setLoading(true);
    getItems({ search: q, category, status, sort, page }).then(res => {
      setItems(res.data);
      setTotal(res.total);
      setLoading(false);
    });
  }, [q, category, status, sort, page]);

  // Обновление URL параметров
  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    value ? params.set(key, value) : params.delete(key);
    if (key !== 'page') params.set('page', '1'); // сброс пагинации при фильтрации
    setSearchParams(params);
  };

  return (
    <div>
      <h2>Каталог товаров</h2>

      <div className="controls">
        <input placeholder="Поиск..." value={q} onChange={e => updateParam('q', e.target.value)} />

        <select value={category} onChange={e => updateParam('category', e.target.value)}>
          <option value="">Все категории</option>
          <option value="electronics">Электроника</option>
          <option value="furniture">Мебель</option>
        </select>

        <select value={status} onChange={e => updateParam('status', e.target.value)}>
          <option value="">Все статусы</option>
          <option value="available">В наличии</option>
          <option value="out_of_stock">Нет в наличии</option>
        </select>

        <select value={sort} onChange={e => updateParam('sort', e.target.value)}>
          <option value="">Без сортировки</option>
          <option value="asc">Сначала дешевые</option>
          <option value="desc">Сначала дорогие</option>
        </select>
      </div>

      {loading ? <p>Загрузка...</p> : (
        <>
          {items.length === 0 ? <p>Ничего не найдено.</p> : (
            <div className="card-grid">
              {items.map(item => <Card key={item.id} item={item} />)}
            </div>
          )}

          <div style={{ marginTop: '20px' }}>
            <button disabled={page === 1} onClick={() => updateParam('page', page - 1)}>Назад</button>
            <span style={{ margin: '0 15px' }}>Страница {page}</span>
            <button disabled={items.length < 10 || page * 10 >= total} onClick={() => updateParam('page', page + 1)}>Вперед</button>
          </div>
        </>
      )}
    </div>
  );
}