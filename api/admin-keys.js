const https = require('https');
const { resetKeysCache, checkConfigError } = require('./_utils.js');

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Hàm che dấu key nhạy cảm
function maskKey(key) {
    if (!key) return '';
    if (key.length <= 15) return '***';
    return `${key.substring(0, 10)}...xxxx...${key.substring(key.length - 8)}`;
}

// Hàm kiểm tra trực tiếp hiệu lực của khóa API
function testKeyValidity(apiKey) {
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{ parts: [{ text: "Say 'API Connection Active'" }] }]
    };
    const postData = JSON.stringify(payload);
    
    return new Promise((resolve) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            },
            timeout: 8000
        };
        
        const req = https.request(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        const parsed = JSON.parse(data);
                        if (parsed.candidates && parsed.candidates[0]) {
                            resolve({ valid: true });
                        } else {
                            resolve({ valid: false, error: 'Nhận được phản hồi rỗng từ API' });
                        }
                    } catch (e) {
                        resolve({ valid: true }); // Nhận được 200 OK là key sống
                    }
                } else {
                    try {
                        const errObj = JSON.parse(data);
                        resolve({ valid: false, error: errObj.error?.message || `HTTP ${res.statusCode}` });
                    } catch (e) {
                        resolve({ valid: false, error: `HTTP Error ${res.statusCode}: ${data.substring(0, 100)}` });
                    }
                }
            });
        });
        
        req.on('error', (err) => resolve({ valid: false, error: err.message }));
        req.on('timeout', () => { req.destroy(); resolve({ valid: false, error: "Hết thời gian kết nối tới máy chủ Google (Timeout 8s)" }); });
        req.write(postData);
        req.end();
    });
}

// Truy xuất key đầy đủ từ Supabase dựa trên UUID
function getRawKeyFromSupabase(keyId) {
    return new Promise((resolve, reject) => {
        const url = `${SUPABASE_URL}/rest/v1/gemini_api_keys?id=eq.${keyId}`;
        const targetUrl = new URL(url);
        
        const options = {
            hostname: targetUrl.hostname,
            path: targetUrl.pathname + targetUrl.search,
            method: 'GET',
            headers: {
                'apikey': SUPABASE_SERVICE_ROLE_KEY,
                'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
            },
            timeout: 5000
        };
        
        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        const records = JSON.parse(data);
                        resolve(records[0] ? records[0].api_key : null);
                    } catch (e) { resolve(null); }
                } else {
                    resolve(null);
                }
            });
        });
        req.on('error', () => resolve(null));
        req.end();
    });
}

async function handleAdminKeys(req, res) {
    if (checkConfigError(res)) return;

    // 1. Xác thực Basic Auth (admin / Matkhau@khodoan)
    const authHeader = req.headers['authorization'];
    if (!authHeader || authHeader !== 'Basic YWRtaW46TWF0a2hhdUBraG9kb2Fu') {
        res.writeHead(401, { 
            'WWW-Authenticate': 'Basic realm="Khu vuc Quan tri API Keys"',
            'Content-Type': 'application/json; charset=utf-8' 
        });
        res.end(JSON.stringify({ success: false, error: 'Yêu cầu đăng nhập quản trị (Basic Auth).' }));
        return;
    }

    const reqMethod = req.method;
    const reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const keyId = reqUrl.searchParams.get('id');

    // 2. GET: Lấy danh sách keys
    if (reqMethod === 'GET') {
        try {
            const url = `${SUPABASE_URL}/rest/v1/gemini_api_keys?order=sort_order.asc,created_at.desc`;
            const targetUrl = new URL(url);
            
            const options = {
                hostname: targetUrl.hostname,
                path: targetUrl.pathname + targetUrl.search,
                method: 'GET',
                headers: {
                    'apikey': SUPABASE_SERVICE_ROLE_KEY,
                    'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
                },
                timeout: 5000
            };
            
            const getReq = https.request(options, (getRes) => {
                let data = '';
                getRes.on('data', chunk => data += chunk);
                getRes.on('end', () => {
                    if (getRes.statusCode === 200) {
                        try {
                            const rawList = JSON.parse(data);
                            // Masking các API key trước khi gửi về client
                            const safeList = rawList.map(item => ({
                                ...item,
                                api_key: maskKey(item.api_key)
                            }));
                            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                            res.end(JSON.stringify({ success: true, data: safeList }));
                        } catch (e) {
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ success: false, error: 'Lỗi parse dữ liệu.' }));
                        }
                    } else {
                        res.writeHead(getRes.statusCode, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ success: false, error: `Supabase trả lỗi: ${getRes.statusCode}` }));
                    }
                });
            });
            
            getReq.on('error', err => {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: err.message }));
            });
            getReq.end();
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: error.message }));
        }
        return;
    }

    // 3. POST: Thêm keys mới hoặc Test key
    if (reqMethod === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', async () => {
            try {
                const payload = JSON.parse(body);
                const { action } = payload;
                
                // --- Xử lý hành động TEST KEY ---
                if (action === 'test') {
                    let testApiKey = payload.api_key;
                    
                    // Nếu truyền id, lấy key đầy đủ từ Supabase
                    if (payload.id) {
                        console.log(`[Admin Test Key] Đang truy xuất key từ Supabase: ${payload.id}`);
                        testApiKey = await getRawKeyFromSupabase(payload.id);
                        if (!testApiKey) {
                            res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
                            res.end(JSON.stringify({ success: false, error: 'Không tìm thấy API Key này trong DB để test.' }));
                            return;
                        }
                    }
                    
                    if (!testApiKey) {
                        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                        res.end(JSON.stringify({ success: false, error: 'Thiếu API Key để kiểm thử.' }));
                        return;
                    }
                    
                    console.log(`[Admin Test Key] Bắt đầu gọi thử đến Google Gemini API...`);
                    const testResult = await testKeyValidity(testApiKey);
                    
                    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({
                        success: true,
                        valid: testResult.valid,
                        error: testResult.error || null
                    }));
                    return;
                }
                
                // --- Xử lý THÊM KEY HÀNG LOẠT ---
                const { label = 'Gemini Key', rawKeys } = payload;
                if (!rawKeys || rawKeys.trim() === '') {
                    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ success: false, error: 'Vui lòng cung cấp danh sách API Keys.' }));
                    return;
                }

                // Tách danh sách key theo dấu phẩy hoặc xuống dòng
                const keysList = rawKeys
                    .split(/[\n,]+/)
                    .map(k => k.trim())
                    .filter(k => k.length > 5); // Lọc bỏ key quá ngắn

                if (keysList.length === 0) {
                    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ success: false, error: 'Không có API Key nào hợp lệ để thêm.' }));
                    return;
                }

                // Tạo mảng dữ liệu lưu Supabase
                const dbRecords = keysList.map((key, idx) => ({
                    api_key: key,
                    label: keysList.length > 1 ? `${label} #${idx + 1}` : label,
                    is_active: true,
                    usage_count: 0,
                    error_count: 0
                }));

                const postUrl = `${SUPABASE_URL}/rest/v1/gemini_api_keys`;
                const postData = JSON.stringify(dbRecords);
                
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(postData),
                        'apikey': SUPABASE_SERVICE_ROLE_KEY,
                        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
                        'Prefer': 'resolution=merge-duplicates'
                    },
                    timeout: 8000
                };
                
                const postReq = https.request(`${SUPABASE_URL}/rest/v1/gemini_api_keys`, options, (postRes) => {
                    let data = '';
                    postRes.on('data', chunk => data += chunk);
                    postRes.on('end', () => {
                        if (postRes.statusCode === 200 || postRes.statusCode === 201) {
                            // Reset cache keys động để cập nhật mới ngay
                            resetKeysCache();
                            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                            res.end(JSON.stringify({ success: true, message: `Đã lưu thành công ${keysList.length} API Keys.` }));
                        } else {
                            res.writeHead(postRes.statusCode, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ success: false, error: `Supabase trả lỗi: ${postRes.statusCode}. ${data}` }));
                        }
                    });
                });
                
                postReq.on('error', err => {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, error: err.message }));
                });
                postReq.write(postData);
                postReq.end();
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: error.message }));
            }
        });
        return;
    }

    // 4. PUT: Cập nhật key (nhãn, trạng thái active)
    if (reqMethod === 'PUT') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try {
                const payload = JSON.parse(body);
                const { id, is_active, label: keyLabel, sort_order } = payload;
                if (!id) {
                    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ success: false, error: 'Thiếu ID của API Key cần cập nhật.' }));
                    return;
                }

                // Tạo object cập nhật
                const updateData = {};
                if (is_active !== undefined) updateData.is_active = is_active;
                if (keyLabel !== undefined) updateData.label = keyLabel;
                if (sort_order !== undefined) updateData.sort_order = parseInt(sort_order, 10);

                const patchUrl = `${SUPABASE_URL}/rest/v1/gemini_api_keys?id=eq.${id}`;
                const postData = JSON.stringify(updateData);
                
                const options = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(postData),
                        'apikey': SUPABASE_SERVICE_ROLE_KEY,
                        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
                    },
                    timeout: 5000
                };
                
                const patchReq = https.request(patchUrl, options, (patchRes) => {
                    let data = '';
                    patchRes.on('data', chunk => data += chunk);
                    patchRes.on('end', () => {
                        if (patchRes.statusCode === 200 || patchRes.statusCode === 204) {
                            resetKeysCache();
                            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                            res.end(JSON.stringify({ success: true, message: 'Đã cập nhật trạng thái API Key thành công.' }));
                        } else {
                            res.writeHead(patchRes.statusCode, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ success: false, error: `Supabase trả lỗi: ${patchRes.statusCode}` }));
                        }
                    });
                });
                
                patchReq.on('error', err => {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, error: err.message }));
                });
                patchReq.write(postData);
                patchReq.end();
            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: error.message }));
            }
        });
        return;
    }

    // 5. DELETE: Xóa key
    if (reqMethod === 'DELETE') {
        if (!keyId) {
            res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: false, error: 'Thiếu ID của API Key cần xóa.' }));
            return;
        }

        try {
            const delUrl = `${SUPABASE_URL}/rest/v1/gemini_api_keys?id=eq.${keyId}`;
            const options = {
                method: 'DELETE',
                headers: {
                    'apikey': SUPABASE_SERVICE_ROLE_KEY,
                    'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
                },
                timeout: 5000
            };
            
            const delReq = https.request(delUrl, options, (delRes) => {
                let data = '';
                delRes.on('data', chunk => data += chunk);
                delRes.on('end', () => {
                    if (delRes.statusCode === 200 || delRes.statusCode === 204) {
                        resetKeysCache();
                        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                        res.end(JSON.stringify({ success: true, message: 'Đã xóa API Key thành công.' }));
                    } else {
                        res.writeHead(delRes.statusCode, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ success: false, error: `Supabase trả lỗi: ${delRes.statusCode}` }));
                    }
                });
            });
            
            delReq.on('error', err => {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: err.message }));
            });
            delReq.end();
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: error.message }));
        }
        return;
    }

    // Không hỗ trợ Method khác
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, error: 'Method Not Allowed' }));
}

module.exports = handleAdminKeys;
