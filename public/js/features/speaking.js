// --- MODULE PHÒNG THI NÓI (SPEAKING) ---
// --- PHẦN 5: HIỆN THỰC HÓA PHÒNG THI NÓI (Speaking) ---
let speechRecognitionObj = null;
let speechRecognitionText = "";
let isVideoPlayable = true; // Biến kiểm tra video giám khảo có hoạt động được không

// Khởi tạo nhận diện giọng nói tiếng Anh
function initSpeechRecognition() {
    if (speechRecognitionObj) return;
    
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        speechRecognitionObj = new SpeechRec();
        speechRecognitionObj.continuous = true;
        speechRecognitionObj.interimResults = true;
        speechRecognitionObj.lang = 'en-US';
        
        speechRecognitionObj.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';
            for (let i = 0; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript + ' ';
                } else {
                    interimTranscript += event.results[i][0].transcript + ' ';
                }
            }
            const wholeText = (finalTranscript + interimTranscript).trim();
            const textEl = document.getElementById('speechRealtimeText');
            if (textEl) {
                textEl.innerText = wholeText || 'Đang lắng nghe...';
            }
            speechRecognitionText = wholeText;
        };
        
        speechRecognitionObj.onerror = (event) => {
            console.error("Lỗi nhận diện giọng nói phần thi:", event.error);
            let errorMsg = "Gặp lỗi nhận diện giọng nói.";
            if (event.error === 'not-allowed') {
                errorMsg = "Trình duyệt chưa được cấp quyền truy cập Micro. Thầy/Cô vui lòng click vào biểu tượng ổ khóa ở thanh địa chỉ trình duyệt, chọn 'Cho phép (Allow)' quyền truy cập Micro và tải lại trang nhé!";
            } else if (event.error === 'no-speech') {
                console.warn("Không phát hiện âm thanh nói.");
                return;
            } else if (event.error === 'network') {
                errorMsg = "Lỗi kết nối mạng đến dịch vụ Speech-to-Text của Google. Thầy/Cô có thể tự gõ (nhập trực tiếp) câu trả lời Tiếng Anh vào ô văn bản ở dưới nhé!";
            } else {
                errorMsg = `Lỗi thiết bị thu âm: ${event.error}. Thầy/Cô vui lòng kiểm tra micro hoặc tự nhập câu trả lời nhé!`;
            }
            alert(errorMsg);
        };
    }
}

function initSpeakingExam() {
    currentSpeakingQIdx = 0;
    speakingAnswers = [];
    isVideoPlayable = true;
    
    // Khởi tạo Speech Recognition
    initSpeechRecognition();
    
    // Gán sự kiện timeupdate cho video phát câu hỏi
    const exVideo = document.getElementById('examinerVideo');
    if (exVideo) {
        exVideo.ontimeupdate = () => {
            const progressBar = document.getElementById('speakingVideoProgressBar');
            const timeLabel = document.getElementById('speakingVideoTimeLabel');
            if (exVideo.duration) {
                const progress = (exVideo.currentTime / exVideo.duration) * 100;
                if (progressBar) progressBar.style.width = `${progress}%`;
                
                const curM = Math.floor(exVideo.currentTime / 60);
                const curS = Math.floor(exVideo.currentTime % 60);
                const durM = Math.floor(exVideo.duration / 60);
                const durS = Math.floor(exVideo.duration % 60);
                if (timeLabel) {
                    timeLabel.innerText = `${curM.toString().padStart(2, '0')}:${curS.toString().padStart(2, '0')} / ${durM.toString().padStart(2, '0')}:${durS.toString().padStart(2, '0')}`;
                }
            }
        };
    }
    
    loadSpeakingQuestion(0);
}

function loadSpeakingQuestion(idx) {
    const q = adaptiveDb.speaking[idx];
    currentFocusQuestionId = q.id;
    saveProgressToLocalStorage();

    speakingReplays = 0; // Reset số lần nghe lại cho câu hỏi mới

    // Reset thanh tiến trình video
    const progressBar = document.getElementById('speakingVideoProgressBar');
    const timeLabel = document.getElementById('speakingVideoTimeLabel');
    if (progressBar) progressBar.style.width = "0%";
    if (timeLabel) timeLabel.innerText = "00:00 / 00:00";

    const btnReplay = document.getElementById('btnSpeakingReplay');
    if (btnReplay) {
        if (examMode === 'strict') {
            btnReplay.classList.add('hidden');
        } else {
            btnReplay.classList.remove('hidden');
            btnReplay.disabled = false;
            btnReplay.classList.remove('opacity-30', 'pointer-events-none');
        }
    }

    document.getElementById('speakingHeading').innerText = `Question ${idx + 1}`;
    
    // Render danh sách 22 câu hỏi Nói dưới video dạng cuộn ngang
    const sel = document.getElementById('speakingQuestionSelector');
    let html = "";
    adaptiveDb.speaking.forEach((item, sIdx) => {
        let statusClass = "bg-slate-900 text-slate-500 border border-slate-800"; // Chưa làm
        if (sIdx === idx) {
            statusClass = "bg-sky-600 text-white font-bold border border-sky-400 animate-pulse"; // Đang làm
        } else if (sIdx < idx) {
            statusClass = "bg-slate-800 text-green-400 border border-green-500/20"; // Đã làm
        }
        
        html += `<span class="px-3 py-1.5 rounded text-[10px] transition shrink-0 ${statusClass}">${(sIdx + 1).toString().padStart(2, '0')}</span>`;
    });
    sel.innerHTML = html;
    document.getElementById('speakingProgressText').innerText = `Đang thực hiện: Câu ${(idx + 1).toString().padStart(2, '0')} / ${adaptiveDb.speaking.length.toString().padStart(2, '0')}`;

    // Cập nhật phụ đề
    updateSpeakingSubtitleVisibility();

    // Thiết lập nguồn video giám khảo riêng biệt cho từng câu
    const exVideo = document.getElementById('examinerVideo');
    if (exVideo) {
        if (selectedTestId >= 2) {
            isVideoPlayable = false;
        } else {
            isVideoPlayable = true;
            exVideo.src = `video/Video ${idx + 1}.mp4`;
            exVideo.load();
            
            exVideo.onerror = () => {
                console.warn(`[Examiner Video] Không tìm thấy file video câu hỏi ${idx + 1}. Dùng TTS fallback.`);
                isVideoPlayable = false;
            };
        }
    }

    startSpeakingState("prep");
}

function updateSpeakingSubtitleVisibility() {
    const englishEl = document.getElementById('speakingQuestionTranscript');
    const translationEl = document.getElementById('speakingQuestionTranslation');
    const btnToggle = document.getElementById('btnSubtitleToggle');
    const q = adaptiveDb.speaking[currentSpeakingQIdx];
    
    if (!q) return;
    
    if (globalSpeakingSubtitleMode === 'bilingual') {
        if (englishEl) {
            englishEl.innerText = `"${q.prompt}"`;
            englishEl.classList.remove('hidden');
        }
        if (translationEl) {
            translationEl.innerText = `(${q.promptTranslation})`;
            translationEl.classList.remove('hidden');
        }
        if (btnToggle) btnToggle.innerHTML = `<i class="fa-solid fa-closed-captioning"></i> Phụ đề: Song ngữ`;
    } else if (globalSpeakingSubtitleMode === 'english') {
        if (englishEl) {
            englishEl.innerText = `"${q.prompt}"`;
            englishEl.classList.remove('hidden');
        }
        if (translationEl) {
            translationEl.classList.add('hidden');
        }
        if (btnToggle) btnToggle.innerHTML = `<i class="fa-solid fa-closed-captioning"></i> Phụ đề: Tiếng Anh`;
    } else {
        // hidden
        if (englishEl) {
            englishEl.innerText = `"Please listen to the examiner."`;
        }
        if (translationEl) {
            translationEl.classList.add('hidden');
        }
        if (btnToggle) btnToggle.innerHTML = `<i class="fa-solid fa-closed-captioning-slash"></i> Phụ đề: Tắt`;
    }
}

function cycleSubtitleMode() {
    if (globalSpeakingSubtitleMode === 'bilingual') {
        globalSpeakingSubtitleMode = 'english';
    } else if (globalSpeakingSubtitleMode === 'english') {
        globalSpeakingSubtitleMode = 'hidden';
    } else {
        globalSpeakingSubtitleMode = 'bilingual';
    }
    updateSpeakingSubtitleVisibility();
}

function toggleSpeakingTranslation() {
    const trans = document.getElementById('speakingQuestionTranslation');
    trans.classList.toggle('hidden');
}

// Fallback phát âm thanh bằng TTS
function runTTSFallback(text, onEndCallback) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = "en-US";
        
        // Áp dụng giọng đọc tiếng Anh tự nhiên chất lượng cao nhất của hệ thống
        if (typeof getBestEnglishVoice === 'function') {
            const bestVoice = getBestEnglishVoice();
            if (bestVoice) utter.voice = bestVoice;
        }
        
        // Thiết lập tốc độ đọc AI theo độ khó tăng dần
        let ttsRate = 0.82; // Mặc định Dễ (Đề 1, 2, 3)
        if (typeof selectedTestId !== 'undefined') {
            if (selectedTestId >= 8) ttsRate = 0.95; // Khó (Đề 8, 9, 10)
            else if (selectedTestId >= 4) ttsRate = 0.85; // Vừa (Đề 4, 5, 6, 7)
        }
        utter.rate = ttsRate;
        
        const pulse = document.getElementById('speakingVideoPulse');
        if (pulse) pulse.classList.remove('hidden');
        
        utter.onend = () => {
            if (pulse) pulse.classList.add('hidden');
            if (onEndCallback) onEndCallback();
        };
        utter.onerror = () => {
            if (pulse) pulse.classList.add('hidden');
            if (onEndCallback) onEndCallback();
        };
        window.speechSynthesis.speak(utter);
    } else {
        setTimeout(() => {
            if (onEndCallback) onEndCallback();
        }, 5000);
    }
}

// Helper cập nhật class cho nền và icon mic ở giữa vòng tròn đồng hồ
function updateCenterMicUI(state) {
    const bg = document.getElementById('speakingCenterMicBg');
    const icon = document.getElementById('speakingRingIcon');
    if (!bg || !icon) return;
    
    if (state === 'prep') {
        bg.className = "h-14 w-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center z-10 transition duration-300";
        icon.className = "fa-solid fa-hourglass-start text-lg text-amber-500";
    } else if (state === 'recording') {
        bg.className = "h-14 w-14 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center z-10 transition duration-300";
        icon.className = "fa-solid fa-microphone text-lg text-sky-400 animate-pulse";
    }
}

function startSpeakingState(state) {
    speakingState = state;
    clearInterval(speakingRingInterval);

    const ringCircle = document.getElementById('speakingRingCircle');
    const timerText = document.getElementById('speakingRingTimer');
    const titleText = document.getElementById('speakingStateTitle');
    const descText = document.getElementById('speakingStateDesc');
    const btnStop = document.getElementById('btnSpeakingAction');
    const recognitionBar = document.getElementById('speakingTextRecognitionBar');
    
    const exVideo = document.getElementById('examinerVideo');
    const exPlaceholder = document.getElementById('examinerVideoPlaceholder');

    const circumference = 351.8; // r=56 => 2 * PI * 56 = 351.8
    const q = adaptiveDb.speaking[currentSpeakingQIdx];

    if (state === 'prep') {
        titleText.innerText = "Preparation...";
        titleText.className = "text-xs font-black text-amber-500 uppercase tracking-widest animate-pulse";
        descText.innerText = "Thầy/Cô hãy chuẩn bị ý kiến. Giám khảo ảo đang đặt câu hỏi.";
        
        updateCenterMicUI('prep');
        
        ringCircle.setAttribute("stroke", "#f59e0b");
        btnStop.disabled = true;
        if (recognitionBar) recognitionBar.classList.add('hidden');

        // Bật nút Nghe lại câu hỏi ở chế độ Trải nghiệm, ẩn ở chế độ Nghiêm túc
        const btnReplay = document.getElementById('btnSpeakingReplay');
        if (btnReplay) {
            if (examMode === 'strict') {
                btnReplay.classList.add('hidden');
            } else {
                btnReplay.classList.remove('hidden');
                btnReplay.disabled = false;
                btnReplay.classList.remove('opacity-30', 'pointer-events-none');
            }
        }

        let videoDuration = 5; // Mặc định 5s
        let isTransitioning = false;

        const transitionToRecording = () => {
            if (isTransitioning) return;
            isTransitioning = true;
            clearInterval(speakingRingInterval);
            if (exVideo) {
                exVideo.onended = null;
                exVideo.onloadedmetadata = null;
                exVideo.pause();
            }
            startSpeakingState("recording");
        };

        const startTimer = (duration) => {
            speakingSeconds = Math.ceil(duration);
            const totalDuration = speakingSeconds;
            
            timerText.innerText = `00:00:${speakingSeconds.toString().padStart(2, '0')}`;
            ringCircle.style.strokeDashoffset = 0;

            speakingRingInterval = setInterval(() => {
                speakingSeconds--;
                if (!questionTimers[currentFocusQuestionId]) {
                    questionTimers[currentFocusQuestionId] = 0;
                }
                questionTimers[currentFocusQuestionId]++;

                const printed = Math.max(0, speakingSeconds).toString().padStart(2, '0');
                timerText.innerText = `00:00:${printed}`;
                const offset = circumference - (Math.max(0, speakingSeconds) / totalDuration) * circumference;
                ringCircle.style.strokeDashoffset = offset;

                saveProgressToLocalStorage();

                if (speakingSeconds <= 0) {
                    transitionToRecording();
                }
            }, 1000);
        };

        // Điều khiển Video giám khảo phát câu hỏi
        if (exVideo && isVideoPlayable) {
            exVideo.onended = () => {
                console.log("[Video Ended] Hoàn thành phát video câu hỏi.");
                transitionToRecording();
            };

            const onMetadataLoaded = () => {
                if (exVideo.duration && !isNaN(exVideo.duration)) {
                    videoDuration = exVideo.duration;
                }
                startTimer(videoDuration);
            };

            // Nếu metadata đã load sẵn
            if (exVideo.readyState >= 1) {
                onMetadataLoaded();
            } else {
                exVideo.onloadedmetadata = onMetadataLoaded;
            }

            exVideo.play()
                .then(() => {
                    if (exPlaceholder) exPlaceholder.classList.add('hidden');
                })
                .catch(err => {
                    console.warn("[Video Play Failed] Dùng TTS fallback:", err.message);
                    if (exPlaceholder) exPlaceholder.classList.remove('hidden');
                    isVideoPlayable = false;
                    runTTSFallback(q.prompt, transitionToRecording);
                    startTimer(5);
                });
        } else {
            if (exPlaceholder) exPlaceholder.classList.remove('hidden');
            runTTSFallback(q.prompt, transitionToRecording);
            startTimer(5);
        }

    } else if (state === 'recording') {
        speakingSeconds = 10; // Đếm ngược 10 giây thu âm theo đề bài
        titleText.innerText = "Recording...";
        titleText.className = "text-xs font-black text-sky-400 uppercase tracking-widest animate-pulse";
        descText.innerText = "Micro đang mở. Thầy/Cô hãy trả lời trực tiếp câu hỏi bằng tiếng Anh.";
        
        updateCenterMicUI('recording');
        
        ringCircle.setAttribute("stroke", "#38bdf8"); // Màu xanh dương/sky mảnh
        btnStop.disabled = false;

        // Khóa/ẩn nút Nghe lại câu hỏi khi đang thu âm
        const btnReplay = document.getElementById('btnSpeakingReplay');
        if (btnReplay) {
            btnReplay.disabled = true;
            btnReplay.classList.add('opacity-30', 'pointer-events-none');
        }
        
        // Hiện khung nhận dạng chữ chạy trực tiếp
        if (recognitionBar) {
            recognitionBar.classList.remove('hidden');
            document.getElementById('speechRealtimeText').innerText = "Đang lắng nghe...";
        }
        speechRecognitionText = "";

        // Tạm dừng video giám khảo khi thu âm
        if (exVideo && isVideoPlayable) exVideo.pause();
        window.speechSynthesis.cancel();
        const pulse = document.getElementById('speakingVideoPulse');
        if (pulse) pulse.classList.add('hidden');

        // Bắt đầu nhận dạng giọng nói bằng Web Speech API
        if (speechRecognitionObj) {
            try {
                speechRecognitionObj.start();
            } catch(e) {
                console.log("Speech recognition already started");
            }
        }

        speakingRingInterval = setInterval(() => {
            speakingSeconds--;
            
            if (!questionTimers[currentFocusQuestionId]) {
                questionTimers[currentFocusQuestionId] = 0;
            }
            questionTimers[currentFocusQuestionId]++;

            const printed = speakingSeconds.toString().padStart(2, '0');
            timerText.innerText = `00:00:${printed}`;
            const offset = circumference - (speakingSeconds / 10) * circumference;
            ringCircle.style.strokeDashoffset = offset;

            saveProgressToLocalStorage();

            if (speakingSeconds <= 0) {
                clearInterval(speakingRingInterval);
                proceedNextSpeakingQuestion();
            }
        }, 1000);
    }
}

function stopSpeakingRecordAction() {
    clearInterval(speakingRingInterval);
    proceedNextSpeakingQuestion();
}

function replaySpeakingQuestion() {
    clearInterval(speakingRingInterval);
    window.speechSynthesis.cancel();
    
    const exVideo = document.getElementById('examinerVideo');
    const exPlaceholder = document.getElementById('examinerVideoPlaceholder');
    const ringCircle = document.getElementById('speakingRingCircle');
    const timerText = document.getElementById('speakingRingTimer');
    const q = adaptiveDb.speaking[currentSpeakingQIdx];
    
    speakingReplays++; // Ghi nhận số lần nghe lại
    console.log(`[Replay Question] Số lần nghe lại câu này: ${speakingReplays}`);
    
    let videoDuration = 5;
    let isTransitioning = false;
    
    const circumference = 351.8;

    const transitionToRecording = () => {
        if (isTransitioning) return;
        isTransitioning = true;
        clearInterval(speakingRingInterval);
        if (exVideo) {
            exVideo.onended = null;
            exVideo.onloadedmetadata = null;
            exVideo.pause();
        }
        startSpeakingState("recording");
    };

    const startTimer = (duration) => {
        speakingSeconds = Math.ceil(duration);
        const totalDuration = speakingSeconds;
        
        timerText.innerText = `00:00:${speakingSeconds.toString().padStart(2, '0')}`;
        ringCircle.style.strokeDashoffset = 0;

        speakingRingInterval = setInterval(() => {
            speakingSeconds--;
            if (!questionTimers[currentFocusQuestionId]) {
                questionTimers[currentFocusQuestionId] = 0;
            }
            questionTimers[currentFocusQuestionId]++;

            const printed = Math.max(0, speakingSeconds).toString().padStart(2, '0');
            timerText.innerText = `00:00:${printed}`;
            const offset = circumference - (Math.max(0, speakingSeconds) / totalDuration) * circumference;
            ringCircle.style.strokeDashoffset = offset;

            saveProgressToLocalStorage();

            if (speakingSeconds <= 0) {
                transitionToRecording();
            }
        }, 1000);
    };

    if (exVideo && isVideoPlayable) {
        exVideo.currentTime = 0;
        exVideo.onended = () => {
            console.log("[Video Ended - Replay] Hoàn thành phát video câu hỏi.");
            transitionToRecording();
        };
        
        const onMetadataLoaded = () => {
            if (exVideo.duration && !isNaN(exVideo.duration)) {
                videoDuration = exVideo.duration;
            }
            startTimer(videoDuration);
        };
        
        if (exVideo.readyState >= 1) {
            onMetadataLoaded();
        } else {
            exVideo.onloadedmetadata = onMetadataLoaded;
        }

        exVideo.play()
            .then(() => {
                if (exPlaceholder) exPlaceholder.classList.add('hidden');
            })
            .catch(err => {
                console.warn("[Video Replay Failed] Dùng TTS fallback:", err.message);
                if (exPlaceholder) exPlaceholder.classList.remove('hidden');
                isVideoPlayable = false;
                runTTSFallback(q.prompt, transitionToRecording);
                startTimer(5);
            });
    } else {
        if (exPlaceholder) exPlaceholder.classList.remove('hidden');
        runTTSFallback(q.prompt, transitionToRecording);
        startTimer(5);
    }
}

function proceedNextSpeakingQuestion() {
    stopActiveAudio();
    
    // Tắt nhận dạng giọng nói
    if (speechRecognitionObj) {
        try { speechRecognitionObj.stop(); } catch(e) {}
    }
    
    const recognitionBar = document.getElementById('speakingTextRecognitionBar');
    if (recognitionBar) recognitionBar.classList.add('hidden');
    
    const pulse = document.getElementById('speakingVideoPulse');
    if (pulse) pulse.classList.add('hidden');

    const currentQ = adaptiveDb.speaking[currentSpeakingQIdx];
    const userVoiceText = speechRecognitionText.trim() || "Yes, I agree with this topic."; // Fallback nếu không thu được chữ
    
    speakingAnswers.push({
        prompt: currentQ.prompt,
        promptTranslation: currentQ.promptTranslation,
        sampleAnswer: currentQ.sampleAnswer, // Câu trả lời mẫu
        replays: speakingReplays, // Ghi nhận số lần nghe lại ở báo cáo
        answerText: currentQ.prompt, // Đề bài
        transcript: userVoiceText // Bản dịch thô lấy từ micro
    });

    currentSpeakingQIdx++;
    if (currentSpeakingQIdx < adaptiveDb.speaking.length) {
        loadSpeakingQuestion(currentSpeakingQIdx);
    } else {
        assessSpeakingWithAI();
    }
}

function assessSpeakingWithAI() {
    clearInterval(headerTimerObj);
    const modalLoading = document.getElementById('modalAiLoading');
    const aiText = document.getElementById('aiLoadingText');
    if (modalLoading && aiText) {
        aiText.innerText = "Hệ thống đang gửi 22 câu trả lời Nói của Thầy/Cô lên máy chủ AI để phân tích thực tế phát âm, từ vựng và cấu trúc ngữ pháp. Thầy/Cô vui lòng đợi trong giây lát...";
        modalLoading.classList.remove('hidden');
    }

    fetch('/api/assess', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            skill: 'speaking',
            studentAnswer: speakingAnswers,
            prompt: 'CEFR Level assessment for Speaking'
        })
    })
    .then(res => res.json())
    .then(res => {
        if (res.success && res.data) {
            speakingAiResult = res.data;
            speakingFinalLevel = res.data.finalLevel || "B1";
            console.log("[AI Speaking Assessment] Thành công:", speakingAiResult);
        } else {
            throw new Error(res.error || "Không có dữ liệu đánh giá");
        }
    })
    .catch(err => {
        console.warn("[AI Speaking Assessment] Gặp lỗi, tự động chuyển sang fallback giả lập:", err);
        // Fallback giả lập dựa trên kết quả Đọc & Nghe
        const rVal = getCEFRNumericValue(readingAdaptive.finalLevel);
        const lVal = getCEFRNumericValue(listeningAdaptive.finalLevel);
        const avg = (rVal + lVal) / 2;
        const speakingVal = Math.max(1, Math.min(6, Math.floor(avg)));
        speakingFinalLevel = getCEFRFromNumeric(speakingVal);
        speakingAiResult = null;
    })
    .finally(() => {
        if (modalLoading) {
            modalLoading.classList.add('hidden');
        }
        saveProgressToLocalStorage();
        showSkillFinishedPopup();
    });
}

function assessWritingWithAI() {
    const modalLoading = document.getElementById('modalAiLoading');
    const aiText = document.getElementById('aiLoadingText');
    if (modalLoading && aiText) {
        aiText.innerText = "Hệ thống đang gửi bài viết luận của Thầy/Cô lên máy chủ AI để đối chiếu đề bài, phân tích lỗi ngữ pháp và tính mạch lạc. Thầy/Cô vui lòng đợi trong giây lát...";
        modalLoading.classList.remove('hidden');
    }

    fetch('/api/assess', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            skill: 'writing',
            studentAnswer: writingAnswerText,
            prompt: adaptiveDb.writing.media
        })
    })
    .then(res => res.json())
    .then(res => {
        if (res.success && res.data) {
            writingAiResult = res.data;
            writingFinalLevel = res.data.finalLevel || "B1";
            console.log("[AI Writing Assessment] Thành công:", writingAiResult);
        } else {
            throw new Error(res.error || "Không có dữ liệu đánh giá");
        }
    })
    .catch(err => {
        console.warn("[AI Writing Assessment] Gặp lỗi, tự động chuyển sang fallback giả lập:", err);
        // Fallback giả lập dựa trên số từ
        const words = writingAnswerText.trim() ? writingAnswerText.trim().split(/\s+/).length : 0;
        const readLevelVal = getCEFRNumericValue(readingAdaptive.finalLevel);
        let wScore = 1;
        if (words >= 250) {
            wScore = Math.max(1, readLevelVal);
        } else if (words >= 150) {
            wScore = Math.max(1, readLevelVal - 1);
        } else if (words > 10) {
            wScore = Math.max(1, readLevelVal - 2);
        } else {
            wScore = 0;
        }
        writingFinalLevel = getCEFRFromNumeric(wScore);
        writingAiResult = null;
    })
    .finally(() => {
        if (modalLoading) {
            modalLoading.classList.add('hidden');
        }
        saveProgressToLocalStorage();
        showSkillFinishedPopup();
    });
}
