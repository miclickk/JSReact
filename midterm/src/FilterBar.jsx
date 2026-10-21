import React from 'react';

export default function FilterBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  engine,
  onEngineChange,
  sortBy,
  onSortChange,
  onReset
}) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="All">All Categories</option>
        <option value="Furniture">Furniture</option>
        <option value="Lighting">Lighting</option>
        <option value="Materials">Materials</option>
        <option value="Decor">Decor</option>
      </select>

      <select value={engine} onChange={(e) => onEngineChange(e.target.value)}>
        <option value="All">All Engines</option>
        <option value="Corona">Corona</option>
        <option value="V-Ray">V-Ray</option>
        <option value="D5 Render">D5 Render</option>
      </select>

      <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
        <option value="newest">Sort: Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="poly-asc">Polygons: Low to High</option>
        <option value="poly-desc">Polygons: High to Low</option>
      </select>

      <button type="button" onClick={onReset} className="btn-secondary">
        Reset Filters
      </button>
    </div>
  );
}