// TODO: rework this simple demo-based server

import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const server = express();

const PORT = 5001;
const collectionDir = path.join(process.cwd(), 'public', 'collection');
const distDir = path.join(process.cwd(), 'dist');

const HEADERS_FIRST = 'Origin, Accept, X-Requested-With, Content-Type';
const HEADERS_SECOND = 'Access-Control-Request-Method, Access-Control-Request-Headers';

if (!fs.existsSync(collectionDir)) {
  fs.mkdirSync(collectionDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, collectionDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const id = req.body.id;

    cb(null, `${id}${ext}`);
  },
});

const upload = multer({ storage });

server
  .set('trust proxy', 1)
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', `${HEADERS_FIRST}, ${HEADERS_SECOND}`);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    next();
  })
  .use('/collection', express.static(path.join(process.cwd(), './public/collection')));

server.post('/upload', upload.single('photo'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({ ok: true });
});

if (fs.existsSync(distDir)) {
  server.use(express.static(distDir));

  server.get(/.*/, (_, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

server.listen(PORT, () => {
  console.log(`Server is Started. Port: ${PORT}`);
});
