import { Link, useParams } from 'react-router-dom';
import {
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  Box,
  Button,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';

import { getPhotoById } from '../../utils/photoDb';
import { addNote, getNotesByPhotoId, deleteNote, Note } from '../../utils/notesDb';
import { Photo } from '../../interfaces/photos';

import styles from './index.module.scss';

const PhotoDetail = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState<Photo | undefined>(undefined);
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteText, setNoteText] = useState('');

  // Fetch photo
  useEffect(() => {
    if (id) {
      getPhotoById(id).then(setPhoto);
    }
  }, [id]);

  // Fetch related notes
  useEffect(() => {
    if (id) {
      getNotesByPhotoId(id).then((res) => setNotes(res.sort((a, b) => b.timestamp - a.timestamp)));
    }
  }, [id]);

  const handleAddNote = async () => {
    if (!noteText.trim() || !id) return;
    const newNote = await addNote(id, noteText.trim());
    setNotes((prev) => [newNote, ...prev]);
    setNoteText('');
  };

  const handleDeleteNote = async (noteId: string) => {
    await deleteNote(noteId);
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
  };

  if (!photo) {
    return <Typography>Photo not found</Typography>;
  }

  return (
    <div className={styles.wrap}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" gutterBottom>
          {photo.title}
        </Typography>
        <Button component={Link} to="/" variant="outlined" size="small">
          Back to Photos
        </Button>
      </Box>

      <Card sx={{ my: 2 }}>
        <Box
          component="img"
          src={`collection/${photo.fileName}.${photo.fileType}`}
          alt={photo.title}
          sx={{ width: '100%', height: 'auto', maxHeight: 600, objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="body1" sx={{ mb: 1.5 }}>
            {photo.caption}
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
            Taken on {new Date(photo.createDate).toLocaleDateString()}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            {photo.tags.map((t) => (
              <Chip key={t} label={t} size="small" />
            ))}
          </Stack>

          {/* Notes Section */}
          <Typography variant="h6" gutterBottom>
            Notes
          </Typography>
          <Stack direction="row" spacing={1} mb={2}>
            <TextField
              fullWidth
              size="small"
              label="Add a note"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
            />
            <Button variant="contained" onClick={handleAddNote}>
              Add
            </Button>
          </Stack>

          {!notes?.length ? (
            <Typography>No notes added yet.</Typography>
          ) : (
            <List className={styles.notesList}>
              {notes.map((note) => (
                <ListItem
                  key={note.id}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => handleDeleteNote(note.id)}>
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={note.text}
                    secondary={new Date(note.timestamp).toLocaleString()}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PhotoDetail;
