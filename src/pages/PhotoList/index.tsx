import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Chip, Stack, Button } from '@mui/material';

import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import FilterDropdown from '../../components/FilterDropdown';
import AddPhotoModal from '../../components/AddPhotoModal';

import useSearchPagination from '../../hooks/useSearchPagination';
import { getAllPhotos } from '../../utils/photoDb';
import { Photo } from '../../interfaces/photos';

const PhotoList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [addOpen, setAddOpen] = useState(false);

  useEffect(() => {
    getAllPhotos().then(setPhotos);
  }, []);

  const allTags = useMemo(
    () => Array.from(new Set(photos.flatMap((p) => p.tags))).sort(),
    [photos]
  );

  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get('tags')?.split(',') ?? []
  );

  const tagFiltered = useMemo(() => {
    if (!selectedTags.length) {
      return photos;
    }
    return photos.filter((p) => p.tags.some((tag) => selectedTags.includes(tag)));
  }, [photos, selectedTags]);

  const loadPhotos = async () => {
    const allPhotos = await getAllPhotos();
    setPhotos(allPhotos.sort((a, b) => b.createDate - a.createDate));
  };

  const {
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData: paginatedPhotos,
  } = useSearchPagination({
    data: tagFiltered,
    searchKey: 'title',
  });

  useEffect(() => {
    const params: Record<string, string> = {};
    if (searchQuery) {
      params.search = searchQuery;
    }
    if (currentPage > 1) {
      params.page = String(currentPage);
    }
    if (selectedTags.length) {
      params.tags = selectedTags.join(',');
    }
    setSearchParams(params);
  }, [searchQuery, currentPage, selectedTags, setSearchParams]);

  const normalizedPhotos = useMemo(() => {
    return paginatedPhotos.slice().sort((a, b) => b.createDate - a.createDate);
  }, [paginatedPhotos]);

  return (
    <div className="listWrap">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" gutterBottom sx={{ mb: 0 }}>
          Photos
        </Typography>
        <Button variant="contained" onClick={() => setAddOpen(true)}>
          Add Photo
        </Button>
      </Box>
      <Box display="flex" gap={2} mb={3}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search by title..." />
        <FilterDropdown
          label="Tags"
          options={allTags}
          value={selectedTags}
          onChange={setSelectedTags}
          getCountForOption={(tag) => photos.filter((p) => p.tags.includes(tag)).length}
        />
      </Box>
      {!paginatedPhotos?.length ? (
        <Typography>No notes added yet.</Typography>
      ) : (
        normalizedPhotos.map((photo) => (
          <Card key={photo.id} sx={{ my: 2 }}>
            <Link to={`/${photo.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <CardContent>
                <Stack direction="row" spacing={2}>
                  <Box
                    component="img"
                    src={`collection/${photo.fileName}.${photo.fileType}`}
                    alt={photo.title}
                    sx={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 1 }}
                  />
                  <Box>
                    <Typography variant="h6">{photo.title}</Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      {photo.caption}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
                      {new Date(photo.createDate).toLocaleDateString()}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      {photo.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" />
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Link>
          </Card>
        ))
      )}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onChange={(_, page) => setCurrentPage(page)}
      />
      <AddPhotoModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onPhotoAdded={(photo) => {
          loadPhotos();
        }}
      />
    </div>
  );
};

export default PhotoList;
