<h1 align="center">LIS System</h1>

This product is a laboratory information management system. The system comprehensively manages laboratory testing activities in medical facilities. The system provides features for managing test orders, test results, test equipment, connectivity, information exchange with HIS medical record management systems and some system administration features. The system can be developed into a standalone system in medical facility laboratories or integrated with existing medical record management and hospital management systems in those facilities.

# Table of Contents

- [Table of Contents](#table-of-contents)
- [1. General structure of the project](#1-general-structure-of-the-project)
  - [1.1. Benefits structure](#11-benefits-structure)
  - [1.2. Frontend: React + TypeScript](#12-frontend-react--typescript)
  - [1.3. Backend: Node.js + ExpressJS + TypeScript (Module hóa)](#13-backend-nodejs--expressjs--typescript-module-hóa)
  - [1.4. ConsoleApp: `C#`](#14-consoleapp-c)
- [2. System Operating Flow Description](#2-system-operating-flow-description)
- [3. Bảo mật và quản lý dữ liệu](#3-bảo-mật-và-quản-lý-dữ-liệu)

# 1. General structure of the project

```
/LIS-Management-System
├── console_app/                 # Console App (C# console app)
├── backend/                     # Backend (Node.js + TypeScript)
├── frontend/                    # Frontend (React + TypeScript)
├── docs/                        # Tài liệu dự án
└── README.md                    # Thông tin dự án và hướng dẫn sử dụng
```

## 1.1. [Benefits structure](docs/structures/Benefits.md)

## 1.2. Frontend: React + TypeScript

- [Link Forder Structure](docs/structures/FRONTEND.md)

## 1.3. Backend: Node.js + ExpressJS + TypeScript (Module hóa)

- [Link Forder Structure](docs/structures/BACKEND.md)

## 1.4. ConsoleApp: `C#`

- [Link Forder Structure](docs/structures/LisConsoleApp.md)

# 2. System Operating Flow Description

- [System Operating Flow Description](docs/structures/SystemOperatingFlowDescription.md)

# 3. Bảo mật và quản lý dữ liệu

- `JWT`: Dùng để xác thực người dùng, bảo mật các API.
- `Bcrypt`: Mã hóa mật khẩu trước khi lưu trữ.
- `Rate limiting và CORS`: Bảo vệ API khỏi tấn công brute-force và điều chỉnh quyền truy cập.
- `HTTPS`: Sử dụng để mã hóa dữ liệu trao đổi giữa client và server.
