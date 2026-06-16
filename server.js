const http = require('http');
const handler = require('./api/index.js');

if (!process.env.VERCEL) {
    const PORT = 3001;
    const server = http.createServer(handler);

    server.listen(PORT, () => {
        console.log(`===================================================`);
        console.log(`  MÁY CHỦ THI MÔ PHỎNG ĐÃ KHỞI CHẠY THÀNH CÔNG!`);
        console.log(`  Địa chỉ truy cập local: http://localhost:${PORT}`);
        console.log(`===================================================`);
    });
} else {
    // Export handler cho Vercel (nếu Vercel tự động build server.js ở root làm entrypoint)
    module.exports = handler;
}
