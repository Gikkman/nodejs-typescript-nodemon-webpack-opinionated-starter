import path from 'path'
import express from 'express';
import http from 'http';

import module from '@server/module';

const port = 7878;
const url = 'localhost';
const staticUrl = '/';
const staticDir = path.join('.', 'public');

const app = express();
const server = http.createServer(app);

// Start server
server.on('listening', () => console.log(`Server listening to ${url}:${port}`));
server.on('error', (err) => console.error(err));
server.listen(port, url);

// Config server
app.use(express.json());

app.get('/lol', (req, res) => {
    module();
    res.redirect('/');
});

app.use(staticUrl, express.static(staticDir));
