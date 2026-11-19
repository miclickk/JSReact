const MOCK_ITEMS = [
  {
    id: 1,
    name: 'Ноутбук MacBook Pro 14"',
    category: 'electronics',
    status: 'available',
    price: 1999,
    brand: 'Apple',
    rating: 4.9,
    stock: 7,
    description: 'Рабочая станция с экраном Liquid Retina XDR, автономностью до 18 часов и тихим охлаждением для разработки и 3D-графики.',
  },
  {
    id: 2,
    name: 'Эргономичное кресло Aeron',
    category: 'furniture',
    status: 'available',
    price: 1450,
    brand: 'Herman Miller',
    rating: 4.9,
    stock: 3,
    description: 'Культовое офисное кресло с дышащей сеткой Pellicle и точной поддержкой поясницы для долгих сессий за компьютером.',
  },
  {
    id: 3,
    name: 'Монитор UltraFine 27" 4K',
    category: 'electronics',
    status: 'available',
    price: 549,
    brand: 'LG',
    rating: 4.7,
    stock: 12,
    description: 'IPS-матрица с 99% sRGB, подключением по одному кабелю USB-C и зарядкой ноутбука до 90 Вт.',
  },
  {
    id: 4,
    name: 'Стол с электроприводом E7',
    category: 'furniture',
    status: 'available',
    price: 480,
    brand: 'FlexiSpot',
    rating: 4.8,
    stock: 8,
    description: 'Устойчивый стол с плавной регулировкой высоты для работы сидя и стоя, память на 4 положения и кабель-менеджмент.',
  },
  {
    id: 5,
    name: 'Механическая клавиатура Q1 Pro',
    category: 'electronics',
    status: 'available',
    price: 199,
    brand: 'Keychron',
    rating: 4.8,
    stock: 15,
    description: 'Беспроводная механика в цельном алюминиевом корпусе с поддержкой Hot-Swap и переключением между macOS и Windows.',
  },
  {
    id: 6,
    name: 'Наушники WH-1000XM5',
    category: 'electronics',
    status: 'out_of_stock',
    price: 349,
    brand: 'Sony',
    rating: 4.6,
    stock: 0,
    description: 'Полноразмерные наушники с адаптивным шумоподавлением и 8 микрофонами для чётких созвонов в шумном офисе.',
  },
  {
    id: 7,
    name: 'Мышь MX Master 3S',
    category: 'electronics',
    status: 'available',
    price: 99,
    brand: 'Logitech',
    rating: 4.9,
    stock: 24,
    description: 'Тихие клики, электромагнитное колесо прокрутки MagSpeed и сенсор 8000 DPI, работающий даже на стекле.',
  },
  {
    id: 8,
    name: 'Тумба под стол Alex',
    category: 'furniture',
    status: 'available',
    price: 110,
    brand: 'IKEA',
    rating: 4.4,
    stock: 19,
    description: 'Лаконичная тумба с 5 выдвижными ящиками на стопорах — удобно хранить гаджеты, кабели и документы.',
  },
  {
    id: 9,
    name: 'Видеокарта Dual RTX 4070 Super',
    category: 'electronics',
    status: 'available',
    price: 629,
    brand: 'ASUS',
    rating: 4.9,
    stock: 4,
    description: 'Тихая и холодная видеокарта с 12 ГБ GDDR6X для рендеринга, нейросетей и современных игр в 1440p.',
  },
  {
    id: 10,
    name: 'Стеллаж Loft L-180',
    category: 'furniture',
    status: 'available',
    price: 260,
    brand: 'LoftDesign',
    rating: 4.3,
    stock: 6,
    description: 'Металлический каркас с матовым покрытием и полки из дуба — подходит для зонирования рабочего пространства.',
  },
  {
    id: 11,
    name: 'Лампа на монитор ScreenBar Halo',
    category: 'electronics',
    status: 'available',
    price: 169,
    brand: 'BenQ',
    rating: 4.8,
    stock: 11,
    description: 'Асимметричный свет без бликов на экране, фоновая подсветка стены и беспроводная шайба-регулятор на стол.',
  },
  {
    id: 12,
    name: 'Веб-камера Facecam Mk.2',
    category: 'electronics',
    status: 'available',
    price: 149,
    brand: 'Elgato',
    rating: 3.9,
    stock: 9,
    description: 'Сенсор Sony STARVIS с записью 1080p 60 fps, ручными настройками экспозиции и встроенной шторкой приватности.',
  },
  {
    id: 13,
    name: 'Микрофон MV7+ Podcast',
    category: 'electronics',
    status: 'out_of_stock',
    price: 279,
    brand: 'Shure',
    rating: 4.5,
    stock: 0,
    description: 'Динамический USB-C/XLR микрофон с встроенным шумоподавлением — отсекает гул вентиляторов и клики клавиатуры.',
  },
  {
    id: 14,
    name: 'Диван для переговорной Nordic',
    category: 'furniture',
    status: 'available',
    price: 1190,
    brand: 'BoConcept',
    rating: 4.6,
    stock: 2,
    description: 'Минималистичный трёхместный диван с износостойкой тканью для лаунж-зоны и неформальных встреч команды.',
  },
  {
    id: 15,
    name: 'Кресло-мешок Beads Sofa',
    category: 'furniture',
    status: 'out_of_stock',
    price: 185,
    brand: 'Muji',
    rating: 3.8,
    stock: 0,
    description: 'Мягкое бескаркасное кресло с микрогранулами, которое подстраивается под форму тела во время отдыха.',
  },
  {
    id: 16,
    name: 'Алюминиевая подставка Curve',
    category: 'furniture',
    status: 'available',
    price: 65,
    brand: 'Twelve South',
    rating: 3.9,
    stock: 14,
    description: 'Поднимает ноутбук на уровень глаз, разгружая шею, и освобождает место на столе под внешнюю клавиатуру.',
  },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getItems({ search = '', category = '', status = '', sort = '', page = 1 } = {}) {
  await delay(150);

  let result = [...MOCK_ITEMS];

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }

  if (category) {
    result = result.filter((item) => item.category === category);
  }

  if (status) {
    result = result.filter((item) => item.status === status);
  }

  if (sort === 'asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === 'desc') {
    result.sort((a, b) => b.price - a.price);
  }

  const total = result.length;
  const perPage = 10;
  const start = (page - 1) * perPage;
  const data = result.slice(start, start + perPage);

  return { data, total };
}

export async function getItemById(id) {
  await delay(100);
  const item = MOCK_ITEMS.find((i) => String(i.id) === String(id));
  if (!item) {
    throw new Error('Товар не найден');
  }
  return item;
}

export async function getAllItemsForStats() {
  await delay(150);
  return [...MOCK_ITEMS];
}