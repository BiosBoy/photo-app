import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Chip,
  Box,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import { addPhoto } from '../../utils/photoDb';
import type { Photo } from '../../interfaces/photos';

type AddPhotoModalProps = {
  open: boolean;
  onClose: () => void;
  onPhotoAdded: (photo: Photo) => void;
};

const AddPhotoModal = ({ open, onClose, onPhotoAdded }: AddPhotoModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview(null);
    }
  };

  const handleAddTag = () => {
    if (!tagInput) {
      alert('Please add tag name first.');
      return;
    }
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = async () => {
    if (!file || !title.trim()) {
      alert('Please select an image and enter a title.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('photo', file);

      const uploadRes = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) throw new Error('Upload failed');

      const { savedFileName, fileType } = await uploadRes.json();

      const newPhoto: Photo = {
        id: uuidv4(),
        createDate: Date.now(),
        title: title.trim(),
        caption: caption.trim(),
        tags,
        fileName: savedFileName.replace(/\.[^/.]+$/, ''),
        fileType,
      };

      await addPhoto(newPhoto);

      setFile(null);
      setPreview(null);
      setTitle('');
      setCaption('');
      setTags([]);
      setTagInput('');

      onPhotoAdded(newPhoto);
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to save photo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Photo</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <Button variant="outlined" component="label">
            Select Image
            <input type="file" accept=".jpg,.jpeg,.png" hidden onChange={handleFileChange} />
          </Button>

          {preview && (
            <Box
              component="img"
              src={preview}
              alt="Preview"
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: 300,
                objectFit: 'cover',
                borderRadius: 1,
              }}
            />
          )}

          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />

          <TextField
            label="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            multiline
            rows={3}
            fullWidth
          />

          <Stack direction="row" spacing={1}>
            <TextField
              label="Add tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              fullWidth
            />
            <Button variant="contained" onClick={handleAddTag}>
              Add
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {tags.map((tag) => (
              <Chip key={tag} label={tag} onDelete={() => handleRemoveTag(tag)} sx={{ mb: 1 }} />
            ))}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPhotoModal;
