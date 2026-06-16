// --- MODULE CHẤM ĐIỂM & REVIEW BÀI THI ---
// --- PHẦN 7: THUẬT TOÁN TÍNH ĐIỂM CEFR TỔNG HỢP & DASHBOARD ---
function calculateFinalScoresAndShowDashboard() {
    window.onbeforeunload = null; // Gỡ bỏ chặn reload trang khi đã hoàn thành bài thi
    // writingFinalLevel đã được chấm bởi AI hoặc fallback từ hàm assessWritingWithAI

    const rVal = getCEFRNumericValue(readingAdaptive.finalLevel);
    const lVal = getCEFRNumericValue(listeningAdaptive.finalLevel);
    const sVal = getCEFRNumericValue(speakingFinalLevel);
    const wVal = getCEFRNumericValue(writingFinalLevel);

    const averageVal = (rVal + lVal + sVal + wVal) / 4;
    let roundedVal = Math.round(averageVal);

    const minVal = Math.min(rVal, lVal, sVal, wVal);
    if (roundedVal > minVal + 1) {
        roundedVal = minVal + 1;
    }

    const overallCEFR = getCEFRFromNumeric(roundedVal);
    
    let ieltsVal = "Dưới 3.0";
    let vstepVal = "Dưới Bậc 1";

    if (overallCEFR === "C2") { ieltsVal = "8.0+"; vstepVal = "Bậc 6"; }
    else if (overallCEFR === "C1") { ieltsVal = "6.5-7.5"; vstepVal = "Bậc 5"; }
    else if (overallCEFR === "B2") { ieltsVal = "5.5-6.0"; vstepVal = "Bậc 4"; }
    else if (overallCEFR === "B1") { ieltsVal = "4.0-5.0"; vstepVal = "Bậc 3"; }
    else if (overallCEFR === "A2") { ieltsVal = "3.0-3.5"; vstepVal = "Bậc 2"; }
    else if (overallCEFR === "A1") { ieltsVal = "3.0-3.5"; vstepVal = "Bậc 1"; }

    document.getElementById('summaryFinalLevel').innerText = overallCEFR;
    document.getElementById('summaryReadingCEFR').innerText = readingAdaptive.finalLevel;
    document.getElementById('summaryListeningCEFR').innerText = listeningAdaptive.finalLevel;
    document.getElementById('summarySpeakingCEFR').innerText = speakingFinalLevel;
    document.getElementById('summaryWritingCEFR').innerText = writingFinalLevel;

    document.getElementById('barCefrVal').innerText = overallCEFR;
    document.getElementById('barIeltsVal').innerText = ieltsVal;
    document.getElementById('barVstepVal').innerText = vstepVal;

    const cefrLevels = ["Pre-A1", "A1", "A2", "B1", "B2", "C1", "C2"];
    for (let i = 0; i <= 6; i++) {
        const seg = document.getElementById(`lbl-cefr-${i}`);
        if (seg) {
            if (cefrLevels[i] === overallCEFR) {
                seg.className = "compare-bar-segment active-cefr";
            } else {
                seg.className = "compare-bar-segment";
            }
        }
    }

    const ieltsLevels = ["Dưới 3.0", "3.0-3.5", "4.0-5.0", "5.5-6.0", "6.5-7.5", "8.0+"];
    for (let i = 0; i < 6; i++) {
        const seg = document.getElementById(`lbl-ielts-${i}`);
        if (seg) {
            if (ieltsLevels[i] === ieltsVal) {
                seg.className = "compare-bar-segment active-ielts";
            } else {
                seg.className = "compare-bar-segment";
            }
        }
    }

    const vstepLevels = ["Dưới Bậc 1", "Bậc 1", "Bậc 2", "Bậc 3", "Bậc 4", "Bậc 5", "Bậc 6"];
    for (let i = 0; i <= 6; i++) {
        const seg = document.getElementById(`lbl-vstep-${i}`);
        if (seg) {
            if (vstepLevels[i] === vstepVal) {
                seg.className = "compare-bar-segment active-vstep";
            } else {
                seg.className = "compare-bar-segment";
            }
        }
    }

    renderTimeStatsTable();
    sendExamResultToSupabase(overallCEFR, readingAdaptive.finalLevel, listeningAdaptive.finalLevel, speakingFinalLevel, writingFinalLevel);
    clearProgressFromLocalStorage();
    setAppState('summary');
}

// Hàm gửi kết quả thi lên backend để lưu vào Supabase
function sendExamResultToSupabase(overall, reading, listening, speaking, writing) {
    let stats = [];
    
    // 1. Kỹ năng Đọc
    readingAdaptive.stages.forEach((level, stageIdx) => {
        const db = adaptiveDb.reading[level];
        db.questions.forEach((q, qIdx) => {
            const time = questionTimers[q.id] || 0;
            stats.push({
                skill: "Reading",
                level: level,
                question: `Q${qIdx + 1}`,
                time: time
            });
        });
    });

    // 2. Kỹ năng Nghe
    listeningAdaptive.stages.forEach((level, stageIdx) => {
        const db = adaptiveDb.listening[level];
        db.questions.forEach((q, qIdx) => {
            const time = questionTimers[q.id] || 0;
            stats.push({
                skill: "Listening",
                level: level,
                question: `Q${qIdx + 1}`,
                time: time
            });
        });
    });

    // 3. Kỹ năng Nói
    adaptiveDb.speaking.forEach((q, qIdx) => {
        const time = questionTimers[q.id] || 0;
        stats.push({
            skill: "Speaking",
            level: "IELTS Format",
            question: `Q${qIdx + 1}`,
            time: time
        });
    });

    // 4. Kỹ năng Viết
    const wTime = questionTimers["writing_task2"] || 0;
    stats.push({
        skill: "Writing",
        level: "IELTS Task 2",
        question: "Essay",
        time: wTime
    });

    const payload = {
        teacher_name: teacherName,
        phone: teacherPhone,
        overall_cefr: overall,
        reading_cefr: reading,
        listening_cefr: listening,
        speaking_cefr: speaking,
        speaking_feedback: speakingAiResult,
        writing_cefr: writing,
        writing_feedback: writingAiResult,
        time_stats: stats
    };

    console.log("[Supabase] Đang gửi kết quả thi lên backend...");
    fetch('/api/save-result', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            console.log("[Supabase] Lưu kết quả thi lên Supabase thành công!", res.data);
        } else {
            console.error("[Supabase] Lưu kết quả thi thất bại:", res.error);
        }
    })
    .catch(err => {
        console.error("[Supabase] Gặp lỗi mạng khi lưu kết quả thi:", err);
    });
}

function getCEFRNumericValue(level) {
    const map = { "Pre-A1": 0, "A1": 1, "A2": 2, "B1": 3, "B2": 4, "C1": 5, "C2": 6 };
    return map[level] !== undefined ? map[level] : 0;
}

function getCEFRFromNumeric(val) {
    const list = ["Pre-A1", "A1", "A2", "B1", "B2", "C1", "C2"];
    return list[val] !== undefined ? list[val] : "Pre-A1";
}

// --- PHẦN 8: PHÒNG XEM LẠI BÀI LÀM (Review Mode & AI Feedback) ---
let currentReviewSkill = "reading";

function enterReviewMode(skill) {
    currentReviewSkill = skill;
    setAppState('review');

    const titleEl = document.getElementById('reviewSkillTitle');
    const mediaPane = document.getElementById('reviewMediaText');
    const switchContainer = document.getElementById('reviewAnswersSwitchContainer');

    titleEl.innerText = skill === 'reading' ? 'Kỹ năng Đọc (Reading)' : skill === 'listening' ? 'Kỹ năng Nghe (Listening)' : skill === 'speaking' ? 'Kỹ năng Nói (Speaking)' : 'Kỹ năng Viết (Writing)';

    if (skill === 'reading' || skill === 'listening') {
        switchContainer.classList.remove('hidden');
        renderAdaptiveReviewContent(skill);
    } else {
        switchContainer.classList.add('hidden');
        if (skill === 'speaking') {
            renderSpeakingReviewContent();
        } else {
            renderWritingReviewContent();
        }
    }
}

function toggleAnswersOnReview() {
    if (currentReviewSkill === 'reading' || currentReviewSkill === 'listening') {
        renderAdaptiveReviewContent(currentReviewSkill);
    }
}

function renderAdaptiveReviewContent(skill) {
    const mediaPane = document.getElementById('reviewMediaText');
    const feedbackPane = document.getElementById('reviewFeedbackPane');
    const showAnswers = document.getElementById('reviewAnswerToggle').checked;

    const stateObj = skill === 'reading' ? readingAdaptive : listeningAdaptive;
    const highestLevelCompleted = stateObj.stages[stateObj.stages.length - 1] || "B1";
    const db = adaptiveDb[skill][highestLevelCompleted];

    mediaPane.innerHTML = `
        <div class="space-y-4">
            <div class="p-3 bg-[#141b2d] border border-slate-800 rounded-lg text-xs flex justify-between items-center">
                <span>Mô-đun cao nhất đã làm: <strong>${highestLevelCompleted}</strong></span>
                <span class="${skill === 'reading' ? 'text-teal-400' : 'text-lime-400'} font-bold">CEFR đạt được: ${stateObj.finalLevel}</span>
            </div>
            <div class="space-y-2">
                <span class="text-xs font-bold text-slate-400 uppercase">Tài liệu tiếng Anh:</span>
                <p class="text-xs leading-relaxed text-slate-350">${db.media}</p>
            </div>
            <div class="space-y-2 pt-2 border-t border-slate-800">
                <span class="text-xs font-bold text-blue-400 uppercase"><i class="fa-solid fa-language"></i> Bản dịch tiếng Việt:</span>
                <p class="text-xs leading-relaxed text-[#cffafe]">${db.mediaTranslation}</p>
            </div>
        </div>
    `;

    let html = `<div class="space-y-4">`;
    const answers = stateObj.answers[highestLevelCompleted] || {};

    db.questions.forEach((q, idx) => {
        const userChoice = answers[`q${idx + 1}`];
        const isCorrect = userChoice === q.correct;

        const borderClass = isCorrect ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5";
        const textClass = isCorrect ? "text-green-400" : "text-red-400";
        const icon = isCorrect ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-solid fa-circle-xmark"></i>';

        html += `
            <div class="p-4 rounded-xl border ${borderClass} space-y-2.5">
                <div class="flex items-center justify-between text-xs font-bold ${textClass}">
                    <span>Câu hỏi ${idx + 1}</span>
                    <span>${icon} ${isCorrect ? 'ĐÚNG' : 'SAI'}</span>
                </div>
                <p class="text-xs font-semibold text-slate-100">${q.q}</p>
                <p class="text-[11px] text-[#94a3b8] italic">Dịch: ${q.qTranslation}</p>
                
                <div class="p-3 bg-[#0b0f19] border border-slate-850 rounded-lg text-xs space-y-1">
                    <span class="text-[9px] text-slate-500 block uppercase">Câu trả lời của Thầy/Cô:</span>
                    <strong class="${textClass}">${userChoice !== null && userChoice !== undefined ? (q.optionsTranslation ? `${q.options[userChoice]} (${q.optionsTranslation[userChoice]})` : q.options[userChoice]) : "(Chưa trả lời)"}</strong>
                </div>
        `;

        if (showAnswers && !isCorrect) {
            html += `
                <div class="p-3 bg-green-950/20 border border-green-900/30 rounded-lg text-xs space-y-1 text-green-300">
                    <span class="text-[9px] text-slate-500 block uppercase">Đáp án chuẩn xác:</span>
                    <strong>${q.optionsTranslation ? `${q.options[q.correct]} (${q.optionsTranslation[q.correct]})` : q.options[q.correct]}</strong>
                </div>
            `;
        }

        html += `</div>`;
    });
    html += `</div>`;
    feedbackPane.innerHTML = html;
}

function renderSpeakingReviewContent() {
    const mediaPane = document.getElementById('reviewMediaText');
    const feedbackPane = document.getElementById('reviewFeedbackPane');

    let htmlLeft = `<div class="space-y-4">`;
    speakingAnswers.forEach((ans, idx) => {
        htmlLeft += `
            <div class="p-4 bg-[#141b2d] border border-slate-800 rounded-xl space-y-3">
                <span class="text-xs font-bold text-sky-400 block border-b border-slate-800 pb-1.5">Câu hỏi ${idx + 1}: "${ans.prompt}"</span>
                <p class="text-[10px] text-slate-400">Dịch đề: ${ans.promptTranslation}</p>
                <div class="p-3 bg-[#0b0f19] border border-slate-850 rounded-lg">
                    <span class="text-[9px] text-slate-500 block uppercase"><i class="fa-solid fa-microphone text-sky-500 mr-1"></i> Giọng nói thực tế của Thầy/Cô:</span>
                    <p class="text-xs text-slate-200 italic mt-1 font-mono">"${ans.transcript}"</p>
                </div>
            </div>
        `;
    });
    htmlLeft += `</div>`;
    mediaPane.innerHTML = htmlLeft;

    if (speakingAiResult) {
        const crit = speakingAiResult.criteria || {};
        const c1 = crit.fluencyCoherence || {};
        const c2 = crit.lexicalResource || {};
        const c3 = crit.grammaticalAccuracy || {};

        feedbackPane.innerHTML = `
            <div class="space-y-4 text-xs">
                <div class="p-4 bg-[#141b2d] border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                        <span class="font-bold text-slate-300 block">SPEAKING CEFR LEVEL (AI Chấm)</span>
                        <span class="text-[10px] text-blue-450 italic font-medium"><i class="fa-solid fa-wand-magic-sparkles mr-1"></i>Đã phân tích thực tế bằng Gemini AI</span>
                    </div>
                    <span class="px-3 py-1 bg-sky-600 rounded text-white font-black text-sm">${speakingAiResult.finalLevel || speakingFinalLevel}</span>
                </div>
                
                <div class="p-4 bg-[#141b2d] border border-slate-800 rounded-xl space-y-1.5 animate-fadeIn">
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-sky-400"><i class="fa-solid fa-circle-nodes mr-1"></i> ${c1.name || "Fluency and Coherence (Độ trôi chảy)"}</span>
                        <span class="ai-feedback-badge">IELTS Band ~${speakingAiResult.ieltsBand || "N/A"}</span>
                    </div>
                    <p class="text-slate-300 leading-relaxed text-[11px]">
                        ${c1.feedbackVi || "Không có nhận xét."}
                    </p>
                    <p class="text-[10px] text-slate-400 pt-1 border-t border-slate-850">
                        English: ${c1.feedbackEn || "No English translation."}
                    </p>
                </div>

                <div class="p-4 bg-[#141b2d] border border-slate-800 rounded-xl space-y-1.5 animate-fadeIn">
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-sky-400"><i class="fa-solid fa-circle-nodes mr-1"></i> ${c2.name || "Lexical Resource (Từ vựng)"}</span>
                        <span class="ai-feedback-badge">IELTS Band ~${speakingAiResult.ieltsBand || "N/A"}</span>
                    </div>
                    <p class="text-slate-300 leading-relaxed text-[11px]">
                        ${c2.feedbackVi || "Không có nhận xét."}
                    </p>
                    <p class="text-[10px] text-slate-400 pt-1 border-t border-slate-850">
                        English: ${c2.feedbackEn || "No English translation."}
                    </p>
                </div>

                <div class="p-4 bg-[#141b2d] border border-slate-800 rounded-xl space-y-1.5 animate-fadeIn">
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-sky-400"><i class="fa-solid fa-circle-nodes mr-1"></i> ${c3.name || "Grammatical Accuracy (Ngữ pháp)"}</span>
                        <span class="ai-feedback-badge">IELTS Band ~${speakingAiResult.ieltsBand || "N/A"}</span>
                    </div>
                    <p class="text-slate-300 leading-relaxed text-[11px]">
                        ${c3.feedbackVi || "Không có nhận xét."}
                    </p>
                    <p class="text-[10px] text-slate-400 pt-1 border-t border-slate-850">
                        English: ${c3.feedbackEn || "No English translation."}
                    </p>
                </div>

                <div class="p-4 bg-[#141b2d] border border-slate-800 rounded-xl space-y-1.5 animate-fadeIn bg-gradient-to-r from-blue-950/20 to-indigo-950/20">
                    <span class="font-bold text-blue-400 block border-b border-slate-850 pb-1.5"><i class="fa-solid fa-comment-dots mr-1"></i> Đánh giá tổng quan (Overall Feedback)</span>
                    <p class="text-slate-200 leading-relaxed text-[11px] pt-1">
                        ${speakingAiResult.overallFeedbackVi || "Không có nhận xét tổng quan."}
                    </p>
                    <p class="text-[10px] text-slate-400 pt-1.5 border-t border-slate-850 italic">
                        English: ${speakingAiResult.overallFeedbackEn || "No English translation."}
                    </p>
                </div>
            </div>
        `;
    } else {
        feedbackPane.innerHTML = `
            <div class="space-y-4 text-xs">
                <div class="p-4 bg-[#141b2d] border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                        <span class="font-bold text-slate-300 block">SPEAKING CEFR LEVEL</span>
                        <span class="text-[10px] text-amber-500 italic"><i class="fa-solid fa-triangle-exclamation mr-1"></i>Chế độ dự phòng (Dữ liệu mô phỏng)</span>
                    </div>
                    <span class="px-3 py-1 bg-sky-600 rounded text-white font-black text-sm">${speakingFinalLevel}</span>
                </div>
                <div class="p-4 bg-[#141b2d] border border-slate-800 rounded-xl space-y-1.5">
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-sky-400"><i class="fa-solid fa-wand-magic-sparkles mr-1"></i> Fluency and Coherence (Độ trôi chảy)</span>
                        <span class="ai-feedback-badge">IELTS Band ~${getIELTSBandMock(speakingFinalLevel)}</span>
                    </div>
                    <p class="text-slate-300 leading-relaxed text-[11px]">
                        Nói khá mạch lạc, có sự ngắt quãng nhẹ để tìm từ vựng nhưng không làm mất liên kết hội thoại. Biết sử dụng các cụm từ đệm giao tiếp phổ thông.
                    </p>
                    <p class="text-[10px] text-slate-400 pt-1 border-t border-slate-850">
                        Dịch: Speaks fluently with minor pauses. Uses conversational connectors effectively.
                    </p>
                </div>
                <div class="p-4 bg-[#141b2d] border border-slate-800 rounded-xl space-y-1.5">
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-sky-400"><i class="fa-solid fa-wand-magic-sparkles mr-1"></i> Lexical Resource (Từ vựng)</span>
                        <span class="ai-feedback-badge">IELTS Band ~${getIELTSBandMock(speakingFinalLevel)}</span>
                    </div>
                    <p class="text-slate-300 leading-relaxed text-[11px]">
                        Từ vựng sử dụng phù hợp với chủ đề sư phạm giảng dạy và đời sống. Các lỗi dùng từ sai ngữ cảnh ít gặp và không cản trở khả năng nghe hiểu của giám khảo.
                    </p>
                    <p class="text-[10px] text-slate-400 pt-1 border-t border-slate-850">
                        Dịch: Vocabulary is appropriate for pedagogical and general topics with few minor errors.
                    </p>
                </div>
                <div class="p-4 bg-[#141b2d] border border-slate-800 rounded-xl space-y-1.5">
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-sky-400"><i class="fa-solid fa-wand-magic-sparkles mr-1"></i> Grammatical Accuracy (Ngữ pháp)</span>
                        <span class="ai-feedback-badge">IELTS Band ~${getIELTSBandMock(speakingFinalLevel)}</span>
                    </div>
                    <p class="text-slate-300 leading-relaxed text-[11px]">
                        Kiểm soát cấu trúc câu đơn tốt. Có nỗ lực sử dụng các cấu trúc câu ghép phức tạp tuy còn mắc lỗi chia thì nhẹ ở các thì hoàn thành.
                    </p>
                    <p class="text-[10px] text-slate-400 pt-1 border-t border-slate-850">
                        Dịch: Good command of simple structures. Attempts complex sentences with occasional tense errors.
                    </p>
                </div>
            </div>
        `;
    }
}

function renderWritingReviewContent() {
    const mediaPane = document.getElementById('reviewMediaText');
    const feedbackPane = document.getElementById('reviewFeedbackPane');
    const db = adaptiveDb.writing;

    mediaPane.innerHTML = `
        <div class="space-y-4">
            <div class="p-3 bg-[#141b2d] rounded-lg border border-slate-800 text-xs space-y-2">
                <span class="font-bold text-slate-400 block border-b border-slate-850 pb-1">Đề bài luận (Writing Prompt):</span>
                <p class="text-slate-300 leading-relaxed">${db.media}</p>
                <p class="text-[11px] text-[#a5f3fc] pt-1 italic">Dịch: ${db.mediaTranslation}</p>
            </div>
            <div class="p-4 bg-[#141b2d] rounded-xl border border-slate-800 space-y-2.5">
                <span class="text-xs font-bold text-emerald-400 block border-b border-slate-855 pb-1">Bài luận Thầy/Cô đã nộp:</span>
                <p class="text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap">${writingAnswerText || db.sampleAnswer}</p>
            </div>
        </div>
    `;

    if (writingAiResult) {
        const crit = writingAiResult.criteria || {};
        const c1 = crit.taskAchievement || {};
        const c2 = crit.coherenceCohesion || {};
        const c3 = crit.lexicalResource || {};

        feedbackPane.innerHTML = `
            <div class="space-y-4 text-xs">
                <div class="p-4 bg-[#141b2d] border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                        <span class="font-bold text-slate-300 block">WRITING CEFR LEVEL (AI Chấm)</span>
                        <span class="text-[10px] text-blue-450 italic font-medium"><i class="fa-solid fa-wand-magic-sparkles mr-1"></i>Đã phân tích thực tế bằng Gemini AI</span>
                    </div>
                    <span class="px-3 py-1 bg-emerald-600 rounded text-white font-black text-sm">${writingAiResult.finalLevel || writingFinalLevel}</span>
                </div>
                
                <div class="p-4 bg-[#141b2d] border border-slate-800 rounded-xl space-y-1.5 animate-fadeIn">
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-emerald-400"><i class="fa-solid fa-star-of-life mr-1"></i> ${c1.name || "Task Achievement (Hoàn thành đề bài)"}</span>
                        <span class="ai-feedback-badge">IELTS Band ~${writingAiResult.ieltsBand || "N/A"}</span>
                    </div>
                    <p class="text-slate-300 leading-relaxed text-[11px]">
                        ${c1.feedbackVi || "Không có nhận xét."}
                    </p>
                    <p class="text-[10px] text-slate-400 pt-1 border-t border-slate-850">
                        English: ${c1.feedbackEn || "No English translation."}
                    </p>
                </div>

                <div class="p-4 bg-[#141b2d] border border-slate-800 rounded-xl space-y-1.5 animate-fadeIn">
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-emerald-400"><i class="fa-solid fa-star-of-life mr-1"></i> ${c2.name || "Coherence and Cohesion (Mạch lạc)"}</span>
                        <span class="ai-feedback-badge">IELTS Band ~${writingAiResult.ieltsBand || "N/A"}</span>
                    </div>
                    <p class="text-slate-300 leading-relaxed text-[11px]">
                        ${c2.feedbackVi || "Không có nhận xét."}
                    </p>
                    <p class="text-[10px] text-slate-400 pt-1 border-t border-slate-850">
                        English: ${c2.feedbackEn || "No English translation."}
                    </p>
                </div>

                <div class="p-4 bg-[#141b2d] border border-slate-800 rounded-xl space-y-1.5 animate-fadeIn">
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-emerald-400"><i class="fa-solid fa-star-of-life mr-1"></i> ${c3.name || "Lexical Resource (Từ vựng viết)"}</span>
                        <span class="ai-feedback-badge">IELTS Band ~${writingAiResult.ieltsBand || "N/A"}</span>
                    </div>
                    <p class="text-slate-300 leading-relaxed text-[11px]">
                        ${c3.feedbackVi || "Không có nhận xét."}
                    </p>
                    <p class="text-[10px] text-slate-400 pt-1 border-t border-slate-850">
                        English: ${c3.feedbackEn || "No English translation."}
                    </p>
                </div>

                <div class="p-4 bg-[#141b2d] border border-slate-800 rounded-xl space-y-1.5 animate-fadeIn bg-gradient-to-r from-blue-950/20 to-indigo-950/20">
                    <span class="font-bold text-blue-400 block border-b border-slate-850 pb-1.5"><i class="fa-solid fa-comment-dots mr-1"></i> Đánh giá tổng quan (Overall Feedback)</span>
                    <p class="text-slate-200 leading-relaxed text-[11px] pt-1">
                        ${writingAiResult.overallFeedbackVi || "Không có nhận xét tổng quan."}
                    </p>
                    <p class="text-[10px] text-slate-400 pt-1.5 border-t border-slate-850 italic">
                        English: ${writingAiResult.overallFeedbackEn || "No English translation."}
                    </p>
                </div>
            </div>
        `;
    } else {
        feedbackPane.innerHTML = `
            <div class="space-y-4 text-xs">
                <div class="p-4 bg-[#141b2d] border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                        <span class="font-bold text-slate-300 block">WRITING CEFR LEVEL</span>
                        <span class="text-[10px] text-amber-500 italic"><i class="fa-solid fa-triangle-exclamation mr-1"></i>Chế độ dự phòng (Dữ liệu mô phỏng)</span>
                    </div>
                    <span class="px-3 py-1 bg-emerald-600 rounded text-white font-black text-sm">${writingFinalLevel}</span>
                </div>
                <div class="p-4 bg-[#141b2d] border border-slate-800 rounded-xl space-y-1.5">
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-emerald-400"><i class="fa-solid fa-star-of-life mr-1"></i> Task Achievement (Hoàn thành đề bài)</span>
                        <span class="ai-feedback-badge">IELTS Band ~${getIELTSBandMock(writingFinalLevel)}</span>
                    </div>
                    <p class="text-slate-300 leading-relaxed text-[11px]">
                        Bài viết đã giải quyết đầy đủ các yêu cầu của đề bài. Đưa ra quan điểm cá nhân rõ ràng và bổ sung các ví dụ minh họa gắn liền với thực tiễn lớp học.
                    </p>
                    <p class="text-[10px] text-slate-400 pt-1 border-t border-slate-850">
                        Dịch: Fully addresses the prompt. Clear stance and school-related examples provided.
                    </p>
                </div>
                <div class="p-4 bg-[#141b2d] border border-slate-800 rounded-xl space-y-1.5">
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-emerald-400"><i class="fa-solid fa-star-of-life mr-1"></i> Coherence and Cohesion (Mạch lạc)</span>
                        <span class="ai-feedback-badge">IELTS Band ~${getIELTSBandMock(writingFinalLevel)}</span>
                    </div>
                    <p class="text-slate-300 leading-relaxed text-[11px]">
                        Bố cục bài luận phân chia các đoạn văn chặt chẽ. Sử dụng tốt các từ liên kết luận điểm chuyển tiếp (However, In addition, Consequently).
                    </p>
                    <p class="text-[10px] text-slate-400 pt-1 border-t border-slate-850">
                        Dịch: Well-structured paragraphs. Solid use of logical transitional connectors.
                    </p>
                </div>
                <div class="p-4 bg-[#141b2d] border border-slate-800 rounded-xl space-y-1.5">
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-emerald-400"><i class="fa-solid fa-star-of-life mr-1"></i> Lexical Resource (Từ vựng viết)</span>
                        <span class="ai-feedback-badge">IELTS Band ~${getIELTSBandMock(writingFinalLevel)}</span>
                    </div>
                    <p class="text-slate-300 leading-relaxed text-[11px]">
                        Vốn từ vựng tương đối phong phú, biết áp dụng nhiều cụm từ chuyên môn giáo dục. Có sự linh hoạt trong việc dùng từ đồng nghĩa để tránh lặp từ.
                    </p>
                    <p class="text-[10px] text-slate-400 pt-1 border-t border-slate-850">
                        Dịch: Diverse vocabulary tailored to academic themes. Successful synonym replacements.
                    </p>
                </div>
            </div>
        `;
    }
}

function getIELTSBandMock(cefr) {
    const map = { "Pre-A1": "2.0", "A1": "3.0", "A2": "3.5", "B1": "4.5", "B2": "5.5", "C1": "6.5", "C2": "8.0" };
    return map[cefr] || "4.5";
}

function exitReviewToSummary() {
    setAppState('summary');
}
