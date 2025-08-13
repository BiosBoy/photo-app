import { Link, useParams } from 'react-router-dom';
import { Typography, Card, CardContent, Stack, Chip, Box, Button } from '@mui/material';

import photos from '../../data/photos';
import { useMemo } from 'react';

const PhotoDetail = () => {
  const { id } = useParams();

  const photo = useMemo(() => {
    return photos.find((p) => p.id === id || p.id.toString() === id);
  }, [photos, id]);

  if (!photo) {
    return <Typography>Photo not found</Typography>;
  }

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" gutterBottom>
          {photo.title}
        </Typography>

        <Button component={Link} to="/" variant="outlined" size="small">
          Back to Photos
        </Button>
      </Box>

      <Card sx={{ my: 2 }}>
        <CardContent>
          <Typography variant="body1" sx={{ mb: 1.5 }}>
            {photo.caption}
          </Typography>

          <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
            Taken on {new Date(photo.createDate).toLocaleDateString()}
          </Typography>

          <Stack direction="row" spacing={1}>
            {photo.tags.map((t) => (
              <Chip key={t} label={t} size="small" />
            ))}
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhotoDetail;
