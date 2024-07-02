const timestamp = 1719912610 // Số giây tính từ Epoch

const date = new Date(timestamp * 1000) // Chuyển đổi sang đối tượng Date
const formattedDate = date.toLocaleString() // Chuyển đổi sang chuỗi định dạng ngày/tháng/năm giờ:phút:giây

console.log('Thời điểm cụ thể là:', formattedDate)
