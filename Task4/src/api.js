const DELAY = 800;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getStorage = () => JSON.parse(localStorage.getItem('items')) || [];
const setStorage = (data) => localStorage.setItem('items', JSON.stringify(data));

export const api = {
  getItems: async () => {
    await delay(DELAY);
    if (Math.random() < 0.1) throw new Error('Ошибка сети при загрузке списка');
    return getStorage().map(item => ({ id: item.id, title: item.title, status: item.status }));
  },

  getItem: async (id) => {
    await delay(DELAY);
    const item = getStorage().find(i => i.id === id);
    if (!item) throw new Error('Элемент не найден');
    return item;
  },

  createItem: async (item) => {
    await delay(DELAY);
    const items = getStorage();
    const newItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'Available',
      author: 'Admin',
      priority: item.priority || 'Normal',
      category: item.category || 'General',
      views: 0
    };
    setStorage([...items, newItem]);
    return newItem;
  },

  updateItem: async (id, updates) => {
    await delay(DELAY);
    let items = getStorage();
    let updatedItem = null;
    items = items.map(i => {
      if (i.id === id) {
         updatedItem = { ...i, ...updates };
         return updatedItem;
      }
      return i;
    });
    setStorage(items);
    return updatedItem;
  },

  deleteItem: async (id) => {
    await delay(DELAY);
    const items = getStorage();
    setStorage(items.filter(i => i.id !== id));
    return id;
  }
};