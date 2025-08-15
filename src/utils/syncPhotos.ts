import { getAllPhotos, updatePhoto } from '../db/photoDb';
import { getBlobById } from '../db/blobDb';

export const syncUnsyncedPhotos = async () => {
  try {
    const allPhotos = await getAllPhotos();
    const unsynced = allPhotos.filter((p) => !p.synced);

    for (const photo of unsynced) {
      const blob = await getBlobById(photo.id);
      if (!blob) continue;

      const formData = new FormData();
      formData.append('id', photo.id);
      formData.append('photo', blob, `${photo.fileName}.${photo.fileType}`);

      try {
        const res = await fetch('/upload', {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          await updatePhoto({ ...photo, synced: true });
          console.log(`Synced photo ${photo.id} to server`);
        } else {
          console.warn(`Failed to sync photo ${photo.id}`);
        }
      } catch (err) {
        console.error(`Error syncing photo ${photo.id}`, err);
      }
    }
  } catch (err) {
    console.error('Error during sync:', err);
  }
};
