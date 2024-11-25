# ConsoleApp: `C#`

## 1. Folder Structure

```
LisConsoleApp/
├── appsettings.json # Cấu hình hệ thống
├── Services/ # Chứa các service xử lý nghiệp vụ
│ ├── DeviceConnectionService.cs # Kết nối thiết bị xét nghiệm
│ ├── TestResultService.cs
│ ├── ConfigService.cs # Đọc và ghi cấu hình kết nối thiết bị
│ └── SignalRClientService.cs # Quản lý kết nối client SignalR tới server
├── Utils/ # Các tiện ích xử lý dữ liệu, log, và lỗi
│ ├── Logger.cs # Ghi log quá trình kết nối và xử lý dữ liệu từ thiết bị
│ ├── DataParser.cs # Chuyển đổi dữ liệu thô từ máy xét nghiệm sang định dạng LIS
│ └── ErrorHandler.cs # Xử lý lỗi phát sinh trong quá trình vận hành hệ thống
└── Program.cs # Điểm khởi chạy ứng dụng
```

## 2. Giải thích chi tiết

1. **appsettings.json:** Chứa các cấu hình cấp hệ thống, bao gồm URL máy chủ SignalR và các thiết lập chung khác
2. **Services/:** Thư mục này chứa các dịch vụ cốt lõi chịu trách nhiệm quản lý kết nối thiết bị, xử lý kết quả thử nghiệm và xử lý giao tiếp thời gian thực với máy chủ SignalR.
   - **DeviceConnectionService.cs**: Quản lý việc mở và đóng kết nối với thiết bị, đảm bảo thiết bị được kết nối đúng cách và báo cáo mọi sự cố theo thời gian thực. Dịch vụ này cũng ghi lại trạng thái kết nối của thiết bị.
   - **TestResultService.cs**: Lắng nghe kết quả thử nghiệm từ các thiết bị được kết nối, giải mã dữ liệu thử nghiệm (chuyển đổi dữ liệu thô thành định dạng có thể sử dụng) và gửi dữ liệu đã giải mã đến máy chủ SignalR để xử lý thêm. Dịch vụ này đảm bảo các định dạng kết quả thử nghiệm khác nhau được xử lý phù hợp.
   - **SignalRClientService.cs**: Kết nối với SignalR server được triển khai trên Next.js để gửi kết quả xét nghiệm và trạng thái kết nối của thiết bị. Nó nhận hướng dẫn thời gian thực (ví dụ: cấu hình thiết bị, yêu cầu xét nghiệm, …), xử lý chúng và gửi lại kết quả xét nghiệm và trạng thái thiết bị.
3. **Utils/:** Chứa các lớp tiện ích được sử dụng trong toàn bộ ứng dụng để ghi nhật ký, phân tích dữ liệu và xử lý lỗi.
   - **Logger.cs**: Cung cấp cơ chế ghi nhật ký toàn diện ghi lại quá trình kết nối thiết bị, xử lý dữ liệu và bất kỳ hoạt động quan trọng nào khác trong hệ thống cho mục đích kiểm tra, debug.
   - **DataParser.cs**: Chịu trách nhiệm chuyển đổi dữ liệu thô từ thiết bị sang định dạng có thể được xử lý bởi Hệ thống LIS. Các thiết bị khác nhau có thể gửi dữ liệu ở nhiều định dạng khác nhau và lớp này đảm bảo chúng được chuyển đổi nhất quán.
   - **ErrorHandler.cs**: Xử lý các ngoại lệ và lỗi có thể phát sinh trong quá trình kết nối hoặc trong khi xử lý dữ liệu thử nghiệm, đảm bảo hệ thống có thể khôi phục bình thường và báo cáo các thông báo lỗi có ý nghĩa.
4. **Program.cs**: Đây là main entry point của ứng dụng. Nó tải các cấu hình ban đầu, thiết lập kết nối và khởi động SignalR Client để giao tiếp với SignalR Hub của server (Next.js). Ứng dụng liên tục lắng nghe hướng dẫn từ máy chủ SignalR và xử lý dữ liệu theo đó.
