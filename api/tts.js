const https = require('https');
const url = require('url');

module.exports = function(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const text = parsedUrl.query.text;
    const lang = parsedUrl.query.lang || 'vi';

    if (!text) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        return res.end(JSON.stringify({ success: false, error: 'Thiếu văn bản cần phát âm (text)' }));
    }

    // Google Translate TTS API với ngôn ngữ tương ứng (mặc định vi)
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${encodeURIComponent(lang)}&client=tw-ob&q=${encodeURIComponent(text)}`;

    const options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36',
            'Referer': 'https://translate.google.com/'
        }
    };

    https.get(ttsUrl, options, (googleRes) => {
        if (googleRes.statusCode !== 200) {
            console.error(`Google TTS trả về mã lỗi: ${googleRes.statusCode}`);
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            return res.end(JSON.stringify({ success: false, error: 'Dịch vụ âm thanh tạm thời gián đoạn' }));
        }

        // Thiết lập header audio/wav theo đúng yêu cầu của giáo viên
        res.writeHead(200, {
            'Content-Type': 'audio/wav',
            'Cache-Control': 'no-store, no-cache, must-revalidate, private',
            'Transfer-Encoding': 'chunked'
        });

        // Pipe stream nhị phân trực tiếp về client
        googleRes.pipe(res);
    }).on('error', (err) => {
        console.error('Lỗi kết nối máy chủ Google TTS:', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: 'Lỗi kết nối dịch vụ âm thanh' }));
    });
};
