import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';

import styles from './index.module.scss';

import { getAllPhotos } from '../../utils/photoDb';
import { Photo } from '../../interfaces/photos';

type User = {
  firstName: string;
  lastName: string;
  location: string;
  bio: string;
};

const currentUser: User = {
  firstName: 'Chuck',
  lastName: 'Noris',
  location: 'Texas, USA',
  bio: 'Passionate about pictures sharing with others.',
};

const Profile = () => {
  const { firstName, lastName, location, bio } = currentUser;
  const initials = `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();

  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    // Load photo history from IndexedDB (seeded on first run)
    getAllPhotos().then(setPhotos);
  }, []);

  // Newest first, based on createDate (seeded "date added")
  const history = useMemo(
    () => photos.slice().sort((a, b) => b.createDate - a.createDate),
    [photos]
  );

  return (
    <Box className={styles.mainContent}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ width: 64, height: 64, fontSize: 24 }}>{initials}</Avatar>
            <Box>
              <Typography variant="h6">
                {firstName} {lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {location}
              </Typography>
            </Box>
          </Stack>

          <Typography variant="body1" sx={{ mt: 2 }}>
            {bio}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>
        Photo History
      </Typography>

      <Card>
        <CardContent sx={{ p: 0 }}>
          {history.length === 0 ? (
            <Box p={2}>
              <Typography variant="body2" color="text.secondary">
                No photos yet. Seed the data to see history.
              </Typography>
            </Box>
          ) : (
            <List className={styles.historyList}>
              {history.map((p, idx) => (
                <Box key={p.id}>
                  <ListItem disablePadding>
                    <ListItemButton component={Link} to={`/${p.id}`}>
                      <ListItemText
                        primary={p.title}
                        secondary={new Date(p.createDate).toLocaleString()}
                      />
                    </ListItemButton>
                  </ListItem>
                  {idx < history.length - 1 && <Divider component="li" />}
                </Box>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
