// --- FILE BỔ SUNG NGÂN HÀNG ĐỀ THI LUYỆN TẬP ĐỘNG (ĐỀ 3 - ĐỀ 10) ---

(function() {
    // Hàm nhân bản sâu
    function deepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    // Hàm xáo trộn mảng và trả về mảng mới kèm theo map vị trí cũ sang mới
    function shuffleOptions(options, optionsTrans, correctIdx) {
        const indices = options.map((_, i) => i);
        // Xáo trộn chỉ số
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        
        const newOptions = indices.map(i => options[i]);
        const newOptionsTrans = indices.map(i => optionsTrans[i]);
        const newCorrectIdx = indices.indexOf(correctIdx);
        
        return {
            options: newOptions,
            optionsTranslation: newOptionsTrans,
            correct: newCorrectIdx
        };
    }

    // Danh sách từ khóa thay thế cho từng đề thi để biến đổi động bài đọc/bài nghe
    const replacementMaps = {
        3: { // Đề 3 (Dễ)
            "London": "New York", "Luân Đôn": "New York",
            "English teacher": "Science teacher", "giáo viên Tiếng Anh": "giáo viên Khoa học",
            "primary school": "high school", "trường tiểu học": "trường trung học phổ thông",
            "tennis": "badminton", "chơi tennis": "chơi cầu lông",
            "plastic bag": "plastic bottle", "túi nhựa": "chai nhựa",
            "500 years": "300 years", "500 năm": "300 năm",
            "Sunshine Primary School": "Springfield School", "Tiểu học Sunshine": "Trường Springfield",
            "three hundred": "four hundred", "300": "400",
            "photography club": "chess club", "nhiếp ảnh": "cờ vua",
            "Singapore": "Tokyo", "SQ172": "JL751"
        },
        4: { // Đề 4 (Vừa)
            "London": "Sydney", "Luân Đôn": "Sydney",
            "English teacher": "Math teacher", "giáo viên Tiếng Anh": "giáo viên Toán",
            "primary school": "middle school", "trường tiểu học": "trường trung học cơ sở",
            "tennis": "basketball", "chơi tennis": "chơi bóng rổ",
            "plastic bag": "plastic cup", "túi nhựa": "cốc nhựa",
            "500 years": "400 years", "500 năm": "400 năm",
            "Sunshine Primary School": "Greenwood Academy", "Tiểu học Sunshine": "Học viện Greenwood",
            "three hundred": "two hundred", "300": "200",
            "photography club": "art club", "nhiếp ảnh": "mỹ thuật",
            "Singapore": "Paris", "SQ172": "AF258"
        },
        5: { // Đề 5 (Vừa)
            "London": "Tokyo", "Luân Đôn": "Tokyo",
            "English teacher": "Music teacher", "giáo viên Tiếng Anh": "giáo viên Âm nhạc",
            "primary school": "art school", "trường tiểu học": "trường nghệ thuật",
            "tennis": "volleyball", "chơi tennis": "chơi bóng chuyền",
            "plastic bag": "plastic straw", "túi nhựa": "ống hút nhựa",
            "500 years": "200 years", "500 năm": "200 năm",
            "Sunshine Primary School": "Maplewood Elementary", "Tiểu học Sunshine": "Tiểu học Maplewood",
            "three hundred": "five hundred", "300": "500",
            "photography club": "cooking class", "nhiếp ảnh": "nấu ăn",
            "Singapore": "London", "SQ172": "VN11"
        },
        6: { // Đề 6 (Vừa)
            "London": "Paris", "Luân Đôn": "Paris",
            "English teacher": "History teacher", "giáo viên Tiếng Anh": "giáo viên Lịch sử",
            "primary school": "high school", "trường tiểu học": "trường trung học phổ thông",
            "tennis": "swimming", "chơi tennis": "bơi lội",
            "plastic bag": "plastic packaging", "túi nhựa": "bao bì nhựa",
            "500 years": "450 years", "500 năm": "450 năm",
            "Sunshine Primary School": "Riverdale School", "Tiểu học Sunshine": "Trường Riverdale",
            "three hundred": "six hundred", "300": "600",
            "photography club": "coding club", "nhiếp ảnh": "lập trình",
            "Singapore": "Seoul", "SQ172": "KE682"
        },
        7: { // Đề 7 (Vừa)
            "London": "Berlin", "Luân Đôn": "Berlin",
            "English teacher": "Geography teacher", "giáo viên Tiếng Anh": "giáo viên Địa lý",
            "primary school": "international school", "trường tiểu học": "trường quốc tế",
            "tennis": "running", "chơi tennis": "chạy bộ",
            "plastic bag": "plastic wrap", "túi nhựa": "màng bọc nhựa",
            "500 years": "350 years", "500 năm": "350 năm",
            "Sunshine Primary School": "Summit Academy", "Tiểu học Sunshine": "Học viện Summit",
            "three hundred": "three hundred fifty", "300": "350",
            "photography club": "music band", "nhiếp ảnh": "ban nhạc",
            "Singapore": "Frankfurt", "SQ172": "LH773"
        },
        8: { // Đề 8 (Khó)
            "London": "Toronto", "Luân Đôn": "Toronto",
            "English teacher": "IT teacher", "giáo viên Tiếng Anh": "giáo viên Tin học",
            "primary school": "technical college", "trường tiểu học": "trường cao đẳng kỹ thuật",
            "tennis": "golf", "chơi tennis": "chơi golf",
            "plastic bag": "microplastic", "túi nhựa": "vi nhựa",
            "500 years": "600 years", "500 năm": "600 năm",
            "Sunshine Primary School": "Oakridge High", "Tiểu học Sunshine": "Trung học Oakridge",
            "three hundred": "seven hundred", "300": "700",
            "photography club": "robotics club", "nhiếp ảnh": "rô-bốt",
            "Singapore": "New York", "SQ172": "UA179"
        },
        9: { // Đề 9 (Khó)
            "London": "Boston", "Luân Đôn": "Boston",
            "English teacher": "Physics teacher", "giáo viên Tiếng Anh": "giáo viên Vật lý",
            "primary school": "university", "trường tiểu học": "trường đại học",
            "tennis": "chess", "chơi tennis": "chơi cờ vua",
            "plastic bag": "plastic container", "túi nhựa": "hộp nhựa",
            "500 years": "800 years", "500 năm": "800 năm",
            "Sunshine Primary School": "Beacon Academy", "Tiểu học Sunshine": "Học viện Beacon",
            "three hundred": "eight hundred", "300": "800",
            "photography club": "debating society", "nhiếp ảnh": "tranh biện",
            "Singapore": "Los Angeles", "SQ172": "AA188"
        },
        10: { // Đề 10 (Khó)
            "London": "Chicago", "Luân Đôn": "Chicago",
            "English teacher": "Chemistry teacher", "giáo viên Tiếng Anh": "giáo viên Hóa học",
            "primary school": "science academy", "trường tiểu học": "viện hàn lâm khoa học",
            "tennis": "table tennis", "chơi tennis": "chơi bóng bàn",
            "plastic bag": "synthetic polymer", "túi nhựa": "polyme tổng hợp",
            "500 years": "1000 years", "500 năm": "1000 năm",
            "Sunshine Primary School": "Einstein High", "Tiểu học Sunshine": "Trung học Einstein",
            "three hundred": "one thousand", "300": "1000",
            "photography club": "astronomy club", "nhiếp ảnh": "thiên văn học",
            "Singapore": "Chicago", "SQ172": "UA896"
        }
    };

    // Hàm thay thế chuỗi dựa trên bản đồ từ khóa
    function replaceKeywords(text, map) {
        if (!text) return "";
        let newText = text;
        for (const key in map) {
            const regex = new RegExp(key, "g");
            newText = newText.replace(regex, map[key]);
        }
        return newText;
    }

    // Kho chủ đề Nói (Speaking) cho các đề thi bổ sung
    const extraSpeakingThemes = {
        3: [ // Đề 3 (Dễ)
            { prompt: "Introduce your best friend and how you met.", promptTranslation: "Hãy giới thiệu người bạn thân nhất của bạn và cách hai bạn gặp nhau.", sampleAnswer: "My best friend is Nam. We met in high school ten years ago. He is very funny and always helps me when I have problems." },
            { prompt: "Tell me about your favorite food and drink.", promptTranslation: "Hãy kể về đồ ăn và thức uống yêu thích của bạn.", sampleAnswer: "My favorite food is Pho, and I love drinking fresh coconut water. I usually enjoy them on weekends." }
        ],
        4: [ // Đề 4 (Vừa)
            { prompt: "What are the benefits of travelling to new places?", promptTranslation: "Lợi ích của việc đi du lịch đến những vùng đất mới là gì?", sampleAnswer: "Travelling broadens our minds, helps us experience diverse cultures, and allows us to relieve stress after hard work." },
            { prompt: "Tell me about a dynamic festival in your country.", promptTranslation: "Kể về một lễ hội sôi động ở đất nước của bạn.", sampleAnswer: "The Lunar New Year is our biggest festival. Everyone gathers, cooks traditional food, and wishes each other luck." }
        ],
        5: [ // Đề 5 (Vừa)
            { prompt: "How has the internet changed the way people communicate?", promptTranslation: "Internet đã thay đổi cách mọi người giao tiếp như thế nào?", sampleAnswer: "The internet makes communication instant and global. People can now video call each other easily via social media platforms." },
            { prompt: "Do you think playing sports is important for teachers?", promptTranslation: "Bạn có nghĩ chơi thể thao là quan trọng đối với giáo viên không?", sampleAnswer: "Yes, definitely. Sports help teachers stay healthy, reduce stress, and maintain high energy for teaching." }
        ],
        6: [ // Đề 6 (Vừa)
            { prompt: "What are the key qualities of a successful teacher?", promptTranslation: "Những phẩm chất then chốt của một giáo viên thành công là gì?", sampleAnswer: "A successful teacher should have deep subject knowledge, patience, and the ability to inspire students." },
            { prompt: "Tell me about your career goals for the next five years.", promptTranslation: "Kể về các mục tiêu sự nghiệp của bạn trong 5 năm tới.", sampleAnswer: "I hope to complete my Master's degree in Education and apply innovative digital tools in my English classes." }
        ],
        7: [ // Đề 7 (Vừa)
            { prompt: "What can individuals do to protect the local environment?", promptTranslation: "Cá nhân có thể làm gì để bảo vệ môi trường địa phương?", sampleAnswer: "We can reduce single-use plastic, recycle waste, plant more trees, and use public transport instead of personal cars." },
            { prompt: "Why is learning a second language beneficial for children?", promptTranslation: "Tại sao học ngôn ngữ thứ hai lại có lợi cho trẻ em?", sampleAnswer: "It enhances cognitive development, boosts brain power, and increases future career and academic opportunities globally." }
        ],
        8: [ // Đề 8 (Khó)
            { prompt: "What are the social challenges of artificial intelligence?", promptTranslation: "Thách thức xã hội của trí tuệ nhân tạo là gì?", sampleAnswer: "AI brings concerns about job displacement, data privacy, and ethical issues in automated decision-making processes." },
            { prompt: "How should schools address cybersecurity risks for students?", promptTranslation: "Trường học nên giải quyết các rủi ro an ninh mạng cho học sinh như thế nào?", sampleAnswer: "Schools should integrate digital citizenship in curricula, teach students how to identify phishing, and secure school servers." }
        ],
        9: [ // Đề 9 (Khó)
            { prompt: "Discuss the impact of economic globalization on developing nations.", promptTranslation: "Thảo luận về tác động của toàn cầu hóa kinh tế đối với các quốc gia đang phát triển.", sampleAnswer: "Globalization accelerates trade and technological exchange but can widen the wealth gap and threaten local traditional industries." },
            { prompt: "Should space exploration receive high government funding?", promptTranslation: "Khám phá vũ trụ có nên nhận được tài trợ ngân sách cao từ chính phủ không?", sampleAnswer: "Yes, it drives scientific innovations and technological breakthroughs, though it must be balanced with addressing domestic crises." }
        ],
        10: [ // Đề 10 (Khó)
            { prompt: "How does study of history shape a country's future national identity?", promptTranslation: "Việc học lịch sử định hình bản sắc quốc gia trong tương lai như thế nào?", sampleAnswer: "Understanding history fosters cultural appreciation, preserves heritage, and helps society avoid repeating past systemic failures." },
            { prompt: "Analyze the role of philosophy in the age of rapid scientific progress.", promptTranslation: "Phân tích vai trò của triết học trong thời đại tiến bộ khoa học nhanh chóng.", sampleAnswer: "Philosophy provides ethical frameworks and critical thinking to guide scientific applications, ensuring humanity remains the core focus." }
        ]
    };

    // Kho chủ đề Viết (Writing) cho các đề thi bổ sung
    const extraWritingThemes = {
        3: {
            media: "<strong>Đề bài viết số 3: Viết thư (Writing Task 1)</strong><br><br><strong>Chủ đề 1 (Birthday Party invitation):</strong> Write a letter of no more than 150 words to invite your friend to your birthday party next Saturday. Explain the time, venue, and what activities you have planned.",
            mediaTranslation: "<strong>Bản dịch đề bài viết:</strong><br><strong>Chủ đề 1 (Mời sinh nhật):</strong> Hãy viết bức thư dưới 150 từ mời bạn thân đến dự tiệc sinh nhật vào thứ Bảy tuần tới. Nêu rõ thời gian, địa điểm và các hoạt động vui chơi dự kiến.",
            prompt: "Write an invitation letter of no more than 150 words.",
            sampleAnswer: "Dear Nam, I am inviting you to my birthday party next Saturday at 6 PM at my house. We will have barbecue and sing karaoke. Hope you can come!"
        },
        4: {
            media: "<strong>Đề bài viết số 4: Viết thư (Writing Task 1)</strong><br><br><strong>Chủ đề 1 (Job Application Cover Letter):</strong> Write a letter of no more than 150 words to apply for an English teaching assistant position at a local language center. Describe your experience and why you are suitable.",
            mediaTranslation: "<strong>Bản dịch đề bài viết:</strong><br><strong>Chủ đề 1 (Thư xin việc):</strong> Viết thư ứng tuyển dưới 150 từ cho vị trí trợ giảng tiếng Anh tại một trung tâm ngoại ngữ. Miêu tả kinh nghiệm và lý do bạn phù hợp.",
            prompt: "Write a cover letter of no more than 150 words.",
            sampleAnswer: "Dear Hiring Manager, I am writing to apply for the teaching assistant position. I have two years of tutoring experience and love children. Sincerely."
        },
        5: {
            media: "<strong>Đề bài viết số 5: Viết thư (Writing Task 1)</strong><br><br><strong>Chủ đề 1 (Apology Letter to Colleague):</strong> Write a letter of no more than 150 words to apologize to a colleague for missing an important project meeting yesterday. Explain why you were absent and offer to help.",
            mediaTranslation: "<strong>Bản dịch đề bài viết:</strong><br><strong>Chủ đề 1 (Thư xin lỗi đồng nghiệp):</strong> Viết thư xin lỗi dưới 150 từ gửi đồng nghiệp vì đã lỡ cuộc họp dự án quan trọng hôm qua. Giải thích lý do và đề nghị hỗ trợ.",
            prompt: "Write an apology letter of no more than 150 words.",
            sampleAnswer: "Dear Phong, I sincerely apologize for missing our meeting yesterday due to a sudden family emergency. Let me know how I can help catch up. Regards."
        },
        6: {
            media: "<strong>Đề bài viết số 6: Viết thư (Writing Task 1)</strong><br><br><strong>Chủ đề 1 (Requesting Feedback from Manager):</strong> Write a letter of no more than 150 words to request feedback from your academic supervisor regarding your recent lesson plan submission.",
            mediaTranslation: "<strong>Bản dịch đề bài viết:</strong><br><strong>Chủ đề 1 (Yêu cầu phản hồi):</strong> Viết thư dưới 150 từ gửi người hướng dẫn học thuật của bạn để xin ý kiến đóng góp cho giáo án bạn vừa nộp gần đây.",
            prompt: "Write a formal request letter of no more than 150 words.",
            sampleAnswer: "Dear Mr. Anh, I would appreciate it if you could review my recently submitted lesson plan and provide feedback on the interactive activities. Thank you."
        },
        7: {
            media: "<strong>Đề bài viết số 7: Viết thư (Writing Task 1)</strong><br><br><strong>Chủ đề 1 (Resignation Notice):</strong> Write a letter of no more than 150 words to notify your school principal of your resignation due to relocation. Give two weeks' notice and express gratitude.",
            mediaTranslation: "<strong>Bản dịch đề bài viết:</strong><br><strong>Chủ đề 1 (Thư xin thôi việc):</strong> Viết thư dưới 150 từ gửi hiệu trưởng thông báo nghỉ việc vì chuyển nơi ở. Đưa ra thông báo trước 2 tuần và bày tỏ lòng biết ơn.",
            prompt: "Write a resignation letter of no more than 150 words.",
            sampleAnswer: "Dear Principal, please accept this letter as notification that I will resign my position effective in two weeks due to family relocation. Thank you for your support."
        },
        8: {
            media: "<strong>Đề bài viết số 8: Thư phàn nàn (Writing Task 1)</strong><br><br><strong>Chủ đề 1 (Incorrect Hotel Charge):</strong> Write a formal letter of no more than 150 words to complain to a hotel manager about an incorrect charge on your bill after checking out last week.",
            mediaTranslation: "<strong>Bản dịch đề bài viết:</strong><br><strong>Chủ đề 1 (Phàn nàn hóa đơn sai):</strong> Viết thư trang trọng dưới 150 từ gửi quản lý khách sạn phản ánh về một khoản phí sai lệch trên hóa đơn của bạn sau khi trả phòng tuần trước.",
            prompt: "Write a formal complaint letter of no more than 150 words.",
            sampleAnswer: "Dear Manager, I am writing regarding an incorrect mini-bar charge of $50 on invoice #901 after my checkout on June 12th. I did not use these items. Please refund."
        },
        9: {
            media: "<strong>Đề bài viết số 9: Thư học thuật (Writing Task 1)</strong><br><br><strong>Chủ đề 1 (Scholarship Application Request):</strong> Write a formal letter of no more than 150 words to a university admissions office requesting details and eligibility requirements for the Academic Excellence Scholarship.",
            mediaTranslation: "<strong>Bản dịch đề bài viết:</strong><br><strong>Chủ đề 1 (Xin thông tin học bổng):</strong> Viết thư trang trọng dưới 150 từ gửi văn phòng tuyển sinh đại học để hỏi chi tiết và điều kiện ứng tuyển học bổng xuất sắc học thuật.",
            prompt: "Write an inquiry letter of no more than 150 words.",
            sampleAnswer: "Dear Admissions, I am writing to inquire about the criteria and application deadline for the Academic Excellence Scholarship for the upcoming Fall term. Sincerely."
        },
        10: {
            media: "<strong>Đề bài viết số 10: Thư thương mại (Writing Task 1)</strong><br><br><strong>Chủ đề 1 (Requesting Partnership Proposal):</strong> Write a formal letter of no more than 150 words to a digital training provider asking for a customized corporate partnership proposal for teacher training.",
            mediaTranslation: "<strong>Bản dịch đề bài viết:</strong><br><strong>Chủ đề 1 (Yêu cầu đề xuất đối tác):</strong> Viết thư trang trọng dưới 150 từ gửi đơn vị đào tạo số để xin đề xuất đối tác đào tạo giáo viên được thiết kế riêng.",
            prompt: "Write a proposal request letter of no more than 150 words.",
            sampleAnswer: "Dear Sir/Madam, we are looking to train our English teachers in digital pedagogy. Please send us a customized partnership proposal detailing courses and costs."
        }
    };

    // Hàm tự động tạo đề thi từ Đề 3 đến Đề 10
    function generateExtraTest(testId) {
        // Sao chép Đề 2 làm nền tảng cấu trúc
        const baseTest = deepClone(adaptiveDbTest2);
        const map = replacementMaps[testId];

        // 1. Biến đổi phần Đọc (Reading)
        const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
        levels.forEach(lvl => {
            const section = baseTest.reading[lvl];
            if (section) {
                // Thay thế từ khóa trong bài đọc
                section.media = replaceKeywords(section.media, map);
                section.mediaTranslation = replaceKeywords(section.mediaTranslation, map);
                
                // Đảo thứ tự và thay đổi đáp án của câu hỏi đọc
                section.questions.forEach(qObj => {
                    qObj.q = replaceKeywords(qObj.q, map);
                    qObj.qTranslation = replaceKeywords(qObj.qTranslation, map);
                    qObj.options = qObj.options.map(opt => replaceKeywords(opt, map));
                    qObj.optionsTranslation = qObj.optionsTranslation.map(opt => replaceKeywords(opt, map));
                    
                    // Thực hiện đảo phương án ngẫu nhiên để tăng tính tư duy
                    const shuffled = shuffleOptions(qObj.options, qObj.optionsTranslation, qObj.correct);
                    qObj.options = shuffled.options;
                    qObj.optionsTranslation = shuffled.optionsTranslation;
                    qObj.correct = shuffled.correct;
                });
            }
        });

        // 2. Biến đổi phần Nghe (Listening)
        levels.forEach(lvl => {
            const section = baseTest.listening[lvl];
            if (section) {
                // Thay thế từ khóa trong đoạn nghe
                section.media = replaceKeywords(section.media, map);
                section.mediaTranslation = replaceKeywords(section.mediaTranslation, map);
                section.audioText = replaceKeywords(section.audioText, map);
                
                // Đảo thứ tự và thay đổi đáp án của câu hỏi nghe
                section.questions.forEach(qObj => {
                    qObj.q = replaceKeywords(qObj.q, map);
                    qObj.qTranslation = replaceKeywords(qObj.qTranslation, map);
                    qObj.options = qObj.options.map(opt => replaceKeywords(opt, map));
                    qObj.optionsTranslation = qObj.optionsTranslation.map(opt => replaceKeywords(opt, map));
                    
                    const shuffled = shuffleOptions(qObj.options, qObj.optionsTranslation, qObj.correct);
                    qObj.options = shuffled.options;
                    qObj.optionsTranslation = shuffled.optionsTranslation;
                    qObj.correct = shuffled.correct;
                });
            }
        });

        // 3. Biến đổi phần Nói (Speaking)
        const speakingTheme = extraSpeakingThemes[testId];
        if (speakingTheme && speakingTheme.length >= 2) {
            // Thay thế 2 câu hỏi nói đầu tiên bằng chủ đề mới theo độ khó
            baseTest.speaking[0].prompt = speakingTheme[0].prompt;
            baseTest.speaking[0].promptTranslation = speakingTheme[0].promptTranslation;
            baseTest.speaking[0].sampleAnswer = speakingTheme[0].sampleAnswer;

            baseTest.speaking[1].prompt = speakingTheme[1].prompt;
            baseTest.speaking[1].promptTranslation = speakingTheme[1].promptTranslation;
            baseTest.speaking[1].sampleAnswer = speakingTheme[1].sampleAnswer;
        }
        
        // Thay thế các câu hỏi Nói còn lại bằng cách đổi từ khóa
        baseTest.speaking.forEach((sQ, sIdx) => {
            if (sIdx >= 2) {
                sQ.prompt = replaceKeywords(sQ.prompt, map);
                sQ.promptTranslation = replaceKeywords(sQ.promptTranslation, map);
                sQ.sampleAnswer = replaceKeywords(sQ.sampleAnswer, map);
            }
        });

        // 4. Biến đổi phần Viết (Writing)
        const writingTheme = extraWritingThemes[testId];
        if (writingTheme) {
            baseTest.writing.media = writingTheme.media;
            baseTest.writing.mediaTranslation = writingTheme.mediaTranslation;
            baseTest.writing.prompt = writingTheme.prompt;
            baseTest.writing.sampleAnswer = writingTheme.sampleAnswer;
        }

        return baseTest;
    }

    // Tự động sinh và đẩy 8 đề thi vào Window/Global Scope
    for (let id = 3; id <= 10; id++) {
        window[`adaptiveDbTest${id}`] = generateExtraTest(id);
        console.log(`[Extra Tests] Đã khởi tạo thành công Đề thi số ${id} ở phạm vi toàn cục.`);
    }
})();
