import { useState, useEffect } from 'react';
import { api } from './api';
import './App.css';

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedId, setSelectedId] = useState(null);
  const [details, setDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

  const [formData, setFormData] = useState({ title: '', description: '', priority: 'Normal', category: 'General' });
  const [isEditing, setIsEditing] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const loadItems = () => {
    setLoading(true);
    setError(null);
    api.getItems()
      .then(setItems)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    if (!selectedId) {
      setDetails(null);
      return;
    }

    let isMounted = true;
    setDetailsLoading(true);
    setDetailsError(null);
    setDetails(null);

    api.getItem(selectedId)
      .then(data => {
        if (isMounted) setDetails(data);
      })
      .catch(err => {
        if (isMounted) setDetailsError(err.message);
      })
      .finally(() => {
        if (isMounted) setDetailsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormLoading(true);
    const action = isEditing ? api.updateItem(selectedId, formData) : api.createItem(formData);

    action
      .then(() => {
        loadItems();
        setFormData({ title: '', description: '', priority: 'Normal', category: 'General' });
        setIsEditing(false);
        if (isEditing) setSelectedId(null);
      })
      .catch(err => alert(err.message))
      .finally(() => setFormLoading(false));
  };

  const handleDelete = (id) => {
    setLoading(true);
    api.deleteItem(id)
      .then(() => {
        loadItems();
        if (selectedId === id) setSelectedId(null);
      })
      .catch(err => alert(err.message))
      .finally(() => setLoading(false));
  };

  const handleToggleStatus = () => {
    const idToUpdate = selectedId;
    if (!idToUpdate) return;

    const newStatus = details.status === 'Available' ? 'Completed' : 'Available';
    setDetailsLoading(true);

    api.updateItem(idToUpdate, { status: newStatus })
      .then((updatedItem) => {
        if (selectedId === idToUpdate) {
          setDetails(updatedItem);
          loadItems();
        }
      })
      .catch(err => {
        if (selectedId === idToUpdate) {
          alert(err.message);
          setDetailsLoading(false);
        }
      });
  };

  const editItem = (item) => {
    setIsEditing(true);
    setSelectedId(item.id);
    setFormData({ title: item.title, description: item.description, priority: item.priority, category: item.category });
  };

  return (
    <div className="container">
      <div className="sidebar">
        <button onClick={loadItems} disabled={loading}>Reload List</button>
        {loading && <p>Loading items...</p>}
        {error && <p style={{color: 'red'}}>{error}</p>}
        {!loading && !error && items.length === 0 && <p>No items found.</p>}

        <ul>
          {items.map(item => (
            <li key={item.id}>
              <span onClick={() => setSelectedId(item.id)}>
                {item.title} ({item.status})
              </span>
              <button onClick={() => handleDelete(item.id)}>X</button>
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit}>
          <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Title" required />
          <input value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Description" required />
          <input value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})} placeholder="Priority" required />
          <input value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="Category" required />
          <button type="submit" disabled={formLoading}>{isEditing ? 'Update' : 'Create'}</button>
          {isEditing && <button type="button" onClick={() => { setIsEditing(false); setFormData({ title: '', description: '', priority: 'Normal', category: 'General' }); }}>Cancel</button>}
        </form>
      </div>

      <div className="main">
        {detailsLoading && <p>Loading details...</p>}
        {detailsError && <p style={{color: 'red'}}>{detailsError}</p>}
        {details && !detailsLoading && (
          <div className="card">
            <h2>{details.title}</h2>
            <p><strong>ID:</strong> {details.id}</p>
            <p><strong>Description:</strong> {details.description}</p>
            <p><strong>Status:</strong> {details.status}</p>
            <p><strong>Priority:</strong> {details.priority}</p>
            <p><strong>Category:</strong> {details.category}</p>
            <p><strong>Author:</strong> {details.author}</p>
            <p><strong>Created At:</strong> {new Date(details.createdAt).toLocaleString()}</p>
            <button onClick={handleToggleStatus} disabled={detailsLoading}>Toggle Status</button>
            <button onClick={() => editItem(details)}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
}