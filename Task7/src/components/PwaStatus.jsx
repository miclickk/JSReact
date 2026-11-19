import { useRegisterSW } from 'virtual:pwa-register/react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export default function PwaStatus() {
  const isOnline = useOnlineStatus();
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  return (
    <div className="pwa-banners">
      {!isOnline && (
        <div className="offline-banner">
          <span>Офлайн-режим: показаны кэшированные данные</span>
        </div>
      )}

      {needRefresh && (
        <div className="update-banner">
          <span>Доступна новая версия приложения!</span>
          <div className="update-actions">
            <button onClick={() => updateServiceWorker(true)}>Обновить</button>
            <button className="btn-secondary" onClick={() => setNeedRefresh(false)}>
              Позже
            </button>
          </div>
        </div>
      )}
    </div>
  );
}