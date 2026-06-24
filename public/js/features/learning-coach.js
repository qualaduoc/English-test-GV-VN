// --- SMART LEARNING & COACH CONTROLLER ---

let selectedLevel = "A1"; // A1, A2, B1, B2
let selectedMode = "B"; // B: Lý thuyết trước, A: Luyện tập trước
let studySeconds = 0;
let studyTimerInterval = null;
let bilingualTheoryActive = true;

// Các biến phục vụ giọng nói thông minh (TTS)
let lectureSpeechUtterance = null;
let explanationSpeechUtterance = null;
let currentPlayingSpeechIdx = null;

// Quản lý phát Google Translate TTS & Preload
let googleAudioQueue = [];
let currentAudioIndex = 0;
let currentHtmlAudio = null;
let isAudioPlaying = false;
let viSpeechVoice = null;
let ttsRetryCount = 0;

// Biến lưu trữ tốc độ phát (playbackRate)
let currentSpeechRate = 1.0;

// Bản đồ từ điển phiên âm các từ tiếng Anh thường dùng trong học liệu sang tiếng Việt gần đúng
const englishToViPronunciationMap = {
    "primary school": "pờ-rai-mờ-ri sờ-kul",
    "primary": "pờ-rai-mờ-ri",
    "school": "sờ-kul",
    "tennis": "ten-nít",
    "soccer": "sóc-cơ",
    "weekend": "uých-en",
    "weekends": "uých-en",
    "cooking": "cúc-king",
    "dinner": "din-nơ",
    "hobbies": "hóp-bi",
    "hobby": "hóp-bi",
    "plastic": "pờ-lát-tích",
    "pollution": "pô-lu-sơn",
    "invented": "in-ven-tựt",
    "extended": "ếch-ten-dựt",
    "families": "phe-mi-li",
    "family": "phe-mi-li",
    "urban": "ơ-bần",
    "migration": "mai-grê-sơn",
    "career": "ca-ri-ơ",
    "prevalent": "pờ-re-vơ-lần",
    "libraries": "lai-bờ-ra-ri",
    "library": "lai-bờ-ra-ri",
    "physical": "phi-zi-cồ",
    "critical thinking": "cờ-ri-ti-cồ thin-king",
    "critical": "cờ-ri-ti-cồ",
    "thinking": "thin-king",
    "literacy": "li-tơ-rơ-si",
    "digital": "di-ji-tồ",
    "unverified": "ăn-ve-ri-phai",
    "generative": "je-nơ-rây-típ",
    "language": "leng-guých",
    "models": "mô-đần",
    "model": "mô-đần",
    "cognitive": "cóc-ni-típ",
    "dependency": "đi-pen-đơn-si",
    "coaching": "cốu-ching",
    "quantum": "quăn-tùm",
    "silicon": "si-li-cơn",
    "binary": "bai-nơ-ri",
    "cryptography": "cờ-ríp-tô-gra-phi",
    "vulnerable": "văn-nơ-rơ-bồ",
    "protocols": "prô-tô-côn",
    "protocol": "prô-tô-côn",
    "nurse": "nơ-sơ",
    "hospital": "hóp-pi-tồ",
    "playground": "pờ-lây-grao",
    "photography": "phơ-tó-gra-phi",
    "camera": "ca-me-ra",
    "debates": "đi-bết",
    "debate": "đi-bết",
    "metrics": "mét-trích",
    "individuality": "in-đi-vi-du-e-li-ti",
    "schema": "sờ-ki-ma",
    "memory": "me-mơ-ri",
    "transfer": "trán-sphơ",
    "grammar": "gờ-ram-mơ",
    "explanation": "ếch-spla-nê-sơn",
    "study": "sờ-ta-di",
    "tip": "típ",
    "studyTip": "mẹo học",
    "John": "Gian",
    "Asian": "A-si-an",
    "A1": "A Một",
    "A2": "A Hai",
    "B1": "B Một",
    "B2": "B Hai",
    "C1": "C Một",
    "C2": "C Hai",
    "CEFR": "Xê e ép rờ",
    "Zalo": "Da-lô",
    "Google": "Gu-gồ",
    "Microsoft": "Mai-crô-sóp",
    "TTS": "Tê tê ét",
    "AI": "Ai",
    "API": "A bê i",
    "CORS": "Cót",
    "Local": "Lô-cần",
    "Online": "On-lai",
    "Offline": "Off-lai",
    "Web Speech": "Uét sờ-pít",
    "Speech": "Sờ-pít",
    "audio": "ao-đi-ô",
    "english": "Anh-lịch",
    "teacher": "ti-chơ",
    "teachers": "ti-chơ"
};

// Hàm tự động phát hiện và chuyển từ tiếng Anh đan xen thành phiên âm tiếng Việt gần đúng
function convertEnglishXenVi(text) {
    if (!text) return "";
    let processedText = text;
    
    // Sắp xếp các từ khóa theo chiều dài giảm dần để ưu tiên cụm từ dài trước (tránh thay thế từ con trước)
    const sortedKeys = Object.keys(englishToViPronunciationMap).sort((a, b) => b.length - a.length);
    
    for (const key of sortedKeys) {
        const value = englishToViPronunciationMap[key];
        const regex = new RegExp(`\\b${key}\\b`, 'gi');
        processedText = processedText.replace(regex, value);
    }
    
    return processedText;
}

// Thao tác với Cache API để lưu trữ âm thanh proxy TTS cục bộ trên trình duyệt
async function getCachedTtsAudioUrl(textUrl) {
    if (!('caches' in window)) {
        return textUrl; // Fallback gọi trực tiếp
    }
    
    try {
        const cache = await caches.open('cefr-tts-cache-v1');
        const cachedResponse = await cache.match(textUrl);
        
        if (cachedResponse) {
            const blob = await cachedResponse.blob();
            return URL.createObjectURL(blob);
        }
        
        const response = await fetch(textUrl);
        if (!response.ok) throw new Error("Không tải được âm thanh từ máy chủ");
        
        const responseToCache = response.clone();
        await cache.put(textUrl, responseToCache);
        
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    } catch (err) {
        console.warn("[Cache API] Lỗi bộ nhớ cache, dùng link trực tiếp:", err);
        return textUrl;
    }
}

// Chạy ngầm tải trước và lưu cache âm thanh giải thích cho một câu trắc nghiệm
function preloadExplanationAudio(qIdx) {
    const material = learningMaterialsDb[selectedLevel];
    if (!material || !material.questions[qIdx]) return;
    
    const question = material.questions[qIdx];
    
    // Biên soạn nội dung đọc tiếng Việt giống hệt lúc phát âm thanh thực tế
    let textToSpeak = `Câu hỏi số ${qIdx + 1}. Nội dung câu hỏi: ${question.qTranslation}. `;
    textToSpeak += `Giải thích ngữ pháp: ${question.explanation}. `;
    if (question.studyTip) {
        textToSpeak += `Mẹo học dành cho Thầy Cô: ${question.studyTip}`;
    }

    // Phiên âm từ tiếng Anh xen kẽ để khớp với URL cache thực tế
    const viText = convertEnglishXenVi(textToSpeak);
    const chunks = splitTextForGoogleTTS(viText);
    
    chunks.forEach(chunk => {
        const textUrl = `/api/tts?text=${encodeURIComponent(chunk)}`;
        getCachedTtsAudioUrl(textUrl).catch(() => {});
    });
}

// Tải trước giải thích của toàn bộ 3 câu hỏi trắc nghiệm của cấp độ hiện tại
function preloadAllPracticeExplanations() {
    console.log(`[Audio Preload] Đang chạy ngầm tải trước âm thanh giải thích cấp độ ${selectedLevel}...`);
    const material = learningMaterialsDb[selectedLevel];
    if (!material || !material.questions) return;
    
    for (let i = 0; i < material.questions.length; i++) {
        preloadExplanationAudio(i);
    }
}

// Xử lý thay đổi tốc độ đọc từ thanh trượt giao diện
function changeSpeechSpeed(val) {
    currentSpeechRate = parseFloat(val);
    
    // Cập nhật giá trị hiển thị trên UI
    const valEl = document.getElementById('speechSpeedValue');
    if (valEl) {
        valEl.innerText = `${currentSpeechRate.toFixed(2)}x`;
    }
    
    // Đồng bộ tốc độ cho thanh trượt input (đề phòng thay đổi từ JS)
    const inputEl = document.getElementById('speechSpeedRate');
    if (inputEl) {
        inputEl.value = currentSpeechRate;
    }
    
    // Áp dụng tốc độ tức thì cho Audio DOM đang phát
    const ttsPlayer = document.getElementById('learningTtsPlayer');
    if (ttsPlayer) {
        ttsPlayer.playbackRate = currentSpeechRate;
    }
    
    // Lưu cấu hình tốc độ đọc vào LocalStorage
    localStorage.setItem('cefr_speech_rate', currentSpeechRate);
}

// Khởi chạy chế độ học tập
function initLearningCoach() {
    // 0. Khôi phục cấu hình tốc độ đọc đã lưu
    const savedRate = localStorage.getItem('cefr_speech_rate');
    if (savedRate) {
        changeSpeechSpeed(savedRate);
    } else {
        changeSpeechSpeed(1.0);
    }

    // 1. Tải trước giọng nói tiếng Việt chuẩn
    preloadVietnameseVoice();
    
    // 2. Thử khôi phục trạng thái ôn tập từ LocalStorage
    const loaded = loadLearningState();
    if (loaded) {
        console.log("Đã khôi phục trạng thái ôn tập từ LocalStorage.");
        return;
    }

    selectedLevel = document.getElementById('learningLevelSelect').value || "A1";
    selectedMode = document.getElementById('learningModeSelect').value || "B";
    bilingualTheoryActive = true;
    
    // Đồng bộ hóa trạng thái song ngữ toàn hệ thống nếu đang bật
    if (typeof globalBilingualMode !== 'undefined') {
        bilingualTheoryActive = globalBilingualMode;
    }
    
    const btnBilingual = document.getElementById('btnBilingualTheoryToggle');
    if (btnBilingual) {
        if (bilingualTheoryActive) btnBilingual.classList.add('active');
        else btnBilingual.classList.remove('active');
    }

    loadCurrentLevelContent();
}

// Render Câu hỏi trắc nghiệm ra giao diện
function renderPracticeQuestions(material) {
    const practiceContainer = document.getElementById('practiceQuestionsContainer');
    practiceContainer.innerHTML = '';
    material.questions.forEach((qObj, qIdx) => {
        const qCard = document.createElement('div');
        qCard.className = 'bg-[#141b2d] border border-slate-800 rounded-xl p-4.5 space-y-3 relative';
        
        // Tiêu đề câu hỏi
        const qTitle = document.createElement('div');
        qTitle.className = 'text-slate-250 text-xs font-bold leading-normal';
        qTitle.innerHTML = `<span class="text-teal-400">Câu ${qIdx + 1}:</span> ${qObj.q}`;
        qCard.appendChild(qTitle);
        
        // Bản dịch câu hỏi
        const qTrans = document.createElement('div');
        qTrans.id = `learning-q-trans-${qIdx}`;
        qTrans.className = `text-[10.5px] text-slate-405 pl-4 border-l border-slate-800 ${bilingualTheoryActive ? '' : 'hidden'}`;
        qTrans.innerText = qObj.qTranslation;
        qCard.appendChild(qTrans);
        
        // Danh sách lựa chọn
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'flex flex-col gap-2 pt-1';
        
        qObj.options.forEach((opt, optIdx) => {
            const optBtn = document.createElement('div');
            optBtn.id = `learning-opt-${qIdx}-${optIdx}`;
            optBtn.className = 'flex items-center justify-between p-3 bg-[#0b0f19] border border-slate-850 hover:border-slate-700 rounded-xl cursor-pointer transition select-none text-xs text-slate-300';
            optBtn.onclick = () => trackOptionClick(qIdx, optIdx);
            
            const optText = document.createElement('span');
            optText.innerHTML = opt;
            optBtn.appendChild(optText);
            
            // Bản dịch lựa chọn
            const optTrans = document.createElement('span');
            optTrans.className = `option-translation text-[10.5px] text-slate-500 italic ml-2 ${bilingualTheoryActive ? '' : 'hidden'}`;
            optTrans.innerText = qObj.optionsTranslation[optIdx];
            optBtn.appendChild(optTrans);
            
            optionsDiv.appendChild(optBtn);
        });
        
        qCard.appendChild(optionsDiv);
        practiceContainer.appendChild(qCard);
    });
}

// Nạp nội dung lý thuyết & câu hỏi theo cấp độ được chọn
function loadCurrentLevelContent() {
    stopLearningTimers();
    stopAllSpeech();
    
    studySeconds = 0;
    dwellTimes = [0, 0, 0];
    optionSwitches = [0, 0, 0];
    currentSelectedAnswers = [null, null, null];
    activeQuestionIdx = 0;
    isQuizActive = false;

    // Reset bảng hiển thị chỉ số
    document.getElementById('statStudyTime').innerText = "00:00";
    document.getElementById('statHesitationCount').innerText = "0 lần";
    document.getElementById('statWorkStatus').className = "text-[10px] font-extrabold text-slate-500";
    document.getElementById('statWorkStatus').innerText = "Chưa bắt đầu";

    // Ẩn các card kết quả cũ
    document.getElementById('learningExplanationCard').classList.add('hidden');
    document.getElementById('coachSuggestionsContainer').classList.add('hidden');
    
    const material = learningMaterialsDb[selectedLevel];
    if (!material) return;

    // 1. Render Lý thuyết ở cột trái
    const theoryArea = document.getElementById('learningTheoryArea');
    theoryArea.innerHTML = `
        <h3 class="text-base font-extrabold text-white">${material.title}</h3>
        <p class="text-xs text-slate-400 italic">${material.description}</p>
        <div class="border-t border-slate-800/80 pt-3 mt-2 text-xs leading-relaxed space-y-3">
            ${material.theory}
        </div>
    `;

    // 2. Render Câu hỏi trắc nghiệm ở cột trái
    renderPracticeQuestions(material);

    // 3. Thiết lập chế độ hiển thị
    const theoryPane = document.getElementById('learningTheoryArea');
    const practicePane = document.getElementById('learningPracticeArea');
    const progressLabel = document.getElementById('practiceProgressLabel');
    const btnSwitch = document.getElementById('btnSwitchToPractice');
    const btnSubmit = document.getElementById('btnSubmitPractice');
    const translateBtn = document.getElementById('btnBilingualTheoryToggle');

    if (selectedMode === 'B') {
        // LỘ TRÌNH B: Học lý thuyết trước
        theoryPane.classList.remove('hidden');
        practicePane.classList.add('hidden');
        progressLabel.classList.add('hidden');
        btnSwitch.classList.remove('hidden');
        btnSubmit.classList.add('hidden');
        translateBtn.classList.remove('hidden');
        document.getElementById('learningContentHeader').innerText = "NỘI DUNG LÝ THUYẾT LỚP HỌC";
        document.getElementById('coachBubbleText').innerText = `Thầy/Cô hãy đọc kỹ lý thuyết song ngữ bài học ${material.title} ở cột bên trái. Sau khi nắm vững, hãy bấm nút "Bắt đầu Thực hành" để làm bài test kiểm tra kiến thức nhé!`;
    } else {
        // LỘ TRÌNH A: Thực hành trước
        theoryPane.classList.add('hidden');
        practicePane.classList.remove('hidden');
        progressLabel.classList.remove('hidden');
        btnSwitch.classList.add('hidden');
        btnSubmit.classList.remove('hidden');
        translateBtn.classList.add('hidden'); // Ẩn nút dịch bài đọc lý thuyết vì đang làm bài
        document.getElementById('learningContentHeader').innerText = "BÀI TẬP THỰC HÀNH CỦNG CỐ";
        document.getElementById('coachBubbleText').innerText = `Thầy/Cô đang ở lộ trình Thực hành trước. Hãy hoàn thành 3 câu trắc nghiệm nhanh ở bên dưới, hệ thống sẽ chấm điểm và chỉ ra các lỗ hổng kiến thức để dạy lý thuyết cho Thầy/Cô!`;
        
        isQuizActive = true;
        updatePracticeProgress();
        questionStartTime = Date.now();
        
        // Tải trước ngầm tất cả âm thanh giải thích ngữ pháp
        setTimeout(preloadAllPracticeExplanations, 1000);
    }

    // 4. Lưu trạng thái ôn tập khởi đầu
    saveLearningState();

    // 5. Kích hoạt bộ đếm thời gian học
    startStudyTimer();
}

// Bắt đầu đếm thời gian
function startStudyTimer() {
    studyTimerInterval = setInterval(() => {
        studySeconds++;
        const mins = Math.floor(studySeconds / 60).toString().padStart(2, '0');
        const secs = (studySeconds % 60).toString().padStart(2, '0');
        document.getElementById('statStudyTime').innerText = `${mins}:${secs}`;
        
        // Định kỳ lưu trạng thái ôn tập 3 giây một lần để đảm bảo chính xác thời gian
        if (studySeconds % 3 === 0) {
            saveLearningState();
        }
    }, 1000);
}

// Dừng tất cả bộ đếm thời gian
function stopLearningTimers() {
    if (studyTimerInterval) {
        clearInterval(studyTimerInterval);
        studyTimerInterval = null;
    }
}

// Chuyển sang phần trắc nghiệm trong Lộ trình B
function switchToPracticeMode() {
    const theoryPane = document.getElementById('learningTheoryArea');
    const practicePane = document.getElementById('learningPracticeArea');
    const progressLabel = document.getElementById('practiceProgressLabel');
    const btnSwitch = document.getElementById('btnSwitchToPractice');
    const btnSubmit = document.getElementById('btnSubmitPractice');

    theoryPane.classList.add('hidden');
    practicePane.classList.remove('hidden');
    progressLabel.classList.remove('hidden');
    btnSwitch.classList.add('hidden');
    btnSubmit.classList.remove('hidden');
    document.getElementById('learningContentHeader').innerText = "BÀI TẬP THỰC HÀNH CỦNG CỐ";

    isQuizActive = true;
    updatePracticeProgress();
    
    // Ghi nhận thời điểm bắt đầu làm bài trắc nghiệm
    questionStartTime = Date.now();
    document.getElementById('statWorkStatus').innerText = "Đang làm bài";
    document.getElementById('statWorkStatus').className = "text-[10px] font-extrabold text-blue-400 animate-pulse";
    
    document.getElementById('coachBubbleText').innerText = "Tuyệt vời! Bây giờ Thầy/Cô hãy tập trung làm 3 câu trắc nghiệm nhanh ở bên dưới. Đừng vội vàng, hãy đọc kỹ câu hỏi nhé!";
    
    // Tải trước ngầm tất cả âm thanh giải thích ngữ pháp
    setTimeout(preloadAllPracticeExplanations, 1000);
    
    // Lưu trạng thái ôn tập
    saveLearningState();
}

// Theo dõi việc click chọn đáp án
function trackOptionClick(qIdx, optIdx) {
    if (!isQuizActive) return;

    const prevSelected = currentSelectedAnswers[qIdx];
    
    // Nếu đã chọn rồi mà đổi sang đáp án khác -> ghi nhận đắn đo/phân vân
    if (prevSelected !== null && prevSelected !== optIdx) {
        optionSwitches[qIdx]++;
        const totalSwitches = optionSwitches.reduce((a, b) => a + b, 0);
        document.getElementById('statHesitationCount').innerText = `${totalSwitches} lần`;
    }

    currentSelectedAnswers[qIdx] = optIdx;

    // Render lại style của các tùy chọn
    const material = learningMaterialsDb[selectedLevel];
    material.questions[qIdx].options.forEach((_, idx) => {
        const btn = document.getElementById(`learning-opt-${qIdx}-${idx}`);
        if (btn) {
            if (idx === optIdx) {
                // Style khi được chọn
                btn.className = 'flex items-center justify-between p-3 bg-blue-950/40 border border-blue-500 text-blue-400 rounded-xl cursor-pointer transition select-none text-xs font-bold';
            } else {
                // Style mặc định
                btn.className = 'flex items-center justify-between p-3 bg-[#0b0f19] border border-slate-850 hover:border-slate-700 rounded-xl cursor-pointer transition select-none text-xs text-slate-300';
            }
        }
    });

    // Tính toán phân bổ thời gian dwell time cho từng câu hỏi khi đổi câu
    // Đơn giản là lấy thời gian kể từ mốc trước cộng dồn vào câu vừa thao tác gần nhất
    const now = Date.now();
    const elapsedSeconds = Math.round((now - questionStartTime) / 1000);
    dwellTimes[qIdx] += elapsedSeconds;
    questionStartTime = now;

    updatePracticeProgress();
    
    // Lưu trạng thái ôn tập
    saveLearningState();
}

// Cập nhật nhãn tiến trình làm bài
function updatePracticeProgress() {
    const answeredCount = currentSelectedAnswers.filter(ans => ans !== null).length;
    document.getElementById('practiceProgressLabel').innerText = `Tiến trình: ${answeredCount} / 3 câu`;
}

// Lấy tổng số lần đắn đo thay đổi đáp án
function getTotalOptionSwitches() {
    return optionSwitches.reduce((a, b) => a + b, 0);
}

// Nộp bài & Gọi API Gemini phân tích hành vi
async function submitPracticeQuiz() {
    if (!isQuizActive) return;

    // Kiểm tra xem đã làm hết câu hỏi chưa
    const unansweredIdx = currentSelectedAnswers.findIndex(ans => ans === null);
    if (unansweredIdx !== -1) {
        alert("Thầy/Cô vui lòng hoàn thành tất cả 3 câu hỏi trước khi nộp bài nhé!");
        return;
    }

    // Cộng dồn nốt thời gian của câu hỏi cuối cùng
    const now = Date.now();
    const elapsedSeconds = Math.round((now - questionStartTime) / 1000);
    // Cộng vào câu cuối được thao tác
    const lastActiveIdx = currentSelectedAnswers.length - 1;
    dwellTimes[lastActiveIdx] += elapsedSeconds;

    isQuizActive = false;
    stopLearningTimers();

    // Hiển thị trạng thái phân tích
    document.getElementById('statWorkStatus').innerText = "Đang phân tích...";
    document.getElementById('statWorkStatus').className = "text-[10px] font-extrabold text-amber-400 animate-pulse";
    
    // Đóng băng click vào options
    const options = document.querySelectorAll('#practiceQuestionsContainer div[id*="learning-opt-"]');
    options.forEach(opt => opt.onclick = null);

    // Tính toán kết quả bài làm
    const material = learningMaterialsDb[selectedLevel];
    let correctCount = 0;
    const mistakes = [];

    currentSelectedAnswers.forEach((ans, qIdx) => {
        const question = material.questions[qIdx];
        if (ans === question.correct) {
            correctCount++;
        } else {
            mistakes.push(`Câu ${qIdx + 1}: Thầy/Cô chọn "${question.options[ans]}" nhưng đáp án đúng là "${question.options[question.correct]}".`);
        }
    });

    // Phát hiện làm ẩu (Rushing): Có câu làm sai và thời gian làm câu đó dưới 5 giây
    let rushingDetected = false;
    currentSelectedAnswers.forEach((ans, qIdx) => {
        const question = material.questions[qIdx];
        if (ans !== question.correct && dwellTimes[qIdx] < 5) {
            rushingDetected = true;
        }
    });

    // Chuẩn bị payload gửi lên backend
    const payload = {
        teacherName: typeof teacherName !== 'undefined' ? teacherName : "Giáo viên phổ thông",
        level: selectedLevel,
        mode: selectedMode,
        results: {
            score: `${correctCount}/${material.questions.length}`,
            mistakes: mistakes
        },
        metrics: {
            dwellTimePerQ: dwellTimes,
            optionSwitchesPerQ: optionSwitches,
            rushingFlag: rushingDetected
        }
    };

    // Hiển thị trạng thái chờ của Trợ lý ảo
    document.getElementById('coachBubbleText').innerHTML = `
        <div class="flex items-center gap-2 text-blue-400">
            <i class="fa-solid fa-spinner animate-spin"></i>
            <span>Đang gửi kết quả làm bài của Thầy/Cô lên HLV ảo Gemini để phân tích hành vi...</span>
        </div>
    `;
    document.getElementById('coachSuggestionsContainer').classList.add('hidden');

    try {
        const response = await fetch('/api/coach-feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const resData = await response.json();
        if (resData.success && resData.data) {
            const aiResult = resData.data;

            // 1. Cập nhật hội thoại từ HLV ảo
            document.getElementById('coachBubbleText').innerText = aiResult.coachMessage;
            
            // 2. Cập nhật danh sách gợi ý
            const suggestionsList = document.getElementById('coachSuggestionsList');
            suggestionsList.innerHTML = '';
            if (Array.isArray(aiResult.suggestions)) {
                aiResult.suggestions.forEach(sug => {
                    const li = document.createElement('li');
                    li.innerText = sug;
                    suggestionsList.appendChild(li);
                });
                document.getElementById('coachSuggestionsContainer').classList.remove('hidden');
            }

            // 3. Cập nhật chỉ số trạng thái công việc
            const statusEl = document.getElementById('statWorkStatus');
            if (correctCount === 3) {
                statusEl.innerText = "Xuất sắc (3/3)";
                statusEl.className = "text-[10px] font-extrabold text-green-450";
            } else if (correctCount === 2) {
                statusEl.innerText = "Khá (2/3)";
                statusEl.className = "text-[10px] font-extrabold text-teal-400";
            } else {
                statusEl.innerText = "Cần cố gắng";
                statusEl.className = "text-[10px] font-extrabold text-rose-400";
            }

        } else {
            throw new Error(resData.error || "Không nhận được phản hồi từ AI");
        }

    } catch (err) {
        console.error("Lỗi HLV ảo:", err);
        document.getElementById('coachBubbleText').innerText = `Em đã ghi nhận kết quả làm bài của Thầy/Cô đạt ${correctCount}/3 câu. Do có lỗi kết nối mạng nên HLV ảo chưa phân tích hành vi trực tuyến được. Thầy/Cô hãy xem phần giải thích đáp án chi tiết ở bảng bên dưới nhé!`;
        document.getElementById('statWorkStatus').innerText = "Hoàn thành";
        document.getElementById('statWorkStatus').className = "text-[10px] font-extrabold text-slate-350";
    }

    // 4. Hiển thị giải thích đáp án chi tiết từng câu hỏi dưới giao diện
    renderPracticeExplanations(correctCount);

    // 5. Lưu trạng thái ôn tập sau khi nộp bài và nhận phản hồi
    saveLearningState();
}

// Hiển thị đáp án đúng/sai trực quan và khung giải thích
function renderPracticeExplanations(correctCount) {
    const material = learningMaterialsDb[selectedLevel];
    
    // Highlight màu sắc trên danh sách câu hỏi
    currentSelectedAnswers.forEach((ans, qIdx) => {
        const question = material.questions[qIdx];
        
        question.options.forEach((_, idx) => {
            const btn = document.getElementById(`learning-opt-${qIdx}-${idx}`);
            if (!btn) return;

            // Xóa hết class click cũ
            btn.className = 'flex items-center justify-between p-3 rounded-xl text-xs select-none';

            if (idx === question.correct) {
                // ĐÁP ÁN ĐÚNG: Luôn được viền xanh lá
                btn.classList.add('bg-green-950/20', 'border-2', 'border-green-500', 'text-green-400', 'font-bold');
            } else if (idx === ans && ans !== question.correct) {
                // ĐÁP ÁN GV CHỌN SAI: Viền đỏ
                btn.classList.add('bg-rose-950/20', 'border-2', 'border-rose-500', 'text-rose-400', 'font-bold');
            } else {
                // Các tùy chọn khác: Mờ đi
                btn.classList.add('bg-[#0b0f19]/40', 'border', 'border-slate-900', 'text-slate-500');
            }
        });
    });

    // Render giải thích ở cột phải
    const explanationContent = document.getElementById('learningExplanationContent');
    explanationContent.innerHTML = '';

    material.questions.forEach((qObj, qIdx) => {
        const expDiv = document.createElement('div');
        expDiv.className = 'p-3.5 bg-[#141b2d] border border-slate-800 rounded-xl space-y-2.5 shadow-md';
        
        const isCorrect = currentSelectedAnswers[qIdx] === qObj.correct;
        const statusBadge = isCorrect 
            ? '<span class="text-green-450 font-bold text-xs"><i class="fa-solid fa-circle-check"></i> Đúng</span>'
            : '<span class="text-rose-450 font-bold text-xs"><i class="fa-solid fa-circle-xmark"></i> Sai</span>';

        // Tạo thẻ "Mẹo học" nếu làm sai và có studyTip
        let tipHtml = '';
        if (!isCorrect && qObj.studyTip) {
            tipHtml = `
                <div class="mt-2 p-2.5 bg-amber-950/20 border border-amber-500/25 text-amber-300 rounded-lg text-[10.5px] leading-relaxed flex items-start gap-1.5 shadow-sm shadow-amber-500/5">
                    <i class="fa-solid fa-circle-info text-amber-500 text-xs mt-0.5 shrink-0"></i>
                    <div>
                        <strong class="text-amber-400">Mẹo học cho Thầy/Cô:</strong> ${qObj.studyTip}
                    </div>
                </div>
            `;
        }

        expDiv.innerHTML = `
            <div class="flex justify-between items-center border-b border-slate-850 pb-2 mb-2">
                <strong class="text-slate-200 text-xs">Câu hỏi số ${qIdx + 1}</strong>
                <div class="flex items-center gap-2">
                    <button id="btn-speak-exp-${qIdx}" onclick="speakExplanation(${qIdx})" class="px-2.5 py-1 bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded-lg transition-all flex items-center hover:bg-emerald-900/30 focus:outline-none" title="Phát âm thanh giải thích câu này">
                        <i class="fa-solid fa-volume-high text-emerald-450 mr-1"></i> Nghe giải thích
                    </button>
                    ${statusBadge}
                </div>
            </div>
            <p class="text-slate-300 italic text-[11px] font-medium">"${qObj.q}"</p>
            <p class="text-[10.5px] text-slate-450 italic leading-normal pl-3 border-l border-slate-800">${qObj.qTranslation}</p>
            <div class="space-y-1 mt-1.5">
                <p class="text-[10.5px] text-slate-350 font-semibold flex items-center gap-1"><i class="fa-solid fa-lightbulb text-teal-400 text-xs"></i> Giải thích ngữ pháp:</p>
                <p class="text-[10.5px] text-slate-400 leading-normal pl-3 border-l border-emerald-500">${qObj.explanation}</p>
            </div>
            ${tipHtml}
        `;
        explanationContent.appendChild(expDiv);
    });

    document.getElementById('learningExplanationCard').classList.remove('hidden');
    
    // Ẩn các nút hành động ôn luyện
    document.getElementById('btnSubmitPractice').classList.add('hidden');
    document.getElementById('btnSwitchToPractice').classList.add('hidden');
}

// Bật/tắt song ngữ trong phần Lý thuyết bài học
function toggleBilingualTheory() {
    bilingualTheoryActive = !bilingualTheoryActive;
    
    const btn = document.getElementById('btnBilingualTheoryToggle');
    if (bilingualTheoryActive) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
    }

    // Hiển thị/ẩn tất cả các thẻ dịch tiếng Việt trong màn hình ôn luyện
    const translationElements = document.querySelectorAll('#screen-learning-practice [id*="-trans-"], #screen-learning-practice .option-translation');
    translationElements.forEach(el => {
        if (bilingualTheoryActive) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });
}

// Sự kiện thay đổi cấp độ
function changeLearningLevel(val) {
    selectedLevel = val;
    loadCurrentLevelContent();
}

// Sự kiện thay đổi lộ trình (học trước hay thực hành trước)
function changeLearningMode(val) {
    selectedMode = val;
    loadCurrentLevelContent();
}

// --- CÁC HÀM HỖ TRỢ GIỌNG NÓI THÔNG MINH (TTS) & PHÓNG TO ---

// Tải trước danh sách giọng đọc tiếng Việt của Web Speech API
function preloadVietnameseVoice() {
    if (!('speechSynthesis' in window)) return;
    
    const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (!voices || voices.length === 0) return;

        // 1. Lọc tất cả các giọng tiếng Việt (lang bắt đầu bằng "vi")
        const viVoices = voices.filter(v => v.lang.toLowerCase().replace('_', '-').startsWith('vi'));
        
        // 2. Loại bỏ các giọng có tên là giọng nam hoặc chứa từ khóa nam
        const femaleViVoices = viVoices.filter(v => {
            const nameLower = v.name.toLowerCase();
            return !nameLower.includes('an') && 
                   !nameLower.includes('male') && 
                   !nameLower.includes('nam') && 
                   !nameLower.includes('boy') && 
                   !nameLower.includes('man') &&
                   !nameLower.includes('david') && 
                   !nameLower.includes('mark') && 
                   !nameLower.includes('george') &&
                   !nameLower.includes('local-male');
        });

        // 3. Ưu tiên: Google vi-VN (nữ), Microsoft HoaiMy (nữ), rồi đến bất kỳ giọng nữ tiếng Việt nào khác
        viSpeechVoice = femaleViVoices.find(v => v.name.toLowerCase().includes('google') && !v.name.toLowerCase().includes('local-male')) ||
                         femaleViVoices.find(v => v.name.toLowerCase().includes('hoaimy')) ||
                         femaleViVoices.find(v => v.name.toLowerCase().includes('natural')) ||
                         femaleViVoices[0] || null;

        if (viSpeechVoice) {
            console.log("Đã nạp giọng nữ tiếng Việt chuẩn chất lượng cao:", viSpeechVoice.name);
        } else {
            console.warn("Không tìm thấy giọng nữ tiếng Việt nào phù hợp. Sẽ im lặng khi Google TTS lỗi để tránh giọng nam lỗi.");
        }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }
}

// Dừng tất cả giọng nói đang phát (cả Google TTS và Web Speech API)
function stopAllSpeech() {
    // 1. Dừng Web Speech API
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
    lectureSpeechUtterance = null;
    explanationSpeechUtterance = null;

    // 2. Dừng Google TTS Audio (sử dụng cả thẻ DOM ẩn)
    isAudioPlaying = false;
    const ttsPlayer = document.getElementById('learningTtsPlayer');
    if (ttsPlayer) {
        ttsPlayer.pause();
        ttsPlayer.src = "";
    }
    if (currentHtmlAudio) {
        currentHtmlAudio.pause();
        currentHtmlAudio.src = "";
        currentHtmlAudio = null;
    }
    googleAudioQueue = [];
    currentAudioIndex = 0;
    
    // Khôi phục nút Giảng bài
    const btnPlayLectureText = document.getElementById('btnPlayLectureText');
    const btnPlayLectureIcon = document.getElementById('btnPlayLectureIcon');
    if (btnPlayLectureText && btnPlayLectureIcon) {
        btnPlayLectureText.innerText = "Giảng bài";
        btnPlayLectureIcon.className = "fa-solid fa-volume-high text-white";
    }

    // Khôi phục tất cả nút Nghe giải thích về mặc định
    if (currentPlayingSpeechIdx !== null) {
        updateExplanationSpeechUI(currentPlayingSpeechIdx, false);
        currentPlayingSpeechIdx = null;
    }
}

// Chia nhỏ văn bản tiếng Việt thành các đoạn dưới 180 ký tự để Google Translate TTS hoạt động ổn định
function splitTextForGoogleTTS(text) {
    const limit = 180;
    const sentences = text.match(/[^.!?，。]+[.!?，。]*/g) || [text];
    const chunks = [];
    let currentChunk = "";

    for (let sentence of sentences) {
        sentence = sentence.trim();
        if (!sentence) continue;

        if ((currentChunk + " " + sentence).length <= limit) {
            currentChunk += (currentChunk ? " " : "") + sentence;
        } else {
            if (currentChunk) {
                chunks.push(currentChunk);
            }
            if (sentence.length > limit) {
                const subParts = sentence.split(/[,，;；]/);
                let subChunk = "";
                for (let part of subParts) {
                    part = part.trim();
                    if ((subChunk + " " + part).length <= limit) {
                        subChunk += (subChunk ? ", " : "") + part;
                    } else {
                        if (subChunk) chunks.push(subChunk);
                        subChunk = part;
                    }
                }
                if (subChunk) currentChunk = subChunk;
            } else {
                currentChunk = sentence;
            }
        }
    }
    if (currentChunk) {
        chunks.push(currentChunk);
    }
    return chunks;
}

// Chạy hàng đợi phát Google Translate TTS
function playGoogleTTSQueue(text, onStartCallback, onEndCallback, onErrorCallback) {
    const chunks = splitTextForGoogleTTS(text);
    if (chunks.length === 0) {
        if (onErrorCallback) onErrorCallback();
        return;
    }

    googleAudioQueue = chunks.map(chunk => {
        return `/api/tts?text=${encodeURIComponent(chunk)}`;
    });

    currentAudioIndex = 0;
    isAudioPlaying = true;
    if (onStartCallback) onStartCallback();

    playNextAudioInQueue(onEndCallback, onErrorCallback);
}

// Phát phần tử tiếp theo trong hàng đợi Google TTS
async function playNextAudioInQueue(onEndCallback, onErrorCallback) {
    if (!isAudioPlaying) return;

    if (currentAudioIndex >= googleAudioQueue.length) {
        isAudioPlaying = false;
        ttsRetryCount = 0; // Reset số lần thử lại
        if (onEndCallback) onEndCallback();
        return;
    }

    const rawUrl = googleAudioQueue[currentAudioIndex];
    const ttsPlayer = document.getElementById('learningTtsPlayer');

    try {
        // Lấy hoặc tải Blob âm thanh từ Cache API
        const url = await getCachedTtsAudioUrl(rawUrl);

        if (ttsPlayer) {
            // Giải phóng Object URL cũ để tránh rò rỉ bộ nhớ
            if (ttsPlayer.src && ttsPlayer.src.startsWith('blob:')) {
                URL.revokeObjectURL(ttsPlayer.src);
            }
            
            // Sử dụng phần tử audio DOM ẩn
            ttsPlayer.src = url;
            
            ttsPlayer.onended = () => {
                currentAudioIndex++;
                ttsRetryCount = 0; // Reset số lần thử lại cho đoạn tiếp theo
                playNextAudioInQueue(onEndCallback, onErrorCallback);
            };

            ttsPlayer.onerror = (e) => {
                console.error("Lỗi phát audio Google TTS qua DOM:", e);
                
                // Cơ chế tự động thử lại 2 lần khi bị ngắt kết nối mạng hoặc lỗi server tạm thời
                if (ttsRetryCount < 2) {
                    ttsRetryCount++;
                    console.log(`Đang thử lại lần thứ ${ttsRetryCount} cho đoạn âm thanh index ${currentAudioIndex} sau 800ms...`);
                    setTimeout(async () => {
                        if (isAudioPlaying) {
                            const retryUrl = await getCachedTtsAudioUrl(rawUrl);
                            ttsPlayer.src = retryUrl;
                            ttsPlayer.play().then(() => {
                                ttsPlayer.playbackRate = currentSpeechRate;
                            }).catch(err => console.error("Lỗi phát lại audio:", err));
                        }
                    }, 800);
                } else {
                    ttsRetryCount = 0; // Reset
                    if (onErrorCallback) onErrorCallback();
                }
            };

            ttsPlayer.play().then(() => {
                ttsPlayer.playbackRate = currentSpeechRate; // Áp dụng đúng tốc độ đọc đã lưu
            }).catch(err => {
                console.error("Lỗi trình duyệt chặn phát audio Google TTS DOM:", err);
                if (onErrorCallback) onErrorCallback();
            });
        } else {
            // Sử dụng Audio JavaScript động nếu không tìm thấy thẻ DOM
            if (currentHtmlAudio && currentHtmlAudio.src && currentHtmlAudio.src.startsWith('blob:')) {
                URL.revokeObjectURL(currentHtmlAudio.src);
            }
            currentHtmlAudio = new Audio(url);

            currentHtmlAudio.onended = () => {
                currentAudioIndex++;
                ttsRetryCount = 0;
                playNextAudioInQueue(onEndCallback, onErrorCallback);
            };

            currentHtmlAudio.onerror = (e) => {
                console.error("Lỗi phát audio Google TTS động:", e);
                if (ttsRetryCount < 2) {
                    ttsRetryCount++;
                    setTimeout(async () => {
                        if (isAudioPlaying) {
                            const retryUrl = await getCachedTtsAudioUrl(rawUrl);
                            currentHtmlAudio.src = retryUrl;
                            currentHtmlAudio.play().then(() => {
                                currentHtmlAudio.playbackRate = currentSpeechRate;
                            }).catch(err => console.error("Lỗi phát lại audio động:", err));
                        }
                    }, 800);
                } else {
                    ttsRetryCount = 0;
                    if (onErrorCallback) onErrorCallback();
                }
            };

            currentHtmlAudio.play().then(() => {
                currentHtmlAudio.playbackRate = currentSpeechRate;
            }).catch(err => {
                console.error("Lỗi trình duyệt chặn phát audio Google TTS động:", err);
                if (onErrorCallback) onErrorCallback();
            });
        }
    } catch (err) {
        console.error("Lỗi lấy âm thanh từ Cache API:", err);
        if (onErrorCallback) onErrorCallback();
    }
}

// Phát giọng nói thông qua Web Speech API (Hàm dự phòng ngoại tuyến)
function speakWithWebSpeech(text, onStartCallback, onEndCallback, onErrorCallback) {
    if (!('speechSynthesis' in window)) {
        if (onErrorCallback) onErrorCallback();
        return;
    }

    // CHỈ phát Web Speech nếu có giọng nữ tiếng Việt chuẩn chất lượng cao để tránh giọng thô nam lỗi
    if (!viSpeechVoice) {
        console.warn("Không tìm thấy giọng nữ tiếng Việt chất lượng cao. Bỏ qua phát Web Speech.");
        if (onErrorCallback) onErrorCallback();
        return;
    }

    window.speechSynthesis.cancel();
    
    // Tách văn bản thành câu ngắn tránh bị timeout
    const sentences = text.split(/[.!?]/).filter(s => s.trim().length > 0);
    let sIdx = 0;

    const speakSentence = () => {
        if (sIdx >= sentences.length) {
            if (onEndCallback) onEndCallback();
            return;
        }

        const sentenceText = sentences[sIdx].trim();
        const utterance = new SpeechSynthesisUtterance(sentenceText);
        utterance.voice = viSpeechVoice;
        utterance.lang = "vi-VN"; // Gán cụ thể mã ngôn ngữ tiếng Việt để trình duyệt xử lý tối ưu
        utterance.rate = currentSpeechRate; // Áp dụng tốc độ đọc đã lưu

        utterance.onstart = () => {
            if (sIdx === 0 && onStartCallback) onStartCallback();
        };

        utterance.onend = () => {
            sIdx++;
            speakSentence();
        };

        utterance.onerror = (e) => {
            console.error("Lỗi Web Speech API ở câu:", sentenceText, e);
            if (e.error !== 'interrupted' && e.error !== 'canceled') {
                if (onErrorCallback) onErrorCallback();
            }
        };

        lectureSpeechUtterance = utterance;
        window.speechSynthesis.speak(utterance);
    };

    speakSentence();
}

// Hàm phát giọng nói thông minh kết hợp Google TTS và Web Speech API làm dự phòng
function speakSmart(text, onStartCallback, onEndCallback) {
    stopAllSpeech(); // Dừng các âm thanh đang phát trước
    ttsRetryCount = 0; // Reset số lần thử lại
    
    // Tự động chuyển đổi các từ tiếng Anh xen kẽ sang phiên âm tiếng Việt trước khi đọc
    const viText = convertEnglishXenVi(text);
    
    // Gọi Google TTS với giọng chuẩn tiếng Việt (nữ), nếu lỗi sẽ tự động fallback sang Web Speech nếu có giọng tốt
    playGoogleTTSQueue(
        viText,
        onStartCallback,
        onEndCallback,
        () => {
            if (viSpeechVoice) {
                console.warn("Chuyển hướng dự phòng sang Web Speech API chất lượng cao...");
                speakWithWebSpeech(viText, onStartCallback, onEndCallback, () => {
                    stopAllSpeech();
                });
            } else {
                console.error("Google TTS lỗi và không tìm thấy giọng Web Speech tiếng Việt nữ chất lượng cao để dự phòng.");
                // Dừng phát và giữ im lặng thay vì phát ra giọng nam lỗi
                stopAllSpeech();
            }
        }
    );
}

// Bật/Tắt phát giọng nói bài giảng lý thuyết
function toggleLectureSpeech() {
    // Nếu đang phát bài giảng, nhấn nút sẽ dừng phát
    if ((isAudioPlaying && googleAudioQueue.length > 0) || (window.speechSynthesis.speaking && lectureSpeechUtterance)) {
        stopAllSpeech();
        return;
    }

    const material = learningMaterialsDb[selectedLevel];
    if (!material || !material.lectureText) {
        alert("Không tìm thấy nội dung bài giảng cho trình độ này.");
        return;
    }

    const btnPlayLectureText = document.getElementById('btnPlayLectureText');
    const btnPlayLectureIcon = document.getElementById('btnPlayLectureIcon');

    speakSmart(
        material.lectureText,
        () => {
            if (btnPlayLectureText && btnPlayLectureIcon) {
                btnPlayLectureText.innerText = "Dừng giảng";
                btnPlayLectureIcon.className = "fa-solid fa-circle-stop text-red-405 animate-pulse";
            }
        },
        () => {
            stopAllSpeech();
        }
    );
}

// Phát âm thanh giải thích đáp án và mẹo học cho từng câu hỏi
function speakExplanation(qIdx) {
    // Nếu đang phát chính câu này, nhấn lại sẽ dừng
    if (currentPlayingSpeechIdx === qIdx) {
        stopAllSpeech();
        return;
    }

    const material = learningMaterialsDb[selectedLevel];
    if (!material || !material.questions[qIdx]) return;

    const question = material.questions[qIdx];
    
    // Biên soạn nội dung đọc bằng tiếng Việt
    let textToSpeak = `Câu hỏi số ${qIdx + 1}. Nội dung câu hỏi: ${question.qTranslation}. `;
    textToSpeak += `Giải thích ngữ pháp: ${question.explanation}. `;
    if (question.studyTip) {
        textToSpeak += `Mẹo học dành cho Thầy Cô: ${question.studyTip}`;
    }

    currentPlayingSpeechIdx = qIdx;

    speakSmart(
        textToSpeak,
        () => {
            updateExplanationSpeechUI(qIdx, true);
        },
        () => {
            stopAllSpeech();
        }
    );
}

// Cập nhật giao diện của nút Nghe giải thích tương ứng khi phát/dừng
function updateExplanationSpeechUI(qIdx, isPlaying) {
    const btn = document.getElementById(`btn-speak-exp-${qIdx}`);
    if (btn) {
        if (isPlaying) {
            btn.innerHTML = `<i class="fa-solid fa-circle-stop text-red-400 mr-1 animate-pulse"></i> Dừng nghe`;
            btn.className = "px-2.5 py-1 bg-red-950/40 text-red-450 border border-red-500/30 text-[10px] font-bold rounded-lg transition-all flex items-center";
        } else {
            btn.innerHTML = `<i class="fa-solid fa-volume-high text-emerald-450 mr-1"></i> Nghe giải thích`;
            btn.className = "px-2.5 py-1 bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded-lg transition-all flex items-center hover:bg-emerald-900/30 focus:outline-none";
        }
    }
}

// Phóng to / Thu nhỏ khung giải thích chi tiết đáp án
function toggleZoomExplanation() {
    const card = document.getElementById('learningExplanationCard');
    const icon = document.getElementById('zoomExplanationIcon');
    const text = document.getElementById('zoomExplanationText');
    
    if (!card) return;
    
    const isZoomed = card.classList.contains('explanation-zoomed');
    
    if (isZoomed) {
        // Thu nhỏ lại
        card.classList.remove('explanation-zoomed');
        if (icon) {
            icon.className = "fa-solid fa-maximize text-slate-400";
        }
        if (text) {
            text.innerText = "Phóng to";
        }
        
        // Loại bỏ lớp phủ backdrop
        const overlay = document.getElementById('explanationOverlay');
        if (overlay) {
            overlay.remove();
        }
    } else {
        // Phóng to ra
        card.classList.add('explanation-zoomed');
        if (icon) {
            icon.className = "fa-solid fa-minimize text-emerald-450";
        }
        if (text) {
            text.innerText = "Thu nhỏ";
        }
        
        // Tạo lớp phủ backdrop mờ phía dưới
        const overlay = document.createElement('div');
        overlay.id = 'explanationOverlay';
        overlay.onclick = toggleZoomExplanation; // Bấm ra ngoài lớp phủ cũng tự động thu nhỏ
        document.body.appendChild(overlay);
    }
}

// --- CƠ CHẾ LOCALSTORAGE ĐỂ LƯU TRẠNG THÁI ÔN TẬP ---

// Lưu trạng thái ôn tập hiện tại của giáo viên vào LocalStorage
function saveLearningState() {
    const statusEl = document.getElementById('statWorkStatus');
    const explanationCard = document.getElementById('learningExplanationCard');
    
    const isSubmitted = !isQuizActive && 
                        statusEl && statusEl.innerText !== "Chưa bắt đầu" && 
                        explanationCard && !explanationCard.classList.contains('hidden');

    const state = {
        selectedLevel,
        selectedMode,
        studySeconds,
        currentSelectedAnswers,
        dwellTimes,
        optionSwitches,
        isQuizActive,
        isSubmitted,
        correctCount: currentSelectedAnswers.reduce((count, ans, qIdx) => {
            const material = learningMaterialsDb[selectedLevel];
            if (!material || ans === null) return count;
            return count + (ans === material.questions[qIdx].correct ? 1 : 0);
        }, 0),
        coachBubbleText: document.getElementById('coachBubbleText').innerHTML,
        coachSuggestionsHidden: document.getElementById('coachSuggestionsContainer').classList.contains('hidden'),
        coachSuggestionsListHtml: document.getElementById('coachSuggestionsList').innerHTML,
        statWorkStatusText: statusEl ? statusEl.innerText : "Chưa bắt đầu",
        statWorkStatusClass: statusEl ? statusEl.className : "text-[10px] font-extrabold text-slate-500"
    };

    localStorage.setItem('cefr_learning_state_v2', JSON.stringify(state));
}

// Khôi phục trạng thái ôn tập từ LocalStorage
function loadLearningState() {
    const raw = localStorage.getItem('cefr_learning_state_v2');
    if (!raw) return false;

    try {
        const state = JSON.parse(raw);
        selectedLevel = state.selectedLevel || "A1";
        selectedMode = state.selectedMode || "B";
        studySeconds = state.studySeconds || 0;
        currentSelectedAnswers = state.currentSelectedAnswers || [null, null, null];
        dwellTimes = state.dwellTimes || [0, 0, 0];
        optionSwitches = state.optionSwitches || [0, 0, 0];
        isQuizActive = state.isQuizActive || false;

        // Cập nhật lại giá trị trên các dropdown bộ chọn cấp độ và lộ trình
        const levelSelect = document.getElementById('learningLevelSelect');
        const modeSelect = document.getElementById('learningModeSelect');
        if (levelSelect) levelSelect.value = selectedLevel;
        if (modeSelect) modeSelect.value = selectedMode;

        // Cập nhật các thông số hiển thị
        const mins = Math.floor(studySeconds / 60).toString().padStart(2, '0');
        const secs = (studySeconds % 60).toString().padStart(2, '0');
        document.getElementById('statStudyTime').innerText = `${mins}:${secs}`;
        
        const totalSwitches = optionSwitches.reduce((a, b) => a + b, 0);
        document.getElementById('statHesitationCount').innerText = `${totalSwitches} lần`;

        const statusEl = document.getElementById('statWorkStatus');
        if (statusEl) {
            statusEl.innerText = state.statWorkStatusText || "Chưa bắt đầu";
            statusEl.className = state.statWorkStatusClass || "text-[10px] font-extrabold text-slate-500";
        }

        const material = learningMaterialsDb[selectedLevel];
        if (!material) return false;

        // Render lại Lý thuyết ở cột trái
        const theoryArea = document.getElementById('learningTheoryArea');
        theoryArea.innerHTML = `
            <h3 class="text-base font-extrabold text-white">${material.title}</h3>
            <p class="text-xs text-slate-400 italic">${material.description}</p>
            <div class="border-t border-slate-800/80 pt-3 mt-2 text-xs leading-relaxed space-y-3">
                ${material.theory}
            </div>
        `;

        // Render lại câu hỏi trắc nghiệm
        renderPracticeQuestions(material);

        const theoryPane = document.getElementById('learningTheoryArea');
        const practicePane = document.getElementById('learningPracticeArea');
        const progressLabel = document.getElementById('practiceProgressLabel');
        const btnSwitch = document.getElementById('btnSwitchToPractice');
        const btnSubmit = document.getElementById('btnSubmitPractice');
        const translateBtn = document.getElementById('btnBilingualTheoryToggle');

        if (state.isSubmitted) {
            // Nếu trạng thái trước đó là đã nộp bài
            theoryPane.classList.add('hidden');
            practicePane.classList.remove('hidden');
            progressLabel.classList.remove('hidden');
            btnSwitch.classList.add('hidden');
            btnSubmit.classList.add('hidden');
            translateBtn.classList.add('hidden');
            document.getElementById('learningContentHeader').innerText = "BÀI TẬP THỰC HÀNH CỦNG CỐ";
            
            // Vẽ lại style đúng/sai của các đáp án và bảng giải thích
            renderPracticeExplanations(state.correctCount);
            
            // Phục hồi lại bóng thoại tư vấn của AI
            document.getElementById('coachBubbleText').innerHTML = state.coachBubbleText;
            if (!state.coachSuggestionsHidden) {
                document.getElementById('coachSuggestionsList').innerHTML = state.coachSuggestionsListHtml;
                document.getElementById('coachSuggestionsContainer').classList.remove('hidden');
            }
        } else {
            // Nếu trạng thái trước đó là chưa nộp
            if (isQuizActive) {
                // Đang làm trắc nghiệm dở dang
                theoryPane.classList.add('hidden');
                practicePane.classList.remove('hidden');
                progressLabel.classList.remove('hidden');
                btnSwitch.classList.add('hidden');
                btnSubmit.classList.remove('hidden');
                translateBtn.classList.add('hidden');
                document.getElementById('learningContentHeader').innerText = "BÀI TẬP THỰC HÀNH CỦNG CỐ";
                
                // Khôi phục các style nút đáp án đã chọn
                restoreSelectedOptionsStyle(material);
                updatePracticeProgress();
                questionStartTime = Date.now();
            } else {
                // Đang học lý thuyết
                theoryPane.classList.remove('hidden');
                practicePane.classList.add('hidden');
                progressLabel.classList.add('hidden');
                btnSwitch.classList.remove('hidden');
                btnSubmit.classList.add('hidden');
                translateBtn.classList.remove('hidden');
                document.getElementById('learningContentHeader').innerText = "NỘI DUNG LÝ THUYẾT LỚP HỌC";
                document.getElementById('coachBubbleText').innerText = `Thầy/Cô hãy đọc kỹ lý thuyết song ngữ bài học ${material.title} ở cột bên trái. Sau khi nắm vững, hãy bấm nút "Bắt đầu Thực hành" để làm bài test kiểm tra kiến thức nhé!`;
            }
        }

        // Kích hoạt bộ đếm thời gian
        startStudyTimer();
        return true;
    } catch (e) {
        console.error("Lỗi khôi phục LocalStorage:", e);
        return false;
    }
}

// Xóa trạng thái LocalStorage để làm mới phiên học
function clearLearningState() {
    localStorage.removeItem('cefr_learning_state_v2');
}

// Khôi phục giao diện các nút lựa chọn đã bấm chọn trước đó
function restoreSelectedOptionsStyle(material) {
    currentSelectedAnswers.forEach((ans, qIdx) => {
        if (ans === null) return;
        material.questions[qIdx].options.forEach((_, idx) => {
            const btn = document.getElementById(`learning-opt-${qIdx}-${idx}`);
            if (btn) {
                if (idx === ans) {
                    btn.className = 'flex items-center justify-between p-3 bg-blue-950/40 border border-blue-500 text-blue-400 rounded-xl cursor-pointer transition select-none text-xs font-bold';
                } else {
                    btn.className = 'flex items-center justify-between p-3 bg-[#0b0f19] border border-slate-850 hover:border-slate-700 rounded-xl cursor-pointer transition select-none text-xs text-slate-300';
                }
            }
        });
    });
}

// Đăng ký các hàm ra phạm vi Window
if (typeof window !== 'undefined') {
    window.initLearningCoach = initLearningCoach;
    window.switchToPracticeMode = switchToPracticeMode;
    window.trackOptionClick = trackOptionClick;
    window.submitPracticeQuiz = submitPracticeQuiz;
    window.toggleBilingualTheory = toggleBilingualTheory;
    window.changeLearningLevel = changeLearningLevel;
    window.changeLearningMode = changeLearningMode;
    window.stopLearningTimers = stopLearningTimers;
    window.toggleLectureSpeech = toggleLectureSpeech;
    window.speakExplanation = speakExplanation;
    window.toggleZoomExplanation = toggleZoomExplanation;
    window.stopAllSpeech = stopAllSpeech;
    window.saveLearningState = saveLearningState;
    window.loadLearningState = loadLearningState;
    window.clearLearningState = clearLearningState;
    window.changeSpeechSpeed = changeSpeechSpeed;
    window.preloadAllPracticeExplanations = preloadAllPracticeExplanations;
}
