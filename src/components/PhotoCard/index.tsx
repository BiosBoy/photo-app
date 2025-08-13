import { useState } from 'react';
import styles from './index.module.scss';
import { Photo } from '../../interfaces/photos';

const PhotoCard = ({ photo, isThumb }: { isThumb?: boolean; photo: Photo }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className={`${styles.photo} ${isThumb ? styles.thumbnail : ''}`}>
      {loading && <div className={styles.skeleton} />}

      <img
        src={`collection/${photo.fileName}.${photo.fileType}`}
        alt={photo.title}
        style={{ display: loading ? 'none' : 'block' }}
        onLoad={() => setLoading(false)}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = '/collection/fallback.png';
          setLoading(false);
        }}
      />
    </div>
  );
};

export default PhotoCard;
