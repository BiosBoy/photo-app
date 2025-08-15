import { Link, useNavigate, useParams } from 'react-router-dom';
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

import { getPhotoById, deletePhoto } from '../../db/photoDb';
import {
  addNote,
  getNotesByPhotoId,
  deleteNote,
  deleteNotesByPhotoId,
  Note,
} from '../../db/notesDb';
import { Photo } from '../../interfaces/photos';

import PhotoCard from '../../components/PhotoCard';
import { deleteBlob, getBlobById } from '../../db/blobDb';
import PhotoMagnifier from '../../components/PhotoMagnifier';
import styles from './index.module.scss';

const PhotoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isOpen, setIsModalOpen] = useState(false);

  const [photo, setPhoto] = useState<Photo | undefined>(undefined);
  const [photoSrc, setPhotoSrc] = useState<string | undefined>(undefined);
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    const run = async () => {
      let src = '';

      if (id) {
        const photo = await getPhotoById(id);

        if (photo?.id) {
          const photoBlob = await getBlobById(photo.id);

          if (photoBlob) {
            src = URL.createObjectURL(photoBlob);
          }
        }

        setPhoto(photo);
        setPhotoSrc(src);
      }

      return () => {
        if (src) {
          URL.revokeObjectURL(src);
        }
      };
    };

    run();
  }, [id]);

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

  const handleDeletePhoto = async () => {
    if (!id) return;
    if (!window.confirm('Are you sure you want to delete this photo and all related notes?')) {
      return;
    }

    await deleteNotesByPhotoId(id);
    await deletePhoto(id);
    await deleteBlob(id);

    navigate('/');
  };

  return (
    <div className={styles.wrap}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" gutterBottom>
          {photo?.title}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button component={Link} to="/" variant="outlined" size="small">
            Back to Photos
          </Button>
          <Button variant="outlined" color="error" size="small" onClick={handleDeletePhoto}>
            Delete Photo
          </Button>
        </Stack>
      </Box>

      <Card sx={{ my: 2 }}>
        <PhotoCard photo={photo} src={photoSrc} onClick={() => setIsModalOpen(true)} />
        <CardContent>
          <Typography variant="body1" sx={{ mb: 1.5 }}>
            {photo?.caption}
          </Typography>
          {photo?.createDate && (
            <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
              Taken on {new Date(photo?.createDate).toLocaleDateString()}
            </Typography>
          )}
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            {photo?.tags.map((t) => (
              <Chip key={t} label={t} size="small" />
            ))}
          </Stack>

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
      <PhotoMagnifier
        onClose={() => setIsModalOpen(false)}
        isOpen={isOpen}
        src={photoSrc}
        alt={photo?.title}
      />
    </div>
  );
};

export default PhotoDetail;
