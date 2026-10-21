import React, { useState, useEffect } from 'react';
import { api } from './api';
import FilterBar from './FilterBar';
import AssetCard from './AssetCard';
import Pagination from './Pagination';
import AssetForm from './AssetForm';
import AssetDetails from './AssetDetails';
import './App.css';

const ITEMS_PER_PAGE = 12;

export default function App() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedId, setSelectedId] = useState(null);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [engine, setEngine] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  const loadAssets = (simulateError = false) => {
    setLoading(true);
    setError(null);
    api.getAssets(simulateError)
      .then((data) => setAssets(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAssets(false);
  }, []);

  const handleAddAsset = (newAssetData) => {
    return api.createAsset(newAssetData).then((created) => {
      setAssets((prev) => [created, ...prev]);
      setCurrentPage(1);
    });
  };

  const handleDeleteAsset = (id) => {
    api.deleteAsset(id).then(() => {
      setAssets((prev) => prev.filter((item) => item.id !== id));
      if (selectedId === id) setSelectedId(null);
    });
  };

  const handleAssetUpdated = (updatedItem) => {
    setAssets((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleResetFilters = () => {
    setSearch('');
    setCategory('All');
    setEngine('All');
    setSortBy('newest');
    setCurrentPage(1);
  };

  const filteredAssets = assets
    .filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
      const matchesCat = category === 'All' || item.category === category;
      const matchesEng = engine === 'All' || item.renderEngine === engine;
      return matchesSearch && matchesCat && matchesEng;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'poly-asc') return a.polygons - b.polygons;
      if (sortBy === 'poly-desc') return b.polygons - a.polygons;
      return 0;
    });

  const totalPages = Math.max(1, Math.ceil(filteredAssets.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedAssets = filteredAssets.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  return (
    <div className="app-container">
      <header className="app-header">
        <div>
          <h1>3D Asset Library</h1>
          <p>Total Assets: {assets.length} | Filtered: {filteredAssets.length}</p>
        </div>
        <div className="header-actions">
          <button onClick={() => loadAssets(false)}>Reload Data</button>
          <button onClick={() => loadAssets(true)} className="btn-secondary">
            Simulate Error
          </button>
        </div>
      </header>

      <AssetForm onAdd={handleAddAsset} />

      <FilterBar
        search={search}
        onSearchChange={(val) => { setSearch(val); setCurrentPage(1); }}
        category={category}
        onCategoryChange={(val) => { setCategory(val); setCurrentPage(1); }}
        engine={engine}
        onEngineChange={(val) => { setEngine(val); setCurrentPage(1); }}
        sortBy={sortBy}
        onSortChange={(val) => { setSortBy(val); setCurrentPage(1); }}
        onReset={handleResetFilters}
      />

      <div className="main-layout">
        <div className="list-section">
          {loading && <div className="status-box">Loading assets...</div>}
          {error && <div className="status-box error-text">{error}</div>}
          {!loading && !error && filteredAssets.length === 0 && (
            <div className="status-box">No assets match your criteria.</div>
          )}

          {!loading && !error && filteredAssets.length > 0 && (
            <>
              <div className="cards-grid">
                {paginatedAssets.map((asset) => (
                  <AssetCard
                    key={asset.id}
                    asset={asset}
                    isSelected={asset.id === selectedId}
                    onSelect={setSelectedId}
                    onDelete={handleDeleteAsset}
                  />
                ))}
              </div>
              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>

        <aside className="details-section">
          {selectedId ? (
            <AssetDetails
              key={selectedId}
              assetId={selectedId}
              onAssetUpdated={handleAssetUpdated}
            />
          ) : (
            <div className="details-placeholder">
              Select an asset from the list to inspect its details.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}