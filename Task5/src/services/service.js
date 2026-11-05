const mockData = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `Товар ${i + 1}`,
  category: i % 2 === 0 ? 'electronics' : 'furniture',
  status: i % 3 === 0 ? 'out_of_stock' : 'available',
  price: (i + 1) * 100,
  brand: i % 2 === 0 ? 'TechCorp' : 'WoodInc',
  rating: (Math.random() * 5).toFixed(1),
  stock: i % 3 === 0 ? 0 : i * 5,
  description: `Детальное описание для товара ${i + 1}. Очень полезный предмет.`
}));

export const getItems = async ({ search, category, status, sort, page, limit = 10 }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...mockData];
      if (search) filtered = filtered.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
      if (category) filtered = filtered.filter(item => item.category === category);
      if (status) filtered = filtered.filter(item => item.status === status);
      
      if (sort === 'asc') filtered.sort((a, b) => a.price - b.price);
      if (sort === 'desc') filtered.sort((a, b) => b.price - a.price);

      const startIndex = (page - 1) * limit;
      const paginated = filtered.slice(startIndex, startIndex + limit);
      
      resolve({ data: paginated, total: filtered.length });
    }, 500);
  });
};

export const getItemById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const item = mockData.find(i => i.id === parseInt(id));
      item ? resolve(item) : reject(new Error('Элемент не найден'));
    }, 500);
  });
};

export const getAllItemsForStats = async () => {
  return new Promise(resolve => setTimeout(() => resolve(mockData), 300));
};