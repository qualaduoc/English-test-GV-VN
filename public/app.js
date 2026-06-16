// --- NGÂN HÀNG ĐỀ THI THÍCH ỨNG SONG NGỮ (A1 - C2) ---
const adaptiveDb = {
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
            prompt: "What is your name and where do you live?",
            promptTranslation: "Tên của bạn là gì và bạn đang sống ở đâu?",
            start: 0,
            end: 11
        },
        {
            id: "s2",
            prompt: "What do you like to do in your free time?",
            promptTranslation: "Bạn thích làm gì vào thời gian rảnh rỗi?",
            start: 11,
            end: 23
        },
        {
            id: "s3",
            prompt: "Can you talk about your family and your home?",
            promptTranslation: "Bạn có thể kể về gia đình và ngôi nhà của bạn không?",
            start: 23,
            end: 35
        },
        {
            id: "s4",
            prompt: "What is your favorite food and how often do you eat it?",
            promptTranslation: "Món ăn yêu thích của bạn là gì và bạn có thường xuyên ăn món đó không?",
            start: 35,
            end: 47
        },
        {
            id: "s5",
            prompt: "Describe your typical daily routine as a teacher.",
            promptTranslation: "Hãy mô tả một thói quen hàng ngày điển hình của bạn với tư cách là một giáo viên.",
            start: 47,
            end: 59
        },
        {
            id: "s6",
            prompt: "Who is a teacher that inspired you the most in your life?",
            promptTranslation: "Ai là giáo viên đã truyền cảm hứng nhiều nhất cho bạn trong cuộc sống?",
            start: 59,
            end: 71
        },
        {
            id: "s7",
            prompt: "What is your favorite season of the year and why?",
            promptTranslation: "Mùa yêu thích nhất của bạn trong năm là gì và tại sao?",
            start: 71,
            end: 83
        },
        {
            id: "s8",
            prompt: "Tell me about a memorable holiday or trip that you had.",
            promptTranslation: "Hãy kể cho tôi nghe về một kỳ nghỉ hoặc chuyến đi đáng nhớ mà bạn đã từng có.",
            start: 83,
            end: 95
        },
        {
            id: "s9",
            prompt: "Why did you choose to become a teacher instead of other professions?",
            promptTranslation: "Tại sao bạn lại chọn trở thành giáo viên thay vì những ngành nghề khác?",
            start: 95,
            end: 107
        },
        {
            id: "s10",
            prompt: "What do you think are the greatest benefits of learning English today?",
            promptTranslation: "Bạn nghĩ lợi ích lớn nhất của việc học tiếng Anh ngày nay là gì?",
            start: 107,
            end: 119
        },
        {
            id: "s11",
            prompt: "How has technology changed the way we teach and study recently?",
            promptTranslation: "Công nghệ đã thay đổi cách chúng ta giảng dạy và học tập như thế nào trong thời gian gần đây?",
            start: 119,
            end: 131
        },
        {
            id: "s12",
            prompt: "Describe a book or a movie that left a strong impression on you.",
            promptTranslation: "Hãy mô tả một cuốn sách hoặc bộ phim đã để lại ấn tượng mạnh mẽ cho bạn.",
            start: 131,
            end: 143
        },
        {
            id: "s13",
            prompt: "Talk about a healthy habit you have and how it benefits your life.",
            promptTranslation: "Hãy nói về một thói quen lành mạnh bạn có và lợi ích của nó đối với cuộc sống của bạn.",
            start: 143,
            end: 155
        },
        {
            id: "s14",
            prompt: "Should students wear uniforms at school? Explain your opinion.",
            promptTranslation: "Học sinh có nên mặc đồng phục ở trường không? Hãy giải thích ý kiến của bạn.",
            start: 155,
            end: 167
        },
        {
            id: "s15",
            prompt: "What personal qualities make someone a truly good teacher?",
            promptTranslation: "Những phẩm chất cá nhân nào tạo nên một giáo viên thực sự giỏi?",
            start: 167,
            end: 179
        },
        {
            id: "s16",
            prompt: "How can modern schools encourage students to develop critical thinking skills?",
            promptTranslation: "Các trường học hiện đại làm thế nào để khuyến khích học sinh phát triển kỹ năng tư duy phản biện?",
            start: 179,
            end: 191
        },
        {
            id: "s17",
            prompt: "Discuss the long-term impact of artificial intelligence on traditional teaching methods.",
            promptTranslation: "Thảo luận về tác động lâu dài của trí tuệ nhân tạo đối với các phương pháp giảng dạy truyền thống.",
            start: 191,
            end: 203
        },
        {
            id: "s18",
            prompt: "What are the primary pedagogical challenges of online learning compared to classroom instruction?",
            promptTranslation: "Những thách thức sư phạm chính của việc học trực tuyến so với hướng dẫn tại lớp học là gì?",
            start: 203,
            end: 215
        },
        {
            id: "s19",
            prompt: "How does promoting cultural exchange in schools benefit global international relations?",
            promptTranslation: "Việc thúc đẩy giao lưu văn hóa trong trường học mang lại lợi ích gì cho các quan hệ quốc tế toàn cầu?",
            start: 215,
            end: 227
        },
        {
            id: "s20",
            prompt: "Analyze the positive and negative roles of standardized testing in modern educational systems.",
            promptTranslation: "Phân tích vai trò tích cực và tiêu cực của các bài kiểm tra chuẩn hóa trong hệ thống giáo dục hiện đại.",
            start: 227,
            end: 239
        },
        {
            id: "s21",
            prompt: "What systemic measures should be implemented to promote lifelong learning among working adults?",
            promptTranslation: "Những biện pháp có tính hệ thống nào nên được triển khai để thúc đẩy học tập suốt đời ở người trưởng thành đi làm?",
            start: 239,
            end: 251
        },
        {
            id: "s22",
            prompt: "In your opinion, how will classrooms and the role of teachers change in the next fifty years?",
            promptTranslation: "Theo bạn, các lớp học và vai trò của giáo viên sẽ thay đổi như thế nào trong 50 năm tới?",
            start: 251,
            end: 263
        }
    ],
    writing: {
        media: "<strong>Writing Task 2 Topic (Giáo viên)</strong><br><br>The integration of technology in classrooms is considered essential by many, while others fear it degrades face-to-face interaction between teachers and students. Discuss both views and give your opinion.",
        mediaTranslation: "Việc tích hợp công nghệ trong lớp học được nhiều người coi là cần thiết, trong khi những người khác lo ngại nó làm suy giảm sự tương tác trực tiếp giữa giáo viên và học sinh. Hãy thảo luận về cả hai quan điểm và đưa ra ý kiến của bạn.",
        prompt: "Write an essay of at least 250 words.",
        sampleAnswer: "While technological tools offer rich interactive materials, human teacher-student relationships are irreplaceable. A blended learning approach represents the optimal solution."
    }
};

// --- BIẾN QUẢN LÝ TRẠNG THÁI ---
let currentSkill = "reading"; // reading, listening, speaking, writing
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
    
    // Cập nhật hiển thị lên Header
    document.getElementById('userDisplayName').innerText = `Thầy/Cô ${teacherName}`;

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

// --- PHẦN 5: HIỆN THỰC HÓA PHÒNG THI NÓI (Speaking) ---
let speechRecognitionObj = null;
let speechRecognitionText = "";
let userWebcamStream = null;
let isVideoPlayable = true; // Biến kiểm tra video giám khảo có hoạt động được không

// Bật Webcam giáo viên
function startUserWebcam() {
    const video = document.getElementById('userWebcam');
    const placeholder = document.getElementById('userWebcamPlaceholder');
    
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(stream => {
            userWebcamStream = stream;
            if (video) {
                video.srcObject = stream;
                video.onloadedmetadata = () => {
                    video.play().catch(e => console.log("Webcam play blocked:", e));
                };
            }
            if (placeholder) placeholder.classList.add('hidden');
        })
        .catch(err => {
            console.warn("[Webcam] Không thể mở camera giáo viên:", err.message);
            if (placeholder) {
                placeholder.innerHTML = `<i class="fa-solid fa-video-slash text-[10px] text-rose-500 mb-0.5"></i><span class="text-[8px] text-rose-500 font-semibold">Lỗi mở Camera</span>`;
            }
        });
}

// Tắt Webcam giáo viên
function stopUserWebcam() {
    if (userWebcamStream) {
        userWebcamStream.getTracks().forEach(track => track.stop());
        userWebcamStream = null;
    }
    const video = document.getElementById('userWebcam');
    if (video) video.srcObject = null;
    const placeholder = document.getElementById('userWebcamPlaceholder');
    if (placeholder) {
        placeholder.classList.remove('hidden');
        placeholder.innerHTML = `<i class="fa-solid fa-video-slash text-xs mb-0.5"></i><span>Camera đang tắt</span>`;
    }
}

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
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            const currentText = finalTranscript || interimTranscript;
            const textEl = document.getElementById('speechRealtimeText');
            if (textEl) {
                textEl.innerText = currentText || 'Đang lắng nghe...';
            }
            speechRecognitionText = finalTranscript || interimTranscript;
        };
        
        speechRecognitionObj.onerror = (event) => {
            console.warn("[Speech Recognition Error]:", event.error);
        };
    }
}

function initSpeakingExam() {
    currentSpeakingQIdx = 0;
    speakingAnswers = [];
    isVideoPlayable = true;
    
    // Tự động bật camera giáo viên
    startUserWebcam();
    
    // Khởi tạo Speech Recognition
    initSpeechRecognition();
    
    // Thiết lập nguồn video giám khảo
    const exVideo = document.getElementById('examinerVideo');
    if (exVideo) {
        exVideo.src = 'video/speaking_examiner.mp4';
        exVideo.load();
        
        exVideo.onerror = () => {
            console.warn("[Examiner Video] Lỗi load file hoặc không có file video. Chuyển chế độ TTS fallback.");
            isVideoPlayable = false;
        };
    }
    
    loadSpeakingQuestion(0);
}

function loadSpeakingQuestion(idx) {
    const q = adaptiveDb.speaking[idx];
    currentFocusQuestionId = q.id;
    saveProgressToLocalStorage();

    document.getElementById('speakingHeading').innerText = `Question ${idx + 1}`;
    document.getElementById('speakingQuestionTranscript').innerText = `"${q.prompt}"`;
    
    const trans = document.getElementById('speakingQuestionTranslation');
    trans.innerText = `(${q.promptTranslation})`;
    if (globalBilingualMode) {
        trans.classList.remove('hidden');
    } else {
        trans.classList.add('hidden');
    }

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

    startSpeakingState("prep");
}

function toggleSpeakingTranslation() {
    const trans = document.getElementById('speakingQuestionTranslation');
    trans.classList.toggle('hidden');
}

// Fallback phát âm thanh bằng TTS
function runTTSFallback(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = "en-US";
        utter.rate = 0.85;
        
        const pulse = document.getElementById('speakingVideoPulse');
        if (pulse) pulse.classList.remove('hidden');
        
        utter.onend = () => {
            if (pulse) pulse.classList.add('hidden');
        };
        window.speechSynthesis.speak(utter);
    }
}

function startSpeakingState(state) {
    speakingState = state;
    clearInterval(speakingRingInterval);

    const ringCircle = document.getElementById('speakingRingCircle');
    const timerText = document.getElementById('speakingRingTimer');
    const titleText = document.getElementById('speakingStateTitle');
    const descText = document.getElementById('speakingStateDesc');
    const iconEl = document.getElementById('speakingRingIcon');
    const btnStop = document.getElementById('btnSpeakingAction');
    const recognitionBar = document.getElementById('speakingTextRecognitionBar');
    
    const exVideo = document.getElementById('examinerVideo');
    const exPlaceholder = document.getElementById('examinerVideoPlaceholder');

    const circumference = 2 * Math.PI * 65; // ~408.4
    const q = adaptiveDb.speaking[currentSpeakingQIdx];

    if (state === 'prep') {
        speakingSeconds = 5;
        titleText.innerText = "Preparation...";
        titleText.className = "text-sm font-extrabold text-amber-500 uppercase tracking-widest";
        descText.innerText = "Thầy/Cô hãy chuẩn bị ý kiến trong 5 giây. Giám khảo ảo đang đặt câu hỏi.";
        iconEl.className = "fa-solid fa-hourglass-start text-amber-500 text-2xl mb-1.5";
        ringCircle.setAttribute("stroke", "#f59e0b");
        btnStop.disabled = true;
        if (recognitionBar) recognitionBar.classList.add('hidden');

        // Điều khiển Video giám khảo phát câu hỏi
        if (exVideo && isVideoPlayable) {
            exVideo.currentTime = q.start;
            exVideo.play()
                .then(() => {
                    if (exPlaceholder) exPlaceholder.classList.add('hidden');
                })
                .catch(err => {
                    console.warn("[Video Play Failed] Chuyển TTS fallback:", err.message);
                    if (exPlaceholder) exPlaceholder.classList.remove('hidden');
                    runTTSFallback(q.prompt);
                });
        } else {
            if (exPlaceholder) exPlaceholder.classList.remove('hidden');
            runTTSFallback(q.prompt);
        }

        speakingRingInterval = setInterval(() => {
            speakingSeconds--;
            
            if (!questionTimers[currentFocusQuestionId]) {
                questionTimers[currentFocusQuestionId] = 0;
            }
            questionTimers[currentFocusQuestionId]++;

            timerText.innerText = `00:0${speakingSeconds}`;
            const offset = circumference - (speakingSeconds / 5) * circumference;
            ringCircle.style.strokeDashoffset = offset;

            saveProgressToLocalStorage();

            // Nếu video chạm mốc end sớm hoặc đếm ngược hết giờ
            if (exVideo && isVideoPlayable && exVideo.currentTime >= q.end) {
                exVideo.pause();
            }

            if (speakingSeconds <= 0) {
                clearInterval(speakingRingInterval);
                if (exVideo && isVideoPlayable) exVideo.pause();
                startSpeakingState("recording");
            }
        }, 1000);

    } else if (state === 'recording') {
        speakingSeconds = 10; // Đếm ngược 10 giây thu âm theo đề bài
        titleText.innerText = "Recording...";
        titleText.className = "text-sm font-extrabold text-red-500 uppercase tracking-widest animate-pulse";
        descText.innerText = "Micro đang mở. Thầy/Cô hãy trả lời trực tiếp câu hỏi bằng tiếng Anh.";
        iconEl.className = "fa-solid fa-microphone text-red-500 text-2xl mb-1.5";
        ringCircle.setAttribute("stroke", "#ef4444");
        btnStop.disabled = false;
        
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
            timerText.innerText = `00:${printed}`;
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
        answerText: currentQ.prompt, // Đề bài
        transcript: userVoiceText // Bản dịch thô lấy từ micro
    });

    currentSpeakingQIdx++;
    if (currentSpeakingQIdx < adaptiveDb.speaking.length) {
        loadSpeakingQuestion(currentSpeakingQIdx);
    } else {
        // Tắt Camera giáo viên
        stopUserWebcam();
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

// --- PHẦN 6: HIỆN THỰC HÓA PHÒNG THI VIẾT (Writing) ---
function initWritingExam() {
    const promptPane = document.getElementById('writingPromptPane');
    const translationBox = document.getElementById('writingPromptTranslation');
    const db = adaptiveDb.writing;

    promptPane.innerHTML = db.media;
    translationBox.innerHTML = db.mediaTranslation;
    document.getElementById('writingEditor').value = "";
    document.getElementById('wordCounter').innerText = "0 / 350 từ";
    
    if (globalBilingualMode) {
        translationBox.classList.remove('hidden');
    } else {
        translationBox.classList.add('hidden');
    }
}

function updateWritingContent(textarea) {
    const text = textarea.value;
    writingAnswerText = text;
    
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const counter = document.getElementById('wordCounter');
    counter.innerText = `${words} / 350 từ`;

    if (words > 350) {
        counter.className = "px-3 py-1 bg-rose-950/40 border border-rose-800 rounded-full text-rose-400 text-xs font-bold animate-pulse";
        const trimmed = text.trim().split(/\s+/).slice(0, 350).join(" ");
        textarea.value = trimmed;
        writingAnswerText = trimmed;
        
        textarea.classList.add('border-rose-500', 'focus:border-rose-500');
        textarea.classList.remove('border-slate-800', 'border-amber-500', 'focus:border-emerald-500/50', 'focus:border-amber-500');
    } else if (words >= 330) {
        counter.className = "px-3 py-1 bg-amber-955/40 border border-amber-800 rounded-full text-amber-400 text-xs font-bold";
        textarea.classList.add('border-amber-500', 'focus:border-amber-500');
        textarea.classList.remove('border-slate-800', 'border-rose-500', 'focus:border-emerald-500/50', 'focus:border-rose-500');
    } else if (words >= 250) {
        counter.className = "px-3 py-1 bg-green-950/40 border border-green-800 rounded-full text-green-400 text-xs font-bold";
        textarea.classList.remove('border-rose-500', 'border-amber-500', 'focus:border-rose-500', 'focus:border-amber-500');
        textarea.classList.add('border-slate-800', 'focus:border-emerald-500/50');
    } else {
        counter.className = "px-3 py-1 bg-[#0b0f19] border border-slate-800 rounded-full text-emerald-400 text-xs font-bold";
        textarea.classList.remove('border-rose-500', 'border-amber-500', 'focus:border-rose-500', 'focus:border-amber-500');
        textarea.classList.add('border-slate-800', 'focus:border-emerald-500/50');
    }
    
    // Tự động lưu tiến trình
    saveProgressToLocalStorage();
}

// --- PHẦN 7: THUẬT TOÁN TÍNH ĐIỂM CEFR TỔNG HỢP & DASHBOARD ---
function calculateFinalScoresAndShowDashboard() {
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
        
        el.classList.add('opacity-50', 'pointer-events-none');
        if (badge) badge.classList.add('hidden');
    });

    const activeNode = document.getElementById(`node-${currentSkill}`);
    const activeBadge = document.getElementById(`badge-${currentSkill}`);
    
    if (activeNode) activeNode.classList.remove('opacity-50', 'pointer-events-none');
    if (activeBadge) activeBadge.classList.remove('hidden');

    document.getElementById('readingSectionsList').classList.add('hidden');
    document.getElementById('listeningSectionsList').classList.add('hidden');

    if (currentSkill === 'reading') {
        document.getElementById('readingSectionsList').classList.remove('hidden');
    } else if (currentSkill === 'listening') {
        document.getElementById('listeningSectionsList').classList.remove('hidden');
    }
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
    showSimpleWarning("Không thể thoát", "Thầy/Cô đang trong phòng thi chính thức. Theo quy chế khảo sát, Thầy/Cô không được rời phòng thi khi chưa nộp bài hoặc chưa hết thời gian.");
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
    clearInterval(headerTimerObj);
    clearInterval(speakingRingInterval);
    stopActiveAudio();
    clearProgressFromLocalStorage();

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
            <tr class="hover:bg-slate-800/10 transition duration-150">
                <td class="py-2.5 font-bold text-center">${rankIcon}</td>
                <td class="py-2.5 font-semibold text-slate-350 truncate max-w-[120px]" title="${item.teacher_name}${maskedPhone ? ' - SĐT: ' + maskedPhone : ''}">${displayName}</td>
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
