import { useEffect } from 'react';
import { syncUnsyncedPhotos } from '../utils/syncPhotos';

export const usePhotoSync = () => {
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const startSync = () => {
      if (navigator.onLine) {
        syncUnsyncedPhotos();
      }
    };

    startSync();

    interval = setInterval(() => {
      if (navigator.onLine) {
        startSync();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);
};
