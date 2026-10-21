import React, { useState } from 'react';

export default function AssetForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Furniture');
  const [renderEngine, setRenderEngine] = useState('Corona');
  const [polygons, setPolygons] = useState('');
  const [price, setPrice] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    onAdd({
      title: title.trim(),
      category,
      renderEngine,
      polygons: Number(polygons) || 10000,
      price: Number(price) || 15,
      author: author.trim() || '3D_Artist',
      description: description.trim()
    }).finally(() => {
      setSubmitting(false);
      setTitle('');
      setPolygons('');
      setPrice('');
      setAuthor('');
      setDescription('');
    });
  };

  return (
    <form className="asset-form" onSubmit={handleSubmit}>
      <h3>Add New 3D Asset</h3>
      <div className="form-grid">
        <input
          type="text"
          placeholder="Asset Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Furniture">Furniture</option>
          <option value="Lighting">Lighting</option>
          <option value="Materials">Materials</option>
          <option value="Decor">Decor</option>
        </select>
        <select value={renderEngine} onChange={(e) => setRenderEngine(e.target.value)}>
          <option value="Corona">Corona</option>
          <option value="V-Ray">V-Ray</option>
          <option value="D5 Render">D5 Render</option>
        </select>
        <input
          type="number"
          placeholder="Polygons (e.g. 25000)"
          value={polygons}
          onChange={(e) => setPolygons(e.target.value)}
          min="1"
        />
        <input
          type="number"
          placeholder="Price ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
        />
        <input
          type="text"
          placeholder="Author / Studio"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <textarea
        placeholder="Description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
      />
      <button type="submit" disabled={submitting}>
        {submitting ? 'Creating...' : '+ Add Asset'}
      </button>
    </form>
  );
}