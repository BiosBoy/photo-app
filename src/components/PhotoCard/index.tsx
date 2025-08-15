import { useState } from 'react';
import { Photo } from '../../interfaces/photos';
import styles from './index.module.scss';

const PhotoCard = ({
  photo,
  isThumb,
  src,
  onClick,
}: {
  isThumb?: boolean;
  photo?: Photo;
  src?: string;
  onClick?: () => void;
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <div
      className={`${styles.photo} ${isThumb ? styles.thumbnail : ''}`}
      onClick={onClick}
      tabIndex={0}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      aria-label={`magnify ${photo?.title} image`}
    >
      {loading && <div className={styles.skeleton} />}

      <img
        src={src}
        alt={photo?.title}
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
