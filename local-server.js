const http = require('http');
const handler = require('./api/index.js');

const PORT = 3001;
const server = http.createServer(handler);

server.listen(PORT, () => {
    console.log(`===================================================`);
    console.log(`  MÁY CHỦ THI MÔ PHỎNG ĐÃ KHỞI CHẠY THÀNH CÔNG!`);
    console.log(`  Địa chỉ truy cập local: http://localhost:${PORT}`);
    console.log(`===================================================`);
});
