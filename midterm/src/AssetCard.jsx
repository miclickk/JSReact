import React from 'react';

export default function AssetCard({ asset, isSelected, onSelect, onDelete }) {
  return (
    <div className={`asset-card ${isSelected ? 'selected' : ''}`}>
      <div className="card-header">
        <h4>{asset.title}</h4>
        <span className={`badge ${asset.inScene ? 'in-scene' : ''}`}>
          {asset.inScene ? 'In Scene' : 'Library'}
        </span>
      </div>

      <p className="card-meta">
        {asset.category} • {asset.renderEngine}
      </p>
      <p className="card-stats">
        Polys: {asset.polygons.toLocaleString()} | <strong>${asset.price}</strong>
      </p>

      <div className="card-actions">
        <button onClick={() => onSelect(asset.id)}>Details</button>
        <button onClick={() => onDelete(asset.id)} className="btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
}