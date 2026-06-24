// --- CƠ SỞ DỮ LIỆU HỌC LIỆU SONG NGỮ THÔNG MINH CEFR (20 BÀI HỌC - 4 KỸ NĂNG) ---
const learningMaterialsDb = {
    // ==========================================
    // CẤP ĐỘ A1 (CƠ BẢN) - 5 BÀI HỌC
    // ==========================================
    A1: {
        lessons: [
            {
                id: "a1_lesson_1",
                title: "Bài 1: Giới thiệu bản thân & Đồng nghiệp mới",
                description: "Học cách sử dụng Thì hiện tại đơn với động từ to be để tự giới thiệu và chào hỏi đồng nghiệp.",
                lectureText: "Chào Thầy Cô, sau đây là bài giảng về động từ to be ở thì Hiện tại đơn. Chúng ta dùng am với chủ ngữ I, dùng is với chủ ngữ số ít như he, she, it, và dùng are với chủ ngữ số nhiều như we, you, they. Ví dụ, I am a teacher nghĩa là tôi là giáo viên.",
                theoryHtml: `
                    <div class="space-y-3">
                        <p class="text-xs text-slate-350"><strong class="text-white">Cách dùng:</strong> Giới thiệu tên, nghề nghiệp, quốc tịch, trạng thái.</p>
                        <p class="text-xs text-slate-350"><strong class="text-white">Công thức:</strong> S + am/is/are + Danh từ/Tính từ</p>
                        <ul class="list-disc pl-4 text-[11px] text-slate-400">
                            <li>I + am <span class="italic text-emerald-450">(I am a new teacher.)</span></li>
                            <li>He/She/It/Danh từ số ít + is <span class="italic text-emerald-450">(She is a math teacher.)</span></li>
                            <li>We/You/They/Danh từ số nhiều + are <span class="italic text-emerald-450">(They are cooperative.)</span></li>
                        </ul>
                    </div>
                `,
                reading: {
                    passage: "Hello, my name is John. I am a new English teacher at Sunshine School. She is Ms. Lan, my colleague. We are very excited to work together.",
                    passageTranslation: "Xin chào, tôi tên là John. Tôi là giáo viên Tiếng Anh mới tại trường Sunshine. Cô ấy là cô Lan, đồng nghiệp của tôi. Chúng tôi rất hào hứng làm việc cùng nhau.",
                    questions: [
                        {
                            id: "a1_l1_r1",
                            q: "What is John's job?",
                            qTranslation: "Công việc của John là gì?",
                            options: ["He is a teacher.", "He is a student.", "He is a doctor."],
                            optionsTranslation: ["Anh ấy là giáo viên.", "Anh ấy là học sinh.", "Anh ấy là bác sĩ."],
                            correct: 0,
                            explanation: "Đoạn văn viết: 'I am a new English teacher' (Tôi là giáo viên Tiếng Anh mới).",
                            studyTip: "Mẹo nhớ: 'I am a teacher' chỉ nghề nghiệp của người nói là John."
                        },
                        {
                            id: "a1_l1_r2",
                            q: "Who is Ms. Lan?",
                            qTranslation: "Cô Lan là ai?",
                            options: ["John's student", "John's colleague", "John's sister"],
                            optionsTranslation: ["Học sinh của John", "Đồng nghiệp của John", "Chị/em gái của John."],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'She is Ms. Lan, my colleague' (Cô ấy là cô Lan, đồng nghiệp của tôi).",
                            studyTip: "Mẹo: Từ 'colleague' nghĩa là đồng nghiệp."
                        },
                        {
                            id: "a1_l1_r3",
                            q: "How do they feel about working together?",
                            qTranslation: "Họ cảm thấy thế nào về việc làm việc cùng nhau?",
                            options: ["They are bored.", "They are tired.", "They are excited."],
                            optionsTranslation: ["Họ chán nản.", "Họ mệt mỏi.", "Họ hào hứng."],
                            correct: 2,
                            explanation: "Đoạn văn viết: 'We are very excited to work together' (Chúng tôi rất hào hứng làm việc cùng nhau).",
                            studyTip: "Mẹo: Từ 'excited' mang nghĩa hào hứng, tích cực."
                        },
                        {
                            id: "a1_l1_r4",
                            q: "What is the name of John's school?",
                            qTranslation: "Tên trường của John là gì?",
                            options: ["Sunshine School", "Vo Thi Sau School", "Hanoi School"],
                            optionsTranslation: ["Trường Sunshine", "Trường Võ Thị Sáu", "Trường Hà Nội"],
                            correct: 0,
                            explanation: "Đoạn văn viết: 'a new English teacher at Sunshine School' (giáo viên tiếng Anh mới tại trường Sunshine).",
                            studyTip: "Mẹo: Tìm danh từ riêng viết hoa chỉ tên trường học."
                        },
                        {
                            id: "a1_l1_r5",
                            q: "Who is John's colleague?",
                            qTranslation: "Đồng nghiệp của John là ai?",
                            options: ["Mr. Peter", "Ms. Lan", "Mr. Minh"],
                            optionsTranslation: ["Thầy Peter", "Cô Lan", "Thầy Minh"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'She is Ms. Lan, my colleague' (Cô ấy là cô Lan, đồng nghiệp của tôi).",
                            studyTip: "Mẹo: Chú ý danh từ riêng đứng sau đại từ 'She is Ms. Lan'."
                        }
                    ]
                },
                listening: {
                    audioText: "Hi everyone, I am Peter. I am a primary school teacher in Hanoi. I am thirty years old. My school is very big and clean.",
                    audioTranslation: "Chào mọi người, tôi là Peter. Tôi là giáo viên tiểu học ở Hà Nội. Tôi 30 tuổi. Trường của tôi rất to và sạch sẽ.",
                    questions: [
                        {
                            id: "a1_l1_l1",
                            q: "Where does Peter teach?",
                            qTranslation: "Peter dạy ở đâu?",
                            options: ["In Ho Chi Minh City", "In Hanoi", "In Danang"],
                            optionsTranslation: ["Ở TP. Hồ Chí Minh", "Ở Hà Nội", "Ở Đà Nẵng"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'primary school teacher in Hanoi' (giáo viên tiểu học ở Hà Nội).",
                            studyTip: "Mẹo: Hãy chú ý lắng nghe tên địa danh cụ thể."
                        },
                        {
                            id: "a1_l1_l2",
                            q: "How old is Peter?",
                            qTranslation: "Peter bao nhiêu tuổi?",
                            options: ["Twenty years old", "Thirty years old", "Forty years old"],
                            optionsTranslation: ["20 tuổi", "30 tuổi", "40 tuổi"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'I am thirty years old' (Tôi 30 tuổi).",
                            studyTip: "Mẹo: Số 30 trong tiếng Anh là thirty."
                        },
                        {
                            id: "a1_l1_l3",
                            q: "What is his school like?",
                            qTranslation: "Trường học của anh ấy như thế nào?",
                            options: ["Big and clean", "Small and noisy", "Old and dark"],
                            optionsTranslation: ["To và sạch sẽ", "Nhỏ và ồn ào", "Cổ và tối tăm"],
                            correct: 0,
                            explanation: "Băng nghe nói: 'My school is very big and clean' (Trường của tôi rất to và sạch sẽ).",
                            studyTip: "Mẹo: Từ 'big' là to lớn, 'clean' là sạch sẽ."
                        },
                        {
                            id: "a1_l1_l4",
                            q: "How is Peter's school?",
                            qTranslation: "Trường học của Peter thế nào?",
                            options: ["Small and quiet", "Big and clean", "Old and dirty"],
                            optionsTranslation: ["Nhỏ và yên tĩnh", "To và sạch sẽ", "Cũ và bẩn"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'My school is very big and clean' (Trường của tôi rất to và sạch sẽ).",
                            studyTip: "Mẹo: Nghe tính từ mô tả trạng thái 'big and clean'."
                        },
                        {
                            id: "a1_l1_l5",
                            q: "What is Peter's job?",
                            qTranslation: "Công việc của Peter là gì?",
                            options: ["A secondary school teacher", "A primary school teacher", "A high school teacher"],
                            optionsTranslation: ["Giáo viên trung học cơ sở", "Giáo viên tiểu học", "Giáo viên trung học phổ thông"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'I am a primary school teacher' (Tôi là một giáo viên tiểu học).",
                            studyTip: "Mẹo: Từ 'primary school' là trường tiểu học."
                        }
                    ]
                },
                speaking: {
                    prompt: "Introduce yourself. State your name, your job, and your school.",
                    promptTranslation: "Hãy tự giới thiệu bản thân. Nêu tên, công việc và trường của Thầy/Cô.",
                    sampleAnswer: "Hello, my name is Lan. I am an English teacher at Vo Thi Sau School.",
                    sampleTranslation: "Xin chào, tên tôi là Lan. Tôi là giáo viên tiếng Anh tại trường Võ Thị Sáu.",
                    guideTips: "Gợi ý: Dùng cấu trúc 'My name is [Tên]' và 'I am a/an [Nghề nghiệp] at [Trường]'.\n\n* 5 CHỦ ĐỀ LUYỆN NÓI THÊM:\n1. Introduce your best friend at school.\n2. Talk about your favorite English teacher.\n3. Introduce the English department at your school.\n4. Describe your classroom to a new colleague.\n5. Talk about the subject you teach and why you like it."
                },
                writing: {
                    prompt: "Write 3 simple sentences to introduce a new colleague in your department.",
                    promptTranslation: "Viết 3 câu đơn giản để giới thiệu một đồng nghiệp mới trong tổ bộ môn của Thầy/Cô.",
                    suggestedVocab: "colleague (đồng nghiệp), friendly (thân thiện), teach (dạy học).\n\n* 5 ĐỀ BÀI LUYỆN VIẾT THÊM:\n1. Write 3 sentences introducing your school principal.\n2. Write a brief note introducing a friendly new teacher to your students.\n3. Write 3 sentences about your school's security guard.\n4. Write a short text introducing a foreign teacher visiting your department.\n5. Write 3 sentences about a helpful math teacher in your team.",
                    sampleAnswer: "This is Mr. David. He is a new science teacher. He is very friendly."
                }
            },
            {
                id: "a1_lesson_2",
                title: "Bài 2: Các hoạt động giảng dạy hàng ngày",
                description: "Học cách sử dụng Thì hiện tại đơn với động từ thường để nói về thói quen dạy học và trạng từ chỉ tần suất.",
                lectureText: "Chào Thầy Cô, sau đây là bài giảng về động từ thường ở thì Hiện tại đơn. Với chủ ngữ số nhiều như I, we, you, they, động từ giữ nguyên dạng. Với chủ ngữ số ít như he, she, it, chúng ta thêm s hoặc es vào sau động từ. Ví dụ, I teach English every day, nhưng she teaches math every day.",
                theoryHtml: `
                    <div class="space-y-3">
                        <p class="text-xs text-slate-350"><strong class="text-white">Công thức:</strong> S + V(s/es)</p>
                        <ul class="list-disc pl-4 text-[11px] text-slate-400">
                            <li>Chủ ngữ số nhiều: S + V (nguyên thể) <span class="italic text-emerald-450">(They work at school.)</span></li>
                            <li>Chủ ngữ số ít: S + V-s/es <span class="italic text-emerald-450">(He teaches biology.)</span></li>
                            <li>Trạng từ tần suất (always, usually, often...) đứng trước động từ thường, sau động từ to be.</li>
                        </ul>
                    </div>
                `,
                reading: {
                    passage: "Mr. Minh usually starts his workday at 7:30 AM. He teaches math classes in the morning. In the afternoon, he grades papers and plans lessons.",
                    passageTranslation: "Thầy Minh thường bắt đầu ngày làm việc lúc 7 giờ 30 sáng. Thầy dạy các lớp toán vào buổi sáng. Vào buổi chiều, thầy chấm bài và soạn giáo án.",
                    questions: [
                        {
                            id: "a1_l2_r1",
                            q: "What time does Mr. Minh usually start his workday?",
                            qTranslation: "Thầy Minh thường bắt đầu ngày làm việc lúc mấy giờ?",
                            options: ["At 7:00 AM", "At 7:30 AM", "At 8:00 AM"],
                            optionsTranslation: ["Lúc 7:00 sáng", "Lúc 7:30 sáng", "Lúc 8:00 sáng"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'starts his workday at 7:30 AM'.",
                            studyTip: "Mẹo: Tìm mốc thời gian số giờ cụ thể."
                        },
                        {
                            id: "a1_l2_r2",
                            q: "What does Mr. Minh do in the afternoon?",
                            qTranslation: "Thầy Minh làm gì vào buổi chiều?",
                            options: ["Teaches math classes", "Grades papers and plans lessons", "Has a staff meeting"],
                            optionsTranslation: ["Dạy các lớp toán", "Chấm bài và soạn giáo án", "Họp hội đồng giáo viên"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'In the afternoon, he grades papers and plans lessons'.",
                            studyTip: "Mẹo: Từ 'afternoon' là buổi chiều."
                        },
                        {
                            id: "a1_l2_r3",
                            q: "Who teaches math classes in the morning?",
                            qTranslation: "Ai dạy các lớp toán vào buổi sáng?",
                            options: ["Mr. John", "Mr. Minh", "Mr. Peter"],
                            optionsTranslation: ["Thầy John", "Thầy Minh", "Thầy Peter"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'Mr. Minh usually starts... He teaches math classes...'",
                            studyTip: "Mẹo: Xác định chủ ngữ của câu 'Mr. Minh'."
                        },
                        {
                            id: "a1_l2_r4",
                            q: "Does Mr. Minh teach in the morning or in the afternoon?",
                            qTranslation: "Thầy Minh dạy học vào buổi sáng hay buổi chiều?",
                            options: ["In the morning", "In the afternoon", "Both morning and afternoon"],
                            optionsTranslation: ["Vào buổi sáng", "Vào buổi chiều", "Cả sáng và chiều"],
                            correct: 0,
                            explanation: "Đoạn văn viết: 'He teaches math classes in the morning'.",
                            studyTip: "Mẹo: Tìm cụm từ 'in the morning' trong đoạn văn."
                        },
                        {
                            id: "a1_l2_r5",
                            q: "What is Mr. Minh's job?",
                            qTranslation: "Công việc của Thầy Minh là gì?",
                            options: ["An English teacher", "A math teacher", "A history teacher"],
                            optionsTranslation: ["Giáo viên tiếng Anh", "Giáo viên toán", "Giáo viên lịch sử"],
                            correct: 1,
                            explanation: "Đoạn văn ghi 'He teaches math classes' (Anh ấy dạy các lớp toán).",
                            studyTip: "Mẹo: Từ 'math' nghĩa là môn Toán."
                        }
                    ]
                },
                listening: {
                    audioText: "I usually teach three English classes every morning. In the afternoon, I often talk to my students' parents.",
                    audioTranslation: "Tôi thường dạy ba lớp tiếng Anh mỗi sáng. Vào buổi chiều, tôi thường nói chuyện với phụ huynh của học sinh.",
                    questions: [
                        {
                            id: "a1_l2_l1",
                            q: "How many classes does the teacher teach in the morning?",
                            qTranslation: "Giáo viên dạy mấy lớp vào buổi sáng?",
                            options: ["Two classes", "Three classes", "Four classes"],
                            optionsTranslation: ["Hai lớp", "Ba lớp", "Bốn lớp"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'teach three English classes every morning'.",
                            studyTip: "Mẹo: Tập trung nghe các số đếm từ 1 đến 5."
                        },
                        {
                            id: "a1_l2_l2",
                            q: "What does the teacher do in the afternoon?",
                            qTranslation: "Giáo viên làm gì vào buổi chiều?",
                            options: ["Talks to students' parents", "Grades papers", "Attends a training course"],
                            optionsTranslation: ["Nói chuyện với phụ huynh", "Chấm bài kiểm tra", "Tham gia khóa tập huấn"],
                            correct: 0,
                            explanation: "Băng nghe nói: 'In the afternoon, I often talk to my students' parents'.",
                            studyTip: "Mẹo: Lắng nghe danh từ 'parents' (phụ huynh)."
                        },
                        {
                            id: "a1_l2_l3",
                            q: "What language does the teacher teach?",
                            qTranslation: "Giáo viên dạy ngôn ngữ nào?",
                            options: ["Chinese", "English", "Vietnamese"],
                            optionsTranslation: ["Tiếng Trung", "Tiếng Anh", "Tiếng Việt"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'teach three English classes'.",
                            studyTip: "Mẹo: Nghe từ chỉ môn học 'English'."
                        },
                        {
                            id: "a1_l2_l4",
                            q: "How often does the teacher talk to parents in the afternoon?",
                            qTranslation: "Giáo viên có thường nói chuyện với phụ huynh vào buổi chiều không?",
                            options: ["Rarely", "Never", "Often"],
                            optionsTranslation: ["Hiếm khi", "Không bao giờ", "Thường xuyên"],
                            correct: 2,
                            explanation: "Băng nghe nói: 'I often talk to my students' parents'.",
                            studyTip: "Mẹo: Nghe trạng từ chỉ tần suất 'often'."
                        },
                        {
                            id: "a1_l2_l5",
                            q: "When does the teacher teach English classes?",
                            qTranslation: "Giáo viên dạy các lớp tiếng Anh khi nào?",
                            options: ["Every morning", "Every afternoon", "Every evening"],
                            optionsTranslation: ["Mỗi buổi sáng", "Mỗi buổi chiều", "Mỗi buổi tối"],
                            correct: 0,
                            explanation: "Băng nghe nói: 'every morning' (mỗi sáng).",
                            studyTip: "Mẹo: Nghe từ khóa thời gian 'morning'."
                        }
                    ]
                },
                speaking: {
                    prompt: "Talk about your daily routines as a teacher. What do you do in the morning?",
                    promptTranslation: "Hãy nói về các hoạt động hàng ngày của Thầy/Cô với tư cách là giáo viên. Thầy/Cô làm gì vào buổi sáng?",
                    sampleAnswer: "I usually go to school at 7 AM. I teach English classes from 8 to 11 AM.",
                    sampleTranslation: "Tôi thường đi học lúc 7 giờ sáng. Tôi dạy các lớp tiếng Anh từ 8 đến 11 giờ sáng.",
                    guideTips: "Gợi ý: Sử dụng các trạng từ tần suất như 'usually', 'often' và động từ thường ở hiện tại đơn.\n\n* 5 CHỦ ĐỀ LUYỆN NÓI THÊM:\n1. Talk about your favorite teaching activity.\n2. Describe your morning preparation before class.\n3. Describe what you do during school recess.\n4. Describe your interaction with parents.\n5. Talk about how you end your workday."
                },
                writing: {
                    prompt: "Write 3 sentences about what you do in the afternoon at school.",
                    promptTranslation: "Viết 3 câu về những việc Thầy/Cô làm vào buổi chiều tại trường học.",
                    suggestedVocab: "grade papers (chấm bài), plan (lên kế hoạch), lesson plans (giáo án).\n\n* 5 ĐỀ BÀI LUYỆN VIẾT THÊM:\n1. Write 3 sentences about your morning duties.\n2. Write 3 sentences about how you talk to students during class.\n3. Write 3 sentences about grading tests.\n4. Write 3 sentences about a conversation with a colleague.\n5. Write 3 sentences about cleaning the classroom after school.",
                    sampleAnswer: "In the afternoon, I grade papers in the office. I also prepare lesson plans for tomorrow."
                }
            },
            {
                id: "a1_lesson_3",
                title: "Bài 3: Hoạt động đang diễn ra trong lớp",
                description: "Học cách sử dụng Thì hiện tại tiếp diễn để mô tả các hoạt động đang diễn ra tại thời điểm nói.",
                lectureText: "Chào Thầy Cô, sau đây là bài giảng về Thì Hiện tại tiếp diễn. Thì này dùng để tả hành động đang xảy ra lúc nói. Công thức là chủ ngữ cộng to be gồm am, is, are cộng động từ thêm đuôi i n g. Ví dụ, The students are reading books nghĩa là các học sinh đang đọc sách.",
                theoryHtml: `
                    <div class="space-y-3">
                        <p class="text-xs text-slate-350"><strong class="text-white">Công thức:</strong> S + am/is/are + V-ing</p>
                        <ul class="list-disc pl-4 text-[11px] text-slate-400">
                            <li>Diễn tả hành động đang xảy ra ngay lúc nói.</li>
                            <li>Từ nhận biết: now, at the moment, look!, listen!</li>
                            <li>Ví dụ: Look! The principal is coming. <span class="italic text-emerald-450">(Nhìn kìa! Hiệu trưởng đang đi tới.)</span></li>
                        </ul>
                    </div>
                `,
                reading: {
                    passage: "At the moment, a writing lesson is happening in class 4A. The teacher is writing grammar rules on the board, and the students are copying them.",
                    passageTranslation: "Hiện tại, một tiết tập viết đang diễn ra ở lớp 4A. Giáo viên đang viết các quy tắc ngữ pháp lên bảng, và học sinh đang sao chép chúng.",
                    questions: [
                        {
                            id: "a1_l3_r1",
                            q: "What is the teacher doing now?",
                            qTranslation: "Giáo viên đang làm gì lúc này?",
                            options: ["Reading a story", "Writing grammar rules on the board", "Grading papers"],
                            optionsTranslation: ["Đọc truyện", "Viết quy tắc ngữ pháp lên bảng", "Chấm bài"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'The teacher is writing grammar rules on the board'.",
                            studyTip: "Mẹo: Tìm từ khóa 'is writing' trong đoạn văn."
                        },
                        {
                            id: "a1_l3_r2",
                            q: "Which class is the writing lesson happening in?",
                            qTranslation: "Tiết học viết đang diễn ra ở lớp nào?",
                            options: ["Class 3A", "Class 4A", "Class 5A"],
                            optionsTranslation: ["Lớp 3A", "Lớp 4A", "Lớp 5A"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'happening in class 4A'.",
                            studyTip: "Mẹo: Tìm số và chữ cái của tên lớp."
                        },
                        {
                            id: "a1_l3_r3",
                            q: "What are the students doing in class 4A?",
                            qTranslation: "Học sinh lớp 4A đang làm gì?",
                            options: ["Writing grammar rules", "Copying the grammar rules", "Reading books"],
                            optionsTranslation: ["Viết quy tắc ngữ pháp", "Chép lại các quy tắc ngữ pháp", "Đọc sách"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'and the students are copying them'.",
                            studyTip: "Mẹo: Cụm từ 'copying them' nghĩa là đang chép lại chúng."
                        },
                        {
                            id: "a1_l3_r4",
                            q: "Where is the teacher writing grammar rules?",
                            qTranslation: "Giáo viên đang viết các quy tắc ngữ pháp ở đâu?",
                            options: ["On the board", "In the notebook", "On the computer"],
                            optionsTranslation: ["Trên bảng", "Trong vở", "Trên máy tính"],
                            correct: 0,
                            explanation: "Đoạn văn ghi 'writing grammar rules on the board'.",
                            studyTip: "Mẹo: Từ 'board' là cái bảng."
                        },
                        {
                            id: "a1_l3_r5",
                            q: "Is the teacher reading a story right now?",
                            qTranslation: "Giáo viên có đang đọc truyện lúc này không?",
                            options: ["Yes, she is.", "No, she is writing on the board.", "Yes, she is grading papers."],
                            optionsTranslation: ["Có, cô ấy đang đọc.", "Không, cô ấy đang viết bảng.", "Có, cô ấy đang chấm bài."],
                            correct: 1,
                            explanation: "Đoạn văn ghi 'The teacher is writing grammar rules'.",
                            studyTip: "Mẹo: Xác định hành động phủ định dựa trên thông tin thực tế."
                        }
                    ]
                },
                listening: {
                    audioText: "Listen! The students are singing an English song in the music room. They are singing very loudly.",
                    audioTranslation: "Nghe kìa! Học sinh đang hát một bài hát tiếng Anh trong phòng nhạc. Chúng đang hát rất to.",
                    questions: [
                        {
                            id: "a1_l3_l1",
                            q: "What are the students doing in the music room?",
                            qTranslation: "Học sinh đang làm gì trong phòng nhạc?",
                            options: ["They are dancing.", "They are singing an English song.", "They are playing games."],
                            optionsTranslation: ["Chúng đang nhảy múa.", "Chúng đang hát một bài tiếng Anh.", "Chúng đang chơi trò chơi."],
                            correct: 1,
                            explanation: "Băng nghe nói: 'students are singing an English song'.",
                            studyTip: "Mẹo: Từ khóa bắt đầu bằng động từ chỉ sự chú ý: 'Listen!'."
                        },
                        {
                            id: "a1_l3_l2",
                            q: "Where are the students singing?",
                            qTranslation: "Các học sinh đang hát ở đâu?",
                            options: ["In the classroom", "In the music room", "In the schoolyard"],
                            optionsTranslation: ["Trong lớp học", "Trong phòng nhạc", "Ở sân trường"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'singing an English song in the music room'.",
                            studyTip: "Mẹo: Nghe từ khóa 'music room'."
                        },
                        {
                            id: "a1_l3_l3",
                            q: "What kind of song are the students singing?",
                            qTranslation: "Các học sinh đang hát thể loại nhạc nào?",
                            options: ["A French song", "A Vietnamese song", "An English song"],
                            optionsTranslation: ["Một bài hát tiếng Pháp", "Một bài hát tiếng Việt", "Một bài hát tiếng Anh"],
                            correct: 2,
                            explanation: "Băng nghe nói: 'singing an English song'.",
                            studyTip: "Mẹo: Nghe từ chỉ ngôn ngữ 'English'."
                        },
                        {
                            id: "a1_l3_l4",
                            q: "How are they singing the song?",
                            qTranslation: "Họ đang hát bài hát đó như thế nào?",
                            options: ["Very quietly", "Very loudly", "Very slowly"],
                            optionsTranslation: ["Rất nhỏ nhẹ", "Rất to (lớn giọng)", "Rất chậm chạp"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'singing very loudly'.",
                            studyTip: "Mẹo: Trạng từ 'loudly' nghĩa là to, lớn tiếng."
                        },
                        {
                            id: "a1_l3_l5",
                            q: "What word triggers attention in the audio?",
                            qTranslation: "Từ nào gây chú ý trong đoạn băng nghe?",
                            options: ["Look!", "Listen!", "Hurry up!"],
                            optionsTranslation: ["Nhìn kìa!", "Nghe kìa!", "Nhanh lên!"],
                            correct: 1,
                            explanation: "Băng nghe bắt đầu bằng: 'Listen!'..",
                            studyTip: "Mẹo: 'Listen' dùng để thu hút sự chú ý vào âm thanh."
                        }
                    ]
                },
                speaking: {
                    prompt: "Look around your imaginary classroom. Tell the coach what two students are doing right now.",
                    promptTranslation: "Hãy nhìn quanh lớp học tưởng tượng của Thầy/Cô. Nói cho HLV biết hai học sinh đang làm gì lúc này.",
                    sampleAnswer: "Now, Nam is reading a book and Lan is writing a paragraph.",
                    sampleTranslation: "Bây giờ, Nam đang đọc một cuốn sách và Lan đang viết một đoạn văn.",
                    guideTips: "Gợi ý: Sử dụng cấu trúc 'is/are + V-ing' kèm tên học sinh.\n\n* 5 CHỦ ĐỀ LUYỆN NÓI THÊM:\n1. Describe what a student is doing at the board.\n2. Talk about what students are doing during a science experiment.\n3. Talk about what teachers are doing during recess.\n4. Describe a scene of students cleaning the classroom.\n5. Describe a student asking the teacher a question."
                },
                writing: {
                    prompt: "Write 3 sentences describing what is happening in the staffroom right now.",
                    promptTranslation: "Viết 3 câu mô tả những gì đang xảy ra trong văn phòng giáo viên lúc này.",
                    suggestedVocab: "drink tea (uống trà), talk (nói chuyện), prepare (chuẩn bị).\n\n* 5 ĐỀ BÀI LUYỆN VIẾT THÊM:\n1. Write 3 sentences about students playing in the yard during recess.\n2. Write 3 sentences about a teacher explaining a difficult lesson.\n3. Write 3 sentences about a student doing home exercises.\n4. Write 3 sentences about a librarian organizing books.\n5. Write 3 sentences about a parent waiting outside the classroom.",
                    sampleAnswer: "In the staffroom, some teachers are drinking tea. Ms. Hoa is preparing a presentation."
                }
            },
            {
                id: "a1_lesson_4",
                title: "Bài 4: Sắp xếp và mô tả vị trí lớp học",
                description: "Học cách sử dụng danh từ số ít, danh từ số nhiều và các giới từ chỉ vị trí để mô tả lớp học.",
                lectureText: "Chào Thầy Cô, sau đây là bài giảng về giới từ chỉ vị trí và danh từ số nhiều. Để mô tả nơi chốn, ta dùng in nghĩa là trong, on là trên, under là dưới, next to là cạnh bên. Khi chuyển danh từ sang số nhiều ta thường thêm đuôi s hoặc es.",
                theoryHtml: `
                    <div class="space-y-3">
                        <p class="text-xs text-slate-350"><strong class="text-white">Giới từ nơi chốn:</strong> in, on, under, next to, behind, in front of.</p>
                        <p class="text-xs text-slate-350"><strong class="text-white">Danh từ số nhiều:</strong> Thêm -s hoặc -es vào sau danh từ đếm được.</p>
                        <ul class="list-disc pl-4 text-[11px] text-slate-400">
                            <li>a desk -> many desks <span class="italic text-emerald-450">(nhiều bàn)</span></li>
                            <li>a box -> boxes <span class="italic text-emerald-450">(các hộp)</span></li>
                            <li>The books are on the shelf. <span class="italic text-emerald-450">(Sách ở trên kệ.)</span></li>
                        </ul>
                    </div>
                `,
                reading: {
                    passage: "There are thirty desks in our classroom. The teacher's table is in front of the board. There is a computer on the table.",
                    passageTranslation: "Có 30 cái bàn trong lớp học của chúng tôi. Bàn giáo viên ở trước bảng đen. Có một chiếc máy tính ở trên bàn.",
                    questions: [
                        {
                            id: "a1_l4_r1",
                            q: "Where is the teacher's table?",
                            qTranslation: "Bàn của giáo viên ở đâu?",
                            options: ["Next to the door", "In front of the board", "Behind the class"],
                            optionsTranslation: ["Cạnh cửa ra vào", "Trước bảng đen", "Phía sau lớp học"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'The teacher's table is in front of the board'.",
                            studyTip: "Mẹo: Từ khóa 'in front of' nghĩa là ở phía trước."
                        },
                        {
                            id: "a1_l4_r2",
                            q: "How many desks are there in the classroom?",
                            qTranslation: "Có bao nhiêu chiếc bàn trong lớp học?",
                            options: ["Twenty desks", "Thirty desks", "Forty desks"],
                            optionsTranslation: ["20 chiếc bàn", "30 chiếc bàn", "40 chiếc bàn"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'There are thirty desks in our classroom'.",
                            studyTip: "Mẹo: Từ 'thirty' nghĩa là số 30."
                        },
                        {
                            id: "a1_l4_r3",
                            q: "What is on the teacher's table?",
                            qTranslation: "Cái gì ở trên bàn giáo viên?",
                            options: ["A computer", "A book", "A board"],
                            optionsTranslation: ["Một chiếc máy tính", "Một cuốn sách", "Một cái bảng"],
                            correct: 0,
                            explanation: "Đoạn văn viết: 'There is a computer on the table'.",
                            studyTip: "Mẹo: Tìm từ khóa 'computer' và giới từ 'on'."
                        },
                        {
                            id: "a1_l4_r4",
                            q: "Is the computer under the table?",
                            qTranslation: "Máy tính có ở dưới gầm bàn không?",
                            options: ["Yes, it is.", "No, it is on the table.", "Yes, it is behind the board."],
                            optionsTranslation: ["Có, đúng vậy.", "Không, nó ở trên bàn.", "Có, nó ở sau bảng."],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'There is a computer on the table' (Có một chiếc máy tính ở trên bàn).",
                            studyTip: "Mẹo: Nhận biết vị trí ngược lại với 'under'."
                        },
                        {
                            id: "a1_l4_r5",
                            q: "Where is the board in relation to the teacher's table?",
                            qTranslation: "Bảng đen ở vị trí nào so với bàn giáo viên?",
                            options: ["Behind the table", "On the table", "Next to the table"],
                            optionsTranslation: ["Phía sau chiếc bàn", "Ở trên bàn", "Bên cạnh chiếc bàn"],
                            correct: 0,
                            explanation: "Đoạn văn viết: 'The teacher's table is in front of the board' (bàn giáo viên ở trước bảng), nghĩa là bảng ở sau bàn.",
                            studyTip: "Mẹo: Cụm 'in front of' trái nghĩa với 'behind'."
                        }
                    ]
                },
                listening: {
                    audioText: "There are two whiteboards on the wall. Under the window, there is a big bookshelf with many english storybooks.",
                    audioTranslation: "Có hai chiếc bảng trắng trên tường. Dưới cửa sổ là một kệ sách lớn đựng nhiều sách truyện tiếng Anh.",
                    questions: [
                        {
                            id: "a1_l4_l1",
                            q: "What is under the window?",
                            qTranslation: "Cái gì ở dưới cửa sổ?",
                            options: ["A teacher's desk", "A big bookshelf", "Two whiteboards"],
                            optionsTranslation: ["Bàn giáo viên", "Kệ sách lớn", "Hai cái bảng trắng"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'Under the window, there is a big bookshelf'.",
                            studyTip: "Mẹo: Lắng nghe giới từ 'under' (dưới)."
                        },
                        {
                            id: "a1_l4_l2",
                            q: "How many whiteboards are on the wall?",
                            qTranslation: "Có bao nhiêu cái bảng trắng ở trên tường?",
                            options: ["One whiteboard", "Two whiteboards", "Three whiteboards"],
                            optionsTranslation: ["1 cái bảng trắng", "2 cái bảng trắng", "3 cái bảng trắng"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'There are two whiteboards on the wall'.",
                            studyTip: "Mẹo: Chú ý số đếm 'two' (2)."
                        },
                        {
                            id: "a1_l4_l3",
                            q: "What are in the bookshelf?",
                            qTranslation: "Có những gì ở trong kệ sách?",
                            options: ["Many English storybooks", "Many notebooks", "Some pens and pencils"],
                            optionsTranslation: ["Nhiều sách truyện tiếng Anh", "Nhiều vở ghi", "Một vài bút mực và bút chì"],
                            correct: 0,
                            explanation: "Băng nghe nói: 'a big bookshelf with many english storybooks'.",
                            studyTip: "Mẹo: Nghe cụm từ 'english storybooks'."
                        },
                        {
                            id: "a1_l4_l4",
                            q: "Where are the whiteboards?",
                            qTranslation: "Những cái bảng trắng ở đâu?",
                            options: ["On the wall", "On the desk", "Under the window"],
                            optionsTranslation: ["Trên tường", "Trên bàn làm việc", "Dưới cửa sổ"],
                            correct: 0,
                            explanation: "Băng nghe nói: 'There are two whiteboards on the wall'.",
                            studyTip: "Mẹo: Nghe giới từ nơi chốn 'on the wall'."
                        },
                        {
                            id: "a1_l4_l5",
                            q: "Is the bookshelf small?",
                            qTranslation: "Kệ sách có nhỏ không?",
                            options: ["Yes, it is.", "No, it is a big bookshelf.", "Not mentioned."],
                            optionsTranslation: ["Có, đúng vậy.", "Không, nó là một kệ sách lớn.", "Không đề cập."],
                            correct: 1,
                            explanation: "Băng nghe nói: 'there is a big bookshelf'.",
                            studyTip: "Mẹo: Lắng nghe tính từ 'big' (lớn) đi kèm."
                        }
                    ]
                },
                speaking: {
                    prompt: "Describe the position of your laptop and your books on your working table.",
                    promptTranslation: "Hãy mô tả vị trí chiếc máy tính xách tay và những cuốn sách trên bàn làm việc của Thầy/Cô.",
                    sampleAnswer: "My laptop is on the table. My books are next to the laptop.",
                    sampleTranslation: "Máy tính của tôi ở trên bàn. Sách của tôi ở cạnh máy tính.",
                    guideTips: "Gợi ý: Dùng giới từ 'on' và 'next to'.\n\n* 5 CHỦ ĐỀ LUYỆN NÓI THÊM:\n1. Describe the layout of your classroom.\n2. Talk about where you store teaching files.\n3. Describe the objects on your teacher's desk.\n4. Explain how students sit in your classroom.\n5. Describe the notice board on the wall."
                },
                writing: {
                    prompt: "Write 3 sentences to describe where the teaching tools are in your classroom.",
                    promptTranslation: "Viết 3 câu để mô tả vị trí của các công cụ giảng dạy trong lớp học của Thầy/Cô.",
                    suggestedVocab: "projector (máy chiếu), wall (tường), box (hộp), marker (bút viết bảng).\n\n* 5 ĐỀ BÀI LUYỆN VIẾT THÊM:\n1. Write 3 sentences describing your ideal classroom.\n2. Write 3 sentences about where the printer is in the staffroom.\n3. Write 3 sentences about a student's pencil case.\n4. Write 3 sentences about the school library layout.\n5. Write 3 sentences about where teaching maps are hung.",
                    sampleAnswer: "The projector is on the wall. The markers are in a plastic box. The box is on the desk."
                }
            },
            {
                id: "a1_lesson_5",
                title: "Bài 5: Kế hoạch tuần tới của Giáo viên",
                description: "Học cách sử dụng Thì tương lai đơn với will và tương lai gần be going to để viết và nói về kế hoạch dạy học.",
                lectureText: "Chào Thầy Cô, sau đây là bài giảng về Cách diễn tả tương lai. Ta dùng will cộng động từ nguyên thể khi quyết định tức thì, ví dụ I will help you nghĩa là tôi sẽ giúp bạn. Ta dùng be going to khi đã có kế hoạch hoặc ý định từ trước, ví dụ I am going to buy a new book nghĩa là tôi dự định mua một cuốn sách mới.",
                theoryHtml: `
                    <div class="space-y-3">
                        <p class="text-xs text-slate-350"><strong class="text-white">Will:</strong> Quyết định nhất thời, lời hứa. <span class="italic text-emerald-450">(I will answer the phone.)</span></p>
                        <p class="text-xs text-slate-350"><strong class="text-white">Be going to (am/is/are going to + V):</strong> Kế hoạch có sẵn, dự định. <span class="italic text-emerald-450">(I am going to check the homework tonight.)</span></p>
                        <ul class="list-disc pl-4 text-[11px] text-slate-400">
                            <li>Dấu hiệu: tomorrow, next week, tonight.</li>
                        </ul>
                    </div>
                `,
                reading: {
                    passage: "Next week, Sunshine school is going to hold a sports day. I am going to organize a soccer match. I think the children will love it.",
                    passageTranslation: "Tuần tới, trường Sunshine dự kiến tổ chức một ngày hội thể thao. Tôi dự định tổ chức một trận bóng đá. Tôi nghĩ các con sẽ thích nó.",
                    questions: [
                        {
                            id: "a1_l5_r1",
                            q: "What is the school going to do next week?",
                            qTranslation: "Trường dự kiến làm gì vào tuần tới?",
                            options: ["Hold a teachers' meeting", "Hold a sports day", "Build a new classroom"],
                            optionsTranslation: ["Họp giáo viên", "Tổ chức ngày hội thể thao", "Xây lớp học mới"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'school is going to hold a sports day'.",
                            studyTip: "Mẹo: Tìm cụm từ sau 'going to' trong câu đầu tiên."
                        },
                        {
                            id: "a1_l5_r2",
                            q: "What is the writer going to organize?",
                            qTranslation: "Người viết dự định tổ chức cái gì?",
                            options: ["A soccer match", "A basketball match", "A swimming competition"],
                            optionsTranslation: ["Một trận bóng đá", "Một trận bóng rổ", "Một cuộc thi bơi lội"],
                            correct: 0,
                            explanation: "Đoạn văn viết: 'I am going to organize a soccer match'.",
                            studyTip: "Mẹo: Từ 'soccer match' là trận đấu bóng đá."
                        },
                        {
                            id: "a1_l5_r3",
                            q: "Who will love the sports day?",
                            qTranslation: "Ai sẽ yêu thích ngày hội thể thao?",
                            options: ["The parents", "The teachers", "The children"],
                            optionsTranslation: ["Phụ huynh", "Giáo viên", "Trẻ em (học sinh)"],
                            correct: 2,
                            explanation: "Đoạn văn viết: 'I think the children will love it'.",
                            studyTip: "Mẹo: Tìm danh từ 'children' ở cuối câu cuối cùng."
                        },
                        {
                            id: "a1_l5_r4",
                            q: "When is the school going to hold the sports day?",
                            qTranslation: "Khi nào trường dự kiến tổ chức ngày hội thể thao?",
                            options: ["Tomorrow", "Next week", "Next month"],
                            optionsTranslation: ["Ngày mai", "Tuần tới", "Tháng tới"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'Next week, Sunshine school is going to...'..",
                            studyTip: "Mẹo: Chú ý cụm trạng ngữ chỉ thời gian 'Next week'."
                        },
                        {
                            id: "a1_l5_r5",
                            q: "Is the school going to hold a teachers' meeting next week?",
                            qTranslation: "Có phải trường định họp giáo viên tuần tới không?",
                            options: ["Yes, they are.", "No, they are going to hold a sports day.", "Yes, they will hold an exam."],
                            optionsTranslation: ["Có, đúng vậy.", "Không, họ định tổ chức hội thao.", "Có, họ sẽ tổ chức thi."],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'Sunshine school is going to hold a sports day'.",
                            studyTip: "Mẹo: Dựa trên thông tin phủ định thực tế để lựa chọn."
                        }
                    ]
                },
                listening: {
                    audioText: "I am going to visit an English center tomorrow morning. I think I will buy some picture books there.",
                    audioTranslation: "Tôi dự định đến thăm một trung tâm tiếng Anh vào sáng mai. Tôi nghĩ tôi sẽ mua một vài cuốn sách tranh ở đó.",
                    questions: [
                        {
                            id: "a1_l5_l1",
                            q: "What is the teacher planning to do tomorrow morning?",
                            qTranslation: "Giáo viên lên kế hoạch làm gì vào sáng mai?",
                            options: ["Go to the cinema", "Visit an English center", "Sleep late"],
                            optionsTranslation: ["Đi xem phim", "Đi thăm trung tâm tiếng Anh", "Ngủ nướng"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'going to visit an English center tomorrow morning'.",
                            studyTip: "Mẹo: Lắng nghe kế hoạch có cụm 'going to visit'."
                        },
                        {
                            id: "a1_l5_l2",
                            q: "When will the teacher visit the English center?",
                            qTranslation: "Khi nào giáo viên sẽ đến thăm trung tâm tiếng Anh?",
                            options: ["Tomorrow morning", "Tomorrow afternoon", "Tonight"],
                            optionsTranslation: ["Sáng mai", "Chiều mai", "Tối nay"],
                            correct: 0,
                            explanation: "Băng nghe nói: 'visit an English center tomorrow morning'.",
                            studyTip: "Mẹo: Lắng nghe trạng từ thời gian 'tomorrow morning'."
                        },
                        {
                            id: "a1_l5_l3",
                            q: "What does the teacher think she will buy?",
                            qTranslation: "Giáo viên nghĩ cô ấy sẽ mua cái gì?",
                            options: ["Some dictionaries", "Some picture books", "Some pens"],
                            optionsTranslation: ["Một số từ điển", "Một số sách tranh", "Một số bút viết"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'I think I will buy some picture books there'.",
                            studyTip: "Mẹo: Từ khóa nghe 'picture books'."
                        },
                        {
                            id: "a1_l5_l4",
                            q: "Where will the teacher buy picture books?",
                            qTranslation: "Giáo viên sẽ mua sách tranh ở đâu?",
                            options: ["At a bookstore", "At an English center", "At a supermarket"],
                            optionsTranslation: ["Tại hiệu sách", "Tại trung tâm tiếng Anh", "Tại siêu thị"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'visit an English center... buy some picture books there'.",
                            studyTip: "Mẹo: Từ 'there' (ở đó) thay thế cho 'English center'."
                        },
                        {
                            id: "a1_l5_l5",
                            q: "Will the teacher buy text books?",
                            qTranslation: "Giáo viên có mua sách giáo khoa không?",
                            options: ["No, she will buy picture books.", "Yes, she will buy textbooks.", "Not mentioned."],
                            optionsTranslation: ["Không, cô ấy sẽ mua sách tranh.", "Có, cô ấy sẽ mua sách giáo khoa.", "Không đề cập."],
                            correct: 0,
                            explanation: "Băng nghe nói: 'buy some picture books' (mua sách tranh).",
                            studyTip: "Mẹo: Phân biệt 'picture books' và 'text books'."
                        }
                    ]
                },
                speaking: {
                    prompt: "Talk about your plan for tonight. What are you going to do?",
                    promptTranslation: "Hãy nói về kế hoạch của Thầy/Cô tối nay. Thầy/Cô định làm gì?",
                    sampleAnswer: "Tonight, I am going to check my students' homework. Then, I will relax.",
                    sampleTranslation: "Tối nay, tôi dự định kiểm tra bài tập về nhà của học sinh. Sau đó, tôi sẽ thư giãn.",
                    guideTips: "Gợi ý: Dùng cấu trúc 'I am going to + V' để diễn tả kế hoạch có sẵn.\n\n* 5 CHỦ ĐỀ LUYỆN NÓI THÊM:\n1. Talk about your teaching plans for tomorrow.\n2. Talk about where you are going to go this weekend.\n3. Describe a school project you will start next month.\n4. Describe a lesson you are going to teach next Monday.\n5. Discuss how you are going to help weak students next semester."
                },
                writing: {
                    prompt: "Write 3 sentences about your plans for next Sunday.",
                    promptTranslation: "Viết 3 câu về các dự định của Thầy/Cô vào Chủ Nhật tới.",
                    suggestedVocab: "visit (thăm), parents (bố mẹ), cook (nấu ăn), rest (nghỉ ngơi).\n\n* 5 ĐỀ BÀI LUYỆN VIẾT THÊM:\n1. Write 3 sentences about what you will buy for your classroom next week.\n2. Write 3 sentences about a meeting you are going to attend tomorrow.\n3. Write 3 sentences about how you will decorate your class next year.\n4. Write 3 sentences about your lesson plans for tomorrow morning.\n5. Write 3 sentences about your plan to grade papers tonight.",
                    sampleAnswer: "Next Sunday, I am going to visit my parents. We are going to cook dinner together. I will rest in the evening."
                }
            }
        ]
    },
    // ==========================================
    // CẤP ĐỘ A2 (SƠ CẤP) - 5 BÀI HỌC
    // ==========================================
    A2: {
        lessons: [
            {
                id: "a2_lesson_1",
                title: "Bài 1: Sự kiện đáng nhớ tại trường",
                description: "Học cách sử dụng Thì quá khứ đơn với động từ thường và động từ bất quy tắc để kể lại một sự kiện đã xảy ra.",
                lectureText: "Chào Thầy Cô, sau đây là bài giảng về Thì Quá khứ đơn. Chúng ta dùng thì Quá khứ đơn để nói về hành động đã kết thúc trong quá khứ. Với động từ có quy tắc, ta thêm đuôi e d, ví dụ like thành liked. Với động từ bất quy tắc, ta lấy ở cột thứ hai của bảng động từ bất quy tắc, ví dụ go thành went, teach thành taught.",
                theoryHtml: `
                    <div class="space-y-3">
                        <p class="text-xs text-slate-350"><strong class="text-white">Động từ có quy tắc (Regular):</strong> V + ed <span class="italic text-emerald-450">(watched, talked)</span></p>
                        <p class="text-xs text-slate-350"><strong class="text-white">Động từ bất quy tắc (Irregular):</strong> Cột 2 bảng động từ <span class="italic text-emerald-450">(go -> went, write -> wrote, teach -> taught)</span></p>
                        <ul class="list-disc pl-4 text-[11px] text-slate-400">
                            <li>Dấu hiệu: yesterday, last week, ago, in 2025.</li>
                        </ul>
                    </div>
                `,
                reading: {
                    passage: "Last year, I taught English at a rural school. The students wrote beautiful thank-you letters to me on Teacher's Day. I felt extremely happy.",
                    passageTranslation: "Năm ngoái, tôi đã dạy tiếng Anh tại một ngôi trường nông thôn. Học sinh đã viết những lá thư cảm ơn rất đẹp cho tôi nhân ngày Nhà giáo. Tôi đã cảm thấy vô cùng hạnh phúc.",
                    questions: [
                        {
                            id: "a2_l1_r1",
                            q: "What did the students write to the teacher last year?",
                            qTranslation: "Học sinh đã viết gì cho giáo viên năm ngoái?",
                            options: ["They wrote exam papers.", "They wrote beautiful thank-you letters.", "They wrote stories."],
                            optionsTranslation: ["Chúng viết bài thi.", "Chúng viết thư cảm ơn rất đẹp.", "Chúng viết truyện."],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'The students wrote beautiful thank-you letters'.",
                            studyTip: "Mẹo: Từ 'wrote' là quá khứ của 'write'."
                        },
                        {
                            id: "a2_l1_r2",
                            q: "Where did the writer teach English last year?",
                            qTranslation: "Người viết đã dạy tiếng Anh ở đâu vào năm ngoái?",
                            options: ["At an urban school", "At a rural school", "At an international center"],
                            optionsTranslation: ["Tại một ngôi trường thành thị", "Tại một ngôi trường nông thôn", "Tại một trung tâm quốc tế"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'I taught English at a rural school' (Tôi đã dạy tiếng Anh ở một trường nông thôn).",
                            studyTip: "Mẹo: Từ 'rural' có nghĩa là nông thôn, trái nghĩa với 'urban'."
                        },
                        {
                            id: "a2_l1_r3",
                            q: "How did the teacher feel after receiving the letters?",
                            qTranslation: "Giáo viên cảm thấy thế nào sau khi nhận được những lá thư?",
                            options: ["Extremely happy", "Quite sad", "A bit tired"],
                            optionsTranslation: ["Vô cùng hạnh phúc", "Khá buồn", "Hơi mệt mỏi"],
                            correct: 0,
                            explanation: "Đoạn văn viết: 'I felt extremely happy' (Tôi đã cảm thấy vô cùng hạnh phúc).",
                            studyTip: "Mẹo: Từ 'extremely happy' chỉ trạng thái cảm xúc cực kỳ vui vẻ."
                        },
                        {
                            id: "a2_l1_r4",
                            q: "When did the writer teach at a rural school?",
                            qTranslation: "Người viết đã dạy ở trường nông thôn khi nào?",
                            options: ["Last year", "Last month", "Two years ago"],
                            optionsTranslation: ["Năm ngoái", "Tháng trước", "Hai năm trước"],
                            correct: 0,
                            explanation: "Đoạn văn viết: 'Last year, I taught English...' (Năm ngoái, tôi đã dạy tiếng Anh...).",
                            studyTip: "Mẹo: Chú ý trạng từ chỉ thời gian ở đầu câu 'Last year'."
                        },
                        {
                            id: "a2_l1_r5",
                            q: "On what event did the students write letters to the teacher?",
                            qTranslation: "Vào sự kiện nào học sinh đã viết thư cho giáo viên?",
                            options: ["On Christmas", "On Teacher's Day", "On New Year"],
                            optionsTranslation: ["Vào Giáng sinh", "Vào ngày Nhà giáo", "Vào Năm mới"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'thank-you letters to me on Teacher's Day' (thư cảm ơn gửi tôi nhân ngày Nhà giáo).",
                            studyTip: "Mẹo: Từ khóa 'Teacher's Day' chỉ ngày Nhà giáo."
                        }
                    ]
                },
                listening: {
                    audioText: "Yesterday, my school organized a big music festival. Many classes performed traditional dances. We enjoyed the food very much.",
                    audioTranslation: "Hôm qua, trường tôi đã tổ chức một lễ hội âm nhạc lớn. Nhiều lớp đã trình diễn các điệu múa truyền thống. Chúng tôi đã thích đồ ăn ở đó rất nhiều.",
                    questions: [
                        {
                            id: "a2_l1_l1",
                            q: "What did the school organize yesterday?",
                            qTranslation: "Trường học đã tổ chức cái gì vào ngày hôm qua?",
                            options: ["A meeting", "A big music festival", "A sports event"],
                            optionsTranslation: ["Cuộc họp", "Lễ hội âm nhạc lớn", "Sự kiện thể thao"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'school organized a big music festival'.",
                            studyTip: "Mẹo: Từ khóa nghe 'music festival'."
                        },
                        {
                            id: "a2_l1_l2",
                            q: "What did many classes perform?",
                            qTranslation: "Nhiều lớp học đã biểu diễn cái gì?",
                            options: ["Modern hiphop dances", "Traditional dances", "English plays"],
                            optionsTranslation: ["Các điệu nhảy hiphop hiện đại", "Các điệu múa truyền thống", "Các vở kịch tiếng Anh"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'Many classes performed traditional dances' (Nhiều lớp đã trình diễn các điệu múa truyền thống).",
                            studyTip: "Mẹo: Chú ý nghe cụm từ 'traditional dances'."
                        },
                        {
                            id: "a2_l1_l3",
                            q: "What did they enjoy very much?",
                            qTranslation: "Họ đã rất thích cái gì?",
                            options: ["The decorations", "The music", "The food"],
                            optionsTranslation: ["Đồ trang trí", "Âm nhạc", "Đồ ăn"],
                            correct: 2,
                            explanation: "Băng nghe nói: 'We enjoyed the food very much' (Chúng tôi đã thích đồ ăn ở đó rất nhiều).",
                            studyTip: "Mẹo: Lắng nghe từ khóa cuối cùng 'food'."
                        },
                        {
                            id: "a2_l1_l4",
                            q: "What did many classes perform yesterday?",
                            qTranslation: "Nhiều lớp học đã biểu diễn cái gì hôm qua?",
                            options: ["Traditional dances", "English plays", "Pop songs"],
                            optionsTranslation: ["Múa truyền thống", "Kịch tiếng Anh", "Nhạc trẻ"],
                            correct: 0,
                            explanation: "Băng nghe nói: 'Many classes performed traditional dances' (Nhiều lớp đã trình diễn các điệu múa truyền thống).",
                            studyTip: "Mẹo: Nghe động từ 'performed' kết hợp danh từ 'dances'."
                        },
                        {
                            id: "a2_l1_l5",
                            q: "How was the food at the festival?",
                            qTranslation: "Đồ ăn ở lễ hội như thế nào?",
                            options: ["It was bad", "It was expensive", "It was very enjoyable"],
                            optionsTranslation: ["Nó tệ", "Nó đắt đỏ", "Nó rất tuyệt (thích thú)"],
                            correct: 2,
                            explanation: "Băng nghe nói: 'We enjoyed the food very much' (Chúng tôi đã thích đồ ăn ở đó rất nhiều).",
                            studyTip: "Mẹo: Từ 'enjoy' tương đồng với cảm giác ngon miệng/thích thú."
                        }
                    ]
                },
                speaking: {
                    prompt: "Tell the coach about a happy event that happened at your school last month.",
                    promptTranslation: "Kể với HLV về một sự kiện vui vẻ đã xảy ra ở trường của Thầy/Cô vào tháng trước.",
                    sampleAnswer: "Last month, my school celebrated a sports festival. We won a soccer match.",
                    sampleTranslation: "Tháng trước, trường tôi đã ăn mừng một lễ hội thể thao. Chúng tôi đã thắng một trận bóng đá.",
                    guideTips: "Gợi ý: Hãy dùng các động từ ở quá khứ như 'celebrated', 'won'.\n\n* 5 CHỦ ĐỀ LUYỆN NÓI THÊM:\n1. Describe a teachers' meeting you attended yesterday.\n2. Talk about a special performance on Teacher's Day.\n3. Detail a science fair held at your school last semester.\n4. Share about a charity campaign organized by your students.\n5. Describe a student field trip that you supervised."
                },
                writing: {
                    prompt: "Write a short paragraph (50 words) about a lesson you taught last week.",
                    promptTranslation: "Viết một đoạn văn ngắn (50 từ) về một tiết học Thầy/Cô đã dạy vào tuần trước.",
                    suggestedVocab: "teach (dạy), students (học sinh), interested (hào hứng), teach -> taught.\n\n* 5 ĐỀ BÀI LUYỆN VIẾT THÊM:\n1. Write 3 sentences about a school event you organized last year.\n2. Write a paragraph describing a difficult class you managed last Monday.\n3. Write 50 words about a meeting with a parent last week.\n4. Write a brief note about a sports competition held at school.\n5. Describe a drawing competition that took place in your classroom.",
                    sampleAnswer: "Last Monday, I taught a lesson about animals. My students were very interested. They played games and learned new words quickly."
                }
            },
            {
                id: "a2_lesson_2",
                title: "Bài 2: Tình huống bất ngờ trong giờ học",
                description: "Học cách phối hợp Quá khứ đơn (Past Simple) và Quá khứ tiếp diễn (Past Continuous) khi diễn tả hành động đang xảy ra thì bị xen ngang.",
                lectureText: "Chào Thầy Cô, sau đây là bài giảng về việc phối hợp giữa Thì Quá khứ đơn và Quá khứ tiếp diễn. Trong quá khứ, khi một hành động dài đang xảy ra thì có một hành động ngắn khác xen ngang. Hành động đang xảy ra kéo dài ta dùng Quá khứ tiếp diễn, với công thức was hoặc were cộng động từ đuôi ing. Hành động xen ngang ngắn hơn ta dùng Quá khứ đơn.",
                theoryHtml: `
                    <div class="space-y-3">
                        <p class="text-xs text-slate-350"><strong class="text-white">Was/Were + V-ing:</strong> Hành động đang diễn ra kéo dài. <span class="italic text-emerald-450">(I was typing my lesson plan.)</span></p>
                        <p class="text-xs text-slate-350"><strong class="text-white">V2/ed:</strong> Hành động ngắn chen ngang. <span class="italic text-emerald-450">(The laptop went off.)</span></p>
                        <p class="text-[11px] text-slate-400">Đứng sau <strong class="text-teal-450">While</strong> thường là Quá khứ tiếp diễn; sau <strong class="text-teal-450">When</strong> thường là Quá khứ đơn.</p>
                    </div>
                `,
                reading: {
                    passage: "Yesterday, while the teacher was explaining a difficult English rule, the electricity went off. All the lights in the classroom stopped working.",
                    passageTranslation: "Hôm qua, trong khi giáo viên đang giải thích một quy tắc tiếng Anh khó, điện bỗng nhiên bị tắt. Tất cả đèn trong lớp học ngừng hoạt động.",
                    questions: [
                        {
                            id: "a2_l2_r1",
                            q: "What was the teacher doing when the electricity went off?",
                            qTranslation: "Giáo viên đang làm gì khi điện bị tắt?",
                            options: ["Typing on the computer", "Explaining a difficult English rule", "Eating lunch"],
                            optionsTranslation: ["Gõ máy tính", "Giải thích quy tắc tiếng Anh khó", "Ăn trưa"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'while the teacher was explaining a difficult English rule, the electricity went off'.",
                            studyTip: "Mẹo: Hành động 'was explaining' là hành động đang diễn ra tại thời điểm mất điện."
                        },
                        {
                            id: "a2_l2_r2",
                            q: "What was the teacher explaining when the electricity went off?",
                            qTranslation: "Giáo viên đang giải thích cái gì khi điện bị tắt?",
                            options: ["A difficult English rule", "A short history story", "An science experiment"],
                            optionsTranslation: ["Một quy tắc tiếng Anh khó", "Một câu chuyện lịch sử ngắn", "Một thí nghiệm khoa học"],
                            correct: 0,
                            explanation: "Đoạn văn viết: 'explaining a difficult English rule'.",
                            studyTip: "Mẹo: Tìm từ khóa 'explaining' và cụm từ theo sau."
                        },
                        {
                            id: "a2_l2_r3",
                            q: "When did the electricity go off?",
                            qTranslation: "Điện bị tắt khi nào?",
                            options: ["Last week", "Yesterday", "This morning"],
                            optionsTranslation: ["Tuần trước", "Hôm qua", "Sáng nay"],
                            correct: 1,
                            explanation: "Đoạn văn ghi 'Yesterday, while the teacher...'..",
                            studyTip: "Mẹo: Từ khóa thời gian 'Yesterday'."
                        },
                        {
                            id: "a2_l2_r4",
                            q: "What happened to the lights in the classroom?",
                            qTranslation: "Điều gì đã xảy ra với những chiếc đèn trong lớp?",
                            options: ["They became brighter.", "They stopped working.", "They fell off the ceiling."],
                            optionsTranslation: ["Chúng sáng hơn.", "Chúng ngừng hoạt động.", "Chúng rơi từ trần nhà xuống."],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'All the lights in the classroom stopped working'.",
                            studyTip: "Mẹo: Cụm 'stopped working' đồng nghĩa với hỏng, tắt điện."
                        },
                        {
                            id: "a2_l2_r5",
                            q: "How was the English rule described?",
                            qTranslation: "Quy tắc tiếng Anh được miêu tả thế nào?",
                            options: ["Easy", "Difficult", "Interesting"],
                            optionsTranslation: ["Dễ", "Khó (difficult)", "Thú vị"],
                            correct: 1,
                            explanation: "Đoạn văn ghi: 'explaining a difficult English rule'.",
                            studyTip: "Mẹo: Chú ý tính từ đứng trước danh từ 'English rule'."
                        }
                    ]
                },
                listening: {
                    audioText: "I was writing some vocabulary on the whiteboard when my phone rang. I stopped my lesson to answer it.",
                    audioTranslation: "Tôi đang viết một vài từ vựng lên bảng trắng thì điện thoại đổ chuông. Tôi đã tạm dừng bài dạy để nghe máy.",
                    questions: [
                        {
                            id: "a2_l2_l1",
                            q: "What interrupted the teacher's writing lesson?",
                            qTranslation: "Cái gì đã làm gián đoạn tiết viết của giáo viên?",
                            options: ["A student entered the room.", "The phone rang.", "The projector turned off."],
                            optionsTranslation: ["Một học sinh bước vào.", "Điện thoại reo.", "Máy chiếu bị tắt."],
                            correct: 1,
                            explanation: "Băng nghe nói: 'when my phone rang'.",
                            studyTip: "Mẹo: Từ khóa nghe 'phone rang' (điện thoại đổ chuông)."
                        },
                        {
                            id: "a2_l2_l2",
                            q: "What was the teacher doing when the phone rang?",
                            qTranslation: "Giáo viên đang làm gì khi điện thoại reo?",
                            options: ["Reading a book", "Writing some vocabulary on the whiteboard", "Grading papers"],
                            optionsTranslation: ["Đọc một cuốn sách", "Viết một vài từ vựng lên bảng trắng", "Chấm bài"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'I was writing some vocabulary on the whiteboard when my phone rang'.",
                            studyTip: "Mẹo: Lắng nghe hành động tiếp diễn 'was writing'."
                        },
                        {
                            id: "a2_l2_l3",
                            q: "What did the teacher do after the phone rang?",
                            qTranslation: "Giáo viên đã làm gì sau khi điện thoại reo?",
                            options: ["Ignored the phone", "Stopped the lesson to answer it", "Walked out of the class"],
                            optionsTranslation: ["Lờ điện thoại đi", "Dừng bài học để nghe máy", "Bước ra ngoài lớp học"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'I stopped my lesson to answer it'.",
                            studyTip: "Mẹo: Nghe cụm từ 'stopped my lesson to answer it'."
                        },
                        {
                            id: "a2_l2_l4",
                            q: "Where was the teacher writing the vocabulary?",
                            qTranslation: "Giáo viên đã viết từ vựng ở đâu?",
                            options: ["On a piece of paper", "On the whiteboard", "On the laptop screen"],
                            optionsTranslation: ["Trên một mảnh giấy", "Trên bảng trắng", "Trên màn hình laptop"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'writing some vocabulary on the whiteboard'.",
                            studyTip: "Mẹo: Từ khóa địa điểm 'on the whiteboard'."
                        },
                        {
                            id: "a2_l2_l5",
                            q: "Whose phone rang?",
                            qTranslation: "Điện thoại của ai đã reo?",
                            options: ["A student's phone", "The teacher's phone", "The principal's phone"],
                            optionsTranslation: ["Điện thoại của học sinh", "Điện thoại của giáo viên", "Điện thoại của hiệu trưởng"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'when my phone rang' (khi điện thoại của tôi reo).",
                            studyTip: "Mẹo: Từ 'my' chỉ sở hữu của người nói (giáo viên)."
                        }
                    ]
                },
                speaking: {
                    prompt: "Describe what you were doing at 9 AM yesterday. Did something unexpected happen?",
                    promptTranslation: "Mô tả việc Thầy/Cô đang làm lúc 9 giờ sáng hôm qua. Có việc gì bất ngờ xảy ra không?",
                    sampleAnswer: "Yesterday at 9 AM, I was teaching class 5B when the principal came in.",
                    sampleTranslation: "Sáng qua lúc 9 giờ, tôi đang dạy lớp 5B thì hiệu trưởng bước vào.",
                    guideTips: "Gợi ý: Phối hợp 'I was + V-ing' và mệnh đề sau 'when' ở quá khứ đơn.\n\n* 5 CHỦ ĐỀ LUYỆN NÓI THÊM:\n1. Talk about a time when a student interrupted your lesson.\n2. Describe an unexpected power cut during class.\n3. Describe what you were doing when a parent visited your classroom.\n4. Describe a funny incident that happened during a school assembly.\n5. Talk about how you handled a student sleeping in your class."
                },
                writing: {
                    prompt: "Write a short email (50-60 words) to your principal reporting that the internet disconnected while you were giving an online test.",
                    promptTranslation: "Viết một email ngắn (50-60 từ) gửi hiệu trưởng báo cáo việc mạng internet bị ngắt kết nối trong khi Thầy/Cô đang cho làm bài test online.",
                    suggestedVocab: "disconnect (bị ngắt kết nối), happen (xảy ra), online test (kiểm tra trực tuyến), while.\n\n* 5 ĐỀ BÀI LUYỆN VIẾT THÊM:\n1. Write 3 sentences about a student dropping their pencil case during a test.\n2. Write a short paragraph about a rainstorm that started during class.\n3. Write 3 sentences about what you were doing when the principal walked in.\n4. Write 3 sentences about a funny bird flying into the classroom.\n5. Write 3 sentences about a computer crash during an IT lesson.",
                    sampleAnswer: "Dear Principal, I am writing to report an issue. This morning, while my students were taking an online test, the internet disconnected. I had to stop the exam. Please help us check the network."
                }
            },
            {
                id: "a2_lesson_3",
                title: "Bài 3: Kinh nghiệm giảng dạy của bản thân",
                description: "Học cách sử dụng Thì hiện tại hoàn thành để nói về các kinh nghiệm và sự việc đã xảy ra không có thời gian xác định.",
                lectureText: "Chào Thầy Cô, sau đây là bài giảng về Thì Hiện tại hoàn thành. Thì này dùng để diễn tả kinh nghiệm của bản thân. Công thức là have hoặc has cộng động từ ở cột 3 hoặc thêm đuôi e d. Ta dùng have với chủ ngữ số nhiều, has với chủ ngữ số ít. Ví dụ, I have taught English for five years nghĩa là tôi đã dạy tiếng anh được 5 năm.",
                theoryHtml: `
                    <div class="space-y-3">
                        <p class="text-xs text-slate-350"><strong class="text-white">Công thức:</strong> S + have/has + V3/ed</p>
                        <ul class="list-disc pl-4 text-[11px] text-slate-400">
                            <li>I/We/You/They + have</li>
                            <li>He/She/It + has</li>
                            <li>V3/ed: Tra cột 3 bảng động từ bất quy tắc <span class="italic text-emerald-450">(see -> seen, go -> gone, write -> written)</span>.</li>
                            <li>Dùng để nói về trải nghiệm hoặc hành động bắt đầu trong quá khứ kéo dài đến hiện tại.</li>
                        </ul>
                    </div>
                `,
                reading: {
                    passage: "Ms. Hoa is an experienced educator. She has worked at this secondary school since 2020. She has attended three professional training courses.",
                    passageTranslation: "Cô Hoa là một nhà giáo dục giàu kinh nghiệm. Cô ấy đã làm việc tại trường THCS này từ năm 2020. Cô ấy đã tham dự ba khóa đào tạo chuyên môn.",
                    questions: [
                        {
                            id: "a2_l3_r1",
                            q: "How many training courses has Ms. Hoa attended?",
                            qTranslation: "Cô Hoa đã tham dự bao nhiêu khóa đào tạo?",
                            options: ["Two courses", "Three courses", "Four courses"],
                            optionsTranslation: ["Hai khóa", "Ba khóa", "Bốn khóa"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'She has attended three professional training courses'.",
                            studyTip: "Mẹo: Từ 'attended' ở đây đi với số đếm 'three'."
                        },
                        {
                            id: "a2_l3_r2",
                            q: "What kind of school does Ms. Hoa work at?",
                            qTranslation: "Cô Hoa làm việc ở loại trường học nào?",
                            options: ["A primary school", "A secondary school", "A high school"],
                            optionsTranslation: ["Trường tiểu học", "Trường THCS (cấp 2)", "Trường THPT (cấp 3)"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'She has worked at this secondary school since 2020'.",
                            studyTip: "Mẹo: Từ 'secondary school' nghĩa là trường trung học cơ sở."
                        },
                        {
                            id: "a2_l3_r3",
                            q: "Since when has she worked at this secondary school?",
                            qTranslation: "Cô Hoa làm việc ở trường trung học cơ sở này từ khi nào?",
                            options: ["Since 2018", "Since 2020", "Since 2022"],
                            optionsTranslation: ["Từ năm 2018", "Từ năm 2020", "Từ năm 2022"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'since 2020'.",
                            studyTip: "Mẹo: Tìm mốc năm đứng sau giới từ 'since'."
                        },
                        {
                            id: "a2_l3_r4",
                            q: "How is Ms. Hoa described in the text?",
                            qTranslation: "Cô Hoa được miêu tả thế nào trong đoạn văn?",
                            options: ["A new teacher", "An experienced educator", "A strict principal"],
                            optionsTranslation: ["Một giáo viên mới", "Nhà giáo dục giàu kinh nghiệm", "Hiệu trưởng nghiêm khắc"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'Ms. Hoa is an experienced educator'.",
                            studyTip: "Mẹo: Cụm 'experienced educator' nghĩa là nhà giáo dục giàu kinh nghiệm."
                        },
                        {
                            id: "a2_l3_r5",
                            q: "What has she attended since 2020?",
                            qTranslation: "Cô Hoa đã tham gia những cái gì kể từ năm 2020?",
                            options: ["Three professional training courses", "Three school sports days", "Three parent meetings"],
                            optionsTranslation: ["3 khóa đào tạo chuyên môn", "3 ngày hội thể thao trường", "3 cuộc họp phụ huynh"],
                            correct: 0,
                            explanation: "Đoạn văn viết: 'She has attended three professional training courses'.",
                            studyTip: "Mẹo: Tìm cụm danh từ ở cuối câu thứ ba."
                        }
                    ]
                },
                listening: {
                    audioText: "I have taught English at this school for ten years, but I have never worked in an online classroom. It is a new experience for me.",
                    audioTranslation: "Tôi đã dạy tiếng Anh ở trường này được 10 năm, nhưng tôi chưa bao giờ làm việc trong một lớp học trực tuyến. Đó là một trải nghiệm mới đối với tôi.",
                    questions: [
                        {
                            id: "a2_l3_l1",
                            q: "Has the teacher ever worked in an online classroom?",
                            qTranslation: "Giáo viên đã từng làm việc trong một lớp học trực tuyến chưa?",
                            options: ["Yes, she has.", "No, she has never worked online.", "Yes, she works online every day."],
                            optionsTranslation: ["Có, cô ấy đã từng.", "Chưa, cô ấy chưa bao giờ dạy online.", "Có, cô ấy dạy online mỗi ngày."],
                            correct: 1,
                            explanation: "Băng nghe nói: 'I have never worked in an online classroom'.",
                            studyTip: "Mẹo: Chú ý từ khóa 'never' (chưa bao giờ)."
                        },
                        {
                            id: "a2_l3_l2",
                            q: "How long has the teacher taught English at the school?",
                            qTranslation: "Giáo viên đã dạy tiếng Anh tại trường này được bao lâu?",
                            options: ["Five years", "Ten years", "Fifteen years"],
                            optionsTranslation: ["5 năm", "10 năm", "15 năm"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'I have taught English at this school for ten years'.",
                            studyTip: "Mẹo: Nghe cụm 'for ten years' (10 năm)."
                        },
                        {
                            id: "a2_l3_l3",
                            q: "How does she feel about working in an online classroom?",
                            qTranslation: "Cô ấy cảm thấy thế nào về việc làm việc trong lớp học trực tuyến?",
                            options: ["It is boring.", "It is a new experience for her.", "It is very easy."],
                            optionsTranslation: ["Nó thật tẻ nhạt.", "Đó là một trải nghiệm mới đối với cô ấy.", "Nó rất dễ."],
                            correct: 1,
                            explanation: "Băng nghe nói: 'It is a new experience for me'.",
                            studyTip: "Mẹo: Nghe từ khóa 'new experience'."
                        },
                        {
                            id: "a2_l3_l4",
                            q: "What language does the teacher teach?",
                            qTranslation: "Giáo viên dạy ngôn ngữ nào?",
                            options: ["French", "English", "Japanese"],
                            optionsTranslation: ["Tiếng Pháp", "Tiếng Anh", "Tiếng Nhật"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'I have taught English'.",
                            studyTip: "Mẹo: Nghe tên môn học 'English'."
                        },
                        {
                            id: "a2_l3_l5",
                            q: "Has she ever worked in an online classroom before?",
                            qTranslation: "Trước đây cô ấy đã từng làm việc trong lớp học trực tuyến chưa?",
                            options: ["Yes, once.", "No, never.", "Yes, many times."],
                            optionsTranslation: ["Rồi, một lần.", "Chưa, chưa bao giờ.", "Rồi, nhiều lần."],
                            correct: 1,
                            explanation: "Băng nghe nói: 'but I have never worked in an online classroom'.",
                            studyTip: "Mẹo: Phân biệt 'never' (chưa bao giờ) và 'ever' (đã từng)."
                        }
                    ]
                },
                speaking: {
                    prompt: "Tell the coach about your teaching experience. How long have you worked as a teacher?",
                    promptTranslation: "Hãy kể với HLV về kinh nghiệm giảng dạy của Thầy/Cô. Thầy/Cô đã làm giáo viên được bao lâu rồi?",
                    sampleAnswer: "I have worked as a teacher for eight years. I have taught at Sunshine school since 2018.",
                    sampleTranslation: "Tôi đã làm giáo viên được tám năm. Tôi đã dạy ở trường Sunshine từ năm 2018.",
                    guideTips: "Gợi ý: Dùng thì hiện tại hoàn thành với 'for + khoảng thời gian' hoặc 'since + mốc thời gian'.\n\n* 5 CHỦ ĐỀ LUYỆN NÓI THÊM:\n1. Talk about a student who is excellent in your class.\n2. Discuss a student who needs to improve their reading skills.\n3. Talk about how you encourage students who get bad marks.\n4. Describe how you discuss academic results with parents.\n5. Discuss how you manage student behavior reports."
                },
                writing: {
                    prompt: "Write a short paragraph (50-60 words) describing the professional courses you have completed recently.",
                    promptTranslation: "Viết một đoạn văn ngắn (50-60 từ) mô tả các khóa học chuyên môn mà Thầy/Cô đã hoàn thành gần đây.",
                    suggestedVocab: "completed (đã hoàn thành), training course (khóa tập huấn), technology (công nghệ).\n\n* 5 ĐỀ BÀI LUYỆN VIẾT THÊM:\n1. Write a short academic comment for a student who works hard.\n2. Write 3 sentences recommending resources for a slow reader.\n3. Write 3 sentences encouraging a student after a failed test.\n4. Write a brief report to a parent about their child's classroom participation.\n5. Write 3 sentences about a student's handwriting improvement.",
                    sampleAnswer: "Recently, I have completed a new training course about technology in education. I have learned how to use online quizzes. It has changed my teaching methods."
                }
            },
            {
                id: "a2_lesson_4",
                title: "Bài 4: Lựa chọn phương pháp giảng dạy",
                description: "Học cách sử dụng cấu trúc So sánh hơn và So sánh nhất để phân tích và lựa chọn các phương pháp giảng dạy.",
                lectureText: "Chào Thầy Cô, sau đây là bài giảng về Cấu trúc So sánh. Với tính từ ngắn như cheap hay big, ta thêm đuôi e r trong so sánh hơn, ví dụ cheaper. Trong so sánh nhất ta thêm đuôi e s t, ví dụ cheapest. Với tính từ dài như expensive hay effective, ta dùng more trong so sánh hơn, ví dụ more effective. Trong so sánh nhất ta dùng the most, ví dụ the most effective.",
                theoryHtml: `
                    <div class="space-y-3">
                        <p class="text-xs text-slate-350"><strong class="text-white">So sánh hơn (Comparative):</strong><br>
                        • Tính từ ngắn: Adj + er + than <span class="italic text-emerald-450">(bigger than)</span><br>
                        • Tính từ dài: more + Adj + than <span class="italic text-emerald-450">(more effective than)</span></p>
                        <p class="text-xs text-slate-350"><strong class="text-white">So sánh nhất (Superlative):</strong><br>
                        • Tính từ ngắn: the + Adj + est <span class="italic text-emerald-450">(the biggest)</span><br>
                        • Tính từ dài: the most + Adj <span class="italic text-emerald-450">(the most interesting)</span></p>
                    </div>
                `,
                reading: {
                    passage: "Interactive games are more interesting than grammar lectures. For many young learners, games are the most effective way to memorize new vocabulary.",
                    passageTranslation: "Trò chơi tương tác thú vị hơn các bài giảng ngữ pháp. Đối với nhiều người học nhỏ tuổi, trò chơi là cách hiệu quả nhất để ghi nhớ từ vựng mới.",
                    questions: [
                        {
                            id: "a2_l4_r1",
                            q: "According to the text, which is the most effective way for young learners to memorize vocabulary?",
                            qTranslation: "Theo đoạn văn, đâu là cách hiệu quả nhất để người học nhỏ tuổi ghi nhớ từ vựng?",
                            options: ["Grammar lectures", "Interactive games", "Reading books alone"],
                            optionsTranslation: ["Bài giảng ngữ pháp", "Trò chơi tương tác", "Đọc sách một mình"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'games are the most effective way to memorize new vocabulary'.",
                            studyTip: "Mẹo: Tìm cụm từ 'most effective way' trong đoạn văn."
                        },
                        {
                            id: "a2_l4_r2",
                            q: "Which method is more interesting than grammar lectures?",
                            qTranslation: "Phương pháp nào thú vị hơn bài giảng ngữ pháp?",
                            options: ["Reading books", "Interactive games", "Writing essays"],
                            optionsTranslation: ["Đọc sách", "Trò chơi tương tác", "Viết bài luận"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'Interactive games are more interesting than grammar lectures'.",
                            studyTip: "Mẹo: So sánh hơn 'more interesting' đi cùng chủ ngữ 'Interactive games'."
                        },
                        {
                            id: "a2_l4_r3",
                            q: "Why are interactive games effective for young learners?",
                            qTranslation: "Tại sao trò chơi tương tác lại hiệu quả với người học nhỏ tuổi?",
                            options: ["To have fun", "To memorize new vocabulary", "To clean the class"],
                            optionsTranslation: ["Để giải trí", "Để ghi nhớ từ vựng mới", "Để dọn dẹp lớp học"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'games are the most effective way to memorize new vocabulary'.",
                            studyTip: "Mẹo: Chú ý động từ 'to memorize new vocabulary' (để ghi nhớ từ vựng mới)."
                        },
                        {
                            id: "a2_l4_r4",
                            q: "What kind of lectures are less interesting than interactive games?",
                            qTranslation: "Bài giảng nào ít thú vị hơn trò chơi tương tác?",
                            options: ["Science lectures", "Grammar lectures", "History lectures"],
                            optionsTranslation: ["Bài giảng khoa học", "Bài giảng ngữ pháp", "Bài giảng lịch sử"],
                            correct: 1,
                            explanation: "Đoạn văn ghi: 'Interactive games are more interesting than grammar lectures'.",
                            studyTip: "Mẹo: Từ khóa 'grammar lectures'."
                        },
                        {
                            id: "a2_l4_r5",
                            q: "Are games ineffective for memorizing vocabulary?",
                            qTranslation: "Trò chơi có phải không hiệu quả để nhớ từ vựng không?",
                            options: ["Yes, they are ineffective.", "No, they are the most effective way.", "Not mentioned."],
                            optionsTranslation: ["Có, chúng không hiệu quả.", "Không, chúng là cách hiệu quả nhất.", "Không đề cập."],
                            correct: 1,
                            explanation: "Đoạn văn khẳng định games 'the most effective way'.",
                            studyTip: "Mẹo: 'Most effective' là hiệu quả nhất."
                        }
                    ]
                },
                listening: {
                    audioText: "Online teaching is more convenient than offline teaching because teachers do not travel, but classroom management is much harder.",
                    audioTranslation: "Dạy học trực tuyến thuận tiện hơn dạy học trực tiếp vì giáo viên không phải di chuyển, nhưng quản lý lớp học thì khó hơn nhiều.",
                    questions: [
                        {
                            id: "a2_l4_l1",
                            q: "Why is online teaching more convenient?",
                            qTranslation: "Tại sao dạy học trực tuyến lại thuận tiện hơn?",
                            options: ["Because classroom management is easier.", "Because teachers do not have to travel.", "Because students learn faster."],
                            optionsTranslation: ["Vì quản lý lớp dễ hơn.", "Vì giáo viên không phải di chuyển.", "Vì học sinh học nhanh hơn."],
                            correct: 1,
                            explanation: "Băng nghe nói: 'more convenient... because teachers do not travel'.",
                            studyTip: "Mẹo: Chú ý từ nối 'because' giải thích lý do."
                        },
                        {
                            id: "a2_l4_l2",
                            q: "What is a disadvantage of online teaching mentioned?",
                            qTranslation: "Nhược điểm của dạy học online được nhắc tới là gì?",
                            options: ["Teachers have to travel a lot.", "Classroom management is much harder.", "Students don't have internet."],
                            optionsTranslation: ["Giáo viên phải di chuyển nhiều.", "Quản lý lớp học khó hơn nhiều.", "Học sinh không có internet."],
                            correct: 1,
                            explanation: "Băng nghe nói: 'but classroom management is much harder'.",
                            studyTip: "Mẹo: Cụm từ sau 'but' chỉ nhược điểm 'classroom management is much harder'."
                        },
                        {
                            id: "a2_l4_l3",
                            q: "Do online teachers have to travel?",
                            qTranslation: "Giáo viên dạy online có phải di chuyển không?",
                            options: ["Yes, they travel a lot.", "No, they do not travel.", "They only travel on weekends."],
                            optionsTranslation: ["Có, họ di chuyển nhiều.", "Không, họ không phải di chuyển.", "Họ chỉ di chuyển cuối tuần."],
                            correct: 1,
                            explanation: "Băng nghe nói: 'because teachers do not travel'.",
                            studyTip: "Mẹo: Nghe cụm 'do not travel'."
                        },
                        {
                            id: "a2_l4_l4",
                            q: "Which type of teaching is described as more convenient?",
                            qTranslation: "Hình thức dạy học nào được miêu tả là thuận tiện hơn?",
                            options: ["Offline teaching", "Online teaching", "Self-study"],
                            optionsTranslation: ["Dạy học trực tiếp (offline)", "Dạy học trực tuyến (online)", "Tự học"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'Online teaching is more convenient than...'",
                            studyTip: "Mẹo: So sánh hơn 'more convenient' đi cùng 'Online teaching'."
                        },
                        {
                            id: "a2_l4_l5",
                            q: "Is classroom management in online teaching described as easy?",
                            qTranslation: "Quản lý lớp học trong dạy học trực tuyến có được mô tả là dễ dàng không?",
                            options: ["No, it is much harder.", "Yes, it is very easy.", "Not mentioned."],
                            optionsTranslation: ["Không, nó khó hơn nhiều.", "Có, nó rất dễ.", "Không đề cập."],
                            correct: 0,
                            explanation: "Băng nghe nói: 'classroom management is much harder'.",
                            studyTip: "Mẹo: Phân biệt 'harder' (khó hơn) và 'easy' (dễ)."
                        }
                    ]
                },
                speaking: {
                    prompt: "Compare online teaching and offline classroom teaching. Which one do you prefer?",
                    promptTranslation: "Hãy so sánh dạy học online và dạy học offline trên lớp học. Thầy/Cô thích phương pháp nào hơn?",
                    sampleAnswer: "In my opinion, offline teaching is better than online teaching because students pay more attention.",
                    sampleTranslation: "Theo ý kiến tôi, dạy học offline tốt hơn dạy học online vì học sinh tập trung chú ý hơn.",
                    guideTips: "Gợi ý: Dùng cấu trúc so sánh hơn như 'better than', 'more interesting than'.\n\n* 5 CHỦ ĐỀ LUYỆN NÓI THÊM:\n1. Welcome parents to the meeting.\n2. Summarize classroom discipline in a parents' meeting.\n3. Propose a new class fund to parents.\n4. Introduce next term's plans to parents.\n5. Answer a parent's question about homework."
                },
                writing: {
                    prompt: "Write 4 sentences explaining which teaching tool is the most useful in your classroom.",
                    promptTranslation: "Viết 4 câu giải thích công cụ giảng dạy nào là hữu ích nhất trong lớp học của Thầy/Cô.",
                    suggestedVocab: "useful (hữu ích), projector (máy chiếu), whiteboard (bảng trắng), interact (tương tác).\n\n* 5 ĐỀ BÀI LUYỆN VIẾT THÊM:\n1. Write a short invitation letter to parents for the meeting.\n2. Write 3 sentences about parents' feedback in the meeting.\n3. Write 3 sentences about class achievements to present to parents.\n4. Write a brief note summarizing homework requirements for parents to check.\n5. Write 3 sentences thanking parents for their attendance.",
                    sampleAnswer: "In my classroom, the projector is the most useful tool. It is more interesting than a whiteboard. I can show beautiful pictures. Students interact much better."
                }
            },
            {
                id: "a2_lesson_5",
                title: "Bài 5: Nội quy lớp học & Lời khuyên sư phạm",
                description: "Học cách sử dụng các Động từ khuyết thiếu để thiết lập các quy tắc của lớp học và đưa ra lời khuyên cho học sinh.",
                lectureText: "Chào Thầy Cô, sau đây là bài giảng về Động từ khuyết thiếu. Chúng ta dùng must để chỉ quy định bắt buộc phải làm, ví dụ Students must wear uniforms nghĩa là học sinh phải mặc đồng phục. Ta dùng should để đưa ra lời khuyên hữu ích, ví dụ You should practice speaking every day nghĩa là bạn nên luyện nói mỗi ngày.",
                theoryHtml: `
                    <div class="space-y-3">
                        <p class="text-xs text-slate-350"><strong class="text-white">Must:</strong> Sự bắt buộc, quy tắc nghiêm ngặt. <span class="italic text-emerald-450">(Students must arrive on time.)</span></p>
                        <p class="text-xs text-slate-350"><strong class="text-white">Should:</strong> Lời khuyên hữu ích, nên làm. <span class="italic text-emerald-450">(You should review vocabulary.)</span></p>
                        <p class="text-xs text-slate-350"><strong class="text-white">Can/Could:</strong> Khả năng, xin phép lịch sự. <span class="italic text-emerald-450">(Can I ask a question?)</span></p>
                        <p class="text-[11px] text-slate-400">Tất cả động từ khuyết thiếu đều đi trực tiếp với Động từ nguyên thể không chia.</p>
                    </div>
                `,
                reading: {
                    passage: "At our school, students must turn off their mobile phones before the class starts. They should also ask for permission before entering the room.",
                    passageTranslation: "Tại trường của chúng tôi, học sinh phải tắt điện thoại di động trước khi buổi học bắt đầu. Các em cũng nên xin phép trước khi bước vào phòng.",
                    questions: [
                        {
                            id: "a2_l5_r1",
                            q: "What must students do before the class starts?",
                            qTranslation: "Học sinh bắt buộc phải làm gì trước khi buổi học bắt đầu?",
                            options: ["Do their homework", "Turn off their mobile phones", "Sing a song"],
                            optionsTranslation: ["Làm bài tập về nhà", "Tắt điện thoại di động", "Hát một bài hát"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'students must turn off their mobile phones before the class starts'.",
                            studyTip: "Mẹo: Tìm từ khóa 'must' trong câu đầu tiên."
                        },
                        {
                            id: "a2_l5_r2",
                            q: "When must students turn off their mobile phones?",
                            qTranslation: "Khi nào học sinh phải tắt điện thoại di động?",
                            options: ["After the class finishes", "Before the class starts", "During recess"],
                            optionsTranslation: ["Sau khi lớp học kết thúc", "Trước khi buổi học bắt đầu", "Trong giờ giải lao"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'before the class starts'.",
                            studyTip: "Mẹo: Chú ý giới từ thời gian 'before'."
                        },
                        {
                            id: "a2_l5_r3",
                            q: "What should students do before entering the room?",
                            qTranslation: "Học sinh nên làm gì trước khi vào phòng học?",
                            options: ["Ask for permission", "Clean their hands", "Sing a song"],
                            optionsTranslation: ["Xin phép", "Rửa sạch tay", "Hát một bài hát"],
                            correct: 0,
                            explanation: "Đoạn văn viết: 'They should also ask for permission before entering the room'.",
                            studyTip: "Mẹo: Cụm 'ask for permission' nghĩa là xin phép."
                        },
                        {
                            id: "a2_l5_r4",
                            q: "Is turning off mobile phones a strict rule (must) or a recommendation (should)?",
                            qTranslation: "Việc tắt điện thoại là quy định bắt buộc (must) hay lời khuyên (should)?",
                            options: ["A strict rule (must)", "A recommendation (should)", "An optional choice"],
                            optionsTranslation: ["Quy định bắt buộc (must)", "Lời khuyên (should)", "Lựa chọn tự do"],
                            correct: 0,
                            explanation: "Đoạn văn ghi 'students must turn off...'",
                            studyTip: "Mẹo: Từ 'must' diễn đạt sự bắt buộc, còn 'should' diễn đạt lời khuyên."
                        },
                        {
                            id: "a2_l5_r5",
                            q: "What device must be turned off at school?",
                            qTranslation: "Thiết bị nào phải được tắt ở trường học?",
                            options: ["Laptops", "Projectors", "Mobile phones"],
                            optionsTranslation: ["Máy tính xách tay", "Máy chiếu", "Điện thoại di động"],
                            correct: 2,
                            explanation: "Đoạn văn ghi 'their mobile phones'.",
                            studyTip: "Mẹo: Tìm danh từ chỉ thiết bị 'mobile phones'."
                        }
                    ]
                },
                listening: {
                    audioText: "You have a test tomorrow. You must not use dictionaries during the exam, but you should prepare well tonight.",
                    audioTranslation: "Bạn có bài thi vào ngày mai. Bạn không được phép sử dụng từ điển trong khi thi, nhưng bạn nên chuẩn bị kỹ tối nay.",
                    questions: [
                        {
                            id: "a2_l5_l1",
                            q: "Are students allowed to use dictionaries during the test?",
                            qTranslation: "Học sinh có được phép dùng từ điển trong bài thi không?",
                            options: ["Yes, they can.", "No, they must not.", "Yes, if they ask the teacher."],
                            optionsTranslation: ["Có, chúng có thể.", "Không, chúng không được phép.", "Có, nếu xin phép giáo viên."],
                            correct: 1,
                            explanation: "Băng nghe nói: 'You must not use dictionaries during the exam'.",
                            studyTip: "Mẹo: 'Must not' chỉ sự cấm đoán, không được phép làm."
                        },
                        {
                            id: "a2_l5_l2",
                            q: "What advice does the teacher give for tonight?",
                            qTranslation: "Giáo viên đưa ra lời khuyên gì cho tối nay?",
                            options: ["Go to bed early", "Prepare well", "Watch a movie"],
                            optionsTranslation: ["Đi ngủ sớm", "Chuẩn bị kỹ (prepare well)", "Xem phim"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'but you should prepare well tonight'.",
                            studyTip: "Mẹo: Nghe cụm 'prepare well' (chuẩn bị kỹ)."
                        },
                        {
                            id: "a2_l5_l3",
                            q: "When is the test scheduled?",
                            qTranslation: "Bài kiểm tra được lên lịch vào khi nào?",
                            options: ["Today", "Tomorrow", "Next week"],
                            optionsTranslation: ["Hôm nay", "Ngày mai", "Tuần tới"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'You have a test tomorrow'.",
                            studyTip: "Mẹo: Nghe trạng ngữ thời gian 'tomorrow'."
                        },
                        {
                            id: "a2_l5_l4",
                            q: "What must students not do during the exam?",
                            qTranslation: "Học sinh không được phép làm gì trong kỳ thi?",
                            options: ["Write on paper", "Use dictionaries", "Ask questions"],
                            optionsTranslation: ["Viết ra giấy", "Sử dụng từ điển", "Hỏi câu hỏi"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'You must not use dictionaries during the exam'.",
                            studyTip: "Mẹo: Lắng nghe danh từ bị cấm sử dụng 'dictionaries'."
                        },
                        {
                            id: "a2_l5_l5",
                            q: "Does the word 'should' in the audio indicate a command or advice?",
                            qTranslation: "Từ 'should' trong đoạn băng biểu đạt mệnh lệnh hay lời khuyên?",
                            options: ["A command", "Advice", "A capability"],
                            optionsTranslation: ["Mệnh lệnh", "Lời khuyên", "Khả năng"],
                            correct: 1,
                            explanation: "Từ 'should' được dùng để khuyên nhủ học sinh nên ôn tập chuẩn bị kỹ.",
                            studyTip: "Mẹo: Từ 'should' chỉ lời khuyên (advice)."
                        }
                    ]
                },
                speaking: {
                    prompt: "Give three rules for your class. Use the word 'must'.",
                    promptTranslation: "Hãy đưa ra ba quy định cho lớp học của Thầy/Cô. Sử dụng từ 'must'.",
                    sampleAnswer: "First, students must do their homework. Second, they must listen to the teacher. Third, they must not eat in class.",
                    sampleTranslation: "Thứ nhất, học sinh phải làm bài tập. Thứ hai, chúng phải nghe lời giáo viên. Thứ ba, chúng không được ăn trong lớp.",
                    guideTips: "Gợi ý: Cấu trúc bắt buộc là 'Students must + V (nguyên thể)'.\n\n* 5 CHỦ ĐỀ LUYỆN NÓI THÊM:\n1. Talk about your favorite summer memory.\n2. Describe a trip you took last summer.\n3. Talk about what you did to relax during summer.\n4. Describe a workshop you attended during summer vacation.\n5. Talk about how you prepared for the new school year during summer."
                },
                writing: {
                    prompt: "Write a short paragraph (50 words) giving advice to a new teacher on how to manage a noisy class.",
                    promptTranslation: "Viết một đoạn văn ngắn (50 từ) đưa ra lời khuyên cho một giáo viên mới về cách quản lý lớp học ồn ào.",
                    suggestedVocab: "should (nên), quiet (im lặng), praise (khen ngợi), rule (quy định).\n\n* 5 ĐỀ BÀI LUYỆN VIẾT THÊM:\n1. Write 3 sentences about a beach trip with your colleagues.\n2. Write 3 sentences about a book you read during summer.\n3. Write a short paragraph about how students felt on the last day of school.\n4. Write 3 sentences about your classroom decorations before summer.\n5. Write 3 sentences about how you plan to spend your next holiday.",
                    sampleAnswer: "You should establish clear classroom rules on the first day. You should not shout at the students. Instead, you should praise quiet students. This makes other students follow the rule quickly."
                }
            }
        ]
    },
    // ==========================================
    // CẤP ĐỘ B1 (TRUNG CẤP) - 5 BÀI HỌC
    // ==========================================
    B1: {
        lessons: [
            {
                id: "b1_lesson_1",
                title: "Bài 1: Quy trình chấm thi & Đánh giá học sinh",
                description: "Học cách sử dụng Thể Bị động để nói về quy trình kiểm tra và đánh giá học lực của học sinh.",
                lectureText: "Chào Thầy Cô, sau đây là bài giảng về Câu Bị Động. Chúng ta dùng câu bị động khi muốn nhấn mạnh vào đối tượng chịu sự tác động của hành động thay vì người thực hiện hành động. Công thức chung là Chủ ngữ mới cộng động từ be chia theo thì phù hợp, cộng động từ chính ở dạng phân từ 3 hoặc thêm ed. Với thì Hiện tại hoàn thành bị động, công thức sẽ là has hoặc have cộng been cộng phân từ 3.",
                theoryHtml: `
                    <div class="space-y-3">
                        <p class="text-xs text-slate-350"><strong class="text-white">Công thức bị động:</strong> S + BE (chia) + V3/ed + (by O)</p>
                        <ul class="list-disc pl-4 text-[11px] text-slate-400">
                            <li>Hiện tại đơn: English is spoken. <span class="italic text-emerald-450">(Tiếng Anh được nói.)</span></li>
                            <li>Quá khứ đơn: The test was designed last week. <span class="italic text-emerald-450">(Bài kiểm tra đã được thiết kế.)</span></li>
                            <li>Hiện tại hoàn thành: The grades have been submitted. <span class="italic text-emerald-450">(Điểm số đã được nộp.)</span></li>
                        </ul>
                    </div>
                `,
                reading: {
                    passage: "The mid-term exam was designed by the English department last week. All test papers are kept in a secure vault before the test day. The results have already been processed.",
                    passageTranslation: "Bài thi giữa kỳ đã được thiết kế bởi tổ bộ môn Tiếng Anh vào tuần trước. Mọi đề thi đều được lưu giữ trong tủ bảo mật an toàn trước ngày thi. Kết quả thi hiện đã được xử lý xong.",
                    questions: [
                        {
                            id: "b1_l1_r1",
                            q: "When was the mid-term exam designed?",
                            qTranslation: "Bài thi giữa kỳ được thiết kế khi nào?",
                            options: ["Yesterday", "Last week", "A month ago"],
                            optionsTranslation: ["Hôm qua", "Tuần trước", "Một tháng trước"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'The mid-term exam was designed... last week'.",
                            studyTip: "Mẹo: Tìm mốc thời gian 'last week' ở cuối câu đầu tiên."
                        },
                        {
                            id: "b1_l1_r2",
                            q: "Who designed the mid-term exam?",
                            qTranslation: "Ai đã thiết kế bài thi giữa kỳ?",
                            options: ["The principal", "The English department", "The school board"],
                            optionsTranslation: ["Hiệu trưởng", "Tổ bộ môn Tiếng Anh", "Ban giám hiệu"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'The mid-term exam was designed by the English department last week' (Bài thi giữa kỳ được thiết kế bởi tổ bộ môn Tiếng Anh vào tuần trước).",
                            studyTip: "Mẹo: Từ khóa chỉ tác nhân 'by the English department'."
                        },
                        {
                            id: "b1_l1_r3",
                            q: "Where are test papers kept before the test day?",
                            qTranslation: "Đề thi được cất giữ ở đâu trước ngày thi?",
                            options: ["In a secure vault", "In the classroom", "In the computer lab"],
                            optionsTranslation: ["Trong tủ bảo mật an toàn", "Trong lớp học", "Trong phòng máy tính"],
                            correct: 0,
                            explanation: "Đoạn văn viết: 'All test papers are kept in a secure vault before the test day'.",
                            studyTip: "Mẹo: Chú ý cụm giới từ chỉ địa điểm 'in a secure vault'."
                        },
                        {
                            id: "b1_l1_r4",
                            q: "What has already been processed?",
                            qTranslation: "Cái gì đã được xử lý xong rồi?",
                            options: ["The report cards", "The exam schedules", "The results"],
                            optionsTranslation: ["Học bạ", "Lịch thi", "Kết quả thi"],
                            correct: 2,
                            explanation: "Đoạn văn viết: 'The results have already been processed' (Kết quả hiện đã được xử lý xong).",
                            studyTip: "Mẹo: Tìm động từ bị động 'have already been processed' đi cùng chủ ngữ 'The results'."
                        },
                        {
                            id: "b1_l1_r5",
                            q: "Are exam papers left in the classroom before the exam?",
                            qTranslation: "Các đề thi có bị để lại trong lớp học trước khi thi không?",
                            options: ["Yes, they are.", "No, they are kept in a secure vault.", "Not mentioned."],
                            optionsTranslation: ["Có, đúng thế.", "Không, chúng được giữ trong tủ bảo mật.", "Không được đề cập."],
                            correct: 1,
                            explanation: "Đoạn văn khẳng định đề thi được cất giữ trong tủ bảo mật: 'All test papers are kept in a secure vault'.",
                            studyTip: "Mẹo: Lập luận phủ định dựa vào thông tin 'kept in a secure vault'."
                        }
                    ]
                },
                listening: {
                    audioText: "All student assignments are marked within forty-eight hours. The report cards will be sent to parents next Monday.",
                    audioTranslation: "Mọi bài tập của học sinh được chấm trong vòng 48 giờ. Học bạ sẽ được gửi tới phụ huynh vào thứ Hai tuần tới.",
                    questions: [
                        {
                            id: "b1_l1_l1",
                            q: "Within how many hours must assignments be marked?",
                            qTranslation: "Trong vòng bao nhiêu giờ bài tập phải được chấm xong?",
                            options: ["Twenty-four hours", "Forty-eight hours", "Seventy-two hours"],
                            optionsTranslation: ["24 giờ", "48 giờ", "72 giờ"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'marked within forty-eight hours'.",
                            studyTip: "Mẹo: Chú ý nghe cụm 'forty-eight' (48)."
                        },
                        {
                            id: "b1_l1_l2",
                            q: "When will the report cards be sent to parents?",
                            qTranslation: "Khi nào học bạ sẽ được gửi tới phụ huynh?",
                            options: ["Next Monday", "This weekend", "Tomorrow morning"],
                            optionsTranslation: ["Thứ Hai tuần tới", "Cuối tuần này", "Sáng mai"],
                            correct: 0,
                            explanation: "Băng nghe nói: 'The report cards will be sent to parents next Monday'.",
                            studyTip: "Mẹo: Nghe cụm từ chỉ thời gian 'next Monday'."
                        },
                        {
                            id: "b1_l1_l3",
                            q: "What are marked within forty-eight hours?",
                            qTranslation: "Cái gì được chấm trong vòng 48 giờ?",
                            options: ["Exam papers", "Student assignments", "Teacher's lesson plans"],
                            optionsTranslation: ["Bài thi", "Bài tập của học sinh", "Giáo án của giáo viên"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'All student assignments are marked within forty-eight hours' (Mọi bài tập của học sinh được chấm trong vòng 48 giờ).",
                            studyTip: "Mẹo: Nghe từ khóa chủ ngữ 'student assignments'."
                        },
                        {
                            id: "b1_l1_l4",
                            q: "Who will receive the report cards?",
                            qTranslation: "Ai sẽ nhận được học bạ?",
                            options: ["Students", "Parents", "The principal"],
                            optionsTranslation: ["Học sinh", "Phụ huynh", "Hiệu trưởng"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'sent to parents next Monday'.",
                            studyTip: "Mẹo: Nghe giới từ 'to' chỉ đối tượng nhận 'parents'."
                        },
                        {
                            id: "b1_l1_l5",
                            q: "How long does it take to mark student assignments?",
                            qTranslation: "Mất bao lâu để chấm bài tập của học sinh?",
                            options: ["1 day", "2 days", "3 days"],
                            optionsTranslation: ["1 ngày", "2 ngày (48 giờ)", "3 ngày"],
                            correct: 1,
                            explanation: "Băng nghe nói 'forty-eight hours' tương đương với 2 ngày.",
                            studyTip: "Mẹo: Quy đổi 48 giờ thành 2 ngày."
                        }
                    ]
                },
                speaking: {
                    prompt: "Explain how tests are organized and evaluated at your school. Use passive sentences.",
                    promptTranslation: "Hãy giải thích cách thức tổ chức và đánh giá bài thi ở trường của Thầy/Cô. Sử dụng câu bị động.",
                    sampleAnswer: "The test questions are created by teachers. After the exam, the test papers are marked carefully.",
                    sampleTranslation: "Câu hỏi thi được tạo ra bởi các giáo viên. Sau kỳ thi, bài làm được chấm điểm cẩn thận.",
                    guideTips: "Gợi ý: Dùng cấu trúc bị động như 'are created', 'are marked'.\n\n* 5 CHỦ ĐỀ LUYỆN NÓI THÊM:\n1. Describe how classroom rules are enforced at your school.\n2. Talk about how online teaching resources are developed by your colleagues.\n3. Explain how extracurricular activities are scheduled in your semester.\n4. Describe how outstanding students are selected and rewarded.\n5. Discuss how curriculum changes are received by teachers in your department."
                },
                writing: {
                    prompt: "Write a short email (80 words) to parents explaining that their children's homework must be signed every weekend.",
                    promptTranslation: "Viết một email ngắn (80 từ) gửi phụ huynh giải thích rằng bài tập về nhà của con họ phải được ký xác nhận vào mỗi cuối tuần.",
                    suggestedVocab: "report card (báo cáo), check (kiểm tra), signature (chữ ký), must be signed.\n\n* 5 ĐỀ BÀI LUYỆN VIẾT THÊM:\n1. Write a formal request asking for more textbooks to be delivered.\n2. Write a short notification explaining that the playground will be closed.\n3. Draft an announcement about how final grades will be calculated.\n4. Write a 80-word email informing parents that a parent-teacher meeting has been scheduled.\n5. Write a short paragraph about how old test papers are recycled.",
                    sampleAnswer: "Dear Parents, I want to report that our weekly assignments have been graded. To help your children learn better, all homework must be checked and signed by parents every weekend. Signed papers should be brought back to class on Monday. Thank you for your cooperation."
                }
            },
            {
                id: "b1_lesson_2",
                title: "Bài 2: Gương sáng Học sinh & Đồng nghiệp tiêu biểu",
                description: "Học cách sử dụng Mệnh đề quan hệ xác định và không xác định để viết câu ghép và mô tả người, vật chi tiết.",
                lectureText: "Chào Thầy Cô, sau đây là bài giảng về Mệnh đề quan hệ. Mệnh đề quan hệ dùng để cung cấp thêm thông tin cho danh từ. Ta dùng Who chỉ người làm chủ ngữ, Whom chỉ người làm tân ngữ, Which chỉ vật, và Whose chỉ sở hữu. Mẹo tránh bẫy thi là không được dùng That đứng sau dấu phẩy trong mệnh đề không xác định.",
                theoryHtml: `
                    <div class="space-y-3">
                        <p class="text-xs text-slate-350"><strong class="text-white">Who/Whom:</strong> Người <span class="italic text-emerald-450">(The teacher who inspired me...)</span></p>
                        <p class="text-xs text-slate-350"><strong class="text-white">Which:</strong> Vật <span class="italic text-emerald-450">(The book which I bought...)</span></p>
                        <p class="text-xs text-slate-350"><strong class="text-white">Whose:</strong> Sở hữu <span class="italic text-emerald-450">(The student whose parents...)</span></p>
                        <p class="text-[11px] text-slate-400"><strong class="text-red-405">Không dùng "That"</strong> đứng ngay sau dấu phẩy trong mệnh đề quan hệ không xác định.</p>
                    </div>
                `,
                reading: {
                    passage: "Mr. Nam, who is our school principal, rewarded the student whose grades were the highest this semester. The award ceremony, which happened yesterday, was wonderful.",
                    passageTranslation: "Thầy Nam, người là hiệu trưởng của chúng tôi, đã khen thưởng người học sinh có điểm số cao nhất trong học kỳ này. Lễ trao giải, diễn ra vào ngày hôm qua, thật tuyệt vời.",
                    questions: [
                        {
                            id: "b1_l2_r1",
                            q: "Which student was rewarded by Mr. Nam?",
                            qTranslation: "Học student nào đã được khen thưởng bởi thầy Nam?",
                            options: ["The student who helped other friends", "The student whose grades were the highest", "The student who designed the school website"],
                            optionsTranslation: ["Học sinh giúp đỡ các bạn", "Học sinh có điểm số cao nhất", "Học sinh thiết kế website trường"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'rewarded the student whose grades were the highest'.",
                            studyTip: "Mẹo: Đại từ quan hệ 'whose' chỉ mối quan hệ sở hữu đối với danh từ chỉ điểm số (grades)."
                        },
                        {
                            id: "b1_l2_r2",
                            q: "Who is Mr. Nam?",
                            qTranslation: "Thầy Nam là ai?",
                            options: ["The English teacher", "The school principal", "The IT director"],
                            optionsTranslation: ["Giáo viên tiếng Anh", "Hiệu trưởng trường học", "Giám đốc công nghệ"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'Mr. Nam, who is our school principal...'..",
                            studyTip: "Mẹo: Nhận biết mệnh đề quan hệ bổ nghĩa 'who is our school principal'."
                        },
                        {
                            id: "b1_l2_r3",
                            q: "When did the award ceremony happen?",
                            qTranslation: "Lễ trao giải diễn ra khi nào?",
                            options: ["Last week", "Yesterday", "This morning"],
                            optionsTranslation: ["Tuần trước", "Hôm qua", "Sáng nay"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'The award ceremony, which happened yesterday, was wonderful'.",
                            studyTip: "Mẹo: Tìm từ chỉ thời gian 'yesterday' trong mệnh đề quan hệ."
                        },
                        {
                            id: "b1_l2_r4",
                            q: "How was the award ceremony described?",
                            qTranslation: "Buổi lễ trao giải được miêu tả thế nào?",
                            options: ["Boring", "Wonderful", "Quiet"],
                            optionsTranslation: ["Tẻ nhạt", "Tuyệt vời", "Yên tĩnh"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'was wonderful' (thật tuyệt vời).",
                            studyTip: "Mẹo: Tìm tính từ ở cuối câu thứ hai."
                        },
                        {
                            id: "b1_l2_r5",
                            q: "What did Mr. Nam do to the student whose grades were the highest?",
                            qTranslation: "Thầy Nam đã làm gì với học sinh đạt điểm cao nhất?",
                            options: ["Punished the student", "Rewarded the student", "Gave the student a task"],
                            optionsTranslation: ["Phạt học sinh đó", "Khen thưởng học sinh đó", "Giao bài tập cho học sinh đó"],
                            correct: 1,
                            explanation: "Đoạn văn ghi 'rewarded the student' (khen thưởng học sinh).",
                            studyTip: "Mẹo: Động từ 'rewarded' nghĩa là khen thưởng."
                        }
                    ]
                },
                listening: {
                    audioText: "I want to introduce Ms. Green, who has worked here for five years. She runs the camera club which is loved by many students.",
                    audioTranslation: "Tôi muốn giới thiệu cô Green, người đã làm việc ở đây được 5 năm. Cô ấy điều hành câu lạc bộ máy ảnh thứ mà được yêu mến bởi nhiều học sinh.",
                    questions: [
                        {
                            id: "b1_l2_l1",
                            q: "What club does Ms. Green run?",
                            qTranslation: "Cô Green điều hành câu lạc bộ nào?",
                            options: ["The photography club", "The music club", "The English club"],
                            optionsTranslation: ["Câu lạc bộ nhiếp ảnh (camera club)", "Câu lạc bộ âm nhạc", "Câu lạc bộ tiếng Anh"],
                            correct: 0,
                            explanation: "Băng nghe nói: 'camera club which is loved by many students'. Camera club tương đương photography club.",
                            studyTip: "Mẹo nghe: Hãy lưu ý các từ đồng nghĩa như 'camera' và 'photography'."
                        },
                        {
                            id: "b1_l2_l2",
                            q: "How long has Ms. Green worked at the school?",
                            qTranslation: "Cô Green đã làm việc ở trường được bao lâu?",
                            options: ["For three years", "For five years", "For ten years"],
                            optionsTranslation: ["3 năm", "5 năm", "10 năm"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'who has worked here for five years'.",
                            studyTip: "Mẹo: Nghe mốc thời gian số năm 'five years'."
                        },
                        {
                            id: "b1_l2_l3",
                            q: "Who loves the camera club?",
                            qTranslation: "Ai yêu thích câu lạc bộ máy ảnh?",
                            options: ["Only teachers", "Many students", "The principal"],
                            optionsTranslation: ["Chỉ các giáo viên", "Nhiều học sinh", "Hiệu trưởng"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'which is loved by many students'.",
                            studyTip: "Mẹo: Nghe cụm 'loved by many students'."
                        },
                        {
                            id: "b1_l2_l4",
                            q: "What is another name for Ms. Green's club?",
                            qTranslation: "Tên gọi khác của câu lạc bộ mà cô Green quản lý là gì?",
                            options: ["Art club", "Photography club", "Drama club"],
                            optionsTranslation: ["CLB Mỹ thuật", "CLB Nhiếp ảnh (photography)", "CLB Kịch"],
                            correct: 1,
                            explanation: "Băng nói 'camera club', tương đồng với 'photography club'.",
                            studyTip: "Mẹo: Liên tưởng 'camera' với 'photography'."
                        },
                        {
                            id: "b1_l2_l5",
                            q: "Who is Ms. Green?",
                            qTranslation: "Cô Green là ai?",
                            options: ["A new English teacher", "A teacher who has worked for 5 years", "A parent volunteer"],
                            optionsTranslation: ["Một giáo viên tiếng Anh mới", "Giáo viên đã làm việc 5 năm", "Phụ huynh tình nguyện"],
                            correct: 1,
                            explanation: "Băng nói 'Ms. Green, who has worked here for five years'.",
                            studyTip: "Mẹo: Kết hợp thông tin tên và số năm làm việc."
                        }
                    ]
                },
                speaking: {
                    prompt: "Talk about a teacher who inspired you to teach. Use relative clauses.",
                    promptTranslation: "Hãy nói về một người giáo viên đã truyền cảm hứng dạy học cho Thầy/Cô. Sử dụng mệnh đề quan hệ.",
                    sampleAnswer: "I want to talk about Mr. An, who was my English teacher. He used methods which made lessons fun.",
                    sampleTranslation: "Tôi muốn nói về thầy An, người từng là giáo viên tiếng Anh của tôi. Thầy đã sử dụng những phương pháp cái mà làm buổi học trở nên vui vẻ.",
                    guideTips: "Gợi ý: Dùng mệnh đề quan hệ ghép câu như 'who was...', 'which made...'.\n\n* 5 CHỦ ĐỀ LUYỆN NÓI THÊM:\n1. Describe a colleague whom you respect most.\n2. Talk about a student who overcame difficulties to study well.\n3. Talk about the school project which was most successful.\n4. Describe a teaching book that has helped you a lot.\n5. Describe a student whose English skills are excellent."
                },
                writing: {
                    prompt: "Write a paragraph (80 words) describing a model student in your class.",
                    promptTranslation: "Viết một đoạn văn (80 từ) mô tả một học sinh tiêu biểu trong lớp học của Thầy/Cô.",
                    suggestedVocab: "diligent (chăm chỉ), participate (tham gia), respect (tôn trọng), whose.\n\n* 5 ĐỀ BÀI LUYỆN VIẾT THÊM:\n1. Write a recommendation letter for an outstanding teacher in your team.\n2. Write 3 sentences about a hard-working student using 'who'.\n3. Write 3 sentences about your favorite classroom tool using 'which'.\n4. Write a paragraph about a colleague whose dedication inspires everyone.\n5. Write 3 sentences introducing a parent helper using 'whose'.",
                    sampleAnswer: "In my class, the model student is Nam, who is always diligent and cooperative. He is a child whose grades are excellent in all subjects. Nam, who actively participates in school sports, always respects his teachers and helps classmates who struggle with math. I believe he is a student whom every teacher would love to teach in their classroom."
                }
            },
            {
                id: "b1_lesson_3",
                title: "Bài 3: Đổi mới sáng tạo trong lớp học",
                description: "Học cách sử dụng Thì hiện tại hoàn thành tiếp diễn để diễn đạt một hành động bắt đầu trong quá khứ và vẫn tiếp diễn ở hiện tại.",
                lectureText: "Chào Thầy Cô, sau đây là bài giảng về Thì Hiện tại hoàn thành tiếp diễn. Ta dùng thì này để nhấn mạnh vào tính liên tục của hành động kéo dài từ quá khứ đến nay. Công thức là have hoặc has cộng been cộng động từ đuôi i n g. Ví dụ, I have been teaching English for ten years nghĩa là tôi đã liên tục dạy tiếng anh được 10 năm rồi.",
                theoryHtml: `
                    <div class="space-y-3">
                        <p class="text-xs text-slate-350"><strong class="text-white">Công thức:</strong> S + have/has + been + V-ing</p>
                        <ul class="list-disc pl-4 text-[11px] text-slate-400">
                            <li>Nhấn mạnh tính liên tục của hành động bắt đầu ở quá khứ kéo dài đến hiện tại.</li>
                            <li>Ví dụ: I have been researching this method for three months. <span class="italic text-emerald-450">(Tôi đã liên tục nghiên cứu phương pháp này được 3 tháng.)</span></li>
                            <li>Dấu hiệu: for, since, all day, recently.</li>
                        </ul>
                    </div>
                `,
                reading: {
                    passage: "Lately, our school has been renovating the computer labs. We have been installing new software to help students learn English better. Teachers have been attending training sessions all week.",
                    passageTranslation: "Gần đây, trường chúng tôi đã và đang cải tạo các phòng máy tính. Chúng tôi đã và đang cài đặt phần mềm mới để giúp học sinh học tiếng Anh tốt hơn. Các giáo viên đã và đang tham dự các buổi tập huấn cả tuần nay.",
                    questions: [
                        {
                            id: "b1_l3_r1",
                            q: "What have teachers been doing all week?",
                            qTranslation: "Giáo viên đã và đang làm gì suốt cả tuần nay?",
                            options: ["Renovating classrooms", "Attending training sessions", "Teaching online"],
                            optionsTranslation: ["Cải tạo lớp học", "Tham dự các buổi tập huấn", "Dạy học trực tuyến"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'Teachers have been attending training sessions all week'.",
                            studyTip: "Mẹo: Tìm cụm 'attending training sessions' khớp với Thì hiện tại hoàn thành tiếp diễn ở cuối bài."
                        },
                        {
                            id: "b1_l3_r2",
                            q: "What has the school been renovating lately?",
                            qTranslation: "Gần đây trường học đã cải tạo những cái gì?",
                            options: ["The computer labs", "The school library", "The sports fields"],
                            optionsTranslation: ["Các phòng máy tính", "Thư viện trường", "Các sân thể thao"],
                            correct: 0,
                            explanation: "Đoạn văn viết: 'our school has been renovating the computer labs'.",
                            studyTip: "Mẹo: Từ 'renovating' nghĩa là cải tạo, sửa sang."
                        },
                        {
                            id: "b1_l3_r3",
                            q: "Why has the school been installing new software?",
                            qTranslation: "Tại sao trường lại cài đặt phần mềm mới?",
                            options: ["To play video games", "To help students learn English better", "To manage staff salary"],
                            optionsTranslation: ["Để chơi điện tử", "Để giúp học sinh học tiếng Anh tốt hơn", "Để quản lý lương nhân viên"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'installing new software to help students learn English better'.",
                            studyTip: "Mẹo: Tìm mệnh đề mục đích sau từ chỉ mục đích 'to'."
                        },
                        {
                            id: "b1_l3_r4",
                            q: "Who has been attending training sessions?",
                            qTranslation: "Ai đã và đang tham dự các buổi tập huấn?",
                            options: ["The students", "The teachers", "The computer technicians"],
                            optionsTranslation: ["Học sinh", "Giáo viên", "Kỹ thuật viên máy tính"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'Teachers have been attending training sessions all week'.",
                            studyTip: "Mẹo: Xác định chủ ngữ ở câu cuối cùng."
                        },
                        {
                            id: "b1_l3_r5",
                            q: "Have the training sessions lasted for a month?",
                            qTranslation: "Các buổi tập huấn đã kéo dài một tháng rồi phải không?",
                            options: ["No, they have been attending them all week.", "Yes, they have been training for a year.", "Not mentioned."],
                            optionsTranslation: ["Không, họ mới tham dự cả tuần này.", "Có, họ đã tập huấn được 1 năm.", "Không đề cập."],
                            correct: 0,
                            explanation: "Đoạn văn ghi 'all week' (cả tuần).",
                            studyTip: "Mẹo: Phân biệt 'all week' và 'a month'."
                        }
                    ]
                },
                listening: {
                    audioText: "I have been designing this new classroom project since last month. I haven't finished it yet, but I've been working on it every day.",
                    audioTranslation: "Tôi đã và đang thiết kế dự án lớp học mới này kể từ tháng trước. Tôi vẫn chưa hoàn thành nó, nhưng tôi đã và đang thực hiện nó mỗi ngày.",
                    questions: [
                        {
                            id: "b1_l3_l1",
                            q: "How long has the teacher been designing the classroom project?",
                            qTranslation: "Giáo viên đã và đang thiết kế dự án lớp học này được bao lâu rồi?",
                            options: ["Since last week", "Since last month", "For a year"],
                            optionsTranslation: ["Từ tuần trước", "Từ tháng trước", "Trong một năm"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'designing this new classroom project since last month'.",
                            studyTip: "Mẹo: Chú ý nghe cụm 'since last month' (từ tháng trước)."
                        },
                        {
                            id: "b1_l3_l2",
                            q: "Has the teacher finished the classroom project?",
                            qTranslation: "Giáo viên đã hoàn thành dự án lớp học chưa?",
                            options: ["Yes, she has already finished it.", "No, she hasn't finished it yet.", "She decided to cancel it."],
                            optionsTranslation: ["Rồi, cô ấy đã hoàn thành rồi.", "Chưa, cô ấy vẫn chưa làm xong.", "Cô ấy quyết định hủy bỏ nó."],
                            correct: 1,
                            explanation: "Băng nghe nói: 'I haven't finished it yet'.",
                            studyTip: "Mẹo: Trạng từ 'yet' đi kèm câu phủ định chỉ hành động chưa hoàn thành."
                        },
                        {
                            id: "b1_l3_l3",
                            q: "How often does the teacher work on the project?",
                            qTranslation: "Giáo viên làm việc với dự án này tần suất thế nào?",
                            options: ["Once a week", "Every day", "Rarely"],
                            optionsTranslation: ["Một tuần một lần", "Mỗi ngày", "Hiếm khi"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'I've been working on it every day'.",
                            studyTip: "Mẹo: Nghe cụm từ 'every day'."
                        },
                        {
                            id: "b1_l3_l4",
                            q: "What project has the teacher been working on?",
                            qTranslation: "Giáo viên đang thực hiện dự án gì?",
                            options: ["A school library project", "A new classroom project", "A teacher training program"],
                            optionsTranslation: ["Dự án thư viện trường", "Dự án lớp học mới", "Chương trình tập huấn giáo viên"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'designing this new classroom project'.",
                            studyTip: "Mẹo: Nghe danh từ ghép 'classroom project'."
                        },
                        {
                            id: "b1_l3_l5",
                            q: "When did the teacher start working on the project?",
                            qTranslation: "Giáo viên bắt đầu thực hiện dự án từ khi nào?",
                            options: ["Last week", "Last month", "Two months ago"],
                            optionsTranslation: ["Tuần trước", "Tháng trước", "Hai tháng trước"],
                            correct: 1,
                            explanation: "Băng nghe nói 'since last month' (từ tháng trước).",
                            studyTip: "Mẹo: Giới từ 'since' đi kèm mốc thời gian bắt đầu."
                        }
                    ]
                },
                speaking: {
                    prompt: "Talk about an educational project or a new method you have been trying in your class recently.",
                    promptTranslation: "Hãy nói về một dự án giáo dục hoặc phương pháp mới mà Thầy/Cô đã và đang thử nghiệm trong lớp của mình gần đây.",
                    sampleAnswer: "Recently, I have been using interactive quizzes in my class. Students have been learning vocabulary happily.",
                    sampleTranslation: "Gần đây, tôi đã và đang dùng trò chơi trắc nghiệm tương tác trong lớp. Học sinh đã và đang học từ vựng một cách vui vẻ.",
                    guideTips: "Gợi ý: Dùng cấu trúc 'I have been + V-ing' để nhấn mạnh quá trình liên tục gần đây.\n\n* 5 CHỦ ĐỀ LUYỆN NÓI THÊM:\n1. Describe how you have been preparing online homework for your students.\n2. Talk about a lesson plan you have been designing recently.\n3. Discuss how you have been learning new technology tools.\n4. Describe how students have been cooperating in class lately.\n5. Discuss how you have been advising struggling students this month."
                },
                writing: {
                    prompt: "Write a short report (80 words) describing the school project you have been working on recently.",
                    promptTranslation: "Viết một báo cáo ngắn (80 từ) mô tả dự án trường học mà Thầy/Cô đã và đang thực hiện gần đây.",
                    suggestedVocab: "renovate (cải tiến), library (thư viện), collect (thu thập), raise funds (quyên góp).\n\n* 5 ĐỀ BÀI LUYỆN VIẾT THÊM:\n1. Write a short plan about what software you have been trying in teaching.\n2. Write 3 sentences about how you have been organizing tests recently.\n3. Write 3 sentences about a teaching method you have been reading about.\n4. Write a brief report about how your students have been practicing speaking.\n5. Write 3 sentences about how colleagues have been preparing for the inspection.",
                    sampleAnswer: "Our school department has been working on a library project since May. We have been collecting old books from local families to enrich the reading corner. Students have been painting the bookshelves all week. We have also been raising funds to buy audiobooks. I believe this project will encourage our children to read more when it is finished next week."
                }
            },
            {
                id: "b1_lesson_4",
                title: "Bài 4: Sáng kiến nâng cao chất lượng dạy và học",
                description: "Học cách sử dụng Câu điều kiện loại 1 và loại 2 để trình bày giả thuyết và sáng kiến thay đổi.",
                lectureText: "Chào Thầy Cô, sau đây là bài giảng về Câu điều kiện loại 1 và loại 2. Ta dùng điều kiện loại 1 cho tình huống có thật ở hiện tại hoặc tương lai, với công thức nếu chủ ngữ cộng động từ ở hiện tại đơn, thì chủ ngữ cộng will cộng động từ nguyên thể. Ta dùng điều kiện loại 2 cho giả thuyết không có thật ở hiện tại, công thức là nếu chủ ngữ cộng động từ ở quá khứ đơn, thì chủ ngữ cộng would cộng động từ nguyên thể. Với điều kiện loại 2, ta dùng were cho tất cả các chủ ngữ ở mệnh đề nếu.",
                theoryHtml: `
                    <div class="space-y-3">
                        <p class="text-xs text-slate-350"><strong class="text-white">Loại 1 (Có thật ở hiện tại/tương lai):</strong><br>
                        If + S + V(hiện tại), S + will + V <span class="italic text-emerald-450">(If we study hard, we will pass.)</span></p>
                        <p class="text-xs text-slate-350"><strong class="text-white">Loại 2 (Trái thực tế ở hiện tại):</strong><br>
                        If + S + V2/ed, S + would + V <span class="italic text-emerald-450">(If I were you, I would change the textbook.)</span></p>
                        <p class="text-[11px] text-slate-400">Trong mệnh đề If của loại 2, động từ 'to be' chia là <strong class="text-teal-450">were</strong> cho tất cả ngôi chủ ngữ.</p>
                    </div>
                `,
                reading: {
                    passage: "If we upgrade our school computer lab, students will have access to international materials. If I were the principal, I would invest in e-books because they are more economical.",
                    passageTranslation: "Nếu chúng ta nâng cấp phòng máy tính của trường, học sinh sẽ được tiếp cận với tài liệu quốc tế. Nếu tôi là hiệu trưởng, tôi sẽ đầu tư vào sách điện tử vì chúng tiết kiệm hơn.",
                    questions: [
                        {
                            id: "b1_l4_r1",
                            q: "What would the writer do if he were the principal?",
                            qTranslation: "Người viết sẽ làm gì nếu anh ấy là hiệu trưởng?",
                            options: ["Buy more blackboard markers", "Invest in e-books", "Renovate the library"],
                            optionsTranslation: ["Mua thêm bút viết bảng", "Đầu tư vào sách điện tử", "Cải tạo thư viện"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'If I were the principal, I would invest in e-books'.",
                            studyTip: "Mẹo: Dùng câu điều kiện loại 2 để tìm giả thuyết trái thực tế 'If I were the principal'."
                        },
                        {
                            id: "b1_l4_r2",
                            q: "What will happen if they upgrade the school computer lab?",
                            qTranslation: "Điều gì sẽ xảy ra nếu họ nâng cấp phòng máy tính của trường?",
                            options: ["Students will study online at home.", "Students will have access to international materials.", "Teachers will work fewer hours."],
                            optionsTranslation: ["Học sinh sẽ học trực tuyến ở nhà.", "Học sinh sẽ tiếp cận được tài liệu quốc tế.", "Giáo viên sẽ làm việc ít giờ hơn."],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'If we upgrade our school computer lab, students will have access to international materials'.",
                            studyTip: "Mẹo: Tìm mệnh đề kết quả của Câu điều kiện loại 1 'will have access to...'."
                        },
                        {
                            id: "b1_l4_r3",
                            q: "Why would the writer invest in e-books?",
                            qTranslation: "Tại sao người viết lại muốn đầu tư vào sách điện tử?",
                            options: ["Because they are heavier.", "Because they are more economical.", "Because they are free."],
                            optionsTranslation: ["Vì chúng nặng hơn.", "Vì chúng kinh tế (tiết kiệm) hơn.", "Vì chúng miễn phí."],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'I would invest in e-books because they are more economical'.",
                            studyTip: "Mẹo: Từ 'economical' có nghĩa là tiết kiệm, kinh tế."
                        },
                        {
                            id: "b1_l4_r4",
                            q: "Under what condition would the writer invest in e-books?",
                            qTranslation: "Trong điều kiện nào người viết sẽ đầu tư vào sách điện tử?",
                            options: ["If he upgraded the lab", "If he were the principal", "If students asked for them"],
                            optionsTranslation: ["Nếu anh ấy nâng cấp phòng máy", "Nếu anh ấy là hiệu trưởng", "Nếu học sinh yêu cầu chúng"],
                            correct: 1,
                            explanation: "Đoạn văn ghi 'If I were the principal, I would invest in e-books'.",
                            studyTip: "Mẹo: Nhận dạng cấu trúc điều kiện giả định loại 2."
                        },
                        {
                            id: "b1_l4_r5",
                            q: "Are e-books more expensive than paper books according to the passage?",
                            qTranslation: "Theo đoạn văn, sách điện tử có đắt hơn sách giấy không?",
                            options: ["Yes, they are.", "No, they are more economical.", "Not mentioned."],
                            optionsTranslation: ["Có, đắt hơn.", "Không, chúng tiết kiệm hơn.", "Không đề cập."],
                            correct: 1,
                            explanation: "Đoạn văn ghi sách điện tử 'more economical' (tiết kiệm hơn).",
                            studyTip: "Mẹo: 'More economical' đồng nghĩa với ít tốn kém hơn."
                        }
                    ]
                },
                listening: {
                    audioText: "If we organize speaking clubs every Saturday, our teachers will become more confident. If we had more budget, I would hire a native teacher.",
                    audioTranslation: "Nếu chúng ta tổ chức các câu lạc bộ nói vào thứ Bảy hàng tuần, giáo viên của chúng tôi sẽ trở nên tự tin hơn. Nếu chúng tôi có nhiều ngân sách hơn, tôi sẽ thuê một giáo viên bản xứ.",
                    questions: [
                        {
                            id: "b1_l4_l1",
                            q: "Under what condition would the teacher hire a native speaker?",
                            qTranslation: "Trong điều kiện nào giáo viên sẽ thuê một người bản xứ?",
                            options: ["If we have speaking clubs.", "If we had more budget.", "If we upgraded the computer lab."],
                            optionsTranslation: ["Nếu chúng ta có các CLB nói.", "Nếu chúng ta có nhiều ngân sách hơn.", "Nếu nâng cấp phòng máy."],
                            correct: 1,
                            explanation: "Băng nghe nói: 'If we had more budget, I would hire a native teacher'.",
                            studyTip: "Mẹo: Nghe cấu trúc câu điều kiện loại 2 'If we had... I would...'."
                        },
                        {
                            id: "b1_l4_l2",
                            q: "What will happen if they organize speaking clubs every Saturday?",
                            qTranslation: "Điều gì sẽ xảy ra nếu họ tổ chức các câu lạc bộ nói mỗi thứ Bảy?",
                            options: ["Students will get higher scores.", "Our teachers will become more confident.", "We will spend more budget."],
                            optionsTranslation: ["Học sinh sẽ đạt điểm cao hơn.", "Giáo viên của chúng ta sẽ trở nên tự tin hơn.", "Chúng ta sẽ tốn nhiều ngân sách hơn."],
                            correct: 1,
                            explanation: "Băng nghe nói: 'If we organize speaking clubs every Saturday, our teachers will become more confident'.",
                            studyTip: "Mẹo: Nghe cụm 'teachers will become more confident'."
                        },
                        {
                            id: "b1_l4_l3",
                            q: "When would they organize the speaking clubs?",
                            qTranslation: "Họ sẽ tổ chức các câu lạc bộ nói khi nào?",
                            options: ["Every Friday", "Every Saturday", "Every Sunday"],
                            optionsTranslation: ["Mỗi thứ Sáu", "Mỗi thứ Bảy", "Mỗi Chủ Nhật"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'organize speaking clubs every Saturday'.",
                            studyTip: "Mẹo: Nghe từ chỉ ngày trong tuần 'Saturday'."
                        },
                        {
                            id: "b1_l4_l4",
                            q: "Who would the teacher hire if there were more budget?",
                            qTranslation: "Giáo viên sẽ thuê ai nếu có thêm ngân sách?",
                            options: ["A native teacher", "A computer technician", "An English expert"],
                            optionsTranslation: ["Một giáo viên bản xứ", "Một kỹ thuật viên máy tính", "Một chuyên gia tiếng Anh"],
                            correct: 0,
                            explanation: "Băng nghe nói: 'I would hire a native teacher'.",
                            studyTip: "Mẹo: Từ 'native teacher' nghĩa là giáo viên bản ngữ."
                        },
                        {
                            id: "b1_l4_l5",
                            q: "Does the school currently have enough budget to hire a native teacher?",
                            qTranslation: "Hiện tại trường có đủ ngân sách để thuê giáo viên bản ngữ không?",
                            options: ["Yes, they do.", "No, they do not (it is just a hypothesis).", "Not mentioned."],
                            optionsTranslation: ["Có, họ có.", "Không, họ không có (đây chỉ là giả thuyết).", "Không đề cập."],
                            correct: 1,
                            explanation: "Băng dùng câu điều kiện loại 2 'If we had more budget...' thể hiện việc trái thực tế ở hiện tại.",
                            studyTip: "Mẹo: Câu điều kiện loại 2 diễn tả hành động không có thật ở hiện tại."
                        }
                    ]
                },
                speaking: {
                    prompt: "If you were the principal of your school, what is one thing you would change immediately?",
                    promptTranslation: "Nếu Thầy/Cô là hiệu trưởng trường mình, điều gì là một thứ Thầy/Cô sẽ thay đổi ngay lập tức?",
                    sampleAnswer: "If I were the principal, I would build a new English corner. I would buy many English books.",
                    sampleTranslation: "Nếu tôi là hiệu trưởng, tôi sẽ xây một góc tiếng Anh mới. Tôi sẽ mua nhiều sách tiếng Anh.",
                    guideTips: "Gợi ý: Dùng cấu trúc loại 2: 'If I were... I would + V'.\n\n* 5 CHỦ ĐỀ LUYỆN NÓI THÊM:\n1. If you had a class with 50 students, how would you group them?\n2. If students did not want to speak English, what would you do?\n3. If you won a teaching award, how would you celebrate?\n4. If you could buy any technology for your class, what would it be?\n5. If you became the head of the English department, what changes would you make?"
                },
                writing: {
                    prompt: "Write a paragraph (80 words) presenting ideas to improve students' speaking skills.",
                    promptTranslation: "Viết một đoạn văn (80 từ) trình bày các ý tưởng để cải thiện kỹ năng nói của học sinh.",
                    suggestedVocab: "recommend (khuyên), native speakers (người bản xứ), budget (ngân sách), conditional.\n\n* 5 ĐỀ BÀI LUYỆN VIẾT THÊM:\n1. Write 3 sentences proposing changes to the school cafeteria using 'If'.\n2. Write 3 sentences about what you will do if the school gets new computers.\n3. Write 3 sentences about what you would do if you had no homework policy.\n4. Write a paragraph proposing a new English speaking corner.\n5. Write 3 sentences about what would happen if exams were cancelled.",
                    sampleAnswer: "If we want to improve speaking skills, we should build a speaking club. If students practice speaking every day, they will feel much more confident. If we had a larger budget, we would invite native speakers to join the classes. I also recommend that teachers use communicative games. If we organize classroom activities effectively, students will speak English naturally without any hesitation."
                }
            },
            {
                id: "b1_lesson_5",
                title: "Bài 5: Chuẩn bị cho kỳ thanh tra chuyên đề",
                description: "Học cách sử dụng Thì quá khứ hoàn thành phối hợp Quá khứ đơn để diễn đạt trình tự trước và sau của hai hành động quá khứ.",
                lectureText: "Chào Thầy Cô, sau đây là bài giảng về Thì Quá khứ hoàn thành. Thì này dùng để tả hành động xảy ra và kết thúc trước một hành động quá khứ khác. Hành động xảy ra trước ta dùng Quá khứ hoàn thành với công thức had cộng động từ ở cột 3 hoặc thêm ed. Hành động xảy ra sau ta dùng Quá khứ đơn.",
                theoryHtml: `
                    <div class="space-y-3">
                        <p class="text-xs text-slate-350"><strong class="text-white">Had + V3/ed:</strong> Hành động xảy ra trước trong quá khứ.</p>
                        <p class="text-xs text-slate-350"><strong class="text-white">V2/ed:</strong> Hành động xảy ra sau trong quá khứ.</p>
                        <p class="text-[11px] text-slate-400">Thường đi kèm các từ nối: <strong class="text-teal-450">before, after, by the time</strong>.</p>
                        <ul class="list-disc pl-4 text-[10px] text-slate-405">
                            <li>By the time the inspectors arrived, I had prepared all lesson plans. <span class="italic text-emerald-450">(Vào lúc ban thanh tra đến, tôi đã chuẩn bị xong mọi giáo án.)</span></li>
                        </ul>
                    </div>
                `,
                reading: {
                    passage: "Before the inspectors visited our class, the students had cleaned the room. By the time they sat down, I had already opened my presentation slide.",
                    passageTranslation: "Trước khi các thanh tra viên vào thăm lớp của chúng tôi, học sinh đã dọn sạch phòng học. Vào lúc họ ngồi xuống, tôi đã mở sẵn slide thuyết trình của mình.",
                    questions: [
                        {
                            id: "b1_l5_r1",
                            q: "What had the students done before the inspectors visited the class?",
                            qTranslation: "Học sinh đã làm gì trước khi thanh tra viên vào thăm lớp?",
                            options: ["They had cleaned the room.", "They had opened the slides.", "They had completed the test."],
                            optionsTranslation: ["Chúng đã dọn sạch phòng.", "Chúng đã mở sẵn slides.", "Chúng đã hoàn thành bài thi."],
                            correct: 0,
                            explanation: "Đoạn văn viết: 'Before the inspectors visited our class, the students had cleaned the room'.",
                            studyTip: "Mẹo: Hành động 'had cleaned' diễn ra trước hành động thanh tra 'visited'."
                        },
                        {
                            id: "b1_l5_r2",
                            q: "When did the teacher open the presentation slide?",
                            qTranslation: "Giáo viên mở slide thuyết trình khi nào?",
                            options: ["Before the students cleaned the room", "By the time the inspectors sat down", "After the inspectors left"],
                            optionsTranslation: ["Trước khi học sinh dọn dẹp phòng", "Vào lúc các thanh tra viên ngồi xuống", "Sau khi các thanh tra viên rời đi"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'By the time they sat down, I had already opened my presentation slide'.",
                            studyTip: "Mẹo: 'They sat down' ám chỉ các thanh tra viên."
                        },
                        {
                            id: "b1_l5_r3",
                            q: "Who visited the class?",
                            qTranslation: "Ai đã tới thăm lớp học?",
                            options: ["The parents", "The inspectors", "The school board"],
                            optionsTranslation: ["Phụ huynh học sinh", "Các thanh tra viên", "Ban giám hiệu nhà trường"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'Before the inspectors visited our class...'..",
                            studyTip: "Mẹo: Từ 'inspectors' nghĩa là các thanh tra viên."
                        },
                        {
                            id: "b1_l5_r4",
                            q: "Had the classroom been cleaned before the inspectors arrived?",
                            qTranslation: "Lớp học đã được dọn sạch trước khi thanh tra đến chưa?",
                            options: ["Yes, the students had cleaned it.", "No, they cleaned it during the visit.", "Not mentioned."],
                            optionsTranslation: ["Rồi, học sinh đã dọn dẹp.", "Chưa, họ dọn dẹp trong buổi dự giờ.", "Không đề cập."],
                            correct: 0,
                            explanation: "Đoạn văn ghi 'Before the inspectors visited our class, the students had cleaned the room'.",
                            studyTip: "Mẹo: Hành động dọn dẹp 'had cleaned' ở quá khứ hoàn thành xảy ra trước 'visited'."
                        },
                        {
                            id: "b1_l5_r5",
                            q: "What had the teacher prepared to present?",
                            qTranslation: "Giáo viên đã chuẩn bị cái gì để thuyết trình?",
                            options: ["A print book", "A presentation slide", "A blackboard drawing"],
                            optionsTranslation: ["Một cuốn sách in", "Một trang slide thuyết trình", "Một bức vẽ trên bảng"],
                            correct: 1,
                            explanation: "Đoạn văn ghi 'I had already opened my presentation slide'."
                        }
                    ]
                },
                listening: {
                    audioText: "I had submitted my lesson plan before the head of department asked for it. She was very satisfied with my speed.",
                    audioTranslation: "Tôi đã nộp giáo án của mình trước khi trưởng bộ môn yêu cầu. Cô ấy đã rất hài lòng với tốc độ của tôi.",
                    questions: [
                        {
                            id: "b1_l5_l1",
                            q: "Had the teacher submitted the lesson plan before being asked?",
                            qTranslation: "Giáo viên đã nộp giáo án trước khi bị hỏi hay chưa?",
                            options: ["No, she submitted it after.", "Yes, she had already submitted it.", "No, she forgot to submit it."],
                            optionsTranslation: ["Chưa, cô ấy nộp sau đó.", "Rồi, cô ấy đã nộp từ trước.", "Chưa, cô ấy đã quên nộp."],
                            correct: 1,
                            explanation: "Băng nghe nói: 'I had submitted my lesson plan before the head... asked for it'.",
                            studyTip: "Mẹo: Lắng nghe cấu trúc 'had submitted... before... asked'."
                        },
                        {
                            id: "b1_l5_l2",
                            q: "Who asked for the lesson plan?",
                            qTranslation: "Ai đã yêu cầu nộp giáo án?",
                            options: ["The principal", "The head of department", "The school inspector"],
                            optionsTranslation: ["Hiệu trưởng", "Trưởng bộ môn", "Thanh tra trường"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'before the head of department asked for it'.",
                            studyTip: "Mẹo nghe: Cụm 'head of department' nghĩa là trưởng bộ môn."
                        },
                        {
                            id: "b1_l5_l3",
                            q: "How did the head of department feel about the teacher's speed?",
                            qTranslation: "Trưởng bộ môn cảm thấy thế nào về tốc độ của giáo viên?",
                            options: ["Satisfied", "Disappointed", "Confused"],
                            optionsTranslation: ["Hài lòng", "Thất vọng", "Bối rối"],
                            correct: 0,
                            explanation: "Băng nghe nói: 'She was very satisfied with my speed'.",
                            studyTip: "Mẹo: Từ 'satisfied' nghĩa là hài lòng."
                        },
                        {
                            id: "b1_l5_l4",
                            q: "What had the teacher submitted?",
                            qTranslation: "Giáo viên đã nộp cái gì?",
                            options: ["An exam result sheet", "A lesson plan", "A student homework book"],
                            optionsTranslation: ["Bảng điểm thi", "Giáo án giảng dạy", "Vở bài tập học sinh"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'I had submitted my lesson plan'.",
                            studyTip: "Mẹo: Nghe cụm 'lesson plan'."
                        },
                        {
                            id: "b1_l5_l5",
                            q: "Was the head of department angry?",
                            qTranslation: "Trưởng bộ môn có giận dữ không?",
                            options: ["Yes, she was.", "No, she was very satisfied.", "Not mentioned."],
                            optionsTranslation: ["Có, cô ấy giận dữ.", "Không, cô ấy rất hài lòng.", "Không đề cập."],
                            correct: 1,
                            explanation: "Băng nghe nói: 'She was very satisfied' (cô ấy rất hài lòng).",
                            studyTip: "Mẹo: Nhận biết tính từ mang nghĩa tích cực."
                        }
                    ]
                },
                speaking: {
                    prompt: "Talk about what you had completed before you went to school yesterday morning.",
                    promptTranslation: "Hãy nói về những việc Thầy/Cô đã hoàn tất trước khi đến trường sáng hôm qua.",
                    sampleAnswer: "Before I went to school, I had eaten breakfast and prepared my teaching slides.",
                    sampleTranslation: "Trước khi tôi đến trường, tôi đã ăn sáng và chuẩn bị các slide giảng dạy của mình.",
                    guideTips: "Gợi ý: Dùng cấu trúc 'Before I went... I had V3/ed...'\n\n* 5 CHỦ ĐỀ LUYỆN NÓI THÊM:\n1. Talk about what you had checked before you opened the classroom door.\n2. Describe what you had prepared before you gave the mid-term exam.\n3. Discuss what students had studied before they took the speaking test.\n4. Describe a training session you had completed before joining this school.\n5. Discuss how you had resolved a teaching issue before the supervisor intervened."
                },
                writing: {
                    prompt: "Write a short report (80 words) describing the preparation for a lesson inspection.",
                    promptTranslation: "Viết một báo cáo ngắn (80 từ) mô tả khâu chuẩn bị cho một tiết dự giờ thanh tra.",
                    suggestedVocab: "inspectors (thanh tra), print (in ấn), clean (dọn dẹp), classroom, past perfect.\n\n* 5 ĐỀ BÀI LUYỆN VIẾT THÊM:\n1. Write 3 sentences about what you had done before the parent-teacher meeting.\n2. Write 3 sentences about what students had prepared before the school festival.\n3. Write 3 sentences about what you had printed before the class started.\n4. Write a brief report about what had happened before the school board arrived.\n5. Write 3 sentences about what you had written on the board before the lesson.",
                    sampleAnswer: "Yesterday, my class was inspected by senior educators. We had spent three days preparing for it. Before they entered, my students had cleaned the classroom and decorated the notice board. I had also printed out all lesson plans and checked the projector. By the time they sat at the back of the room, everything had been prepared perfectly. The lesson went well, and I received positive feedback afterwards."
                }
            }
        ]
    },
    // ==========================================
    // CẤP ĐỘ B2 (TRUNG CẤP KHÁ) - 5 BÀI HỌC
    // ==========================================
    B2: {
        lessons: [
            {
                id: "b2_lesson_1",
                title: "Bài 1: Xử lý khủng hoảng sư phạm & Xung đột học đường",
                description: "Học cách sử dụng Câu điều kiện loại 3 và Câu điều kiện hỗn hợp để lập luận và rút kinh nghiệm từ các sự việc quá khứ.",
                lectureText: "Chào Thầy Cô, sau đây là bài giảng về Câu điều kiện nâng cao. Ta dùng điều kiện loại 3 cho tình huống hoàn toàn trái thực tế trong quá khứ. Mệnh đề nếu chia quá khứ hoàn thành had cộng phân từ 3, mệnh đề kết quả chia would have cộng phân từ 3. Ví dụ, If I had known the rule, I would have avoided the mistake nghĩa là nếu lúc đó tôi biết luật, tôi đã tránh được sai lầm.",
                theoryHtml: `
                    <div class="space-y-3">
                        <p class="text-xs text-slate-350"><strong class="text-white">Loại 3 (Trái thực tế quá khứ):</strong><br>
                        If + S + had + V3/ed, S + would + have + V3/ed<br>
                        <span class="italic text-emerald-450">Ví dụ: If I had warned the student, he would not have made that mistake. (Nếu tôi cảnh báo học sinh từ trước, em ấy đã không phạm sai lầm đó.)</span></p>
                        <p class="text-xs text-slate-350"><strong class="text-white">Điều kiện hỗn hợp (Mixed Conditionals):</strong><br>
                        Giả thuyết quá khứ dẫn đến kết quả hiện tại:<br>
                        If + S + had + V3/ed, S + would + V (now)<br>
                        <span class="italic text-emerald-450">Ví dụ: If they had studied hard last night, they would pass the test now. (Nếu tối qua học bài thì bây giờ đã đỗ.)</span></p>
                    </div>
                `,
                reading: {
                    passage: "If the teacher had resolved the conflict immediately, the students would not have argued so loudly. If she had established clear regulations from the beginning, classroom management would be much easier now.",
                    passageTranslation: "Nếu giáo viên giải quyết xung đột ngay lập tức, học sinh đã không tranh cãi to tiếng như vậy. Nếu cô ấy thiết lập các quy định rõ ràng từ đầu, việc quản lý lớp học bây giờ sẽ dễ dàng hơn nhiều.",
                    questions: [
                        {
                            id: "b2_l1_r1",
                            q: "What is the consequence of not establishing regulations from the beginning?",
                            qTranslation: "Hậu quả của việc không thiết lập nội quy ngay từ đầu là gì?",
                            options: ["The students argued loudly.", "Classroom management is hard now.", "The projector crashed yesterday."],
                            optionsTranslation: ["Học sinh cãi nhau to.", "Quản lý lớp học bây giờ rất khó khăn.", "Máy chiếu bị hỏng hôm qua."],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'If she had established clear regulations from the beginning, classroom management would be much easier now' (ngụ ý hiện tại quản lý khó khăn vì quá khứ không làm).",
                            studyTip: "Mẹo: Mệnh đề kết quả của câu điều kiện hỗn hợp chỉ thực tế hiện tại 'would be... now'."
                        },
                        {
                            id: "b2_l1_r2",
                            q: "What would have happened if the teacher had resolved the conflict immediately?",
                            qTranslation: "Điều gì đáng lẽ đã xảy ra nếu giáo viên giải quyết xung đột ngay lập tức?",
                            options: ["The students would have argued louder.", "The students would not have argued so loudly.", "The students would have left the class."],
                            optionsTranslation: ["Học sinh đáng lẽ đã cãi nhau to hơn.", "Học sinh đáng lẽ đã không cãi nhau to tiếng đến thế.", "Học sinh đáng lẽ đã bỏ lớp học."],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'If the teacher had resolved the conflict immediately, the students would not have argued so loudly'.",
                            studyTip: "Mẹo: Đọc cấu trúc câu điều kiện loại 3 diễn tả giả thuyết quá khứ."
                        },
                        {
                            id: "b2_l1_r3",
                            q: "How is classroom management now because clear regulations were not established?",
                            qTranslation: "Việc quản lý lớp học bây giờ thế nào do nội quy rõ ràng không được thiết lập?",
                            options: ["It is much easier.", "It is much harder.", "It is not affected."],
                            optionsTranslation: ["Dễ dàng hơn nhiều.", "Khó khăn hơn nhiều.", "Không bị ảnh hưởng."],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'If she had established clear regulations from the beginning, classroom management would be much easier now' (ngụ ý hiện tại việc quản lý rất khó khăn).",
                            studyTip: "Mẹo: Suy luận từ mệnh đề kết quả của câu điều kiện hỗn hợp."
                        },
                        {
                            id: "b2_l1_r4",
                            q: "Who resolved the conflict in the passage?",
                            qTranslation: "Ai đã giải quyết xung đột trong đoạn văn?",
                            options: ["The principal", "The students", "The teacher"],
                            optionsTranslation: ["Hiệu trưởng", "Học sinh", "Giáo viên"],
                            correct: 2,
                            explanation: "Đoạn văn nhắc tới: 'If the teacher had resolved...'..",
                            studyTip: "Mẹo: Từ khóa chủ ngữ 'the teacher'."
                        },
                        {
                            id: "b2_l1_r5",
                            q: "What does the author suggest doing from the beginning?",
                            qTranslation: "Tác giả đề xuất nên làm gì ngay từ đầu?",
                            options: ["Establish clear regulations", "Hire a coordinator", "Ignore minor arguments"],
                            optionsTranslation: ["Thiết lập nội quy rõ ràng", "Thuê người điều phối", "Bỏ qua các tranh cãi nhỏ"],
                            correct: 0,
                            explanation: "Đoạn văn ghi: 'If she had established clear regulations from the beginning...'..",
                            studyTip: "Mẹo: Tìm từ khóa 'clear regulations' (nội quy rõ ràng)."
                        }
                    ]
                },
                listening: {
                    audioText: "If we had trained our teachers in technology last year, they would have designed better online quizzes. If I had known about the network error, I would have printed the handouts.",
                    audioTranslation: "Nếu chúng ta tập huấn công nghệ cho giáo viên vào năm ngoái, họ đã thiết kế được các trò chơi trắc nghiệm online tốt hơn. Nếu tôi biết về lỗi mạng, tôi đã in tài liệu phát tay.",
                    questions: [
                        {
                            id: "b2_l1_l1",
                            q: "What would the teacher have done if she had known about the network error?",
                            qTranslation: "Giáo viên đáng lẽ đã làm gì nếu cô ấy biết về lỗi mạng?",
                            options: ["Cancelled the class", "Printed the handouts", "Hired a technician"],
                            optionsTranslation: ["Hủy lớp học", "In tài liệu phát tay", "Thuê kỹ thuật viên"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'If I had known about the network error, I would have printed the handouts'.",
                            studyTip: "Mẹo nghe: Chú ý nghe cụm từ 'printed the handouts' (in tài liệu phát tay)."
                        },
                        {
                            id: "b2_l1_l2",
                            q: "What would teachers have designed if they had been trained in technology last year?",
                            qTranslation: "Giáo viên đáng lẽ đã thiết kế được cái gì nếu họ được tập huấn công nghệ năm ngoái?",
                            options: ["Paper exercises", "Better online quizzes", "School websites"],
                            optionsTranslation: ["Các bài tập giấy", "Các trò chơi trắc nghiệm online tốt hơn", "Các trang web trường học"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'they would have designed better online quizzes'.",
                            studyTip: "Mẹo: Nghe cụm 'better online quizzes'."
                        },
                        {
                            id: "b2_l1_l3",
                            q: "When did the speaker hypothetically want to train the teachers?",
                            qTranslation: "Người nói giả định muốn tập huấn giáo viên vào thời điểm nào?",
                            options: ["Last year", "This year", "Next semester"],
                            optionsTranslation: ["Năm ngoái", "Năm nay", "Học kỳ tới"],
                            correct: 0,
                            explanation: "Băng nghe nói: 'If we had trained our teachers in technology last year'.",
                            studyTip: "Mẹo: Nghe từ chỉ thời gian 'last year'."
                        },
                        {
                            id: "b2_l1_l4",
                            q: "What error did the speaker mention?",
                            qTranslation: "Lỗi gì đã được người nói đề cập?",
                            options: ["A grammar error", "A network error", "A printing error"],
                            optionsTranslation: ["Lỗi ngữ pháp", "Lỗi mạng internet", "Lỗi in ấn"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'If I had known about the network error'.",
                            studyTip: "Mẹo nghe: Cụm 'network error' nghĩa là lỗi mạng."
                        },
                        {
                            id: "b2_l1_l5",
                            q: "Did the speaker print the handouts?",
                            qTranslation: "Người nói có in tài liệu phát tay từ trước không?",
                            options: ["Yes, she did.", "No, she did not (because she didn't know about the error).", "Not mentioned."],
                            optionsTranslation: ["Có, cô ấy đã in.", "Không, cô ấy đã không in (vì không biết có lỗi mạng).", "Không đề cập."],
                            correct: 1,
                            explanation: "Băng sử dụng câu điều kiện loại 3 'If I had known... I would have printed' diễn tả việc thực tế trong quá khứ là không in vì không biết lỗi.",
                            studyTip: "Mẹo: Câu điều kiện loại 3 diễn tả việc hoàn toàn trái ngược với quá khứ."
                        }
                    ]
                },
                speaking: {
                    prompt: "If you had chosen a different career path years ago, what job would you do now?",
                    promptTranslation: "Nếu Thầy/Cô chọn một lộ trình sự nghiệp khác nhiều năm trước, Thầy/Cô sẽ làm nghề gì bây giờ?",
                    sampleAnswer: "If I had not become a teacher, I would have worked as an accountant now.",
                    sampleTranslation: "Nếu tôi không trở thành giáo viên, tôi đáng lẽ đã làm việc như một kế toán bây giờ.",
                    guideTips: "Gợi ý: Dùng câu điều kiện hỗn hợp: 'If I had not + V3... I would V... now'.\n\n* 5 CHỦ ĐỀ LUYỆN NÓI THÊM:\n1. Talk about a classroom crisis you resolved. What would have happened if you hadn't intervened?\n2. Discuss a school project. If you had started it earlier, how would the outcome change?\n3. If you had learned another language before English, how would it affect your career now?\n4. Talk about a teacher training session. If you had skipped it, what skills would you miss?\n5. Describe a student conflict. If you had ignored it, how would the classroom atmosphere be today."
                },
                writing: {
                    prompt: "Write a short essay (120 words) analyzing a classroom conflict you successfully resolved, using conditional sentences.",
                    promptTranslation: "Write a short essay (120 words) analyzing a classroom conflict you successfully resolved, using conditional sentences.",
                    suggestedVocab: "conflict (xung đột), intervene (can thiệp), resolve (giải quyết), conditional.\n\n* 5 ĐỀ BÀI LUYỆN VIẾT THÊM:\n1. Write 3 sentences about a lesson you taught. What would you have changed if you had had more time?\n2. Write a paragraph analyzing how a school rule has helped. What would have happened without it?\n3. Write 3 sentences about a grading error. How would you have fixed it if the parent hadn't noticed?\n4. Write a formal request about classroom resources using conditional sentences.\n5. Write 3 sentences about what would have changed if online learning had not been introduced.",
                    sampleAnswer: "Last semester, two of my students had a severe argument during group work. If I had not intervened immediately, the situation would have become much worse. I separated them and discussed the issue calmly. If they had listened to each other from the start, they would not have had such a conflict. We resolved it by sharing tasks fairly. Now, they are close friends. If I had chosen to ignore their argument, our classroom atmosphere would be negative today. This taught me that timely intervention is key to managing school conflicts effectively."
                }
            },
            {
                id: "b2_lesson_2",
                title: "Bài 2: Tường thuật chỉ đạo chuyên môn của Ban giám hiệu",
                description: "Học cách sử dụng Lời nói gián tiếp và Câu tường thuật phức tạp để truyền đạt ý kiến chỉ đạo chuyên môn.",
                lectureText: "Chào Thầy Cô, sau đây là bài giảng về Câu gián tiếp. Khi tường thuật lại lời nói của người khác, ta cần lùi thì và thay đổi các đại từ và từ chỉ thời gian phù hợp. Ví dụ, thì hiện tại đơn lùi thành quá khứ đơn, will lùi thành would, today lùi thành that day. Thầy Cô chú ý trật tự câu hỏi gián tiếp không mượn trợ động từ mà chia giống câu khẳng định.",
                theoryHtml: `
                    <div class="space-y-3">
                        <p class="text-xs text-slate-350"><strong class="text-white">Quy tắc lùi thì (Tense Backshift):</strong><br>
                        • Present Simple -> Past Simple<br>
                        • Present Perfect -> Past Perfect<br>
                        • Will -> Would / Can -> Could</p>
                        <p class="text-xs text-slate-350"><strong class="text-white">Câu hỏi gián tiếp:</strong> S + asked + (O) + if/whether/Wh-word + S + V (không đảo trợ động từ).<br>
                        <span class="italic text-emerald-450">Ví dụ: The principal asked me if I had finished the report.</span></p>
                    </div>
                `,
                reading: {
                    passage: "The principal announced that the school board had approved the new technology budget. He asked the teachers whether they were ready to implement online teaching software the following month.",
                    passageTranslation: "Hiệu trưởng thông báo rằng hội đồng nhà trường đã phê duyệt ngân sách công nghệ mới. Thầy hỏi các giáo viên liệu họ đã sẵn sàng triển khai phần mềm dạy học trực tuyến vào tháng sau hay chưa.",
                    questions: [
                        {
                            id: "b2_l2_r1",
                            q: "What did the principal ask the teachers?",
                            qTranslation: "Hiệu trưởng đã hỏi giáo viên điều gì?",
                            options: ["If they wanted to change classrooms", "Whether they were ready to implement online software", "If they had finished grading exams"],
                            optionsTranslation: ["Liệu họ có muốn đổi phòng học", "Liệu họ đã sẵn sàng áp dụng phần mềm online", "Liệu họ đã chấm xong bài thi"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'He asked the teachers whether they were ready to implement online teaching software'.",
                            studyTip: "Mẹo: Câu hỏi gián tiếp sử dụng từ nối 'whether' tương đương 'if'."
                        },
                        {
                            id: "b2_l2_r2",
                            q: "What budget did the school board approve?",
                            qTranslation: "Hội đồng nhà trường đã phê duyệt ngân sách nào?",
                            options: ["The library budget", "The new technology budget", "The building decoration budget"],
                            optionsTranslation: ["Ngân sách thư viện", "Ngân sách công nghệ mới", "Ngân sách trang trí tòa nhà"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'the school board had approved the new technology budget'.",
                            studyTip: "Mẹo: Từ khóa 'new technology budget'."
                        },
                        {
                            id: "b2_l2_r3",
                            q: "When did the principal ask the teachers to implement the online teaching software?",
                            qTranslation: "Hiệu trưởng hỏi giáo viên triển khai phần mềm dạy học trực tuyến vào khi nào?",
                            options: ["Immediately", "The following month", "Next year"],
                            optionsTranslation: ["Ngay lập tức", "Tháng sau đó", "Năm tới"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'implement online teaching software the following month'.",
                            studyTip: "Mẹo: Trạng từ gián tiếp 'the following month' tương đương với 'next month' trong câu trực tiếp."
                        },
                        {
                            id: "b2_l2_r4",
                            q: "Who approved the technology budget?",
                            qTranslation: "Ai đã phê duyệt ngân sách công nghệ?",
                            options: ["The English department", "The school board", "The local bank"],
                            optionsTranslation: ["Tổ bộ môn Tiếng Anh", "Hội đồng nhà trường", "Ngân hàng địa phương"],
                            correct: 1,
                            explanation: "Đoạn văn ghi 'announced that the school board had approved...'..",
                            studyTip: "Mẹo: Từ khóa 'school board' nghĩa là hội đồng trường học."
                        },
                        {
                            id: "b2_l2_r5",
                            q: "What did the principal announce?",
                            qTranslation: "Hiệu trưởng đã thông báo điều gì?",
                            options: ["That the budget was cancelled", "That the new technology budget was approved", "That the school would close"],
                            optionsTranslation: ["Rằng ngân sách bị hủy", "Rằng ngân sách công nghệ mới đã được duyệt", "Rằng trường học sẽ đóng cửa"],
                            correct: 1,
                            explanation: "Đoạn văn ghi: 'announced that the school board had approved the new technology budget'.",
                            studyTip: "Mẹo: Đọc thông tin sau từ 'announced that'."
                        }
                    ]
                },
                listening: {
                    audioText: "My colleague told me that the department head had rejected my lesson plan. She suggested that I should modify the exercises to make them easier.",
                    audioTranslation: "Đồng nghiệp của tôi bảo tôi rằng trưởng bộ môn đã từ chối giáo án của tôi. Cô ấy đề xuất tôi nên chỉnh sửa các bài tập để chúng dễ hơn.",
                    questions: [
                        {
                            id: "b2_l2_l1",
                            q: "What did the department head do according to the colleague?",
                            qTranslation: "Trưởng bộ môn đã làm gì theo lời của đồng nghiệp?",
                            options: ["Approved the lesson plan", "Rejected the lesson plan", "Taught the class instead"],
                            optionsTranslation: ["Phê duyệt giáo án", "Từ chối giáo án", "Dạy thay lớp đó"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'the department head had rejected my lesson plan'.",
                            studyTip: "Mẹo nghe: Từ khóa 'rejected' nghĩa là bác bỏ, từ chối."
                        },
                        {
                            id: "b2_l2_l2",
                            q: "Who rejected the teacher's lesson plan?",
                            qTranslation: "Ai đã từ chối giáo án của giáo viên?",
                            options: ["The principal", "The department head", "Another colleague"],
                            optionsTranslation: ["Hiệu trưởng", "Trưởng tổ bộ môn", "Một đồng nghiệp khác"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'the department head had rejected my lesson plan'.",
                            studyTip: "Mẹo nghe: Cụm 'department head' nghĩa là trưởng bộ môn."
                        },
                        {
                            id: "b2_l2_l3",
                            q: "What suggestion did the colleague give?",
                            qTranslation: "Đồng nghiệp đã đưa ra đề xuất gì?",
                            options: ["To write a new lesson plan", "To modify the exercises to make them easier", "To cancel the exercises"],
                            optionsTranslation: ["Viết một giáo án mới hoàn toàn", "Chỉnh sửa bài tập để chúng dễ hơn", "Hủy bỏ các bài tập"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'She suggested that I should modify the exercises to make them easier'.",
                            studyTip: "Mẹo: Nghe động từ 'modify' (chỉnh sửa) và 'make them easier' (làm chúng dễ hơn)."
                        },
                        {
                            id: "b2_l2_l4",
                            q: "Who told the teacher about the rejection?",
                            qTranslation: "Ai đã nói với giáo viên về việc bị từ chối?",
                            options: ["The department head", "A colleague", "A student"],
                            optionsTranslation: ["Trưởng bộ môn", "Một người đồng nghiệp", "Một học sinh"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'My colleague told me that...'..",
                            studyTip: "Mẹo: Từ khóa chủ ngữ 'colleague' (đồng nghiệp)."
                        },
                        {
                            id: "b2_l2_l5",
                            q: "What was rejected?",
                            qTranslation: "Cái gì đã bị từ chối?",
                            options: ["A research paper", "A lesson plan", "A test schedule"],
                            optionsTranslation: ["Một bài nghiên cứu", "Một giáo án giảng dạy", "Một lịch thi"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'rejected my lesson plan' (từ chối giáo án của tôi).",
                            studyTip: "Mẹo: Nghe từ khóa 'lesson plan'."
                        }
                    ]
                },
                speaking: {
                    prompt: "Report what your school director told you yesterday about the next teachers' meeting. Use reported speech.",
                    promptTranslation: "Hãy tường thuật lại những gì hiệu trưởng bảo Thầy/Cô hôm qua về buổi họp giáo viên sắp tới. Dùng câu gián tiếp.",
                    sampleAnswer: "She told me that the meeting would start at 8 AM and asked me to prepare a speech.",
                    sampleTranslation: "Cô ấy bảo tôi rằng cuộc họp sẽ bắt đầu lúc 8 giờ sáng và yêu cầu tôi chuẩn bị một bài phát biểu.",
                    guideTips: "Gợi ý: Lùi 'will' thành 'would', lùi thì động từ 'start' -> 'would start'.\n\n* 5 CHỦ ĐỀ LUYỆN NÓI THÊM:\n1. Report a principal's instruction about exam security.\n2. Tường thuật lại ý kiến của đồng nghiệp về phương pháp dạy nói tiếng Anh.\n3. Report what parents asked you in the yesterday meeting.\n4. Describe a department head's guidelines about online quizzes.\n5. Report a student's excuse for not doing homework using indirect speech."
                },
                writing: {
                    prompt: "Write a short notice (100 words) summarizing the principal's decisions in yesterday's meeting.",
                    promptTranslation: "Viết một thông báo ngắn (100 từ) tóm tắt các quyết định của hiệu trưởng trong cuộc họp ngày hôm qua.",
                    suggestedVocab: "announce (thông báo), state (phát biểu), implement (áp dụng), reported speech.\n\n* 5 ĐỀ BÀI LUYỆN VIẾT THÊM:\n1. Write a short email reporting a principal's decision to change lesson hours.\n2. Write 3 sentences summarizing what the head of department asked you to prepare.\n3. Write a brief note to students reporting the principal's rules for sports day.\n4. Write 3 sentences about a colleague's complaint about internet speed.\n5. Write a short paragraph reporting parent feedback about homework.",
                    sampleAnswer: "In yesterday's meeting, the principal announced that our school would implement a new online grading system starting next month. He stated that the old software had caused many issues. He asked all teachers to attend a training session on Friday. He also requested that we submit our monthly reports before Wednesday. Finally, he expressed hope that the new technology would improve our workflow and make communications with parents easier."
                }
            },
            {
                id: "b2_lesson_3",
                title: "Bài 3: Cụm động từ (Phrasal Verbs) trong đời sống học đường",
                description: "Làm chủ việc sử dụng các cụm động từ chuyên ngành giáo dục để giao tiếp tự nhiên và giải quyết bài thi CEFR.",
                lectureText: "Chào Thầy Cô, sau đây là bài giảng về Cụm động từ. Cụm động từ được cấu tạo bởi động từ đi kèm giới từ để tạo ra nghĩa hoàn toàn mới. Ví dụ carry out nghĩa là tiến hành, thực hiện. Hand in nghĩa là nộp bài. Catch up with nghĩa là đuổi kịp, theo kịp bài học. Luyện tập cụm động từ giúp viết văn tự nhiên và tránh các bẫy giới từ trong bài thi.",
                theoryHtml: `
                    <div class="space-y-3">
                        <p class="text-xs text-slate-350"><strong class="text-white">Các cụm động từ thông dụng:</strong><br>
                        • <strong class="text-teal-400">Carry out:</strong> Tiến hành <span class="italic text-slate-400">(carry out a project)</span><br>
                        • <strong class="text-teal-400">Hand in:</strong> Nộp bài <span class="italic text-slate-400">(hand in homework)</span><br>
                        • <strong class="text-teal-400">Catch up:</strong> Theo kịp <span class="italic text-slate-400">(catch up with classmates)</span><br>
                        • <strong class="text-teal-400">Drop out:</strong> Bỏ học giữa chừng <span class="italic text-slate-400">(drop out of school)</span><br>
                        • <strong class="text-teal-400">Write down:</strong> Ghi chép nhanh <span class="italic text-slate-400">(write down key terms)</span></p>
                    </div>
                `,
                reading: {
                    passage: "The school board decided to carry out a survey before introducing the new curriculum. They wanted to prevent students from dropping out due to academic pressure.",
                    passageTranslation: "Ban giám hiệu nhà trường quyết định tiến hành một cuộc khảo sát trước khi đưa vào chương trình giảng dạy mới. Họ muốn ngăn học sinh bỏ học giữa chừng vì áp lực học hành.",
                    questions: [
                        {
                            id: "b2_l3_r1",
                            q: "Why did they carry out the survey?",
                            qTranslation: "Tại sao họ lại tiến hành khảo sát?",
                            options: ["To choose a new principal", "To prevent students from dropping out", "To reward excellent teachers"],
                            optionsTranslation: ["Để chọn hiệu trưởng mới", "Để ngăn học sinh bỏ học giữa chừng", "Để khen thưởng giáo viên xuất sắc"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'decided to carry out a survey... to prevent students from dropping out'.",
                            studyTip: "Mẹo: Từ khóa 'carry out' tương đương 'conduct' (tiến hành), 'dropping out' nghĩa là bỏ học."
                        },
                        {
                            id: "b2_l3_r2",
                            q: "What did the school board decide to introduce?",
                            qTranslation: "Ban giám hiệu nhà trường quyết định giới thiệu cái gì?",
                            options: ["A new grading system", "A new curriculum", "A new computer game"],
                            optionsTranslation: ["Một hệ thống tính điểm mới", "Một chương trình học mới", "Một trò chơi điện tử mới"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'before introducing the new curriculum'.",
                            studyTip: "Mẹo: Từ 'curriculum' nghĩa là chương trình học."
                        },
                        {
                            id: "b2_l3_r3",
                            q: "What was the pressure that caused students to drop out?",
                            qTranslation: "Áp lực nào khiến học sinh bỏ học giữa chừng?",
                            options: ["Financial pressure", "Academic pressure", "Family pressure"],
                            optionsTranslation: ["Áp lực tài chính", "Áp lực học tập", "Áp lực gia đình"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'dropping out due to academic pressure' (bỏ học vì áp lực học tập).",
                            studyTip: "Mẹo: Cụm 'academic pressure' nghĩa là áp lực học tập."
                        },
                        {
                            id: "b2_l3_r4",
                            q: "Who decided to carry out the survey?",
                            qTranslation: "Ai đã quyết định tiến hành khảo sát?",
                            options: ["The parents", "The school board", "The English department"],
                            optionsTranslation: ["Phụ huynh học sinh", "Ban giám hiệu nhà trường", "Tổ tiếng Anh"],
                            correct: 1,
                            explanation: "Đoạn văn ghi: 'The school board decided to carry out...'..",
                            studyTip: "Mẹo: Từ 'school board' chỉ ban giám hiệu."
                        },
                        {
                            id: "b2_l3_r5",
                            q: "What does the phrasal verb 'carry out' mean in this context?",
                            qTranslation: "Cụm động từ 'carry out' nghĩa là gì trong ngữ cảnh này?",
                            options: ["To stop", "To conduct/perform", "To design"],
                            optionsTranslation: ["Dừng lại", "Tiến hành/thực hiện", "Thiết kế"],
                            correct: 1,
                            explanation: "Carry out a survey nghĩa là tiến hành một cuộc khảo sát.",
                            studyTip: "Mẹo: 'Carry out' đồng nghĩa với 'conduct'."
                        }
                    ]
                },
                listening: {
                    audioText: "Please tell the class to write down the vocabulary list. They must hand in their exercises before they leave.",
                    audioTranslation: "Làm ơn hãy bảo cả lớp ghi chép lại danh sách từ vựng. Các em phải nộp bài tập của mình trước khi ra về.",
                    questions: [
                        {
                            id: "b2_l3_l1",
                            q: "What must students do before they leave the classroom?",
                            qTranslation: "Học sinh phải làm gì trước khi rời khỏi lớp học?",
                            options: ["Read a story", "Hand in their exercises", "Clean the classroom"],
                            optionsTranslation: ["Đọc truyện", "Nộp lại bài tập", "Dọn dẹp lớp học"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'They must hand in their exercises before they leave'.",
                            studyTip: "Mẹo nghe: Cụm 'hand in' nghĩa là nộp lại bài làm."
                        },
                        {
                            id: "b2_l3_l2",
                            q: "What must students do before they leave?",
                            qTranslation: "Học sinh phải làm gì trước khi họ ra về?",
                            options: ["Sing a song", "Hand in their exercises", "Ask for permission"],
                            optionsTranslation: ["Hát một bài hát", "Nộp bài tập của mình", "Xin phép"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'They must hand in their exercises before they leave'.",
                            studyTip: "Mẹo nghe: Cụm 'hand in' nghĩa là nộp lại bài làm."
                        },
                        {
                            id: "b2_l3_l3",
                            q: "What did the speaker tell the class to write down?",
                            qTranslation: "Người nói đã bảo cả lớp ghi chép cái gì?",
                            options: ["The school rules", "The vocabulary list", "The exam dates"],
                            optionsTranslation: ["Nội quy trường học", "Danh sách từ vựng", "Ngày thi cử"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'Please tell the class to write down the vocabulary list'.",
                            studyTip: "Mẹo: Cụm 'write down' nghĩa là ghi chép lại."
                        },
                        {
                            id: "b2_l3_l4",
                            q: "What does the phrasal verb 'hand in' mean?",
                            qTranslation: "Cụm động từ 'hand in' nghĩa là gì?",
                            options: ["To copy", "To submit", "To clean"],
                            optionsTranslation: ["Sao chép", "Nộp/đệ trình", "Dọn dẹp"],
                            correct: 1,
                            explanation: "Hand in exercises có nghĩa là nộp bài tập (submit).",
                            studyTip: "Mẹo: Liên hệ 'hand in' với hành động nộp bài."
                        },
                        {
                            id: "b2_l3_l5",
                            q: "Who is the speaker talking to?",
                            qTranslation: "Người nói đang nói chuyện với ai?",
                            options: ["A student", "Another teacher or assistant", "The principal"],
                            optionsTranslation: ["Một học sinh", "Một giáo viên khác hoặc trợ giảng", "Hiệu trưởng"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'Please tell the class to...' (Làm ơn hãy bảo cả lớp...). Giọng nói hướng tới một người trung gian để nhờ truyền đạt.",
                            studyTip: "Mẹo: Cụm từ 'Please tell the class' thể hiện giao tiếp nhờ vả đồng nghiệp."
                        }
                    ]
                },
                speaking: {
                    prompt: "Share your experience with students who fell behind. How did you help them catch up?",
                    promptTranslation: "Hãy chia sẻ kinh nghiệm của Thầy/Cô với những học sinh bị tụt lại phía sau. Thầy/Cô đã giúp các em theo kịp bằng cách nào?",
                    sampleAnswer: "I carried out extra classes after school. This helped slow students catch up with their friends.",
                    sampleTranslation: "Tôi đã tiến hành các lớp phụ đạo sau giờ học. Điều này đã giúp học sinh chậm theo kịp các bạn.",
                    guideTips: "Gợi ý: Dùng các cụm động từ 'carry out' (tiến hành), 'catch up with' (theo kịp).\n\n* 5 CHỦ ĐỀ LUYỆN NÓI THÊM:\n1. Talk about how you carry out online classes. What problems do you face?\n2. Discuss a student who almost dropped out. How did you help them?\n3. Talk about how you write down lesson ideas during the day.\n4. Describe how you ask students to hand in their tests.\n5. Discuss how you catch up with new educational trends."
                },
                writing: {
                    prompt: "Write an email (100 words) to another teacher discussing a student who has decided to drop out.",
                    promptTranslation: "Viết một email (100 từ) gửi một giáo viên khác thảo luận về một học sinh đã quyết định bỏ học giữa chừng.",
                    suggestedVocab: "drop out (bỏ học), catch up (theo kịp), family issues (vấn đề gia đình), carry out.\n\n* 5 ĐỀ BÀI LUYỆN VIẾT THÊM:\n1. Write a formal letter requesting to carry out a school field trip.\n2. Write 3 sentences advising a student who has fallen behind to catch up.\n3. Write 3 sentences reminding students of the deadline to hand in their project.\n4. Write a short paragraph about how high workload causes teachers to drop out.\n5. Write 3 sentences explaining what you wrote down in the meeting.",
                    sampleAnswer: "Hi Ms. Lan, I am writing to discuss Huy, a student in my class. He told me yesterday that he wanted to drop out of school due to severe family issues. Lately, he has fallen behind and struggled to catch up with our English lessons. I want to carry out a home visit to talk to his parents this weekend. If we had some budget, we would support him financially. Please let me know if you can join me to talk to his family. We should try our best to help him. Best, Minh."
                }
            },
            {
                id: "b2_lesson_4",
                title: "Bài 4: Đề xuất ứng dụng AI cải tiến thiết kế bài giảng",
                description: "Học cách sử dụng Thể Giả định (Subjunctive Mood) để đưa ra các đề xuất cải tiến giáo dục một cách trang trọng, chuyên nghiệp.",
                lectureText: "Chào Thầy Cô, sau đây là bài giảng về Thể Giả Định. Thể giả định được dùng để nhấn mạnh tính khẩn thiết hoặc đưa ra lời đề nghị trang trọng. Cấu trúc thường là It is essential that hoặc I recommend that, theo sau là chủ ngữ cộng động từ ở dạng nguyên thể không chia cho mọi ngôi chủ ngữ. Ví dụ, It is essential that he join the meeting, từ join giữ nguyên không thêm s cho dù chủ ngữ là he.",
                theoryHtml: `
                    <div class="space-y-3">
                        <p class="text-xs text-slate-350"><strong class="text-white">Cấu trúc Giả định chính thức:</strong><br>
                        • It is essential/important/vital/necessary that + S + V(nguyên thể)<br>
                        • S + recommend/suggest/propose that + S + V(nguyên thể)</p>
                        <p class="text-[11px] text-slate-400">Động từ sau <strong class="text-teal-450">that</strong> bắt buộc ở dạng <strong class="text-teal-450">nguyên thể không chia (bare infinitive)</strong> cho tất cả các ngôi chủ ngữ (he/she/it cũng giữ nguyên, không thêm s/es).</p>
                    </div>
                `,
                reading: {
                    passage: "To optimize online classrooms, it is essential that every teacher implement AI interactive tools. Many educators recommend that the school board organize training sessions immediately.",
                    passageTranslation: "Để tối ưu hóa các lớp học trực tuyến, điều cần thiết là mọi giáo viên phải áp dụng các công cụ tương tác AI. Nhiều nhà giáo dục khuyến nghị ban giám hiệu nhà trường tổ chức các buổi tập huấn ngay lập tức.",
                    questions: [
                        {
                            id: "b2_l4_r1",
                            q: "What is essential for teachers to do to optimize online classrooms?",
                            qTranslation: "Điều gì là cần thiết cho giáo viên làm để tối ưu hóa lớp học online?",
                            options: ["Grade exams by hand", "Implement AI interactive tools", "Buy new blackboards"],
                            optionsTranslation: ["Chấm thi bằng tay", "Áp dụng công cụ tương tác AI", "Mua bảng đen mới"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'it is essential that every teacher implement AI interactive tools' (động từ 'implement' ở dạng nguyên thể).",
                            studyTip: "Mẹo: Nhận biết thể giả định qua tính từ 'essential' và động từ nguyên thể 'implement' đi với chủ ngữ số ít 'every teacher'."
                        },
                        {
                            id: "b2_l4_r2",
                            q: "What do many educators recommend that the school board do?",
                            qTranslation: "Nhiều nhà giáo dục khuyên ban giám hiệu nhà trường làm gì?",
                            options: ["Buy more computers", "Organize training sessions immediately", "Decrease homework quantity"],
                            optionsTranslation: ["Mua thêm máy tính", "Tổ chức các buổi tập huấn ngay lập tức", "Giảm lượng bài tập về nhà"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'Many educators recommend that the school board organize training sessions immediately'.",
                            studyTip: "Mẹo: Từ khóa 'recommend that... organize'."
                        },
                        {
                            id: "b2_l4_r3",
                            q: "Why do teachers need to implement AI interactive tools?",
                            qTranslation: "Tại sao giáo viên cần áp dụng các công cụ tương tác AI?",
                            options: ["To play video games", "To optimize online classrooms", "To reduce salary cost"],
                            optionsTranslation: ["Để chơi điện tử", "Để tối ưu hóa lớp học trực tuyến", "Để giảm chi phí lương"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'To optimize online classrooms, it is essential that every teacher implement...'..",
                            studyTip: "Mẹo: Đọc câu đầu tiên để tìm mục đích."
                        },
                        {
                            id: "b2_l4_r4",
                            q: "What form of the verb 'organize' is used after 'recommend that the school board'?",
                            qTranslation: "Dạng động từ nào của 'organize' được dùng sau 'recommend that the school board'?",
                            options: ["Organizes", "Organized", "Organize (bare infinitive)"],
                            optionsTranslation: ["Organizes", "Organized", "Organize (động từ nguyên thể)"],
                            correct: 2,
                            explanation: "Vì đây là thể giả định (subjunctive mood), động từ đi sau 'recommend that' ở dạng nguyên thể không chia.",
                            studyTip: "Mẹo: Thể giả định bắt buộc động từ ở dạng nguyên mẫu."
                        },
                        {
                            id: "b2_l4_r5",
                            q: "Is the verb 'implement' singular or plural in 'every teacher implement'?",
                            qTranslation: "Động từ 'implement' ở dạng số ít hay số nhiều trong cụm 'every teacher implement'?",
                            options: ["Singular (implements)", "Plural (implement)", "Base form (bare infinitive)"],
                            optionsTranslation: ["Số ít (implements)", "Số nhiều (implement)", "Dạng nguyên thể không chia"],
                            correct: 2,
                            explanation: "Mặc dù 'every teacher' là chủ ngữ số ít, động từ vẫn ở dạng nguyên thể 'implement' do đứng trong cấu trúc giả định sau 'essential that'.",
                            studyTip: "Mẹo: Tránh bẫy thêm 's/es' cho chủ ngữ số ít trong câu giả định."
                        }
                    ]
                },
                listening: {
                    audioText: "Our ICT department head recommended that we start using AI generators for lesson planning. He suggested that she update her computer software first.",
                    audioTranslation: "Trưởng bộ phận CNTT của chúng tôi khuyên chúng tôi nên bắt đầu sử dụng các công cụ tạo AI để soạn giáo án. Anh ấy đề xuất cô ấy cập nhật phần mềm máy tính trước.",
                    questions: [
                        {
                            id: "b2_l4_l1",
                            q: "What did the ICT head recommend teachers do for lesson planning?",
                            qTranslation: "Trưởng bộ phận CNTT khuyên giáo viên làm gì khi soạn giáo án?",
                            options: ["Read paper books", "Start using AI generators", "Copy previous plans"],
                            optionsTranslation: ["Đọc sách giấy", "Bắt đầu dùng các bộ tạo AI", "Sao chép giáo án cũ"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'recommended that we start using AI generators for lesson planning'.",
                            studyTip: "Mẹo: Từ khóa nghe 'AI generators' và 'lesson planning'."
                        },
                        {
                            id: "b2_l4_l2",
                            q: "Who recommended that teachers use AI generators?",
                            qTranslation: "Ai đã khuyên giáo viên nên sử dụng các bộ tạo AI?",
                            options: ["The school principal", "The ICT department head", "A student's parent"],
                            optionsTranslation: ["Hiệu trưởng nhà trường", "Trưởng bộ phận CNTT (ICT)", "Phụ huynh học sinh"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'Our ICT department head recommended that...'",
                            studyTip: "Mẹo nghe: ICT viết tắt của Công nghệ thông tin."
                        },
                        {
                            id: "b2_l4_l3",
                            q: "What did the ICT head suggest that she update first?",
                            qTranslation: "Trưởng bộ phận CNTT đề xuất cô ấy nên cập nhật cái gì trước?",
                            options: ["Her textbook", "Her computer software", "Her teaching slides"],
                            optionsTranslation: ["Sách giáo khoa", "Phần mềm máy tính", "Slide bài giảng"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'He suggested that she update her computer software first'.",
                            studyTip: "Mẹo: Từ khóa 'computer software' nghĩa là phần mềm máy tính."
                        },
                        {
                            id: "b2_l4_l4",
                            q: "For what activity did the ICT head recommend using AI?",
                            qTranslation: "Trưởng bộ phận CNTT khuyên sử dụng AI cho hoạt động nào?",
                            options: ["Exam grading", "Lesson planning", "Classroom decoration"],
                            optionsTranslation: ["Chấm điểm thi", "Soạn giáo án", "Trang trí lớp học"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'using AI generators for lesson planning'.",
                            studyTip: "Mẹo: Nghe cụm 'lesson planning' (soạn giáo án)."
                        },
                        {
                            id: "b2_l4_l5",
                            q: "What verb form is used in 'suggested that she update'?",
                            qTranslation: "Dạng động từ nào được dùng trong cụm 'suggested that she update'?",
                            options: ["Updates", "Updated", "Update (bare infinitive)"],
                            optionsTranslation: ["Updates", "Updated", "Update (dạng nguyên mẫu)"],
                            correct: 2,
                            explanation: "Từ 'update' ở dạng nguyên mẫu không chia cho ngôi 'she' vì nằm sau động từ giả định 'suggested that'.",
                            studyTip: "Mẹo: 'suggested that she V(inf)' là cấu trúc thể giả định."
                        }
                    ]
                },
                speaking: {
                    prompt: "Make a recommendation to your school directors about digital training. Use the subjunctive mood.",
                    promptTranslation: "Hãy đưa ra một đề xuất gửi ban giám hiệu về việc tập huấn số. Dùng thể giả định.",
                    sampleAnswer: "I recommend that the school invite an AI expert to guide our English teachers.",
                    sampleTranslation: "Tôi đề xuất nhà trường mời một chuyên gia AI để hướng dẫn giáo viên tiếng Anh của chúng tôi.",
                    guideTips: "Gợi ý: Dùng cấu trúc 'I recommend that + S + V(nguyên thể)' (ví dụ: invite giữ nguyên).\n\n* 5 CHỦ ĐỀ LUYỆN NÓI THÊM:\n1. Recommend that the school board upgrade the classroom projectors.\n2. Propose that the English department use interactive AI quizzes.\n3. Suggest that the teacher explain the grammar rules again.\n4. Recommend that students download the language dictionary app.\n5. Propose that parents check homework through the school portal."
                },
                writing: {
                    prompt: "Write a formal proposal (110 words) recommending that the school integrate digital tests.",
                    promptTranslation: "Formal proposal: Recommend that the school integrate digital tests.",
                    suggestedVocab: "essential (cần thiết), recommend (kiến nghị), bare infinitive, digital testing.\n\n* 5 ĐỀ BÀI LUYỆN VIẾT THÊM:\n1. Write a formal recommendation suggesting that teachers use video materials.\n2. Write a paragraph proposing that the school cancel traditional paper grading.\n3. Write 3 sentences stating that it is essential that every class have a computer.\n4. Write a brief notice suggesting that parents attend the digital workshop.\n5. Write 3 sentences proposing that the school principal buy digital textbooks.",
                    sampleAnswer: "To improve our assessment system, I propose that our school integrate digital testing software next semester. It is essential that every teacher receive adequate training to use this tool effectively. I recommend that the school board buy a school-wide license for interactive platforms. This system will reduce paper usage and save grading time. Furthermore, it is important that the technical department support us during exams. I strongly recommend that this proposal be considered in our next board meeting."
                }
            },
            {
                id: "b2_lesson_5",
                title: "Bài 5: Tương lai của nghề giáo trong kỷ nguyên số",
                description: "Học cách sử dụng cấu trúc Đảo ngữ (Inversion) để nâng cao khả năng lập luận, viết câu nghị luận hùng biện.",
                lectureText: "Chào Thầy Cô, sau đây là bài giảng về Cấu trúc Đảo ngữ. Đảo ngữ được dùng khi muốn nhấn mạnh một ý nào đó bằng cách đảo trợ động từ lên trước chủ ngữ. Thường dùng sau các cụm từ phủ định đứng đầu câu như Not only, Rarely, Never. Ví dụ, Not only is he a good teacher, but he is also a kind father nghĩa là không những anh ấy là giáo viên giỏi, mà anh ấy còn là người cha tốt.",
                theoryHtml: `
                    <div class="space-y-3">
                        <p class="text-xs text-slate-350"><strong class="text-white">Đảo ngữ sau trạng từ phủ định:</strong><br>
                        Never/Rarely/Seldom + Trợ động từ + S + V<br>
                        <span class="italic text-emerald-450">Ví dụ: Rarely do teachers use old books now. (Hiếm khi giáo viên dùng sách cũ bây giờ.)</span></p>
                        <p class="text-xs text-slate-350"><strong class="text-white">Không những... mà còn:</strong><br>
                        Not only + Trợ động từ + S + V, but S + also + V<br>
                        <span class="italic text-emerald-450">Ví dụ: Not only did we build a library, but we also collected many stories. (Không những xây thư viện mà còn quyên góp truyện.)</span></p>
                    </div>
                `,
                reading: {
                    passage: "Not only do teachers guide students academically, but they also inspire them emotionally. Seldom can technology replace the human connection of a classroom.",
                    passageTranslation: "Giáo viên không chỉ hướng dẫn học sinh về mặt học thuật, mà họ còn truyền cảm hứng cho học sinh về mặt cảm xúc. Hiếm khi công nghệ có thể thay thế kết nối con người trong lớp học.",
                    questions: [
                        {
                            id: "b2_l5_r1",
                            q: "According to the passage, can technology completely replace teachers?",
                            qTranslation: "Theo đoạn văn, công nghệ có thể thay thế hoàn toàn giáo viên không?",
                            options: ["Yes, technology is more effective.", "Seldom can technology replace the human connection.", "No, technology never helps."],
                            optionsTranslation: ["Có, công nghệ hiệu quả hơn.", "Hiếm khi công nghệ thay thế được kết nối con người.", "Không, công nghệ chẳng bao giờ giúp ích."],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'Seldom can technology replace the human connection of a classroom'.",
                            studyTip: "Mẹo: Nhận diện cấu trúc đảo ngữ với trạng từ phủ định 'Seldom can...'."
                        },
                        {
                            id: "b2_l5_r2",
                            q: "What do teachers do besides guiding students academically?",
                            qTranslation: "Giáo viên làm gì bên cạnh việc hướng dẫn học tập cho học sinh?",
                            options: ["Decorate the rooms", "Inspire them emotionally", "Give them gifts"],
                            optionsTranslation: ["Trang trí phòng học", "Truyền cảm hứng về mặt cảm xúc", "Tặng quà cho học sinh"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'but they also inspire them emotionally'.",
                            studyTip: "Mẹo: Từ 'emotionally' nghĩa là về mặt cảm xúc."
                        },
                        {
                            id: "b2_l5_r3",
                            q: "What is the human connection in the classroom?",
                            qTranslation: "Kết nối con người trong lớp học là gì?",
                            options: ["Something technology can easily replace", "Something technology can seldom replace", "Something technology has already replaced"],
                            optionsTranslation: ["Thứ mà công nghệ dễ dàng thay thế", "Thứ mà công nghệ hiếm khi thay thế được", "Thứ mà công nghệ đã thay thế rồi"],
                            correct: 1,
                            explanation: "Đoạn văn viết: 'Seldom can technology replace the human connection of a classroom'.",
                            studyTip: "Mẹo: Từ 'seldom' có nghĩa là hiếm khi."
                        },
                        {
                            id: "b2_l5_r4",
                            q: "What does 'Not only do teachers guide' mean in terms of sentence structure?",
                            qTranslation: "Cụm 'Not only do teachers guide' là cấu trúc gì?",
                            options: ["A normal question", "An inversion (đảo ngữ)", "A passive sentence"],
                            optionsTranslation: ["Một câu hỏi bình thường", "Cấu trúc đảo ngữ (inversion)", "Một câu bị động"],
                            correct: 1,
                            explanation: "Cụm trạng từ phủ định 'Not only' đứng đầu câu kéo theo đảo trợ động từ 'do' lên trước chủ ngữ 'teachers'.",
                            studyTip: "Mẹo: Nhận biết trợ động từ đứng trước chủ ngữ sau cụm từ phủ định."
                        },
                        {
                            id: "b2_l5_r5",
                            q: "Is technology able to replace the human connection of a classroom easily?",
                            qTranslation: "Công nghệ có thể thay thế kết nối con người ở lớp học dễ dàng không?",
                            options: ["Yes, it can.", "No, it seldom can.", "Not mentioned."],
                            optionsTranslation: ["Có, có thể.", "Không, hiếm khi có thể.", "Không đề cập."],
                            correct: 1,
                            explanation: "Đoạn văn khẳng định 'Seldom can technology replace...'..",
                            studyTip: "Mẹo: Trạng từ 'seldom' diễn tả tần suất cực kỳ thấp."
                        }
                    ]
                },
                listening: {
                    audioText: "Never have I seen such a great classroom project. Not only did they paint the classroom, but they also decorated the windows.",
                    audioTranslation: "Chưa bao giờ tôi thấy một dự án lớp học tuyệt vời đến vậy. Họ không chỉ sơn phòng học mà còn trang trí các cửa sổ.",
                    questions: [
                        {
                            id: "b2_l5_l1",
                            q: "What did the students do in the classroom?",
                            qTranslation: "Học sinh đã làm gì trong phòng học?",
                            options: ["Only painted the classroom", "Only decorated windows", "Painted the classroom and decorated the windows"],
                            optionsTranslation: ["Chỉ sơn phòng học", "Chỉ trang trí cửa sổ", "Sơn phòng và trang trí các cửa sổ"],
                            correct: 2,
                            explanation: "Băng nghe nói: 'Not only did they paint... but they also decorated...' (không chỉ... mà còn...).",
                            studyTip: "Mẹo: Lắng nghe liên từ đẳng lập 'Not only... but also...'."
                        },
                        {
                            id: "b2_l5_l2",
                            q: "What did they do besides painting the classroom?",
                            qTranslation: "Học sinh đã làm gì ngoài việc sơn phòng học?",
                            options: ["Cleaned the desks", "Decorated the windows", "Bought new books"],
                            optionsTranslation: ["Dọn sạch bàn học", "Trang trí các cửa sổ", "Mua sách mới"],
                            correct: 1,
                            explanation: "Băng nghe nói: 'Not only did they paint the classroom, but they also decorated the windows'.",
                            studyTip: "Mẹo nghe: Cụm 'decorated the windows' nghĩa là trang trí cửa sổ."
                        },
                        {
                            id: "b2_l5_l3",
                            q: "Had the speaker seen such a great classroom project before?",
                            qTranslation: "Trước đây người nói đã từng thấy dự án lớp học nào tuyệt vời như thế chưa?",
                            options: ["Yes, many times.", "Never before.", "Only once."],
                            optionsTranslation: ["Rồi, nhiều lần.", "Chưa bao giờ trước đây.", "Chỉ một lần."],
                            correct: 1,
                            explanation: "Băng nghe nói: 'Never have I seen such a great classroom project' (Chưa bao giờ tôi thấy...).",
                            studyTip: "Mẹo: Đảo ngữ với 'Never have I seen' biểu đạt trải nghiệm chưa từng có."
                        },
                        {
                            id: "b2_l5_l4",
                            q: "What does 'Never have I seen' mean?",
                            qTranslation: "Cụm 'Never have I seen' có nghĩa là gì?",
                            options: ["I see it now.", "I have never seen it until now.", "I will never see it."],
                            optionsTranslation: ["Bây giờ tôi thấy.", "Từ trước tới nay tôi chưa bao giờ thấy.", "Tôi sẽ không bao giờ thấy."],
                            correct: 1,
                            explanation: "Đây là cấu trúc đảo ngữ nhấn mạnh hành động chưa bao giờ xảy ra trong quá khứ.",
                            studyTip: "Mẹo: Từ phủ định 'Never' đứng đầu câu kéo theo đảo trợ động từ 'have'."
                        },
                        {
                            id: "b2_l5_l5",
                            q: "What parts of the classroom did the students modify?",
                            qTranslation: "Học sinh đã sửa đổi những bộ phận nào của lớp học?",
                            options: ["Only walls", "Only windows", "Walls and windows"],
                            optionsTranslation: ["Chỉ có tường", "Chỉ có cửa sổ", "Cả tường và cửa sổ"],
                            correct: 2,
                            explanation: "Học sinh sơn tường ('paint the classroom') và trang trí cửa sổ ('decorated the windows').",
                            studyTip: "Mẹo: Cụm 'paint the classroom' ám chỉ sơn các bức tường."
                        }
                    ]
                },
                speaking: {
                    prompt: "Why technology cannot replace teachers? Use inversion.",
                    promptTranslation: "Tại sao công nghệ không thể thay thế giáo viên? Sử dụng cấu trúc đảo ngữ.",
                    sampleAnswer: "Seldom can computers inspire children emotionally. Not only do teachers transfer knowledge, but they also care for students.",
                    sampleTranslation: "Hiếm khi máy tính truyền cảm hứng cảm xúc cho trẻ em. Giáo viên không chỉ truyền thụ tri thức mà còn quan tâm các con.",
                    guideTips: "Gợi ý: Bắt đầu câu nói bằng cụm 'Seldom can...' hoặc 'Not only do...'.\n\n* 5 CHỦ ĐỀ LUYỆN NÓI THÊM:\n1. Rarely do teachers feel bored with active students. Talk about this.\n2. Not only should teachers teach grammar, but they should also teach social skills. Discuss.\n3. Under no circumstances should technology replace school field trips. Talk about this.\n4. Only by using English every day can students improve fast. Discuss.\n5. Seldom have we seen a school with no internet connection. Discuss how it affects learning."
                },
                writing: {
                    prompt: "Write a short essay (130 words) arguing the future role of teachers in the digital age, using inversion.",
                    promptTranslation: "Write a short essay (130 words) arguing the future role of teachers in the digital age, using inversion.",
                    suggestedVocab: "replace (thay thế), inspire (truyền cảm hứng), seldom (hiếm khi), not only.\n\n* 5 ĐỀ BÀI LUYỆN VIẾT THÊM:\n1. Write a short paragraph using inversion: 'Never have I expected...' about AI tools.\n2. Write 3 sentences arguing why teachers are important, using 'Not only... but also...'.\n3. Write 3 sentences about classroom dynamics starting with 'Seldom...'.\n4. Write a brief opinion essay on digital classrooms starting with 'Under no circumstances...'.\n5. Write 3 sentences stating how teachers motivate students, using inversion.",
                    sampleAnswer: "In the digital age, technology has changed classrooms significantly. However, seldom can computers replace the human connection between teachers and students. Not only do teachers transfer academic knowledge, but they also inspire pupils emotionally and shape their character. Computers can generate customized exercises, but never can they understand a student's personal struggles. Only through teacher-student interactions can young minds learn critical thinking and empathy. Therefore, digital tools should be viewed as assistance. Under no circumstances should technology completely replace the unique and irreplaceable role of human teachers in classrooms."
                }
            }
        ]
    }
};

// Đăng ký vào phạm vi window để toàn cục dễ truy cập
if (typeof window !== 'undefined') {
    window.learningMaterialsDb = learningMaterialsDb;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { learningMaterialsDb };
}
