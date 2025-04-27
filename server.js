const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Use environment variable for port or default to 8080
const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
    // Parse URL and sanitize path
    const parsedUrl = url.parse(req.url);
    let filePath = '.' + parsedUrl.pathname;
    
    // Normalize the path to prevent directory traversal attacks
    filePath = path.normalize(filePath);
    if (filePath === '.' || filePath === './') {
        filePath = './index.html'; // Default to index.html
    }

    // Check if the path exists and if it's a directory or file
    fs.stat(filePath, (err, stats) => {
        if (err) {
            // Handle case where file doesn't exist
            if (err.code === 'ENOENT') {
                // Check if the request is for favicon.ico
                if (parsedUrl.pathname === '/favicon.ico') {
                    res.writeHead(204); // No content
                    res.end();
                    return;
                }
                
                console.log(`File not found: ${filePath}`);
                fs.readFile('./index.html', (error, indexContent) => {
                    if (error) {
                        res.writeHead(500);
                        res.end('Server Error');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(indexContent, 'utf-8');
                    }
                });
            } else {
                console.error(`Server error: ${err}`);
                res.writeHead(500);
                res.end('Server Error');
            }
            return;
        }

        // Check if it's a directory
        if (stats.isDirectory()) {
            // Redirect to index.html in that directory if it exists
            const indexPath = path.join(filePath, 'index.html');
            fs.access(indexPath, fs.constants.F_OK, (err) => {
                if (err) {
                    res.writeHead(302, { 'Location': '/' });
                    res.end();
                } else {
                    fs.readFile(indexPath, (err, content) => {
                        if (err) {
                            res.writeHead(500);
                            res.end('Server Error');
                        } else {
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.end(content, 'utf-8');
                        }
                    });
                }
            });
            return;
        }

        // Handle file request
        const extname = String(path.extname(filePath)).toLowerCase();
        const mimeTypes = {
            '.html': 'text/html',
            '.js': 'application/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.wav': 'audio/wav',
            '.mp4': 'video/mp4',
            '.woff': 'application/font-woff',
            '.ttf': 'application/font-ttf',
            '.eot': 'application/vnd.ms-fontobject',
            '.otf': 'application/font-otf',
            '.wasm': 'application/wasm'
        };

        const contentType = mimeTypes[extname] || 'application/octet-stream';

        // Add security headers
        const headers = {
            'Content-Type': contentType,
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'X-XSS-Protection': '1; mode=block'
        };

        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    console.log(`File not found: ${filePath}`);
                    fs.readFile('./index.html', (error, indexContent) => {
                        if (error) {
                            res.writeHead(500);
                            res.end('Server Error');
                        } else {
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.end(indexContent, 'utf-8');
                        }
                    });
                } else {
                    console.error(`Server error: ${err}`);
                    res.writeHead(500);
                    res.end('Server Error');
                }
            } else {
                res.writeHead(200, headers);
                res.end(content, 'utf-8');
            }
        });
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

// Handle server shutdown gracefully
process.on('SIGTERM', () => {
    console.log('Shutting down server...');
    server.close(() => {
        console.log('Server shut down.');
        process.exit(0);
    });
});