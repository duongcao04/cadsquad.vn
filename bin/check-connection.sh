#!/bin/sh

# --- Cấu hình thông tin ---
VPS_USER="landpage"
VPS_IP="103.82.192.189"
DOMAIN="cadsquad.vn"

# --- Tạo thư mục logs ở máy thật nếu chưa có ---
mkdir -p logs
LOG_FILE="logs/connection_check_$(date +%Y%m%d_%H%M%S).log"

# Hàm ghi log song song (In ra terminal máy thật + Ghi vào file log)
log_message() {
    echo "$1" | tee -a "$LOG_FILE"
}

log_message "🔍 [$(date '+%H:%M:%S')] BẮT ĐẦU KIỂM TRA KẾT NỐI HỆ THỐNG"
log_message "📝 File log trận này: ${LOG_FILE}"
log_message "--------------------------------------------------------"

log_message "🖥️ [1/2] Đang kết nối VPS để kiểm tra Port 3000 nội bộ..."
log_message "--------------------------------------------------------"

# Chuỗi lệnh kiểm tra curl nội bộ ngay trên VPS
REMOTE_CHECK_COMMANDS="
    if curl -s -I http://127.0.0.1:3000 | grep -q 'HTTP/'; then
        echo '✅ OK: Ứng dụng Next.js đang phản hồi tốt tại port 3000 nội bộ VPS.';
        curl -s -I http://127.0.0.1:3000 | grep -E 'HTTP/|Content-Type|Server';
    else
        echo '❌ LỖI: Port 3000 trên VPS không phản hồi!';
        echo '👉 Vui lòng chạy lại script: ./bin/restart.sh';
    fi
"

# Thực thi qua SSH (Sử dụng -t để cấp TTY chuẩn) và lưu log về máy thật
ssh -t ${VPS_USER}@${VPS_IP} "${REMOTE_CHECK_COMMANDS}" 2>&1 | tee -a "$LOG_FILE"

log_message "--------------------------------------------------------"
log_message "🌍 [2/2] Đang kiểm tra kết nối thực tế tới tên miền công cộng..."
log_message "--------------------------------------------------------"

# Kiểm tra phản hồi thực tế bên ngoài Internet tới Domain
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://${DOMAIN})

if [ "$HTTP_STATUS" = "200" ]; then
    log_message "🎉 TUYỆT VỜI! Website https://${DOMAIN} đã ONLINE ổn định (Status: 200)."
elif [ "$HTTP_STATUS" = "301" ] || [ "$HTTP_STATUS" = "302" ] || [ "$HTTP_STATUS" = "308" ]; then
    log_message "🔄 Website đang tự động Redirect (Status: ${HTTP_STATUS}). Kết nối tới Nginx tốt."
else
    log_message "⚠️ CẢNH BÁO: Website trả về mã lỗi ${HTTP_STATUS}."
    log_message "👉 Vui lòng kiểm tra lại cấu hình Proxy Host trên giao diện Nginx Proxy Manager (Port 81) hoặc SSL Cloudflare."
fi

log_message "--------------------------------------------------------"
log_message "🏁 [$(date '+%H:%M:%S')] Kết thúc quy trình kiểm tra kết nối!"