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
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
          &times;
        </button>
        <img src={src} alt={alt} className={styles.modalImage} />
      </div>
    </div>
  );
};

export default PhotoMagnifier;
