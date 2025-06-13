const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const folderPath = path.join(__dirname, 'files');

if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;
  const pathname = parsedUrl.pathname;

  const fileName = query.filename;
  const filePath = path.join(folderPath, fileName || '');

  if (pathname === '/create') {
    if (!fileName) {
      res.end('Filename is required!');
      return;
    }
    fs.writeFile(filePath, 'This is a sample file.', (err) => {
      if (err) {
        res.end('Error creating file.');
      } else {
        res.end('File created successfully.');
      }
    });
  } else if (pathname === '/read') {
    if (!fileName) {
      res.end('Filename is required!');
      return;
    }
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        res.end('Error reading file.');
      } else {
        res.end(`File content:\n${data}`);
      }
    });
  } else if (pathname === '/delete') {
    if (!fileName) {
      res.end('Filename is required!');
      return;
    }
    fs.unlink(filePath, (err) => {
      if (err) {
        res.end('Error deleting file.');
      } else {
        res.end('File deleted successfully.');
      }
    });
  } else {
    res.end('Invalid Route. Use /create, /read, or /delete.');
  }
});

server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
