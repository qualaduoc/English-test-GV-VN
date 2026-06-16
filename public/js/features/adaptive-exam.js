// --- MODULE THI THÍCH ỨNG: ĐỌC & NGHE ---

function preloadAudioForCurrentStage(type, level) {
    let localUrl = "";
    if (type === 'hardware_check') {
        localUrl = "audio/hardware_check.mp3";
    } else if (type === 'listening') {
        localUrl = `audio/listening_${level.toLowerCase()}.mp3`;
    } else {
        return;
    }
    console.log(`[Lazy Load] Khởi tạo tải trước âm thanh (${type}): ${localUrl}`);
    preloadedAudioObj = new Audio();
    preloadedAudioObj.preload = "auto";
    preloadedAudioObj.src = localUrl;
    preloadedAudioObj.load(); // Bắt đầu tải ngầm
}

function stopActiveAudio() {
    if (activeHtml5Audio) {
        activeHtml5Audio.pause();
        activeHtml5Audio = null;
    }
    window.speechSynthesis.cancel();
}

function playAudioWithFallback(localUrl, onlineUrl, ttsText, onPlayCallback, onEndCallback, onProgressCallback) {
    stopActiveAudio();
    
    let audio;
    if (preloadedAudioObj && preloadedAudioObj.src && preloadedAudioObj.src.endsWith(localUrl)) {
        audio = preloadedAudioObj;
        console.log(`[Lazy Load] Sử dụng âm thanh đã tải trước: ${localUrl}`);
    } else {
        audio = new Audio(localUrl);
    }
    activeHtml5Audio = audio;
    
    let isFinished = false;
    
    audio.onplay = () => {
        if (onPlayCallback) onPlayCallback();
    };
    
    audio.onended = () => {
        isFinished = true;
        if (onEndCallback) onEndCallback();
    };
    
    audio.onerror = () => {
        if (isFinished) return;
        console.warn("Không load được file audio local, chuyển sang online:", localUrl);
        
        let onlineAudio = new Audio(onlineUrl);
        activeHtml5Audio = onlineAudio;
        
        onlineAudio.onplay = () => {
            if (onPlayCallback) onPlayCallback();
        };
        
        onlineAudio.onended = () => {
            isFinished = true;
            if (onEndCallback) onEndCallback();
        };
        
        onlineAudio.onerror = () => {
            if (isFinished) return;
            console.warn("Không load được audio online, fallback về TTS trình duyệt:", onlineUrl);
            
            if ('speechSynthesis' in window) {
                const utter = new SpeechSynthesisUtterance(ttsText);
                utter.lang = "en-US";
                utter.rate = 0.82;
                utter.onstart = () => {
                    if (onPlayCallback) onPlayCallback();
                };
                utter.onend = () => {
                    isFinished = true;
                    if (onEndCallback) onEndCallback();
                };
                window.speechSynthesis.speak(utter);
            } else {
                showSimpleWarning("Lỗi âm thanh", "Trình duyệt của Thầy/Cô không hỗ trợ phát âm thanh.");
                if (onEndCallback) onEndCallback();
            }
        };
        
        onlineAudio.play().catch(err => {
            console.error("Không thể phát online audio:", err);
            onlineAudio.onerror();
        });
    };
    
    if (onProgressCallback) {
        audio.ontimeupdate = () => {
            if (audio.duration) {
                const progress = (audio.currentTime / audio.duration) * 100;
                onProgressCallback(progress, audio.currentTime, audio.duration);
            }
        };
    }
    
    audio.play().catch(err => {
        audio.onerror();
    });
}

// Techie Greetings
const techieGreetings = [
    "Xin chào Thầy/Cô! Mình là Techie - trợ lý ảo. Hôm nay mình sẽ hướng dẫn Thầy/Cô thực hiện bài khảo sát năng lực Tiếng Anh 4 kỹ năng mô phỏng để làm quen thao tác.",
    "LƯU Ý QUAN TRỌNG: Đây chỉ là ứng dụng mô phỏng chạy trên trình duyệt nhằm giúp Thầy/Cô trải nghiệm cấu trúc đề thi. Kết quả tự chấm chỉ mang tính chất tham khảo, không có giá trị cấp chứng chỉ. Bấm nút dưới để xem tiếp.",
    "Bài khảo sát Đọc và Nghe sẽ chạy theo thuật toán THÍCH ỨNG (Adaptive) bắt đầu từ mô-đun B1. Hệ thống tự động chuyển đổi mô-đun khó hơn hoặc dễ hơn dựa trên kết quả làm bài của Thầy/Cô. Chúc Thầy/Cô làm bài thật tốt!"
];
let techieGreetingIdx = 0;


// --- PHẦN 3: KHỞI ĐỘNG VÀ LOGIC PHÒNG THI CHÍNH THỨC ---
function startSkillActiveTest() {
    // Tắt các audio test đang chạy dở
    stopActiveAudio();
    hwAudioSpeech = false;

    setAppState('active_test');
    viewingPastStage = null; // Reset xem lại khi sang phần thi mới

    // Bắt đầu đếm ngược 15 phút
    testSecondsRemaining = 900;
    updateGlobalTimerDisplay();
    
    // Tự động focus câu hỏi đầu tiên
    if (currentSkill === 'reading' && adaptiveDb.reading[readingAdaptive.currentLevel]) {
        currentFocusQuestionId = adaptiveDb.reading[readingAdaptive.currentLevel].questions[0].id;
    } else if (currentSkill === 'listening' && adaptiveDb.listening[listeningAdaptive.currentLevel]) {
        currentFocusQuestionId = adaptiveDb.listening[listeningAdaptive.currentLevel].questions[0].id;
    } else if (currentSkill === 'speaking') {
        currentFocusQuestionId = "s1";
    } else if (currentSkill === 'writing') {
        currentFocusQuestionId = "writing_task2";
    }

    clearInterval(headerTimerObj);
    headerTimerObj = setInterval(() => {
        testSecondsRemaining--;
        
        // Tăng thời gian suy nghĩ cho câu hỏi đang focus
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
        
        // Tự động lưu tiến trình làm bài
        saveProgressToLocalStorage();
    }, 1000);

    // Chuyển màn hình tương ứng
    if (currentSkill === 'speaking') {
        initSpeakingExam();
    } else if (currentSkill === 'writing') {
        initWritingExam();
    } else {
        loadTwoPanelExamData();
    }
    
    saveProgressToLocalStorage();
}

function updateGlobalTimerDisplay() {
    const min = Math.floor(testSecondsRemaining / 60);
    const sec = testSecondsRemaining % 60;
    document.getElementById('globalTimer').innerText = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

const questionExplanations = {
    // READING
    "r_a1_1": {
        en: "John mentions: 'I work as an English teacher in a primary school', which directly indicates he is a teacher.",
        vi: "John đề cập: 'Tôi làm giáo viên Tiếng Anh tại một trường tiểu học', trực tiếp chỉ ra công việc của anh ấy là giáo viên."
    },
    "r_a1_2": {
        en: "John says: 'I walk to work every day because it is good for my health.'",
        vi: "John nói: 'Tôi đi bộ đi làm mỗi ngày vì nó tốt cho sức khỏe.'"
    },
    "r_a1_3": {
        en: "John lists his hobbies as 'reading books, playing tennis on weekends, and cooking dinner', but does not mention playing soccer.",
        vi: "John liệt kê các sở thích là đọc sách, chơi tennis và nấu ăn, nhưng không hề nhắc đến việc chơi bóng đá."
    },
    "r_a2_1": {
        en: "The article discusses the widespread use of plastic, its long lifetime (500 years), and the serious pollution it causes.",
        vi: "Bài viết thảo luận về việc sử dụng nhựa rộng rãi, tuổi thọ phân hủy cực lâu (500 năm) và mối nguy hại rác thải nhựa gây ra."
    },
    "r_a2_2": {
        en: "The text states: 'A plastic bag can last for 500 years!'",
        vi: "Đoạn văn viết rõ: 'Một túi nhựa có thể tồn tại tới 500 năm!'"
    },
    "r_a2_3": {
        en: "The text mentions: 'they were only invented about 70 years ago'.",
        vi: "Đoạn văn chỉ ra: 'chúng mới chỉ được phát minh ra cách đây 70 năm'."
    },
    "r_b1_1": {
        en: "The text mentions: 'Previously, extended families living together under one roof was common in many Asian cultures.'",
        vi: "Đoạn văn ghi: 'Trước đây, các đại gia đình sống chung dưới một mái nhà rất phổ biến ở nhiều nền văn hóa châu Á.'"
    },
    "r_b1_2": {
        en: "The text states: 'This shift is primarily driven by urban migration, where young adults move to big cities for career opportunities and education.'",
        vi: "Đoạn văn nêu: 'Sự thay đổi này chủ yếu được thúc đẩy bởi sự di cư đô thị, nơi những người trẻ tuổi chuyển đến các thành phố lớn để tìm kiếm cơ hội nghề nghiệp và giáo dục.'"
    },
    "r_b1_3": {
        en: "'Prevalent' means common, dominant, or widespread in a particular area at a particular time.",
        vi: "Từ 'prevalent' mang nghĩa là phổ biến, thịnh hành hoặc rộng rãi tại một thời điểm hoặc khu vực nhất định."
    },
    "r_b2_1": {
        en: "The text states: 'In the past, children had to visit physical libraries, manually search through catalog systems, and copy information...' which corresponds to visiting physical libraries.",
        vi: "Đoạn văn chỉ ra: 'Trước đây, trẻ em phải đến các thư viện vật lý, tìm kiếm thủ công qua hệ thống thư mục và sao chép thông tin...' tương đương việc đến thư viện vật lý tra cứu."
    },
    "r_b2_2": {
        en: "The text mentions: 'this effortless accessibility presents a massive challenge: information overload and the rising difficulty of evaluating the credibility of digital articles.'",
        vi: "Đoạn văn nêu: 'khả năng tiếp cận dễ dàng này lại đặt ra một thách thức lớn: quá tải thông tin và khó khăn ngày càng tăng trong việc đánh giá mức độ uy tín của các bài viết.'"
    },
    "r_b2_3": {
        en: "The text notes: 'Without proper critical thinking skills, students risk using unverified and biased sources... highlighting the need for digital literacy.' This implies digital articles must be analyzed and selected carefully.",
        vi: "Đoạn văn ghi: 'Nếu không có kỹ năng tư duy phản biện thích hợp, học sinh có nguy cơ sử dụng các nguồn tài liệu chưa được kiểm chứng và thiên lệch... nhấn mạnh sự cần thiết phải lọc thông tin kỹ lưỡng.'"
    },
    "r_c1_1": {
        en: "The text states: 'Educators worry that generative language models could undermine developmental writing processes, leading to cognitive dependency.'",
        vi: "Đoạn văn viết: 'Các nhà giáo dục lo ngại rằng các mô hình ngôn ngữ tạo sinh có thể làm suy yếu quá trình phát triển tư duy viết, dẫn đến sự phụ thuộc về mặt nhận thức.'"
    },
    "r_c1_2": {
        en: "The text states: 'AI-powered tutors democratize high-level coaching, adapting to individual cognitive paces.'",
        vi: "Đoạn văn chỉ ra: 'các gia sư chạy bằng AI giúp dân chủ hóa việc huấn luyện cấp cao, thích ứng với tốc độ nhận thức của từng cá nhân.'"
    },
    "r_c1_3": {
        en: "The text states: 'This shift requires a structural restructuring of the curriculum where educational evaluation moves from standard output checking to process-oriented reflection...'",
        vi: "Đoạn văn viết: 'Sự thay đổi mô hình này đòi hỏi cấu trúc lại chương trình giảng dạy, trong đó việc đánh giá giáo dục chuyển sang phản biện định hướng quá trình...'"
    },
    "r_c2_1": {
        en: "The text states: 'By leveraging quantum principles such as superposition and entanglement, quantum bits can execute calculations classical silicon computers cannot, transcending binary limits.'",
        vi: "Đoạn văn chỉ ra: 'Bằng cách tận dụng các nguyên lý lượng tử như chồng chập và vướng víu, các qubit có thể tính toán vượt qua các giới hạn nhị phân cổ điển.'"
    },
    "r_c2_2": {
        en: "The text states: 'Consequently, current cryptography standards... will inevitably become vulnerable.'",
        vi: "Đoạn văn nêu: 'Do đó, các tiêu chuẩn mật mã hiện tại... chắc chắn sẽ trở nên dễ bị tổn thương (hoặc lỗi thời).'"
    },
    "r_c2_3": {
        en: "The text states: 'This disruption prompts an urgent migration towards post-quantum encryption protocols to safeguard communication.'",
        vi: "Đoạn văn đề cập: 'Sự gián đoạn công nghệ này thúc đẩy một sự dịch chuyển khẩn cấp hướng tới các giao thức mã hóa hậu lượng tử.'"
    },

    // LISTENING
    "l_a1_1": {
        en: "The audio says: 'My sister is a nurse. She works at a big hospital in Hanoi.'",
        vi: "Băng nghe nói: 'My sister is a nurse. She works at a big hospital in Hanoi.' (Chị gái tôi là một y tá. Chị ấy làm việc ở bệnh viện lớn tại Hà Nội)."
    },
    "l_a1_2": {
        en: "The audio says: 'She goes to work at seven o'clock in the morning.'",
        vi: "Băng nghe nói: 'She goes to work at seven o'clock in the morning.' (Chị ấy đi làm vào lúc 7 giờ sáng)."
    },
    "l_a1_3": {
        en: "The audio says: 'On Sundays, she stays at home and cooks delicious dinner for our family.'",
        vi: "Băng nghe nói: 'On Sundays, she stays at home and cooks delicious dinner for our family.' (Vào các ngày Chủ Nhật, chị ấy ở nhà và nấu bữa tối ngon miệng cho gia đình)."
    },
    "l_a2_1": {
        en: "The audio says: 'My school is called Sunshine Primary School.'",
        vi: "Băng nghe nói: 'My school is called Sunshine Primary School.' (Trường của tôi tên là Trường tiểu học Sunshine)."
    },
    "l_a2_2": {
        en: "The audio says: 'We have about three hundred children.'",
        vi: "Băng nghe nói: 'We have about three hundred children.' (Chúng tôi có khoảng 300 học sinh)."
    },
    "l_a2_3": {
        en: "The audio says: 'In the playground, we love playing soccer during break time.'",
        vi: "Băng nghe nói: 'In the playground, we love playing soccer during break time.' (Ở sân chơi, chúng tôi thích chơi đá bóng vào giờ ra chơi)."
    },
    "l_b1_1": {
        en: "The audio says: 'I decided to join a local photography club to improve my camera skills.'",
        vi: "Băng nghe nói: 'I decided to join a local photography club to improve my camera skills.' (Tôi quyết định tham gia một câu lạc bộ nhiếp ảnh địa phương để cải thiện kỹ năng chụp hình)."
    },
    "l_b1_2": {
        en: "The audio says: 'We met every Saturday morning...'",
        vi: "Băng nghe nói: 'We met every Saturday morning...' (Chúng tôi gặp nhau vào mỗi sáng thứ Bảy hàng tuần)."
    },
    "l_b1_3": {
        en: "The audio says: 'I enjoyed capturing landscape photos the most.'",
        vi: "Băng nghe nói: 'I enjoyed capturing landscape photos the most.' (Tôi thích nhất việc chụp các bức ảnh phong cảnh)."
    },
    "l_b2_1": {
        en: "The audio says: 'Instead of lecturing for forty-five minutes, middle school teachers should facilitate class debates...'",
        vi: "Băng nghe khuyên: Thay vì thuyết giảng suốt 45 phút, giáo viên nên tổ chức tranh luận... tức là không nên thuyết giảng liên tục."
    },
    "l_b2_2": {
        en: "The audio mentions: '...to enhance critical thinking skills.'",
        vi: "Băng nghe đề cập mục đích của học tương tác là: '...to enhance critical thinking skills' (nâng cao kỹ năng tư duy phản biện)."
    },
    "l_b2_3": {
        en: "The audio mentions 'peer reviews' which means students evaluate classmate assignments.",
        vi: "Băng nghe nói đến 'peer reviews' (bình duyệt chéo), tức là việc học sinh đánh giá bài làm của các bạn học cùng lớp."
    },
    "l_c1_1": {
        en: "The speaker mentions: 'Standardized testing often fails to gauge complex qualitative skills such as emotional intelligence...'",
        vi: "Người nói chia sẻ: 'Các bài thi chuẩn hóa thường thất bại trong việc đo lường các kỹ năng định tính phức tạp như trí tuệ cảm xúc...'"
    },
    "l_c1_2": {
        en: "The speaker mentions: 'While metrics provide benchmarking, they risk flattening student individuality.'",
        vi: "Người nói cảnh báo: 'Mặc dù số liệu cung cấp chuẩn đo lường, chúng có nguy cơ làm phẳng/triệt tiêu tính cá nhân của học sinh.'"
    },
    "l_c1_3": {
        en: "The speaker talks about 'creative synthesizing', which is combining information from creative sources.",
        vi: "Người nói nhắc đến 'creative synthesizing', tức là việc tổng hợp các thông tin từ nhiều nguồn một cách sáng tạo."
    },
    "l_c2_1": {
        en: "The speaker says: 'Cognitive load theory indicates that working memory has a highly restricted capacity.'",
        vi: "Băng nghe khẳng định: 'Thuyết tải nhận thức chỉ ra rằng bộ nhớ làm việc có dung lượng rất hạn chế (highly restricted capacity).'"
    },
    "l_c2_2": {
        en: "The speaker says: 'instructors must minimize extraneous cognitive load by eliminating redundant information...'",
        vi: "Băng nghe khuyên: 'người dạy phải giảm thiểu tải nhận thức ngoại lai bằng cách loại bỏ các thông tin dư thừa...'"
    },
    "l_c2_3": {
        en: "The speaker states: '...focusing learner attention on schema construction. This maximizes the efficient transfer of knowledge into long-term memory.'",
        vi: "Băng nghe chỉ rõ: '...tập trung sự chú ý của người học vào việc xây dựng lược đồ (schema) và tối ưu hóa việc chuyển giao tri thức vào bộ nhớ dài hạn.'"
    }
};

// Tải dữ liệu phòng thi Đọc & Nghe
function loadTwoPanelExamData() {
    const mediaHeader = document.getElementById('mediaPaneHeader');
    const mediaText = document.getElementById('mediaPaneText');
    const translationBox = document.getElementById('mediaPaneTranslation');
    const audioBar = document.getElementById('listeningPlayBar');
    const taskHeader = document.getElementById('questionPanelTaskHeader');
    const questionsContainer = document.getElementById('questionsScrollable');

    // Tắt dịch bài đọc nếu đang bật
    translationBox.classList.add('hidden');
    document.getElementById('btnTranslateMedia').classList.remove('active');

    const stateObj = currentSkill === 'reading' ? readingAdaptive : listeningAdaptive;
    
    // Lấy mô-đun và dữ liệu đề thi tương ứng (lượt hiện tại hoặc xem lại chặng cũ)
    const level = viewingPastStage !== null ? viewingPastStage : stateObj.currentLevel;
    const db = adaptiveDb[currentSkill][level];

    // Tự động focus câu hỏi đầu tiên của chặng thi đang làm
    if (viewingPastStage === null && db.questions.length > 0) {
        const hasFocus = db.questions.some(q => q.id === currentFocusQuestionId);
        if (!hasFocus) {
            currentFocusQuestionId = db.questions[0].id;
        }
    }

    // Cập nhật tiêu đề bên trái
    if (currentSkill === 'reading') {
        mediaHeader.innerText = `KỸ NĂNG ĐỌC - MÔ-ĐUN ${level} ${viewingPastStage !== null ? '(XEM LẠI LƯỢT CŨ)' : ''}`;
        mediaHeader.className = "text-xs font-extrabold text-teal-400 uppercase tracking-widest";
        audioBar.classList.add('hidden');
    } else {
        mediaHeader.innerText = `KỸ NĂNG NGHE - MÔ-ĐUN ${level} ${viewingPastStage !== null ? '(XEM LẠI LƯỢT CŨ)' : ''}`;
        mediaHeader.className = "text-xs font-extrabold text-lime-400 uppercase tracking-widest";
        
        audioBar.classList.remove('hidden');
        preloadAudioForCurrentStage('listening', level); // Tải trước âm thanh cho chặng nghe hiện tại
        if (viewingPastStage !== null) {
            listeningAudioPlaying = false;
            document.getElementById('listeningPlayIcon').className = "fa-solid fa-play text-sm";
            document.getElementById('listeningMediaProgressBar').style.width = "0%";
            document.getElementById('listeningMediaTimer').innerText = "0:00 / 2:08";
        }
    }

    // Hiển thị nội dung văn bản (song ngữ tùy biến)
    mediaText.innerHTML = db.media;
    translationBox.innerHTML = db.mediaTranslation;
    
    // Nếu song ngữ toàn hệ thống đang bật -> Tự động hiện bản dịch luôn
    if (globalBilingualMode) {
        translationBox.classList.remove('hidden');
        document.getElementById('btnTranslateMedia').classList.add('active');
    }

    taskHeader.innerText = viewingPastStage !== null ? "Báo cáo xem lại kết quả lượt làm bài." : db.task;

    // Render danh sách câu hỏi
    let html = "";
    const answers = stateObj.answers[level] || {};

    db.questions.forEach((q, qIdx) => {
        // Lấy câu trả lời đã lưu nếu có
        const userChoice = answers[`q${qIdx + 1}`];
        const isPastMode = viewingPastStage !== null;
        const isCorrect = userChoice === q.correct;

        let questionClass = "p-4 bg-[#0b0f19] border border-slate-800 rounded-xl space-y-3";
        let statusBadge = "";
        
        if (isPastMode) {
            if (userChoice !== null && userChoice !== undefined) {
                if (isCorrect) {
                    questionClass = "p-4 bg-green-950/10 border border-green-500/20 rounded-xl space-y-3 shadow-lg shadow-green-500/5";
                    statusBadge = `<span class="px-2 py-0.5 bg-green-500/20 text-green-400 border border-green-500/30 rounded text-[10px] font-bold"><i class="fa-solid fa-circle-check"></i> ĐÚNG</span>`;
                } else {
                    questionClass = "p-4 bg-rose-950/10 border border-rose-500/20 rounded-xl space-y-3 shadow-lg shadow-rose-500/5";
                    statusBadge = `<span class="px-2 py-0.5 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded text-[10px] font-bold"><i class="fa-solid fa-circle-xmark"></i> SAI</span>`;
                }
            } else {
                questionClass = "p-4 bg-[#0b0f19]/80 border border-slate-800 rounded-xl space-y-3";
                statusBadge = `<span class="px-2 py-0.5 bg-slate-800 text-slate-400 rounded text-[10px] font-bold">CHƯA TRẢ LỜI</span>`;
            }
        }

        // Bỏ dịch thô mặc định ra khỏi giao diện để tuân thủ luật dịch chủ động
        const transClass = globalBilingualMode ? "" : "hidden";

        html += `
            <div class="${questionClass}" onmouseenter="setCurrentFocusQuestion('${q.id}')" onclick="setCurrentFocusQuestion('${q.id}')">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <span class="text-xs font-bold ${currentSkill === 'reading' ? 'text-teal-400' : 'text-lime-400'}">Câu hỏi ${qIdx + 1}</span>
                        ${statusBadge}
                    </div>
                    <button onclick="toggleQuestionTranslation(${qIdx})" class="btn-translate-toggle">
                        <i class="fa-solid fa-language"></i> Dịch câu hỏi
                    </button>
                </div>
                <p class="text-sm font-semibold text-slate-100">${q.q}</p>
                <p id="q-trans-${qIdx}" class="text-xs text-slate-400 border-l-2 border-slate-600 pl-2 ${transClass}">${q.qTranslation}</p>
                
                <div class="space-y-2 pt-1">
        `;

        q.options.forEach((opt, optIdx) => {
            const checked = userChoice === optIdx ? "checked" : "";
            const disabledAttr = isPastMode ? "disabled" : "";
            
            // Xử lý highlight đúng/sai trong quá khứ
            let labelClass = "flex flex-col p-3 border border-slate-800 rounded-lg text-xs transition";
            
            if (isPastMode) {
                labelClass += " cursor-default";
                if (optIdx === q.correct) {
                    labelClass += " bg-green-950/20 border-green-500/40 text-green-300";
                } else if (userChoice === optIdx && !isCorrect) {
                    labelClass += " bg-rose-955/20 border-rose-500/40 text-rose-300";
                } else {
                    labelClass += " bg-[#141b2d]/25 opacity-60";
                }
            } else {
                labelClass += " bg-[#141b2d]/60 cursor-pointer hover:bg-[#1c263e]";
            }

            const translationText = q.optionsTranslation && q.optionsTranslation[optIdx] 
                ? `<span class="option-translation text-slate-400 text-[11px] block mt-0.5 ${transClass}">(${q.optionsTranslation[optIdx]})</span>` 
                : '';

            html += `
                <label class="${labelClass}">
                    <div class="flex items-start space-x-3">
                        <input type="radio" name="ans_${q.id}" value="${optIdx}" ${checked} ${disabledAttr} onchange="saveSelectedAnswer('${q.id}', ${optIdx}, ${qIdx})" class="mt-0.5 text-blue-600 focus:ring-0 ${isPastMode ? 'pointer-events-none' : ''}">
                        <span class="text-slate-250 font-medium">${opt}</span>
                    </div>
                    ${translationText}
                </label>
            `;
        });

        if (isPastMode) {
            const exp = questionExplanations[q.id];
            if (exp) {
                const transHidden = globalBilingualMode ? "" : "hidden";
                html += `
                    <div class="mt-3 p-3 bg-blue-950/20 border border-blue-500/10 rounded-lg space-y-1 text-xs">
                        <div class="flex items-center space-x-1.5 text-blue-450 font-bold mb-1">
                            <i class="fa-solid fa-circle-info text-[10px]"></i>
                            <span>Giải thích đáp án (Explanation)</span>
                        </div>
                        <p class="text-slate-300 leading-relaxed font-medium">${exp.en}</p>
                        <p id="q-exp-trans-${qIdx}" class="text-slate-400 border-l border-slate-700 pl-2 italic leading-relaxed ${transHidden}">${exp.vi}</p>
                    </div>
                `;
            }
        }

        html += `</div></div>`;
    });
    questionsContainer.innerHTML = html;

    // Thay đổi động nút Nộp bài thành nút Quay lại làm tiếp khi đang xem lượt cũ
    const submitBtn = document.getElementById('btnSubmitSection');
    if (submitBtn) {
        if (viewingPastStage !== null) {
            submitBtn.innerHTML = `<span>Quay lại lượt đang thi</span> <i class="fa-solid fa-arrow-rotate-left text-[10px]"></i>`;
            submitBtn.onclick = exitPastStageView;
            submitBtn.className = "px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition flex items-center space-x-2 shadow-lg shadow-blue-500/25";
        } else {
            submitBtn.innerHTML = `<span>Nộp bài này</span> <i class="fa-solid fa-paper-plane text-[10px]"></i>`;
            submitBtn.onclick = submitSkillSectionButton;
            submitBtn.className = "px-6 py-2.5 btn-grad text-white font-bold text-xs rounded-lg transition flex items-center space-x-2";
        }
    }

    // Cập nhật thanh tiến trình thích ứng ở Footer phòng thi
    updateAdaptiveIndicator();
}

// Lưu đáp án học viên chọn
function saveSelectedAnswer(qId, value, qIdx) {
    if (viewingPastStage !== null) return; // Không lưu khi đang ở chế độ xem lại chặng cũ
    
    const stateObj = currentSkill === 'reading' ? readingAdaptive : listeningAdaptive;
    const level = stateObj.currentLevel;
    
    if (!stateObj.answers[level]) {
        stateObj.answers[level] = {};
    }
    stateObj.answers[level][`q${qIdx + 1}`] = value;
    
    // Tự động lưu tiến trình làm bài
    saveProgressToLocalStorage();
}

// Cập nhật thanh hiển thị lược đồ tiến trình thích ứng (Sidebar & Footer)
function updateAdaptiveIndicator() {
    const container = document.getElementById('adaptiveStagesIndicator');
    const stateObj = currentSkill === 'reading' ? readingAdaptive : listeningAdaptive;
    
    let html = "";
    // Thêm các mô-đun đã thi qua dạng nút bấm click được
    stateObj.stages.forEach(lvl => {
        const isPassed = stateObj.results[lvl];
        const colorClass = isPassed ? 'bg-green-500/10 text-green-400 border-green-500/25 hover:bg-green-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/25 hover:bg-rose-500/20';
        const icon = isPassed ? '<i class="fa-solid fa-check mr-0.5"></i>' : '<i class="fa-solid fa-xmark mr-0.5"></i>';
        const isViewing = viewingPastStage === lvl;
        const activeBorder = isViewing ? 'ring-2 ring-blue-500/40 border-blue-400 scale-105' : '';

        html += `
            <button onclick="viewPastStage('${lvl}')" class="px-2 py-0.5 rounded text-[10px] font-bold border ${colorClass} ${activeBorder} flex items-center transition duration-200">
                ${icon} ${lvl}
            </button>
            <i class="fa-solid fa-chevron-right text-[8px] text-slate-600"></i>
        `;
    });

    // Lượt thi hiện tại ở Footer
    const isViewingCurrent = viewingPastStage === null;
    const skillColor = currentSkill === 'reading' ? 'bg-teal-500/25 text-teal-400 border-teal-500/30' : 'bg-lime-500/25 text-lime-400 border-lime-500/30';
    const currentActiveBorder = isViewingCurrent ? 'ring-2 ring-blue-500/40 scale-105' : 'opacity-60 hover:opacity-100';

    html += `
        <button onclick="exitPastStageView()" class="px-2 py-0.5 rounded text-[10px] font-bold border ${skillColor} ${currentActiveBorder} flex items-center transition duration-200">
            ${!isViewingCurrent ? '<i class="fa-solid fa-arrow-rotate-left mr-1 text-[8px]"></i> Quay lại: ' : '<i class="fa-solid fa-circle-notch animate-spin mr-1 text-[8px]"></i> Đang làm: '}${stateObj.currentLevel}
        </button>
    `;

    container.innerHTML = html;

    // Đồng bộ sang Sidebar trái
    const treeContainer = currentSkill === 'reading' ? document.getElementById('reading-steps-container') : document.getElementById('listening-steps-container');
    let treeHtml = "";
    
    // Render các chặng cũ trên sidebar có thể nhấp chuột
    stateObj.stages.forEach((lvl, i) => {
        const isPassed = stateObj.results[lvl];
        const isViewing = viewingPastStage === lvl;
        const ringGlow = isViewing ? 'ring-4 ring-blue-500/35 border-blue-450' : 'ring-4 ring-slate-800/10';
        
        treeHtml += `
            <button onclick="viewPastStage('${lvl}')" class="flex items-center space-x-2 text-xs text-left text-slate-450 hover:text-white transition w-full relative pl-8 py-1.5 rounded-lg hover:bg-slate-900/30">
                <span class="h-3 w-3 rounded-full ${isPassed ? 'bg-green-500' : 'bg-rose-500'} absolute left-[14px] top-1/2 -translate-y-1/2 ${ringGlow} border border-[#0e1322] z-10"></span>
                <span class="font-medium ${isViewing ? 'text-blue-400 font-bold underline' : ''}">Lượt ${i + 1}: ${lvl} (${isPassed ? 'Đạt' : 'Không đạt'})</span>
            </button>
        `;
    });

    // Render chặng hiện tại trên sidebar có thể nhấp chuột
    const isCurrentGlow = isViewingCurrent ? `ring-4 ${currentSkill === 'reading' ? 'ring-teal-500/35' : 'ring-lime-500/35'}` : 'ring-4 ring-slate-800/10';
    treeHtml += `
        <button onclick="exitPastStageView()" class="flex items-center space-x-2 text-xs text-left ${currentSkill === 'reading' ? 'text-teal-450' : 'text-lime-450'} font-bold transition w-full relative pl-8 py-1.5 rounded-lg hover:bg-slate-900/30">
            <span class="h-3 w-3 rounded-full ${currentSkill === 'reading' ? 'bg-teal-500' : 'bg-lime-500'} absolute left-[14px] top-1/2 -translate-y-1/2 ${isCurrentGlow} border border-[#0e1322] z-10"></span>
            <span class="${isViewingCurrent ? '' : 'underline text-slate-500 hover:text-slate-350 font-medium'}">Lượt ${stateObj.stages.length + 1}: Mô-đun ${stateObj.currentLevel} ${isViewingCurrent ? '(Đang làm)' : '(Nhấp để làm tiếp)'}</span>
        </button>
    `;

    treeContainer.innerHTML = treeHtml;
}

// Bật chế độ xem lại chặng cũ
function viewPastStage(stageLvl) {
    // Tắt các audio phát dở nếu có
    stopActiveAudio();
    listeningAudioPlaying = false;

    viewingPastStage = stageLvl;

    // Đưa giao diện vào phòng thi chính
    setAppState('active_test');
    loadTwoPanelExamData();
}

// Quay lại lượt thi hiện tại
function exitPastStageView() {
    viewingPastStage = null;
    loadTwoPanelExamData();
}

// Bật/tắt dịch cục bộ bài đọc/câu hỏi viết
function toggleTranslation(type) {
    if (type === 'media') {
        const transBox = document.getElementById('mediaPaneTranslation');
        const btn = document.getElementById('btnTranslateMedia');
        transBox.classList.toggle('hidden');
        btn.classList.toggle('active');
    } else if (type === 'writing-prompt') {
        const transBox = document.getElementById('writingPromptTranslation');
        transBox.classList.toggle('hidden');
    }
}

// Bật/tắt dịch từng câu hỏi & options tương ứng
function toggleQuestionTranslation(qIdx) {
    const tr = document.getElementById(`q-trans-${qIdx}`);
    if (tr) {
        const isHidden = tr.classList.toggle('hidden');
        
        // Tìm và ẩn/hiện các option translation của câu hỏi này
        const parentCard = tr.closest('.p-4');
        if (parentCard) {
            const optTranslations = parentCard.querySelectorAll('.option-translation');
            optTranslations.forEach(optTr => {
                if (isHidden) {
                    optTr.classList.add('hidden');
                } else {
                    optTr.classList.remove('hidden');
                }
            });
            
            // Tìm và ẩn/hiện dịch giải thích tiếng Việt
            const expTr = document.getElementById(`q-exp-trans-${qIdx}`);
            if (expTr) {
                if (isHidden) {
                    expTr.classList.add('hidden');
                } else {
                    expTr.classList.remove('hidden');
                }
            }
        }
    }
}

// Phát/Dừng file nghe mô phỏng
let listeningAudioPlaying = false;
function toggleMediaListeningAudio() {
    const btnIcon = document.getElementById('listeningPlayIcon');
    const progressBar = document.getElementById('listeningMediaProgressBar');
    const timerText = document.getElementById('listeningMediaTimer');

    if (listeningAudioPlaying) {
        stopActiveAudio();
        listeningAudioPlaying = false;
        btnIcon.className = "fa-solid fa-play text-sm";
        progressBar.style.width = "0%";
        timerText.innerText = "0:00 / 2:08";
        return;
    }

    const level = viewingPastStage !== null ? viewingPastStage : listeningAdaptive.currentLevel;
    const text = adaptiveDb.listening[level].audioText;
    
    const localUrl = `audio/listening_${level.toLowerCase()}.mp3`;
    const onlineUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&type=2`;

    playAudioWithFallback(
        localUrl,
        onlineUrl,
        text,
        // onPlay
        () => {
            listeningAudioPlaying = true;
            btnIcon.className = "fa-solid fa-pause text-sm";
        },
        // onEnd
        () => {
            listeningAudioPlaying = false;
            btnIcon.className = "fa-solid fa-play text-sm";
            progressBar.style.width = "100%";
            if (activeHtml5Audio && activeHtml5Audio.duration) {
                const totalSec = Math.round(activeHtml5Audio.duration);
                const m = Math.floor(totalSec / 60);
                const s = totalSec % 60;
                timerText.innerText = `${m}:${s.toString().padStart(2, '0')} / ${m}:${s.toString().padStart(2, '0')}`;
            } else {
                timerText.innerText = "2:08 / 2:08";
            }
        },
        // onProgress
        (progress, currentTime, duration) => {
            progressBar.style.width = `${progress}%`;
            const curM = Math.floor(currentTime / 60);
            const curS = Math.floor(currentTime % 60);
            const durM = Math.floor(duration / 60);
            const durS = Math.floor(duration % 60);
            timerText.innerText = `${curM}:${curS.toString().padStart(2, '0')} / ${durM}:${durS.toString().padStart(2, '0')}`;
        }
    );
}

// --- PHẦN 4: THUẬT TOÁN THI THÍCH ỨNG CHÍNH (Adaptive Test Engine) ---
function submitSkillSectionButton() {
    if (viewingPastStage !== null) return; // Không cho nộp khi đang xem lại chặng cũ

    if (currentSkill === 'writing') {
        const words = writingAnswerText.trim() ? writingAnswerText.trim().split(/\s+/).length : 0;
        if (words < 10) {
            showSimpleWarning("Bài viết quá ngắn", "Vui lòng viết tối thiểu 10 từ trước khi nộp bài.");
            return;
        }
        // Mở Modal xác nhận nộp
        const min = Math.floor(testSecondsRemaining / 60);
        const sec = testSecondsRemaining % 60;
        document.getElementById('modalConfirmTimerText').innerText = `Thời gian còn lại: ${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
        document.getElementById('modalConfirmSubmit').classList.remove('hidden');
        return;
    }

    const stateObj = currentSkill === 'reading' ? readingAdaptive : listeningAdaptive;
    const level = stateObj.currentLevel;
    const answers = stateObj.answers[level] || {};
    const db = adaptiveDb[currentSkill][level];

    // Kiểm tra đã làm đủ câu hỏi chưa
    const totalQs = db.questions.length;
    let answeredCount = 0;
    for (let i = 1; i <= totalQs; i++) {
        if (answers[`q${i}`] !== undefined && answers[`q${i}`] !== "") answeredCount++;
    }

    if (answeredCount < totalQs) {
        showSimpleWarning("Chưa làm xong", `Vui lòng chọn đầy đủ câu trả lời cho cả ${totalQs} câu hỏi trước khi nộp.`);
        return;
    }

    // Mở Modal xác nhận nộp
    const min = Math.floor(testSecondsRemaining / 60);
    const sec = testSecondsRemaining % 60;
    document.getElementById('modalConfirmTimerText').innerText = `Thời gian còn lại: ${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    document.getElementById('modalConfirmSubmit').classList.remove('hidden');
}

function closeConfirmModalSubmit() {
    document.getElementById('modalConfirmSubmit').classList.add('hidden');
}

function proceedToSkillCompletionPopup() {
    closeConfirmModalSubmit();
    clearInterval(headerTimerObj);

    if (currentSkill === 'writing') {
        assessWritingWithAI();
    } else {
        // Chấm điểm lượt thi thích ứng hiện tại
        evaluateCurrentAdaptiveSection();
    }
}

function evaluateCurrentAdaptiveSection() {
    const stateObj = currentSkill === 'reading' ? readingAdaptive : listeningAdaptive;
    const level = stateObj.currentLevel;
    const db = adaptiveDb[currentSkill][level];
    const answers = stateObj.answers[level] || {};

    // Tính điểm đúng
    let correctCount = 0;
    db.questions.forEach((q, idx) => {
        let isCorrect = false;
        if (currentSkill === 'reading') {
            isCorrect = answers[`q${idx + 1}`] === q.correct;
        } else {
            isCorrect = answers[`q${idx + 1}`] === q.correct;
        }
        if (isCorrect) correctCount++;
    });

    const correctRatio = correctCount / db.questions.length;
    const isPassed = correctRatio >= 0.70; // 70% trở lên là đạt mô-đun

    // Lưu chặng lịch sử
    stateObj.stages.push(level);
    stateObj.results[level] = isPassed;

    // Thuật toán thích ứng CEFR tìm cấp độ tiếp theo
    let nextLevel = null;
    let isTerminated = false;

    if (isPassed) {
        if (level === 'B1') {
            nextLevel = 'B2';
        } else if (level === 'B2') {
            nextLevel = 'C1';
        } else if (level === 'C1') {
            nextLevel = 'C2';
        } else if (level === 'C2') {
            stateObj.finalLevel = 'C2';
            isTerminated = true;
        }
        
        if (nextLevel && stateObj.results[nextLevel] === false) {
            stateObj.finalLevel = level;
            isTerminated = true;
        }
    } else {
        if (level === 'B1') {
            nextLevel = 'A2';
        } else if (level === 'A2') {
            nextLevel = 'A1';
        } else if (level === 'A1') {
            stateObj.finalLevel = 'Pre-A1';
            isTerminated = true;
        }

        if (nextLevel && stateObj.results[nextLevel] === true) {
            stateObj.finalLevel = nextLevel;
            isTerminated = true;
        } else if (level === 'B2') {
            stateObj.finalLevel = 'B1';
            isTerminated = true;
        } else if (level === 'C1') {
            stateObj.finalLevel = 'B2';
            isTerminated = true;
        }
    }

    if (isTerminated) {
        stateObj.isFinished = true;
        showSkillFinishedPopup();
    } else {
        stateObj.currentLevel = nextLevel;
        showSimpleWarning("Lượt thi tiếp theo", `Thầy/Cô đã hoàn thành mô-đun ${level}. Hệ thống tự động chuyển sang mô-đun thích ứng tiếp theo: ${nextLevel}.`);
        startSkillActiveTest();
    }
}

// Xử lý hết giờ đếm ngược
function autoSubmitOnTimeout() {
    const stateObj = currentSkill === 'reading' ? readingAdaptive : listeningAdaptive;
    const level = stateObj.currentLevel;
    
    if (!stateObj.answers[level]) stateObj.answers[level] = {};
    const db = adaptiveDb[currentSkill][level];
    db.questions.forEach((q, idx) => {
        if (stateObj.answers[level][`q${idx + 1}`] === undefined) {
            stateObj.answers[level][`q${idx + 1}`] = null;
        }
    });

    closeConfirmModalSubmit();
    showSimpleWarning("Hết giờ làm bài", `Đã hết thời gian 15 phút của mô-đun ${level}. Bài thi tự động được nộp.`);
    evaluateCurrentAdaptiveSection();
}

// Popup thông báo hoàn thành toàn bộ kỹ năng
function showSkillFinishedPopup() {
    const title = document.getElementById('modalFinishTitle');
    const desc = document.getElementById('modalFinishDesc');
    const btn = document.getElementById('btnModalFinishAction');

    if (currentSkill === 'reading') {
        title.innerText = "Đã hoàn thành Kỹ năng Đọc";
        desc.innerHTML = `Hệ thống đã thu thập đủ dữ liệu và xác định trình độ kỹ năng Đọc của Thầy/Cô là: <strong class="text-teal-400 text-sm font-black">${readingAdaptive.finalLevel}</strong>. Bấm nút dưới để chuyển sang kiểm tra kỹ năng tiếp theo.`;
        btn.innerText = "Chuyển sang kỹ năng Nghe";
    } 
    else if (currentSkill === 'listening') {
        title.innerText = "Đã hoàn thành Kỹ năng Nghe";
        desc.innerHTML = `Hệ thống đã xác định trình độ kỹ năng Nghe của Thầy/Cô là: <strong class="text-lime-400 text-sm font-black">${listeningAdaptive.finalLevel}</strong>. Bấm nút dưới để tiếp tục.`;
        btn.innerText = "Chuyển sang kỹ năng Nói";
    } 
    else if (currentSkill === 'speaking') {
        title.innerText = "Đã hoàn thành Kỹ năng Nói";
        desc.innerHTML = `Hệ thống đã ghi lại giọng nói của Thầy/Cô và thực hiện phân tích tự động.`;
        btn.innerText = "Chuyển sang kỹ năng Viết";
    } 
    else if (currentSkill === 'writing') {
        title.innerText = "Đã hoàn thành Kỹ năng Viết";
        desc.innerHTML = `Bài viết luận của Thầy/Cô đã được nộp thành công để AI đánh giá và tính điểm tổng quan.`;
        btn.innerText = "Xem bảng kết quả tổng hợp";
    }

    document.getElementById('modalSkillFinished').classList.remove('hidden');
}

// Nút nhấn chuyển chặng từ Popup
function proceedToNextSkillStage() {
    document.getElementById('modalSkillFinished').classList.add('hidden');
    
    if (currentSkill === 'reading') {
        loadSkillInstruction('listening');
    } else if (currentSkill === 'listening') {
        loadSkillInstruction('speaking');
    } else if (currentSkill === 'speaking') {
        loadSkillInstruction('writing');
    } else if (currentSkill === 'writing') {
        calculateFinalScoresAndShowDashboard();
    }
}
