import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Container, Toolbar } from '@mui/material';

import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

import PhotoList from '../pages/PhotoList';
import PhotoDetail from '../pages/PhotoList/PhotoDetail';
import Profile from '../pages/Profile';
import NotFound from '../pages/404';

import { getAllPhotos, seedPhotos } from '../db/photoDb';
import { seedBlobs } from '../db/blobDb';
import { usePhotoSync } from '../hooks/usePhotoSync';
import styles from './index.module.scss';

const App = () => {
  const [isAppReady, setAppReady] = useState(false);
  usePhotoSync();

  // initial data seeding
  useEffect(() => {
    const run = async () => {
      await seedPhotos();
      await seedBlobs(await getAllPhotos());

      setAppReady(true);
    };

    run();
  }, []);

  if (!isAppReady) {
    return null;
  }

  return (
    <Router>
      <Box className={styles.layout}>
        <Header />
        <Sidebar />
        <Box component="main" className={styles.mainContent}>
          <Toolbar />
          <Container className={styles.container}>
            <Routes>
              <Route path="/" element={<PhotoList />} />
              <Route path="/:id" element={<PhotoDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
          <Footer />
        </Box>
      </Box>
    </Router>
  );
};

export default App;
