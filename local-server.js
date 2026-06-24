process.env.IS_LOCAL = 'true';

const http = require('http');
const fs = require('fs');
const path = require('path');

const handleAssess = require('./api/assess.js');
const handleSaveResult = require('./api/save-result.js');
const handleLeaderboard = require('./api/leaderboard.js');
const handleRegisterTeacher = require('./api/register-teacher.js');
const handleTeacherTimeStats = require('./api/teacher-time-stats.js');
const handleCoachFeedback = require('./api/coach-feedback.js');
const handleTts = require('./api/tts.js');

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
    '.json': 'application/json',
    '.mp4': 'video/mp4',
    '.mp3': 'audio/mpeg'
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
    if (safeUrl === '/api/register-teacher') {
        return handleRegisterTeacher(req, res);
    }
    if (safeUrl === '/api/teacher-time-stats') {
        return handleTeacherTimeStats(req, res);
    }
    if (safeUrl === '/api/coach-feedback') {
        return handleCoachFeedback(req, res);
    }
    if (safeUrl === '/api/tts') {
        return handleTts(req, res);
    }

    // Serve file tĩnh ở local từ thư mục public
    let filePath = path.join(__dirname, 'public', safeUrl === '/' ? 'index.html' : safeUrl);
    
    // Bảo vệ Directory Traversal
    const publicDir = path.join(__dirname, 'public');
    if (!filePath.startsWith(publicDir)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Truy cập bị cấm (Forbidden)');
        return;
    }

    const ext = path.extname(filePath).toLowerCase();

    // Hỗ trợ Range Requests (HTTP 206) cho các file mp4 và mp3 để trình duyệt có thể stream mượt mà
    if (ext === '.mp4' || ext === '.mp3') {
        fs.stat(filePath, (err, stats) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end('<h1>404 Không Tìm Thấy File</h1>', 'utf-8');
                } else {
                    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                    res.end(`Lỗi hệ thống: ${err.code}`);
                }
                return;
            }

            const range = req.headers.range;
            const fileSize = stats.size;
            const contentType = MIME_TYPES[ext];

            if (range) {
                const parts = range.replace(/bytes=/, "").split("-");
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

                if (start >= fileSize) {
                    res.writeHead(416, {
                        'Content-Range': `bytes */${fileSize}`
                    });
                    return res.end();
                }

                const chunksize = (end - start) + 1;
                const file = fs.createReadStream(filePath, { start, end });
                const head = {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunksize,
                    'Content-Type': contentType,
                    'Cache-Control': 'no-store, no-cache, must-revalidate, private'
                };

                res.writeHead(206, head);
                file.pipe(res);
            } else {
                const head = {
                    'Content-Length': fileSize,
                    'Content-Type': contentType,
                    'Cache-Control': 'no-store, no-cache, must-revalidate, private'
                };
                res.writeHead(200, head);
                fs.createReadStream(filePath).pipe(res);
            }
        });
        return;
    }

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
