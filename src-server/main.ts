import path from 'path'
import express from 'express';
import http from 'http';

import moduleA from '@server/module-A';
import moduleB from '@server/module-A';

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

function print(s: string) {
    console.log(s);
}

app.get('/', (req, res, next) => {
    let a = moduleA();
    print(a);
    
    let b = moduleB();
    print(b);

    next();
});

app.use(staticUrl, express.static(staticDir));
