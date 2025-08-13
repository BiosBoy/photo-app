import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import ROUTES from '../../constants/routes';

import styles from './index.module.scss';

const Footer = () => (
  <Box component="footer" className={styles.footer}>
    <Link
      to="https://www.linkedin.com/in/sviatoslav-kuzhelev-78797b104"
      className="underlineTextLink"
    >
      <Typography variant="body2" color="text.secondary">
        &copy; Sviatoslav Kuzhelev 2025. All rights reserved.
      </Typography>
    </Link>
  </Box>
);

export default Footer;
