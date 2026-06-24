// --- CƠ SỞ DỮ LIỆU HỌC LIỆU SONG NGỮ THÔNG MINH (CEFR A1 - B2) ---
const learningMaterialsDb = {
    A1: {
        title: "A1: Thì Hiện Tại Đơn (Simple Present)",
        description: "Học cách sử dụng thì Hiện tại đơn để nói về thói quen, công việc hàng ngày và sự thật hiển nhiên.",
        lectureText: "Chào Thầy Cô, sau đây là nội dung giảng bài về Thì Hiện tại đơn. Thì Hiện tại đơn được sử dụng trong hai trường hợp chính. Thứ nhất, diễn tả hành động lặp đi lặp lại hoặc thói quen hàng ngày, ví dụ như I teach English every day nghĩa là tôi dạy tiếng anh mỗi ngày. Thứ hai, diễn tả một chân lý hoặc sự thật hiển nhiên, ví dụ The sun rises in the east nghĩa là mặt trời mọc ở hướng đông. Về mặt công thức, với chủ ngữ số nhiều như I, we, you, they, động từ giữ nguyên. Với chủ ngữ số ít như he, she, it, danh từ số ít, động từ phải thêm đuôi s hoặc es. Thầy Cô lưu ý thêm đuôi es sau các động từ kết thúc bằng các chữ cái như o, ch, sh, x, s, z.",
        theory: `
            <div class="space-y-4">
                <div>
                    <h4 class="text-blue-400 font-bold text-sm mb-1">1. Định nghĩa & Cách dùng (Usage):</h4>
                    <ul class="list-disc pl-4 text-slate-350 space-y-1">
                        <li>Dùng để diễn tả hành động lặp đi lặp lại hoặc thói quen hàng ngày (Daily routines/Habits). <br>
                            <span class="text-emerald-450 italic">Ví dụ: I teach English every day. (Tôi dạy Tiếng Anh mỗi ngày).</span>
                        </li>
                        <li>Diễn tả một chân lý hoặc sự thật hiển nhiên (Facts). <br>
                            <span class="text-emerald-450 italic">Ví dụ: The sun rises in the east. (Mặt trời mọc ở hướng đông).</span>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-blue-400 font-bold text-sm mb-1">2. Công thức (Structure):</h4>
                    <p class="text-slate-350">
                        <strong class="text-white">Khẳng định:</strong> S + V(s/es)<br>
                        <span class="text-slate-400">• Chủ ngữ số nhiều (I/We/You/They) + V (Giữ nguyên)</span><br>
                        <span class="text-slate-400">• Chủ ngữ số ít (He/She/It/Danh từ số ít) + V-s/es</span>
                    </p>
                    <p class="text-slate-350 mt-1">
                        <strong class="text-white">Phủ định:</strong> S + do/does + not + V (nguyên thể)<br>
                        <strong class="text-white">Nghi vấn:</strong> Do/Does + S + V (nguyên thể)?
                    </p>
                </div>
                <div class="warning-box bg-blue-950/20 border-blue-500/20 text-blue-300">
                    <strong>💡 LƯU Ý CHO GIÁO VIÊN:</strong> Khi chủ ngữ là ngôi thứ ba số ít (he, she, it), đừng quên thêm đuôi <strong>-s</strong> hoặc <strong>-es</strong> vào sau động từ thường! Đuôi <strong>-es</strong> thêm sau động từ kết thúc bằng: o, ch, sh, x, s, z.
                </div>
            </div>
        `,
        questions: [
            {
                id: "practice_a1_1",
                q: "She ______ English at a primary school near her house.",
                qTranslation: "Cô ấy ______ tiếng Anh tại một trường tiểu học gần nhà cô ấy.",
                options: ["teach", "teaches", "teaching"],
                optionsTranslation: ["dạy (nguyên thể)", "dạy (thêm -es)", "đang dạy (V-ing)"],
                correct: 1,
                explanation: "Vì chủ ngữ là 'She' (Ngôi thứ ba số ít) nên động từ 'teach' phải chia ở thì hiện tại đơn bằng cách thêm đuôi '-es' (do động từ kết thúc bằng đuôi 'ch') thành 'teaches'.",
                studyTip: "Mẹo nhớ: Động từ kết thúc bằng đuôi 'ch' như teach thì phải thêm đuôi 'es' khi đi với chủ ngữ số ít là She."
            },
            {
                id: "practice_a1_2",
                q: "They ______ walk to work because it is good for their health.",
                qTranslation: "Họ ______ đi bộ đi làm vì nó tốt cho sức khỏe của họ.",
                options: ["usually", "is usually", "are usually"],
                optionsTranslation: ["thường xuyên (trạng từ chỉ tần suất)", "là thường xuyên (sai cấu trúc)", "thì thường xuyên (thừa động từ tobe)"],
                correct: 0,
                explanation: "Trong câu đã có động từ thường là 'walk', do đó ta chỉ cần trạng từ chỉ tần suất 'usually' đứng trước động từ thường để bổ nghĩa. Không dùng động từ tobe (is/are) đi kèm động từ thường nguyên thể.",
                studyTip: "Mẹo nhớ: Trạng từ chỉ tần suất như usually luôn đứng trước động từ thường như walk và đứng sau động từ tobe."
            },
            {
                id: "practice_a1_3",
                q: "Does your brother ______ playing tennis on weekends?",
                qTranslation: "Anh trai của bạn có ______ chơi tennis vào cuối tuần không?",
                options: ["likes", "like", "liking"],
                optionsTranslation: ["thích (chia thêm -s)", "thích (động từ nguyên thể)", "thích (đuôi -ing)"],
                correct: 1,
                explanation: "Trong câu hỏi nghi vấn của thì hiện tại đơn, khi đã mượn trợ động từ 'Does', động từ chính theo sau phải trả về dạng nguyên thể không chia ('like').",
                studyTip: "Mẹo nhớ: Khi câu hỏi đã có trợ động từ do hoặc does thì động từ chính bắt buộc phải ở dạng nguyên thể không chia."
            }
        ]
    },
    A2: {
        title: "A2: Phân Biệt Quá Khứ Đơn và Quá Khứ Tiếp Diễn",
        description: "Học cách phối hợp thì Quá khứ đơn (Past Simple) và Quá khứ tiếp diễn (Past Continuous) khi diễn tả các hành động giao thoa trong quá khứ.",
        lectureText: "Chào Thầy Cô, sau đây là bài giảng về việc phối hợp giữa Thì Quá khứ đơn và Quá khứ tiếp diễn. Trong quá khứ, khi một hành động dài đang xảy ra thì có một hành động ngắn khác xen ngang. Hành động đang xảy ra kéo dài ta dùng Quá khứ tiếp diễn, với công thức chủ ngữ cộng was hoặc were cộng động từ đuôi ing. Hành động xen ngang ngắn hơn ta dùng Quá khứ đơn với động từ ở cột hai hoặc thêm đuôi ed. Mẹo để làm bài là đứng sau các từ như While thường chia ở tiếp diễn, còn sau When thường chia ở quá khứ đơn.",
        theory: `
            <div class="space-y-4">
                <div>
                    <h4 class="text-blue-400 font-bold text-sm mb-1">1. Phân biệt cách dùng (Usage comparison):</h4>
                    <ul class="list-disc pl-4 text-slate-350 space-y-1">
                        <li><strong class="text-white">Quá khứ tiếp diễn (S + was/were + V-ing)</strong>: Diễn tả hành động kéo dài, đang xảy ra tại một thời điểm trong quá khứ.</li>
                        <li><strong class="text-white">Quá khứ đơn (S + V2/ed)</strong>: Diễn tả hành động ngắn hơn, xen ngang vào hành động đang xảy ra đó.</li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-blue-400 font-bold text-sm mb-1">2. Cấu trúc kết hợp (Common Patterns):</h4>
                    <p class="text-slate-350">
                        Sử dụng từ nối <strong class="text-emerald-400">When</strong> (Khi) hoặc <strong class="text-emerald-400">While</strong> (Trong khi):<br>
                        • <span class="italic">While I <strong class="text-white">was teaching</strong>, the school principal <strong class="text-white">entered</strong> the room.</span><br>
                        (Trong khi tôi đang giảng dạy [hành động kéo dài], thầy hiệu trưởng bước vào [hành động xen ngang]).
                    </p>
                </div>
                <div class="warning-box bg-blue-950/20 border-blue-500/20 text-blue-300">
                    <strong>💡 MẸO NHỚ NHANH:</strong> Đứng sau <strong>While</strong> thường là hành động đang xảy ra (chia Tiếp diễn), còn đứng sau <strong>When</strong> thường là hành động xen ngang (chia Quá khứ đơn).
                </div>
            </div>
        `,
        questions: [
            {
                id: "practice_a2_1",
                q: "While we ______ soccer, it suddenly started to rain.",
                qTranslation: "Trong khi chúng tôi ______ bóng đá, trời bỗng nhiên đổ mưa.",
                options: ["played", "were playing", "was playing"],
                optionsTranslation: ["đã chơi (Quá khứ đơn)", "đang chơi (Were playing)", "đang chơi (Was playing - sai chủ ngữ)"],
                correct: 1,
                explanation: "Hành động 'chơi bóng đá' là hành động kéo dài đang diễn ra trong quá khứ, nên phải chia ở quá khứ tiếp diễn. Vì chủ ngữ là 'We' (số nhiều) nên ta chọn trợ động từ 'were' đi kèm 'playing' -> 'were playing'.",
                studyTip: "Mẹo nhớ: Sau chữ While thường là một hành động đang xảy ra kéo dài, vì vậy hãy chọn Thì quá khứ tiếp diễn."
            },
            {
                id: "practice_a2_2",
                q: "He was typing his lesson plan when his laptop ______ off.",
                qTranslation: "Thầy ấy đang gõ giáo án thì máy tính xách tay ______ tắt.",
                options: ["went", "was going", "goes"],
                optionsTranslation: ["đã tắt (Quá khứ đơn của go)", "đang đi (tiếp diễn)", "tắt (hiện tại đơn)"],
                correct: 0,
                explanation: "Hành động 'máy tính bị tắt nguồn' là hành động ngắn, đột ngột xen ngang hành động đang xảy ra là 'gõ giáo án' (was typing). Do đó, động từ sau 'when' phải chia ở quá khứ đơn (V2 của 'go off' là 'went off').",
                studyTip: "Mẹo nhớ: Hành động laptop bị tắt nguồn là hành động ngắn, đột ngột cắt ngang hành động đang gõ giáo án. Vì vậy ta dùng Quá khứ đơn."
            },
            {
                id: "practice_a2_3",
                q: "I ______ in London when I first met my best friend.",
                qTranslation: "Tôi ______ ở Luân Đôn khi tôi lần đầu gặp người bạn thân nhất của mình.",
                options: ["lived", "was living", "live"],
                optionsTranslation: ["đã sống (Quá khứ đơn)", "đang sống (Quá khứ tiếp diễn)", "sống (Hiện tại đơn)"],
                correct: 1,
                explanation: "Hành động 'sống ở Luân Đôn' là một quá trình đang diễn ra kéo dài tại thời điểm người nói gặp người bạn của mình. Do đó dùng quá khứ tiếp diễn 'was living' bổ nghĩa cho hành động xen ngang 'met'.",
                studyTip: "Mẹo nhớ: Việc sống ở đâu đó là một quá trình dài đang diễn ra tại thời điểm hành động ngắn gặp gỡ xảy ra. Do đó hãy dùng Quá khứ tiếp diễn."
            }
        ]
    },
    B1: {
        title: "B1: Câu Bị Động (Passive Voice)",
        description: "Học cách dùng câu bị động để nhấn mạnh vào hành động hoặc đối tượng chịu tác động thay vì chủ thể thực hiện hành động.",
        lectureText: "Chào Thầy Cô, sau đây là bài giảng về Câu Bị Động. Chúng ta dùng câu bị động khi muốn nhấn mạnh vào đối tượng chịu sự tác động của hành động thay vì người thực hiện hành động. Công thức chung là Chủ ngữ mới cộng động từ be chia theo thì phù hợp, cộng động từ chính ở dạng phân từ 3 hoặc thêm ed. Với thì Hiện tại hoàn thành bị động, công thức sẽ là has hoặc have cộng been cộng phân từ 3. Thầy Cô lưu ý động từ chính luôn ở dạng phân từ 3, nếu là bất quy tắc cần tra bảng ở cột số 3.",
        theory: `
            <div class="space-y-4">
                <div>
                    <h4 class="text-blue-400 font-bold text-sm mb-1">1. Bản chất câu bị động:</h4>
                    <p class="text-slate-350 leading-relaxed">
                        Được sử dụng khi chủ thể thực hiện hành động không quan trọng, đã biết rõ, hoặc ta muốn hướng sự tập trung của người đọc vào vật chịu tác động.<br>
                        <span class="text-emerald-450 italic">Ví dụ: English <strong class="text-white">is spoken</strong> all over the world. (Tiếng Anh được nói trên khắp thế giới).</span>
                    </p>
                </div>
                <div>
                    <h4 class="text-blue-400 font-bold text-sm mb-1">2. Công thức chung (General Formula):</h4>
                    <div class="p-3 bg-[#0b0f19] border border-slate-800 rounded-xl font-mono text-xs text-center text-teal-400">
                        Chủ ngữ mới + BE (chia theo thì) + V3/ed + (by + Tân ngữ phụ)
                    </div>
                    <ul class="list-disc pl-4 text-slate-350 space-y-1 mt-2">
                        <li><strong class="text-white">Hiện tại đơn bị động</strong>: am/is/are + V3/ed</li>
                        <li><strong class="text-white">Quá khứ đơn bị động</strong>: was/were + V3/ed</li>
                        <li><strong class="text-white">Hiện tại hoàn thành bị động</strong>: has/have + been + V3/ed</li>
                    </ul>
                </div>
                <div class="warning-box bg-blue-950/20 border-blue-500/20 text-blue-300">
                    <strong>💡 LƯU Ý CỦA BÂY GIỜ:</strong> Động từ ở thể bị động luôn ở dạng <strong>Quá khứ phân từ (Past Participle - V3)</strong>. Nếu là động từ có quy tắc thì thêm '-ed', nếu bất quy tắc thì tra bảng cột số 3 (ví dụ: write -> written, speak -> spoken).
                </div>
            </div>
        `,
        questions: [
            {
                id: "practice_b1_1",
                q: "Traditional family structures ______ significantly over the past decades.",
                qTranslation: "Các cấu trúc gia đình truyền thống ______ một cách đáng kể trong các thập kỷ qua.",
                options: ["have been changed", "has been changed", "changed"],
                optionsTranslation: ["đã bị thay đổi (số nhiều)", "đã bị thay đổi (số ít)", "đã thay đổi (chủ động)"],
                correct: 0,
                explanation: "Cấu trúc gia đình là đối tượng chịu sự tác động và biến đổi. Dấu hiệu 'over the past decades' (qua các thập kỷ gần đây) yêu cầu dùng thì Hiện tại hoàn thành bị động. Vì chủ ngữ 'structures' ở dạng số nhiều, ta chọn trợ động từ 'have been' + V3 ('changed') -> 'have been changed'.",
                studyTip: "Mẹo nhớ: Cấu trúc gia đình là vật bị tác động, kết hợp với từ chỉ thời gian over the past decades chỉ thì Hiện tại hoàn thành bị động."
            },
            {
                id: "practice_b1_2",
                q: "Many plastic items ______ away after only one use.",
                qTranslation: "Nhiều vật dụng nhựa ______ đi sau chỉ một lần sử dụng.",
                options: ["are thrown", "is thrown", "throw"],
                optionsTranslation: ["bị vứt bỏ (số nhiều)", "bị vứt bỏ (số ít)", "vứt bỏ (chủ động)"],
                correct: 0,
                explanation: "Vật dụng nhựa không tự vứt được mà phải 'bị vứt bỏ' (bị động). Vì chủ ngữ 'items' là số nhiều nên động từ be chia là 'are', kết hợp phân từ 3 của throw là 'thrown' -> 'are thrown'.",
                studyTip: "Mẹo nhớ: Các vật dụng nhựa là danh từ số nhiều và là đối tượng bị vứt bỏ nên phải dùng động từ tobe số nhiều là are cộng phân từ 3."
            },
            {
                id: "practice_b1_3",
                q: "The novel ______ by a famous author and published last year.",
                qTranslation: "Cuốn tiểu thuyết ______ bởi một tác giả nổi tiếng và xuất bản năm ngoái.",
                options: ["was written", "wrote", "was writing"],
                optionsTranslation: ["đã được viết (bị động)", "đã viết (chủ động)", "đang viết (tiếp diễn)"],
                correct: 0,
                explanation: "Dựa vào cụm từ 'by a famous author' (bởi một tác giả nổi tiếng) và mốc thời gian 'last year' (năm ngoái), câu bắt buộc phải chia ở thể bị động của quá khứ đơn. 'The novel' là số ít nên dùng 'was written'.",
                studyTip: "Mẹo nhớ: Cuốn tiểu thuyết là vật và có mốc thời gian last year là năm ngoái nên bắt buộc dùng bị động của Quá khứ đơn số ít."
            }
        ]
    },
    B2: {
        title: "B2: Mệnh Đề Quan Hệ (Relative Clauses)",
        description: "Làm chủ cách sử dụng mệnh đề quan hệ xác định và không xác định để viết câu ghép phức tạp và kết nối thông tin mạch lạc.",
        lectureText: "Chào Thầy Cô, sau đây là bài giảng về Mệnh đề quan hệ. Mệnh đề quan hệ được dùng để giải thích rõ hơn cho danh từ đứng trước nó. Chúng ta sử dụng Who cho danh từ chỉ người đóng vai trò chủ ngữ, Whom cho danh từ chỉ người đóng vai trò tân ngữ, Which cho danh từ chỉ vật, và Whose để chỉ sở hữu của người hoặc vật. Đại từ That có thể dùng thay thế cho who, whom, which trong mệnh đề xác định, tức là mệnh đề không có dấu phẩy. Thầy Cô lưu ý một lỗi rất hay gặp trong đề thi CEFR là tuyệt đối không được dùng That đứng sau dấu phẩy trong mệnh đề không xác định.",
        theory: `
            <div class="space-y-4">
                <div>
                    <h4 class="text-blue-400 font-bold text-sm mb-1">1. Đại từ quan hệ (Relative Pronouns):</h4>
                    <ul class="list-disc pl-4 text-slate-350 space-y-1">
                        <li><strong class="text-white">Who</strong>: Thay thế cho danh từ chỉ người đóng vai trò làm Chủ ngữ.</li>
                        <li><strong class="text-white">Whom</strong>: Thay thế cho danh từ chỉ người đóng vai trò làm Tân ngữ.</li>
                        <li><strong class="text-white">Which</strong>: Thay thế cho danh từ chỉ vật (làm chủ ngữ hoặc tân ngữ).</li>
                        <li><strong class="text-white">Whose</strong>: Thay thế cho sở hữu cách của người hoặc vật.</li>
                        <li><strong class="text-white">That</strong>: Có thể thay thế cho Who/Whom/Which trong mệnh đề xác định (không có dấu phẩy).</li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-blue-400 font-bold text-sm mb-1">2. Phân biệt mệnh đề xác định & không xác định:</h4>
                    <p class="text-slate-350">
                        • <strong class="text-white">Xác định (Defining)</strong>: Cần thiết để câu có nghĩa đầy đủ, không dùng dấu phẩy.<br>
                        • <strong class="text-white">Không xác định (Non-defining)</strong>: Cung cấp thông tin phụ thêm, ngăn cách bằng dấu phẩy. KHÔNG dùng 'that' ở đây.<br>
                        <span class="text-emerald-450 italic">Ví dụ: Mr. John, <strong class="text-white">who</strong> is an English teacher, walks to work.</span>
                    </p>
                </div>
                <div class="warning-box bg-blue-950/20 border-blue-500/20 text-blue-300">
                    <strong>💡 BẪY CEFR CẦN TRÁNH:</strong> Không bao giờ được dùng đại từ quan hệ <strong>that</strong> sau dấu phẩy (trong mệnh đề quan hệ không xác định). Nếu chỉ người hãy dùng <strong>who/whom</strong>, chỉ vật hãy dùng <strong>which</strong>.
                </div>
            </div>
        `,
        questions: [
            {
                id: "practice_b2_1",
                q: "Digital literacy training is essential for students ______ research online.",
                qTranslation: "Đào tạo kỹ năng số là cần thiết cho học sinh, những người ______ nghiên cứu trực tuyến.",
                options: ["who conduct", "which conduct", "whose conduct"],
                optionsTranslation: ["người mà thực hiện (chủ ngữ người)", "vật mà thực hiện", "sở hữu của"],
                correct: 0,
                explanation: "Danh từ đứng trước đại từ quan hệ cần bổ nghĩa là 'students' (chỉ người) đóng vai trò làm chủ ngữ thực hiện hành động nghiên cứu 'conduct research'. Do đó, ta chọn đại từ quan hệ 'who' đi kèm động từ chia số nhiều -> 'who conduct'.",
                studyTip: "Mẹo nhớ: Học sinh là danh từ chỉ người làm chủ ngữ thực hiện hành động nghiên cứu nên đại từ thích hợp nhất là who."
            },
            {
                id: "practice_b2_2",
                q: "The internet, ______ has revolutionized research, also brings information overload.",
                qTranslation: "Internet, thứ ______ đã cách mạng hóa nghiên cứu, cũng mang lại sự quá tải thông tin.",
                options: ["which", "that", "who"],
                optionsTranslation: ["cái mà (chỉ vật, đứng sau dấu phẩy)", "cái mà (không đứng sau dấu phẩy)", "người mà"],
                correct: 0,
                explanation: "Ở đây bổ nghĩa cho danh từ chỉ vật 'The internet'. Hơn nữa, mệnh đề này nằm giữa hai dấu phẩy (mệnh đề không xác định), do đó ta bắt buộc phải dùng 'which' và cấm kỵ dùng 'that'.",
                studyTip: "Mẹo nhớ: Mệnh đề nằm giữa hai dấu phẩy là mệnh đề không xác định, tuyệt đối không được dùng đại từ quan hệ that ở đây."
            },
            {
                id: "practice_b2_3",
                q: "The teacher ______ class I observed yesterday utilized gamification very effectively.",
                qTranslation: "Giáo viên ______ lớp học mà tôi đã dự giờ hôm qua đã áp dụng game hóa rất hiệu quả.",
                options: ["whose", "who", "whom"],
                optionsTranslation: ["có... của họ (sở hữu)", "người mà (làm chủ ngữ)", "người mà (làm tân ngữ)"],
                correct: 0,
                explanation: "Ta cần thể hiện mối quan hệ sở hữu giữa danh từ chỉ người 'The teacher' và danh từ chỉ vật 'class' (Lớp học CỦA giáo viên đó). Do đó dùng đại từ quan hệ chỉ sở hữu 'whose'.",
                studyTip: "Mẹo nhớ: Khi cần bổ nghĩa cho mối quan hệ sở hữu giữa hai danh từ là Giáo viên và Lớp học của giáo viên đó, ta dùng whose."
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
