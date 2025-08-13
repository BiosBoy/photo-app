import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Container, Toolbar } from '@mui/material';

import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

import PhotoList from '../pages/PhotoList';
import PhotoDetail from '../pages/PhotoList/PhotoDetail';
import NotFound from '../pages/404';

import styles from './index.module.scss';

const App = () => (
  <Router>
    <Box className={styles.layout}>
      <Header />
      <Sidebar />
      <Box component="main" className={styles.mainContent}>
        <Toolbar />
        <Container>
          <Routes>
            <Route path="/" element={<PhotoList />}  />
            <Route path="/:id" element={<PhotoDetail />}  />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
        <Footer />
      </Box>
    </Box>
  </Router>
);

export default App;
