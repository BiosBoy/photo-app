import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const collectionDir = path.join(process.cwd(), 'public', 'collection');
if (!fs.existsSync(collectionDir)) {
  fs.mkdirSync(collectionDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, collectionDir),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

const app = express();

app.post('/upload', upload.single('photo'), (req, res) => {
  const ext = path.extname(req.file.originalname).replace('.', '');
  res.json({
    savedFileName: req.file.filename,
    fileType: ext,
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
