import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Box textAlign="center" mt={10}>
    <Typography variant="h2" gutterBottom>
      404
    </Typography>
    <Typography variant="h5" gutterBottom>
      Page Not Found
    </Typography>
    <Typography variant="body1" mb={4}>
      The page you're looking for doesn't exist.
    </Typography>
    <Button variant="contained" color="primary" component={Link} to="/">
      Go Home
    </Button>
  </Box>
);

export default NotFound;
