const DB_KEY = 'midterm_assets_db';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const generateInitialData = () => {
  const categories = ['Furniture', 'Lighting', 'Materials', 'Decor'];
  const engines = ['Corona', 'V-Ray', 'D5 Render'];
  const prefixes = ['Modern', 'Nordic', 'Industrial', 'Minimalist', 'Luxury', 'Vintage'];
  const nouns = ['Sofa', 'Pendant Lamp', 'Marble Shader', 'Oak Table', 'Armchair', 'Wall Panel', 'Vase', 'Spot Light', 'Velvet Fabric', 'Bookshelf'];

  const items = [];
  for (let i = 1; i <= 115; i++) {
    const category = categories[i % categories.length];
    const renderEngine = engines[i % engines.length];
    const prefix = prefixes[i % prefixes.length];
    const noun = nouns[i % nouns.length];

    items.push({
      id: String(i),
      title: `${prefix} ${noun} #${i}`,
      category,
      renderEngine,
      polygons: (i * 1450) % 90000 + 2000,
      price: (i * 7) % 120 + 10,
      inScene: i % 5 === 0,
      author: `Studio_${(i % 8) + 1}`,
      description: `High-quality 3D asset #${i} optimized for ${renderEngine}. Includes 4K PBR textures and clean topology for architectural visualization.`
    });
  }
  return items;
};

const getDb = () => {
  const raw = localStorage.getItem(DB_KEY);
  if (!raw) {
    const initial = generateInitialData();
    localStorage.setItem(DB_KEY, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(raw);
};

const saveDb = (data) => {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
};

export const api = {
  async getAssets(shouldFail = false) {
    await delay(450);
    if (shouldFail) throw new Error('Simulated server error while loading asset list.');
    return getDb();
  },

  async getAssetById(id) {
    await delay(500);
    const item = getDb().find((a) => a.id === id);
    if (!item) throw new Error('Asset not found.');
    return item;
  },

  async createAsset(newAsset) {
    await delay(400);
    const db = getDb();
    const created = {
      id: Date.now().toString(),
      title: newAsset.title,
      category: newAsset.category,
      renderEngine: newAsset.renderEngine,
      polygons: Number(newAsset.polygons) || 5000,
      price: Number(newAsset.price) || 0,
      inScene: false,
      author: newAsset.author || 'User_Artist',
      description: newAsset.description || 'Custom user-uploaded 3D asset.'
    };
    const updatedDb = [created, ...db];
    saveDb(updatedDb);
    return created;
  },

  async toggleSceneStatus(id) {
    await delay(400);
    const db = getDb();
    const idx = db.findIndex((a) => a.id === id);
    if (idx === -1) throw new Error('Asset not found.');
    db[idx] = { ...db[idx], inScene: !db[idx].inScene };
    saveDb(db);
    return db[idx];
  },

  async deleteAsset(id) {
    await delay(350);
    const db = getDb();
    const filtered = db.filter((a) => a.id !== id);
    saveDb(filtered);
    return id;
  }
};