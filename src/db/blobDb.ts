import { deleteDB, openDB } from 'idb';
import { Photo } from '../interfaces/photos';

const DB_NAME = 'blobDB';
const STORE_NAME = 'blobs';

export const initBlobDb = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });

  return db;
};

export const addBlob = async (id: string, blob: Blob) => {
  const db = await initBlobDb();
  await db.put(STORE_NAME, { id, blob });
};

export const getBlob = async (id: string): Promise<Blob | undefined> => {
  const db = await initBlobDb();
  const entry = await db.get(STORE_NAME, id);
  return entry?.blob;
};

export const deleteBlob = async (id: string) => {
  const db = await initBlobDb();
  await db.delete(STORE_NAME, id);
};

export const getBlobById = async (id: string): Promise<Blob | undefined> => {
  const db = await initBlobDb();

  const entry = await db.get(STORE_NAME, id);
  return entry?.blob;
};

export const resetBlobDb = async (photos: Photo[]) => {
  await deleteDB(DB_NAME);
  await seedBlobs(photos);
};

export const seedBlobs = async (photos: Photo[]) => {
  const db = await initBlobDb();
  const count = await db.count(STORE_NAME);

  if (count === 0) {
    console.log('Blob store empty. Seeding from public/collection...');
    for (const p of photos) {
      const url = `/collection/${p.id}.${p.fileType}`;
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch ${url}`);
        const blob = await res.blob();
        await addBlob(p.id, blob);
        console.log(`Seeded blob for ${p.id}`);
      } catch (err) {
        console.error(`Error seeding blob for ${p.id}:`, err);
      }
    }

    console.log('Seeding complete.');
  } else {
    console.log(`Blob store already has ${count} entries. Skipping seeding.`);
  }
};
