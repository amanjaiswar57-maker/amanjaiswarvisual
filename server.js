const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.jsx': 'text/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ogg': 'video/ogg'
};

// Case-insensitive file finder for Windows/cross-platform safety
function findActualFile(targetPath) {
  if (fs.existsSync(targetPath)) return targetPath;
  const dir = path.dirname(targetPath);
  const base = path.basename(targetPath).toLowerCase();
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.toLowerCase() === base) {
      return path.join(dir, file);
    }
  }
  return null;
}

const server = http.createServer((req, res) => {
  // CORS & headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Range, Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Parse URL
  let parsedUrl = req.url.split('?')[0];
  if (parsedUrl === '/') parsedUrl = '/index.html';
  
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(parsedUrl);
  } catch (e) {
    res.writeHead(400);
    res.end('Bad Request');
    return;
  }

  const requestedPath = path.join(PUBLIC_DIR, decodedPath.replace(/^\//, ''));
  const actualPath = findActualFile(requestedPath);

  if (!actualPath) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    return;
  }

  let stat;
  try {
    stat = fs.statSync(actualPath);
  } catch (e) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    return;
  }

  if (stat.isDirectory()) {
    const indexPath = findActualFile(path.join(actualPath, 'index.html'));
    if (indexPath) {
      stat = fs.statSync(indexPath);
    } else {
      res.writeHead(403);
      res.end('Directory listing forbidden');
      return;
    }
  }

  const ext = path.extname(actualPath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const totalSize = stat.size;

  // Handle HTTP Range request (CRITICAL FOR VIDEO PLAYBACK & SEEKING)
  const range = req.headers.range;

  if (range && (ext === '.mp4' || ext === '.webm' || ext === '.ogg')) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;

    if (start >= totalSize || end >= totalSize) {
      res.writeHead(416, {
        'Content-Range': `bytes */${totalSize}`,
        'Accept-Ranges': 'bytes'
      });
      res.end();
      return;
    }

    const chunkSize = (end - start) + 1;
    const stream = fs.createReadStream(actualPath, { start, end });

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${totalSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': contentType
    });

    stream.pipe(res);
    stream.on('error', () => {
      if (!res.writableEnded) res.end();
    });
  } else {
    // Normal request
    res.writeHead(200, {
      'Content-Length': totalSize,
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(actualPath);
    stream.pipe(res);
    stream.on('error', () => {
      if (!res.writableEnded) res.end();
    });
  }
});

server.listen(PORT, () => {
  console.log(`Video-optimized local server running at http://localhost:${PORT}`);
});
