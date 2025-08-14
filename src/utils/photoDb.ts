import { deleteDB, openDB } from 'idb';
import dump from '../seeds/photos';
import { Photo } from '../interfaces/photos';

const DB_NAME = 'photoMetaDB';
const STORE_NAME = 'photos';
const DB_VERSION = 1;

export const initPhotoDb = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('createDate', 'createDate');
      }
    },
  });

  return db;
};

export const getAllPhotos = async (): Promise<Photo[]> => {
  const db = await initPhotoDb();

  return await db.getAll(STORE_NAME);
};

export const getPhotoById = async (id: string): Promise<Photo | undefined> => {
  const db = await initPhotoDb();

  return await db.get(STORE_NAME, id);
};

export const addPhoto = async (photo: Photo) => {
  const db = await initPhotoDb();

  await db.put(STORE_NAME, photo);
};

export const deletePhoto = async (id: string) => {
  const db = await initPhotoDb();

  await db.delete(STORE_NAME, id);
};

export const resetPhotoDb = async () => {
  await deleteDB(DB_NAME);
  await seedPhotos();
};

export const seedPhotos = async () => {
  const db = await initPhotoDb();
  const count = await db.count(STORE_NAME);

  if (count === 0) {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    for (const photo of dump) {
      await tx.store.put(photo);
    }
    await tx.done;
  }

  return db;
};
