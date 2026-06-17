// --- CORE SYSTEM & SCREEN MANAGER ---

// --- BIẾN QUẢN LÝ TRẠNG THÁI ---
let currentSkill = "reading"; // reading, listening, speaking, writing
let examMode = "practice"; // practice: trải nghiệm, strict: nghiêm túc
let appState = "landing"; // landing, instruction, active_test, summary, review
let teacherName = "Giáo viên phổ thông";
let teacherPhone = "";
let leaderboardData = [];
let textScale = 2; // 1: small, 2: medium, 3: large
let globalBilingualMode = false; // Mặc định TẮT song ngữ toàn hệ thống
let viewingPastStage = null; // Theo dõi lượt cũ đang xem lại

// Quản lý đồng hồ
let headerTimerObj = null;
let testSecondsRemaining = 900; // 15 phút (900s) cho mỗi phần thi thích ứng
let speakingRingInterval = null;
let speakingSeconds = 0;
let speakingState = "prep"; // prep, recording
let currentSpeakingQIdx = 0;
let speakingReplays = 0; // Số lần nghe lại của câu hỏi hiện tại
let globalSpeakingSubtitleMode = 'bilingual'; // Chế độ phụ đề: 'bilingual' (song ngữ), 'english' (chỉ tiếng Anh), 'hidden' (tắt)

// Trạng thái thích ứng động của Đọc (Reading)
let readingAdaptive = {
    currentLevel: "B1",
    stages: [], // Lịch sử: ['B1', 'B2', ...]
    results: {}, // Kết quả: { B1: true, B2: false }
    answers: {}, // Đáp án đã chọn: { B1: { q1: 0, q2: 1 }, B2: {...} }
    finalLevel: "Pre-A1",
    isFinished: false
};

// Trạng thái thích ứng động của Nghe (Listening)
let listeningAdaptive = {
    currentLevel: "B1",
    stages: [],
    results: {},
    answers: {},
    finalLevel: "Pre-A1",
    isFinished: false
};

// Trạng thái kỹ năng Nói (Speaking)
let speakingAnswers = []; // Lưu { prompt: string, transcript: string }
let speakingFinalLevel = "A2";

// Trạng thái kỹ năng Viết (Writing)
let writingAnswerText = "";
let writingFinalLevel = "B1";
let speakingAiResult = null;
let writingAiResult = null;

// Thống kê thời gian làm bài chi tiết
let questionTimers = {}; // { qId: seconds }
let currentFocusQuestionId = null;

// Quản lý phát âm thanh HTML5 Audio và Fallback
let activeHtml5Audio = null;
let preloadedAudioObj = null;


// --- PHẦN 1: QUẢN LÝ ĐIỀU HƯỚNG MÀN HÌNH ---
function setAppState(state) {
    appState = state;

    // Ẩn tất cả màn hình
    document.getElementById('screen-landing').classList.add('hidden');
    document.getElementById('screen-instructions').classList.add('hidden');
    document.getElementById('screen-test-area').classList.add('hidden');
    document.getElementById('screen-test-speaking').classList.add('hidden');
    document.getElementById('screen-test-writing').classList.add('hidden');
    document.getElementById('screen-total-summary').classList.add('hidden');
    document.getElementById('screen-review-mode').classList.add('hidden');

    // Hiển thị màn hình mong muốn
    if (state === 'landing') {
        document.getElementById('screen-landing').classList.remove('hidden');
    } else if (state === 'instruction') {
        document.getElementById('screen-instructions').classList.remove('hidden');
    } else if (state === 'summary') {
        document.getElementById('screen-total-summary').classList.remove('hidden');
    } else if (state === 'review') {
        document.getElementById('screen-review-mode').classList.remove('hidden');
    } else if (state === 'active_test') {
        if (currentSkill === 'speaking') {
            document.getElementById('screen-test-speaking').classList.remove('hidden');
        } else if (currentSkill === 'writing') {
            document.getElementById('screen-test-writing').classList.remove('hidden');
        } else {
            document.getElementById('screen-test-area').classList.remove('hidden');
        }
    }

    // Quản lý hiển thị Sidebar
    const sidebar = document.getElementById('sidebarNav');
    if (state === 'active_test' || state === 'instruction' || state === 'review') {
        sidebar.classList.remove('hidden');
        sidebar.classList.add('flex');
    } else {
        sidebar.classList.add('hidden');
        sidebar.classList.remove('flex');
    }

    // Quản lý Header Controls
    const headerCtrls = document.getElementById('headerTestControls');
    const fontAdjustBtn = document.getElementById('btnTextScale');
    if (state === 'active_test') {
        headerCtrls.classList.remove('hidden');
        fontAdjustBtn.classList.remove('hidden');
    } else {
        headerCtrls.classList.add('hidden');
        fontAdjustBtn.classList.add('hidden');
    }
}

// Chạy bong bóng lời chào Techie
function nextTechieGreeting() {
    techieGreetingIdx++;
    if (techieGreetingIdx < techieGreetings.length) {
        document.getElementById('techieText').innerText = techieGreetings[techieGreetingIdx];
        if (techieGreetingIdx === techieGreetings.length - 1) {
            document.getElementById('btnTechieNext').innerText = "Đã hiểu";
            document.getElementById('btnStartTest').classList.remove('hidden');
        }
    } else {
        document.getElementById('btnTechieNext').classList.add('hidden');
    }
}

// Bắt đầu luồng thi
function startTestFlow() {
    // Đọc tên giáo viên và số điện thoại từ ô nhập liệu
    const inputEl = document.getElementById('inputTeacherName');
    const inputName = inputEl ? inputEl.value.trim() : "";
    
    const phoneEl = document.getElementById('inputTeacherPhone');
    const inputPhone = phoneEl ? phoneEl.value.trim() : "";
    
    // Validate Họ và tên
    if (!inputName || inputName.length < 3) {
        if (inputEl) {
            inputEl.classList.add('border-rose-500', 'ring-1', 'ring-rose-500');
            setTimeout(() => {
                inputEl.classList.remove('border-rose-500', 'ring-1', 'ring-rose-500');
            }, 3000);
        }
        showSimpleWarning(
            "Yêu cầu Họ và Tên", 
            "Thầy/Cô vui lòng nhập đầy đủ Họ và tên chính thức (tối thiểu 3 ký tự) để hệ thống ghi nhận kết quả và cập nhật bảng xếp hạng thi đua giáo viên."
        );
        return;
    }
    
    // Validate Số điện thoại
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!inputPhone || !phoneRegex.test(inputPhone)) {
        if (phoneEl) {
            phoneEl.classList.add('border-rose-500', 'ring-1', 'ring-rose-500');
            setTimeout(() => {
                phoneEl.classList.remove('border-rose-500', 'ring-1', 'ring-rose-500');
            }, 3000);
        }
        showSimpleWarning(
            "Số điện thoại không hợp lệ", 
            "Thầy/Cô vui lòng nhập đúng số điện thoại (từ 10 đến 11 chữ số) để hệ thống làm cơ sở định danh và xếp hạng thi đua tránh trùng lặp."
        );
        return;
    }
    
    teacherName = inputName;
    teacherPhone = inputPhone;
    
    // Đọc chế độ khảo sát được chọn
    const selectedMode = document.querySelector('input[name="testMode"]:checked');
    examMode = selectedMode ? selectedMode.value : "practice";
    
    // Nếu là chế độ nghiêm túc, gán sự kiện chặn thoát trang/reload
    if (examMode === 'strict') {
        window.onbeforeunload = function(e) {
            const message = "Thầy/Cô đang trong phòng khảo sát nghiêm túc. Tải lại trang hoặc rời đi sẽ làm mất toàn bộ bài thi!";
            e.returnValue = message;
            return message;
        };
    } else {
        window.onbeforeunload = null;
    }
    
    // Cập nhật hiển thị lên Header
    document.getElementById('userDisplayName').innerText = `Thầy/Cô ${teacherName}`;

    // Gọi API đăng ký/lưu thông tin giáo viên vào database ngay khi bắt đầu thi
    fetch('/api/register-teacher', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            teacher_name: teacherName,
            phone: teacherPhone
        })
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            console.log("[Supabase] Đăng ký thông tin giáo viên thành công!", res);
            loadLeaderboard(); // Tải lại bảng vinh danh để cập nhật danh sách
        } else {
            console.error("[Supabase] Đăng ký thông tin giáo viên thất bại:", res.error);
        }
    })
    .catch(err => {
        console.error("[Supabase] Lỗi kết nối đăng ký giáo viên:", err);
    });

    techieGreetingIdx = 0;
    document.getElementById('techieText').innerText = techieGreetings[0];
    document.getElementById('btnTechieNext').innerText = "Nhấn để tiếp tục";
    document.getElementById('btnTechieNext').classList.remove('hidden');
    document.getElementById('btnStartTest').classList.add('hidden');

    // Reset toàn bộ dữ liệu làm bài
    readingAdaptive = { currentLevel: "B1", stages: [], results: {}, answers: {}, finalLevel: "Pre-A1", isFinished: false };
    listeningAdaptive = { currentLevel: "B1", stages: [], results: {}, answers: {}, finalLevel: "Pre-A1", isFinished: false };
    speakingAnswers = [];
    writingAnswerText = "";
    viewingPastStage = null;

    // Bắt đầu ở Đọc
    loadSkillInstruction("reading");
}

// --- PHẦN 2: HƯỚNG DẪN KỸ NĂNG & TEST THIẾT BỊ ---
function loadSkillInstruction(skill) {
    currentSkill = skill;
    setAppState('instruction');
    updateSidebarStatus();

    const titleEl = document.getElementById('instructionTitle');
    const durationEl = document.getElementById('instructionDuration');
    const iconContainer = document.getElementById('instructionIconContainer');
    
    const audioCheck = document.getElementById('audioHardwareCheck');
    const micCheck = document.getElementById('micHardwareCheck');
    
    audioCheck.classList.add('hidden');
    micCheck.classList.add('hidden');

    if (skill === 'reading') {
        titleEl.innerText = "Hướng dẫn kỹ năng Đọc (Reading)";
        durationEl.innerText = "Thời gian: 15 phút / lượt thích ứng";
        iconContainer.className = "h-20 w-20 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center text-3xl";
        iconContainer.innerHTML = `<i class="fa-solid fa-book-open"></i>`;
        
        document.getElementById('instructionBullet1').innerText = "Đọc đoạn văn bản và chọn phương án trả lời đúng.";
        document.getElementById('instructionBullet1-vi').innerText = "Read the passage and choose the correct answer option.";
        document.getElementById('instructionBullet2').innerText = "Bài khảo sát thích ứng, độ khó sẽ thay đổi tùy thuộc vào câu trả lời trước.";
        document.getElementById('instructionBullet2-vi').innerText = "Adaptive test, difficulty levels will adjust based on previous performance.";
        document.getElementById('instructionBullet3').innerText = "Thầy/Cô có thể sử dụng công cụ phóng to Aa và nút Dịch song ngữ để hỗ trợ.";
        document.getElementById('instructionBullet3-vi').innerText = "You can use the Aa font scaling tool and translation button for assistance.";
    } 
    else if (skill === 'listening') {
        titleEl.innerText = "Hướng dẫn kỹ năng Nghe (Listening)";
        durationEl.innerText = "Thời gian: 15 phút / lượt thích ứng";
        iconContainer.className = "h-20 w-20 rounded-full bg-lime-500/20 text-lime-400 border border-lime-500/30 flex items-center justify-center text-3xl";
        iconContainer.innerHTML = `<i class="fa-solid fa-headphones"></i>`;
        
        audioCheck.classList.remove('hidden'); // Hiện hộp kiểm tra headphone
        preloadAudioForCurrentStage('hardware_check', ''); // Tải trước âm thanh kiểm tra thiết bị

        document.getElementById('instructionBullet1').innerText = "Lắng nghe đoạn hội thoại hoặc độc thoại tiếng Anh giả lập.";
        document.getElementById('instructionBullet1-vi').innerText = "Listen to the simulated English dialogue or monologue.";
        document.getElementById('instructionBullet2').innerText = "Thầy/Cô có thể bấm phát lại băng nghe để đối chiếu và trả lời.";
        document.getElementById('instructionBullet2-vi').innerText = "You can replay the audio track to check and answer.";
        document.getElementById('instructionBullet3').innerText = "Vui lòng kiểm tra kỹ tai nghe của Thầy/Cô bằng hộp âm thanh mẫu phía dưới.";
        document.getElementById('instructionBullet3-vi').innerText = "Please test your headphones using the sound check box below.";
    } 
    else if (skill === 'speaking') {
        titleEl.innerText = "Hướng dẫn kỹ năng Nói (Speaking)";
        durationEl.innerText = "Thời gian: 10 phút (Mô phỏng IELTS)";
        iconContainer.className = "h-20 w-20 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center text-3xl";
        iconContainer.innerHTML = `<i class="fa-solid fa-microphone"></i>`;
        
        micCheck.classList.remove('hidden'); // Hiện hộp kiểm tra micro

        document.getElementById('instructionBullet1').innerText = "Xem và lắng nghe câu hỏi từ Giám khảo ảo Mr. Harrison.";
        document.getElementById('instructionBullet1-vi').innerText = "Watch and listen to the questions from Virtual Examiner Mr. Harrison.";
        document.getElementById('instructionBullet2').innerText = "Thầy/Cô có 5 giây chuẩn bị ý tưởng trước khi hệ thống bắt đầu thu âm.";
        document.getElementById('instructionBullet2-vi').innerText = "You will have 5 seconds of preparation before recording starts.";
        document.getElementById('instructionBullet3').innerText = "Nói rõ ràng vào micro. Hệ thống sẽ lưu giọng nói và mô phỏng phản hồi từ AI.";
        document.getElementById('instructionBullet3-vi').innerText = "Speak clearly. The system will record and simulate AI feedback.";
    } 
    else if (skill === 'writing') {
        titleEl.innerText = "Hướng dẫn kỹ năng Viết (Writing)";
        durationEl.innerText = "Thời gian: 15 phút (IELTS Writing Task 2)";
        iconContainer.className = "h-20 w-20 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-3xl";
        iconContainer.innerHTML = `<i class="fa-solid fa-pen-nib"></i>`;

        document.getElementById('instructionBullet1').innerText = "Viết bài luận nghị luận xã hội theo chủ đề được cho ở cột bên trái.";
        document.getElementById('instructionBullet1-vi').innerText = "Write an argumentative essay on the topic presented in the left column.";
        document.getElementById('instructionBullet2').innerText = "Soạn thảo bài làm trực tiếp vào khung soạn thảo. Cố gắng đạt trên 250 từ.";
        document.getElementById('instructionBullet2-vi').innerText = "Type your essay directly in the text editor. Try to write over 250 words.";
        document.getElementById('instructionBullet3').innerText = "Hệ thống hỗ trợ đếm từ trực quan và giới hạn bài viết tối đa 350 từ.";
        document.getElementById('instructionBullet3-vi').innerText = "The system displays a word counter and limits the essay to 350 words.";
    }
}

// Chạy test tai nghe mẫu
let hwAudioSpeech = false;
function playHardwareCheckAudio() {
    const btnIcon = document.getElementById('audioCheckIcon');
    const progressBar = document.getElementById('audioCheckBar');
    
    if (hwAudioSpeech) {
        stopActiveAudio();
        hwAudioSpeech = false;
        btnIcon.className = "fa-solid fa-play text-xs";
        progressBar.style.width = "0%";
        return;
    }

    const ttsText = "Headphones test. Can you hear the sound clearly? One, two, three.";
    const localUrl = "audio/hardware_check.mp3";
    const onlineUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(ttsText)}&type=2`;

    playAudioWithFallback(
        localUrl,
        onlineUrl,
        ttsText,
        // onPlay
        () => {
            hwAudioSpeech = true;
            btnIcon.className = "fa-solid fa-pause text-xs";
        },
        // onEnd
        () => {
            hwAudioSpeech = false;
            btnIcon.className = "fa-solid fa-play text-xs";
            progressBar.style.width = "100%";
        },
        // onProgress
        (progress) => {
            progressBar.style.width = `${progress}%`;
        }
    );
}

// Kiểm tra quyền Micro thực tế
function testMicrophoneInput() {
    const micBtnText = document.getElementById('micTestText');
    const micIcon = document.getElementById('micTestIcon');
    const bars = document.querySelectorAll('#micSignalBars div');

    micBtnText.innerText = "Đang kết nối...";
    micIcon.className = "fa-solid fa-spinner animate-spin text-blue-400";

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            micBtnText.innerText = "Micro hoạt động tốt!";
            micIcon.className = "fa-solid fa-circle-check text-green-500";
            
            // Chạy hoạt ảnh sóng micro giả lập
            let timer = 0;
            const anim = setInterval(() => {
                timer++;
                bars.forEach(bar => {
                    const h = Math.floor(Math.random() * 20) + 8;
                    bar.style.height = `${h}px`;
                    bar.className = "w-1.5 bg-green-500 rounded-full transition-all duration-100";
                });
                if (timer > 20) {
                    clearInterval(anim);
                    bars.forEach(bar => {
                        bar.style.height = "12px";
                        bar.className = "w-1.5 bg-slate-800 rounded-full";
                    });
                    stream.getTracks().forEach(track => track.stop());
                }
            }, 150);
        })
        .catch(err => {
            micBtnText.innerText = "Lỗi kết nối Micro!";
            micIcon.className = "fa-solid fa-circle-xmark text-rose-500";
            showSimpleWarning("Lỗi thiết bị", "Không tìm thấy Micro hoặc Thầy/Cô đã từ chối cấp quyền. Hệ thống sẽ thi ở chế độ ghi âm giả lập.");
        });
}


// --- PHẦN 9: TIỆN ÍCH HỖ TRỢ, SONG NGỮ TOÀN CỤC & Aa ---
function toggleGlobalBilingualMode() {
    globalBilingualMode = !globalBilingualMode;
    const btn = document.getElementById('btnGlobalBilingualToggle');

    if (globalBilingualMode) {
        btn.innerHTML = `<i class="fa-solid fa-language text-sm"></i> <span>Song ngữ: BẬT</span>`;
        btn.classList.add('bg-blue-600/20');
        
        const mediaTranslation = document.getElementById('mediaPaneTranslation');
        if (mediaTranslation) mediaTranslation.classList.remove('hidden');
        
        const btnTransMedia = document.getElementById('btnTranslateMedia');
        if (btnTransMedia) btnTransMedia.classList.add('active');

        const writingTranslation = document.getElementById('writingPromptTranslation');
        if (writingTranslation) writingTranslation.classList.remove('hidden');

        const speakingTranslation = document.getElementById('speakingQuestionTranslation');
        if (speakingTranslation) speakingTranslation.classList.remove('hidden');

        // Hiện tất cả dịch của câu hỏi và đáp án
        const stateObj = currentSkill === 'reading' ? readingAdaptive : listeningAdaptive;
        const level = viewingPastStage !== null ? viewingPastStage : stateObj.currentLevel;
        if (adaptiveDb[currentSkill] && adaptiveDb[currentSkill][level]) {
            adaptiveDb[currentSkill][level].questions.forEach((q, qIdx) => {
                const tr = document.getElementById(`q-trans-${qIdx}`);
                if (tr) tr.classList.remove('hidden');
                
                // Hiện dịch options
                const parentCard = document.getElementById(`questionsScrollable`).children[qIdx];
                if (parentCard) {
                    const optTranslations = parentCard.querySelectorAll('.option-translation');
                    optTranslations.forEach(optTr => optTr.classList.remove('hidden'));
                    
                    // Hiện dịch giải thích tiếng Việt
                    const expTr = document.getElementById(`q-exp-trans-${qIdx}`);
                    if (expTr) expTr.classList.remove('hidden');
                }
            });
        }
    } else {
        btn.innerHTML = `<i class="fa-solid fa-language text-sm"></i> <span>Song ngữ: TẮT</span>`;
        btn.classList.remove('bg-blue-600/20');

        const mediaTranslation = document.getElementById('mediaPaneTranslation');
        if (mediaTranslation) mediaTranslation.classList.add('hidden');

        const btnTransMedia = document.getElementById('btnTranslateMedia');
        if (btnTransMedia) btnTransMedia.classList.remove('active');

        const writingTranslation = document.getElementById('writingPromptTranslation');
        if (writingTranslation) writingTranslation.classList.add('hidden');

        const speakingTranslation = document.getElementById('speakingQuestionTranslation');
        if (speakingTranslation) speakingTranslation.classList.add('hidden');

        // Ẩn dịch của câu hỏi và đáp án
        const stateObj = currentSkill === 'reading' ? readingAdaptive : listeningAdaptive;
        const level = viewingPastStage !== null ? viewingPastStage : stateObj.currentLevel;
        if (adaptiveDb[currentSkill] && adaptiveDb[currentSkill][level]) {
            adaptiveDb[currentSkill][level].questions.forEach((q, qIdx) => {
                const tr = document.getElementById(`q-trans-${qIdx}`);
                if (tr) tr.classList.add('hidden');
                
                // Ẩn dịch options
                const parentCard = document.getElementById(`questionsScrollable`).children[qIdx];
                if (parentCard) {
                    const optTranslations = parentCard.querySelectorAll('.option-translation');
                    optTranslations.forEach(optTr => optTr.classList.add('hidden'));
                    
                    // Ẩn dịch giải thích tiếng Việt
                    const expTr = document.getElementById(`q-exp-trans-${qIdx}`);
                    if (expTr) expTr.classList.add('hidden');
                }
            });
        }
    }
}

function updateSidebarStatus() {
    const nodes = ["reading", "listening", "speaking", "writing"];
    nodes.forEach(node => {
        const el = document.getElementById(`node-${node}`);
        const badge = document.getElementById(`badge-${node}`);
        
        // Reset classes cơ bản
        el.classList.remove('opacity-50', 'pointer-events-none', 'cursor-pointer');
        if (badge) badge.classList.add('hidden');

        // Lấy thẻ div chứa text tiêu đề kỹ năng để đổi màu chữ tùy trạng thái active
        const titleContainer = el.querySelector('div.flex.items-center.justify-between') || el.firstElementChild;
        if (titleContainer) {
            titleContainer.classList.remove('text-white', 'text-slate-400', 'bg-slate-800/40', 'rounded-lg');
        }

        if (examMode === 'practice') {
            // Chế độ TRẢI NGHIỆM: Cho phép click tự do chuyển kỹ năng
            el.classList.add('cursor-pointer');
            if (node === currentSkill) {
                // Highlight kỹ năng đang làm
                if (titleContainer) {
                    titleContainer.classList.add('text-white', 'bg-slate-800/40', 'rounded-lg');
                }
                if (badge) badge.classList.remove('hidden');
            } else {
                if (titleContainer) titleContainer.classList.add('text-slate-400');
            }
        } else {
            // Chế độ NGHIÊM TÚC: Khóa các kỹ năng khác, đi tuần tự
            if (node === currentSkill) {
                if (titleContainer) {
                    titleContainer.classList.add('text-white');
                }
                if (badge) badge.classList.remove('hidden');
            } else {
                el.classList.add('opacity-50', 'pointer-events-none');
                if (titleContainer) titleContainer.classList.add('text-slate-400');
            }
        }
    });

    document.getElementById('readingSectionsList').classList.add('hidden');
    document.getElementById('listeningSectionsList').classList.add('hidden');

    if (currentSkill === 'reading') {
        document.getElementById('readingSectionsList').classList.remove('hidden');
    } else if (currentSkill === 'listening') {
        document.getElementById('listeningSectionsList').classList.remove('hidden');
    }
}

// Cho phép chuyển đổi kỹ năng tự do ở chế độ Trải nghiệm
function onSidebarNodeClick(targetSkill) {
    if (examMode !== 'practice') {
        // Nếu ở chế độ nghiêm túc và đang thi, click vào sidebar sẽ hiện cảnh báo
        if (appState === 'active_test') {
            showStrictWarning();
        }
        return;
    }
    
    if (currentSkill === targetSkill) return;

    // Dừng các hoạt động của kỹ năng cũ
    stopActiveAudio();
    if (typeof listeningAudioPlaying !== 'undefined') {
        listeningAudioPlaying = false;
        const btnIcon = document.getElementById('listeningPlayIcon');
        if (btnIcon) btnIcon.className = "fa-solid fa-play text-sm";
        const progressBar = document.getElementById('listeningMediaProgressBar');
        if (progressBar) progressBar.style.width = "0%";
    }
    
    if (currentSkill === 'speaking') {
        clearInterval(speakingRingInterval);
        if (speechRecognitionObj) {
            try { speechRecognitionObj.stop(); } catch(e) {}
        }
        const exVideo = document.getElementById('examinerVideo');
        if (exVideo) {
            exVideo.onended = null;
            exVideo.onloadedmetadata = null;
            exVideo.pause();
        }
    }
    
    // Đổi sang kỹ năng đích
    currentSkill = targetSkill;
    
    // Khởi chạy kỹ năng đích
    startSkillActiveTest();
    updateSidebarStatus();
}

function toggleTextScaleSlider() {
    document.getElementById('textScalePanel').classList.toggle('hidden');
}

function adjustTextScale(val) {
    textScale = parseInt(val);
    const label = document.getElementById('textScaleLabel');
    const sizes = ["font-size-small", "font-size-medium", "font-size-large"];
    const labels = ["Nhỏ", "Mặc định", "Lớn"];

    label.innerText = labels[textScale - 1];

    const mediaText = document.getElementById('mediaPaneText');
    const reviewText = document.getElementById('reviewMediaText');

    if (mediaText) {
        mediaText.className = `text-slate-350 leading-relaxed ${sizes[textScale - 1]} space-y-4`;
    }
    if (reviewText) {
        reviewText.className = `text-slate-350 leading-relaxed ${sizes[textScale - 1]} space-y-4`;
    }
}

function triggerBackWarning() {
    if (examMode === 'strict') {
        showStrictWarning();
    } else {
        logoutToLanding();
    }
}

function showStrictWarning() {
    const modal = document.getElementById('modalStrictWarning');
    if (modal) modal.classList.remove('hidden');
}

function closeStrictWarning() {
    const modal = document.getElementById('modalStrictWarning');
    if (modal) modal.classList.add('hidden');
}

function showSimpleWarning(title, desc) {
    document.getElementById('warnTitle').innerText = title;
    document.getElementById('warnDesc').innerText = desc;
    document.getElementById('modalSimpleWarning').classList.remove('hidden');
}

function closeSimpleWarning() {
    document.getElementById('modalSimpleWarning').classList.add('hidden');
}

function logoutToLanding() {
    if (examMode === 'strict' && appState === 'active_test') {
        showStrictWarning();
        return;
    }

    clearInterval(headerTimerObj);
    clearInterval(speakingRingInterval);
    stopActiveAudio();
    clearProgressFromLocalStorage();
    window.onbeforeunload = null; // Gỡ bỏ chặn reload trang khi thực sự thoát

    teacherName = "Giáo viên phổ thông";
    teacherPhone = "";
    const headerDisplay = document.getElementById('userDisplayName');
    if (headerDisplay) headerDisplay.innerText = "Thầy/Cô Giáo viên";
    const nameInput = document.getElementById('inputTeacherName');
    if (nameInput) nameInput.value = "";
    const phoneInput = document.getElementById('inputTeacherPhone');
    if (phoneInput) phoneInput.value = "";

    setAppState('landing');
    techieGreetingIdx = 0;
    document.getElementById('techieText').innerText = techieGreetings[0];
    document.getElementById('btnTechieNext').innerText = "Nhấn để tiếp tục";
    document.getElementById('btnTechieNext').classList.remove('hidden');
    document.getElementById('btnStartTest').classList.remove('hidden');
    
    // Reset radio button testMode
    const modePractice = document.getElementById('modePractice');
    if (modePractice) modePractice.checked = true;

    loadLeaderboard();
}

// --- TIỆN ÍCH LƯU TRỮ VÀ THỐNG KÊ TIẾN TRÌNH ---
function saveProgressToLocalStorage() {
    if (appState === 'landing' || appState === 'summary') {
        return;
    }
    
    const progressData = {
        currentSkill,
        appState,
        teacherName,
        teacherPhone,
        textScale,
        globalBilingualMode,
        testSecondsRemaining,
        readingAdaptive,
        listeningAdaptive,
        speakingAnswers,
        speakingFinalLevel,
        speakingAiResult,
        currentSpeakingQIdx,
        writingAnswerText,
        writingFinalLevel,
        writingAiResult,
        questionTimers,
        currentFocusQuestionId,
        timestamp: Date.now()
    };
    
    localStorage.setItem('khao_sat_tieng_anh_gv_progress', JSON.stringify(progressData));
}

function clearProgressFromLocalStorage() {
    localStorage.removeItem('khao_sat_tieng_anh_gv_progress');
}

function setCurrentFocusQuestion(qId) {
    currentFocusQuestionId = qId;
    saveProgressToLocalStorage();
}

function loadProgressFromLocalStorage() {
    const raw = localStorage.getItem('khao_sat_tieng_anh_gv_progress');
    if (!raw) return false;
    
    try {
        const data = JSON.parse(raw);
        
        // Bỏ qua nếu dữ liệu quá hạn 2 tiếng
        const age = Date.now() - data.timestamp;
        if (age > 2 * 60 * 60 * 1000) { 
            clearProgressFromLocalStorage();
            return false;
        }
        
        // Khôi phục các biến
        currentSkill = data.currentSkill;
        appState = data.appState;
        teacherName = data.teacherName || "Giáo viên phổ thông";
        teacherPhone = data.teacherPhone || "";
        textScale = data.textScale || 2;
        globalBilingualMode = data.globalBilingualMode || false;
        testSecondsRemaining = data.testSecondsRemaining || 900;
        
        readingAdaptive = data.readingAdaptive;
        listeningAdaptive = data.listeningAdaptive;
        speakingAnswers = data.speakingAnswers || [];
        speakingFinalLevel = data.speakingFinalLevel || "A2";
        speakingAiResult = data.speakingAiResult || null;
        currentSpeakingQIdx = data.currentSpeakingQIdx || 0;
        writingAnswerText = data.writingAnswerText || "";
        writingFinalLevel = data.writingFinalLevel || "B1";
        writingAiResult = data.writingAiResult || null;
        
        questionTimers = data.questionTimers || {};
        currentFocusQuestionId = data.currentFocusQuestionId || null;
        
        // Khôi phục UI cỡ chữ
        adjustTextScale(textScale);

        // Khôi phục UI tên giáo viên và số điện thoại
        const headerDisplay = document.getElementById('userDisplayName');
        if (headerDisplay) headerDisplay.innerText = `Thầy/Cô ${teacherName}`;
        const nameInput = document.getElementById('inputTeacherName');
        if (nameInput) nameInput.value = teacherName;
        const phoneInput = document.getElementById('inputTeacherPhone');
        if (phoneInput) phoneInput.value = teacherPhone;
        
        // Khôi phục UI song ngữ
        const btn = document.getElementById('btnGlobalBilingualToggle');
        if (btn) {
            if (globalBilingualMode) {
                btn.innerHTML = `<i class="fa-solid fa-language text-sm"></i> <span>Song ngữ: BẬT</span>`;
                btn.classList.add('bg-blue-600/20');
            } else {
                btn.innerHTML = `<i class="fa-solid fa-language text-sm"></i> <span>Song ngữ: TẮT</span>`;
                btn.classList.remove('bg-blue-600/20');
            }
        }
        
        setAppState(appState);
        updateSidebarStatus();
        
        if (appState === 'instruction') {
            loadSkillInstruction(currentSkill);
        } else if (appState === 'active_test') {
            updateGlobalTimerDisplay();
            clearInterval(headerTimerObj);
            headerTimerObj = setInterval(() => {
                testSecondsRemaining--;
                
                if (appState === 'active_test' && currentFocusQuestionId) {
                    if (!questionTimers[currentFocusQuestionId]) {
                        questionTimers[currentFocusQuestionId] = 0;
                    }
                    questionTimers[currentFocusQuestionId]++;
                }

                if (testSecondsRemaining <= 0) {
                    clearInterval(headerTimerObj);
                    autoSubmitOnTimeout();
                } else {
                    updateGlobalTimerDisplay();
                }
                
                saveProgressToLocalStorage();
            }, 1000);
            
            if (currentSkill === 'speaking') {
                loadSpeakingQuestion(currentSpeakingQIdx);
            } else if (currentSkill === 'writing') {
                const promptPane = document.getElementById('writingPromptPane');
                const translationBox = document.getElementById('writingPromptTranslation');
                const db = adaptiveDb.writing;

                promptPane.innerHTML = db.media;
                translationBox.innerHTML = db.mediaTranslation;
                
                const editor = document.getElementById('writingEditor');
                editor.value = writingAnswerText;
                updateWritingContent(editor);
                
                if (globalBilingualMode) {
                    translationBox.classList.remove('hidden');
                } else {
                    translationBox.classList.add('hidden');
                }
                currentFocusQuestionId = "writing_task2";
            } else {
                loadTwoPanelExamData();
            }
        }
        
        return true;
    } catch (e) {
        console.error("Lỗi restore tiến trình:", e);
        clearProgressFromLocalStorage();
        return false;
    }
}

function renderTimeStatsTable() {
    const tbody = document.getElementById('questionTimeStatsBody');
    if (!tbody) return;
    
    let html = "";
    let stats = [];

    // 1. Kỹ năng Đọc
    readingAdaptive.stages.forEach((level, stageIdx) => {
        const db = adaptiveDb.reading[level];
        db.questions.forEach((q, qIdx) => {
            const time = questionTimers[q.id] || 0;
            stats.push({
                skill: "Đọc (Reading)",
                level: `Lượt ${stageIdx + 1}: Mô-đun ${level}`,
                question: `Câu hỏi ${qIdx + 1}`,
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
                skill: "Nghe (Listening)",
                level: `Lượt ${stageIdx + 1}: Mô-đun ${level}`,
                question: `Câu hỏi ${qIdx + 1}`,
                time: time
            });
        });
    });

    // 3. Kỹ năng Nói
    adaptiveDb.speaking.forEach((q, qIdx) => {
        const time = questionTimers[q.id] || 0;
        stats.push({
            skill: "Nói (Speaking)",
            level: "IELTS Speaking Format",
            question: `Câu hỏi ${qIdx + 1}`,
            time: time
        });
    });

    // 4. Kỹ năng Viết
    const wTime = questionTimers["writing_task2"] || 0;
    stats.push({
        skill: "Viết (Writing)",
        level: "IELTS Writing Task 2",
        question: "Bài viết luận",
        time: wTime
    });

    // Sắp xếp giảm dần theo thời gian suy nghĩ
    stats.sort((a, b) => b.time - a.time);

    stats.forEach(item => {
        const m = Math.floor(item.time / 60);
        const s = item.time % 60;
        const timeStr = `${m}m ${s}s`;
        
        let difficulty = "Dễ";
        let diffBadge = "bg-green-500/10 text-green-400 border border-green-500/25 px-2 py-0.5 rounded";
        if (item.time > 90) {
            difficulty = "Rất Khó";
            diffBadge = "bg-rose-500/10 text-rose-400 border border-rose-500/25 px-2 py-0.5 rounded animate-pulse";
        } else if (item.time > 45) {
            difficulty = "Trung Bình";
            diffBadge = "bg-yellow-500/10 text-yellow-400 border border-yellow-500/25 px-2 py-0.5 rounded";
        }

        html += `
            <tr class="hover:bg-slate-800/20 transition duration-150">
                <td class="font-bold text-slate-350 py-3">${item.skill}</td>
                <td class="text-slate-400 py-3">${item.level}</td>
                <td class="font-semibold text-blue-400 py-3">${item.question}</td>
                <td class="py-3"><span class="badge-time-highlight font-mono">${timeStr}</span></td>
                <td class="py-3"><span class="${diffBadge} text-[10px] font-bold">${difficulty}</span></td>
            </tr>
        `;
    });

    if (stats.length === 0) {
        html = `<tr><td colspan="5" class="text-center text-slate-500 py-4">Chưa có dữ liệu làm bài.</td></tr>`;
    }

    tbody.innerHTML = html;
}

// Xuất báo cáo thống kê thời gian ra file Excel (CSV)
function exportTimeStatsToExcel() {
    let stats = [];

    // 1. Kỹ năng Đọc
    readingAdaptive.stages.forEach((level, stageIdx) => {
        const db = adaptiveDb.reading[level];
        db.questions.forEach((q, qIdx) => {
            const time = questionTimers[q.id] || 0;
            stats.push({
                skill: "Đọc (Reading)",
                level: `Lượt ${stageIdx + 1}: Mô-đun ${level}`,
                question: `Câu hỏi ${qIdx + 1}`,
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
                skill: "Nghe (Listening)",
                level: `Lượt ${stageIdx + 1}: Mô-đun ${level}`,
                question: `Câu hỏi ${qIdx + 1}`,
                time: time
            });
        });
    });

    // 3. Kỹ năng Nói
    adaptiveDb.speaking.forEach((q, qIdx) => {
        const time = questionTimers[q.id] || 0;
        stats.push({
            skill: "Nói (Speaking)",
            level: "IELTS Speaking Format",
            question: `Câu hỏi ${qIdx + 1}`,
            time: time
        });
    });

    // 4. Kỹ năng Viết
    const wTime = questionTimers["writing_task2"] || 0;
    stats.push({
        skill: "Viết (Writing)",
        level: "IELTS Writing Task 2",
        question: "Bài viết luận",
        time: wTime
    });

    // Sắp xếp giảm dần theo thời gian suy nghĩ
    stats.sort((a, b) => b.time - a.time);

    // Xây dựng nội dung CSV với BOM UTF-8 để hỗ trợ ký tự Tiếng Việt có dấu trên Excel
    let csvContent = "\uFEFF";
    csvContent += "Kỹ năng,Cấp độ / Phần thi,Câu hỏi,Thời gian trả lời,Độ khó tương đối\n";

    stats.forEach(item => {
        const m = Math.floor(item.time / 60);
        const s = item.time % 60;
        const timeStr = `${m}m ${s}s`;
        
        let difficulty = "Dễ";
        if (item.time > 90) {
            difficulty = "Rất Khó";
        } else if (item.time > 45) {
            difficulty = "Trung Bình";
        }

        // Đóng ngoặc kép để tránh lỗi định dạng nếu văn bản chứa dấu phẩy
        const skill = `"${item.skill.replace(/"/g, '""')}"`;
        const level = `"${item.level.replace(/"/g, '""')}"`;
        const question = `"${item.question.replace(/"/g, '""')}"`;
        
        csvContent += `${skill},${level},${question},${timeStr},${difficulty}\n`;
    });

    // Tạo blob tải xuống client-side
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "Bao_cao_thong_ke_thoi_gian_khoa_sat.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Tải bảng xếp hạng thi đua giáo viên từ Supabase qua backend
function loadLeaderboard() {
    const tbody = document.getElementById('leaderboardBody');
    if (!tbody) return;

    fetch('/api/leaderboard')
    .then(res => res.json())
    .then(res => {
        if (res.success && Array.isArray(res.data)) {
            leaderboardData = res.data;
            renderLeaderboardTable(leaderboardData);
            
            // Hiển thị tổng số giáo viên đã test thử
            const totalEl = document.getElementById('totalTeachersCount');
            if (totalEl && res.totalCount !== undefined) {
                totalEl.innerText = res.totalCount;
            }
        } else {
            throw new Error(res.error || "Không thể tải dữ liệu");
        }
    })
    .catch(err => {
        console.warn("[Leaderboard] Gặp lỗi khi tải bảng vinh danh:", err);
        tbody.innerHTML = `<tr><td colspan="4" class="text-center text-rose-500/70 py-4 text-[10px]">Không thể kết nối máy chủ để tải bảng xếp hạng.</td></tr>`;
    });
}

// Ẩn 4 chữ số ở giữa số điện thoại để đảm bảo bảo mật riêng tư
function maskPhone(phone) {
    if (!phone) return "";
    if (phone.length <= 6) return phone;
    const first = phone.slice(0, 3);
    const last = phone.slice(-3);
    const maskLen = phone.length - 6;
    const stars = "*".repeat(maskLen);
    return `${first}${stars}${last}`;
}

// Loại bỏ dấu tiếng Việt để phục vụ tìm kiếm không dấu
function removeVietnameseTones(str) {
    if (!str) return "";
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|U|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ạ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/\u0300|\u0301|\u0309|\u0303|\u0323/g, ""); 
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); 
    return str;
}

// Render dữ liệu bảng xếp hạng thi đua ra giao diện HTML
function renderLeaderboardTable(data) {
    const tbody = document.getElementById('leaderboardBody');
    if (!tbody) return;

    let html = "";
    data.forEach((item, idx) => {
        let rankIcon = `${idx + 1}`;
        if (idx === 0) rankIcon = "🏆";
        else if (idx === 1) rankIcon = "🥈";
        else if (idx === 2) rankIcon = "🥉";

        let overallBadge = "bg-blue-500/10 text-blue-400 border border-blue-500/20";
        if (item.highest_overall_cefr === "C2" || item.highest_overall_cefr === "C1") {
            overallBadge = "bg-amber-500/10 text-amber-400 border border-amber-500/25 font-black";
        } else if (item.highest_overall_cefr === "B2" || item.highest_overall_cefr === "B1") {
            overallBadge = "bg-teal-500/10 text-teal-400 border border-teal-500/25 font-bold";
        }

        const maskedPhone = maskPhone(item.phone);
        const displayName = maskedPhone ? `${item.teacher_name} (${maskedPhone})` : item.teacher_name;

        html += `
            <tr class="hover:bg-slate-800/20 transition duration-150 cursor-pointer" onclick="showTeacherStatsModal('${item.phone}', '${item.teacher_name}')" title="Bấm để xem chi tiết thời gian suy nghĩ của Thầy/Cô ${item.teacher_name}">
                <td class="py-2.5 font-bold text-center">${rankIcon}</td>
                <td class="py-2.5 font-semibold text-slate-350 truncate max-w-[120px] text-blue-400 hover:underline" title="${item.teacher_name}${maskedPhone ? ' - SĐT: ' + maskedPhone : ''}">${displayName}</td>
                <td class="py-2.5 text-center"><span class="px-1.5 py-0.5 rounded text-[10px] ${overallBadge}">${item.highest_overall_cefr || "N/A"}</span></td>
                <td class="py-2.5 text-right font-mono text-slate-400 pr-2">${item.attempts_count || 1}</td>
            </tr>
        `;
    });

    if (data.length === 0) {
        html = `<tr><td colspan="4" class="text-center text-slate-500 py-4 italic">Không tìm thấy kết quả phù hợp.</td></tr>`;
    }
    tbody.innerHTML = html;
}

// Lọc bảng xếp hạng thi đua ở client-side theo Họ tên hoặc SĐT
function filterLeaderboard(query) {
    const q = removeVietnameseTones(query.trim().toLowerCase());
    if (!q) {
        renderLeaderboardTable(leaderboardData);
        return;
    }
    const filtered = leaderboardData.filter(item => {
        const nameMatch = removeVietnameseTones(item.teacher_name || "").toLowerCase().includes(q);
        const phoneMatch = (item.phone || "").toLowerCase().includes(q);
        return nameMatch || phoneMatch;
    });
    renderLeaderboardTable(filtered);
}

// Biến lưu trữ dữ liệu thời gian suy nghĩ cho Modal popup
let modalTimeStatsData = [];
let currentModalTeacherName = "";

// Hiển thị Modal chi tiết thời gian suy nghĩ của giáo viên khi click bảng vinh danh
function showTeacherStatsModal(phone, teacherName) {
    if (!phone) return;
    
    currentModalTeacherName = teacherName;
    const modal = document.getElementById('teacherStatsModal');
    const nameEl = document.getElementById('modalTeacherName');
    const tbody = document.getElementById('modalTimeStatsBody');
    
    if (!modal || !nameEl || !tbody) return;
    
    nameEl.innerText = teacherName;
    tbody.innerHTML = `<tr><td colspan="5" class="text-center text-slate-400 py-4"><i class="fa-solid fa-spinner animate-spin mr-2"></i>Đang tải dữ liệu thời gian từ máy chủ...</td></tr>`;
    modal.classList.remove('hidden');
    
    fetch(`/api/teacher-time-stats?phone=${encodeURIComponent(phone)}`)
    .then(res => res.json())
    .then(res => {
        if (res.success && Array.isArray(res.data)) {
            modalTimeStatsData = res.data;
            renderModalStatsTable(modalTimeStatsData);
        } else {
            throw new Error(res.error || "Không thể tải dữ liệu");
        }
    })
    .catch(err => {
        console.error("[Modal Stats] Lỗi khi tải thời gian suy nghĩ:", err);
        tbody.innerHTML = `<tr><td colspan="5" class="text-center text-rose-500 py-4">Gặp lỗi khi tải dữ liệu thời gian của giáo viên này. Có thể chưa có lượt thi chính thức nào được lưu.</td></tr>`;
    });
}

// Render dữ liệu thời gian vào bảng trong Modal
function renderModalStatsTable(stats) {
    const tbody = document.getElementById('modalTimeStatsBody');
    if (!tbody) return;
    
    // Bản dịch kỹ năng sang tiếng Việt để hiển thị thân thiện
    const skillTranslations = {
        "Reading": "Đọc (Reading)",
        "Listening": "Nghe (Listening)",
        "Speaking": "Nói (Speaking)",
        "Writing": "Viết (Writing)"
    };
    
    // Bản dịch level sang tiếng Việt
    const levelTranslations = (skill, level) => {
        if (skill === "Speaking") return "IELTS Speaking Format";
        if (skill === "Writing") return "IELTS Writing Task 2";
        // Đối với Reading/Listening thích ứng
        return level; 
    };

    // Bản dịch câu hỏi
    const questionTranslations = (skill, q) => {
        if (skill === "Writing") return "Bài viết luận";
        if (q.startsWith("Q")) {
            return `Câu hỏi ${q.slice(1)}`;
        }
        return q;
    };

    let html = "";
    
    // Sao chép mảng để sắp xếp giảm dần theo thời gian
    let sortedStats = [...stats];
    sortedStats.sort((a, b) => b.time - a.time);

    sortedStats.forEach(item => {
        const m = Math.floor(item.time / 60);
        const s = item.time % 60;
        const timeStr = `${m}m ${s}s`;
        
        let difficulty = "Dễ";
        let diffBadge = "bg-green-500/10 text-green-400 border border-green-500/25 px-2 py-0.5 rounded";
        if (item.time > 90) {
            difficulty = "Rất Khó";
            diffBadge = "bg-rose-500/10 text-rose-400 border border-rose-500/25 px-2 py-0.5 rounded animate-pulse";
        } else if (item.time > 45) {
            difficulty = "Trung Binh";
            diffBadge = "bg-yellow-500/10 text-yellow-400 border border-yellow-500/25 px-2 py-0.5 rounded";
        }

        const transSkill = skillTranslations[item.skill] || item.skill;
        const transLevel = levelTranslations(item.skill, item.level);
        const transQ = questionTranslations(item.skill, item.question);

        html += `
            <tr class="hover:bg-slate-800/20 transition duration-150">
                <td class="font-bold text-slate-350 py-3">${transSkill}</td>
                <td class="text-slate-400 py-3">${transLevel}</td>
                <td class="font-semibold text-blue-400 py-3">${transQ}</td>
                <td class="py-3"><span class="badge-time-highlight font-mono">${timeStr}</span></td>
                <td class="py-3"><span class="${diffBadge} text-[10px] font-bold">${difficulty}</span></td>
            </tr>
        `;
    });

    if (sortedStats.length === 0) {
        html = `<tr><td colspan="5" class="text-center text-slate-500 py-4 italic">Giáo viên này chưa có dữ liệu chi tiết từng câu hỏi.</td></tr>`;
    }

    tbody.innerHTML = html;
}

// Đóng Modal popup
function closeTeacherStatsModal() {
    const modal = document.getElementById('teacherStatsModal');
    if (modal) modal.classList.add('hidden');
}

// Xuất dữ liệu từ Modal ra file Excel (CSV)
function exportModalTimeStatsToExcel() {
    if (!modalTimeStatsData || modalTimeStatsData.length === 0) {
        alert("Chưa có dữ liệu làm bài để xuất báo cáo!");
        return;
    }

    // Bản dịch tương tự
    const skillTranslations = {
        "Reading": "Đọc (Reading)",
        "Listening": "Nghe (Listening)",
        "Speaking": "Nói (Speaking)",
        "Writing": "Viết (Writing)"
    };
    
    const levelTranslations = (skill, level) => {
        if (skill === "Speaking") return "IELTS Speaking Format";
        if (skill === "Writing") return "IELTS Writing Task 2";
        return level; 
    };

    const questionTranslations = (skill, q) => {
        if (skill === "Writing") return "Bài viết luận";
        if (q.startsWith("Q")) return `Câu hỏi ${q.slice(1)}`;
        return q;
    };

    let csvContent = "\uFEFF"; // UTF-8 BOM
    csvContent += "Kỹ năng,Cấp độ / Phần thi,Câu hỏi,Thời gian trả lời (giây),Độ khó tương đối\n";

    let sortedStats = [...modalTimeStatsData];
    sortedStats.sort((a, b) => b.time - a.time);

    sortedStats.forEach(item => {
        const transSkill = skillTranslations[item.skill] || item.skill;
        const transLevel = levelTranslations(item.skill, item.level);
        const transQ = questionTranslations(item.skill, item.question);

        let difficulty = "Dễ";
        if (item.time > 90) difficulty = "Rất Khó";
        else if (item.time > 45) difficulty = "Trung Binh";

        const skillStr = `"${transSkill.replace(/"/g, '""')}"`;
        const levelStr = `"${transLevel.replace(/"/g, '""')}"`;
        const qStr = `"${transQ.replace(/"/g, '""')}"`;
        
        csvContent += `${skillStr},${levelStr},${qStr},${item.time},${difficulty}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    // Tên file thân thiện chứa tên giáo viên
    const safeName = removeVietnameseTones(currentModalTeacherName).replace(/\s+/g, '_');
    link.setAttribute("href", url);
    link.setAttribute("download", `Bao_cao_thoi_gian_${safeName}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Khởi chạy hệ thống mặc định
window.onload = function() {
    const restored = loadProgressFromLocalStorage();
    if (!restored) {
        setAppState('landing');
        // Mặc định TẮT song ngữ toàn hệ thống khi bắt đầu thi
        globalBilingualMode = false;
        const btn = document.getElementById('btnGlobalBilingualToggle');
        if (btn) {
            btn.innerHTML = `<i class="fa-solid fa-language text-sm"></i> <span>Song ngữ: TẮT</span>`;
            btn.classList.remove('bg-blue-600/20');
        }
        // Tải bảng vinh danh giáo viên
        loadLeaderboard();
    }
};
