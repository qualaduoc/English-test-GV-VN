const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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

let initError = null;
let GEMINI_KEYS = [];
let currentKeyIndex = 0;
let SUPABASE_URL = "";
let SUPABASE_SERVICE_ROLE_KEY = "";
let ENCRYPTION_KEY = "";
let hasConfigError = false;
let configErrorMessage = "";

try {
    // Tự động load file .env ở local nếu tồn tại (đường dẫn ở thư mục cha vì file index.js nằm trong api/)
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

    // Danh sách các API Key của Gemini đọc từ biến môi trường (cách nhau bằng dấu phẩy)
    GEMINI_KEYS = process.env.GEMINI_KEYS
        ? process.env.GEMINI_KEYS.split(',').map(k => k.trim()).filter(Boolean)
        : [];

    // Cấu hình liên kết Supabase đọc từ biến môi trường
    SUPABASE_URL = process.env.SUPABASE_URL || "";
    SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
    ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "";

    // Các biến môi trường bắt buộc để ứng dụng hoạt động chính xác
    const requiredEnvVars = [
        { key: 'GEMINI_KEYS', desc: 'Danh sách API Keys của Google Gemini (xoay vòng)' },
        { key: 'SUPABASE_URL', desc: 'Địa chỉ URL của dự án Supabase' },
        { key: 'SUPABASE_SERVICE_ROLE_KEY', desc: 'Khóa Service Role của Supabase (để ghi dữ liệu bỏ qua RLS)' },
        { key: 'ENCRYPTION_KEY', desc: 'Khóa mã hóa dữ liệu nhạy cảm AES-256 (bắt buộc dài ĐÚNG 32 ký tự)' }
    ];

    console.log("[Khởi tạo] Đang kiểm tra cấu hình môi trường bắt buộc...");

    requiredEnvVars.forEach(envVar => {
        const val = process.env[envVar.key];
        if (!val || val.trim() === "") {
            const msg = `[LỖI CẤU HÌNH] Thiếu biến môi trường bắt buộc: ${envVar.key} (${envVar.desc})`;
            console.error(msg);
            configErrorMessage += msg + "\n";
            hasConfigError = true;
        } else if (envVar.key === 'ENCRYPTION_KEY' && val.trim().length !== 32) {
            const msg = `[LỖI CẤU HÌNH] Khóa ENCRYPTION_KEY phải dài ĐÚNG 32 ký tự (Hiện tại: ${val.trim().length} ký tự).`;
            console.error(msg);
            configErrorMessage += msg + "\n";
            hasConfigError = true;
        }
    });

    if (hasConfigError) {
        // Nếu chạy local, crash server ngay lập tức để nhà phát triển phát hiện
        if (!process.env.VERCEL) {
            process.exit(1);
        }
    }

    console.log(`[Mã hóa] Đã khởi tạo thành công hệ thống mã hóa AES-256.`);
    console.log(`[Cấu hình] Đã tải thành công ${GEMINI_KEYS.length} API Keys Gemini để xoay vòng.`);
    console.log(`[Cấu hình] Đã nạp thành công thông tin Supabase: ${SUPABASE_URL}`);
} catch (err) {
    initError = err;
    console.error("Lỗi khởi tạo module Serverless:", err);
}

// Hàm mã hóa AES-256-cbc
function encrypt(text) {
    if (!text) return null;
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}

// Hàm giải mã AES-256-cbc (dành cho admin giải mã khi đọc)
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
        console.error("[Giải mã] Lỗi giải mã dữ liệu:", err.message);
        return null;
    }
}

// Lấy API Key tiếp theo theo cơ chế xoay vòng vòng tròn (Round-robin)
function getNextApiKey() {
    const key = GEMINI_KEYS[currentKeyIndex];
    currentKeyIndex = (currentKeyIndex + 1) % GEMINI_KEYS.length;
    return key;
}

// Gọi API Gemini với cơ chế xoay vòng và tự động thử lại (Retry)
function callGeminiWithRetry(payload, attempt = 1) {
    const maxAttempts = GEMINI_KEYS.length; // Thử tối đa qua cả 4 keys
    const apiKey = getNextApiKey();
    
    console.log(`[AI Chấm Điểm] Đang kết nối Gemini API (Lần thử ${attempt}/${maxAttempts}) sử dụng Key kết thúc bằng: ...${apiKey.slice(-6)}`);

    return new Promise((resolve, reject) => {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const postData = JSON.stringify(payload);
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            },
            timeout: 20000 // 20 giây hết hạn chờ (timeout) cho mạng chậm
        };

        const req = https.request(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        const parsed = JSON.parse(data);
                        if (parsed.candidates && parsed.candidates[0] && parsed.candidates[0].content && parsed.candidates[0].content.parts && parsed.candidates[0].content.parts[0]) {
                            let aiText = parsed.candidates[0].content.parts[0].text.trim();
                            
                            // Làm sạch chuỗi JSON nếu Gemini bọc trong khối code markdown ```json ... ```
                            if (aiText.startsWith('```json')) {
                                aiText = aiText.substring(7);
                            } else if (aiText.startsWith('```')) {
                                aiText = aiText.substring(3);
                            }
                            if (aiText.endsWith('```')) {
                                aiText = aiText.substring(0, aiText.length - 3);
                            }
                            aiText = aiText.trim();
                            
                            const resultJson = JSON.parse(aiText);
                            resolve(resultJson);
                        } else {
                            reject(new Error("Phản hồi từ Gemini API có cấu trúc không mong muốn"));
                        }
                    } catch (e) {
                        reject(new Error("Lỗi phân tích JSON kết quả từ AI: " + e.message + ". Chuỗi thô: " + data));
                    }
                } else {
                    reject(new Error(`Gemini API báo lỗi HTTP ${res.statusCode}. Nội dung: ${data}`));
                }
            });
        });

        req.on('error', (e) => {
            reject(e);
        });

        req.on('timeout', () => {
            req.destroy();
            reject(new Error("Hết thời gian kết nối đến máy chủ Google Gemini (Timeout)"));
        });

        req.write(postData);
        req.end();
    }).catch(async (err) => {
        console.error(`[AI Chấm Điểm] Thất bại ở lần thử ${attempt}: ${err.message}`);
        if (attempt < maxAttempts) {
            console.log(`[AI Chấm Điểm] Tự động thử lại: Chuyển sang API Key tiếp theo trong danh sách...`);
            return await callGeminiWithRetry(payload, attempt + 1);
        } else {
            throw new Error(`Đã thử toàn bộ ${maxAttempts} API Keys nhưng đều thất bại. Chi tiết lỗi cuối: ${err.message}`);
        }
    });
}

// Hàm xử lý xây dựng Prompt và gọi chấm bài
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

For each criterion, provide specific feedback, highlight mistakes (grammar, spelling, vocabulary usage) in the student's text, and offer corrections.
Respond ONLY with a valid JSON object matching the following structure:
{
  "finalLevel": "CEFR Level (A1, A2, B1, B2, C1, or C2)",
  "ieltsBand": "IELTS Band equivalent (e.g. 5.5, 6.0, 7.0, etc.)",
  "criteria": {
    "taskAchievement": {
      "name": "Task Achievement (Hoàn thành đề bài)",
      "feedbackVi": "Nhận xét chi tiết bằng tiếng Việt...",
      "feedbackEn": "Detailed feedback in English..."
    },
    "coherenceCohesion": {
      "name": "Coherence and Cohesion (Mạch lạc)",
      "feedbackVi": "Nhận xét chi tiết bằng tiếng Việt...",
      "feedbackEn": "Detailed feedback in English..."
    },
    "lexicalResource": {
      "name": "Lexical Resource (Từ vựng viết)",
      "feedbackVi": "Nhận xét chi tiết bằng tiếng Việt...",
      "feedbackEn": "Detailed feedback in English..."
    }
  },
  "overallFeedbackVi": "Nhận xét tổng quan và lời khuyên bằng tiếng Việt...",
  "overallFeedbackEn": "General overall review and encouraging message in English..."
}

Keep all feedback professional, direct, constructive, and tailored for Vietnamese high school teachers. Translate grammatical or vocabulary corrections so they can easily understand. Do not include any markdown format like \`\`\`json outside the JSON object.`;

        userContent = `Topic (Đề bài): ${promptText}\n\nTeacher's Essay (Bài luận của giáo viên):\n${studentAnswer}`;
    } else if (skill === 'speaking') {
        systemInstruction = `You are an expert IELTS and CEFR English Speaking examiner.
Analyze the transcripts of the teacher's answers to the speaking questions.
Evaluate the speaking performance based on 3 criteria:
1. Fluency and Coherence (Độ trôi chảy)
2. Lexical Resource (Từ vựng)
3. Grammatical Accuracy (Ngữ pháp)

For each criterion, provide specific feedback, point out errors in pronunciation or grammar from the transcripts, and suggest improvements.
Respond ONLY with a valid JSON object matching the following structure:
{
  "finalLevel": "CEFR Level (A1, A2, B1, B2, C1, or C2)",
  "ieltsBand": "IELTS Band equivalent (e.g. 5.5, 6.0, 7.0, etc.)",
  "criteria": {
    "fluencyCoherence": {
      "name": "Fluency and Coherence (Độ trôi chảy)",
      "feedbackVi": "Nhận xét chi tiết bằng tiếng Việt...",
      "feedbackEn": "Detailed feedback in English..."
    },
    "lexicalResource": {
      "name": "Lexical Resource (Từ vựng)",
      "feedbackVi": "Nhận xét chi tiết bằng tiếng Việt...",
      "feedbackEn": "Detailed feedback in English..."
    },
    "grammaticalAccuracy": {
      "name": "Grammatical Accuracy (Ngữ pháp)",
      "feedbackVi": "Nhận xét chi tiết bằng tiếng Việt...",
      "feedbackEn": "Detailed feedback in English..."
    }
  },
  "overallFeedbackVi": "Nhận xét tổng quan và lời khuyên bằng tiếng Việt...",
  "overallFeedbackEn": "General overall review and encouraging message in English..."
}

Keep all feedback professional, direct, constructive, and tailored for Vietnamese high school teachers. Translate corrections so they can easily understand. Do not include any markdown format like \`\`\`json outside the JSON object.`;

        let answersFormatted = "";
        if (Array.isArray(studentAnswer)) {
            studentAnswer.forEach((ans, idx) => {
                answersFormatted += `Question ${idx + 1}: ${ans.prompt}\nAnswer Transcript: ${ans.transcript}\n\n`;
            });
        } else {
            answersFormatted = studentAnswer;
        }
        userContent = `The teacher answered the speaking questions below:\n\n${answersFormatted}`;
    }

    const payload = {
        contents: [
            {
                role: "user",
                parts: [
                    { text: `System Instructions:\n${systemInstruction}\n\nUser Content:\n${userContent}` }
                ]
            }
        ],
        generationConfig: {
            responseMimeType: "application/json"
        }
    };

    return await callGeminiWithRetry(payload, 1);
}

// Hàm lưu kết quả thi lên Supabase qua PostgREST API
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
            timeout: 10000 // 10 giây timeout
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                if (res.statusCode === 200 || res.statusCode === 201) {
                    try {
                        const parsed = JSON.parse(data);
                        resolve(parsed);
                    } catch (e) {
                        resolve({ success: true, message: "Inserted but response is not JSON", raw: data });
                    }
                } else {
                    reject(new Error(`Supabase API báo lỗi HTTP ${res.statusCode}. Nội dung: ${data}`));
                }
            });
        });

        req.on('error', (e) => {
            reject(e);
        });

        req.on('timeout', () => {
            req.destroy();
            reject(new Error("Hết thời gian kết nối đến Supabase (Timeout)"));
        });

        req.write(postData);
        req.end();
    });
}

// Hàm tìm kiếm thông tin giáo viên trên leaderboard Supabase bằng SĐT
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
                    try {
                        const parsed = JSON.parse(data);
                        resolve(parsed[0] || null);
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
    });
}

// Hàm ghi/cập nhật thông tin giáo viên lên leaderboard Supabase
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
                if (res.statusCode === 200 || res.statusCode === 201) {
                    resolve(true);
                } else {
                    reject(new Error(`Leaderboard update failed with code ${res.statusCode}: ${data}`));
                }
            });
        });
        req.on('error', err => reject(err));
        req.write(postData);
        req.end();
    });
}

// Hàm quy đổi điểm CEFR thành số
function getCEFRNumericValue(level) {
    const map = { "Pre-A1": 0, "A1": 1, "A2": 2, "B1": 3, "B2": 4, "C1": 5, "C2": 6 };
    return map[level] !== undefined ? map[level] : 0;
}

const requestHandler = (req, res) => {
    // Nếu có lỗi crash khi load module, trả về lỗi 500 kèm stack trace chi tiết
    if (initError) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ 
            success: false, 
            error: 'Lỗi khởi tạo máy chủ Serverless (Init Error)',
            message: initError.message,
            stack: initError.stack
        }));
        return;
    }

    // Nếu có lỗi cấu hình biến môi trường, trả về lỗi 500 chi tiết để hỗ trợ deploy Vercel
    if (hasConfigError) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ 
            success: false, 
            error: 'Lỗi cấu hình hệ thống: Thiếu biến môi trường trên Vercel Dashboard. Vui lòng cấu hình GEMINI_KEYS, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ENCRYPTION_KEY trong Settings -> Environment Variables.',
            details: configErrorMessage
        }));
        return;
    }

    // Chỉ cho phép các ký tự an toàn, tránh Directory Traversal
    const safeUrl = req.url.split('?')[0];

    // Xử lý API Endpoint chấm điểm Nói & Viết thực tế bằng AI
    if (req.method === 'POST' && safeUrl === '/api/assess') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                const { skill, studentAnswer, prompt } = data;
                
                if (!skill || !studentAnswer) {
                    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ success: false, error: 'Thiếu thông tin kỹ năng hoặc bài làm' }));
                    return;
                }

                console.log(`[API assess] Nhận yêu cầu đánh giá kỹ năng: ${skill}`);
                const result = await assessWithGemini(skill, studentAnswer, prompt);
                
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ success: true, data: result }));
            } catch (error) {
                console.error("[API assess] Xảy ra lỗi hệ thống:", error);
                res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ success: false, error: error.message || 'Lỗi hệ thống khi AI phân tích bài thi' }));
            }
        });
        return;
    }

    // Xử lý API Endpoint lưu kết quả thi lên Supabase
    if (req.method === 'POST' && safeUrl === '/api/save-result') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                console.log(`[API save-result] Nhận yêu cầu lưu kết quả cho giáo viên: ${data.teacher_name} - SĐT: ${data.phone}`);
                
                // Thực hiện mã hóa dữ liệu nhạy cảm (AI Feedback nhận xét chi tiết) bằng AES-256-CBC
                const encryptedSpeaking = data.speaking_feedback 
                    ? { encrypted_data: encrypt(JSON.stringify(data.speaking_feedback)) } 
                    : null;
                
                const encryptedWriting = data.writing_feedback 
                    ? { encrypted_data: encrypt(JSON.stringify(data.writing_feedback)) } 
                    : null;

                const result = await saveResultToSupabaseDB({
                    teacher_name: data.teacher_name || "Giáo viên phổ thông",
                    phone: data.phone || "",
                    overall_cefr: data.overall_cefr,
                    reading_cefr: data.reading_cefr,
                    listening_cefr: data.listening_cefr,
                    speaking_cefr: data.speaking_cefr,
                    speaking_feedback: encryptedSpeaking,
                    writing_cefr: data.writing_cefr,
                    writing_feedback: encryptedWriting,
                    time_stats: data.time_stats
                });
                
                // Cập nhật bảng xếp hạng thi đua (teachers) theo phone
                const teacherPhone = data.phone;
                const overallScore = getCEFRNumericValue(data.overall_cefr);
                
                if (teacherPhone) {
                    try {
                        const existingTeacher = await getTeacherFromLeaderboard(teacherPhone);
                        if (existingTeacher) {
                            const newAttempts = (existingTeacher.attempts_count || 1) + 1;
                            let updateData = {
                                phone: teacherPhone,
                                teacher_name: data.teacher_name || existingTeacher.teacher_name,
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
                                // Giữ nguyên điểm số cũ nhưng vẫn truyền các giá trị cũ khi upsert
                                updateData.highest_reading = existingTeacher.highest_reading;
                                updateData.highest_listening = existingTeacher.listening_cefr;
                                updateData.highest_speaking = existingTeacher.speaking_cefr;
                                updateData.highest_writing = existingTeacher.writing_cefr;
                                updateData.highest_overall_cefr = existingTeacher.highest_overall_cefr;
                                updateData.highest_overall_score = oldScore;
                            }
                            await saveTeacherToLeaderboard(updateData);
                        } else {
                            const newTeacherData = {
                                phone: teacherPhone,
                                teacher_name: data.teacher_name || "Giáo viên phổ thông",
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
                        console.log(`[Leaderboard] Cập nhật bảng vinh danh thành công cho: ${data.teacher_name} (${teacherPhone})`);
                    } catch (err) {
                        console.error("[Leaderboard] Lỗi cập nhật bảng vinh danh:", err.message);
                    }
                } else {
                    console.warn("[Leaderboard] Bỏ qua cập nhật bảng vinh danh vì thiếu Số điện thoại.");
                }
                
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ success: true, data: result }));
            } catch (error) {
                console.error("[API save-result] Xảy ra lỗi khi lưu vào Supabase:", error);
                res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ success: false, error: error.message || 'Lỗi hệ thống khi lưu kết quả thi' }));
            }
        });
        return;
    }

    // Xử lý API Endpoint lấy bảng xếp hạng thi đua
    if (req.method === 'GET' && safeUrl === '/api/leaderboard') {
        try {
            // Truy vấn danh sách giáo viên từ Supabase, sắp xếp theo highest_overall_score giảm dần, sau đó theo updated_at tăng dần, lấy tối đa 10 người
            const url = `${SUPABASE_URL}/rest/v1/teachers?order=highest_overall_score.desc,updated_at.asc&limit=10`;
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

            const getReq = https.request(options, (getRes) => {
                let data = '';
                getRes.on('data', chunk => data += chunk);
                getRes.on('end', () => {
                    if (getRes.statusCode === 200) {
                        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                        res.end(JSON.stringify({ success: true, data: JSON.parse(data) }));
                    } else {
                        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                        res.end(JSON.stringify({ success: false, error: `Lỗi kết nối Supabase: ${getRes.statusCode}` }));
                    }
                });
            });

            getReq.on('error', (err) => {
                res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ success: false, error: err.message }));
            });
            getReq.end();
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: false, error: error.message }));
        }
        return;
    }

    // serve file tĩnh chỉ khi chạy ở môi trường LOCAL
    if (!process.env.VERCEL) {
        let filePath = path.join(__dirname, '..', safeUrl === '/' ? 'index.html' : safeUrl);
        
        // Kiểm tra xem file có nằm ngoài thư mục root không (chống Directory Traversal)
        const rootPath = path.join(__dirname, '..');
        if (!filePath.startsWith(rootPath)) {
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
                    'Cache-Control': 'no-store, no-cache, must-revalidate, private' // Không cache để dễ test local
                });
                res.end(content, 'utf-8');
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Không Tìm Thấy');
    }
};

module.exports = requestHandler;
