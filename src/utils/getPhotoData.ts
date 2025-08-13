import photos, { Photo } from '../data/photos';

export const getPhotoData = (): Photo[] => {
  return photos;
};

export const getPhotoById = (id: string): Photo | undefined => {
  return photos.find((p) => p.id === id);
};

export const getPhotosByTag = (tag: string): Photo[] => {
  return photos.filter((p) => p.tags.includes(tag));
};
