---
trigger: always_on
---

# 📐 Bộ Nguyên Tắc Thiết Kế & Tổ Chức Code (14 Nguyên Tắc)

> Áp dụng cho **mọi dự án** (Web, App, API, Tool...) — Ngôn ngữ bất kỳ.
> 🔴 **BẮT BUỘC** tuân thủ khi viết code mới. Code cũ sửa khi có cơ hội.

---

## 1. Mỗi Tính Năng = 1 Không Gian Riêng

Tính năng (feature) là chức năng người dùng nhìn thấy hoặc tương tác.

- Mỗi tính năng → **file riêng** hoặc **thư mục riêng**.
- Tính năng A không được "sống nhờ" trong file của tính năng B.
- Khi xóa tính năng A → chỉ cần xóa file/thư mục của nó, không ảnh hưởng B.

```
✅ features/auth/          ← Đăng nhập, đăng ký
✅ features/payment/       ← Thanh toán
✅ features/lesson-plan/   ← Tạo giáo án

❌ features/main.tsx       ← Nhồi cả 3 tính năng vào 1 file
```

---

## 2. File Dùng Chung Chỉ Chứa "Công Cụ"

File chung (shared) CHỈ ĐƯỢC chứa:
- Hàm tiện ích (utility) — format ngày, validate email
- Hằng số (constants) — bảng giá, config
- Type / Interface — định nghĩa kiểu dữ liệu
- Service kết nối — kết nối DB, gọi API ngoài

File chung KHÔNG ĐƯỢC chứa:
- Logic nghiệp vụ riêng của 1 tính năng
- Giao diện (UI) của 1 tính năng cụ thể

```
✅ utils/formatDate.ts         ← Ai cũng dùng
✅ services/dbClient.ts        ← Ai cũng dùng
❌ services/allAiService.ts    ← Nhồi logic AI cho 3 tính năng khác nhau
```

---

## 3. Tách Theo Tính Năng, Không Tách Theo Loại File

```
✅ Feature-based (dễ tìm, dễ sửa):
features/payment/
  PaymentForm.tsx
  paymentService.ts
  paymentTypes.ts

❌ Type-based (khó tìm, dễ nhầm):
components/PaymentForm.tsx
services/paymentService.ts
types/paymentTypes.ts
```

Ngoại lệ: Component UI dùng chung (Button, Modal, Spinner) → `components/common/`

---

## 4. Giới Hạn Kích Thước File

| Ngưỡng | Hành động |
|--------|-----------|
| < 300 dòng | ✅ Tốt |
| 300-500 dòng | ⚠️ Cân nhắc tách |
| 500-800 dòng | 🟡 Phải có lý do, lên kế hoạch tách |
| > 800 dòng | 🔴 Bắt buộc tách khi có cơ hội |

Khi thêm code mới mà file sắp vượt ngưỡng → tạo file mới, KHÔNG nhồi thêm.

---

## 5. Dependency Chảy Một Chiều

```
Pages     →  gọi Features
Features  →  gọi Services
Services  →  gọi Utils
Utils     →  KHÔNG gọi ngược ai
Types     →  KHÔNG gọi ngược ai
```

- Tầng trên gọi tầng dưới ✅
- Tầng dưới gọi ngược tầng trên ❌
- Cùng tầng gọi nhau ✅

---

## 6. Đặt Tên Nhất Quán

### File:
| Loại | Quy tắc | Ví dụ |
|------|---------|-------|
| Component / Page | PascalCase.tsx | `PaymentForm.tsx` |
| Service | camelCaseService.ts | `paymentService.ts` |
| Hook | use + camelCase.ts | `useAuth.ts` |
| Utility | camelCase.ts | `formatCurrency.ts` |
| Constants | camelCase.ts | `creditCosts.ts` |
| Types | camelCase.ts | `paymentTypes.ts` |
| Prompts AI | camelCasePrompts.ts | `lessonPlanPrompts.ts` |

### Thư mục: `kebab-case` → `lesson-plan/`, `user-profile/`
### Biến: `camelCase` → `handleSubmit`, `fetchUserData`
### Hằng số: `UPPER_SNAKE_CASE` → `MAX_RETRY`, `API_BASE_URL`
### Type/Interface: `PascalCase` → `UserProfile`, `PaymentData`

---

## 7. Code Mới Phải Đúng, Code Cũ Sửa Sau

1. **Code mới** → BẮT BUỘC tuân thủ nguyên tắc (file riêng, tên đúng)
2. **Code cũ đang hoạt động** → KHÔNG tách/sửa cấu trúc giữa chừng
3. **Tách code cũ khi:** tính năng ổn định + có thời gian test

> Ưu tiên: Tạo đúng từ đầu > Sửa lại code cũ

---

## 8. Cấu Trúc Thư Mục Chuẩn

```
project-root/
├── src/
│   ├── app/              ← Entry point, routing
│   ├── features/         ← Tính năng (1 folder = 1 feature)
│   ├── components/       ← Component UI dùng chung
│   │   ├── common/       ← Button, Modal, Spinner
│   │   └── layout/       ← Header, Sidebar, Footer
│   ├── services/         ← Gọi API, xử lý dữ liệu
│   ├── hooks/            ← Custom hooks
│   ├── utils/            ← Hàm tiện ích thuần
│   ├── types/            ← Type/Interface dùng chung
│   ├── constants/        ← Hằng số dùng chung
│   └── config/           ← Cấu hình (prompts, env, routes)
├── server/               ← Backend API
├── public/               ← File tĩnh
└── package.json
```

---

## 9. Checklist Trước Khi Code

Trước khi code tính năng mới, tự hỏi:

- [ ] Tính năng này đã có **file/thư mục riêng** chưa?
- [ ] File sắp sửa có **> 500 dòng** không? → Tạo file mới
- [ ] Logic này **đặc thù** cho tính năng? → File riêng của feature
- [ ] Logic này **nhiều nơi dùng**? → Đặt trong services/ hoặc utils/
- [ ] Tên file **đúng quy tắc** chưa?

---

## 10. Bảo Mật — Không Tin Frontend

- Logic nhạy cảm (thanh toán, credit, phân quyền) → **xử lý ở Backend/Database**
- API Key, Secret → file `.env`, KHÔNG viết trong code
- Validate dữ liệu **2 lần**: Frontend validate cho UX, Backend validate cho an toàn
- Phân quyền: ẩn nút trên UI ✅ + API backend cũng PHẢI check role ✅
- KHÔNG tin bất kỳ dữ liệu nào từ trình duyệt gửi lên

---

## 11. Database — Cấu Trúc Rõ Ràng

- Mỗi tính năng = **1 nhóm bảng riêng**
- Tên bảng: `snake_case`, **số nhiều** → `users`, `lesson_plans`
- Tên cột: `snake_case` → `created_at`, `user_id`
- Mọi bảng đều có: `id`, `created_at`, `updated_at`
- Logic tính toán phức tạp → **Database Function / Trigger** (không để JS tính)
- Thay đổi cấu trúc DB → ghi lại bằng **SQL migration** file

---

## 12. API — Giao Tiếp Chuẩn

- URL: `kebab-case`, danh từ số nhiều → `/api/lesson-plans`
- HTTP method đúng: GET=đọc, POST=tạo, PUT/PATCH=sửa, DELETE=xóa
- Response nhất quán: `{ success: true, data: {...} }` hoặc `{ success: false, error: "..." }`
- Mã lỗi rõ ràng: 400=dữ liệu sai, 401=chưa đăng nhập, 403=không quyền, 404=không thấy, 500=lỗi server
- Mỗi nhóm API = **1 file route riêng** → `routes/users.js`, `routes/payments.js`

---

## 13. Xử Lý Lỗi — Không Nuốt Lỗi

- Mọi `try-catch` phải xử lý lỗi, **không để catch trống**
- User thấy: thông báo thân thiện. Console: log chi tiết cho dev
- Lỗi thanh toán/credit → phải có **cơ chế hoàn lại (rollback)**
- KHÔNG dùng `alert()` → dùng Toast/Notification component
- Lỗi nghiêm trọng → ghi log ra file hoặc gửi thông báo (Telegram, email)

---

## 14. Môi Trường — Tách Dev / Production

- File `.env` cho mỗi môi trường: `.env.development`, `.env.production`
- KHÔNG commit `.env` lên Git → thêm vào `.gitignore`
- Dev: `http://localhost:3001`. Prod: `https://api.example.com`
- Test trên Dev TRƯỚC, ổn rồi mới deploy Prod
- KHÔNG code trực tiếp trên server production

---

## 🏆 5 Câu Vàng Tóm Tắt

1. **Tính năng riêng, file riêng** — Không nhồi nhét
2. **Hàm chung, file chung** — Chỉ chứa công cụ, không chứa nghiệp vụ
3. **Chảy một chiều** — Tầng trên gọi tầng dưới, không ngược
4. **Đặt tên nhất quán** — Nhìn tên biết loại, biết chức năng
5. **Code mới đúng ngay, code cũ sửa sau** — Ưu tiên ổn định
