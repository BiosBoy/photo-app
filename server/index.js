import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const server = express();

const collectionDir = path.join(process.cwd(), 'public', 'collection');
if (!fs.existsSync(collectionDir)) {
  fs.mkdirSync(collectionDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_, _, cb) => cb(null, collectionDir),
  filename: (_, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

server.post('/upload', upload.single('photo'), (req, res) => {
  const ext = path.extname(req.file.originalname).replace('.', '');
  res.json({
    savedFileName: req.file.filename,
    fileType: ext,
  });
});

const func = async () => {
  server.listen(5001);

  console.log('Server is Started. Port: ', 5001);
};

func();
