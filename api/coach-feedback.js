const { callGeminiWithRetry, checkConfigError } = require('./_utils.js');

async function handleCoachFeedback(req, res) {
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
            const { teacherName, level, mode, results, metrics } = data;

            if (!level || !results) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ success: false, error: 'Thiếu dữ liệu kết quả học tập hoặc cấp độ.' }));
                return;
            }

            console.log(`[API coach-feedback] Đang phân tích hành vi học tập cho GV: ${teacherName || 'Giáo viên'}, Cấp độ: ${level}`);

            const promptText = `
Bạn là một huấn luyện viên ảo (Virtual Coach) giảng dạy Tiếng Anh theo chuẩn CEFR vô cùng ấm áp, tận tâm và giàu kinh nghiệm sư phạm tại Việt Nam.
Đối tượng học viên của bạn là các Thầy/Cô giáo viên phổ thông Việt Nam đang bị yếu tiếng Anh, rất bận rộn, dễ tự ti và chịu nhiều áp lực thi cử.

Hãy phân tích nhật ký hành vi làm bài của giáo viên dưới đây và đưa ra nhận xét, lời khuyên thực sự hữu ích, tâm lý bằng Tiếng Việt (xưng "Em", gọi "Thầy/Cô").

THÔNG TIN HỌC VIÊN:
- Tên giáo viên: ${teacherName || 'Thầy/Cô'}
- Trình độ đang học: ${level}
- Chế độ ôn tập: ${mode === 'A' ? 'Học qua lỗi sai (Luyện tập trước)' : 'Học lý thuyết trước rồi làm bài'}

KẾT QUẢ BÀI TẬP:
- Điểm đạt được: ${results.score} (Số câu đúng trên tổng số câu).
- Danh sách câu làm sai (nếu có): ${JSON.stringify(results.mistakes)}

CHỈ SỐ HÀNH VI (METRICS):
- Thời gian làm từng câu (giây): ${JSON.stringify(metrics.dwellTimePerQ)}
- Số lần thay đổi/đắn đo đáp án từng câu (lần): ${JSON.stringify(metrics.optionSwitchesPerQ)}
- Cảnh báo làm ẩu (Rushing Flag): ${metrics.rushingFlag ? 'BẬT (Trả lời quá nhanh dưới 5 giây mà lại sai)' : 'TẮT'}

HƯỚNG DẪN ĐÁNH GIÁ HÀNH VI CỦA BẠN:
1. Nếu Rushing Flag là BẬT: Hãy cảnh báo nhẹ nhàng nhưng nghiêm túc rằng Thầy/Cô đang có xu hướng "nhấp chuột đại khái" hoặc đoán bừa mà chưa đọc kỹ nội dung. Hãy khuyên Thầy/Cô kiên nhẫn, tận dụng chức năng dịch song ngữ để đọc hiểu sâu hơn.
2. Nếu thời gian làm bài ở một câu nào đó quá lâu (ví dụ > 45 giây) hoặc số lần thay đổi đáp án nhiều (ví dụ > 2 lần): Nhận diện đây là điểm yếu của Thầy/Cô, họ đang phân vân đắn đo rất nhiều. Hãy động viên và giải thích nhẹ nhàng kiến thức liên quan đến câu đó.
3. Nếu điểm số thấp (ví dụ < 2/3): Hãy an ủi, tránh dùng từ ngữ tiêu cực gây nản lòng. Tập trung hướng dẫn xem lại phần lý thuyết.
4. Nếu điểm số tuyệt đối (3/3) và thời gian học hợp lý: Khen ngợi nồng nhiệt, khích lệ họ chuyển lên chủ đề tiếp theo.

ĐẦU RA: Bạn chỉ được phép trả về một chuỗi JSON duy nhất, không định dạng markdown, khớp hoàn toàn cấu trúc sau:
{
  "coachMessage": "Lời nhận xét và phân tích hành vi cụ thể cùng lời khuyên ấm áp sư phạm (dài khoảng 3-4 câu)...",
  "suggestions": [
    "Gợi ý hành động cụ thể 1 cho Thầy/Cô (ví dụ: Hãy làm lại bài này chậm hơn)",
    "Gợi ý hành động cụ thể 2..."
  ],
  "focusGrammar": "Tên chủ điểm ngữ pháp cốt lõi họ cần ôn lại kỹ (ví dụ: Chia động từ số ít với ngôi thứ 3, hoặc Câu bị động thời Hiện tại hoàn thành)"
}
`;

            const payload = {
                contents: [{ role: "user", parts: [{ text: promptText }] }],
                generationConfig: { responseMimeType: "application/json" }
            };

            const result = await callGeminiWithRetry(payload, 1);

            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: true, data: result }));

        } catch (error) {
            console.error("[API coach-feedback] Lỗi hệ thống:", error);
            res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: false, error: error.message || 'Lỗi hệ thống khi phân tích hành vi' }));
        }
    });
}

module.exports = handleCoachFeedback;
