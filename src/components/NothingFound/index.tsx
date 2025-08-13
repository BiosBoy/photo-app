import { Typography } from '@mui/material';

import styles from './index.module.scss';

const NothingFound = () => {
  return (
    <Typography className={styles.wrap}>No records have been found, try another search.</Typography>
  );
};

export default NothingFound;
