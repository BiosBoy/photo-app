import { Drawer, List, ListItem, ListItemText, ListItemButton, Toolbar } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import ROUTES from '../../constants/routes';

import styles from './index.module.scss';

const Sidebar = () => {
  const location = useLocation();

  return (
    <Drawer variant="permanent" className={styles.sidebarDrawer}>
      <Toolbar />
      <List>
        {Object.values(ROUTES).map((route) => {
          const isSelected =
            location.pathname === route.path || location.pathname.startsWith(`${route.path}/`);

          return (
            <ListItem key={route.path} disablePadding>
              <ListItemButton
                component={Link}
                to={route.path}
                selected={isSelected}
                className={styles.listItem}
              >
                {route.icon}
                <ListItemText primary={route.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
