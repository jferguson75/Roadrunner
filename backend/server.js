import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5005;

// API routes
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the Node.js server!' });
});

// --- Production Only: Serve Static Frontend ---
// In production, the backend server is responsible for serving the built React app
if (process.env.NODE_ENV === 'production') {
  // The production build of the frontend will be in ../frontend/dist
  const staticFilesPath = path.join(__dirname, '../frontend/dist');
  
  app.use(express.static(staticFilesPath));

  // "Catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(staticFilesPath, 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Node.js backend listening at http://localhost:${port}`);
  if (process.env.NODE_ENV === 'production') {
    console.log('Serving static files from ../frontend/dist');
  }
});
