const http = require('http');
const fs = require('fs');
const path = require('path');

const handleAssess = require('./api/assess.js');
const handleSaveResult = require('./api/save-result.js');
const handleLeaderboard = require('./api/leaderboard.js');

const PORT = 3001;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.json': 'application/json'
};

const server = http.createServer((req, res) => {
    const safeUrl = req.url.split('?')[0];

    // Định tuyến API giống như Vercel
    if (safeUrl === '/api/assess') {
        return handleAssess(req, res);
    }
    if (safeUrl === '/api/save-result') {
        return handleSaveResult(req, res);
    }
    if (safeUrl === '/api/leaderboard') {
        return handleLeaderboard(req, res);
    }

    // Serve file tĩnh ở local
    let filePath = path.join(__dirname, safeUrl === '/' ? 'index.html' : safeUrl);
    
    // Bảo vệ Directory Traversal
    if (!filePath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Truy cập bị cấm (Forbidden)');
        return;
    }

    const ext = path.extname(filePath).toLowerCase();

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>404 Không Tìm Thấy File</h1><p>Vui lòng kiểm tra lại đường dẫn.</p>', 'utf-8');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end(`Lỗi hệ thống: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 
                'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
                'Cache-Control': 'no-store, no-cache, must-revalidate, private' // Không cache ở local
            });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`===================================================`);
    console.log(`  MÁY CHỦ THI CÔ PHỎNG (LOCAL) ĐÃ KHỞI CHẠY THÀNH CÔNG!`);
    console.log(`  Địa chỉ truy cập local: http://localhost:${PORT}`);
    console.log(`===================================================`);
});
