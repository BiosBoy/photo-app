import { deleteDB, openDB } from 'idb';
import { v4 as uuidv4 } from 'uuid';

export type Note = {
  id: string;
  photoId: string;
  timestamp: number;
  text: string;
};

const DB_NAME = 'notesDB';
const STORE_NAME = 'notes';
const DB_VERSION = 1;

const initNotesDb = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('photoId', 'photoId');
      }
    },
  });
};

export const addNote = async (photoId: string, text: string) => {
  const db = await initNotesDb();
  const note: Note = {
    id: uuidv4(),
    photoId,
    timestamp: Date.now(),
    text,
  };
  await db.put(STORE_NAME, note);
  return note;
};

export const getNotesByPhotoId = async (photoId: string): Promise<Note[]> => {
  const db = await initNotesDb();
  const index = db.transaction(STORE_NAME).store.index('photoId');
  return (await index.getAll(photoId)) as Note[];
};

export const deleteNote = async (id: string) => {
  const db = await initNotesDb();
  await db.delete(STORE_NAME, id);
};

export const resetNotesDb = async () => {
  await deleteDB(DB_NAME);
};

export const deleteNotesByPhotoId = async (photoId: string) => {
  const db = await initNotesDb();
  const index = db.transaction(STORE_NAME, 'readwrite').store.index('photoId');
  const relatedNotes = await index.getAll(photoId);
  for (const note of relatedNotes) {
    await db.delete(STORE_NAME, note.id);
  }
};
