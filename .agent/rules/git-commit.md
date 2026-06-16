---
trigger: always_on
---

# Nguyên tắc Git Commit

## Commit Message bằng Tiếng Việt

Khi commit và push code lên GitHub, **luôn viết commit message bằng tiếng Việt**, mô tả rõ ràng và dễ hiểu những thay đổi của phiên bản.

### Quy tắc:
1. **Ngôn ngữ**: Tiếng Việt, không dùng tiếng Anh
2. **Rõ ràng**: Ghi chú cụ thể những gì đã thay đổi, thêm mới, sửa lỗi
3. **Dễ hiểu**: Người không chuyên kỹ thuật cũng hiểu được

### Ví dụ:
```
✅ Đúng:
git commit -m "Thêm tính năng vòng lặp chiến dịch: gửi nhiều tin mẫu, tự thu hồi trước khi gửi tin mới"
git commit -m "Sửa lỗi thu hồi tin nhắn: chuyển từ deleteMessage sang undo API"
git commit -m "Giảm thời gian chờ giữa các nhóm từ 2.5s xuống 1.5s"

❌ Sai:
git commit -m "feat: add campaign loop"
git commit -m "fix bug"
git commit -m "update"
```
