import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, CardContent, Typography, Box, Chip, Stack } from '@mui/material';

import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import FilterDropdown from '../../components/FilterDropdown';
import NothingFound from '../../components/NothingFound';

import photos from '../../data/photos';

import ROUTES from '../../constants/routes';
import useSearchPagination from '../../hooks/useSearchPagination';

const allTags = Array.from(new Set(photos.flatMap((p) => p.tags))).sort();

const PhotoList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get('tags')?.split(',') ?? []
  );

  // Filter by tags first
  const tagFiltered = useMemo(() => {
    if (!selectedTags.length) return photos;
    return photos.filter((p) => p.tags.some((t) => selectedTags.includes(t)));
  }, [selectedTags]);

  // Paginate + search by title (hook handles this)
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

  // Sync URL
  useEffect(() => {
    const params: Record<string, string> = {};
    if (searchQuery) params.search = searchQuery;
    if (currentPage > 1) params.page = String(currentPage);
    if (selectedTags.length) params.tags = selectedTags.join(',');
    setSearchParams(params);
  }, [searchQuery, currentPage, selectedTags, setSearchParams]);

  return (
    <div className="listWrap">
      <Typography variant="h4" gutterBottom>
        Photos
      </Typography>

      <Box display="flex" gap={2} mb={3}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search by title..." />
        <FilterDropdown
          label="Tags"
          options={allTags}
          value={selectedTags}
          onChange={setSelectedTags}
          getCountForOption={(tag) =>
            photos.filter((p) => p.tags.includes(tag)).length
          }
        />
      </Box>

      {!paginatedPhotos?.length ? (
        <NothingFound />
      ) : (
        paginatedPhotos
          // newest first
          .slice()
          .sort((a, b) => b.createDate - a.createDate)
          .map((photo) => (
            <Card key={photo.id} sx={{ my: 2 }}>
              <Link to={`/${photo.id}`}>
                <CardContent>
                  <Typography variant="h6">{photo.title}</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {photo.caption}
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
                    {new Date(photo.createDate).toLocaleDateString()}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {photo.tags.map((t) => (
                      <Chip key={t} label={t} size="small" />
                    ))}
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
    </div>
  );
};

export default PhotoList;