const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Tự động load file .env ở local nếu đang chạy cục bộ qua local-server.js
if (process.env.IS_LOCAL === 'true') {
    const envPath = path.join(__dirname, '..', '.env');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split(/\r?\n/).forEach(line => {
            if (!line || line.trim().startsWith('#')) return;
            const parts = line.split('=');
            if (parts.length >= 2) {
                const key = parts[0].trim();
                let value = parts.slice(1).join('=').trim();
                if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.substring(1, value.length - 1);
                }
                process.env[key] = value;
            }
        });
    }
}

// Cache API Keys động nạp từ database
let cachedGeminiKeys = [];
let lastKeysCacheTime = 0;
const KEYS_CACHE_TTL = 60 * 1000; // Cache 1 phút
let currentDynamicKeyIndex = 0;

function resetKeysCache() {
    cachedGeminiKeys = [];
    lastKeysCacheTime = 0;
    currentDynamicKeyIndex = 0;
    console.log("[AI Configuration] Đã reset bộ đệm (cache) API Keys.");
}

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "";

// Các biến môi trường bắt buộc
const requiredEnvVars = [
    { key: 'SUPABASE_URL', desc: 'Địa chỉ URL của dự án Supabase' },
    { key: 'SUPABASE_SERVICE_ROLE_KEY', desc: 'Khóa Service Role của Supabase (để ghi dữ liệu bỏ qua RLS)' },
    { key: 'ENCRYPTION_KEY', desc: 'Khóa mã hóa dữ liệu nhạy cảm AES-256 (bắt buộc dài ĐÚNG 32 ký tự)' }
];

let hasConfigError = false;
let configErrorMessage = "";

requiredEnvVars.forEach(envVar => {
    const val = process.env[envVar.key];
    if (!val || val.trim() === "") {
        const msg = `[LỖI CẤU HÌNH] Thiếu biến môi trường bắt buộc: ${envVar.key} (${envVar.desc})`;
        configErrorMessage += msg + "\n";
        hasConfigError = true;
    } else if (envVar.key === 'ENCRYPTION_KEY' && val.trim().length !== 32) {
        const msg = `[LỖI CẤU HÌNH] Khóa ENCRYPTION_KEY phải dài ĐÚNG 32 ký tự (Hiện tại: ${val ? val.trim().length : 0} ký tự).`;
        configErrorMessage += msg + "\n";
        hasConfigError = true;
    }
});

// Nếu chạy local qua local-server.js, crash server ngay lập tức khi thiếu cấu hình
if (hasConfigError && process.env.IS_LOCAL === 'true') {
    console.error("💥 LỖI KHỞI ĐỘNG CỤC BỘ:\n" + configErrorMessage);
    process.exit(1);
}

// Helper: Kiểm tra cấu hình và trả về lỗi 500 nếu chạy trên Vercel
function checkConfigError(res) {
    if (hasConfigError) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
            success: false,
            error: 'Lỗi cấu hình hệ thống: Thiếu hoặc sai cấu hình biến môi trường trên Vercel Dashboard.',
            details: configErrorMessage
        }));
        return true;
    }
    return false;
}

// Hàm mã hóa AES-256-cbc
function encrypt(text) {
    if (!text) return null;
    try {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return iv.toString('hex') + ':' + encrypted;
    } catch (e) {
        console.error("[Mã hóa] Lỗi mã hóa:", e.message);
        return null;
    }
}

// Hàm giải mã AES-256-cbc
function decrypt(text) {
    if (!text) return null;
    try {
        const textParts = text.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (err) {
        console.error("[Giải mã] Lỗi giải mã:", err.message);
        return null;
    }
}

// Hàm nạp API Keys động từ cơ sở dữ liệu Supabase
async function loadDynamicApiKeys() {
    const now = Date.now();
    if (cachedGeminiKeys.length > 0 && (now - lastKeysCacheTime < KEYS_CACHE_TTL)) {
        return cachedGeminiKeys;
    }

    try {
        const url = `${SUPABASE_URL}/rest/v1/gemini_api_keys?is_active=eq.true&order=sort_order.asc,created_at.desc`;
        const targetUrl = new URL(url);
        
        const keys = await new Promise((resolve) => {
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
                        try { resolve(JSON.parse(data)); } catch (e) { resolve([]); }
                    } else {
                        resolve([]);
                    }
                });
            });
            req.on('error', () => resolve([]));
            req.end();
        });

        if (keys && keys.length > 0) {
            cachedGeminiKeys = keys.map(k => ({
                id: k.id,
                api_key: k.api_key,
                label: k.label
            }));
            lastKeysCacheTime = now;
            console.log(`[AI Configuration] Đã nạp thành công ${cachedGeminiKeys.length} API Keys động từ database Supabase.`);
        } else {
            // Fallback sang biến môi trường nếu DB chưa có key
            const envKeys = process.env.GEMINI_KEYS
                ? process.env.GEMINI_KEYS.split(',').map(k => k.trim()).filter(Boolean)
                : [];
            cachedGeminiKeys = envKeys.map((k, idx) => ({
                id: `env-${idx}`,
                api_key: k,
                label: `Env Key ${idx + 1}`
            }));
            lastKeysCacheTime = now;
            console.log(`[AI Configuration] Bảng gemini_api_keys trống hoặc chưa được tạo. Sử dụng ${cachedGeminiKeys.length} keys từ biến môi trường làm dự phòng.`);
        }
    } catch (err) {
        console.error("[AI Configuration] Lỗi khi load API Keys từ database:", err.message);
        const envKeys = process.env.GEMINI_KEYS
            ? process.env.GEMINI_KEYS.split(',').map(k => k.trim()).filter(Boolean)
            : [];
        cachedGeminiKeys = envKeys.map((k, idx) => ({
            id: `env-${idx}`,
            api_key: k,
            label: `Env Key ${idx + 1}`
        }));
    }
    return cachedGeminiKeys;
}

// Cập nhật thống kê sử dụng key lên database bất đồng bộ
function updateKeyStatsAsync(keyId, type) {
    if (!keyId || keyId.startsWith('env-')) return;
    
    const rpcName = type === 'success' ? 'increment_key_usage' : 'increment_key_error';
    const url = `${SUPABASE_URL}/rest/v1/rpc/${rpcName}`;
    const postData = JSON.stringify({ key_id: keyId });
    const parsedUrl = new URL(url);
    
    const options = {
        hostname: parsedUrl.hostname,
        path: parsedUrl.pathname,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData),
            'apikey': SUPABASE_SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
        },
        timeout: 2000
    };
    
    const req = https.request(options);
    req.on('error', () => {}); // Bỏ qua lỗi thống kê để không chặn luồng chấm bài
    req.write(postData);
    req.end();
}

// Gọi API Gemini xoay vòng Robin động & failover tự động
async function callGeminiWithRetry(payload, attempt = 1) {
    const activeKeys = await loadDynamicApiKeys();
    const maxAttempts = activeKeys.length || 1;
    
    if (activeKeys.length === 0) {
        throw new Error("Hệ thống không có API Key Gemini nào khả dụng. Vui lòng cấu hình trong trang Quản trị.");
    }
    
    // Xoay vòng Robin lấy key tiếp theo
    const keyObj = activeKeys[currentDynamicKeyIndex];
    currentDynamicKeyIndex = (currentDynamicKeyIndex + 1) % activeKeys.length;
    
    const apiKey = keyObj.api_key;
    const keyId = keyObj.id;
    
    console.log(`[AI] Đang gọi Gemini API dùng key [${keyObj.label}] (Lần thử ${attempt}/${maxAttempts})`);

    // Ép kiểu output của Gemini trả về JSON để tránh lỗi cú pháp
    if (!payload.generationConfig) {
        payload.generationConfig = {};
    }
    payload.generationConfig.responseMimeType = "application/json";

    return new Promise((resolve, reject) => {
        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
        const postData = JSON.stringify(payload);
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            },
            timeout: 35000
        };

        const req = https.request(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        const parsed = JSON.parse(data);
                        if (parsed.candidates && parsed.candidates[0] && parsed.candidates[0].content && parsed.candidates[0].content.parts && parsed.candidates[0].content.parts[0]) {
                            let aiText = parsed.candidates[0].content.parts[0].text.trim();
                            if (aiText.startsWith('```json')) aiText = aiText.substring(7);
                            else if (aiText.startsWith('```')) aiText = aiText.substring(3);
                            if (aiText.endsWith('```')) aiText = aiText.substring(0, aiText.length - 3);
                            aiText = aiText.trim();
                            
                            // Thành công -> Ghi nhận lượt sử dụng key
                            updateKeyStatsAsync(keyId, 'success');
                            
                            resolve(JSON.parse(aiText));
                        } else {
                            reject(new Error("Phản hồi từ Gemini API có cấu trúc không mong muốn"));
                        }
                    } catch (e) {
                        reject(new Error("Lỗi phân tích JSON kết quả từ AI: " + e.message));
                    }
                } else {
                    reject(new Error(`Gemini API báo lỗi HTTP ${res.statusCode}. Nội dung: ${data}`));
                }
            });
        });

        req.on('error', e => reject(e));
        req.on('timeout', () => { req.destroy(); reject(new Error("Hết thời gian kết nối Gemini")); });
        req.write(postData);
        req.end();
    }).catch(async err => {
        console.error(`[AI] Lần thử ${attempt} dùng key [${keyObj.label}] thất bại: ${err.message}`);
        
        // Thất bại -> Ghi nhận lỗi của key này vào DB
        updateKeyStatsAsync(keyId, 'error');
        
        if (attempt < maxAttempts) {
            // Đổi ngay sang key tiếp theo và thử lại
            return await callGeminiWithRetry(payload, attempt + 1);
        } else {
            throw new Error(`Đã xoay vòng qua toàn bộ ${maxAttempts} keys nhưng đều thất bại. Chi tiết: ${err.message}`);
        }
    });
}

// Chấm điểm bằng Gemini
async function assessWithGemini(skill, studentAnswer, promptText) {
    let systemInstruction = "";
    let userContent = "";

    if (skill === 'writing') {
        systemInstruction = `You are an expert IELTS and CEFR English Writing examiner.
Analyze the teacher's essay based on the provided prompt and answer text.
Evaluate the essay based on 3 criteria:
1. Task Achievement (Hoàn thành đề bài)
2. Coherence and Cohesion (Mạch lạc)
3. Lexical Resource (Từ vựng viết)

Respond ONLY with a valid JSON object matching the structure:
{
  "finalLevel": "CEFR Level (A1, A2, B1, B2, C1, or C2)",
  "ieltsBand": "IELTS Band equivalent (e.g. 5.5, 6.0, 7.0, etc.)",
  "criteria": {
    "taskAchievement": { "name": "Task Achievement (Hoàn thành đề bài)", "feedbackVi": "...", "feedbackEn": "..." },
    "coherenceCohesion": { "name": "Coherence and Cohesion (Mạch lạc)", "feedbackVi": "...", "feedbackEn": "..." },
    "lexicalResource": { "name": "Lexical Resource (Từ vựng viết)", "feedbackVi": "...", "feedbackEn": "..." }
  },
  "overallFeedbackVi": "...",
  "overallFeedbackEn": "..."
}
Do not include any markdown format like \`\`\`json outside the JSON object.`;
        userContent = `Topic (Đề bài): ${promptText}\n\nTeacher's Essay:\n${studentAnswer}`;
    } else if (skill === 'speaking') {
        systemInstruction = `You are an expert IELTS and CEFR English Speaking examiner.
Analyze the transcripts of the teacher's answers to the speaking questions.
Also pay attention to the "Replays" (Số lần nghe lại câu hỏi) for each question. If the teacher has many replays, it suggests listening comprehension issues. Provide appropriate advice in overallFeedbackVi and overallFeedbackEn.
Evaluate the speaking performance based on 3 criteria:
1. Fluency and Coherence (Độ trôi chảy)
2. Lexical Resource (Từ vựng)
3. Grammatical Accuracy (Ngữ pháp)

Respond ONLY with a valid JSON object matching the structure:
{
  "finalLevel": "CEFR Level (A1, A2, B1, B2, C1, or C2)",
  "ieltsBand": "IELTS Band equivalent (e.g. 5.5, 6.0, 7.0, etc.)",
  "criteria": {
    "fluencyCoherence": { "name": "Fluency and Coherence (Độ trôi chảy)", "feedbackVi": "...", "feedbackEn": "..." },
    "lexicalResource": { "name": "Lexical Resource (Từ vựng)", "feedbackVi": "...", "feedbackEn": "..." },
    "grammaticalAccuracy": { "name": "Grammatical Accuracy (Ngữ pháp)", "feedbackVi": "...", "feedbackEn": "..." }
  },
  "overallFeedbackVi": "...",
  "overallFeedbackEn": "..."
}
Do not include any markdown format like \`\`\`json outside the JSON object.`;

        let answersFormatted = "";
        if (Array.isArray(studentAnswer)) {
            studentAnswer.forEach((ans, idx) => {
                answersFormatted += `Question ${idx + 1}: ${ans.prompt}\nSample Answer (Gợi ý chuẩn): ${ans.sampleAnswer || ''}\nAnswer Transcript (Thí sinh trả lời): ${ans.transcript || ''}\nReplays (Số lần nghe lại): ${ans.replays || 0}\n\n`;
            });
        } else {
            answersFormatted = studentAnswer;
        }
        userContent = `The teacher answered the speaking questions below:\n\n${answersFormatted}`;
    }

    const payload = {
        contents: [{ role: "user", parts: [{ text: `System Instructions:\n${systemInstruction}\n\nUser Content:\n${userContent}` }] }]
    };

    return await callGeminiWithRetry(payload, 1);
}

// Lưu kết quả vào exam_results
function saveResultToSupabaseDB(resultData) {
    return new Promise((resolve, reject) => {
        const url = `${SUPABASE_URL}/rest/v1/exam_results`;
        const postData = JSON.stringify(resultData);
        const parsedUrl = new URL(url);
        
        const options = {
            hostname: parsedUrl.hostname,
            path: parsedUrl.pathname,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData),
                'apikey': SUPABASE_SERVICE_ROLE_KEY,
                'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
                'Prefer': 'return=representation'
            },
            timeout: 10000
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200 || res.statusCode === 201) {
                    try { resolve(JSON.parse(data)); } catch (e) { resolve({ success: true }); }
                } else {
                    reject(new Error(`Supabase API lỗi HTTP ${res.statusCode}. Nội dung: ${data}`));
                }
            });
        });
        req.on('error', e => reject(e));
        req.on('timeout', () => { req.destroy(); reject(new Error("Timeout Supabase")); });
        req.write(postData);
        req.end();
    });
}

// Tra cứu giáo viên trên leaderboard
function getTeacherFromLeaderboard(phone) {
    return new Promise((resolve) => {
        const url = `${SUPABASE_URL}/rest/v1/teachers?phone=eq.${encodeURIComponent(phone)}`;
        const parsedUrl = new URL(url);
        
        const options = {
            hostname: parsedUrl.hostname,
            path: parsedUrl.pathname + parsedUrl.search,
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
                    try { resolve(JSON.parse(data)[0] || null); } catch (e) { resolve(null); }
                } else {
                    resolve(null);
                }
            });
        });
        req.on('error', () => resolve(null));
        req.end();
    });
}

// Tìm giáo viên theo SĐT hoặc trùng Họ tên để lọc trùng (gộp kết quả)
function findTeacherByPhoneOrName(phone, name) {
    return new Promise((resolve) => {
        // 1. Tìm theo SĐT trước
        if (phone) {
            const url = `${SUPABASE_URL}/rest/v1/teachers?phone=eq.${encodeURIComponent(phone)}`;
            const parsedUrl = new URL(url);
            const options = {
                hostname: parsedUrl.hostname,
                path: parsedUrl.pathname + parsedUrl.search,
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
                            const list = JSON.parse(data);
                            if (list && list.length > 0) {
                                return resolve(list[0]);
                            }
                            searchByName();
                        } catch (e) {
                            searchByName();
                        }
                    } else {
                        searchByName();
                    }
                });
            });
            req.on('error', () => searchByName());
            req.end();
        } else {
            searchByName();
        }

        // 2. Tìm theo Họ tên nếu không tìm thấy theo SĐT
        function searchByName() {
            if (!name || name === "Giáo viên phổ thông" || name.trim() === "") {
                return resolve(null);
            }
            const url = `${SUPABASE_URL}/rest/v1/teachers?teacher_name=eq.${encodeURIComponent(name.trim())}`;
            const parsedUrl = new URL(url);
            const options = {
                hostname: parsedUrl.hostname,
                path: parsedUrl.pathname + parsedUrl.search,
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
                            const list = JSON.parse(data);
                            if (list && list.length > 0) {
                                resolve(list[0]);
                            } else {
                                resolve(null);
                            }
                        } catch (e) {
                            resolve(null);
                        }
                    } else {
                        resolve(null);
                    }
                });
            });
            req.on('error', () => resolve(null));
            req.end();
        }
    });
}

// Upsert giáo viên lên leaderboard
function saveTeacherToLeaderboard(teacherData) {
    return new Promise((resolve, reject) => {
        const url = `${SUPABASE_URL}/rest/v1/teachers`;
        const postData = JSON.stringify(teacherData);
        const parsedUrl = new URL(url);
        
        const options = {
            hostname: parsedUrl.hostname,
            path: parsedUrl.pathname,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData),
                'apikey': SUPABASE_SERVICE_ROLE_KEY,
                'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
                'Prefer': 'resolution=merge-duplicates'
            },
            timeout: 5000
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200 || res.statusCode === 201) resolve(true);
                else reject(new Error(`Leaderboard update failed: ${data}`));
            });
        });
        req.on('error', err => reject(err));
        req.write(postData);
        req.end();
    });
}

function getCEFRNumericValue(level) {
    const map = { "Pre-A1": 0, "A1": 1, "A2": 2, "B1": 3, "B2": 4, "C1": 5, "C2": 6 };
    return map[level] !== undefined ? map[level] : 0;
}

// --- CÁC ROUTE HANDLERS CHÍNH ---

// 1. POST /api/assess
async function handleAssess(req, res) {
    if (checkConfigError(res)) return;
    if (req.method !== 'POST') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Method Not Allowed' }));
        return;
    }

    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            const { skill, studentAnswer, prompt } = data;
            
            if (!skill || !studentAnswer) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ success: false, error: 'Thiếu thông tin kỹ năng hoặc bài làm' }));
                return;
            }

            console.log(`[API assess] Đang chấm bài cho kỹ năng: ${skill}`);
            const result = await assessWithGemini(skill, studentAnswer, prompt);
            
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: true, data: result }));
        } catch (error) {
            console.error("[API assess] Lỗi:", error);
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: false, error: error.message || 'Lỗi hệ thống khi chấm bài' }));
        }
    });
}

// 2. POST /api/save-result
async function handleSaveResult(req, res) {
    if (checkConfigError(res)) return;
    if (req.method !== 'POST') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Method Not Allowed' }));
        return;
    }

    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            console.log(`[API save-result] Nhận yêu cầu lưu cho SĐT: ${data.phone}`);

            // Tìm kiếm giáo viên đã tồn tại trước (theo SĐT hoặc trùng Họ tên để lọc trùng)
            let finalPhone = data.phone || "";
            let finalName = data.teacher_name || "Giáo viên phổ thông";
            try {
                const existingTeacher = await findTeacherByPhoneOrName(finalPhone, finalName);
                if (existingTeacher) {
                    finalPhone = existingTeacher.phone; // Gộp vào SĐT hiện có trong DB
                    finalName = existingTeacher.teacher_name; // Dùng Họ tên trong DB
                }
            } catch (err) {
                console.error("[SaveResult] Lỗi tra cứu giáo viên trùng:", err.message);
            }
            
            const encryptedSpeaking = data.speaking_feedback 
                ? { encrypted_data: encrypt(JSON.stringify(data.speaking_feedback)) } 
                : null;
            
            const encryptedWriting = data.writing_feedback 
                ? { encrypted_data: encrypt(JSON.stringify(data.writing_feedback)) } 
                : null;

            const result = await saveResultToSupabaseDB({
                teacher_name: finalName,
                phone: finalPhone,
                overall_cefr: data.overall_cefr,
                reading_cefr: data.reading_cefr,
                listening_cefr: data.listening_cefr,
                speaking_cefr: data.speaking_cefr,
                speaking_feedback: encryptedSpeaking,
                writing_cefr: data.writing_cefr,
                writing_feedback: encryptedWriting,
                time_stats: data.time_stats,
                exam_mode: data.exam_mode || "practice"
            });
            
            // Cập nhật bảng xếp hạng
            const teacherPhone = finalPhone;
            const overallScore = getCEFRNumericValue(data.overall_cefr);
            
            if (teacherPhone) {
                try {
                    const existingTeacher = await getTeacherFromLeaderboard(teacherPhone);
                    if (existingTeacher) {
                        const newAttempts = (existingTeacher.attempts_count || 1) + 1;
                        let updateData = {
                            phone: teacherPhone,
                            teacher_name: finalName,
                            attempts_count: newAttempts,
                            updated_at: new Date().toISOString()
                        };
                        const oldScore = parseFloat(existingTeacher.highest_overall_score || 0);
                        if (overallScore > oldScore) {
                            updateData.highest_reading = data.reading_cefr;
                            updateData.highest_listening = data.listening_cefr;
                            updateData.highest_speaking = data.speaking_cefr;
                            updateData.highest_writing = data.writing_cefr;
                            updateData.highest_overall_cefr = data.overall_cefr;
                            updateData.highest_overall_score = overallScore;
                        } else {
                            updateData.highest_reading = existingTeacher.highest_reading;
                            updateData.highest_listening = existingTeacher.highest_listening;
                            updateData.highest_speaking = existingTeacher.highest_speaking;
                            updateData.highest_writing = existingTeacher.highest_writing;
                            updateData.highest_overall_cefr = existingTeacher.highest_overall_cefr;
                            updateData.highest_overall_score = oldScore;
                        }
                        await saveTeacherToLeaderboard(updateData);
                    } else {
                        const newTeacherData = {
                            phone: teacherPhone,
                            teacher_name: finalName,
                            attempts_count: 1,
                            highest_reading: data.reading_cefr,
                            highest_listening: data.listening_cefr,
                            highest_speaking: data.speaking_cefr,
                            highest_writing: data.writing_cefr,
                            highest_overall_cefr: data.overall_cefr,
                            highest_overall_score: overallScore,
                            updated_at: new Date().toISOString()
                        };
                        await saveTeacherToLeaderboard(newTeacherData);
                    }
                } catch (err) {
                    console.error("[Leaderboard] Lỗi cập nhật:", err.message);
                }
            }
            
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: true, data: result, phone: finalPhone, teacher_name: finalName }));
        } catch (error) {
            console.error("[API save-result] Lỗi:", error);
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: false, error: error.message || 'Lỗi hệ thống' }));
        }
    });
}

// 3. GET /api/leaderboard
async function handleLeaderboard(req, res) {
    if (checkConfigError(res)) return;
    if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Method Not Allowed' }));
        return;
    }

    try {
        // Phân tích tham số limit từ query string (mặc định là 10, giới hạn tối đa 1000 để bảo mật/hiệu năng)
        const reqUrl = new URL(req.url, 'http://localhost');
        let limit = parseInt(reqUrl.searchParams.get('limit'), 10) || 10;
        if (isNaN(limit) || limit <= 0) {
            limit = 10;
        } else if (limit > 1000) {
            limit = 1000;
        }

        const url = `${SUPABASE_URL}/rest/v1/teachers?order=highest_overall_score.desc,updated_at.asc&limit=${limit}`;
        const parsedUrl = new URL(url);
        
        const options = {
            hostname: parsedUrl.hostname,
            path: parsedUrl.pathname + parsedUrl.search,
            method: 'GET',
            headers: {
                'apikey': SUPABASE_SERVICE_ROLE_KEY,
                'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
                'Prefer': 'count=exact'
            },
            timeout: 5000
        };

        const getReq = https.request(options, (getRes) => {
            let data = '';
            getRes.on('data', chunk => data += chunk);
            getRes.on('end', () => {
                if (getRes.statusCode === 200 || getRes.statusCode === 206) {
                    const contentRange = getRes.headers['content-range'];
                    let totalCount = 0;
                    if (contentRange) {
                        const parts = contentRange.split('/');
                        if (parts.length > 1) {
                            totalCount = parseInt(parts[1], 10);
                        }
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ 
                        success: true, 
                        data: JSON.parse(data),
                        totalCount: totalCount
                    }));
                } else {
                    res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ success: false, error: `Lỗi kết nối Supabase: ${getRes.statusCode}` }));
                }
            });
        });

        getReq.on('error', err => {
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: false, error: err.message }));
        });
        getReq.end();
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: error.message }));
    }
}

// 4. POST /api/register-teacher
async function handleRegisterTeacher(req, res) {
    if (checkConfigError(res)) return;
    if (req.method !== 'POST') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Method Not Allowed' }));
        return;
    }

    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            const phone = data.phone;
            const name = data.teacher_name || "Giáo viên phổ thông";
            
            if (!phone) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ success: false, error: 'Thiếu số điện thoại' }));
                return;
            }

            console.log(`[API register-teacher] Khởi tạo đăng ký/cập nhật thông tin cho SĐT: ${phone}`);
            
            // Tìm giáo viên trùng SĐT hoặc Họ tên để gộp tài khoản
            const existingTeacher = await findTeacherByPhoneOrName(phone, name);
            let finalPhone = phone;
            let finalName = name;
            
            if (existingTeacher) {
                finalPhone = existingTeacher.phone;
                // Nếu trùng SĐT thực tế nhưng đổi tên, lấy tên mới. Ngược lại, lấy tên cũ.
                if (existingTeacher.phone === phone) {
                    finalName = name;
                } else {
                    finalName = existingTeacher.teacher_name;
                }
                
                // Đã tồn tại -> Chỉ cập nhật tên
                await saveTeacherToLeaderboard({
                    phone: finalPhone,
                    teacher_name: finalName,
                    updated_at: new Date().toISOString()
                });
            } else {
                // Chưa tồn tại -> Tạo mới với điểm mặc định N/A hoặc rỗng
                await saveTeacherToLeaderboard({
                    phone: finalPhone,
                    teacher_name: finalName,
                    attempts_count: 0,
                    highest_reading: "N/A",
                    highest_listening: "N/A",
                    highest_speaking: "N/A",
                    highest_writing: "N/A",
                    highest_overall_cefr: "N/A",
                    highest_overall_score: 0,
                    updated_at: new Date().toISOString()
                });
            }

            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ 
                success: true, 
                message: 'Đăng ký thông tin giáo viên thành công',
                phone: finalPhone,
                teacher_name: finalName
            }));
        } catch (error) {
            console.error("[API register-teacher] Lỗi:", error);
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: false, error: error.message || 'Lỗi hệ thống' }));
        }
    });
}

// Lấy chi tiết thời gian suy nghĩ của giáo viên
async function handleTeacherTimeStats(req, res) {
    if (checkConfigError(res)) return;
    if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Method Not Allowed' }));
        return;
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const phone = parsedUrl.searchParams.get('phone');
    if (!phone) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: 'Thiếu số điện thoại' }));
        return;
    }

    try {
        const url = `${SUPABASE_URL}/rest/v1/exam_results?phone=eq.${encodeURIComponent(phone)}&order=created_at.desc&limit=1`;
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
                    const records = JSON.parse(data);
                    if (records.length > 0) {
                        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                        res.end(JSON.stringify({ success: true, data: records[0].time_stats }));
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                        res.end(JSON.stringify({ success: true, data: [] }));
                    }
                } else {
                    res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ success: false, error: `Lỗi kết nối Supabase: ${getRes.statusCode}` }));
                }
            });
        });

        getReq.on('error', err => {
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: false, error: err.message }));
        });
        getReq.end();

    } catch (error) {
        console.error("[API teacher-time-stats] Lỗi:", error);
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: error.message || 'Lỗi hệ thống' }));
    }
}

// 5. GET /api/diligent-leaderboard
async function handleDiligentLeaderboard(req, res) {
    if (checkConfigError(res)) return;
    if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Method Not Allowed' }));
        return;
    }

    try {
        const reqUrl = new URL(req.url, 'http://localhost');
        let limit = parseInt(reqUrl.searchParams.get('limit'), 10) || 10;
        if (isNaN(limit) || limit <= 0) {
            limit = 10;
        } else if (limit > 1000) {
            limit = 1000;
        }

        // Sắp xếp theo tổng thời gian học (study_seconds) và lượt học (study_count)
        const url = `${SUPABASE_URL}/rest/v1/teachers?order=study_seconds.desc,study_count.desc,updated_at.asc&limit=${limit}`;
        const parsedUrl = new URL(url);
        
        const options = {
            hostname: parsedUrl.hostname,
            path: parsedUrl.pathname + parsedUrl.search,
            method: 'GET',
            headers: {
                'apikey': SUPABASE_SERVICE_ROLE_KEY,
                'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
                'Prefer': 'count=exact'
            },
            timeout: 5000
        };

        const getReq = https.request(options, (getRes) => {
            let data = '';
            getRes.on('data', chunk => data += chunk);
            getRes.on('end', () => {
                if (getRes.statusCode === 200 || getRes.statusCode === 206) {
                    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ 
                        success: true, 
                        data: JSON.parse(data)
                    }));
                } else {
                    res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ success: false, error: `Lỗi kết nối Supabase: ${getRes.statusCode}` }));
                }
            });
        });

        getReq.on('error', err => {
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: false, error: err.message }));
        });
        getReq.end();
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: error.message }));
    }
}

// 6. POST /api/record-study
async function handleRecordStudy(req, res) {
    if (checkConfigError(res)) return;
    if (req.method !== 'POST') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Method Not Allowed' }));
        return;
    }

    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
        try {
            const data = JSON.parse(body);
            const phone = data.phone;
            const studySeconds = parseInt(data.study_seconds, 10) || 0;
            const name = data.teacher_name || "Giáo viên phổ thông";
            
            if (!phone) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ success: false, error: 'Thiếu số điện thoại' }));
                return;
            }

            console.log(`[API record-study] Ghi nhận thời gian học cho SĐT: ${phone}, Số giây: ${studySeconds}s`);
            
            // Tìm giáo viên trùng SĐT hoặc trùng Họ tên để gộp thời gian học
            const existingTeacher = await findTeacherByPhoneOrName(phone, name);
            let finalPhone = phone;
            let finalName = name;
            
            if (existingTeacher) {
                finalPhone = existingTeacher.phone;
                if (existingTeacher.phone === phone) {
                    finalName = name;
                } else {
                    finalName = existingTeacher.teacher_name;
                }
                
                const newStudyCount = (existingTeacher.study_count || 0) + 1;
                const newStudySeconds = (existingTeacher.study_seconds || 0) + studySeconds;
                
                await saveTeacherToLeaderboard({
                    phone: finalPhone,
                    teacher_name: finalName,
                    study_count: newStudyCount,
                    study_seconds: newStudySeconds,
                    updated_at: new Date().toISOString()
                });
            } else {
                await saveTeacherToLeaderboard({
                    phone: finalPhone,
                    teacher_name: finalName,
                    study_count: 1,
                    study_seconds: studySeconds,
                    attempts_count: 0,
                    highest_reading: "N/A",
                    highest_listening: "N/A",
                    highest_speaking: "N/A",
                    highest_writing: "N/A",
                    highest_overall_cefr: "N/A",
                    highest_overall_score: 0,
                    updated_at: new Date().toISOString()
                });
            }

            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: true, message: 'Ghi nhận tiến trình ôn tập thành công!', phone: finalPhone, teacher_name: finalName }));
        } catch (error) {
            console.error("[API record-study] Lỗi:", error);
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: false, error: error.message || 'Lỗi hệ thống' }));
        }
    });
}

module.exports = {
    handleAssess,
    handleSaveResult,
    handleLeaderboard,
    handleRegisterTeacher,
    handleTeacherTimeStats,
    handleDiligentLeaderboard,
    handleRecordStudy,
    callGeminiWithRetry,
    checkConfigError,
    resetKeysCache,
    loadDynamicApiKeys
};
