import { useEffect } from 'react';
import styles from './index.module.scss';

const PhotoMagnifier = ({
  isOpen,
  src,
  alt,
  onClose,
}: {
  isOpen: boolean;
  src?: string;
  alt?: string;
  onClose: () => void;
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <img src={src} alt={alt} className={styles.modalImage} />
      </div>
      <button className={styles.closeButton} onClick={onClose} aria-label="Close">
        &times;
      </button>
    </div>
  );
};

export default PhotoMagnifier;
