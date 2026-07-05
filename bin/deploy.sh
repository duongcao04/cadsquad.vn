#!/bin/sh

# --- Cấu hình thông tin ---
VPS_USER="landpage"
VPS_IP="103.82.192.189"
VPS_DIR="/home/landpage/public_html"
SERVICE_NAME="landpage.service"

# --- Tạo thư mục logs ở máy thật nếu chưa có ---
mkdir -p logs
LOG_FILE="logs/deploy_$(date +%Y%m%d_%H%M%S).log"

# Hàm ghi log song song (In ra terminal máy thật + Ghi vào file log)
log_message() {
    echo "$1" | tee -a "$LOG_FILE"
}

log_message "🚀 [$(date '+%H:%M:%S')] BẮT ĐẦU QUY TRÌNH DEPLOY LANDING PAGE"
log_message "📝 File log trận này: ${LOG_FILE}"
log_message "--------------------------------------------------------"

# 1. Build dự án Next.js dạng Standalone trên máy thật
log_message "📦 [1/4] Đang build dự án Next.js (Standalone mode) trên máy thật..."
npm run build 2>&1 | tee -a "$LOG_FILE"

if [ ${PIPESTATUS[0]} -ne 0 ]; then
    log_message "❌ LỖI: Build Next.js thất bại! Dừng deploy ngay lập tức."
    exit 1
fi

# 2. Chuẩn bị tài nguyên và nén file theo chuẩn Standalone
log_message "📦 [2/4] Đang gom public, static vào thư mục standalone và nén..."
if [ -d "public" ]; then
    cp -r public .next/standalone/ 2>&1 | tee -a "$LOG_FILE"
fi
if [ -d ".next/static" ]; then
    cp -r .next/static .next/standalone/.next/ 2>&1 | tee -a "$LOG_FILE"
fi

# Tiến hành nén thư mục standalone
tar -czf deploy.tar.gz -C .next standalone 2>&1 | tee -a "$LOG_FILE"

# 3. Đẩy file nén lên VPS qua SCP
log_message "🚚 [3/4] Đang copy file deploy.tar.gz lên VPS..."
scp deploy.tar.gz ${VPS_USER}@${VPS_IP}:${VPS_DIR}/ 2>&1 | tee -a "$LOG_FILE"

# Xóa file nén ở máy thật sau khi gửi xong cho sạch máy
rm deploy.tar.gz

# 4. Kết nối SSH để giải nén, cập nhật code và Restart Service
log_message "🔄 [4/4] Đang kết nối SSH vào VPS để giải nén và cập nhật..."
log_message "--------------------------------------------------------"

REMOTE_DEPLOY_COMMANDS="
    cd ${VPS_DIR} && \
    echo '🔹 Đang giải nén code mới đè lên code cũ...' && \
    tar -xzf deploy.tar.gz && \
    rm deploy.tar.gz && \
    \
    echo '🔄 Đang nạp lại cấu hình hệ thống (daemon-reload)...' && \
    sudo /usr/bin/systemctl daemon-reload && \
    \
    echo '🚀 Đang khởi động lại dịch vụ ${SERVICE_NAME}...' && \
    sudo /usr/bin/systemctl restart ${SERVICE_NAME} && \
    \
    echo '📊 Đợi hệ thống ổn định và kiểm tra trạng thái...' && \
    sleep 2 && \
    \
    if /usr/bin/systemctl is-active --quiet ${SERVICE_NAME}; then \
        echo '✅ Kết quả: Dịch vụ đang hoạt động ONLINE (Running)!'; \
        echo 'STATUS_OK'; \
    else \
        echo '❌ Kết quả: Dịch vụ bị LỖI (Failed/Inactive)!'; \
        echo 'STATUS_FAILED'; \
    fi && \
    echo '--------------------------------------------------------' && \
    sudo /usr/bin/systemctl status ${SERVICE_NAME} --no-pager -n 15
"

# Thực thi chuỗi lệnh trên VPS và hứng kết quả về máy thật
VPS_OUTPUT=$(ssh -t ${VPS_USER}@${VPS_IP} "${REMOTE_DEPLOY_COMMANDS}" 2>&1)

# In toàn bộ kết quả trả về ra màn hình và file log ở máy thật
echo "$VPS_OUTPUT" | tee -a "$LOG_FILE"

log_message "--------------------------------------------------------"

# Kiểm tra chuỗi text trả về từ VPS để quyết định thông báo cuối cùng
if echo "$VPS_OUTPUT" | grep -q "STATUS_OK"; then
    log_message "🎉 [$(date '+%H:%M:%S')] HOÀN TẤT: Quy trình deploy thành công ổn định!"
else
    log_message "❌ [$(date '+%H:%M:%S')] THẤT BẠI: Quá trình deploy hoàn thành nhưng ứng dụng bị crash trên VPS. Vui lòng kiểm tra file log!"
fi