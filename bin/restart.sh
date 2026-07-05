#!/bin/sh

# --- Cấu hình thông tin VPS ---
VPS_USER="landpage"
VPS_IP="103.82.192.189"
SERVICE_NAME="landpage.service"

# --- Tạo thư mục logs ở máy thật nếu chưa có ---
mkdir -p logs
LOG_FILE="logs/restart_$(date +%Y%m%d_%H%M%S).log"

# Hàm ghi log song song (vừa in ra màn hình máy thật, vừa ghi vào file)
log_message() {
    echo "$1" | tee -a "$LOG_FILE"
}

log_message "🌐 [$(date '+%H:%M:%S')] Đang kết nối tới VPS ${VPS_IP} để khởi động lại..."
log_message "📝 Logs trận này sẽ được lưu tại: ${LOG_FILE}"
log_message "--------------------------------------------------------"

# Chuỗi lệnh sẽ thực thi trên VPS (Sử dụng đường dẫn tuyệt đối)
REMOTE_COMMANDS="
    echo '🔄 [1/3] Đang nạp lại cấu hình hệ thống (daemon-reload)...' && \
    sudo /usr/bin/systemctl daemon-reload && \
    \
    echo '🚀 [2/3] Đang khởi động lại dịch vụ ${SERVICE_NAME}...' && \
    sudo /usr/bin/systemctl restart ${SERVICE_NAME} && \
    \
    echo '📊 [3/3] Đợi hệ thống ổn định và kiểm tra trạng thái...' && \
    sleep 2 && \
    \
    if /usr/bin/systemctl is-active --quiet ${SERVICE_NAME}; then \
        echo '✅ Kết quả: Dịch vụ đang hoạt động ONLINE (Running)!'; \
    else \
        echo '❌ Kết quả: Dịch vụ bị LỖI (Failed/Inactive)!'; \
    fi && \
    echo '--------------------------------------------------------' && \
    sudo /usr/bin/systemctl status ${SERVICE_NAME} --no-pager -n 15
"

# Thực thi qua SSH và hứng toàn bộ output đổ vào file log ở máy thật
# Thêm -t để cấp TTY chuẩn cho sudo nhưng không dùng heredoc (<<EOF) để tránh nuốt lệnh
ssh -t ${VPS_USER}@${VPS_IP} "${REMOTE_COMMANDS}" 2>&1 | tee -a "$LOG_FILE"

log_message "--------------------------------------------------------"
log_message "🎉 [$(date '+%H:%M:%S')] Toàn bộ quy trình hoàn tất!"