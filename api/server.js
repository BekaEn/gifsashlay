const fs = require('fs');
const path = require('path');
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const ffmpeg = require('fluent-ffmpeg');
const util = require('util');


const ffmpegPath = '/opt/homebrew/bin/ffmpeg';
ffmpeg.setFfmpegPath(ffmpegPath);

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

const uploadsDir = path.join(__dirname, 'uploads');

const listJsonPaths = [
  path.join(__dirname, '../src/list.json'),

];


const srcAssetsDir = path.join(__dirname, '../src');
if (!fs.existsSync(srcAssetsDir)) {
  fs.mkdirSync(srcAssetsDir, { recursive: true });
}

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/uploads', express.static(uploadsDir, {
  setHeaders: (res, path) => {
    if (path.endsWith('.webm')) {
      res.setHeader('Content-Type', 'video/webm');
    }
  }
}));

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const gifPath = path.join(uploadsDir, req.file.originalname);
  const webmPath = path.join(uploadsDir, path.basename(req.file.originalname, path.extname(req.file.originalname)) + '.webm');

  if (!fs.existsSync(gifPath)) {
    return res.status(404).json({ message: 'Uploaded file not found' });
  }

  ffmpeg(gifPath)
    .output(webmPath)
    .on('end', async () => {
  
      await updateGifList();
      res.status(200).json({ message: 'File uploaded and converted successfully' });
    })
    .on('error', (err) => {

      res.status(500).json({ message: 'Failed to convert file', error: err.message });
    })
    .run();
});

app.get('/api/list.json', (req, res) => {
  const listPath = path.join(__dirname, '../list.json');
  if (fs.existsSync(listPath)) {
    res.sendFile(listPath);
  } else {
    res.status(404).json({ message: 'list.json not found' });
  }
});

app.get('/api/gifs', async (req, res) => {
  try {
    const files = await readdir(uploadsDir);
    const gifs = await Promise.all(files.filter(file => path.extname(file) === '.webm').map(async file => {
      const stats = await stat(path.join(uploadsDir, file));
      return {
        title: file.split('.')[0],
        src: `/api/uploads/${file}`,
        uploadDate: stats.mtime.toISOString()
      };
    }));
    res.status(200).json(gifs);
  } catch (err) {
   
    res.status(500).json({ message: 'Failed to retrieve files' });
  }
});

async function updateGifList() {
  try {
   
    const files = await readdir(uploadsDir);
  

    const gifs = await Promise.all(files.filter(file => path.extname(file) === '.webm').map(async file => {
      const filePath = path.join(uploadsDir, file);
    

      const stats = await stat(filePath);
      

      return {
        title: file.split('.')[0],
        src: `http://localhost:3000/api/uploads/${file}`,
        gifSrc: `https://gifsashlay.fun/api/uploads/${file.split('.')[0]}.gif`,
        uploadDate: stats.mtime.toISOString()
      };
    }));

   
    listJsonPaths.forEach(listJsonPath => {
      fs.writeFileSync(listJsonPath, JSON.stringify(gifs, null, 2));
     
    });


  } catch (err) {
 
  }
}

app.get('/api/gifsfetch', async (req, res) => {
  try {
    const title = req.query.title;
    if (!title) {
      return res.status(400).json({ message: 'Title query parameter is required' });
    }

    const files = await readdir(uploadsDir);
    const gif = files.filter(file => path.extname(file) === '.webm')
                     .map(file => {
                       const name = file.split('.')[0];
                       if (name === title) {
                         return {
                           title: name,
                           src: `http://localhost:3000/api/uploads/${file}`,
                           gifSrc: `https://gifsashlay.fun/api/uploads/${name}.gif`,
                           uploadDate: fs.statSync(path.join(uploadsDir, file)).mtime.toISOString()
                         };
                       }
                       return null;
                     })
                     .find(item => item !== null);

    if (gif) {
      res.status(200).json(gif);
    } else {
      res.status(404).json({ message: 'GIF not found' });
    }
  } catch (err) {
 
    res.status(500).json({ message: 'Failed to retrieve GIF' });
  }
});

// Call the update function (You can call it when necessary in your application)
updateGifList();

async function debugUpdateGifList() {
  await updateGifList();
 
}

debugUpdateGifList();

app.listen(3000, () => {
 
});
