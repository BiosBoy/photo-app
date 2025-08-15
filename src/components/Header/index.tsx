import { AppBar, Toolbar, Typography, IconButton, Tooltip } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useMemo, useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import CloudDoneIcon from '@mui/icons-material/CloudDone';

import ROUTES from '../../constants/routes';
import styles from './index.module.scss';

const Header = () => {
  const location = useLocation();
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const pageName = useMemo(() => {
    const path = location.pathname;

    if (path.startsWith('/profile')) {
      return 'Profile';
    }

    switch (path) {
      case ROUTES.default.path:
        return ROUTES.default.label;
      default:
        return 'Photo';
    }
  }, [location.pathname]);

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar className={styles.toolbar}>
        <Typography variant="h6" noWrap component="div">
          {pageName} Page
        </Typography>
        <div className={styles.rightIcons}>
          <Tooltip title={isOnline ? 'Online' : 'Offline'}>
            {isOnline ? (
              <CloudDoneIcon className={styles.statusIconOnline} />
            ) : (
              <CloudOffIcon className={styles.statusIconOffline} />
            )}
          </Tooltip>
          <IconButton color="inherit" edge="end">
            <Link to="/profile" className={styles.link}>
              <AccountCircleIcon />
            </Link>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
