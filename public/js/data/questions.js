// --- NGÂN HÀNG ĐỀ THI THÍCH ỨNG SONG NGỮ (A1 - C2) ---
const adaptiveDbTest1 = {
    reading: {
        A1: {
            media: `<strong>Mô-đun Đọc A1 (Elementary Level)</strong><br><br>Hello, my name is John. I am thirty years old. I live in a small apartment in London. I work as an English teacher in a primary school near my home. I walk to work every day because it is good for my health. In my free time, I like reading books, playing tennis on weekends, and cooking dinner for my family.`,
            mediaTranslation: `Xin chào, tôi tên là John. Tôi ba mươi tuổi. Tôi sống trong một căn hộ nhỏ ở Luân Đôn. Tôi làm giáo viên Tiếng Anh tại một trường tiểu học gần nhà. Tôi đi bộ đi làm mỗi ngày vì nó tốt cho sức khỏe. Trong thời gian rảnh, tôi thích đọc sách, chơi tennis vào cuối tuần và nấu bữa tối cho gia đình.`,
            task: "1. Đọc văn bản và chọn đáp án chính xác nhất cho mỗi câu hỏi dưới đây.",
            questions: [
                {
                    id: "r_a1_1",
                    q: "What is John's occupation (job)?",
                    qTranslation: "Nghề nghiệp của John là gì?",
                    options: ["He is a doctor", "He is a teacher", "He is an engineer"],
                    optionsTranslation: ["Bác sĩ", "Giáo viên", "Kỹ sư"],
                    correct: 1
                },
                {
                    id: "r_a1_2",
                    q: "How does John go to work?",
                    qTranslation: "John đi làm bằng cách nào?",
                    options: ["By car", "By bus", "By walking"],
                    optionsTranslation: ["Bằng xe ô tô", "Bằng xe buýt", "Đi bộ"],
                    correct: 2
                },
                {
                    id: "r_a1_3",
                    q: "What does John NOT do in his free time?",
                    qTranslation: "John KHÔNG làm gì vào thời gian rảnh?",
                    options: ["Playing soccer", "Reading books", "Cooking dinner"],
                    optionsTranslation: ["Chơi bóng đá", "Đọc sách", "Nấu ăn"],
                    correct: 0
                }
            ]
        },
        A2: {
            media: `<strong>Mô-đun Đọc A2 (Pre-Intermediate Level)</strong><br><br>We use plastic items every single day. It is in the clothes we wear and the houses we live in. It even covers the fresh food and water we buy. It may seem that we cannot live without it. However, many environmental experts now believe that plastic is one of the most serious forms of pollution. If we throw away plastic, it won't disappear naturally like other organic waste. A banana skin will disappear in a few weeks. A plastic bag can last for 500 years! That means that most of the plastic bags that have been made - they were only invented about 70 years ago - still exist on Earth.`,
            mediaTranslation: `Chúng ta sử dụng đồ dùng bằng nhựa mỗi ngày. Nhựa có trong quần áo chúng ta mặc và những ngôi nhà chúng ta đang ở. Nó thậm chí còn bao bọc thực phẩm tươi sống và nước uống chúng ta mua. Có vẻ như chúng ta không thể sống thiếu nó. Tuy nhiên, nhiều chuyên gia môi trường hiện tin rằng nhựa là một trong những dạng ô nhiễm nghiêm trọng nhất. Nếu chúng ta vứt bỏ nhựa, nó sẽ không biến mất tự nhiên giống như chất thải hữu cơ khác. Vỏ chuối sẽ phân hủy trong vài tuần. Một túi nhựa có thể tồn tại tới 500 năm! Điều đó có nghĩa là hầu hết các túi nhựa từng được tạo ra - chúng mới chỉ được phát minh ra cách đây 70 năm - vẫn tồn tại trên Trái Đất.`,
            task: "1. Đọc văn bản và chọn đáp án chính xác nhất.",
            questions: [
                {
                    id: "r_a2_1",
                    q: "What is the main topic of the article?",
                    qTranslation: "Chủ đề chính của bài báo là gì?",
                    options: ["How plastic is manufactured", "Plastic pollution and its long lifetime", "How to compost banana skins"],
                    optionsTranslation: ["Cách sản xuất nhựa", "Rác thải nhựa và mối nguy hại dài hạn của nó", "Cách ủ vỏ chuối tự nhiên"],
                    correct: 1
                },
                {
                    id: "r_a2_2",
                    q: "According to the text, a plastic bag can last for:",
                    qTranslation: "Theo văn bản, một túi nhựa có thể tồn tại trong:",
                    options: ["70 years", "500 years", "A few weeks"],
                    optionsTranslation: ["70 năm", "500 năm", "Vài tuần"],
                    correct: 1
                },
                {
                    id: "r_a2_3",
                    q: "Plastic bags were invented approximately:",
                    qTranslation: "Túi nhựa được phát minh cách đây khoảng:",
                    options: ["70 years ago", "500 years ago", "Recently"],
                    optionsTranslation: ["70 năm trước", "500 năm trước", "Mới gần đây"],
                    correct: 0
                }
            ]
        },
        B1: {
            media: `<strong>Mô-đun Đọc B1 (Intermediate Level)</strong><br><br>Traditional family structures have changed significantly over the past few decades. Previously, extended families living together under one roof was common in many Asian cultures. Today, nuclear families, consisting of parents and children, are far more prevalent. This shift is primarily driven by urban migration, where young adults move to big cities for career opportunities and education, leading to more independent living arrangements. While this change allows young people more freedom, it sometimes results in less contact with elder generations, raising concerns about loneliness among grandparents.`,
            mediaTranslation: `Cấu trúc gia đình truyền thống đã thay đổi đáng kể trong vài thập kỷ qua. Trước đây, các đại gia đình sống chung dưới một mái nhà rất phổ biến ở nhiều nền văn hóa châu Á. Ngày nay, gia đình hạt nhân, gồm cha mẹ và con cái, phổ biến hơn nhiều. Sự thay đổi này chủ yếu được thúc đẩy bởi sự di cư đô thị, nơi những người trẻ tuổi chuyển đến các thành phố lớn để tìm kiếm cơ hội nghề nghiệp và giáo dục, dẫn đến việc sắp xếp cuộc sống độc lập hơn. Mặc dù sự thay đổi này giúp người trẻ tự do hơn, nhưng đôi khi nó lại dẫn đến việc ít liên lạc hơn với các thế hệ lớn tuổi, gây lo ngại về sự cô đơn ở ông bà.`,
            task: "1. Read the article. Choose the correct answers.",
            questions: [
                {
                    id: "r_b1_1",
                    q: "What family structure was common in Asian cultures in the past?",
                    qTranslation: "Cấu trúc gia đình nào phổ biến ở các nền văn hóa châu Á trong quá khứ?",
                    options: ["Nuclear families", "Extended families living together", "Single-parent households"],
                    optionsTranslation: ["Gia đình hạt nhân", "Đại gia đình sống chung", "Hộ gia đình đơn thân"],
                    correct: 1
                },
                {
                    id: "r_b1_2",
                    q: "What is the primary cause of this family structural shift?",
                    qTranslation: "Nguyên nhân chính của sự chuyển dịch cấu trúc gia đình này là gì?",
                    options: ["Financial crises", "Urban migration for careers and study", "Government housing regulations"],
                    optionsTranslation: ["Khủng hoảng tài chính", "Di cư đô thị vì sự nghiệp và học tập", "Quy định nhà ở của chính phủ"],
                    correct: 1
                },
                {
                    id: "r_b1_3",
                    q: "The word 'prevalent' in the text is closest in meaning to:",
                    qTranslation: "Từ 'prevalent' trong đoạn văn gần nghĩa nhất với:",
                    options: ["Common and widespread", "Rare and unique", "Difficult and challenging"],
                    optionsTranslation: ["Phổ biến và rộng rãi", "Hiếm và độc đáo", "Khó khăn và thách thức"],
                    correct: 0
                }
            ]
        },
        B2: {
            media: `<strong>Mô-đun Đọc B2 (Upper-Intermediate Level)</strong><br><br>The internet has fundamentally revolutionized how students conduct academic research. In the past, children had to visit physical libraries, manually search through catalog systems, and copy information onto note cards. Today, search engines deliver billions of digital academic papers instantly. However, this effortless accessibility presents a massive challenge: information overload and the rising difficulty of evaluating the credibility of digital articles. Without proper critical thinking skills, students risk using unverified and biased sources in their academic projects, highlighting the urgent need for digital literacy training.`,
            mediaTranslation: `Internet đã cách mạng hóa cơ bản cách học sinh tiến hành nghiên cứu học thuật. Trước đây, trẻ em phải đến các thư viện vật lý, tìm kiếm thủ công qua hệ thống thư mục và sao chép thông tin vào thẻ ghi chú. Ngày nay, các công cụ tìm kiếm cung cấp hàng tỷ bài báo học thuật kỹ thuật số ngay lập tức. Tuy nhiên, khả năng tiếp cận dễ dàng này lại đặt ra một thách thức lớn: quá tải thông tin và khó khăn ngày càng tăng trong việc đánh giá mức độ uy tín của các bài viết kỹ thuật số. Nếu không có kỹ năng tư duy phản biện thích hợp, học sinh có nguy cơ sử dụng các nguồn tài liệu chưa được kiểm chứng và thiên lệch trong các dự án học tập, làm nổi bật nhu cầu cấp thiết về đào tạo kỹ năng số học.`,
            task: "1. Read the text and choose the most appropriate option.",
            questions: [
                {
                    id: "r_b2_1",
                    q: "In the past, performing academic research required students to:",
                    qTranslation: "Trong quá khứ, việc thực hiện nghiên cứu học thuật yêu cầu học sinh phải:",
                    options: ["Use advanced search filters", "Visit physical libraries to search records", "Collaborate in large student teams"],
                    optionsTranslation: ["Sử dụng bộ lọc tìm kiếm nâng cao", "Đến thư viện vật lý tra cứu tài liệu", "Hợp tác trong nhóm học sinh lớn"],
                    correct: 1
                },
                {
                    id: "r_b2_2",
                    q: "What is a major negative consequence of instant internet access?",
                    qTranslation: "Hậu quả tiêu cực chính của việc tiếp cận internet tức thời là gì?",
                    options: ["Information overload and credibility evaluation issues", "The high cost of academic subscriptions", "The scarcity of high-quality digital articles"],
                    optionsTranslation: ["Quá tải thông tin và vấn đề đánh giá độ uy tín", "Chi phí đăng ký học thuật đắt đỏ", "Sự khan hiếm của các bài viết số chất lượng"],
                    correct: 0
                },
                {
                    id: "r_b2_3",
                    q: "The author implies that digital articles on the internet:",
                    qTranslation: "Tác giả ngầm ý rằng các bài viết kỹ thuật số trên internet:",
                    options: ["Are always more reliable than printed books", "Must be analyzed and selected carefully", "Should not be used for school homework"],
                    optionsTranslation: ["Luôn đáng tin cậy hơn sách in", "Cần được chọn lọc và phân tích kỹ lưỡng", "Không nên dùng để làm bài tập về nhà"],
                    correct: 1
                }
            ]
        },
        C1: {
            media: `<strong>Mô-đun Đọc C1 (Advanced Level)</strong><br><br>The integration of advanced Artificial Intelligence systems in high school classrooms is sparking profound epistemological debates. Educators worry that generative language models could undermine developmental writing processes, leading to cognitive dependency. Advocates, conversely, argue that AI-powered tutors democratize high-level coaching, adapting to individual cognitive paces. This paradigm shift requires a structural restructuring of the curriculum where educational evaluation moves from standard output checking to process-oriented reflection and oral defenses.`,
            mediaTranslation: `Việc tích hợp các hệ thống Trí tuệ Nhân tạo tiên tiến trong các lớp học trung học đang khơi mào cho những cuộc tranh luận sâu sắc về mặt nhận thức luận. Các nhà giáo dục lo ngại rằng các mô hình ngôn ngữ tạo sinh có thể làm suy yếu quá trình phát triển tư duy viết, dẫn đến sự phụ thuộc về mặt nhận thức. Ngược lại, những người ủng hộ lập luận rằng các gia sư chạy bằng AI giúp dân chủ hóa việc huấn luyện cấp cao, thích ứng với tốc độ nhận thức của từng cá nhân. Sự thay đổi mô hình này đòi hỏi cấu trúc lại chương trình giảng dạy, trong đó việc đánh giá giáo dục chuyển từ kiểm tra kết quả đầu ra tiêu chuẩn sang phản biện định hướng quá trình và bảo vệ vấn đáp.`,
            task: "1. Read the academic text. Choose the correct answers.",
            questions: [
                {
                    id: "r_c1_1",
                    q: "What is a major concern regarding generative AI in writing classrooms?",
                    qTranslation: "Mối lo ngại lớn liên quan đến AI tạo sinh trong lớp học viết là gì?",
                    options: ["The high cost of software licenses", "Undermining students' developmental writing processes", "Computer hardware systems slowing down"],
                    optionsTranslation: ["Chi phí mua bản quyền phần mềm cao", "Làm suy yếu quá trình phát triển kỹ năng viết", "Các hệ thống phần cứng máy tính chạy chậm"],
                    correct: 1
                },
                {
                    id: "r_c1_2",
                    q: "Advocates argue that AI tutors are beneficial because they:",
                    qTranslation: "Những người ủng hộ lập luận rằng gia sư AI có lợi vì chúng:",
                    options: ["Democratize and personalize the pace of learning", "Completely replace the role of classroom teachers", "Automatically grade exams with absolute accuracy"],
                    optionsTranslation: ["Dân chủ hóa và cá nhân hóa tốc độ tự học", "Thay thế hoàn toàn vai trò của giáo viên đứng lớp", "Tự động chấm điểm thi chính xác tuyệt đối"],
                    correct: 0
                },
                {
                    id: "r_c1_3",
                    q: "Curriculum restructuring should transition towards:",
                    qTranslation: "Tái cấu trúc chương trình học nên chuyển dịch hướng tới:",
                    options: ["Focusing only on standardized output testing", "Evaluating process-oriented learning and reflection", "Eliminating writing subjects entirely from schools"],
                    optionsTranslation: ["Chỉ tập trung kiểm tra đầu ra tiêu chuẩn", "Đánh giá học tập hướng quá trình và phản biện", "Loại bỏ hoàn toàn môn Viết ra khỏi trường học"],
                    correct: 1
                }
            ]
        },
        C2: {
            media: `<strong>Mô-đun Đọc C2 (Proficiency Level)</strong><br><br>Quantum computing represents a paradigm shift in computational science, transcending classical binary limitations. By leveraging quantum principles such as superposition and entanglement, quantum bits can execute complex algorithmic calculations exponentially faster than classical silicon-based supercomputers. Consequently, current cryptography standards, which rely heavily on the difficulty of prime factorization, will inevitably become vulnerable. This imminent technological disruption prompts an urgent migration towards post-quantum encryption protocols to safeguard global communication infrastructure.`,
            mediaTranslation: `Điện toán lượng tử đại diện cho một bước chuyển đổi mô hình trong khoa học tính toán, vượt qua các giới hạn nhị phân cổ điển. Bằng cách tận dụng các nguyên lý lượng tử như chồng chập và vướng víu, các qubit lượng tử có thể thực thi các tính toán thuật toán phức tạp nhanh hơn theo cấp số nhân so với các siêu máy tính dựa trên silicon cổ điển. Do đó, các tiêu chuẩn mật mã hiện tại, vốn phụ thuộc nhiều vào độ khó của việc phân tích thừa số nguyên tố, chắc chắn sẽ trở nên dễ bị tổn thương. Sự gián đoạn công nghệ sắp xảy ra này thúc đẩy một sự di chuyển khẩn cấp hướng tới các giao thức mã hóa hậu lượng tử để bảo vệ cơ sở hạ tầng truyền thông toàn cầu.`,
            task: "1. Read the advanced scientific passage. Choose the correct answers.",
            questions: [
                {
                    id: "r_c2_1",
                    q: "Quantum computing differs from classical computing because it:",
                    qTranslation: "Điện toán lượng tử khác điện toán cổ điển vì nó:",
                    options: ["Uses traditional binary code configurations", "Transcends binary limits using superposition and entanglement", "Relies solely on advanced silicon supercomputer chips"],
                    optionsTranslation: ["Sử dụng cấu hình mã nhị phân truyền thống", "Vượt qua giới hạn nhị phân bằng chồng chập/vướng víu", "Chỉ phụ thuộc vào chip siêu máy tính silicon tiên tiến"],
                    correct: 1
                },
                {
                    id: "r_c2_2",
                    q: "What will happen to current cryptographic systems due to quantum advancement?",
                    qTranslation: "Điều gì sẽ xảy ra với các hệ thống mật mã hiện tại do sự tiến bộ lượng tử?",
                    options: ["They will become automatically stronger", "They will become obsolete or vulnerable", "They will replace quantum computers entirely"],
                    optionsTranslation: ["Chúng sẽ tự động trở nên mạnh hơn", "Chúng sẽ trở nên lỗi thời hoặc dễ bị bẻ gãy", "Chúng sẽ thay thế hoàn toàn máy tính lượng tử"],
                    correct: 1
                },
                {
                    id: "r_c2_3",
                    q: "The passage suggests cryptographers need to:",
                    qTranslation: "Đoạn văn gợi ý các nhà mật mã học cần phải:",
                    options: ["Build faster silicon supercomputers", "Migrate to post-quantum encryption standards", "Stop using prime numbers in mathematics"],
                    optionsTranslation: ["Xây dựng các siêu máy tính silicon nhanh hơn", "Chuyển dịch sang các chuẩn mã hóa hậu lượng tử", "Ngừng sử dụng số nguyên tố trong toán học"],
                    correct: 1
                }
            ]
        }
    },
    listening: {
        A1: {
            media: "<strong>Mô-đun Nghe A1 (Elementary Level)</strong><br><br>🔊 Vui lòng đeo tai nghe, bấm nút Play để nghe hội thoại ngắn và trả lời câu hỏi.",
            mediaTranslation: "Lắng nghe đoạn băng mô tả về công việc hàng ngày của một nữ y tá.",
            task: "1. Chọn phương án trả lời chính xác nhất.",
            audioText: "My sister is a nurse. She works at a big hospital in Hanoi. She goes to work at seven o'clock in the morning. She loves helping sick people. On Sundays, she stays at home and cooks delicious dinner for our family.",
            questions: [
                {
                    id: "l_a1_1",
                    q: "What is the occupation of the speaker's sister?",
                    qTranslation: "Nghề nghiệp của chị gái người nói là gì?",
                    options: ["A doctor", "A nurse", "A teacher"],
                    optionsTranslation: ["Bác sĩ", "Y tá", "Giáo viên"],
                    correct: 1
                },
                {
                    id: "l_a1_2",
                    q: "What time does she go to work?",
                    qTranslation: "Chị ấy đi làm lúc mấy giờ?",
                    options: ["At 7:00 AM", "At 8:00 AM", "At 9:00 AM"],
                    optionsTranslation: ["Lúc 7 giờ sáng", "Lúc 8 giờ sáng", "Lúc 9 giờ sáng"],
                    correct: 0
                },
                {
                    id: "l_a1_3",
                    q: "What does she do on Sundays?",
                    qTranslation: "Chị ấy làm gì vào ngày Chủ Nhật?",
                    options: ["She works at the hospital", "She plays tennis", "She stays home and cooks"],
                    optionsTranslation: ["Làm việc ở bệnh viện", "Chơi quần vợt", "Ở nhà và nấu ăn"],
                    correct: 2
                }
            ]
        },
        A2: {
            media: "<strong>Mô-đun Nghe A2 (Pre-Intermediate Level)</strong><br><br>🔊 Lắng nghe đoạn mô tả về một trường tiểu học Việt Nam.",
            mediaTranslation: "Lắng nghe một học sinh giới thiệu về trường tiểu học Sunshine.",
            task: "1. Chọn phương án trả lời đúng nhất.",
            audioText: "My school is called Sunshine Primary School. We have about three hundred children. In the playground, we love playing soccer during break time. My teacher is very friendly and kind.",
            questions: [
                {
                    id: "l_a2_1",
                    q: "What is the name of the school?",
                    qTranslation: "Tên của trường học là gì?",
                    options: ["Sunshine Primary School", "Rainbow Middle School", "Moon High School"],
                    optionsTranslation: ["Trường Tiểu học Sunshine", "Trường THCS Cầu vồng", "Trường THPT Mặt Trăng"],
                    correct: 0
                },
                {
                    id: "l_a2_2",
                    q: "How many children are there in the school?",
                    qTranslation: "Có khoảng bao nhiêu học sinh ở trường?",
                    options: ["30 children", "300 children", "3000 children"],
                    optionsTranslation: ["30 học sinh", "300 học sinh", "3000 học sinh"],
                    correct: 1
                },
                {
                    id: "l_a2_3",
                    q: "What activity do children love doing during break time?",
                    qTranslation: "Trẻ em thích hoạt động nào vào giờ ra chơi?",
                    options: ["Playing soccer", "Singing songs", "Reading in library"],
                    optionsTranslation: ["Chơi bóng đá", "Hát các bài hát", "Đọc sách ở thư viện"],
                    correct: 0
                }
            ]
        },
        B1: {
            media: "<strong>Mô-đun Nghe B1 (Intermediate Level)</strong><br><br>🔊 Nghe hội thoại chia sẻ về một câu lạc bộ kỹ năng.",
            mediaTranslation: "Người nói chia sẻ về việc tham gia câu lạc bộ nhiếp ảnh vào mùa hè năm ngoái.",
            task: "1. Chọn đáp án chính xác nhất.",
            audioText: "Last summer, I decided to join a local photography club to improve my camera skills. We met every Saturday morning and explored different parks in our city. The instructor taught us about lighting, composition, and editing software. I enjoyed capturing landscape photos the most.",
            questions: [
                {
                    id: "l_b1_1",
                    q: "Why did the speaker join the photography club?",
                    qTranslation: "Tại sao người nói lại tham gia câu lạc bộ nhiếp ảnh?",
                    options: ["To buy a cheap camera", "To improve camera skills", "To travel with friends"],
                    optionsTranslation: ["Để mua một chiếc máy ảnh rẻ", "Để nâng cao kỹ năng máy ảnh", "Để đi du lịch cùng bạn bè"],
                    correct: 1
                },
                {
                    id: "l_b1_2",
                    q: "When did the club members meet?",
                    qTranslation: "Các thành viên câu lạc bộ gặp nhau khi nào?",
                    options: ["Every Friday evening", "Every Saturday morning", "Every Sunday afternoon"],
                    optionsTranslation: ["Tối thứ Sáu hàng tuần", "Sáng thứ Bảy hàng tuần", "Chiều Chủ Nhật hàng tuần"],
                    correct: 1
                },
                {
                    id: "l_b1_3",
                    q: "What type of photography did the speaker enjoy most?",
                    qTranslation: "Thể loại nhiếp ảnh nào người nói thích nhất?",
                    options: ["Portrait photography", "Landscape photography", "Street photography"],
                    optionsTranslation: ["Chụp ảnh chân dung", "Chụp ảnh phong cảnh", "Chụp ảnh đường phố"],
                    correct: 1
                }
            ]
        },
        B2: {
            media: "<strong>Mô-đun Nghe B2 (Upper-Intermediate Level)</strong><br><br>🔊 Hội thoại bàn về phương pháp giáo dục tương tác phổ thông.",
            mediaTranslation: "Ý kiến chuyên gia về việc giảm thuyết giảng một chiều và tăng tính tương tác trên lớp.",
            task: "1. Chọn đáp án chính xác nhất.",
            audioText: "Interactive learning models encourage active student participation. Instead of lecturing for forty-five minutes, middle school teachers should facilitate class debates, group assignments, and peer reviews to enhance critical thinking skills.",
            questions: [
                {
                    id: "l_b2_1",
                    q: "The speaker argues middle school teachers should NOT:",
                    qTranslation: "Người nói lập luận giáo viên cấp THCS KHÔNG nên làm gì?",
                    options: ["Organize debate activities", "Lecture for forty-five minutes continuously", "Use peer review methods"],
                    optionsTranslation: ["Tổ chức các hoạt động tranh luận", "Thuyết giảng 45 phút liên tục", "Sử dụng các phương pháp bình duyệt chéo"],
                    correct: 1
                },
                {
                    id: "l_b2_2",
                    q: "The main goal of interactive learning models is to develop:",
                    qTranslation: "Mục tiêu chính của mô hình học tập tương tác là phát triển:",
                    options: ["Passive memory skills", "Critical thinking skills", "Classroom management speeds"],
                    optionsTranslation: ["Kỹ năng ghi nhớ thụ động", "Kỹ năng tư duy phản biện", "Tốc độ quản lý lớp học"],
                    correct: 1
                },
                {
                    id: "l_b2_3",
                    q: "Peer review means students evaluate:",
                    qTranslation: "Bình duyệt chéo (peer review) có nghĩa là học sinh đánh giá:",
                    options: ["The lesson plan of teachers", "The works of their classmates", "Their own term exam scores"],
                    optionsTranslation: ["Giáo án của thầy cô", "Bài làm của bạn học cùng lớp", "Điểm thi học kỳ của chính mình"],
                    correct: 1
                }
            ]
        },
        C1: {
            media: "<strong>Mô-đun Nghe C1 (Advanced Level)</strong><br><br>🔊 Nghe bài phát biểu khoa học sư phạm về các bài kiểm tra chuẩn hóa.",
            mediaTranslation: "Bài thảo luận chuyên sâu về những mặt hạn chế của các bài thi đánh giá chuẩn hóa định lượng.",
            task: "1. Chọn đáp án chính xác nhất.",
            audioText: "Standardized testing often fails to gauge complex qualitative skills such as emotional intelligence and creative synthesizing. While metrics provide simple quantitative benchmarking, they risk flattening student individuality.",
            questions: [
                {
                    id: "l_c1_1",
                    q: "Standardized testing often fails to evaluate:",
                    qTranslation: "Các kỳ thi chuẩn hóa thường thất bại trong việc đánh giá:",
                    options: ["Rote memorization of mathematics formulas", "Emotional intelligence and creative synthesizing", "Basic writing and spelling rules"],
                    optionsTranslation: ["Ghi nhớ vẹt công thức toán", "Trí tuệ cảm xúc và tổng hợp sáng tạo", "Quy tắc viết và đánh vần cơ bản"],
                    correct: 1
                },
                {
                    id: "l_c1_2",
                    q: "The speaker warns that quantitative metrics risk:",
                    qTranslation: "Người nói cảnh báo các số liệu định lượng có nguy cơ:",
                    options: ["Increasing educational costs", "Flattening student individuality", "Demotivating young teachers"],
                    optionsTranslation: ["Làm tăng chi phí giáo dục", "Làm phẳng/triệt tiêu tính cá nhân của học sinh", "Làm giảm động lực của giáo viên trẻ"],
                    correct: 1
                },
                {
                    id: "l_c1_3",
                    q: "What does 'synthesizing' refer to in this educational context?",
                    qTranslation: "Từ 'synthesizing' (tổng hợp) ám chỉ điều gì trong ngữ cảnh này?",
                    options: ["Memorizing list of vocabulary", "Combining information from creative sources", "Performing standard statistical math"],
                    optionsTranslation: ["Ghi nhớ danh sách từ vựng", "Tổng hợp thông tin từ nhiều nguồn sáng tạo", "Làm toán thống kê tiêu chuẩn"],
                    correct: 1
                }
            ]
        },
        C2: {
            media: "<strong>Mô-đun Nghe C2 (Proficiency Level)</strong><br><br>🔊 Bài giảng học thuật về Thuyết Tải Nhận Thức trong giảng dạy.",
            mediaTranslation: "Bài phân tích chuyên sâu về sự hạn chế của bộ nhớ làm việc (working memory) và cấu trúc lược đồ nhận thức.",
            task: "1. Chọn đáp án đúng nhất.",
            audioText: "Cognitive load theory indicates that working memory has a highly restricted capacity. When teaching complex mathematical theorems, instructors must minimize extraneous cognitive load by eliminating redundant information and focusing learner attention on schema construction. This maximizes the efficient transfer of knowledge into long-term memory.",
            questions: [
                {
                    id: "l_c2_1",
                    q: "According to the speaker, working memory capacity is:",
                    qTranslation: "Theo người nói, dung lượng của bộ nhớ làm việc (working memory) là:",
                    options: ["Infinite and boundless", "Highly restricted and limited", "Dependent on student age"],
                    optionsTranslation: ["Vô hạn và không giới hạn", "Rất hạn chế và có giới hạn", "Phụ thuộc vào tuổi tác học sinh"],
                    correct: 1
                },
                {
                    id: "l_c2_2",
                    q: "To teach complex theorems effectively, instructors should:",
                    qTranslation: "Để dạy các định lý phức tạp hiệu quả, người hướng dẫn nên:",
                    options: ["Provide multiple extra articles", "Minimize extraneous cognitive load by removing redundant data", "Avoid using geometric visuals"],
                    optionsTranslation: ["Cung cấp nhiều bài viết phụ thêm", "Giảm thiểu tải nhận thức ngoại lai bằng cách loại bỏ thông tin thừa", "Tránh sử dụng hình ảnh trực quan hình học"],
                    correct: 1
                },
                {
                    id: "l_c2_3",
                    q: "Minimizing extraneous cognitive load aims to help learners with:",
                    qTranslation: "Giảm thiểu tải nhận thức ngoại lai nhằm giúp người học:",
                    options: ["Short-term homework calculations", "Schema construction and transfer to long-term memory", "Memorizing basic pedagogical terms"],
                    optionsTranslation: ["Làm tính nhanh bài tập ngắn hạn", "Xây dựng lược đồ và chuyển giao vào bộ nhớ dài hạn", "Ghi nhớ các thuật ngữ sư phạm cơ bản"],
                    correct: 1
                }
            ]
        }
    },
    speaking: [
        {
            id: "s1",
            prompt: "Could you please introduce yourself and tell me why you like teaching?",
            promptTranslation: "Bạn có thể tự giới thiệu bản thân và cho tôi biết tại sao bạn thích giảng dạy không?",
            sampleAnswer: "My name is Lan. I am an English teacher. I love teaching because seeing my students progress and communicate confidently in English brings me great joy and fulfillment.",
            start: 0,
            end: 8
        },
        {
            id: "s2",
            prompt: "What is your typical daily routine before you start your classes?",
            promptTranslation: "Thói quen hàng ngày điển hình của bạn trước khi bắt đầu các tiết học là gì?",
            sampleAnswer: "Before classes, I usually review my lesson plans, prepare teaching materials and games, and ensure the classroom projector and speakers are working properly.",
            start: 8,
            end: 16
        },
        {
            id: "s3",
            prompt: "What activities do your students enjoy doing the most in your classroom?",
            promptTranslation: "Học sinh của bạn thích tham gia những hoạt động nào nhất trong lớp học của bạn?",
            sampleAnswer: "My students really enjoy interactive language games, vocabulary quizzes like Kahoot, and group role-play activities where they can practice speaking with their peers.",
            start: 16,
            end: 24
        },
        {
            id: "s4",
            prompt: "How do you help a student who is too shy to speak English in class?",
            promptTranslation: "Bạn làm thế nào để giúp một học sinh quá nhút nhát không dám nói tiếng Anh trong lớp?",
            sampleAnswer: "I encourage shy students by putting them in small supportive groups, asking simple questions first, and praising every small effort they make to build their confidence.",
            start: 24,
            end: 32
        },
        {
            id: "s5",
            prompt: "What is your favorite English book or movie, and why do you like it?",
            promptTranslation: "Cuốn sách hoặc bộ phim tiếng Anh yêu thích của bạn là gì và tại sao bạn thích nó?",
            sampleAnswer: "My favorite book is 'Charlotte's Web' because of its simple yet beautiful vocabulary and its touching story about friendship, which is great for teaching kids.",
            start: 32,
            end: 40
        },
        {
            id: "s6",
            prompt: "How do you manage a classroom when some students are distracting others?",
            promptTranslation: "Bạn quản lý lớp học thế nào khi một số học sinh làm xao nhãng những học sinh khác?",
            sampleAnswer: "I address distractions by establishing clear classroom rules, using non-verbal cues like eye contact, and redirecting their focus with an engaging task or quick question.",
            start: 40,
            end: 48
        },
        {
            id: "s7",
            prompt: "What are the key benefits of using games and songs to teach English to young learners?",
            promptTranslation: "Những lợi ích chính của việc sử dụng các trò chơi và bài hát để dạy tiếng Anh cho học sinh nhỏ tuổi là gì?",
            sampleAnswer: "Games and songs create a fun, stress-free environment, capture short attention spans, and help young learners naturally memorize vocabulary and pronunciation through repetition.",
            start: 48,
            end: 56
        },
        {
            id: "s8",
            prompt: "Describe a successful lesson you recently taught. What made it work well?",
            promptTranslation: "Hãy mô tả một tiết học thành công mà bạn vừa giảng dạy gần đây. Điều gì đã giúp tiết học đó đạt hiệu quả tốt?",
            sampleAnswer: "I taught a lesson on environmental vocabulary using a group debate. It worked well because students were active, expressed real opinions, and utilized the vocabulary naturally.",
            start: 56,
            end: 64
        },
        {
            id: "s9",
            prompt: "How do you balance teaching grammar with teaching communication skills in your classes?",
            promptTranslation: "Bạn cân bằng việc dạy ngữ pháp với dạy kỹ năng giao tiếp như thế nào trong các tiết học của mình?",
            sampleAnswer: "I integrate grammar into communicative activities. After explaining a rule briefly, I have students practice it through real-world dialogues, role-plays, and speaking tasks.",
            start: 64,
            end: 72
        },
        {
            id: "s10",
            prompt: "What challenges do you face when teaching English listening skills, and how do you solve them?",
            promptTranslation: "Bạn gặp những thách thức nào khi dạy kỹ năng nghe tiếng Anh và bạn giải quyết chúng ra sao?",
            sampleAnswer: "Students often struggle with natural speed and accents. I solve this by dividing listening tasks into pre-listening, while-listening, and post-listening phases, and using authentic materials.",
            start: 72,
            end: 80
        },
        {
            id: "s11",
            prompt: "How do you provide constructive feedback to students after a speaking activity?",
            promptTranslation: "Bạn cung cấp phản hồi mang tính xây dựng như thế nào cho học sinh sau một hoạt động nói?",
            sampleAnswer: "I highlight their strengths first, then address common errors anonymously on the board, and finally give individual tips on how to improve pronunciation and fluency.",
            start: 80,
            end: 88
        },
        {
            id: "s12",
            prompt: "Why is it important for English teachers to integrate cultural topics into their language lessons?",
            promptTranslation: "Tại sao việc giáo viên tiếng Anh tích hợp các chủ đề văn hóa vào các bài học ngôn ngữ lại quan trọng?",
            sampleAnswer: "Integrating culture helps students understand the context of the language, fosters global awareness, and makes learning more interesting by comparing different customs.",
            start: 88,
            end: 96
        },
        {
            id: "s13",
            prompt: "How should teachers adapt their lesson plans to accommodate classes with mixed-ability students?",
            promptTranslation: "Giáo viên nên điều chỉnh giáo án như thế nào để phù hợp với những lớp học có học sinh có năng lực khác nhau?",
            sampleAnswer: "I employ differentiated instruction by designing tasks with varying levels of complexity, organizing peer-tutoring groups, and providing scaffolded worksheets to support weaker learners.",
            start: 96,
            end: 104
        },
        {
            id: "s14",
            prompt: "What role does formative assessment play in monitoring student progress throughout the academic year?",
            promptTranslation: "Đánh giá quá trình đóng vai trò gì trong việc giám sát sự tiến bộ của học sinh trong suốt năm học?",
            sampleAnswer: "Formative assessment provides real-time insights into student comprehension, allowing teachers to adjust their teaching strategies immediately and help students identify their learning gaps early.",
            start: 104,
            end: 112
        },
        {
            id: "s15",
            prompt: "How can English teachers effectively cultivate critical thinking skills through language learning tasks?",
            promptTranslation: "Làm thế nào giáo viên tiếng Anh có thể trau dồi hiệu quả các kỹ năng tư duy phản biện thông qua các nhiệm vụ học ngôn ngữ?",
            sampleAnswer: "Teachers can design open-ended discussion questions, encourage students to analyze texts from multiple perspectives, and organize problem-solving group projects instead of simple rote learning.",
            start: 112,
            end: 120
        },
        {
            id: "s16",
            prompt: "In what ways has the transition to hybrid learning models impacted student engagement and performance?",
            promptTranslation: "Việc chuyển đổi sang mô hình học tập kết hợp đã tác động đến sự tham gia và kết quả học tập của học sinh theo những cách nào?",
            sampleAnswer: "Hybrid learning offers flexibility but poses challenges in self-discipline. It requires teachers to use interactive online tools and structured offline tasks to maintain high engagement levels.",
            start: 120,
            end: 128
        },
        {
            id: "s17",
            prompt: "How do you design a comprehensive rubric to objectively grade students' creative writing assignments?",
            promptTranslation: "Bạn thiết kế một tiêu chí đánh giá toàn diện như thế nào để chấm điểm khách quan các bài tập viết sáng tạo của học sinh?",
            sampleAnswer: "I construct a detailed rubric with clear criteria: content relevance, organization, vocabulary variety, grammatical accuracy, and creativity, assigning specific score ranges to each descriptor.",
            start: 128,
            end: 136
        },
        {
            id: "s18",
            prompt: "What is your strategy for continuous professional development to stay updated with modern pedagogical trends?",
            promptTranslation: "Chiến lược phát triển chuyên môn liên tục của bạn là gì để luôn cập nhật các xu hướng sư phạm hiện đại?",
            sampleAnswer: "My strategy involves attending international TESOL webinars, participating in professional learning communities, reading academic journals, and peer-observing lessons to refine my teaching methods.",
            start: 136,
            end: 144
        },
        {
            id: "s19",
            prompt: "Evaluate the pedagogical implications of utilizing generative AI tools in English language education.",
            promptTranslation: "Đánh giá các hàm ý sư phạm của việc sử dụng các công cụ AI tạo sinh trong giáo dục tiếng Anh.",
            sampleAnswer: "Generative AI provides personalized learning paths and automated feedback, but it risks fostering academic dishonesty and diminishing authentic student voice if not integrated with critical evaluation frameworks.",
            start: 144,
            end: 152
        },
        {
            id: "s20",
            prompt: "How should educational policies balance standardized assessment requirements with student-centered learning methodologies?",
            promptTranslation: "Các chính sách giáo dục nên cân bằng các yêu cầu đánh giá chuẩn hóa với các phương pháp học tập lấy học sinh làm trung tâm như thế nào?",
            sampleAnswer: "Policies should integrate qualitative assessments alongside standardized tests, allowing schools to prioritize holistic development and soft skills without sacrificing basic academic benchmarks.",
            start: 152,
            end: 160
        },
        {
            id: "s21",
            prompt: "Analyze the societal impact of English language proficiency on socioeconomic mobility in developing countries.",
            promptTranslation: "Phân tích tác động xã hội của sự thành thạo tiếng Anh đối với sự di động kinh tế - xã hội ở các nước đang phát triển.",
            sampleAnswer: "English proficiency serves as a critical catalyst for socioeconomic mobility, unlocking global career opportunities and higher wages, though it may inadvertently widen the inequality gap between urban and rural populations.",
            start: 160,
            end: 168
        },
        {
            id: "s22",
            prompt: "In your opinion, how will classrooms and the role of teachers change in the next fifty years?",
            promptTranslation: "Theo bạn, các lớp học và vai trò của giáo viên sẽ thay đổi như thế nào trong 50 năm tới?",
            sampleAnswer: "As English evolves into a global lingua franca, the ownership of the language shifts to multilingual speakers, systematically dismantling native-speakerism and validating diverse local English varieties in classrooms.",
            start: 168,
            end: 176
        }
    ],
    writing: {
        media: "<strong>Writing Task 2 Topic (Giáo viên)</strong><br><br>The integration of technology in classrooms is considered essential by many, while others fear it degrades face-to-face interaction between teachers and students. Discuss both views and give your opinion.",
        mediaTranslation: "Việc tích hợp công nghệ trong lớp học được nhiều người coi là cần thiết, trong khi những người khác lo ngại nó làm suy giảm sự tương tác trực tiếp giữa giáo viên và học sinh. Hãy thảo luận về cả hai quan điểm và đưa ra ý kiến của bạn.",
        prompt: "Write an essay of at least 250 words.",
        sampleAnswer: "While technological tools offer rich interactive materials, human teacher-student relationships are irreplaceable. A blended learning approach represents the optimal solution."
    }
};

const adaptiveDbTest2 = {
    reading: {
        A1: {
            media: `<strong>Mô-đun Đọc A1 (Elementary Level)</strong><br><br>Puerto Rico is an island southeast of Florida and north of Venezuela, located between the Atlantic Ocean and the Caribbean Sea. It is not far from Haiti and the Dominican Republic. Puerto Rico has many beautiful beaches that stretch for miles along the coast. It also has mountains and valleys with good land for farming. Puerto Rico means "rich port" in Spanish. Christopher Columbus landed there in 1493.`,
            mediaTranslation: `Puerto Rico là một hòn đảo ở phía đông nam Florida và phía bắc Venezuela, nằm giữa Đại Tây Dương và Biển Caribe. Nó không xa Haiti và Cộng hòa Dominica. Puerto Rico có nhiều bãi biển đẹp trải dài hàng dặm dọc theo bờ biển. Nơi đây cũng có những ngọn núi và thung lũng với đất đai màu mỡ để trồng trọt. Puerto Rico có nghĩa là "cảng giàu có" trong tiếng Tây Ban Nha. Christopher Columbus đã đặt chân đến đây vào năm 1493.`,
            task: "1. Read the article. Choose the correct answers.",
            questions: [
                {
                    id: "r2_a1_1",
                    q: "Where is Puerto Rico located?",
                    qTranslation: "Puerto Rico nằm ở đâu?",
                    options: ["Among the ocean", "Between the Atlantic Ocean and the Caribbean Sea", "Across Venezuela"],
                    optionsTranslation: ["Giữa lòng đại dương", "Giữa Đại Tây Dương và Biển Caribe", "Băng qua Venezuela"],
                    correct: 1
                },
                {
                    id: "r2_a1_2",
                    q: "What does Puerto Rico mean in Spanish?",
                    qTranslation: "Puerto Rico có nghĩa là gì trong tiếng Tây Ban Nha?",
                    options: ["Rich port", "Beautiful beach", "Green land"],
                    optionsTranslation: ["Cảng giàu có", "Bãi biển đẹp", "Đất xanh"],
                    correct: 0
                },
                {
                    id: "r2_a1_3",
                    q: "When did Christopher Columbus land in Puerto Rico?",
                    qTranslation: "Christopher Columbus đặt chân đến Puerto Rico khi nào?",
                    options: ["In 1508", "In 1493", "Recently"],
                    optionsTranslation: ["Vào năm 1508", "Vào năm 1493", "Gần đây"],
                    correct: 1
                }
            ]
        },
        A2: {
            media: `<strong>Mô-đun Đọc A2 (Pre-Intermediate Level)</strong><br><br>Fifteen years after Christopher Columbus arrived, the Spanish explorer Juan Ponce de Leon settled there with people from Spain who came to live in the New World. Native Indians had lived on the island of Puerto Rico for hundreds of years. Tragically, many of them died in wars with the Spanish and from diseases brought from Europe. Today, the people in Puerto Rico speak Spanish – but they also speak English.`,
            mediaTranslation: `Mười lăm năm sau khi Christopher Columbus đến, nhà thám hiểm người Tây Ban Nha Juan Ponce de Leon đã đến định cư ở đây cùng với những người từ Tây Ban Nha đến sống ở Thế giới Mới. Người Ấn Độ bản địa đã sống trên đảo Puerto Rico hàng trăm năm. Thật bi thảm, nhiều người trong số họ đã chết trong các cuộc chiến tranh với người Tây Ban Nha và do các dịch bệnh mang từ châu Âu sang. Ngày nay, người dân ở Puerto Rico nói tiếng Tây Ban Nha – nhưng họ cũng nói tiếng Anh.`,
            task: "1. Read the article. Choose the correct answers.",
            questions: [
                {
                    id: "r2_a2_1",
                    q: "Who settled in Puerto Rico fifteen years after Columbus?",
                    qTranslation: "Ai đã định cư ở Puerto Rico 15 năm sau Columbus?",
                    options: ["Juan Ponce de Leon", "Christopher Columbus", "Native Indians"],
                    optionsTranslation: ["Juan Ponce de Leon", "Christopher Columbus", "Người Ấn Độ bản địa"],
                    correct: 0
                },
                {
                    id: "r2_a2_2",
                    q: "Why did many native Indians die on the island?",
                    qTranslation: "Tại sao nhiều người Ấn Độ bản địa chết trên đảo?",
                    options: ["Due to warm climate", "In wars and from European diseases", "Because they moved to Spain"],
                    optionsTranslation: ["Do khí hậu ấm áp", "Trong chiến tranh và do dịch bệnh từ Châu Âu", "Bởi vì họ chuyển sang Tây Ban Nha"],
                    correct: 1
                },
                {
                    id: "r2_a2_3",
                    q: "What languages do people in Puerto Rico speak today?",
                    qTranslation: "Người dân Puerto Rico ngày nay nói ngôn ngữ gì?",
                    options: ["Only Spanish", "Only English", "Spanish and also English"],
                    optionsTranslation: ["Chỉ tiếng Tây Ban Nha", "Chỉ tiếng Anh", "Tiếng Tây Ban Nha và cả tiếng Anh"],
                    correct: 2
                }
            ]
        },
        B1: {
            media: `<strong>Mô-đun Đọc B1 (Intermediate Level)</strong><br><br>Some scientists have predicted that healthy adults and children may one day take drugs to improve their intelligence and intellectual performance. A research group has suggested that such drugs might become as common as coffee or tea within the next couple of decades. To counter this, students taking exams might have to take drugs tests like athletes. There are already drugs that are known to improve mental performance, like Ritalin, which is given to children with problems concentrating. These drugs raise serious legal and moral questions, such as deciding at what point a food supplement becomes an unfair drug in an examination.`,
            mediaTranslation: `Một số nhà khoa học đã dự đoán rằng những người lớn và trẻ em khỏe mạnh một ngày nào đó có thể sử dụng các loại thuốc để cải thiện trí thông minh và hiệu suất trí tuệ của họ. Một nhóm nghiên cứu đã gợi ý rằng những loại thuốc như vậy có thể trở nên phổ biến như cà phê hoặc trà trong vòng vài thập kỷ tới. Để chống lại điều này, học sinh đi thi có thể phải trải qua các cuộc kiểm tra chất kích thích như các vận động viên. Đã có những loại thuốc được biết đến là giúp cải thiện hiệu suất tinh thần, như Ritalin, loại thuốc được trao cho trẻ em gặp vấn đề về tập trung. Những loại thuốc này đặt ra các câu hỏi nghiêm trọng về mặt pháp lý và đạo đức, chẳng hạn như quyết định thời điểm một chất bổ sung dinh dưỡng trở thành một loại thuốc gian lận không công bằng trong kỳ thi.`,
            task: "1. Read the passage and choose the best answer.",
            questions: [
                {
                    id: "r2_b1_1",
                    q: "What does the passage mainly discuss?",
                    qTranslation: "Đoạn văn chủ yếu thảo luận về vấn đề gì?",
                    options: ["Drugs for students", "Drugs that improve mental performance", "How to make coffee and tea"],
                    optionsTranslation: ["Thuốc cho học sinh", "Các loại thuốc giúp cải thiện hiệu suất tinh thần", "Cách pha trà và cà phê"],
                    correct: 1
                },
                {
                    id: "r2_b1_2",
                    q: "Ritalin is a drug commonly given to children who have problems with:",
                    qTranslation: "Ritalin là một loại thuốc thường được trao cho trẻ em gặp vấn đề về:",
                    options: ["Concentrating", "Sleeping", "Running"],
                    optionsTranslation: ["Tập trung", "Ngủ", "Chạy bộ"],
                    correct: 0
                },
                {
                    id: "r2_b1_3",
                    q: "According to the passage, what difficulty might arise during exams in the future?",
                    qTranslation: "Theo đoạn văn, khó khăn nào có thể phát sinh trong các kỳ thi trong tương lai?",
                    options: ["Deciding if food supplements are unfair drugs", "Providing coffee or tea to students", "Testing athletes for drugs"],
                    optionsTranslation: ["Quyết định xem chất bổ sung có phải chất cấm gian lận không", "Cung cấp trà hoặc cà phê cho học sinh", "Kiểm tra chất kích thích ở vận động viên"],
                    correct: 0
                }
            ]
        },
        B2: {
            media: `<strong>Mô-đun Đọc B2 (Upper-Intermediate Level)</strong><br><br>When gas station manager Roger Randolph realized it was costing him money each time someone filled up with $4-a-gallon gas, he hung a sign on his pumps: "No more credit cards". Gas station operators nationwide are reporting similar woes as higher prices translate into higher credit card fees the managers must pay, squeezing profits at the pump. "The more they buy, the more we lose," said Randolph. His complaints target the so-called interchange fee - a fixed percentage of the sale price paid to credit card companies (usually at just under 2 percent). As gas tops $4 a gallon, fees reach 10 cents a gallon. Convenience stores paid roughly $7.6 billion in credit card fees last year, while making $3.4 billion in profits.`,
            mediaTranslation: `Khi quản lý trạm xăng Roger Randolph nhận ra rằng mỗi lần ai đó đổ xăng giá 4 USD một gallon đều khiến ông tốn tiền, ông đã treo một tấm biển trên máy bơm của mình: "Không chấp nhận thẻ tín dụng". Các chủ trạm xăng trên toàn quốc cũng đang báo cáo những nỗi lo tương tự khi giá xăng cao hơn đồng nghĩa với phí thẻ tín dụng cao hơn mà họ phải trả, làm bóp nghẹt lợi nhuận tại cây xăng. "Họ càng mua nhiều, chúng tôi càng lỗ nhiều," Randolph nói. Những lời than phiền của ông nhằm vào khoản phí gọi là phí dịch vụ giao dịch (interchange fee) - một tỷ lệ phần trăm cố định trên giá bán được trả cho các công ty thẻ tín dụng (thường là dưới 2%). Khi giá xăng vượt 4 USD/gallon, phí giao dịch lên tới 10 cent/gallon. Các cửa hàng tiện lợi đã phải trả khoảng 7,6 tỷ USD phí thẻ tín dụng vào năm ngoái, trong khi chỉ thu về 3,4 tỷ USD lợi nhuận.`,
            task: "1. Read the passage and choose the best answer.",
            questions: [
                {
                    id: "r2_b2_1",
                    q: "Why did some gas station owners decide to ban credit cards?",
                    qTranslation: "Tại sao một số chủ trạm xăng quyết định cấm thanh toán thẻ tín dụng?",
                    options: ["Because of high credit card interchange fees", "Because they prefer digital banking", "Because gas prices are decreasing"],
                    optionsTranslation: ["Do phí giao dịch thẻ tín dụng quá cao", "Bởi vì họ thích ngân hàng số hơn", "Do giá xăng đang giảm xuống"],
                    correct: 0
                },
                {
                    id: "r2_b2_2",
                    q: "What is the average interchange fee percentage paid to credit card companies?",
                    qTranslation: "Tỷ lệ phần trăm phí giao dịch trung bình trả cho công ty thẻ tín dụng là bao nhiêu?",
                    options: ["Exactly 10 percent", "About 11 to 12 cents", "Just under 2 percent"],
                    optionsTranslation: ["Đúng 10 phần trăm", "Khoảng 11 đến 12 cent", "Dưới 2 phần trăm"],
                    correct: 2
                },
                {
                    id: "r2_b2_3",
                    q: "How much did convenience stores pay in credit card fees last year compared to their profits?",
                    qTranslation: "Năm ngoái các cửa hàng tiện lợi đã trả bao nhiêu phí thẻ tín dụng so với lợi nhuận của họ?",
                    options: ["Paid $7.6 billion in fees, made $3.4 billion in profits", "Paid $3.4 billion in fees, made $7.6 billion in profits", "Paid 10 cents in fees, made 11 cents in profits"],
                    optionsTranslation: ["Trả 7,6 tỷ USD phí, thu về 3,4 tỷ USD lợi nhuận", "Trả 3,4 tỷ USD phí, thu về 7,6 tỷ USD lợi nhuận", "Trả 10 cent phí, thu về 11 cent lợi nhuận"],
                    correct: 0
                }
            ]
        },
        C1: {
            media: `<strong>Mô-đun Đọc C1 (Advanced Level)</strong><br><br>The world's oceans have warmed 50 percent faster over the last 40 years than previously thought due to climate change, Australian and US researchers reported. Higher ocean temperatures expand the volume of water, contributing to a rise in sea levels that is submerging small island nations and threatening low-lying delta regions. Rising sea levels are driven by thermal expansion and additional water from melting sources of ice, both caused by global warming. For example, the ice sheet that sits atop Greenland contains enough water to raise world ocean levels by seven meters, which would bury sea-level cities from Dhaka to Shanghai. Trying to figure out how much each factor contributes to rising sea levels is critically important.`,
            mediaTranslation: `Các nhà nghiên cứu khí hậu của Úc và Mỹ báo cáo rằng các đại dương trên thế giới đã ấm lên nhanh hơn 50% trong 40 năm qua so với suy nghĩ trước đây do biến đổi khí hậu. Nhiệt độ đại dương cao hơn làm giãn nở thể tích nước, góp phần làm tăng mực nước biển đang nhấn chìm các quốc gia đảo nhỏ và đe dọa các vùng đồng bằng trũng thấp. Mực nước biển dâng cao được thúc đẩy bởi sự giãn nở nhiệt và nước bổ sung từ các nguồn băng tan, cả hai đều do hiện tượng ấm lên toàn cầu gây ra. Ví dụ, dải băng nằm trên đỉnh đảo Greenland chứa đủ nước để nâng mực nước đại dương thế giới lên 7 mét, điều này sẽ nhấn chìm các thành phố ngang mực nước biển từ Dhaka đến Thượng Hải. Cố gắng tìm ra mức độ đóng góp của mỗi yếu tố đối với mực nước biển dâng là vô cùng quan trọng.`,
            task: "1. Read the article and choose the correct answers.",
            questions: [
                {
                    id: "r2_c1_1",
                    q: "What is the primary cause of the fast warming of the world's oceans?",
                    qTranslation: "Nguyên nhân chính của việc đại dương ấm lên nhanh chóng là gì?",
                    options: ["Industrial shipping emissions", "Climate change and global warming", "Undersea volcanic activity"],
                    optionsTranslation: ["Khí thải từ ngành vận tải biển", "Biến đổi khí hậu và ấm lên toàn cầu", "Hoạt động núi lửa dưới lòng biển"],
                    correct: 1
                },
                {
                    id: "r2_c1_2",
                    q: "Greenland's ice sheet contains enough water to raise ocean levels by:",
                    qTranslation: "Dải băng của Greenland chứa đủ nước để nâng mực nước đại dương lên:",
                    options: ["Seven meters", "Twenty-three meters", "Fifty percent"],
                    optionsTranslation: ["Bảy mét", "Hai mươi ba mét", "Năm mươi phần trăm"],
                    correct: 0
                },
                {
                    id: "r2_c1_3",
                    q: "Which two factors drive the rising sea levels?",
                    qTranslation: "Hai yếu tố nào thúc đẩy mực nước biển dâng cao?",
                    options: ["Undersea earthquakes and heavy rain", "Thermal expansion of seawater and water from melting ice", "Increased shipping and industrial waste"],
                    optionsTranslation: ["Động đất dưới biển và mưa lớn", "Giãn nở nhiệt của nước biển và nước từ băng tan", "Tăng hoạt động vận tải biển và rác thải công nghiệp"],
                    correct: 1
                }
            ]
        },
        C2: {
            media: `<strong>Mô-đun Đọc C2 (Proficiency Level)</strong><br><br>Japan's 24-hour convenience stores, already struggling with lagging sales and growth, may soon face moves to limit business hours and close the stores late at night to reduce carbon dioxide emissions and cut energy use. The prefecture of Saitama may follow the footsteps of Kyoto and urge stores to close from 11 p.m. to 7 a.m. This move is strongly opposed by the industry, which fears a withering impact. Seven-Eleven Japan's president, Toshiro Yamaguchi, stated that even if they operate for 16 hours, they cannot stop the refrigerators. He estimated that such cuts in operating hours would reduce each store's profit by 20 percent, destroying their current business model. Nomura Securities analyst Masafumi Shoda added that while urban stores do better, some in the countryside are inefficient.`,
            mediaTranslation: `Các cửa hàng tiện lợi hoạt động 24 giờ của Nhật Bản, vốn đã gặp khó khăn do doanh số và mức tăng trưởng chậm chạp, có thể sớm phải đối mặt với các động thái hạn chế giờ làm việc và đóng cửa vào ban đêm nhằm giảm lượng khí thải carbon dioxide và tiết kiệm năng lượng. Tỉnh Saitama có thể đi theo bước chân của Kyoto và kêu gọi các cửa hàng tiện lợi đóng cửa từ 11 giờ đêm đến 7 giờ sáng. Động thái này vấp phải sự phản đối mạnh mẽ từ ngành công nghiệp vì họ lo sợ một tác động suy tàn nghiêm trọng. Chủ tịch Seven-Eleven Nhật Bản, ông Toshiro Yamaguchi, tuyên bố rằng ngay cả khi họ chỉ hoạt động trong 16 giờ, họ cũng không thể tắt tủ lạnh. Ông ước tính rằng việc cắt giảm giờ hoạt động như vậy sẽ làm giảm 20% lợi nhuận của mỗi cửa hàng, phá hủy hoàn toàn mô hình kinh doanh hiện tại. Nhà phân tích Masafumi Shoda của Nomura Securities nói thêm rằng trong khi các cửa hàng đô thị hoạt động hiệu quả hơn, một số cửa hàng ở nông thôn tỏ ra kém hiệu quả.`,
            task: "1. Read the passage and choose the best answer.",
            questions: [
                {
                    id: "r2_c2_1",
                    q: "Why do local governments in Japan propose to close 24-hour convenience stores at night?",
                    qTranslation: "Tại sao chính quyền địa phương ở Nhật Bản đề xuất đóng cửa các cửa hàng tiện lợi 24h vào ban đêm?",
                    options: ["To reduce carbon dioxide emissions and cut down energy use", "To prevent convenience store thefts and robberies", "To encourage residents to sleep earlier"],
                    optionsTranslation: ["Để giảm khí thải carbon và cắt giảm sử dụng năng lượng", "Để ngăn chặn các vụ trộm cướp cửa hàng tiện lợi", "Để khuyến khích người dân đi ngủ sớm hơn"],
                    correct: 0
                },
                {
                    id: "r2_c2_2",
                    q: "According to the president of Seven-Eleven Japan, closing stores at night would reduce profit by:",
                    qTranslation: "Theo chủ tịch Seven-Eleven Nhật Bản, đóng cửa cửa hàng vào ban đêm sẽ làm giảm lợi nhuận:",
                    options: ["50 percent", "16 percent", "20 percent"],
                    optionsTranslation: ["50 phần trăm", "16 phần trăm", "20 phần trăm"],
                    correct: 2
                },
                {
                    id: "r2_c2_3",
                    q: "What difficulty does Seven-Eleven face regarding late night store closures?",
                    qTranslation: "Seven-Eleven gặp khó khăn gì liên quan đến việc đóng cửa cửa hàng vào ban đêm?",
                    options: ["Refrigerators cannot be stopped even during closure hours", "They cannot hire enough staff for night shifts", "Tobacco taxes are too high in cities"],
                    optionsTranslation: ["Tủ lạnh không thể tắt ngay cả trong những giờ đóng cửa", "Họ không thể thuê đủ nhân viên trực ca đêm", "Thuế thuốc lá quá cao trong các thành phố"],
                    correct: 0
                }
            ]
        }
    },
    listening: {
        A1: {
            media: "<strong>Mô-đun Nghe A1 (Elementary Level)</strong><br><br>🔊 Vui lòng đeo tai nghe, bấm nút Play để nghe hội thoại ngắn và trả lời câu hỏi.",
            mediaTranslation: "Lắng nghe đoạn băng tự giới thiệu bản thân đơn giản của David.",
            task: "1. Chọn phương án trả lời chính xác nhất.",
            audioText: "Hello. My name is David. I am from Canada. I am twenty-five years old. I live in Hanoi now. I like Vietnamese food very much, especially Pho. I also enjoy teaching English here.",
            questions: [
                {
                    id: "l2_a1_1",
                    q: "Where is David from?",
                    qTranslation: "David đến từ đâu?",
                    options: ["Canada", "America", "England"],
                    optionsTranslation: ["Canada", "Mỹ", "Anh"],
                    correct: 0
                },
                {
                    id: "l2_a1_2",
                    q: "How old is David?",
                    qTranslation: "David bao nhiêu tuổi?",
                    options: ["20 years old", "25 years old", "30 years old"],
                    optionsTranslation: ["20 tuổi", "25 tuổi", "30 tuổi"],
                    correct: 1
                },
                {
                    id: "l2_a1_3",
                    q: "What Vietnamese food does David like especially?",
                    qTranslation: "Món ăn Việt Nam nào David đặc biệt thích?",
                    options: ["Banh mi", "Pho", "Bun cha"],
                    optionsTranslation: ["Bánh mì", "Phở", "Bún chả"],
                    correct: 1
                }
            ]
        },
        A2: {
            media: "<strong>Mô-đun Nghe A2 (Pre-Intermediate Level)</strong><br><br>🔊 Lắng nghe chia sẻ của người nói thứ nhất về ngày đầu đi làm.",
            mediaTranslation: "Lắng nghe Speaker 1 kể về trải nghiệm ngày đầu tiên nhận việc.",
            task: "1. Chọn phương án trả lời đúng nhất.",
            audioText: "It was my first day at the office. I didn't know anyone, and my hands were shaking when I met the manager. I was so worried about making mistakes. Fortunately, the team was very friendly.",
            questions: [
                {
                    id: "l2_a2_1",
                    q: "How did Speaker 1 feel on their first day at work?",
                    qTranslation: "Speaker 1 cảm thấy thế nào trong ngày đầu đi làm?",
                    options: ["Annoyed", "Embarrassed", "Nervous"],
                    optionsTranslation: ["Bực bội", "Xấu hổ", "Lo lắng"],
                    correct: 2
                },
                {
                    id: "l2_a2_2",
                    q: "Where did Speaker 1 work?",
                    qTranslation: "Speaker 1 làm việc ở đâu?",
                    options: ["At home", "In an office", "At a hospital"],
                    optionsTranslation: ["Tại nhà", "Trong văn phòng", "Tại bệnh viện"],
                    correct: 1
                },
                {
                    id: "l2_a2_3",
                    q: "What happened to Speaker 1's hands when meeting the manager?",
                    qTranslation: "Tay của Speaker 1 bị làm sao khi gặp quản lý?",
                    options: ["They were cold", "They were shaking", "They were warm"],
                    optionsTranslation: ["Chúng bị lạnh", "Chúng bị run rẩy", "Chúng bị ấm"],
                    correct: 1
                }
            ]
        },
        B1: {
            media: "<strong>Mô-đun Nghe B1 (Intermediate Level)</strong><br><br>🔊 Lắng nghe chia sẻ của người nói thứ hai về ngày đầu đi làm.",
            mediaTranslation: "Lắng nghe Speaker 2 chia sẻ sự hào hứng trong ngày đầu nhận việc.",
            task: "1. Chọn phương án trả lời chính xác nhất.",
            audioText: "I was so thrilled and excited to start my new job! The office was very modern, the team was incredibly welcoming, and I couldn't wait to begin working on the new projects.",
            questions: [
                {
                    id: "l2_b1_1",
                    q: "How did Speaker 2 feel about starting the new job?",
                    qTranslation: "Speaker 2 cảm thấy thế nào về việc bắt đầu công việc mới?",
                    options: ["Nervous", "Apologetic", "Excited"],
                    optionsTranslation: ["Lo lắng", "Biết lỗi", "Hào hứng"],
                    correct: 2
                },
                {
                    id: "l2_b1_2",
                    q: "What was Speaker 2's impression of the office?",
                    qTranslation: "Ấn tượng của Speaker 2 về văn phòng là gì?",
                    options: ["It was old", "It was modern", "It was small"],
                    optionsTranslation: ["Nó cũ kỹ", "Nó hiện đại", "Nó nhỏ bé"],
                    correct: 1
                },
                {
                    id: "l2_b1_3",
                    q: "What did Speaker 2 eagerly want to do?",
                    qTranslation: "Speaker 2 hào hứng muốn làm điều gì?",
                    options: ["Go home early", "Meet client", "Begin working on new projects"],
                    optionsTranslation: ["Về nhà sớm", "Gặp gỡ khách hàng", "Bắt đầu làm việc với các dự án mới"],
                    correct: 2
                }
            ]
        },
        B2: {
            media: "<strong>Mô-đun Nghe B2 (Upper-Intermediate Level)</strong><br><br>🔊 Lắng nghe chia sẻ của người nói thứ ba về sự cố ngày đầu đi làm.",
            mediaTranslation: "Lắng nghe Speaker 3 chia sẻ một sự cố dở khóc dở cười ngày đầu nhận việc.",
            task: "1. Chọn phương án trả lời đúng nhất.",
            audioText: "I accidentally spilled my hot coffee all over my new boss's keyboard within the first ten minutes of arriving at the office. My face turned completely red and I felt so embarrassed.",
            questions: [
                {
                    id: "l2_b2_1",
                    q: "How did Speaker 3 feel after the incident?",
                    qTranslation: "Speaker 3 cảm thấy thế nào sau sự cố?",
                    options: ["Annoyed", "Embarrassed", "Surprised"],
                    optionsTranslation: ["Bực bội", "Ngượng ngùng / Xấu hổ", "Ngạc nhiên"],
                    correct: 1
                },
                {
                    id: "l2_b2_2",
                    q: "What did Speaker 3 spill?",
                    qTranslation: "Speaker 3 đã làm đổ thứ gì?",
                    options: ["Hot tea", "Cold water", "Hot coffee"],
                    optionsTranslation: ["Trà nóng", "Nước lạnh", "Cà phê nóng"],
                    correct: 2
                },
                {
                    id: "l2_b2_3",
                    q: "When did the incident occur?",
                    qTranslation: "Sự cố xảy ra khi nào?",
                    options: ["Within the first ten minutes of arriving", "At the end of the day", "During lunch time"],
                    optionsTranslation: ["Trong vòng 10 phút đầu tiên khi đến nơi", "Vào cuối ngày làm việc", "Vào giờ ăn trưa"],
                    correct: 0
                }
            ]
        },
        C1: {
            media: "<strong>Mô-đun Nghe C1 (Advanced Level)</strong><br><br>🔊 Lắng nghe chia sẻ của người nói thứ tư về lý do họ tức giận.",
            mediaTranslation: "Lắng nghe Speaker 4 kể về một sự việc bất công ngày đầu làm việc.",
            task: "1. Chọn phương án trả lời chính xác nhất.",
            audioText: "My coworker took credit for all the presentation slides I prepared, and told the supervisor he did it all himself. I was absolutely boiling with anger and felt furious.",
            questions: [
                {
                    id: "l2_c1_1",
                    q: "How did Speaker 4 feel on their first day?",
                    qTranslation: "Speaker 4 cảm thấy thế nào trong ngày đầu đi làm?",
                    options: ["Amused", "Furious", "Embarrassed"],
                    optionsTranslation: ["Vui vẻ", "Giận dữ / Furious", "Ngượng ngùng"],
                    correct: 1
                },
                {
                    id: "l2_c1_2",
                    q: "What did the coworker take credit for?",
                    qTranslation: "Người đồng nghiệp đã giành công lao cho việc gì?",
                    options: ["Writing email", "Presentation slides", "Serving coffee"],
                    optionsTranslation: ["Viết email", "Các slide thuyết trình", "Phục vụ cà phê"],
                    correct: 1
                },
                {
                    id: "l2_c1_3",
                    q: "Who did the coworker lie to?",
                    qTranslation: "Người đồng nghiệp đã nói dối ai?",
                    options: ["The supervisor", "Speaker 4's parents", "A client"],
                    optionsTranslation: ["Người giám sát", "Bố mẹ Speaker 4", "Khách hàng"],
                    correct: 0
                }
            ]
        },
        C2: {
            media: "<strong>Mô-đun Nghe C2 (Proficiency Level)</strong><br><br>🔊 Lắng nghe chia sẻ của người nói thứ năm về sự thất vọng ngày đầu đi làm.",
            mediaTranslation: "Lắng nghe Speaker 5 kể về những bất tiện kỹ thuật gặp phải khi nhận việc.",
            task: "1. Chọn phương án trả lời chính xác nhất.",
            audioText: "The computer they gave me kept crashing every five minutes, and the IT support was busy all day. I couldn't complete a single task and felt so frustrated.",
            questions: [
                {
                    id: "l2_c2_1",
                    q: "How did Speaker 5 feel?",
                    qTranslation: "Speaker 5 cảm thấy thế nào?",
                    options: ["Frustrated", "Amused", "Annoyed"],
                    optionsTranslation: ["Bất lực / Nản lòng", "Thích thú", "Bực mình"],
                    correct: 0
                },
                {
                    id: "l2_c2_2",
                    q: "What was wrong with the computer?",
                    qTranslation: "Có vấn đề gì xảy ra với máy tính?",
                    options: ["It kept crashing every five minutes", "It had no internet connection", "The screen was broken"],
                    optionsTranslation: ["Nó bị sập nguồn liên tục mỗi 5 phút", "Nó không có kết nối internet", "Màn hình bị hỏng"],
                    correct: 0
                },
                {
                    id: "l2_c2_3",
                    q: "Why couldn't Speaker 5 get help?",
                    qTranslation: "Tại sao Speaker 5 không nhận được sự giúp đỡ?",
                    options: ["The boss didn't allow it", "IT support was busy all day", "No IT support existed"],
                    optionsTranslation: ["Sếp không cho phép", "Đội hỗ trợ IT bận rộn cả ngày", "Không có đội hỗ trợ IT"],
                    correct: 1
                }
            ]
        }
    },
    speaking: [
        {
            id: "s2_1",
            prompt: "Tell me about yourself and your family.",
            promptTranslation: "Hãy giới thiệu về bản thân bạn và gia đình của bạn.",
            sampleAnswer: "I am an English teacher. I live in a warm family with my spouse and two children. We love spending weekends cooking and relaxing together.",
            start: 0,
            end: 8
        },
        {
            id: "s2_2",
            prompt: "Tell me about your hometown. What do you like or dislike about it?",
            promptTranslation: "Hãy kể về quê hương của bạn. Bạn thích hay không thích điều gì về nơi đó?",
            sampleAnswer: "My hometown is a beautiful city with rich history and delicious food. I love the friendly people, but the traffic congestion is sometimes annoying.",
            start: 8,
            end: 16
        },
        {
            id: "s2_3",
            prompt: "What do you like or dislike about your current job?",
            promptTranslation: "Bạn thích hay không thích điều gì về công việc hiện tại của bạn?",
            sampleAnswer: "I love teaching because I enjoy helping students grow. However, grading exams and handling paperwork can be time-consuming.",
            start: 16,
            end: 24
        },
        {
            id: "s2_4",
            prompt: "What do people in your hometown usually do in their free time?",
            promptTranslation: "Người dân ở quê hương bạn thường làm gì vào thời gian rảnh rỗi?",
            sampleAnswer: "People in my hometown love gathering at local coffee shops, walking in public parks, and having dinner with families on weekends.",
            start: 24,
            end: 32
        },
        {
            id: "s2_5",
            prompt: "Do you like travelling? Where in your hometown do you think people should visit?",
            promptTranslation: "Bạn có thích đi du lịch không? Nơi nào ở quê hương bạn mà bạn nghĩ mọi người nên ghé thăm?",
            sampleAnswer: "Yes, I travel to relax. In my hometown, tourists should visit the ancient pagoda in the city center and the beautiful lake nearby.",
            start: 32,
            end: 40
        },
        {
            id: "s2_6",
            prompt: "How long have you been learning English, and what do you think is the most difficult aspect of English?",
            promptTranslation: "Bạn đã học tiếng Anh bao lâu rồi, và bạn nghĩ khía cạnh khó khăn nhất của tiếng Anh là gì?",
            sampleAnswer: "I have been learning English for over ten years. In my opinion, mastering English speaking and natural pronunciation is the most challenging part.",
            start: 40,
            end: 48
        },
        {
            id: "s2_7",
            prompt: "Do you have many friends? What do you usually do together in your free time?",
            promptTranslation: "Bạn có nhiều bạn bè không? Các bạn thường làm gì cùng nhau vào thời gian rảnh rỗi?",
            sampleAnswer: "Yes, I have a few close friends. In our free time, we usually meet up at cozy cafes, play badminton, or discuss our teaching experiences.",
            start: 48,
            end: 56
        },
        {
            id: "s2_8",
            prompt: "Describe a close friend. You should say: how long you have known this person, how you met, what kind of person he or she is, and explain why you like him or her.",
            promptTranslation: "Hãy miêu tả một người bạn thân. Bạn nên nói: bạn biết người đó bao lâu, gặp nhau thế nào, họ là kiểu người gì, và giải thích tại sao bạn quý mến họ.",
            sampleAnswer: "I have known my close friend, Lan, for five years. We met at university. She is extremely kind, supportive, and humorous, which is why I enjoy her company.",
            start: 56,
            end: 80
        },
        {
            id: "s2_9",
            prompt: "What do you expect in a good friend?",
            promptTranslation: "Bạn kỳ vọng điều gì ở một người bạn tốt?",
            sampleAnswer: "I believe a good friend should be honest, loyal, and supportive. They should be willing to listen to you and help you during difficult times.",
            start: 80,
            end: 90
        },
        {
            id: "s2_10",
            prompt: "Which are more important to you – your family or your friends?",
            promptTranslation: "Đối với bạn, gia đình hay bạn bè quan trọng hơn?",
            sampleAnswer: "Both are valuable, but my family is always my top priority because their love is unconditional and they are always by my side.",
            start: 90,
            end: 100
        },
        {
            id: "s2_11",
            prompt: "Is it possible to make friends with people of the opposite sex?",
            promptTranslation: "Có thể làm bạn thân với người khác giới được không?",
            sampleAnswer: "Yes, absolutely. Platonic friendships between opposite sexes are common, based on shared values, professional respect, and mutual understanding.",
            start: 100,
            end: 110
        }
    ],
    writing: {
        media: "<strong>Đề bài viết số 2: Chọn 1 trong 2 chủ đề viết thư dưới đây (Writing Task 1)</strong><br><br><strong>Chủ đề 1 (Singapore Lost Suitcase):</strong> You travelled last week from Singapore to Ho Chi Minh City and your suitcase was lost. Although you have informed the Lost and Found Office at the airport, you have heard nothing from the airline company. Write a letter of no more than 150 words to the airline company to provide detailed information about the incident. Describe your suitcase, its contents, and ask what they are going to do about it.<br><br><strong>Chủ đề 2 (Cruise Disappointment):</strong> You travelled last week on a five-star cruise around South East Asia, yet you were upset and disappointed with the experience. Write a letter of no more than 150 words to the cruise provider specifying your disappointments (what went wrong, how you felt) and what you want them to do about it.",
        mediaTranslation: "<strong>Bản dịch đề bài viết:</strong><br><strong>Chủ đề 1 (Mất hành lý):</strong> Tuần trước bạn đi du lịch từ Singapore về TP.HCM và bị thất lạc vali. Dù đã khai báo với phòng Thất lạc hành lý ở sân bay, bạn vẫn chưa nhận được tin tức gì từ hãng bay. Hãy viết thư dưới 150 từ cho hãng bay cung cấp chi tiết sự việc, miêu tả vali, đồ đạc bên trong và hỏi giải pháp xử lý.<br><br><strong>Chủ đề 2 (Thất vọng về chuyến tàu):</strong> Tuần trước bạn đi du thuyền 5 sao quanh Đông Nam Á và cảm thấy vô cùng thất vọng về trải nghiệm này. Hãy viết thư dưới 150 từ gửi công ty điều hành du thuyền nêu chi tiết lý do thất vọng, cảm xúc của bạn và yêu cầu bồi thường/xin lỗi.",
        prompt: "Write a letter of no more than 150 words.",
        sampleAnswer: "Dear Customer Support, I am writing to complain about my lost suitcase on flight SQ172 from Singapore to Ho Chi Minh City on June 10th. It is a large black Samsonite suitcase containing important clothes and electronic devices. I reported to Lost and Found but received no updates. Please check and compensate as soon as possible. Sincerely."
    }
};

// Gắn các đề thi vào đối tượng window để các module khác truy cập đồng bộ
if (typeof window !== 'undefined') {
    window.adaptiveDbTest1 = adaptiveDbTest1;
    window.adaptiveDbTest2 = adaptiveDbTest2;
}

let adaptiveDb = adaptiveDbTest1;
