import React, { useState, useEffect } from 'react';
import { api } from './api';

export default function AssetDetails({ assetId, onAssetUpdated }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [localNote, setLocalNote] = useState('');

  useEffect(() => {
    if (!assetId) return;

    let ignore = false;
    setLoading(true);
    setError(null);

    api.getAssetById(assetId)
      .then((data) => {
        if (!ignore) setDetails(data);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [assetId]);

  const handleToggleScene = () => {
    if (!details || updating) return;
    const targetId = details.id;
    setUpdating(true);

    api.toggleSceneStatus(targetId)
      .then((updated) => {
        setDetails((prev) => (prev && prev.id === targetId ? updated : prev));
        onAssetUpdated(updated);
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  if (loading) return <div className="details-panel">Loading details...</div>;
  if (error) return <div className="details-panel error-text">Error: {error}</div>;
  if (!details) return null;

  return (
    <div className="details-panel">
      <h3>{details.title}</h3>
      <p><strong>ID:</strong> {details.id}</p>
      <p><strong>Category:</strong> {details.category}</p>
      <p><strong>Render Engine:</strong> {details.renderEngine}</p>
      <p><strong>Polygon Count:</strong> {details.polygons.toLocaleString()}</p>
      <p><strong>Price:</strong> ${details.price}</p>
      <p><strong>Author:</strong> {details.author}</p>
      <p><strong>Status:</strong> {details.inScene ? 'Active in Scene' : 'Not in Scene'}</p>
      <p><strong>Description:</strong> {details.description}</p>

      <button onClick={handleToggleScene} disabled={updating}>
        {updating
          ? 'Updating...'
          : details.inScene
          ? 'Remove from Scene'
          : 'Add to Scene'}
      </button>

      <div className="note-box">
        <label>Quick Session Note (resets when switching asset):</label>
        <input
          type="text"
          placeholder="Type a note for this asset..."
          value={localNote}
          onChange={(e) => setLocalNote(e.target.value)}
        />
      </div>
    </div>
  );
}