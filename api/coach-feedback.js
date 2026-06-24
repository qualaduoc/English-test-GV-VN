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
            const { 
                teacherName, 
                level, 
                skill = 'quiz', 
                lessonTitle,
                results, 
                metrics,
                essay,
                transcript,
                prompt: questionPrompt,
                sampleAnswer,
                suggestedVocab
            } = data;

            if (!level) {
                res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ success: false, error: 'Thiếu dữ liệu cấp độ (level).' }));
                return;
            }

            console.log(`[API coach-feedback] Đang phân tích kỹ năng: ${skill}, Giáo viên: ${teacherName || 'Giáo viên'}, Cấp độ: ${level}`);

            let promptText = '';

            if (skill === 'speaking') {
                // Đánh giá bài Nói
                promptText = `
Bạn là một huấn luyện viên ảo (Virtual Coach) giảng dạy Tiếng Anh theo chuẩn CEFR vô cùng ấm áp, tận tâm và giàu kinh nghiệm sư phạm tại Việt Nam.
Đối tượng học viên của bạn là các Thầy/Cô giáo viên phổ thông Việt Nam đang ôn tập nâng cấp năng lực tiếng Anh, rất bận rộn, dễ tự ti và chịu nhiều áp lực thi cử.

Hãy phân tích bài phát âm và câu trả lời Nói (đã được chuyển thành văn bản) của giáo viên dưới đây, chấm điểm thật chuyên nghiệp và đưa ra nhận xét, lời khuyên thực sự hữu ích, sửa lỗi chi tiết bằng Tiếng Việt (xưng "Em", gọi "Thầy/Cô").

THÔNG TIN BÀI NÓI:
- Tên giáo viên: ${teacherName || 'Thầy/Cô'}
- Cấp độ CEFR ôn tập: ${level}
- Bài học: ${lessonTitle || 'Chuyên đề học tập'}
- Đề bài Nói (Speaking Prompt): ${questionPrompt}
- Câu trả lời mẫu (Sample Answer): ${sampleAnswer}
- Văn bản ghi âm thực tế từ giáo viên (Student Transcript): "${transcript}"

YÊU CẦU ĐÁNH GIÁ & CHẤM ĐIỂM:
1. Chấm điểm bài nói trên thang điểm 10 (từ 0.0 đến 10.0, lấy 1 chữ số thập phân) cho 3 tiêu chí cốt lõi:
   - Fluency & Coherence (Độ trôi chảy & mạch lạc)
   - Grammatical Range & Accuracy (Ngữ pháp: sự phong phú & độ chính xác)
   - Lexical Resource / Vocabulary (Vốn từ vựng sử dụng)
   - Overall Score: Điểm tổng hợp trung bình cộng của 3 tiêu chí trên.
   *LƯU Ý QUAN TRỌNG VỀ ĐIỂM SỐ: Phải chấm điểm một cách khách quan và phù hợp với kỳ vọng của trình độ hiện tại (level là ${level}). Ví dụ, học viên ở trình độ A1 chỉ cần nói được các câu ngắn gọn, đúng ngữ pháp cơ bản và từ vựng quen thuộc của A1 là xứng đáng đạt điểm tối đa (9.0 - 10.0), không được áp đặt tiêu chí từ vựng học thuật phức tạp của B2 hay C1 để hạ điểm.*
2. Đọc và phân tích văn bản ghi âm của giáo viên. Chỉ ra các lỗi sai ngữ pháp, dùng từ không chuẩn, hoặc cách phát âm có thể bị nhận dạng sai (nếu có).
3. Viết phản hồi ấm áp, động viên Thầy/Cô. Khen ngợi nỗ lực nói của họ trước.
4. Đưa ra 2-3 gợi ý cụ thể để nói trôi chảy, tự nhiên và chuyên nghiệp hơn (như cách nối âm, từ vựng đắt giá).
5. Viết lại một đoạn văn nói đề xuất (Suggested Speech) dựa trên ý tưởng của họ nhưng mượt mà hơn và phù hợp với trình độ ${level}.

ĐẦU RA: Bạn chỉ được phép trả về một chuỗi JSON duy nhất, không định dạng markdown, khớp hoàn toàn cấu trúc sau:
{
  "score": {
    "fluency": 8.0,
    "grammar": 7.5,
    "vocabulary": 8.0,
    "overall": 7.8
  },
  "coachMessage": "Lời nhận xét tổng quan ấm áp, khích lệ nỗ lực nói của Thầy/Cô và phân tích ngắn gọn (dài khoảng 3-4 câu)...",
  "grammarErrors": "Danh sách các lỗi sai ngữ pháp, cấu trúc câu hoặc từ vựng bị dùng sai trong bài nói và cách sửa (viết bằng tiếng Việt kèm ví dụ)...",
  "suggestedText": "Đoạn văn nói đề xuất hoàn chỉnh được viết lại tự nhiên, trôi chảy bằng tiếng Anh...",
  "suggestions": [
    "Gợi ý cụ thể 1 (ví dụ: Chú ý nối âm giữa 'first' và 'of' thành 'fơ-stớp')",
    "Gợi ý cụ thể 2..."
  ]
}
`;
            } else if (skill === 'writing') {
                // Đánh giá bài Viết
                promptText = `
Bạn là một huấn luyện viên ảo (Virtual Coach) giảng dạy Tiếng Anh theo chuẩn CEFR vô cùng ấm áp, tận tâm và giàu kinh nghiệm sư phạm tại Việt Nam.
Đối tượng học viên của bạn là các Thầy/Cô giáo viên phổ thông Việt Nam đang ôn tập nâng cấp năng lực tiếng Anh, rất bận rộn, dễ tự ti và chịu nhiều áp lực thi cử.

Hãy phân tích bài Viết của giáo viên dưới đây, chấm điểm thật chuyên nghiệp và đưa ra nhận xét, sửa lỗi chi tiết chính tả, ngữ pháp, từ vựng bằng Tiếng Việt (xưng "Em", gọi "Thầy/Cô").

THÔNG TIN BÀI VIẾT:
- Tên giáo viên: ${teacherName || 'Thầy/Cô'}
- Cấp độ CEFR ôn tập: ${level}
- Bài học: ${lessonTitle || 'Chuyên đề học tập'}
- Đề bài Viết (Writing Prompt): ${questionPrompt}
- Từ vựng gợi ý (Suggested Vocabulary): ${suggestedVocab || 'Không có'}
- Bài viết thực tế của giáo viên: "${essay}"

YÊU CẦU ĐÁNH GIÁ & CHẤM ĐIỂM:
1. Chấm điểm bài viết trên thang điểm 10 (từ 0.0 đến 10.0, lấy 1 chữ số thập phân) cho 4 tiêu chí cốt lõi:
   - Task Achievement / Response (Đáp ứng yêu cầu đề bài)
   - Coherence & Cohesion (Độ mạch lạc và liên kết của các ý)
   - Lexical Resource / Vocabulary (Vốn từ vựng phong phú & chính xác)
   - Grammatical Range & Accuracy (Ngữ pháp: sự phong phú & độ chính xác)
   - Overall Score: Điểm tổng hợp trung bình cộng của 4 tiêu chí trên.
   *LƯU Ý QUAN TRỌNG VỀ ĐIỂM SỐ: Phải chấm điểm một cách khách quan và phù hợp với kỳ vọng của trình độ hiện tại (level là ${level}). Ví dụ, học viên ở trình độ A1 chỉ cần viết các câu đơn giản đúng cấu trúc ngữ pháp A1, hoàn thành đủ số từ yêu cầu và dùng từ vựng cơ bản là xứng đáng đạt điểm tối đa (9.0 - 10.0), không được áp đặt tiêu chí từ vựng học thuật phức tạp hay cấu trúc câu ghép phức tạp của B2 để hạ điểm.*
2. Sửa chi tiết tất cả các lỗi chính tả (spelling), ngữ pháp (grammar), dấu câu (punctuation), cách dùng từ (word choice).
3. Nhận xét cực kỳ ấm áp sư phạm, tránh phán xét tiêu cực gây nản lòng, tôn vinh những câu viết hay.
4. Biên soạn một bài mẫu đề xuất (Suggested Essay) được nâng cấp từ chính ý tưởng bài viết của giáo viên, đảm bảo tự nhiên và chuẩn CEFR ${level}.

ĐẦU RA: Bạn chỉ được phép trả về một chuỗi JSON duy nhất, không định dạng markdown, khớp hoàn toàn cấu trúc sau:
{
  "score": {
    "taskAchievement": 8.0,
    "coherence": 8.0,
    "vocabulary": 7.5,
    "grammar": 8.0,
    "overall": 7.9
  },
  "coachMessage": "Lời nhận xét tổng quát ấm áp, đánh giá sự mạch lạc và cấu trúc bài viết của Thầy/Cô (dài khoảng 3-4 câu)...",
  "grammarErrors": "Danh sách chi tiết các lỗi chính tả, ngữ pháp, dấu câu kèm cách sửa lỗi rõ ràng (viết bằng tiếng Việt)...",
  "suggestedText": "Bài viết đề xuất hoàn chỉnh được viết lại trơn tru và chuẩn xác bằng tiếng Anh...",
  "suggestions": [
    "Gợi ý nâng cấp từ vựng 1 (ví dụ: Thay vì dùng 'very friendly', Thầy/Cô có thể dùng 'extremely hospitable')",
    "Gợi ý nâng cấp 2..."
  ]
}
`;
            } else {
                // Đánh giá bài trắc nghiệm (quiz - Reading / Listening)
                if (!results) {
                    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ success: false, error: 'Thiếu dữ liệu kết quả trắc nghiệm.' }));
                    return;
                }
                
                promptText = `
Bạn là một huấn luyện viên ảo (Virtual Coach) giảng dạy Tiếng Anh theo chuẩn CEFR vô cùng ấm áp, tận tâm và giàu kinh nghiệm sư phạm tại Việt Nam.
Đối tượng học viên của bạn là các Thầy/Cô giáo viên phổ thông Việt Nam đang bị yếu tiếng Anh, rất bận rộn, dễ tự ti và chịu nhiều áp lực thi cử.

Hãy phân tích nhật ký hành vi làm bài của giáo viên dưới đây và đưa ra nhận xét, lời khuyên thực sự hữu ích, tâm lý bằng Tiếng Việt (xưng "Em", gọi "Thầy/Cô").

THÔNG TIN HỌC VIÊN:
- Tên giáo viên: ${teacherName || 'Thầy/Cô'}
- Trình độ đang học: ${level}
- Bài học: ${lessonTitle || 'Chuyên đề học tập'}

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
            }

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
