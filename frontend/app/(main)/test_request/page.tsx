'use client';
import React, { useState } from "react";

import "../../../modules/demo/styles/request.scss"

interface Patient {
    id: number;
    name: string;
    status: string;
    time: string;
}

interface TestInfo {
    type: string;
    name: string;
    sampleType: string;
    note: string;
}
// refactor to demo.d.ts later 
const patients: Patient[] = [
    { id: 167130, name: "Nguyễn Đình Long", status: "Chờ lấy mẫu", time: "9:00 10/11/2024" },
    { id: 167132, name: "Nguyễn Minh Anh", status: "Chờ lấy mẫu", time: "9:03 10/11/2024" },
    { id: 167133, name: "Tô Ngọc Ánh", status: "Chờ lấy mẫu", time: "9:03 10/11/2024" },
    // Thêm các bệnh nhân khác
];

const testDetails: TestInfo[] = [
    { type: "10002", name: "anlm", sampleType: "Bác Sỹ CXNX", note: "Bác Sỹ CXNX" },
    { type: "10002", name: "anlm", sampleType: "Bác Sỹ CXNX", note: "Bác Sỹ CXNX" },
    { type: "10002", name: "anlm", sampleType: "Bác Sỹ CXNX", note: "Bác Sỹ CXNX" },
];

const QueueManagement: React.FC = () => {
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

    const handlePatientClick = (patient: Patient) => {
        setSelectedPatient(patient);
    };

    return (
        <div className="queue-management">
            <header className="header">
                <h1>Hàng đợi xử lý mẫu</h1>
                <div className="search-bar">
                    <input type="text" placeholder="Tìm kiếm bằng mã" />
                    <select>
                        <option value="">Lựa chọn trạng thái</option>
                        <option value="waiting">Chờ lấy mẫu</option>
                    </select>
                    <select>
                        <option value="">Lựa chọn loại mẫu</option>
                    </select>
                    <input type="date" />
                </div>
            </header>

            <div className="content">
                <aside className="patient-list">
                    {patients.map((patient) => (
                        <div
                            key={patient.id}
                            className={`patient-item ${selectedPatient?.id === patient.id ? "active" : ""}`}
                            onClick={() => handlePatientClick(patient)}
                        >
                            <p>
                                <strong>{patient.id} - {patient.name}</strong>
                            </p>
                            <p>{patient.status}</p>
                            <p>{patient.time}</p>
                        </div>
                    ))}
                </aside>

                <main className="patient-details">
                    {selectedPatient ? (
                        <>
                            <div className="info-section">
                                <div>
                                    <h2>THÔNG TIN BỆNH NHÂN</h2>
                                    <p><strong>Họ tên:</strong> {selectedPatient.name}</p>
                                    <p><strong>Tuổi:</strong> 40</p>
                                    <p><strong>Giới:</strong> Nam</p>
                                    <p><strong>Số thẻ BHYT:</strong> HS4010120878817</p>
                                    <p><strong>Địa chỉ:</strong> Cầu Giấy - Hà Nội</p>
                                </div>
                                <div>
                                    <h2>THÔNG TIN KHÁM BỆNH</h2>
                                    <p><strong>Bác sỹ chỉ định:</strong> BS. Đinh Như Tuyến</p>
                                    <p><strong>Khoa:</strong> Phòng xét nghiệm Covid</p>
                                    <p><strong>Phòng:</strong> PK sàng lọc xét nghiệm CO</p>
                                </div>
                            </div>

                            <div className="test-details">
                                <h2>THÔNG TIN XÉT NGHIỆM - huyết học</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Loại xét nghiệm</th>
                                            <th>Tên xét nghiệm</th>
                                            <th>Loại mẫu bệnh phẩm</th>
                                            <th>Ghi chú</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {testDetails.map((test, index) => (
                                            <tr key={index}>
                                                <td>{test.type}</td>
                                                <td>{test.name}</td>
                                                <td>{test.sampleType}</td>
                                                <td>{test.note}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : (
                        <p>Vui lòng chọn một bệnh nhân để xem thông tin chi tiết</p>
                    )}
                </main>
            </div>

            <footer className="footer">
                <button>In barcode mẫu bệnh phẩm</button>
                <button>Cập nhật trạng thái</button>
            </footer>
        </div>
    );
};

export default QueueManagement;
