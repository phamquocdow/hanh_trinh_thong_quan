/* =====================================================================
   DỮ LIỆU CÂU HỎI — sửa/thêm câu hỏi tại đây.
   stage: 1..4 (4 = màn BOSS). options: 4 chuỗi, có/không có tiền tố "A. ".
   answer: "A" | "B" | "C" | "D" (theo thứ tự gốc). light (tùy chọn): "green"|"yellow"|"red"
   ===================================================================== */
export const QUESTIONS = [
  {
    "stage": 1, "stageName": "CẢNG XUẤT PHÁT – NHẬN DIỆN GIAN LẬN",
    "question": "Điểm khác biệt cơ bản nhất giữa hành vi buôn lậu và trốn thuế trong hoạt động xuất nhập khẩu theo nội dung bài trình bày là gì?",
    "options": ["A. Buôn lậu chỉ xảy ra ở hàng nhập khẩu, trốn thuế chỉ xảy ra ở hàng xuất khẩu.", "B. Buôn lậu hướng đến hàng hóa bị cấm hoặc vận chuyển trái phép qua biên giới, còn trốn thuế hướng đến nghĩa vụ thuế.", "C. Buôn lậu chỉ do cá nhân thực hiện, trốn thuế chỉ do doanh nghiệp thực hiện.", "D. Buôn lậu là vi phạm hành chính, còn trốn thuế luôn là tội phạm hình sự."],
    "answer": "B",
    "explain": "Buôn lậu là hành vi vận chuyển trái phép hàng hóa qua biên giới, còn trốn thuế là hành vi gian lận nhằm giảm hoặc né tránh nghĩa vụ thuế phải nộp. Hai hành vi có thể cùng xuất hiện trong một hoạt động xuất nhập khẩu, gây thất thu ngân sách nhà nước."
  },
  {
    "stage": 1, "stageName": "CẢNG XUẤT PHÁT – NHẬN DIỆN GIAN LẬN",
    "question": "Doanh nghiệp nhập khẩu một mặt hàng có thuế suất cao nhưng cố tình khai báo sang mã HS của mặt hàng tương tự có thuế suất thấp hơn. Đây là hành vi gian lận thuộc nhóm nào?",
    "options": ["A. Gian lận trị giá hải quan.", "B. Gian lận xuất xứ hàng hóa.", "C. Gian lận phân loại mã HS.", "D. Gian lận số lượng hàng hóa."],
    "answer": "C",
    "explain": "Mã HS được sử dụng để phân loại hàng hóa và xác định chính sách thuế tương ứng. Việc cố tình áp sai mã HS nhằm hưởng thuế suất thấp là một trong bốn mục tiêu gian lận được nêu trong slide trang 8."
  },
  {
    "stage": 1, "stageName": "CẢNG XUẤT PHÁT – NHẬN DIỆN GIAN LẬN",
    "question": "Trong bốn thủ đoạn qua mặt cơ quan Hải quan được trình bày, thủ đoạn nào gắn với việc sử dụng pháp nhân ảo rồi bỏ trốn hoặc giải thể khi phát sinh nghĩa vụ?",
    "options": ["A. Lợi dụng luồng Xanh/Vàng.", "B. Làm giả chứng từ chuyên ngành.", "C. Lợi dụng ưu đãi loại hình gia công, tạm nhập tái xuất.", "D. Thành lập công ty ma."],
    "answer": "D",
    "explain": "Công ty ma được sử dụng như một pháp nhân đứng tên giao dịch xuất nhập khẩu. Khi hàng hóa hoặc nghĩa vụ thuế phát sinh vấn đề, các đối tượng có thể bỏ trốn hoặc giải thể để né tránh trách nhiệm."
  },
  {
    "stage": 2, "stageName": "CẢNG KIỂM HÓA – THỦ ĐOẠN & KIỂM SOÁT",
    "question": "Vì sao việc lợi dụng chính sách ưu đãi đối với hàng gia công, sản xuất xuất khẩu và tạm nhập tái xuất có thể trở thành thủ đoạn gian lận thuế?",
    "options": ["A. Vì các loại hình này không cần khai báo hải quan.", "B. Vì doanh nghiệp có thể lợi dụng cơ chế ưu đãi, đánh tráo hoặc tẩu tán nguyên phụ liệu không đúng mục đích.", "C. Vì hàng hóa thuộc các loại hình này luôn được miễn mọi loại thuế.", "D. Vì cơ quan Hải quan không được kiểm tra hàng hóa sau khi thông quan."],
    "answer": "B",
    "explain": "Các chính sách ưu đãi được thiết kế nhằm tạo thuận lợi cho hoạt động sản xuất và thương mại hợp pháp. Tuy nhiên, đối tượng vi phạm có thể lợi dụng cơ chế này để đánh tráo, tẩu tán nguyên phụ liệu hoặc sử dụng hàng hóa sai mục đích."
  },
  {
    "stage": 2, "stageName": "CẢNG KIỂM HÓA – THỦ ĐOẠN & KIỂM SOÁT",
    "question": "Một lô hàng đã được thông quan, nhưng sau đó Hải quan phát hiện doanh nghiệp sử dụng nguyên liệu khai báo để sản xuất thức ăn chăn nuôi vào mục đích kinh doanh khác nhằm hưởng ưu đãi thuế. Biện pháp nào phù hợp nhất để phát hiện hành vi này?",
    "options": ["A. Chỉ kiểm tra hồ sơ trước khi hàng đến cửa khẩu.", "B. Kiểm tra sau thông quan, đối chiếu sổ sách, chứng từ và hoạt động sử dụng hàng hóa thực tế.", "C. Chỉ yêu cầu doanh nghiệp nộp lại tờ khai hải quan.", "D. Chỉ kiểm tra số lượng container tại cảng."],
    "answer": "B",
    "explain": "Kiểm tra sau thông quan giúp cơ quan Hải quan đối chiếu thông tin khai báo với chứng từ kế toán, định mức sản xuất, hàng tồn kho và hoạt động thực tế của doanh nghiệp. Qua đó, có thể phát hiện việc sử dụng hàng hóa sai mục đích để hưởng ưu đãi thuế."
  },
  {
    "stage": 2, "stageName": "CẢNG KIỂM HÓA – THỦ ĐOẠN & KIỂM SOÁT",
    "question": "Trong mô hình kiểm soát hải quan ba giai đoạn, hoạt động phân tích rủi ro E-Manifest và phân luồng VNACCS thuộc giai đoạn nào?",
    "options": ["A. Trước thông quan.", "B. Trong thông quan.", "C. Sau thông quan.", "D. Giai đoạn xử lý vi phạm hình sự."],
    "answer": "A",
    "explain": "Lưới bọc ba tầng liên hoàn phân chia rõ: Trước thông quan – phân tích rủi ro E-Manifest và phân luồng VNACCS. Trong thông quan – soi chiếu container, sử dụng E-seal và tham vấn giá. Sau thông quan – kiểm tra sổ sách trong thời hạn 5 năm và điều tra khi cần."
  },
  {
    "stage": 3, "stageName": "KHO NGOẠI QUAN – SAU THÔNG QUAN",
    "question": "Một doanh nghiệp khai báo hàng hóa có xuất xứ từ quốc gia được hưởng ưu đãi thuế quan theo EVFTA nhưng sử dụng C/O không hợp lệ. Hành vi này chủ yếu nhằm mục đích gì?",
    "options": ["A. Giảm chi phí vận chuyển quốc tế.", "B. Tránh thực hiện kiểm tra chuyên ngành.", "C. Gian lận xuất xứ để hưởng thuế suất ưu đãi không đúng quy định.", "D. Rút ngắn thời gian lưu kho tại cảng."],
    "answer": "C",
    "explain": "C/O là chứng từ chứng nhận xuất xứ hàng hóa. Sử dụng C/O không hợp lệ hoặc khai sai nguồn gốc nhằm hưởng ưu đãi thuế quan là hành vi gian lận xuất xứ được đề cập trong phần thực trạng kiểm tra sau thông quan năm 2026."
  },
  {
    "stage": 3, "stageName": "KHO NGOẠI QUAN – SAU THÔNG QUAN",
    "question": "Khi hệ thống e-Customs phát hiện dấu hiệu bất thường trong hoạt động sản xuất xuất khẩu của doanh nghiệp trước khi hàng ra cảng, phương án xử lý nào phù hợp nhất với quy trình tình huống trong bài?",
    "options": ["A. Cho hàng tiếp tục thông quan, sau đó mới kiểm tra sổ sách.", "B. Chỉ yêu cầu doanh nghiệp tự cam kết không vi phạm.", "C. Phối hợp liên ngành, bác bỏ luồng xanh, dừng đưa hàng qua khu vực giám sát và kiểm tra thực tế khi cần thiết.", "D. Hủy toàn bộ tờ khai của doanh nghiệp mà không cần xác minh."],
    "answer": "C",
    "explain": "Khi phát hiện dấu hiệu bất thường, cơ quan Hải quan cần kịp thời ngăn chặn hàng hóa tiếp tục lưu thông, phối hợp với các lực lượng chức năng và tiến hành kiểm tra thực tế. Nếu có đủ căn cứ về dấu hiệu tội phạm, vụ việc sẽ được chuyển sang xử lý hình sự."
  },
  {
    "stage": 3, "stageName": "KHO NGOẠI QUAN – SAU THÔNG QUAN",
    "question": "Theo bài trình bày, vì sao công tác kiểm tra sau thông quan có vai trò đặc biệt quan trọng trong phòng chống gian lận thuế?",
    "options": ["A. Vì mọi hành vi gian lận đều được thực hiện sau khi hàng đã thông quan.", "B. Vì một số hành vi gian lận chỉ bộc lộ khi đối chiếu hồ sơ khai báo với sổ sách, chứng từ và hoạt động sản xuất, kinh doanh thực tế.", "C. Vì kiểm tra sau thông quan có thể thay thế hoàn toàn hoạt động kiểm tra trước và trong thông quan.", "D. Vì doanh nghiệp chỉ phải chịu trách nhiệm về thuế sau khi hàng đã được đưa vào thị trường."],
    "answer": "B",
    "explain": "Không phải mọi gian lận đều thể hiện ngay trên tờ khai. Việc kiểm tra sau thông quan giúp phát hiện các sai phạm liên quan đến trị giá, mã HS, xuất xứ, định mức sản xuất, sử dụng hàng hóa sai mục đích và nghĩa vụ thuế."
  },
  {
    "stage": 4, "stageName": "VÙNG BIỂN ĐÊM – HẢI QUAN THÔNG MINH",
    "question": "Một cơ quan Hải quan muốn nâng cao hiệu quả kiểm soát nhưng không làm cản trở hoạt động của các doanh nghiệp tuân thủ pháp luật. Theo bài trình bày, chỉ tiêu nào phản ánh rõ nhất mục tiêu cân bằng này?",
    "options": ["A. Tăng số lượng kiểm tra thực tế đối với tất cả các lô hàng.", "B. Kéo dài thời gian thông quan để hạn chế tối đa rủi ro.", "C. Tăng tỷ lệ phát hiện vi phạm, đồng thời nâng tỷ lệ doanh nghiệp AEO tự nguyện tuân thủ và rút ngắn thời gian thông quan (TRS).", "D. Tập trung kiểm tra toàn bộ doanh nghiệp mới thành lập."],
    "answer": "C",
    "explain": "Thành công của Hải quan không chỉ nằm ở việc phát hiện vi phạm mà còn phải tạo thuận lợi cho thương mại hợp pháp. AEO là doanh nghiệp ưu tiên, còn TRS là công cụ đo lường thời gian giải phóng hàng hóa. Hai yếu tố này phản ánh mục tiêu cân bằng giữa kiểm soát và thuận lợi thương mại."
  },
  {
    "stage": 4, "stageName": "VÙNG BIỂN ĐÊM – HẢI QUAN THÔNG MINH",
    "question": "Theo kinh nghiệm quốc tế được trình bày trong slide, quốc gia nào xây dựng nền tảng NTP liên thông dữ liệu giữa Hải quan – Thuế – Ngân hàng, kết hợp chế tài phạt gấp 20 lần và công khai vi phạm?",
    "options": ["A. Trung Quốc.", "B. Hoa Kỳ.", "C. Singapore.", "D. Nhật Bản."],
    "answer": "C",
    "explain": "Singapore với nền tảng NTP kết nối Hải quan, Thuế và Ngân hàng. Việc liên thông dữ liệu giúp phát hiện bất thường trong dòng hàng hóa và dòng tiền, đồng thời tăng hiệu quả giám sát và xử lý vi phạm."
  },
  {
    "stage": 4, "stageName": "VÙNG BIỂN ĐÊM – HẢI QUAN THÔNG MINH",
    "question": "Giả sử Việt Nam chỉ đầu tư hệ thống máy soi container hiện đại mà không cải thiện việc chia sẻ dữ liệu giữa Hải quan, Thuế và các cơ quan liên quan. Hạn chế lớn nhất của giải pháp này là gì?",
    "options": ["A. Không thể phát hiện bất kỳ hành vi buôn lậu nào qua đường biển.", "B. Chỉ kiểm soát được hàng hóa vật lý tại cửa khẩu, chưa xử lý triệt để các gian lận về trị giá, xuất xứ, nghĩa vụ thuế và hoạt động thực tế của doanh nghiệp.", "C. Làm mất hoàn toàn vai trò của kiểm tra sau thông quan.", "D. Khiến mọi doanh nghiệp phải chuyển sang kiểm tra luồng đỏ."],
    "answer": "B",
    "explain": "Máy soi container giúp kiểm tra hàng hóa vật lý, nhưng không thể tự mình phát hiện đầy đủ những gian lận nằm trong chứng từ, giao dịch tài chính, xuất xứ và quá trình sử dụng nguyên liệu. Vì vậy, cần kết hợp công nghệ kiểm soát với liên thông dữ liệu, quản lý rủi ro và kiểm tra sau thông quan. Đây cũng là định hướng hải quan thông minh được nhấn mạnh trong bài."
  }
];
