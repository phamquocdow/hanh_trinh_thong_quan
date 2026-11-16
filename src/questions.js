/* =====================================================================
   DỮ LIỆU CÂU HỎI — sửa/thêm câu hỏi tại đây.
   stage: 1..4 (4 = màn BOSS). options: 4 chuỗi, có/không có tiền tố "A. ".
   answer: "A" | "B" | "C" | "D" (theo thứ tự gốc). light (tùy chọn): "green"|"yellow"|"red"
   ===================================================================== */
export const QUESTIONS = [
  {
    "stage": 1, "stageName": "CẢNG XUẤT PHÁT – TRƯỚC THÔNG QUAN",
    "question": "Theo Luật Hải quan 2014, tờ khai hàng hóa nhập khẩu được nộp trong thời hạn nào?",
    "options": ["A. Chỉ được nộp sau khi hàng đã về kho", "B. Trước ngày hàng đến cửa khẩu hoặc trong 30 ngày kể từ ngày hàng đến cửa khẩu", "C. Trong 60 ngày kể từ ngày ký hợp đồng", "D. Bất kỳ lúc nào trước khi bán hàng"],
    "answer": "B",
    "explain": "Hàng nhập khẩu được khai trước ngày hàng đến cửa khẩu hoặc trong thời hạn 30 ngày kể từ ngày hàng đến cửa khẩu (Điều 25 Luật Hải quan 2014)."
  },
  {
    "stage": 1, "stageName": "CẢNG XUẤT PHÁT – TRƯỚC THÔNG QUAN",
    "question": "Hệ thống thông quan điện tử tự động đang được Hải quan Việt Nam sử dụng có tên là gì?",
    "options": ["A. VNACCS/VCIS", "B. ASYCUDA", "C. E-Tax Pro", "D. VNPOST-CUS"],
    "answer": "A",
    "explain": "VNACCS/VCIS là hệ thống thông quan tự động và cơ chế một cửa quốc gia, được Nhật Bản hỗ trợ triển khai từ năm 2014."
  },
  {
    "stage": 1, "stageName": "CẢNG XUẤT PHÁT – TRƯỚC THÔNG QUAN",
    "question": "Doanh nghiệp tuân thủ tốt pháp luật hải quan có thể được công nhận là gì để hưởng thủ tục ưu tiên?",
    "options": ["A. Doanh nghiệp miễn thuế", "B. Doanh nghiệp ưu tiên (AEO)", "C. Doanh nghiệp chế xuất", "D. Doanh nghiệp đặc quyền"],
    "answer": "B",
    "explain": "Doanh nghiệp ưu tiên (Authorized Economic Operator – AEO) được hưởng nhiều thuận lợi như miễn kiểm tra chứng từ, miễn kiểm tra thực tế, ưu tiên làm thủ tục (Điều 42, 43 Luật Hải quan 2014)."
  },
  {
    "stage": 2, "stageName": "CẢNG KIỂM HÓA – TRONG THÔNG QUAN",
    "question": "Tờ khai được hệ thống phân vào LUỒNG ĐỎ nghĩa là gì?",
    "options": ["A. Được thông quan ngay", "B. Chỉ kiểm tra hồ sơ giấy", "C. Kiểm tra hồ sơ và kiểm tra thực tế hàng hóa", "D. Tờ khai bị hủy"],
    "answer": "C", "light": "red",
    "explain": "Luồng xanh: miễn kiểm tra. Luồng vàng: kiểm tra chi tiết hồ sơ. Luồng đỏ: kiểm tra hồ sơ và kiểm tra thực tế hàng hóa."
  },
  {
    "stage": 2, "stageName": "CẢNG KIỂM HÓA – TRONG THÔNG QUAN",
    "question": "Thời hạn tối đa để cơ quan hải quan hoàn thành kiểm tra hồ sơ kể từ khi tiếp nhận đầy đủ hồ sơ là bao lâu?",
    "options": ["A. 2 giờ làm việc", "B. 8 giờ làm việc", "C. 1 ngày làm việc", "D. 3 ngày làm việc"],
    "answer": "A", "light": "yellow",
    "explain": "Kiểm tra hồ sơ chậm nhất 2 giờ làm việc kể từ khi cơ quan hải quan tiếp nhận đầy đủ hồ sơ; kiểm tra thực tế hàng hóa chậm nhất 8 giờ làm việc kể từ khi người khai xuất trình đủ hàng hóa (khoản 2 Điều 23 Luật Hải quan 2014)."
  },
  {
    "stage": 3, "stageName": "KHO NGOẠI QUAN – SAU THÔNG QUAN",
    "question": "Theo Luật Hải quan 2014, thời hạn kiểm tra sau thông quan là bao lâu kể từ ngày đăng ký tờ khai hải quan?",
    "options": ["A. 01 năm", "B. 03 năm", "C. 05 năm", "D. 10 năm"],
    "answer": "C",
    "explain": "Kiểm tra sau thông quan nhằm đánh giá tính chính xác, trung thực của nội dung đã khai và việc tuân thủ pháp luật. Thời hạn kiểm tra sau thông quan là 05 năm kể từ ngày đăng ký tờ khai hải quan (khoản 3 Điều 77 Luật Hải quan 2014)."
  },
  {
    "stage": 3, "stageName": "KHO NGOẠI QUAN – SAU THÔNG QUAN",
    "question": "Hàng hóa gửi kho ngoại quan được lưu giữ tối đa bao lâu kể từ ngày gửi vào kho (chưa tính gia hạn)?",
    "options": ["A. 6 tháng", "B. 12 tháng", "C. 18 tháng", "D. 36 tháng"],
    "answer": "B",
    "explain": "Hàng gửi kho ngoại quan được lưu giữ không quá 12 tháng kể từ ngày gửi vào kho; nếu có lý do chính đáng thì được gia hạn một lần, không quá 12 tháng (khoản 1 Điều 61 Luật Hải quan 2014)."
  },
  {
    "stage": 4, "stageName": "VÙNG BIỂN ĐÊM – CHỐNG BUÔN LẬU",
    "question": "Trong địa bàn hoạt động hải quan, cơ quan nào chịu trách nhiệm CHỦ TRÌ phòng, chống buôn lậu, vận chuyển trái phép hàng hóa qua biên giới?",
    "options": ["A. Cơ quan hải quan", "B. Cơ quan thuế", "C. Ủy ban nhân dân cấp xã", "D. Ngân hàng Nhà nước"],
    "answer": "A",
    "explain": "Trong địa bàn hoạt động hải quan, cơ quan hải quan chủ trì, phối hợp với công an, bộ đội biên phòng, cảnh sát biển… phòng, chống buôn lậu; ngoài địa bàn đó, hải quan phối hợp với các cơ quan khác (Điều 87, 88 Luật Hải quan 2014)."
  },
  {
    "stage": 4, "stageName": "VÙNG BIỂN ĐÊM – CHỐNG GIAN LẬN THƯƠNG MẠI",
    "question": "Doanh nghiệp cố tình khai sai mã số HS để được áp thuế suất thấp hơn, dẫn đến thiếu số thuế phải nộp. Hành vi này bị xử lý thế nào?",
    "options": ["A. Không vi phạm nếu hàng đã được thông quan", "B. Bị xử phạt vi phạm hành chính và phải nộp đủ số thuế còn thiếu", "C. Chỉ bị nhắc nhở bằng văn bản", "D. Được hoàn lại phần thuế chênh lệch"],
    "answer": "B",
    "explain": "Khai sai mã số, thuế suất dẫn đến thiếu thuế là gian lận thương mại: bị phạt tiền tính trên số thuế khai thiếu và truy thu đủ thuế (Điều 9 Nghị định 128/2020/NĐ-CP). Nếu có dấu hiệu trốn thuế thì xử lý theo Điều 14 Nghị định này hoặc truy cứu trách nhiệm hình sự."
  },
  {
    "stage": 4, "stageName": "VÙNG BIỂN ĐÊM – CHỐNG BUÔN LẬU",
    "question": "Theo Bộ luật Hình sự, hành vi buôn lậu hàng hóa trị giá từ bao nhiêu trở lên có thể bị truy cứu trách nhiệm hình sự?",
    "options": ["A. 10 triệu đồng", "B. 50 triệu đồng", "C. 100 triệu đồng", "D. 1 tỷ đồng"],
    "answer": "C",
    "explain": "Buôn lậu hàng hóa trị giá từ 100 triệu đồng (hoặc dưới 100 triệu đồng nhưng thuộc trường hợp đã bị xử phạt hành chính, đã bị kết án về hành vi này mà còn vi phạm…) bị truy cứu trách nhiệm hình sự (Điều 188 Bộ luật Hình sự 2015, sửa đổi 2017)."
  }
];
