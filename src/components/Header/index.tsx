import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import ROUTES from '../../constants/routes';

import styles from './index.module.scss';

const Header = () => {
  const location = useLocation();

  const pageName = useMemo(() => {
    const path = location.pathname;

    switch (path) {
      case ROUTES.default.path:
        return ROUTES.default.label;
      default:
        return '';
    }
  }, [location.pathname]);

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar className={styles.toolbar}>
        <Typography variant="h6" noWrap component="div">
          {pageName} Page
        </Typography>
        <IconButton color="inherit" edge="end">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
