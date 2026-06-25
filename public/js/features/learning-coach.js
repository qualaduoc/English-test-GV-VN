// --- SMART LEARNING & COACH CONTROLLER (4 SKILLS CEFR) ---

let selectedLevel = "A1"; // A1, A2, B1, B2
let selectedLessonIndex = 0; // 0, 1, 2, 3, 4
let selectedSkill = "theory"; // theory, reading, listening, speaking, writing
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

// Các biến đo lường hành vi ôn tập
let currentReadingAnswers = [null, null, null];
let currentListeningAnswers = [null, null, null];
let isReadingActive = false;
let isListeningActive = false;
let questionStartTime = 0;
let dwellTimes = [0, 0, 0];
let optionSwitches = [0, 0, 0];

// Ghi âm nói
let coachSpeechRecognitionObj = null;
let isCoachRecordingSpeaking = false;

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
        return textUrl;
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
function preloadExplanationAudio(questions, qIdx, skillType) {
    if (!questions || !questions[qIdx]) return;
    
    const question = questions[qIdx];
    
    let textToSpeak = `Câu hỏi số ${qIdx + 1}. Nội dung câu hỏi: ${question.qTranslation}. `;
    textToSpeak += `Giải thích ngữ pháp: ${question.explanation}. `;
    if (question.studyTip) {
        textToSpeak += `Mẹo học dành cho Thầy Cô: ${question.studyTip}`;
    }

    const viText = convertEnglishXenVi(textToSpeak);
    const chunks = splitTextForGoogleTTS(viText);
    
    chunks.forEach(chunk => {
        const textUrl = `/api/tts?text=${encodeURIComponent(chunk)}`;
        getCachedTtsAudioUrl(textUrl).catch(() => {});
    });
}

// Tải trước giải thích của toàn bộ câu hỏi trắc nghiệm của kỹ năng hiện tại
function preloadAllPracticeExplanations(skillType) {
    const material = learningMaterialsDb[selectedLevel];
    if (!material || !material.lessons || !material.lessons[selectedLessonIndex]) return;
    
    const lesson = material.lessons[selectedLessonIndex];
    let questions = [];
    if (skillType === 'reading' && lesson.reading) {
        questions = lesson.reading.questions;
    } else if (skillType === 'listening' && lesson.listening) {
        questions = lesson.listening.questions;
    }

    if (!questions || questions.length === 0) return;
    
    console.log(`[Audio Preload] Đang chạy ngầm tải trước âm thanh giải thích phần ${skillType}...`);
    for (let i = 0; i < questions.length; i++) {
        preloadExplanationAudio(questions, i, skillType);
    }
}

// Xử lý thay đổi tốc độ đọc từ thanh trượt giao diện
function changeSpeechSpeed(val) {
    currentSpeechRate = parseFloat(val);
    
    const valEl = document.getElementById('speechSpeedValue');
    if (valEl) {
        valEl.innerText = `${currentSpeechRate.toFixed(2)}x`;
    }
    
    const inputEl = document.getElementById('speechSpeedRate');
    if (inputEl) {
        inputEl.value = currentSpeechRate;
    }
    
    const ttsPlayer = document.getElementById('learningTtsPlayer');
    if (ttsPlayer) {
        ttsPlayer.playbackRate = currentSpeechRate;
    }
    
    if (currentHtmlAudio) {
        currentHtmlAudio.playbackRate = currentSpeechRate;
    }
    
    localStorage.setItem('cefr_speech_rate', currentSpeechRate);
}

// Khởi chạy chế độ học tập
function initLearningCoach() {
    const savedRate = localStorage.getItem('cefr_speech_rate');
    if (savedRate) {
        changeSpeechSpeed(savedRate);
    } else {
        changeSpeechSpeed(1.0);
    }

    preloadVietnameseVoice();
    
    selectedLevel = document.getElementById('learningLevelSelect').value || "A1";
    selectedLessonIndex = 0;
    selectedSkill = "theory";
    bilingualTheoryActive = true;
    
    if (typeof globalBilingualMode !== 'undefined') {
        bilingualTheoryActive = globalBilingualMode;
    }
    
    const btnBilingual = document.getElementById('btnBilingualTheoryToggle');
    if (btnBilingual) {
        if (bilingualTheoryActive) btnBilingual.classList.add('active');
        else btnBilingual.classList.remove('active');
    }

    // Nạp dropdown bài học dựa theo Cấp độ
    populateLessonsDropdown();

    // Khôi phục trạng thái ôn tập nếu có
    const loaded = loadLearningState();
    if (loaded) {
        console.log("Đã khôi phục trạng thái ôn tập từ LocalStorage.");
        return;
    }

    loadCurrentLesson();
}

// Nạp danh sách bài học vào dropdown
function populateLessonsDropdown() {
    const lessonSelect = document.getElementById('learningLessonSelect');
    if (!lessonSelect) return;

    lessonSelect.innerHTML = '';
    const material = learningMaterialsDb[selectedLevel];
    if (material && material.lessons) {
        material.lessons.forEach((lesson, index) => {
            const opt = document.createElement('option');
            opt.value = index;
            opt.className = 'bg-[#141b2d]';
            opt.innerText = lesson.title;
            lessonSelect.appendChild(opt);
        });
    }
    lessonSelect.value = selectedLessonIndex;
}

// Nạp nội dung bài học cụ thể
function loadCurrentLesson() {
    stopLearningTimers();
    stopAllSpeech();
    
    studySeconds = 0;

    const material = learningMaterialsDb[selectedLevel];
    if (!material || !material.lessons || !material.lessons[selectedLessonIndex]) return;

    const lesson = material.lessons[selectedLessonIndex];

    const readingQCount = (lesson.reading && lesson.reading.questions) ? lesson.reading.questions.length : 0;
    const listeningQCount = (lesson.listening && lesson.listening.questions) ? lesson.listening.questions.length : 0;

    dwellTimes = Array(Math.max(readingQCount, listeningQCount, 3)).fill(0);
    optionSwitches = Array(Math.max(readingQCount, listeningQCount, 3)).fill(0);
    currentReadingAnswers = Array(readingQCount).fill(null);
    currentListeningAnswers = Array(listeningQCount).fill(null);
    isReadingActive = true;
    isListeningActive = true;

    // Reset bảng hiển thị chỉ số
    document.getElementById('statStudyTime').innerText = "00:00";
    document.getElementById('statHesitationCount').innerText = "0 lần";
    document.getElementById('statWorkStatus').className = "text-[10px] font-extrabold text-slate-500";
    document.getElementById('statWorkStatus').innerText = "Chưa bắt đầu";

    // Ẩn các card kết quả cũ
    document.getElementById('learningExplanationCard').classList.add('hidden');
    document.getElementById('coachSuggestionsContainer').classList.add('hidden');
    
    // Reset textarea Nói/Viết
    const transcriptTextarea = document.getElementById('speakingTranscriptTextarea');
    if (transcriptTextarea) transcriptTextarea.value = "";
    
    const writingTextarea = document.getElementById('writingTextarea');
    if (writingTextarea) {
        writingTextarea.value = "";
        updateWritingWordCount();
    }

    // 1. Render Lý thuyết
    const theoryContent = document.getElementById('learningTheoryContent');
    if (theoryContent) {
        theoryContent.innerHTML = `
            <h3 class="text-base font-extrabold text-white">${lesson.title}</h3>
            <p class="text-xs text-slate-400 italic">${lesson.description}</p>
            <div class="border-t border-slate-800/80 pt-3 mt-2 text-xs leading-relaxed space-y-3">
                ${lesson.theoryHtml}
            </div>
        `;
    }

    // 2. Render Đọc
    const readingPassageText = document.getElementById('readingPassageText');
    const readingPassageTranslation = document.getElementById('readingPassageTranslation');
    if (readingPassageText) readingPassageText.innerText = lesson.reading.passage;
    if (readingPassageTranslation) readingPassageTranslation.innerText = lesson.reading.passageTranslation || "";
    renderSkillQuestions('reading', lesson.reading.questions);

    // 3. Render Nghe
    const listeningTextTranslation = document.getElementById('listeningTextTranslation');
    if (listeningTextTranslation) listeningTextTranslation.innerText = lesson.listening.audioTranslation || "";
    renderSkillQuestions('listening', lesson.listening.questions);

    // 4. Render Nói
    const speakingPromptText = document.getElementById('speakingPromptText');
    const speakingPromptTranslation = document.getElementById('speakingPromptTranslation');
    const speakingGuideTips = document.getElementById('speakingGuideTips');
    if (speakingPromptText) speakingPromptText.innerText = lesson.speaking.prompt;
    if (speakingPromptTranslation) speakingPromptTranslation.innerText = lesson.speaking.promptTranslation || "";
    if (speakingGuideTips) speakingGuideTips.innerText = lesson.speaking.guideTips || "";

    // 5. Render Viết
    const writingPromptText = document.getElementById('writingPromptText');
    const writingPromptTranslation = document.getElementById('writingPromptTranslation');
    const writingSuggestedVocab = document.getElementById('writingSuggestedVocab');
    if (writingPromptText) writingPromptText.innerText = lesson.writing.prompt;
    if (writingPromptTranslation) writingPromptTranslation.innerText = lesson.writing.promptTranslation || "";
    if (writingSuggestedVocab) writingSuggestedVocab.innerText = lesson.writing.suggestedVocab || "";

    // Reset về Tab Lý thuyết
    changeLearningSkill('theory');

    // Lưu trạng thái ôn tập khởi đầu
    saveLearningState();

    // Kích hoạt bộ đếm thời gian học
    startStudyTimer();
}

// Render câu hỏi cho từng kỹ năng Đọc/Nghe
function renderSkillQuestions(skillType, questions) {
    const container = document.getElementById(`${skillType}QuestionsContainer`);
    if (!container) return;
    container.innerHTML = '';

    questions.forEach((qObj, qIdx) => {
        const qCard = document.createElement('div');
        qCard.className = 'bg-[#141b2d] border border-slate-800 rounded-xl p-4.5 space-y-3 relative';
        
        // Tiêu đề câu hỏi
        const qTitle = document.createElement('div');
        qTitle.className = 'text-slate-250 text-xs font-bold leading-normal';
        qTitle.innerHTML = `<span class="text-teal-400">Câu ${qIdx + 1}:</span> ${qObj.q}`;
        qCard.appendChild(qTitle);
        
        // Bản dịch câu hỏi
        const qTrans = document.createElement('div');
        qTrans.id = `learning-${skillType}-q-trans-${qIdx}`;
        qTrans.className = `text-[10.5px] text-slate-405 pl-4 border-l border-slate-800 ${bilingualTheoryActive ? '' : 'hidden'}`;
        qTrans.innerText = qObj.qTranslation;
        qCard.appendChild(qTrans);
        
        // Danh sách lựa chọn
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'flex flex-col gap-2 pt-1';
        
        qObj.options.forEach((opt, optIdx) => {
            const optBtn = document.createElement('div');
            optBtn.id = `learning-${skillType}-opt-${qIdx}-${optIdx}`;
            optBtn.className = 'flex items-center justify-between p-3 bg-[#0b0f19] border border-slate-850 hover:border-slate-700 rounded-xl cursor-pointer transition select-none text-xs text-slate-300';
            optBtn.onclick = () => trackSkillOptionClick(skillType, qIdx, optIdx);
            
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
        container.appendChild(qCard);
    });
}

// Xử lý chọn đáp án cho từng kỹ năng
function trackSkillOptionClick(skillType, qIdx, optIdx) {
    const isActive = skillType === 'reading' ? isReadingActive : isListeningActive;
    if (!isActive) return;

    const answersArray = skillType === 'reading' ? currentReadingAnswers : currentListeningAnswers;
    const prevSelected = answersArray[qIdx];
    
    if (prevSelected !== null && prevSelected !== optIdx) {
        optionSwitches[qIdx]++;
        const totalSwitches = optionSwitches.reduce((a, b) => a + b, 0);
        document.getElementById('statHesitationCount').innerText = `${totalSwitches} lần`;
    }

    answersArray[qIdx] = optIdx;

    // Render lại style của các tùy chọn
    const material = learningMaterialsDb[selectedLevel];
    const lesson = material.lessons[selectedLessonIndex];
    const skillData = skillType === 'reading' ? lesson.reading : lesson.listening;

    skillData.questions[qIdx].options.forEach((_, idx) => {
        const btn = document.getElementById(`learning-${skillType}-opt-${qIdx}-${idx}`);
        if (btn) {
            if (idx === optIdx) {
                btn.className = 'flex items-center justify-between p-3 bg-blue-950/40 border border-blue-500 text-blue-400 rounded-xl cursor-pointer transition select-none text-xs font-bold';
            } else {
                btn.className = 'flex items-center justify-between p-3 bg-[#0b0f19] border border-slate-850 hover:border-slate-700 rounded-xl cursor-pointer transition select-none text-xs text-slate-300';
            }
        }
    });

    const now = Date.now();
    const elapsedSeconds = Math.round((now - questionStartTime) / 1000);
    dwellTimes[qIdx] += elapsedSeconds;
    questionStartTime = now;

    updatePracticeProgress();
    saveLearningState();
}

// Cập nhật nhãn tiến trình làm bài
function updatePracticeProgress() {
    const material = learningMaterialsDb[selectedLevel];
    if (!material || !material.lessons || !material.lessons[selectedLessonIndex]) return;
    const lesson = material.lessons[selectedLessonIndex];
    
    const answersArray = selectedSkill === 'reading' ? currentReadingAnswers : currentListeningAnswers;
    const totalQuestions = selectedSkill === 'reading' ? lesson.reading.questions.length : lesson.listening.questions.length;
    
    const answeredCount = answersArray.filter(ans => ans !== null).length;
    document.getElementById('practiceProgressLabel').innerText = `Tiến trình: ${answeredCount} / ${totalQuestions} câu`;
}

// Bắt đầu đếm thời gian
function startStudyTimer() {
    studyTimerInterval = setInterval(() => {
        studySeconds++;
        const mins = Math.floor(studySeconds / 60).toString().padStart(2, '0');
        const secs = (studySeconds % 60).toString().padStart(2, '0');
        document.getElementById('statStudyTime').innerText = `${mins}:${secs}`;
        
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

// Bật/tắt song ngữ
function toggleBilingualTheory() {
    bilingualTheoryActive = !bilingualTheoryActive;
    
    const btn = document.getElementById('btnBilingualTheoryToggle');
    if (btn) {
        if (bilingualTheoryActive) btn.classList.add('active');
        else btn.classList.remove('active');
    }

    toggleBilingualVisibility();
    saveLearningState();
}

// Thay đổi hiển thị song ngữ dựa trên state
function toggleBilingualVisibility() {
    const elements = document.querySelectorAll(
        '#readingPassageTranslation, #listeningTextTranslation, #speakingPromptTranslation, #writingPromptTranslation'
    );
    elements.forEach(el => {
        if (bilingualTheoryActive) el.classList.remove('hidden');
        else el.classList.add('hidden');
    });

    const questionTranslations = document.querySelectorAll(
        '[id*="-trans-"], .option-translation'
    );
    questionTranslations.forEach(el => {
        if (bilingualTheoryActive) el.classList.remove('hidden');
        else el.classList.add('hidden');
    });
}

// Sự kiện thay đổi cấp độ
function changeLearningLevel(val) {
    selectedLevel = val;
    selectedLessonIndex = 0;
    selectedSkill = "theory";
    populateLessonsDropdown();
    loadCurrentLesson();
}

// Sự kiện thay đổi bài học
function changeLearningLesson(val) {
    selectedLessonIndex = parseInt(val);
    selectedSkill = "theory";
    loadCurrentLesson();
}

// Sự kiện thay đổi Tab kỹ năng
function changeLearningSkill(skill) {
    selectedSkill = skill;
    stopAllSpeech();

    // Ẩn tất cả các panel
    document.getElementById('learningTheoryTab').classList.add('hidden');
    document.getElementById('learningReadingTab').classList.add('hidden');
    document.getElementById('learningListeningTab').classList.add('hidden');
    document.getElementById('learningSpeakingTab').classList.add('hidden');
    document.getElementById('learningWritingTab').classList.add('hidden');

    // Bỏ active tất cả các tab
    document.querySelectorAll('.learning-skill-tab').forEach(btn => btn.classList.remove('active'));

    // Hiển thị panel & active tab tương ứng
    document.getElementById(`tab-skill-${skill}`).classList.add('active');
    
    // Ẩn tất cả nút nộp bài chân cột trái
    document.getElementById('btnSubmitReading').classList.add('hidden');
    document.getElementById('btnSubmitListening').classList.add('hidden');
    document.getElementById('btnSubmitSpeaking').classList.add('hidden');
    document.getElementById('btnSubmitWriting').classList.add('hidden');

    const progressLabel = document.getElementById('practiceProgressLabel');
    progressLabel.classList.add('hidden');

    const material = learningMaterialsDb[selectedLevel];
    if (!material || !material.lessons || !material.lessons[selectedLessonIndex]) return;
    const lesson = material.lessons[selectedLessonIndex];

    // Reset status & suggestions card
    document.getElementById('learningExplanationCard').classList.add('hidden');
    document.getElementById('coachSuggestionsContainer').classList.add('hidden');
    document.getElementById('statWorkStatus').className = "text-[10px] font-extrabold text-slate-500";
    document.getElementById('statWorkStatus').innerText = "Chưa bắt đầu";

    if (skill === 'theory') {
        document.getElementById('learningTheoryTab').classList.remove('hidden');
        document.getElementById('learningContentHeader').innerText = "NỘI DUNG LÝ THUYẾT LỚP HỌC";
        document.getElementById('coachBubbleText').innerText = `Thầy/Cô hãy đọc kỹ lý thuyết song ngữ bài học "${lesson.title}" ở cột bên trái. Em khuyến khích bấm nút "Giảng bài" để nghe giải nghĩa bài học chi tiết từ trợ lý nhé!`;
    } 
    else if (skill === 'reading') {
        document.getElementById('learningReadingTab').classList.remove('hidden');
        document.getElementById('learningContentHeader').innerText = "KỸ NĂNG ĐỌC & NGỮ PHÁP";
        document.getElementById('btnSubmitReading').classList.remove('hidden');
        
        progressLabel.classList.remove('hidden');
        const answeredCount = currentReadingAnswers.filter(ans => ans !== null).length;
        progressLabel.innerText = `Tiến trình: ${answeredCount} / ${lesson.reading.questions.length} câu`;
        
        document.getElementById('coachBubbleText').innerText = `Thầy/Cô hãy đọc kỹ đoạn văn ngắn bên trái và trả lời ${lesson.reading.questions.length} câu hỏi trắc nghiệm ngữ pháp liên quan. Bấm "Nộp bài Đọc" khi làm xong nhé!`;
        
        questionStartTime = Date.now();
        document.getElementById('statWorkStatus').innerText = "Đang làm bài Đọc";
        document.getElementById('statWorkStatus').className = "text-[10px] font-extrabold text-blue-400 animate-pulse";
        
        // Tải trước giải thích
        setTimeout(() => preloadAllPracticeExplanations('reading'), 1000);
    } 
    else if (skill === 'listening') {
        document.getElementById('learningListeningTab').classList.remove('hidden');
        document.getElementById('learningContentHeader').innerText = "KỸ NĂNG NGHE HIỂU";
        document.getElementById('btnSubmitListening').classList.remove('hidden');
        
        progressLabel.classList.remove('hidden');
        const answeredCount = currentListeningAnswers.filter(ans => ans !== null).length;
        progressLabel.innerText = `Tiến trình: ${answeredCount} / ${lesson.listening.questions.length} câu`;
        
        document.getElementById('coachBubbleText').innerText = `Thầy/Cô hãy bấm nút "Phát băng nghe" để nghe đoạn hội thoại ngắn tiếng Anh của bài học này và trả lời trắc nghiệm ở dưới. Hãy lắng nghe thật kỹ nhé!`;
        
        questionStartTime = Date.now();
        document.getElementById('statWorkStatus').innerText = "Đang làm bài Nghe";
        document.getElementById('statWorkStatus').className = "text-[10px] font-extrabold text-blue-400 animate-pulse";
        
        // Tải trước giải thích
        setTimeout(() => preloadAllPracticeExplanations('listening'), 1000);
    } 
    else if (skill === 'speaking') {
        document.getElementById('learningSpeakingTab').classList.remove('hidden');
        document.getElementById('learningContentHeader').innerText = "KỸ NĂNG LUYỆN NÓI";
        document.getElementById('btnSubmitSpeaking').classList.remove('hidden');
        
        document.getElementById('coachBubbleText').innerText = `Luyện Nói trực quan cùng AI: Hãy bấm vào biểu tượng Micro để ghi âm câu trả lời tiếng Anh theo Đề bài ở bên trái. Gemini AI sẽ kiểm tra ngữ pháp và sửa lại đoạn văn nói cho Thầy/Cô cực kỳ chi tiết!`;
        
        document.getElementById('statWorkStatus').innerText = "Chuẩn bị phát biểu";
        document.getElementById('statWorkStatus').className = "text-[10px] font-extrabold text-slate-500";
    } 
    else if (skill === 'writing') {
        document.getElementById('learningWritingTab').classList.remove('hidden');
        document.getElementById('learningContentHeader').innerText = "KỸ NĂNG LUYỆN VIẾT";
        document.getElementById('btnSubmitWriting').classList.remove('hidden');
        
        document.getElementById('coachBubbleText').innerText = `Luyện Viết: Hãy viết một đoạn văn ngắn khoảng 50-80 từ dựa trên Đề bài và Từ vựng gợi ý ở bên trái. Khi bấm Nộp bài, Gemini sẽ sửa từng lỗi chính tả, ngữ pháp và viết lại cho Thầy/Cô hay hơn!`;
        
        document.getElementById('statWorkStatus').innerText = "Đang soạn bài viết";
        document.getElementById('statWorkStatus').className = "text-[10px] font-extrabold text-slate-500";
    }

    toggleBilingualVisibility();
    saveLearningState();
}

// Tải trước danh sách giọng đọc tiếng Việt của Web Speech API
function preloadVietnameseVoice() {
    if (!('speechSynthesis' in window)) return;
    
    const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (!voices || voices.length === 0) return;

        const viVoices = voices.filter(v => v.lang.toLowerCase().replace('_', '-').startsWith('vi'));
        
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

        viSpeechVoice = femaleViVoices.find(v => v.name.toLowerCase().includes('google') && !v.name.toLowerCase().includes('local-male')) ||
                         femaleViVoices.find(v => v.name.toLowerCase().includes('hoaimy')) ||
                         femaleViVoices.find(v => v.name.toLowerCase().includes('natural')) ||
                         femaleViVoices[0] || null;

        if (viSpeechVoice) {
            console.log("Đã nạp giọng nữ tiếng Việt chuẩn chất lượng cao:", viSpeechVoice.name);
        } else {
            console.warn("Không tìm thấy giọng nữ tiếng Việt nào phù hợp. Sẽ im lặng khi Google TTS lỗi.");
        }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }
}

// Dừng tất cả giọng nói đang phát (cả Google TTS và Web Speech API)
function stopAllSpeech() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
    lectureSpeechUtterance = null;
    explanationSpeechUtterance = null;

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

    // Khôi phục nút phát audio nghe
    const btnPlayListeningText = document.getElementById('btnPlayListeningAudioText');
    const btnPlayListeningIcon = document.getElementById('btnPlayListeningAudioIcon');
    if (btnPlayListeningText && btnPlayListeningIcon) {
        btnPlayListeningText.innerText = "Phát băng nghe";
        btnPlayListeningIcon.className = "fa-solid fa-play";
    }

    // Khôi phục nút Nghe giải thích trắc nghiệm
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

// Hàm tự động phân tích văn bản hỗn hợp Việt - Anh thành các phân đoạn nhỏ kèm theo ngôn ngữ tương ứng
function splitMixedText(text) {
    if (!text) return [];

    const viCharsRegex = /[ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠạẢảẤấẦầẨẩẪẫẬậẮắẰằẲẳẴẵẶặẸẹẺẻẼẽẾếỀềỂểỄễỆệỈỉỊịỌọỎỏỐốỒồỔổỖỗỘộỚớỜờỞởỠỡỢợỤụỦủỨứỪừỬửỮữỰựỲỳỴỵỶỷỸỹ]/;
    
    // Regex khớp các cụm từ nằm trong dấu nháy đơn, nháy kép, hoặc các ký tự nháy thông dụng
    const quotedRegex = /(['"“’‘”])([^'"“’‘”\n]+)(['"”’‘”])/g;
    
    let lastIndex = 0;
    let match;
    const initialSegments = [];

    // Bước 1: Tách các cụm từ nằm trong dấu nháy
    while ((match = quotedRegex.exec(text)) !== null) {
        const startIndex = match.index;
        const textBefore = text.substring(lastIndex, startIndex);
        
        // Thêm đoạn văn bản trước dấu nháy
        if (textBefore.trim().length > 0 || textBefore.length > 0) {
            initialSegments.push({ text: textBefore, isQuoted: false });
        }

        const quotedContent = match[2];
        const fullQuotedText = match[0];

        // Nếu nội dung trong dấu nháy không chứa tiếng Việt có dấu và có chứa chữ cái Latinh -> Coi là tiếng Anh
        const isQuotedEnglish = !viCharsRegex.test(quotedContent) && /[a-zA-Z]/.test(quotedContent);

        initialSegments.push({ 
            text: fullQuotedText, 
            isQuoted: true, 
            lang: isQuotedEnglish ? 'en' : 'vi' 
        });

        lastIndex = quotedRegex.lastIndex;
    }

    // Thêm đoạn văn bản còn lại ở cuối
    const remainingText = text.substring(lastIndex);
    if (remainingText.trim().length > 0 || remainingText.length > 0) {
        initialSegments.push({ text: remainingText, isQuoted: false });
    }

    // Bước 2: Với các đoạn không nằm trong dấu nháy (isQuoted = false), ta chạy thuật toán phân tách từ
    const finalSegments = [];

    // Danh sách từ tiếng Việt không dấu phổ biến để loại trừ nhận nhầm
    const viStopWords = new Set([
        'chao', 'thay', 'co', 'sau', 'day', 'la', 'bai', 'giang', 've', 'cau', 'dieu', 'kien', 
        'loai', 'va', 'ta', 'dung', 'cho', 'tinh', 'huong', 'that', 'hien', 'tai', 'tuong', 
        'lai', 'voi', 'cong', 'thuc', 'neu', 'chu', 'ngu', 'dong', 'tu', 'o', 'don', 
        'thi', 'nguyen', 'the', 'gia', 'thuyet', 'khong', 'qua', 'khu', 'cung',
        'cua', 'nay', 'tren', 'trong', 'mot', 'con', 'se', 'nguoi', 'giao', 'vien', 'hoc', 
        'sinh', 'truong', 'lop', 'ngoai', 'le', 'ra', 'di', 'lai', 'roi', 'ma', 'la', 'chua', 
        'duoc', 'phai', 'nen', 'can', 'muon', 'biet', 'hieu', 'chia', 'cac', 'ngoi', 'bang', 
        'cach', 'noi', 'nghe', 'doc', 'viet', 'thi', 'tu', 'nhu', 'nhung', 'de',
        'cai', 'nao', 'ai', 'gi', 'dau', 'do', 'kia', 'ay', 'nho', 'lon',
        'nhieu', 'it', 'moi', 'tung', 'deu', 'chi', 'tên', 'ten', 'câu', 'hỏi', 'hoi'
    ]);

    // Whitelist tiếng Anh (đầy đủ các từ ngắn và phổ biến)
    const englishWhiteList = new Set([
        'i', 'a', 'an', 'and', 'the', 'of', 'in', 'on', 'at', 'by', 'for', 'with', 'about', 'from', 'as',
        'if', 'will', 'would', 'were', 'was', 'should', 'can', 'could', 'may', 'might', 'must',
        'to', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'done', 'go', 'went', 'gone',
        'who', 'whom', 'which', 'that', 'whose', 'where', 'when', 'why', 'how',
        'simple', 'present', 'past', 'perfect', 'future', 'continuous', 'passive', 'active', 'voice',
        'gerund', 'infinitive', 'cefr', 'ielts', 'reading', 'listening', 'speaking', 'writing',
        'vocabulary', 'grammar', 'pronunciation', 'feedback', 'coaching', 'skills', 'skill',
        'v-ing', 'to-infinitive', 'bare-infinitive', 'verbs', 'verb', 'nouns', 'noun', 'adjectives', 'adjective'
    ]);

    const isEnglish = (word) => {
        const lower = word.toLowerCase();
        if (viCharsRegex.test(word)) return false;
        if (englishWhiteList.has(lower)) return true;
        if (viStopWords.has(lower)) return false;
        if (/^[a-zA-Z]{2,}$/.test(word)) return true;
        return false;
    };

    initialSegments.forEach(seg => {
        if (seg.isQuoted) {
            finalSegments.push({ text: seg.text, lang: seg.lang });
        } else {
            // Phân tách từ trong đoạn văn bản thường
            const tokenRegex = /(\p{L}+(?:-\p{L}+)*)|([^\p{L}]+)/gu;
            let m;
            const tokens = [];
            
            while ((m = tokenRegex.exec(seg.text)) !== null) {
                if (m[1]) {
                    tokens.push({ type: 'word', text: m[1] });
                } else if (m[2]) {
                    tokens.push({ type: 'non-word', text: m[2] });
                }
            }

            const labeledTokens = tokens.map(token => {
                if (token.type === 'word') {
                    return {
                        text: token.text,
                        lang: isEnglish(token.text) ? 'en' : 'vi'
                    };
                } else {
                    return {
                        text: token.text,
                        lang: null
                    };
                }
            });

            let currentLang = 'vi';
            for (let i = 0; i < labeledTokens.length; i++) {
                if (labeledTokens[i].lang !== null) {
                    currentLang = labeledTokens[i].lang;
                } else {
                    let nextLang = null;
                    for (let j = i + 1; j < labeledTokens.length; j++) {
                        if (labeledTokens[j].lang !== null) {
                            nextLang = labeledTokens[j].lang;
                            break;
                        }
                    }
                    labeledTokens[i].lang = nextLang || currentLang;
                }
            }

            if (labeledTokens.length > 0) {
                let currentSubSegment = {
                    text: labeledTokens[0].text,
                    lang: labeledTokens[0].lang
                };

                for (let i = 1; i < labeledTokens.length; i++) {
                    const token = labeledTokens[i];
                    if (token.lang === currentSubSegment.lang) {
                        currentSubSegment.text += token.text;
                    } else {
                        finalSegments.push(currentSubSegment);
                        currentSubSegment = {
                            text: token.text,
                            lang: token.lang
                        };
                    }
                }
                finalSegments.push(currentSubSegment);
            }
        }
    });

    // Gộp lại các segment liên tiếp có cùng ngôn ngữ để tối ưu hóa hàng đợi phát
    const optimizedSegments = [];
    if (finalSegments.length === 0) return optimizedSegments;

    let activeSeg = {
        text: finalSegments[0].text,
        lang: finalSegments[0].lang
    };

    for (let i = 1; i < finalSegments.length; i++) {
        const seg = finalSegments[i];
        if (seg.lang === activeSeg.lang) {
            activeSeg.text += seg.text;
        } else {
            optimizedSegments.push(activeSeg);
            activeSeg = {
                text: seg.text,
                lang: seg.lang
            };
        }
    }
    optimizedSegments.push(activeSeg);

    return optimizedSegments;
}

// Chạy hàng đợi phát Google Translate TTS hỗ trợ đa ngôn ngữ lai (code-switching)
function playGoogleTTSQueue(text, onStartCallback, onEndCallback, onErrorCallback, lang = 'vi') {
    let queueItems = [];
    
    if (lang === 'vi') {
        // Tách câu để phát âm chuẩn từng phần tiếng Anh / tiếng Việt
        const segments = splitMixedText(text);
        segments.forEach(seg => {
            const chunks = splitTextForGoogleTTS(seg.text);
            chunks.forEach(chunk => {
                queueItems.push({
                    url: `/api/tts?text=${encodeURIComponent(chunk)}&lang=${seg.lang}`,
                    lang: seg.lang,
                    text: chunk
                });
            });
        });
    } else {
        // Tiếng Anh chuẩn hoàn toàn (băng nghe)
        const chunks = splitTextForGoogleTTS(text);
        chunks.forEach(chunk => {
            queueItems.push({
                url: `/api/tts?text=${encodeURIComponent(chunk)}&lang=${lang}`,
                lang: lang,
                text: chunk
            });
        });
    }

    if (queueItems.length === 0) {
        if (onErrorCallback) onErrorCallback();
        return;
    }

    googleAudioQueue = queueItems;
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
        ttsRetryCount = 0;
        if (onEndCallback) onEndCallback();
        return;
    }

    const queueItem = googleAudioQueue[currentAudioIndex];
    const rawUrl = queueItem.url;
    const ttsPlayer = document.getElementById('learningTtsPlayer');

    try {
        const url = await getCachedTtsAudioUrl(rawUrl);

        if (ttsPlayer) {
            if (ttsPlayer.src && ttsPlayer.src.startsWith('blob:')) {
                URL.revokeObjectURL(ttsPlayer.src);
            }
            
            ttsPlayer.src = url;
            
            ttsPlayer.onended = () => {
                currentAudioIndex++;
                ttsRetryCount = 0;
                playNextAudioInQueue(onEndCallback, onErrorCallback);
            };

            ttsPlayer.onerror = (e) => {
                console.error("Lỗi phát audio Google TTS qua DOM:", e);
                
                if (ttsRetryCount < 2) {
                    ttsRetryCount++;
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
                    ttsRetryCount = 0;
                    if (onErrorCallback) onErrorCallback();
                }
            };

            ttsPlayer.play().then(() => {
                ttsPlayer.playbackRate = currentSpeechRate;
            }).catch(err => {
                console.error("Lỗi trình duyệt chặn phát audio Google TTS DOM:", err);
                if (onErrorCallback) onErrorCallback();
            });
        } else {
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

// Tìm giọng đọc tiếng Anh tự nhiên chất lượng cao nhất phục vụ dự phòng ngoại tuyến
function getBestEnglishVoiceCoach() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    const priorityKeywords = [
        "natural", "neural", "online", "google us english", "google uk english", 
        "guy", "aria", "zira", "hazel", "samantha", "microsoft"
    ];

    const enVoices = voices.filter(v => v.lang.toLowerCase().startsWith('en'));
    if (enVoices.length === 0) return null;

    for (const keyword of priorityKeywords) {
        const found = enVoices.find(v => v.name.toLowerCase().includes(keyword));
        if (found) return found;
    }

    const enUSVoice = enVoices.find(v => v.lang.toLowerCase() === 'en-us');
    if (enUSVoice) return enUSVoice;

    return enVoices[0];
}

// Phát giọng nói thông qua Web Speech API (Hàm dự phòng ngoại tuyến hỗ trợ phát đa ngôn ngữ lai)
function speakWithWebSpeech(text, onStartCallback, onEndCallback, onErrorCallback, lang = 'vi') {
    if (!('speechSynthesis' in window)) {
        if (onErrorCallback) onErrorCallback();
        return;
    }

    window.speechSynthesis.cancel();
    
    // Tách câu thành các phân đoạn ngôn ngữ
    let segments = [];
    if (lang === 'vi') {
        segments = splitMixedText(text);
    } else {
        segments = [{ text: text, lang: 'en' }];
    }

    const utterances = [];
    
    segments.forEach(seg => {
        const sentences = seg.text.split(/[.!?]/).filter(s => s.trim().length > 0);
        
        sentences.forEach(sentenceText => {
            const trimmed = sentenceText.trim();
            if (trimmed.length === 0) return;
            
            const utterance = new SpeechSynthesisUtterance(trimmed);
            
            let voiceToUse = null;
            let langCode = "vi-VN";

            if (seg.lang === 'en') {
                voiceToUse = getBestEnglishVoiceCoach();
                langCode = "en-US";
            } else {
                voiceToUse = viSpeechVoice;
                langCode = "vi-VN";
            }
            
            if (voiceToUse) {
                utterance.voice = voiceToUse;
            }
            utterance.lang = langCode;
            utterance.rate = currentSpeechRate;
            
            utterances.push(utterance);
        });
    });

    if (utterances.length === 0) {
        if (onEndCallback) onEndCallback();
        return;
    }

    utterances[0].onstart = () => {
        if (onStartCallback) onStartCallback();
    };

    utterances[utterances.length - 1].onend = () => {
        if (onEndCallback) onEndCallback();
    };

    utterances.forEach(utterance => {
        utterance.onerror = (e) => {
            console.error("Lỗi Web Speech API:", e);
        };
        
        lectureSpeechUtterance = utterance;
        window.speechSynthesis.speak(utterance);
    });
}

// Hàm phát giọng nói thông minh kết hợp Google TTS và Web Speech API làm dự phòng
function speakSmart(text, onStartCallback, onEndCallback, lang = 'vi') {
    stopAllSpeech();
    ttsRetryCount = 0;
    
    playGoogleTTSQueue(
        text, // Giữ nguyên bản văn bản để hệ thống tự phân tách và đọc chuẩn en-vi
        onStartCallback,
        onEndCallback,
        () => {
            console.warn(`[TTS Fallback] Chuyển hướng dự phòng sang Web Speech API cho ngôn ngữ ${lang}...`);
            speakWithWebSpeech(text, onStartCallback, onEndCallback, () => {
                stopAllSpeech();
            }, lang);
        },
        lang
    );
}

// Bật/Tắt phát giọng nói bài giảng lý thuyết
function toggleLectureSpeech() {
    if ((isAudioPlaying && googleAudioQueue.length > 0) || (window.speechSynthesis.speaking && lectureSpeechUtterance)) {
        stopAllSpeech();
        return;
    }

    const material = learningMaterialsDb[selectedLevel];
    if (!material || !material.lessons || !material.lessons[selectedLessonIndex]) return;
    const lesson = material.lessons[selectedLessonIndex];
    if (!lesson.lectureText) {
        alert("Không tìm thấy nội dung bài giảng cho bài học này.");
        return;
    }

    const btnPlayLectureText = document.getElementById('btnPlayLectureText');
    const btnPlayLectureIcon = document.getElementById('btnPlayLectureIcon');

    speakSmart(
        lesson.lectureText,
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

// Bật/Tắt phát băng nghe
function toggleListeningAudio() {
    if (isAudioPlaying && googleAudioQueue.length > 0) {
        stopAllSpeech();
        return;
    }

    const material = learningMaterialsDb[selectedLevel];
    if (!material || !material.lessons || !material.lessons[selectedLessonIndex]) return;
    const lesson = material.lessons[selectedLessonIndex];
    
    if (!lesson.listening || !lesson.listening.audioText) {
        alert("Không tìm thấy nội dung băng nghe cho bài học này.");
        return;
    }

    const btnPlayListeningText = document.getElementById('btnPlayListeningAudioText');
    const btnPlayListeningIcon = document.getElementById('btnPlayListeningAudioIcon');

    speakSmart(
        lesson.listening.audioText,
        () => {
            if (btnPlayListeningText && btnPlayListeningIcon) {
                btnPlayListeningText.innerText = "Đang phát băng...";
                btnPlayListeningIcon.className = "fa-solid fa-circle-stop text-red-400 animate-pulse";
            }
        },
        () => {
            stopAllSpeech();
        },
        'en'
    );
}

// Phát âm thanh giải thích đáp án
function speakExplanation(qIdx) {
    if (currentPlayingSpeechIdx === qIdx) {
        stopAllSpeech();
        return;
    }

    const material = learningMaterialsDb[selectedLevel];
    if (!material || !material.lessons || !material.lessons[selectedLessonIndex]) return;
    const lesson = material.lessons[selectedLessonIndex];
    
    let questions = [];
    if (selectedSkill === 'reading') {
        questions = lesson.reading.questions;
    } else if (selectedSkill === 'listening') {
        questions = lesson.listening.questions;
    }

    if (!questions[qIdx]) return;
    const question = questions[qIdx];
    
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

// Cập nhật giao diện của nút Nghe giải thích trắc nghiệm tương ứng
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
        card.classList.remove('explanation-zoomed');
        if (icon) icon.className = "fa-solid fa-maximize text-slate-400";
        if (text) text.innerText = "Phóng to";
        
        const overlay = document.getElementById('explanationOverlay');
        if (overlay) overlay.remove();
    } else {
        card.classList.add('explanation-zoomed');
        if (icon) icon.className = "fa-solid fa-minimize text-emerald-450";
        if (text) text.innerText = "Thu nhỏ";
        
        const overlay = document.createElement('div');
        overlay.id = 'explanationOverlay';
        overlay.onclick = toggleZoomExplanation;
        document.body.appendChild(overlay);
    }
}

// Khởi tạo Web Speech API Recognition cho kỹ năng Nói (Coach)
function initCoachSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        console.warn("Trình duyệt không hỗ trợ Web Speech API Recognition.");
        return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    coachSpeechRecognitionObj = new SpeechRecognition();
    coachSpeechRecognitionObj.continuous = true;
    coachSpeechRecognitionObj.interimResults = true;
    coachSpeechRecognitionObj.lang = 'en-US';

    coachSpeechRecognitionObj.onstart = () => {
        isCoachRecordingSpeaking = true;
        const pulse = document.getElementById('speakingRecordPulse');
        if (pulse) pulse.classList.remove('hidden');
        
        const icon = document.getElementById('btnRecordSpeakingIcon');
        if (icon) icon.className = "fa-solid fa-circle-stop text-red-500 animate-pulse";
        
        const status = document.getElementById('recordSpeakingStatus');
        if (status) {
            status.innerText = "Đang thu âm... Hãy nói tiếng Anh!";
            status.className = "text-xs text-red-500 font-bold animate-pulse";
        }
    };

    coachSpeechRecognitionObj.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        for (let i = 0; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript + ' ';
            } else {
                interimTranscript += event.results[i][0].transcript + ' ';
            }
        }
        
        const txtArea = document.getElementById('speakingTranscriptTextarea');
        if (txtArea) {
            txtArea.value = (finalTranscript + interimTranscript).trim();
        }
    };

    coachSpeechRecognitionObj.onerror = (event) => {
        console.error("Lỗi nhận diện giọng nói:", event.error);
        let errorMsg = "Gặp lỗi nhận diện giọng nói.";
        if (event.error === 'not-allowed') {
            errorMsg = "Trình duyệt chưa được cấp quyền truy cập Micro. Thầy/Cô vui lòng click vào biểu tượng ổ khóa ở thanh địa chỉ trình duyệt, chọn 'Cho phép (Allow)' quyền truy cập Micro và tải lại trang nhé!";
        } else if (event.error === 'no-speech') {
            // Không ngắt thu âm khi giáo viên chỉ tạm dừng suy nghĩ
            console.warn("Không phát hiện âm thanh nói.");
            return;
        } else if (event.error === 'network') {
            errorMsg = "Lỗi kết nối mạng đến dịch vụ Speech-to-Text của Google. Thầy/Cô có thể tự gõ (nhập trực tiếp) câu trả lời Tiếng Anh vào ô văn bản ở dưới nhé!";
        } else {
            errorMsg = `Lỗi thiết bị thu âm: ${event.error}. Thầy/Cô vui lòng kiểm tra micro hoặc tự nhập câu trả lời nhé!`;
        }
        alert(errorMsg);
        stopCoachSpeakingRecognition();
    };

    coachSpeechRecognitionObj.onend = () => {
        stopCoachSpeakingRecognition();
    };
}

// Bật/tắt trạng thái ghi âm
function toggleCoachSpeakingRecord() {
    if (!coachSpeechRecognitionObj) {
        initCoachSpeechRecognition();
    }
    if (!coachSpeechRecognitionObj) {
        alert("Rất tiếc, trình duyệt của Thầy/Cô không hỗ trợ chức năng thu âm nhận diện giọng nói. Hãy dùng trình duyệt Chrome mới nhất nhé!");
        return;
    }

    if (isCoachRecordingSpeaking) {
        coachSpeechRecognitionObj.stop();
    } else {
        const area = document.getElementById('speakingTranscriptTextarea');
        if (area) area.value = "";
        coachSpeechRecognitionObj.start();
    }
}

// Dừng ghi âm
function stopCoachSpeakingRecognition() {
    isCoachRecordingSpeaking = false;
    const pulse = document.getElementById('speakingRecordPulse');
    if (pulse) pulse.classList.add('hidden');
    
    const icon = document.getElementById('btnRecordSpeakingIcon');
    if (icon) icon.className = "fa-solid fa-microphone";
    
    const status = document.getElementById('recordSpeakingStatus');
    const txtArea = document.getElementById('speakingTranscriptTextarea');
    const isTextEmpty = !txtArea || !txtArea.value.trim();
    
    if (status) {
        if (isTextEmpty) {
            status.innerText = "Không nhận được giọng nói. Thầy/Cô hãy nói to hơn hoặc bấm 'Sử dụng câu mẫu'";
            status.className = "text-[11px] text-amber-500 font-bold text-center px-1 animate-pulse";
        } else {
            status.innerText = "Bấm nút để bắt đầu nói";
            status.className = "text-xs text-slate-400 font-bold";
        }
    }
}

// Tự động điền câu trả lời mẫu của bài học hiện tại làm phương án dự phòng
function fillSpeakingSampleAnswer() {
    if (typeof selectedLevel === 'undefined' || typeof selectedLessonIndex === 'undefined' || !learningMaterialsDb) {
        alert("Không tìm thấy thông tin bài học hiện tại.");
        return;
    }
    const material = learningMaterialsDb[selectedLevel];
    if (!material) return;
    const lesson = material.lessons[selectedLessonIndex];
    if (!lesson || !lesson.speaking || !lesson.speaking.sampleAnswer) {
        alert("Bài học này không có câu trả lời mẫu.");
        return;
    }

    const textarea = document.getElementById('speakingTranscriptTextarea');
    if (textarea) {
        textarea.value = lesson.speaking.sampleAnswer;
        saveLearningState();
        
        // Cập nhật lại status của phần ghi âm để xóa cảnh báo
        const status = document.getElementById('recordSpeakingStatus');
        if (status) {
            status.innerText = "Bấm nút để bắt đầu nói";
            status.className = "text-xs text-slate-400 font-bold";
        }
    }
}

// Cập nhật số từ của textarea Viết
function updateWritingWordCount() {
    const textarea = document.getElementById('writingTextarea');
    if (!textarea) return;
    const text = textarea.value.trim();
    const words = text ? text.split(/\s+/).length : 0;
    const countEl = document.getElementById('writingWordCount');
    if (countEl) countEl.innerText = `${words} từ`;
}

// --- SUBMIT VÀ XỬ LÝ CHẤM ĐIỂM CHO TỪNG KỸ NĂNG ---

// 1. Nộp bài trắc nghiệm Đọc
async function submitReadingQuiz() {
    await submitQuizSkill('reading');
}

// 2. Nộp bài trắc nghiệm Nghe
async function submitListeningQuiz() {
    await submitQuizSkill('listening');
}

// Hàm dùng chung cho nộp bài trắc nghiệm (Đọc/Nghe)
async function submitQuizSkill(skillType) {
    const isActive = skillType === 'reading' ? isReadingActive : isListeningActive;
    if (!isActive) return;

    const answersArray = skillType === 'reading' ? currentReadingAnswers : currentListeningAnswers;
    const unansweredIdx = answersArray.findIndex(ans => ans === null);
    
    if (unansweredIdx !== -1) {
        alert("Thầy/Cô vui lòng hoàn thành tất cả các câu hỏi trắc nghiệm của phần này trước khi nộp bài nhé!");
        return;
    }

    const now = Date.now();
    const elapsedSeconds = Math.round((now - questionStartTime) / 1000);
    const lastActiveIdx = answersArray.length - 1;
    dwellTimes[lastActiveIdx] += elapsedSeconds;

    if (skillType === 'reading') isReadingActive = false;
    else isListeningActive = false;
    stopLearningTimers();

    document.getElementById('statWorkStatus').innerText = "Đang phân tích...";
    document.getElementById('statWorkStatus').className = "text-[10px] font-extrabold text-amber-400 animate-pulse";

    // Khóa click trắc nghiệm
    const options = document.querySelectorAll(`#${skillType}QuestionsContainer div[id*="-opt-"]`);
    options.forEach(opt => opt.onclick = null);

    const material = learningMaterialsDb[selectedLevel];
    const lesson = material.lessons[selectedLessonIndex];
    const skillData = skillType === 'reading' ? lesson.reading : lesson.listening;

    let correctCount = 0;
    const mistakes = [];

    answersArray.forEach((ans, qIdx) => {
        const question = skillData.questions[qIdx];
        if (ans === question.correct) {
            correctCount++;
        } else {
            mistakes.push(`Câu ${qIdx + 1}: Thầy/Cô chọn "${question.options[ans]}" nhưng đáp án đúng là "${question.options[question.correct]}".`);
        }
    });

    let rushingDetected = false;
    answersArray.forEach((ans, qIdx) => {
        const question = skillData.questions[qIdx];
        if (ans !== question.correct && dwellTimes[qIdx] < 5) {
            rushingDetected = true;
        }
    });

    const payload = {
        teacherName: typeof teacherName !== 'undefined' ? teacherName : "Giáo viên phổ thông",
        level: selectedLevel,
        skill: 'quiz',
        lessonTitle: lesson.title,
        results: {
            score: `${correctCount}/${skillData.questions.length}`,
            mistakes: mistakes
        },
        metrics: {
            dwellTimePerQ: dwellTimes,
            optionSwitchesPerQ: optionSwitches,
            rushingFlag: rushingDetected
        }
    };

    document.getElementById('coachBubbleText').innerHTML = `
        <div class="flex items-center gap-2 text-blue-400">
            <i class="fa-solid fa-spinner animate-spin"></i>
            <span>Trợ lý ETA đang kiểm tra bài làm của Thầy/Cô... Vui lòng chờ trong ít phút.</span>
        </div>
    `;

    try {
        const response = await fetch('/api/coach-feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const resData = await response.json();
        if (resData.success && resData.data) {
            const aiResult = resData.data;

            document.getElementById('coachBubbleText').innerHTML = formatCoachMessage(aiResult.coachMessage);
            
            const suggestionsList = document.getElementById('coachSuggestionsList');
            suggestionsList.innerHTML = '';
            if (Array.isArray(aiResult.suggestions)) {
                aiResult.suggestions.forEach(sug => {
                    const li = document.createElement('li');
                    li.innerHTML = formatCoachMessage(sug);
                    suggestionsList.appendChild(li);
                });
                document.getElementById('coachSuggestionsContainer').classList.remove('hidden');
            }

            const statusEl = document.getElementById('statWorkStatus');
            if (correctCount === skillData.questions.length) {
                statusEl.innerText = `Xuất sắc (${correctCount}/${skillData.questions.length})`;
                statusEl.className = "text-[10px] font-extrabold text-green-450";
            } else {
                statusEl.innerText = `Hoàn thành (${correctCount}/${skillData.questions.length})`;
                statusEl.className = "text-[10px] font-extrabold text-teal-400";
            }
        } else {
            throw new Error(resData.error || "Không kết nối được AI");
        }
    } catch (err) {
        console.error("Lỗi HLV ảo:", err);
        document.getElementById('coachBubbleText').innerText = `Em đã ghi nhận kết quả bài tập trắc nghiệm đạt ${correctCount}/${skillData.questions.length} câu. Thầy/Cô hãy xem phần giải thích ngữ pháp chi tiết của từng câu hỏi ở bảng bên dưới nhé!`;
        document.getElementById('statWorkStatus').innerText = "Hoàn thành";
        document.getElementById('statWorkStatus').className = "text-[10px] font-extrabold text-slate-350";
    }

    // Hiển thị giải thích trắc nghiệm
    renderSkillExplanations(skillType, skillData.questions, answersArray);
    
    // Gửi thời gian ôn tập lên máy chủ để ghi nhận tích lũy chăm học
    const currentPhone = typeof teacherPhone !== 'undefined' ? teacherPhone : '';
    const currentName = typeof teacherName !== 'undefined' ? teacherName : '';
    if (currentPhone && studySeconds > 0) {
        fetch('/api/record-study', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                phone: currentPhone,
                teacher_name: currentName,
                study_seconds: studySeconds
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.success && typeof loadDiligentLeaderboard === 'function') {
                loadDiligentLeaderboard();
            }
        })
        .catch(err => console.error("Lỗi ghi nhận thời gian học:", err));
        studySeconds = 0;
    }

    saveLearningState();
}

// Vẽ giải thích trắc nghiệm Đọc/Nghe
function renderSkillExplanations(skillType, questions, answersArray) {
    questions.forEach((qObj, qIdx) => {
        const ans = answersArray[qIdx];
        qObj.options.forEach((_, idx) => {
            const btn = document.getElementById(`learning-${skillType}-opt-${qIdx}-${idx}`);
            if (!btn) return;
            btn.className = 'flex items-center justify-between p-3 rounded-xl text-xs select-none';

            if (idx === qObj.correct) {
                btn.classList.add('bg-green-950/20', 'border-2', 'border-green-500', 'text-green-400', 'font-bold');
            } else if (idx === ans && ans !== qObj.correct) {
                btn.classList.add('bg-rose-950/20', 'border-2', 'border-rose-500', 'text-rose-400', 'font-bold');
            } else {
                btn.classList.add('bg-[#0b0f19]/40', 'border', 'border-slate-900', 'text-slate-500');
            }
        });
    });

    const explanationContent = document.getElementById('learningExplanationContent');
    explanationContent.innerHTML = '';
    document.getElementById('explanationCardHeaderTitle').innerText = "GIẢI THÍCH CHI TIẾT ĐÁP ÁN";

    // Tính điểm số trắc nghiệm
    let correctCount = 0;
    questions.forEach((qObj, qIdx) => {
        if (answersArray[qIdx] === qObj.correct) {
            correctCount++;
        }
    });

    const scorePercentage = ((correctCount / questions.length) * 100).toFixed(0);
    const score10 = ((correctCount / questions.length) * 10).toFixed(1);
    
    let rating = "";
    let ratingClass = "";
    let gradientBg = "";
    
    if (correctCount === questions.length) {
        rating = "Excellent (Xuất Sắc)";
        ratingClass = "text-emerald-400";
        gradientBg = "from-emerald-500/15 to-teal-500/15 border-emerald-500/20";
    } else if (score10 >= 8.0) {
        rating = "Good (Khá Giỏi)";
        ratingClass = "text-blue-400";
        gradientBg = "from-blue-500/15 to-indigo-500/15 border-blue-500/20";
    } else if (score10 >= 5.0) {
        rating = "Pass (Đạt Yêu Cầu)";
        ratingClass = "text-amber-400";
        gradientBg = "from-amber-500/15 to-yellow-500/15 border-amber-500/20";
    } else {
        rating = "Needs Improvement (Cần Cố Gắng)";
        ratingClass = "text-rose-400";
        gradientBg = "from-rose-500/15 to-red-500/15 border-rose-500/20";
    }

    const scorecard = document.createElement('div');
    scorecard.className = `p-4 bg-gradient-to-r ${gradientBg} border rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 shadow-md shadow-black/20`;
    scorecard.innerHTML = `
        <div class="flex items-center gap-4">
            <!-- Vòng tròn điểm số -->
            <div class="relative flex items-center justify-center h-14 w-14 rounded-full bg-[#0b0f19] border border-slate-800 shrink-0">
                <span class="text-base font-black text-white">${score10}</span>
                <span class="text-[8px] text-slate-500 absolute bottom-1">/ 10</span>
            </div>
            <div class="space-y-0.5">
                <div class="text-[9px] text-slate-500 font-extrabold uppercase tracking-wider">KẾT QUẢ ĐẠT ĐƯỢC</div>
                <div class="text-xs font-black ${ratingClass}">${rating}</div>
                <div class="text-[10px] text-slate-400">
                    Đúng <strong class="text-white">${correctCount}/${questions.length}</strong> câu hỏi. Tỷ lệ hoàn thành: <strong class="text-white">${scorePercentage}%</strong>.
                </div>
            </div>
        </div>
        <div class="w-full sm:w-36 space-y-1">
            <div class="flex justify-between text-[9px] font-bold text-slate-500">
                <span>Tiến độ:</span>
                <span class="${ratingClass}">${scorePercentage}%</span>
            </div>
            <div class="w-full h-1.5 bg-[#0b0f19] rounded-full overflow-hidden border border-slate-850">
                <div class="h-full bg-gradient-to-r from-blue-500 to-teal-400" style="width: ${scorePercentage}%"></div>
            </div>
        </div>
    `;
    explanationContent.appendChild(scorecard);

    questions.forEach((qObj, qIdx) => {
        const expDiv = document.createElement('div');
        expDiv.className = 'p-3.5 bg-[#141b2d] border border-slate-800 rounded-xl space-y-2.5 shadow-md animate-fadeIn';
        
        const isCorrect = answersArray[qIdx] === qObj.correct;
        const statusBadge = isCorrect 
            ? '<span class="text-green-450 font-bold text-xs"><i class="fa-solid fa-circle-check"></i> Đúng</span>'
            : '<span class="text-rose-450 font-bold text-xs"><i class="fa-solid fa-circle-xmark"></i> Sai</span>';

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
    
    // Ẩn nút nộp bài
    if (skillType === 'reading') {
        document.getElementById('btnSubmitReading').classList.add('hidden');
    } else {
        document.getElementById('btnSubmitListening').classList.add('hidden');
    }
}

// 3. Nộp bài Nói (Speaking)
async function submitSpeakingText() {
    const transcriptText = document.getElementById('speakingTranscriptTextarea').value.trim();
    if (!transcriptText) {
        alert("Thầy/Cô vui lòng thực hiện nói/thu âm phát biểu trước khi nộp bài nhé!");
        return;
    }

    if (isCoachRecordingSpeaking) {
        coachSpeechRecognitionObj.stop();
    }

    stopLearningTimers();

    document.getElementById('statWorkStatus').innerText = "AI chấm điểm...";
    document.getElementById('statWorkStatus').className = "text-[10px] font-extrabold text-amber-400 animate-pulse";

    const material = learningMaterialsDb[selectedLevel];
    const lesson = material.lessons[selectedLessonIndex];

    const payload = {
        teacherName: typeof teacherName !== 'undefined' ? teacherName : "Giáo viên phổ thông",
        level: selectedLevel,
        skill: 'speaking',
        lessonTitle: lesson.title,
        prompt: lesson.speaking.prompt,
        sampleAnswer: lesson.speaking.sampleAnswer,
        transcript: transcriptText,
        studySeconds: studySeconds,
        charCount: transcriptText.length,
        wordCount: transcriptText.split(/\s+/).filter(Boolean).length
    };

    document.getElementById('coachBubbleText').innerHTML = `
        <div class="flex items-center gap-2 text-blue-400">
            <i class="fa-solid fa-spinner animate-spin"></i>
            <span>Trợ lý ETA đang kiểm tra bài làm của Thầy/Cô... Vui lòng chờ trong ít phút.</span>
        </div>
    `;

    try {
        const response = await fetch('/api/coach-feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const resData = await response.json();
        if (resData.success && resData.data) {
            const aiResult = resData.data;

            // Hiển thị hội thoại HLV
            document.getElementById('coachBubbleText').innerHTML = formatCoachMessage(aiResult.coachMessage);

            // Hiển thị suggestions
            const suggestionsList = document.getElementById('coachSuggestionsList');
            suggestionsList.innerHTML = '';
            if (Array.isArray(aiResult.suggestions)) {
                aiResult.suggestions.forEach(sug => {
                    const li = document.createElement('li');
                    li.innerHTML = formatCoachMessage(sug);
                    suggestionsList.appendChild(li);
                });
                document.getElementById('coachSuggestionsContainer').classList.remove('hidden');
            }

            // Hiển thị khung phản hồi HLV chi tiết bên dưới
            renderAiDetailedFeedback("Speaking", aiResult);

            document.getElementById('statWorkStatus').innerText = "Đã hoàn thành Nói";
            document.getElementById('statWorkStatus').className = "text-[10px] font-extrabold text-green-450";
        } else {
            throw new Error(resData.error || "Không kết nối được AI");
        }
    } catch (err) {
        console.error("Lỗi AI Speaking:", err);
        document.getElementById('coachBubbleText').innerText = "Rất tiếc do kết nối mạng nên HLV ảo chưa thể trả về bài sửa chi tiết trực tuyến. Thầy/Cô hãy thử lại nhé!";
        document.getElementById('statWorkStatus').innerText = "Lỗi kết nối";
        document.getElementById('statWorkStatus').className = "text-[10px] font-extrabold text-rose-400";
    }

    // Gửi thời gian ôn tập lên máy chủ để ghi nhận tích lũy chăm học
    const currentPhone = typeof teacherPhone !== 'undefined' ? teacherPhone : '';
    const currentName = typeof teacherName !== 'undefined' ? teacherName : '';
    if (currentPhone && studySeconds > 0) {
        fetch('/api/record-study', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                phone: currentPhone,
                teacher_name: currentName,
                study_seconds: studySeconds
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.success && typeof loadDiligentLeaderboard === 'function') {
                loadDiligentLeaderboard();
            }
        })
        .catch(err => console.error("Lỗi ghi nhận thời gian học:", err));
        studySeconds = 0;
    }

    saveLearningState();
}

// 4. Nộp bài Viết (Writing)
async function submitWritingText() {
    const essayText = document.getElementById('writingTextarea').value.trim();
    if (!essayText) {
        alert("Thầy/Cô vui lòng soạn thảo bài viết trước khi nộp bài nhé!");
        return;
    }

    stopLearningTimers();

    document.getElementById('statWorkStatus').innerText = "AI chấm điểm...";
    document.getElementById('statWorkStatus').className = "text-[10px] font-extrabold text-amber-400 animate-pulse";

    const material = learningMaterialsDb[selectedLevel];
    const lesson = material.lessons[selectedLessonIndex];

    const payload = {
        teacherName: typeof teacherName !== 'undefined' ? teacherName : "Giáo viên phổ thông",
        level: selectedLevel,
        skill: 'writing',
        lessonTitle: lesson.title,
        prompt: lesson.writing.prompt,
        suggestedVocab: lesson.writing.suggestedVocab,
        essay: essayText,
        studySeconds: studySeconds,
        charCount: essayText.length,
        wordCount: essayText.split(/\s+/).filter(Boolean).length
    };

    document.getElementById('coachBubbleText').innerHTML = `
        <div class="flex items-center gap-2 text-blue-400">
            <i class="fa-solid fa-spinner animate-spin"></i>
            <span>Trợ lý ETA đang kiểm tra bài làm của Thầy/Cô... Vui lòng chờ trong ít phút.</span>
        </div>
    `;

    try {
        const response = await fetch('/api/coach-feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const resData = await response.json();
        if (resData.success && resData.data) {
            const aiResult = resData.data;

            document.getElementById('coachBubbleText').innerHTML = formatCoachMessage(aiResult.coachMessage);

            const suggestionsList = document.getElementById('coachSuggestionsList');
            suggestionsList.innerHTML = '';
            if (Array.isArray(aiResult.suggestions)) {
                aiResult.suggestions.forEach(sug => {
                    const li = document.createElement('li');
                    li.innerHTML = formatCoachMessage(sug);
                    suggestionsList.appendChild(li);
                });
                document.getElementById('coachSuggestionsContainer').classList.remove('hidden');
            }

            // Hiển thị khung phản hồi HLV chi tiết bên dưới
            renderAiDetailedFeedback("Writing", aiResult);

            document.getElementById('statWorkStatus').innerText = "Đã hoàn thành Viết";
            document.getElementById('statWorkStatus').className = "text-[10px] font-extrabold text-green-450";
        } else {
            throw new Error(resData.error || "Không kết nối được AI");
        }
    } catch (err) {
        console.error("Lỗi AI Writing:", err);
        document.getElementById('coachBubbleText').innerText = "Rất tiếc do kết nối mạng nên HLV ảo chưa thể chấm điểm bài viết chi tiết trực tuyến. Thầy/Cô hãy thử lại nhé!";
        document.getElementById('statWorkStatus').innerText = "Lỗi kết nối";
        document.getElementById('statWorkStatus').className = "text-[10px] font-extrabold text-rose-400";
    }

    // Gửi thời gian ôn tập lên máy chủ để ghi nhận tích lũy chăm học
    const currentPhone = typeof teacherPhone !== 'undefined' ? teacherPhone : '';
    const currentName = typeof teacherName !== 'undefined' ? teacherName : '';
    if (currentPhone && studySeconds > 0) {
        fetch('/api/record-study', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                phone: currentPhone,
                teacher_name: currentName,
                study_seconds: studySeconds
            })
        })
        .then(res => res.json())
        .then(res => {
            if (res.success && typeof loadDiligentLeaderboard === 'function') {
                loadDiligentLeaderboard();
            }
        })
        .catch(err => console.error("Lỗi ghi nhận thời gian học:", err));
        studySeconds = 0;
    }

    saveLearningState();
}

// Hiển thị phản hồi chi tiết từ AI (chỉ lỗi sai chính tả/ngữ pháp và văn bản đề xuất)
// Hàm helper làm sạch Markdown thành HTML đẹp mắt cho bong bóng chat và phản hồi AI
function formatCoachMessage(text) {
    if (!text) return "";
    let html = text;
    
    // Chuyển in đậm **text** thành <b>text</b>
    html = html.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
    
    // Chuyển in nghiêng *text* thành <i>text</i>
    html = html.replace(/\*([^*]+)\*/g, '<i>$1</i>');
    
    // Thay thế các dòng bắt đầu bằng dấu * hoặc - thành dấu đầu dòng • đẹp mắt
    html = html.split('\n').map(line => {
        let trimmed = line.trim();
        if (trimmed.startsWith('* ')) {
            return '• ' + trimmed.substring(2);
        }
        if (trimmed.startsWith('- ')) {
            return '• ' + trimmed.substring(2);
        }
        return line;
    }).join('\n');
    
    // Loại bỏ triệt để các ký tự * hoặc # còn sót lại
    html = html.replace(/[\*#]/g, '').trim();
    
    // Thay thế xuống dòng \n thành <br> để hiển thị tốt trong HTML
    html = html.replace(/\n/g, '<br>');
    
    return html;
}

// Hiển thị phản hồi chi tiết từ AI (chỉ lỗi sai chính tả/ngữ pháp và văn bản đề xuất)
function renderAiDetailedFeedback(skillType, aiResult) {
    const explanationContent = document.getElementById('learningExplanationContent');
    explanationContent.innerHTML = '';

    document.getElementById('explanationCardHeaderTitle').innerText = `KẾT QUẢ ĐÁNH GIÁ CHUYÊN SÂU (${skillType.toUpperCase()})`;

    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'space-y-4 animate-fadeIn';

    // 0. Hiển thị Scorecard Chuyên Nghiệp từ AI
    if (aiResult.score) {
        const score = aiResult.score;
        const overallScore = parseFloat(score.overall || 0).toFixed(1);
        
        let rating = "";
        let ratingClass = "";
        let gradientBg = "";
        
        if (overallScore >= 9.0) {
            rating = "Excellent (Xuất Sắc)";
            ratingClass = "text-emerald-400";
            gradientBg = "from-emerald-500/15 to-teal-500/15 border-emerald-500/20";
        } else if (overallScore >= 8.0) {
            rating = "Good (Khá Giỏi)";
            ratingClass = "text-blue-400";
            gradientBg = "from-blue-500/15 to-indigo-500/15 border-blue-500/20";
        } else if (overallScore >= 6.5) {
            rating = "Above Average (Khá)";
            ratingClass = "text-sky-400";
            gradientBg = "from-sky-500/15 to-blue-500/15 border-sky-500/20";
        } else if (overallScore >= 5.0) {
            rating = "Pass (Đạt Yêu Cầu)";
            ratingClass = "text-amber-400";
            gradientBg = "from-amber-500/15 to-yellow-500/15 border-amber-500/20";
        } else {
            rating = "Needs Improvement (Cần Cố Gắng)";
            ratingClass = "text-rose-400";
            gradientBg = "from-rose-500/15 to-red-500/15 border-rose-500/20";
        }

        let criteriaHtml = '';
        if (skillType.toLowerCase() === 'speaking') {
            const fluency = parseFloat(score.fluency || 0).toFixed(1);
            const grammar = parseFloat(score.grammar || 0).toFixed(1);
            const vocabulary = parseFloat(score.vocabulary || 0).toFixed(1);
            
            criteriaHtml = `
                <div class="space-y-1 text-[10px]">
                    <div class="flex flex-col gap-0.5">
                        <div class="flex justify-between text-slate-400">
                            <span>Độ trôi chảy & mạch lạc (Fluency):</span>
                            <strong class="text-white">${fluency}/10</strong>
                        </div>
                        <div class="w-full h-1 bg-[#0b0f19] rounded-full overflow-hidden border border-slate-850">
                            <div class="h-full bg-blue-500" style="width: ${fluency * 10}%"></div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-0.5">
                        <div class="flex justify-between text-slate-400">
                            <span>Độ chính xác ngữ pháp (Grammar):</span>
                            <strong class="text-white">${grammar}/10</strong>
                        </div>
                        <div class="w-full h-1 bg-[#0b0f19] rounded-full overflow-hidden border border-slate-850">
                            <div class="h-full bg-teal-500" style="width: ${grammar * 10}%"></div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-0.5">
                        <div class="flex justify-between text-slate-400">
                            <span>Vốn từ vựng sử dụng (Vocabulary):</span>
                            <strong class="text-white">${vocabulary}/10</strong>
                        </div>
                        <div class="w-full h-1 bg-[#0b0f19] rounded-full overflow-hidden border border-slate-850">
                            <div class="h-full bg-sky-500" style="width: ${vocabulary * 10}%"></div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            const task = parseFloat(score.taskAchievement || 0).toFixed(1);
            const coherence = parseFloat(score.coherence || 0).toFixed(1);
            const vocabulary = parseFloat(score.vocabulary || 0).toFixed(1);
            const grammar = parseFloat(score.grammar || 0).toFixed(1);
            
            criteriaHtml = `
                <div class="space-y-1 text-[10px]">
                    <div class="flex flex-col gap-0.5">
                        <div class="flex justify-between text-slate-400">
                            <span>Đáp ứng yêu cầu đề (Task Response):</span>
                            <strong class="text-white">${task}/10</strong>
                        </div>
                        <div class="w-full h-1 bg-[#0b0f19] rounded-full overflow-hidden border border-slate-850">
                            <div class="h-full bg-blue-500" style="width: ${task * 10}%"></div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-0.5">
                        <div class="flex justify-between text-slate-400">
                            <span>Độ mạch lạc & liên kết (Coherence):</span>
                            <strong class="text-white">${coherence}/10</strong>
                        </div>
                        <div class="w-full h-1 bg-[#0b0f19] rounded-full overflow-hidden border border-slate-850">
                            <div class="h-full bg-teal-500" style="width: ${coherence * 10}%"></div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-0.5">
                        <div class="flex justify-between text-slate-400">
                            <span>Vốn từ vựng sử dụng (Vocabulary):</span>
                            <strong class="text-white">${vocabulary}/10</strong>
                        </div>
                        <div class="w-full h-1 bg-[#0b0f19] rounded-full overflow-hidden border border-slate-850">
                            <div class="h-full bg-sky-500" style="width: ${vocabulary * 10}%"></div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-0.5">
                        <div class="flex justify-between text-slate-400">
                            <span>Độ chính xác ngữ pháp (Grammar):</span>
                            <strong class="text-white">${grammar}/10</strong>
                        </div>
                        <div class="w-full h-1 bg-[#0b0f19] rounded-full overflow-hidden border border-slate-850">
                            <div class="h-full bg-emerald-500" style="width: ${grammar * 10}%"></div>
                        </div>
                    </div>
                </div>
            `;
        }

        const scorecard = document.createElement('div');
        scorecard.className = `p-4 bg-gradient-to-r ${gradientBg} border rounded-2xl flex flex-col sm:flex-row items-stretch justify-between gap-4 mb-4 shadow-md shadow-black/20`;
        scorecard.innerHTML = `
            <div class="flex items-center gap-4 sm:border-r sm:border-slate-800/80 pr-4 shrink-0 justify-center sm:justify-start">
                <!-- Vòng tròn điểm số trung bình -->
                <div class="relative flex items-center justify-center h-16 w-16 rounded-full bg-[#0b0f19] border border-slate-800 shrink-0">
                    <span class="text-lg font-black text-white">${overallScore}</span>
                    <span class="text-[9px] text-slate-500 absolute bottom-1">/ 10</span>
                </div>
                <div class="space-y-0.5">
                    <div class="text-[9px] text-slate-500 font-extrabold uppercase tracking-wider">ĐIỂM TRUNG BÌNH</div>
                    <div class="text-xs font-black ${ratingClass}">${rating}</div>
                    <div class="text-[9px] text-slate-450 italic font-medium">Chuẩn CEFR ${selectedLevel}</div>
                </div>
            </div>
            <div class="flex-1 space-y-1">
                <div class="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider mb-1 flex items-center gap-1">
                    <i class="fa-solid fa-chart-simple text-teal-400"></i> Tiêu chí chi tiết:
                </div>
                ${criteriaHtml}
            </div>
        `;
        feedbackDiv.appendChild(scorecard);
    }

    // 1. Hiển thị Lỗi sai phát hiện được (Dọn dẹp ký tự Markdown và render HTML)
    let cleanGrammarErrors = formatCoachMessage(aiResult.grammarErrors || 'Chúc mừng Thầy/Cô! Bài làm rất tốt và không phát hiện lỗi ngữ pháp hay từ vựng cơ bản nào.');

    const errorsCard = document.createElement('div');
    errorsCard.className = 'p-3.5 bg-rose-950/15 border border-rose-500/20 rounded-xl space-y-2';
    errorsCard.innerHTML = `
        <strong class="text-rose-400 text-xs flex items-center gap-1.5">
            <i class="fa-solid fa-triangle-exclamation"></i> Lỗi ngữ pháp & chính tả phát hiện:
        </strong>
        <div class="text-[11px] text-slate-300 leading-relaxed pl-3 border-l border-rose-500/30">
            ${cleanGrammarErrors}
        </div>
    `;
    feedbackDiv.appendChild(errorsCard);

    // 2. Hiển thị Bài nói/viết đề xuất từ AI
    const suggestedCard = document.createElement('div');
    suggestedCard.className = 'p-3.5 bg-emerald-950/15 border border-emerald-500/20 rounded-xl space-y-2';
    
    // Nút phát âm thanh bài mẫu Nói
    let voiceButtonHtml = '';
    if (skillType === 'Speaking' && aiResult.suggestedText) {
        voiceButtonHtml = `
            <button onclick="speakSuggestedText()" class="ml-auto px-2 py-0.5 bg-emerald-900/30 text-emerald-400 border border-emerald-500/30 rounded text-[9px] font-bold flex items-center gap-1 hover:bg-emerald-800/40 focus:outline-none" title="Nghe AI đọc bài mẫu nói này">
                <i class="fa-solid fa-volume-high text-[10px]"></i> Nghe bài mẫu
            </button>
        `;
        // Gán biến toàn cục để phát sau
        window.tempSuggestedText = aiResult.suggestedText;
    }

    suggestedCard.innerHTML = `
        <div class="flex justify-between items-center">
            <strong class="text-emerald-400 text-xs flex items-center gap-1.5">
                <i class="fa-solid fa-sparkles"></i> Bài tham khảo đề xuất (Chuẩn CEFR):
            </strong>
            ${voiceButtonHtml}
        </div>
        <p class="text-[11px] text-slate-200 italic leading-relaxed select-text p-2.5 bg-slate-900/40 rounded-lg border border-slate-850">
            "${aiResult.suggestedText || ''}"
        </p>
    `;
    feedbackDiv.appendChild(suggestedCard);

    explanationContent.appendChild(feedbackDiv);
    document.getElementById('learningExplanationCard').classList.remove('hidden');
}

// Bấm nút để nghe AI đọc đoạn mẫu gợi ý
function speakSuggestedText() {
    if (window.tempSuggestedText) {
        speakSmart(window.tempSuggestedText, null, () => stopAllSpeech());
    }
}

// --- LOCALSTORAGE PERSISTENCE ---

// Lưu trạng thái ôn tập hiện tại của giáo viên vào LocalStorage
function saveLearningState() {
    const statusEl = document.getElementById('statWorkStatus');
    const explanationCard = document.getElementById('learningExplanationCard');
    
    const isSubmitted = explanationCard && !explanationCard.classList.contains('hidden');

    const state = {
        selectedLevel,
        selectedLessonIndex,
        selectedSkill,
        studySeconds,
        currentReadingAnswers,
        currentListeningAnswers,
        isReadingActive,
        isListeningActive,
        isSubmitted,
        coachBubbleText: document.getElementById('coachBubbleText').innerHTML,
        coachSuggestionsHidden: document.getElementById('coachSuggestionsContainer').classList.contains('hidden'),
        coachSuggestionsListHtml: document.getElementById('coachSuggestionsList').innerHTML,
        statWorkStatusText: statusEl ? statusEl.innerText : "Chưa bắt đầu",
        statWorkStatusClass: statusEl ? statusEl.className : "text-[10px] font-extrabold text-slate-500",
        explanationCardHeaderTitle: document.getElementById('explanationCardHeaderTitle').innerText,
        explanationContentHtml: document.getElementById('learningExplanationContent').innerHTML,
        speakingTranscript: document.getElementById('speakingTranscriptTextarea') ? document.getElementById('speakingTranscriptTextarea').value : "",
        writingEssay: document.getElementById('writingTextarea') ? document.getElementById('writingTextarea').value : "",
        tempSuggestedText: window.tempSuggestedText || ""
    };

    localStorage.setItem('cefr_learning_state_v3', JSON.stringify(state));
}

// Khôi phục trạng thái ôn tập từ LocalStorage
function loadLearningState() {
    const raw = localStorage.getItem('cefr_learning_state_v3');
    if (!raw) return false;

    try {
        const state = JSON.parse(raw);
        selectedLevel = state.selectedLevel || "A1";
        selectedLessonIndex = state.selectedLessonIndex || 0;
        selectedSkill = state.selectedSkill || "theory";
        studySeconds = state.studySeconds || 0;
        isReadingActive = state.isReadingActive !== undefined ? state.isReadingActive : true;
        isListeningActive = state.isListeningActive !== undefined ? state.isListeningActive : true;

        const levelSelect = document.getElementById('learningLevelSelect');
        if (levelSelect) levelSelect.value = selectedLevel;

        populateLessonsDropdown();
        
        const lessonSelect = document.getElementById('learningLessonSelect');
        if (lessonSelect) lessonSelect.value = selectedLessonIndex;

        const material = learningMaterialsDb[selectedLevel];
        if (!material || !material.lessons || !material.lessons[selectedLessonIndex]) return false;
        const lesson = material.lessons[selectedLessonIndex];

        const readingQCount = (lesson.reading && lesson.reading.questions) ? lesson.reading.questions.length : 0;
        const listeningQCount = (lesson.listening && lesson.listening.questions) ? lesson.listening.questions.length : 0;

        // Khởi tạo mảng đáp án động dựa trên số lượng câu hỏi thực tế của bài học
        currentReadingAnswers = Array(readingQCount).fill(null);
        if (state.currentReadingAnswers && Array.isArray(state.currentReadingAnswers)) {
            for (let i = 0; i < Math.min(readingQCount, state.currentReadingAnswers.length); i++) {
                currentReadingAnswers[i] = state.currentReadingAnswers[i];
            }
        }

        currentListeningAnswers = Array(listeningQCount).fill(null);
        if (state.currentListeningAnswers && Array.isArray(state.currentListeningAnswers)) {
            for (let i = 0; i < Math.min(listeningQCount, state.currentListeningAnswers.length); i++) {
                currentListeningAnswers[i] = state.currentListeningAnswers[i];
            }
        }

        // Khởi tạo dwellTimes và optionSwitches dựa trên số câu thực tế để tránh lỗi chỉ số (index)
        const maxQuestions = Math.max(readingQCount, listeningQCount, 3);
        dwellTimes = Array(maxQuestions).fill(0);
        optionSwitches = Array(maxQuestions).fill(0);

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

        // 1. Render Lý thuyết
        const theoryContent = document.getElementById('learningTheoryContent');
        if (theoryContent) {
            theoryContent.innerHTML = `
                <h3 class="text-base font-extrabold text-white">${lesson.title}</h3>
                <p class="text-xs text-slate-400 italic">${lesson.description}</p>
                <div class="border-t border-slate-800/80 pt-3 mt-2 text-xs leading-relaxed space-y-3">
                    ${lesson.theoryHtml}
                </div>
            `;
        }

        // 2. Render Đọc
        const readingPassageText = document.getElementById('readingPassageText');
        const readingPassageTranslation = document.getElementById('readingPassageTranslation');
        if (readingPassageText) readingPassageText.innerText = lesson.reading.passage;
        if (readingPassageTranslation) readingPassageTranslation.innerText = lesson.reading.passageTranslation || "";
        renderSkillQuestions('reading', lesson.reading.questions);

        // 3. Render Nghe
        const listeningTextTranslation = document.getElementById('listeningTextTranslation');
        if (listeningTextTranslation) listeningTextTranslation.innerText = lesson.listening.audioTranslation || "";
        renderSkillQuestions('listening', lesson.listening.questions);

        // 4. Render Nói
        const speakingPromptText = document.getElementById('speakingPromptText');
        const speakingPromptTranslation = document.getElementById('speakingPromptTranslation');
        const speakingGuideTips = document.getElementById('speakingGuideTips');
        if (speakingPromptText) speakingPromptText.innerText = lesson.speaking.prompt;
        if (speakingPromptTranslation) speakingPromptTranslation.innerText = lesson.speaking.promptTranslation || "";
        if (speakingGuideTips) speakingGuideTips.innerText = lesson.speaking.guideTips || "";

        const transcriptTextarea = document.getElementById('speakingTranscriptTextarea');
        if (transcriptTextarea) transcriptTextarea.value = state.speakingTranscript || "";

        // 5. Render Viết
        const writingPromptText = document.getElementById('writingPromptText');
        const writingPromptTranslation = document.getElementById('writingPromptTranslation');
        const writingSuggestedVocab = document.getElementById('writingSuggestedVocab');
        if (writingPromptText) writingPromptText.innerText = lesson.writing.prompt;
        if (writingPromptTranslation) writingPromptTranslation.innerText = lesson.writing.promptTranslation || "";
        if (writingSuggestedVocab) writingSuggestedVocab.innerText = lesson.writing.suggestedVocab || "";

        const writingTextarea = document.getElementById('writingTextarea');
        if (writingTextarea) {
            writingTextarea.value = state.writingEssay || "";
            updateWritingWordCount();
        }

        window.tempSuggestedText = state.tempSuggestedText || "";

        // Khôi phục các style nút đáp án trắc nghiệm đã chọn
        restoreSelectedOptionsStyle('reading', currentReadingAnswers, lesson.reading.questions);
        restoreSelectedOptionsStyle('listening', currentListeningAnswers, lesson.listening.questions);

        // Chuyển về đúng Tab đang học dở dang
        changeLearningSkill(selectedSkill);

        if (state.isSubmitted) {
            document.getElementById('explanationCardHeaderTitle').innerText = state.explanationCardHeaderTitle || "";
            document.getElementById('learningExplanationContent').innerHTML = state.explanationContentHtml || "";
            document.getElementById('learningExplanationCard').classList.remove('hidden');

            // Khóa/Dừng trắc nghiệm hoặc highlight lại
            if (selectedSkill === 'reading') {
                renderSkillExplanations('reading', lesson.reading.questions, currentReadingAnswers);
            } else if (selectedSkill === 'listening') {
                renderSkillExplanations('listening', lesson.listening.questions, currentListeningAnswers);
            }
        }

        document.getElementById('coachBubbleText').innerHTML = state.coachBubbleText;
        if (!state.coachSuggestionsHidden) {
            document.getElementById('coachSuggestionsList').innerHTML = state.coachSuggestionsListHtml;
            document.getElementById('coachSuggestionsContainer').classList.remove('hidden');
        }

        startStudyTimer();
        return true;
    } catch (e) {
        console.error("Lỗi khôi phục LocalStorage:", e);
        return false;
    }
}

// Khôi phục giao diện các nút lựa chọn đã chọn trước đó
function restoreSelectedOptionsStyle(skillType, answersArray, questions) {
    answersArray.forEach((ans, qIdx) => {
        if (ans === null) return;
        questions[qIdx].options.forEach((_, idx) => {
            const btn = document.getElementById(`learning-${skillType}-opt-${qIdx}-${idx}`);
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

function clearLearningState() {
    localStorage.removeItem('cefr_learning_state_v3');
}

// Đăng ký các hàm ra phạm vi Window
if (typeof window !== 'undefined') {
    window.initLearningCoach = initLearningCoach;
    window.changeLearningLevel = changeLearningLevel;
    window.changeLearningLesson = changeLearningLesson;
    window.changeLearningSkill = changeLearningSkill;
    
    window.toggleBilingualTheory = toggleBilingualTheory;
    window.stopLearningTimers = stopLearningTimers;
    window.toggleLectureSpeech = toggleLectureSpeech;
    window.toggleListeningAudio = toggleListeningAudio;
    window.speakExplanation = speakExplanation;
    window.toggleZoomExplanation = toggleZoomExplanation;
    window.stopAllSpeech = stopAllSpeech;
    
    window.toggleCoachSpeakingRecord = toggleCoachSpeakingRecord;
    window.updateWritingWordCount = updateWritingWordCount;
    window.speakSuggestedText = speakSuggestedText;
    
    window.submitReadingQuiz = submitReadingQuiz;
    window.submitListeningQuiz = submitListeningQuiz;
    window.submitSpeakingText = submitSpeakingText;
    window.submitWritingText = submitWritingText;
    
    window.saveLearningState = saveLearningState;
    window.loadLearningState = loadLearningState;
    window.clearLearningState = clearLearningState;
    window.changeSpeechSpeed = changeSpeechSpeed;
    window.preloadAllPracticeExplanations = preloadAllPracticeExplanations;
}
