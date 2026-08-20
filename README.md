# 🎓 HỆ THỐNG KHẢO SÁT & TỰ LUYỆN TIẾNG ANH GIÁO VIÊN
### *(Adaptive English Assessment & AI Learning Coach for Teachers)*

---

# 📢 THÔNG TIN TÁC GIẢ & HỖ TRỢ KỸ THUẬT

> ### 👨‍🏫 **TÁC GIẢ & HƯỚNG DẪN:** **NGUYỄN T ĐƯỢC**
> ### 📱 **ZALO HỖ TRỰC TIẾP:** [**0904 059 866**](https://zalo.me/0904059866)
> ### 🌐 **WEBSITE HỌC TẬP & PHỔ CẬP AI:** [**home.aiphocap.vn**](https://home.aiphocap.vn)
> ### 👥 **GROUP ZALO GIAO LƯU & HỖ TRỢ CÀI ĐẶT:** [**https://zalo.me/g/vspgsg486**](https://zalo.me/g/vspgsg486)
>
> ---
> *👉 **Thầy/Cô và các bạn cần hỗ trợ cài đặt, lấy API Key, cấu hình máy chủ hoặc tùy biến giao diện xin vui lòng nhắn tin trực tiếp qua Zalo hoặc tham gia Group Zalo trên để được trợ giúp 24/7!***

---

## 🌟 GIỚI THIỆU HỆ THỐNG

Hệ thống **Khảo sát & Tự luyện Tiếng Anh Thích ứng cho Giáo viên** là nền tảng toàn diện ứng dụng Trí tuệ Nhân tạo (**Google Gemini**) nhằm hỗ trợ Thầy/Cô giáo phổ thông tự đánh giá và nâng cao 4 kỹ năng tiếng Anh theo khung tham chiếu chuẩn châu Âu (**CEFR từ A1 đến C2**).

### 🚀 Tính Năng Nổi Bật:
1. **Khảo sát 4 Kỹ năng Toàn diện**:
   * 🎧 **Listening (Nghe)**: Đề thi audio/video chất lượng cao, chống gian lận, hỗ trợ tua/nghe theo chuẩn khảo sát.
   * 📖 **Reading (Đọc)**: Bài đọc đa dạng chủ đề sư phạm, câu hỏi tương tác trực quan.
   * ✍️ **Writing (Viết)**: Trợ lý AI phân tích ngữ pháp, từ vựng, độ mạch lạc và chấm điểm theo tiêu chí CEFR tức thì.
   * 🗣️ **Speaking (Nói)**: Ghi âm trực tiếp trên trình duyệt, AI nhận diện giọng nói, đánh giá phát âm, độ lưu loát và đưa ra bài mẫu chuẩn.
2. **HLV Học Tập Ảo (AI Learning Coach)**:
   * Chế độ tự luyện từng kỹ năng kèm giải thích chi tiết đáp án đúng/sai.
   * Chấm chữa chi tiết bài viết và bài nói riêng lẻ theo từng câu.
3. **Bảng Vinh Danh Đa Kích Thước (Leaderboard)**:
   * **Bảng Vàng Điểm Cao**: Xếp hạng năng lực CEFR và điểm tổng thể.
   * **Bảng Siêng Năng**: Tôn vinh Thầy/Cô có tổng thời gian ôn tập và số lượt tự luyện nhiều nhất.
   * Tự động lọc trùng thông minh theo Số điện thoại / Họ tên.
4. **Khu vực Quản trị Chuyên Nghiệp (`/admin`)**:
   * Quản lý danh sách API Key Google Gemini xoay vòng tự động (Round-robin Rotation).
   * Kiểm thử tự động (Test Health) từng Key, tự loại bỏ Key lỗi, không lo cạn hạn mức (Quota 429).
5. **Kiến Trúc Siêu Nhẹ (Zero-Dependency)**:
   * Sử dụng Node.js thuần (Built-in HTTP), **không cần tải hàng trăm MB thư viện npm**. Khởi động trong 1 giây!

---

## 💻 YÊU CẦU HỆ THỐNG

* **Node.js**: Phiên bản `>= 18.0.0` ([Tải Node.js tại đây](https://nodejs.org/))
* **Cơ sở dữ liệu**: Tài khoản [Supabase](https://supabase.com) (Hoàn toàn Miễn phí)
* **Khóa AI**: Google Gemini API Key ([Lấy miễn phí tại Google AI Studio](https://aistudio.google.com/))
* **Trình duyệt**: Chrome, Cốc Cốc, Edge, Firefox, Safari thế hệ mới (hỗ trợ Web Audio API).

---

## 🛠️ HƯỚNG DẪN CÀI ĐẶT & CHẠY TỪ A - Z

### BƯỚC 1: Tải Mã Nguồn Về Máy Tính
Thầy/Cô có thể tải bằng 1 trong 2 cách:

* **Cách 1 (Dùng Git Clone)**:
  ```bash
  git clone https://github.com/qualaduoc/English-test-GV-VN.git
  cd English-test-GV-VN
  ```
* **Cách 2 (Tải file ZIP)**:
  1. Truy cập [https://github.com/qualaduoc/English-test-GV-VN](https://github.com/qualaduoc/English-test-GV-VN)
  2. Bấm nút xanh **Code** -> Chọn **Download ZIP**.
  3. Giải nén thư mục và mở bằng VS Code hoặc Terminal.

---

### BƯỚC 2: Khởi Tạo Cơ Sở Dữ Liệu Trên Supabase

1. Đăng nhập [Supabase](https://supabase.com) và bấm **New Project** (Tạo dự án mới).
2. Vào mục **SQL Editor** (biểu tượng `>_` ở thanh menu bên trái).
3. Bấm **New query**, sao chép toàn bộ đoạn mã SQL dưới đây và nhấn **Run**:

```sql
-- 1. Bảng lưu thông tin giáo viên và bảng xếp hạng
CREATE TABLE IF NOT EXISTS public.teachers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    phone TEXT UNIQUE NOT NULL,
    teacher_name TEXT NOT NULL,
    school TEXT,
    province TEXT,
    email TEXT,
    attempts_count INTEGER DEFAULT 0,
    highest_reading TEXT DEFAULT 'Pre-A1',
    highest_listening TEXT DEFAULT 'Pre-A1',
    highest_speaking TEXT DEFAULT 'Pre-A1',
    highest_writing TEXT DEFAULT 'Pre-A1',
    highest_overall_cefr TEXT DEFAULT 'Pre-A1',
    highest_overall_score NUMERIC DEFAULT 0,
    study_seconds INTEGER DEFAULT 0,
    study_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Bảng lưu kết quả chi tiết từng bài thi
CREATE TABLE IF NOT EXISTS public.exam_results (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    phone TEXT NOT NULL,
    teacher_name TEXT NOT NULL,
    overall_cefr TEXT NOT NULL,
    reading_cefr TEXT,
    listening_cefr TEXT,
    speaking_cefr TEXT,
    speaking_feedback JSONB,
    writing_cefr TEXT,
    writing_feedback JSONB,
    time_stats JSONB,
    exam_mode TEXT DEFAULT 'practice',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Bảng quản lý kho API Keys của Gemini xoay vòng
CREATE TABLE IF NOT EXISTS public.gemini_api_keys (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    label TEXT NOT NULL,
    api_key TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    usage_count INTEGER DEFAULT 0,
    error_count INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Hàm tăng số lượt sử dụng thành công của Key
CREATE OR REPLACE FUNCTION public.increment_key_usage(key_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.gemini_api_keys
    SET usage_count = COALESCE(usage_count, 0) + 1,
        updated_at = NOW()
    WHERE id = key_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Hàm tăng số lượt lỗi của Key
CREATE OR REPLACE FUNCTION public.increment_key_error(key_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.gemini_api_keys
    SET error_count = COALESCE(error_count, 0) + 1,
        updated_at = NOW()
    WHERE id = key_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Tắt RLS hoặc cho phép truy cập qua Service Role Key
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gemini_api_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow Service Role Full Access Teachers" ON public.teachers FOR ALL USING (true);
CREATE POLICY "Allow Service Role Full Access Exam Results" ON public.exam_results FOR ALL USING (true);
CREATE POLICY "Allow Service Role Full Access API Keys" ON public.gemini_api_keys FOR ALL USING (true);
```

4. Vào mục **Project Settings** -> **API** để lấy:
   * **Project URL**: Ví dụ `https://xyzcompany.supabase.co`
   * **Service Role Key** (mục `service_role` secret): Đây là khóa bí mật có toàn quyền ghi dữ liệu.

---

### BƯỚC 3: Cấu Hình Biến Môi Trường (`.env`)

1. Tạo một file tên là `.env` ngay tại thư mục gốc của dự án (cùng cấp với `package.json`).
2. Điền các thông số theo mẫu sau:

```env
# 1. Khóa API của Google Gemini (nếu có nhiều key thì cách nhau bằng dấu phẩy)
GEMINI_KEYS="your_gemini_api_key_1,your_gemini_api_key_2"

# 2. Cấu hình kết nối Supabase
SUPABASE_URL="https://your-project-id.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"

# 3. Khóa mã hóa bảo mật dữ liệu nhạy cảm AES-256 (BẮT BUỘC ĐỦ ĐÚNG 32 KÝ TỰ)
ENCRYPTION_KEY="your-32-character-encryption-key"

# 4. Tài khoản & Mật khẩu đăng nhập trang Quản trị (/admin)
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your_admin_password"
```

> ⚠️ **LƯU Ý QUAN TRỌNG VỀ `ENCRYPTION_KEY`:**
> `ENCRYPTION_KEY` dùng để mã hóa an toàn bài nhận xét nói/viết. Khóa này **bắt buộc phải có độ dài đúng 32 ký tự** (ví dụ: `duocnguyen_aiphocap_key_2026_vn`).

---

### BƯỚC 4: Khởi Chạy Ứng Dụng

Mở Terminal tại thư mục dự án và gõ lệnh:

```bash
npm start
```
*(hoặc chạy trực tiếp bằng lệnh: `node local-server.js`)*

Màn hình xuất hiện thông báo:
```text
==================================================
🚀 SERVER KHẢO SÁT TIẾNG ANH ĐANG CHẠY CỤC BỘ
📡 Địa chỉ ứng dụng: http://localhost:3001
🔑 Trang Quản trị:  http://localhost:3001/admin
==================================================
```

👉 Bây giờ Thầy/Cô mở trình duyệt và truy cập: **`http://localhost:3001`** để bắt đầu trải nghiệm!

---

### BƯỚC 5: Đăng Nhập Trang Quản Trị (`/admin`)

* **Đường dẫn**: `http://localhost:3001/admin`
* **Tài khoản**: Giá trị bạn đặt trong biến `ADMIN_USERNAME` (Mặc định: `admin`)
* **Mật khẩu**: Giá trị bạn đặt trong biến `ADMIN_PASSWORD` (Mặc định: `admin123`)
* **Chức năng Admin**: Thêm nhiều Gemini Key cùng lúc, kiểm tra sức khỏe của từng Key, xem số lượt gọi thành công / lỗi, bật/tắt Key linh hoạt.

---

## 🌐 HƯỚNG DẪN TRIỂN KHAI LÊN CLOUD (VERCEL / RENDER)

Dự án được thiết kế chuẩn cấu trúc **Serverless API** trong thư mục `/api`, giúp Thầy/Cô có thể triển khai lên **Vercel** hoàn toàn miễn phí chỉ với 3 cú nhấp chuột:

1. Đẩy mã nguồn lên tài khoản GitHub của Thầy/Cô.
2. Đăng nhập [Vercel.com](https://vercel.com) -> Chọn **Add New Project** -> Chọn kho mã nguồn.
3. Trong phần **Environment Variables**, thêm các biến:
   * `SUPABASE_URL`
   * `SUPABASE_SERVICE_ROLE_KEY`
   * `ENCRYPTION_KEY`
   * `GEMINI_KEYS`
   * `ADMIN_USERNAME`
   * `ADMIN_PASSWORD`
4. Bấm **Deploy**. Sau 30 giây, Thầy/Cô sẽ có link website hoạt động 24/24 trên toàn thế giới!

---

## 📂 CẤU TRÚC THƯ MỤC MÃ NGUỒN

```text
├── api/                        # Backend Serverless Functions (Xử lý API)
│   ├── _utils.js               # Logic cốt lõi: Gọi Gemini AI, mã hóa, kết nối Supabase
│   ├── admin-keys.js           # API quản trị và kiểm thử API Keys
│   ├── assess.js               # API chấm bài Viết & Nói qua AI
│   ├── coach-feedback.js       # API HLV ảo phản hồi học tập
│   ├── diligent-leaderboard.js # API Bảng xếp hạng siêng năng
│   ├── leaderboard.js          # API Bảng vàng điểm thi
│   ├── record-study.js         # API ghi nhận thời gian tự học
│   └── save-result.js          # API lưu kết quả khảo sát
├── public/                     # Giao diện Frontend (HTML, CSS, JS, Assets)
│   ├── admin/                  # Trang quản trị API Keys
│   ├── js/
│   │   ├── data/               # Ngân hàng câu hỏi mẫu và tài liệu ôn tập
│   │   └── features/           # Các mô-đun: adaptive-exam, coach, speaking, writing...
│   ├── index.html              # Trang chủ ứng dụng khảo sát
│   └── style.css               # Phong cách giao diện hiện đại Tailwind
├── local-server.js             # Máy chủ Node.js cục bộ siêu nhẹ (Zero-dependency)
├── package.json                # Thông tin cấu hình dự án
├── .env.example                # File mẫu cấu hình biến môi trường
└── README.md                   # Hướng dẫn chi tiết sử dụng
```

---

## 📞 HỖ TRỢ VÀ ĐÓNG GÓP

Nếu Thầy/Cô gặp bất kỳ khó khăn nào trong quá trình cài đặt hoặc có ý tưởng phát triển thêm tính năng mới, xin vui lòng liên hệ:

* 👨‍🏫 **Tác giả:** **Nguyễn T Được**
* 📱 **Zalo:** **0904059866**
* 🌐 **Website:** [home.aiphocap.vn](https://home.aiphocap.vn)
* 👥 **Cộng đồng Zalo:** [https://zalo.me/g/vspgsg486](https://zalo.me/g/vspgsg486)

---
*Chúc Thầy/Cô và các bạn cài đặt thành công và có những trải nghiệm học tập tuyệt vời cùng Hệ thống Khảo sát Tiếng Anh AI!* 🚀
