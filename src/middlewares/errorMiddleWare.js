// Những middleware là những kiểu giống như đứng ở giữa để nó lắng nghe và nó giống 1 người 
// bảo vệ chặn đường (tương tự 1 cầu nối xử lý những lỗi)
// _req hay _res là những tham số khai báo nhưng không dùng

const errorMiddleHandle = (err, _req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode).json({
        message: err.message,
        statusCode,
        stack: err.stack,
    });
}

module.exports = errorMiddleHandle;

// MiddleWare này được sử dụng trước tất cả các users