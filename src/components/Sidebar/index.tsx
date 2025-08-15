import { Drawer, List, ListItem, ListItemText, ListItemButton, Toolbar } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import ROUTES from '../../constants/routes';

import { resetNotesDb } from '../../db/notesDb';
import { getAllPhotos, resetPhotoDb } from '../../db/photoDb';
import { resetBlobDb } from '../../db/blobDb';
import styles from './index.module.scss';

const Sidebar = () => {
  const location = useLocation();

  const handleResetData = async () => {
    if (window.confirm('This will erase all app data changes. Continue?')) {
      await resetPhotoDb();
      const photos = await getAllPhotos();
      await resetBlobDb(photos);
      await resetNotesDb();
      alert('App data reset successfully!');
      window.location.reload();
    }
  };

  return (
    <Drawer variant="permanent" className={styles.sidebarDrawer}>
      <Toolbar />
      <List className={styles.list}>
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

        <ListItem className={styles.resetButton} disablePadding>
          <ListItemButton onClick={handleResetData}>
            <ListItemText primary="Reset Data" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
