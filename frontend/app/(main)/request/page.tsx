'use client';
import { BreadCrumb } from 'primereact/breadcrumb';
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Button } from 'primereact/button';
import { FiUser } from 'react-icons/fi';
import RequestNotificationForm from '@/layout/forms/RequestNotificationList';
import BarCodeForm from '@/layout/forms/BarCodeForm';
import ManuallyTestRequestForm from '@/layout/forms/ManuallyTestRequestForm';

const page = () => {
    const [selectedOption, setSelectedOption] = useState('manual'); // Trạng thái mặc định là 'Nhập thủ công'

    const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
    const breadcrumbItems = [{ label: 'Tiếp nhận yêu cầu xét nghiệm' }];

    // Các component Form tương ứng với từng lựa chọn
    const renderForm = () => {
        switch (selectedOption) {
            case 'manual':
                return <ManuallyTestRequestForm />;
            case 'barcode':
                return <BarCodeForm />; // Thay thế bằng form thực tế
            case 'his':
                return <RequestNotificationForm />; // Thay thế bằng form thực tế
            default:
                return null;
        }
    };

    return (
        <div className="layout-main">
            <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />

            <div
                className="card"
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' }, // Hàng trên màn hình lớn, cột trên màn hình nhỏ
                        alignItems: { xs: 'stretch', sm: 'center' }, // Căn giữa trên màn hình lớn
                        paddingBottom: '16px',
                        borderBottom: '1px solid #ccc',
                        gap: { xs: '16px', sm: '20px' } // Khoảng cách nhỏ hơn trên màn hình nhỏ
                    }}
                >
                    {/* Tiêu đề */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' }, // Xếp cột trên màn hình nhỏ, hàng trên màn hình lớn
                            gap: 1,
                            alignItems: 'center',
                            textAlign: { xs: 'center', sm: 'left' } // Canh giữa văn bản trên màn hình nhỏ
                        }}
                    >
                        <FiUser size={30} />
                        <h2>Tiếp nhận yêu cầu xét nghiệm</h2>
                    </Box>

                    {/* Nút chức năng */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' }, // Nút xếp dọc trên màn hình nhỏ
                            gap: 2
                        }}
                    >
                        <Button label="Nhập thủ công" className={selectedOption === 'manual' ? 'p-button p-button-primary' : 'p-button-outlined'} onClick={() => setSelectedOption('manual')} />
                        <Button label="Quét nhanh barcode" className={selectedOption === 'barcode' ? 'p-button p-button-primary' : 'p-button-outlined'} onClick={() => setSelectedOption('barcode')} />
                        <Button label="Nhập tự động từ hệ thống HIS" className={selectedOption === 'his' ? 'p-button p-button-primary' : 'p-button-outlined'} onClick={() => setSelectedOption('his')} />
                    </Box>
                </Box>

                {/* Hiển thị form tương ứng */}
                <Box>{renderForm()}</Box>
            </div>
        </div>
    );
};

export default page;
