'use client';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primeicons/primeicons.css';
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { BreadCrumb } from 'primereact/breadcrumb';

const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
const breadcrumbItems = [{ label: 'Nhật kí hoạt động' }];

const UserActivityLog = () => {
    const [logs] = useState([
        {
            id: 1,
            userName: 'John Doe',
            action: 'Login',
            functionName: 'Dashboard',
            api: '/api/login',
            ip: '192.168.1.1',
            deviceName: 'iPhone 12',
            modelName: 'A2403',
            deviceType: 'Mobile',
            os: 'iOS',
            osVersion: '14.6',
            osType: 'Mobile',
            browserName: 'Safari',
            browserVersion: '14.1',
            createdTime: '2024-11-11T08:23:45Z',
            updatedTime: '2024-11-11T09:00:00Z'
        },
        {
            id: 2,
            userName: 'Jane Smith',
            action: 'Logout',
            functionName: 'Settings',
            api: '/api/logout',
            ip: '192.168.1.2',
            deviceName: 'Samsung Galaxy S21',
            modelName: 'SM-G991B',
            deviceType: 'Mobile',
            os: 'Android',
            osVersion: '11',
            osType: 'Mobile',
            browserName: 'Chrome',
            browserVersion: '91.0',
            createdTime: '2024-11-10T17:15:30Z',
            updatedTime: '2024-11-10T18:00:00Z'
        },
        {
            id: 3,
            userName: 'Alex Johnson',
            action: 'Update Profile',
            functionName: 'Profile',
            api: '/api/profile/update',
            ip: '10.0.0.3',
            deviceName: 'MacBook Pro',
            modelName: 'MacBookPro16,1',
            deviceType: 'Laptop',
            os: 'macOS',
            osVersion: '11.4',
            osType: 'Desktop',
            browserName: 'Safari',
            browserVersion: '14.1.1',
            createdTime: '2024-11-09T14:50:15Z',
            updatedTime: '2024-11-09T15:30:00Z'
        }
    ]);

    interface Log {
        id: number;
        userName: string;
        action: string;
        functionName: string;
        api: string;
        ip: string;
        deviceName: string;
        modelName: string;
        deviceType: string;
        os: string;
        osVersion: string;
        osType: string;
        browserName: string;
        browserVersion: string;
        createdTime: string;
        updatedTime: string;
    }

    const [selectedLog, setSelectedLog] = useState<Log | null>(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [actionFilter, setActionFilter] = useState(null);
    const [functionFilter, setFunctionFilter] = useState(null);

    const uniqueActions = [...new Set(logs.map((log) => log.action))].map((action) => ({ label: action, value: action }));
    const uniqueFunctions = [...new Set(logs.map((log) => log.functionName))].map((func) => ({ label: func, value: func }));

    const filteredLogs = logs.filter((log) => {
        return (!actionFilter || log.action === actionFilter) && (!functionFilter || log.functionName === functionFilter);
    });

    const formatDate = (value: string) => new Date(value).toLocaleString('vi-VN');

    const resetFilters = () => {
        setActionFilter(null);
        setFunctionFilter(null);
    };

    const actionFilterTemplate = () => <Dropdown value={actionFilter} options={uniqueActions} onChange={(e) => setActionFilter(e.value)} placeholder="Lọc Hành động" className="p-column-filter" />;
    const functionFilterTemplate = () => <Dropdown value={functionFilter} options={uniqueFunctions} onChange={(e) => setFunctionFilter(e.value)} placeholder="Lọc Tên chức năng" className="p-column-filter" />;
    const moreInfoTemplate = (rowData: any) => (
        <>
            <i
                className="pi pi-eye"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                    setSelectedLog(rowData);
                    setDialogVisible(true);
                }}
                data-pr-tooltip="Xem chi tiết"
            />
            <Tooltip target=".pi-eye" />
        </>
    );
    return (
        <div className="p-m-3">
            <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />
            <Button label="Đặt lại bộ lọc" icon="pi pi-filter-slash" className="p-button-outlined p-mb-3 mt-5 mb-5" onClick={resetFilters} />

            <DataTable value={filteredLogs} paginator rows={5} header="Nhật ký hoạt động" responsiveLayout="stack" stripedRows className="p-datatable-gridlines">
                <Column field="id" header="ID" style={{ width: '5%' }} />
                <Column field="userName" header="Tên người dùng" />
                <Column field="action" header="Hành động" filter filterElement={actionFilterTemplate} />
                <Column field="functionName" header="Tên chức năng" filter filterElement={functionFilterTemplate} />
                <Column field="ip" header="IP" />
                <Column field="createdTime" header="Thời gian tạo" body={(rowData) => formatDate(rowData.createdTime)} />
                <Column field="updatedTime" header="Thời gian cập nhật" body={(rowData) => formatDate(rowData.updatedTime)} />
                <Column body={moreInfoTemplate} header="Chi tiết" style={{ width: '10%' }} />
            </DataTable>

            <Dialog header="Thông tin chi tiết" visible={dialogVisible} style={{ width: '50vw' }} onHide={() => setDialogVisible(false)}>
                {selectedLog && (
                    <div>
                        <p>
                            <strong>API:</strong> {selectedLog.api}
                        </p>
                        <p>
                            <strong>IP:</strong> {selectedLog.ip}
                        </p>
                        <p>
                            <strong>Tên thiết bị:</strong> {selectedLog.deviceName}
                        </p>
                        <p>
                            <strong>Loại thiết bị:</strong> {selectedLog.deviceType}
                        </p>
                        <p>
                            <strong>Hệ điều hành:</strong> {selectedLog.os}
                        </p>
                        <p>
                            <strong>Trình duyệt:</strong> {selectedLog.browserName}
                        </p>
                        <p>
                            <strong>Thời gian tạo:</strong> {formatDate(selectedLog.createdTime)}
                        </p>
                        <p>
                            <strong>Thời gian cập nhật:</strong> {formatDate(selectedLog.updatedTime)}
                        </p>
                    </div>
                )}
            </Dialog>
        </div>
    );
};

export default UserActivityLog;
