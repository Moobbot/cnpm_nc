import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import NotificationItem from '../components/NotificationItem';
import { INotification } from '@/types/noti';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

interface NotificationListStyles {
    container: React.CSSProperties;
    header: React.CSSProperties;
    actions: React.CSSProperties;
    footer: React.CSSProperties;
    notificationList: React.CSSProperties;
}

const styles: NotificationListStyles = {
    container: {
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        height: '500px' // Fixed height for the entire component
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
    },
    actions: {
        display: 'flex',
        gap: '0.5rem'
    },
    footer: {
        marginTop: 'auto', // Push to bottom
        display: 'flex',
        justifyContent: 'flex-end'
    },
    notificationList: {
        overflowY: 'auto', // Enable vertical scrolling
        flexGrow: 1,
        paddingRight: '0.5rem' // Add some padding for the scrollbar
    }
};

const NotificationList: React.FC = () => {
    const notifications: INotification[] = [
        {
            id: 1,
            avatar: '/path/to/avatar.png',
            username: 'hoavtn',
            action: 'đã gửi yêu cầu',
            content: 'Xét nghiệm sinh hóa',
            location: 'tại chỉ định 167130- Nguyễn Đình Long',
            timestamp: '9:00 10/11/2024',
            isRead: false
        },
        {
            id: 2,
            avatar: '/path/to/avatar2.png',
            username: 'binhnt',
            action: 'đã phê duyệt',
            content: 'Xét nghiệm máu',
            location: 'tại chỉ định 167131- Trần Văn An',
            timestamp: '9:15 10/11/2024',
            isRead: true
        },
        {
            id: 3,
            avatar: '/path/to/avatar3.png',
            username: 'hungld',
            action: 'đã từ chối',
            content: 'Chụp X-quang',
            location: 'tại chỉ định 167132- Lê Thị Bình',
            timestamp: '9:30 10/11/2024',
            isRead: false
        },
        {
            id: 4,
            avatar: '/path/to/avatar4.png',
            username: 'maipt',
            action: 'đã cập nhật',
            content: 'Siêu âm ổ bụng',
            location: 'tại chỉ định 167133- Nguyễn Văn Cường',
            timestamp: '9:45 10/11/2024',
            isRead: true
        },
        {
            id: 5,
            avatar: '/path/to/avatar5.png',
            username: 'anhnt',
            action: 'đã gửi yêu cầu',
            content: 'Đo điện tim',
            location: 'tại chỉ định 167134- Phạm Thị Dung',
            timestamp: '10:00 10/11/2024',
            isRead: false
        },
        {
            id: 6,
            avatar: '/path/to/avatar6.png',
            username: 'thuylt',
            action: 'đã hoàn thành',
            content: 'Xét nghiệm nước tiểu',
            location: 'tại chỉ định 167135- Trần Văn Em',
            timestamp: '10:15 10/11/2024',
            isRead: true
        },
        {
            id: 7,
            avatar: '/path/to/avatar7.png',
            username: 'namvv',
            action: 'đã hủy',
            content: 'Chụp MRI',
            location: 'tại chỉ định 167136- Lê Thị Giáng',
            timestamp: '10:30 10/11/2024',
            isRead: false
        },
        {
            id: 8,
            avatar: '/path/to/avatar8.png',
            username: 'thanhlv',
            action: 'đã yêu cầu bổ sung',
            content: 'Xét nghiệm vi sinh',
            location: 'tại chỉ định 167137- Nguyễn Văn Hùng',
            timestamp: '10:45 10/11/2024',
            isRead: true
        },
        {
            id: 9,
            avatar: '/path/to/avatar9.png',
            username: 'duchm',
            action: 'đã gửi yêu cầu',
            content: 'Chụp CT Scanner',
            location: 'tại chỉ định 167138- Phạm Thị Ian',
            timestamp: '11:00 10/11/2024',
            isRead: false
        },
        {
            id: 10,
            avatar: '/path/to/avatar10.png',
            username: 'linhtk',
            action: 'đã phê duyệt',
            content: 'Xét nghiệm đông máu',
            location: 'tại chỉ định 167139- Trần Văn Khoa',
            timestamp: '11:15 10/11/2024',
            isRead: true
        },
        {
            id: 11,
            avatar: '/path/to/avatar11.png',
            username: 'sonnt',
            action: 'đã từ chối',
            content: 'Siêu âm tim',
            location: 'tại chỉ định 167140- Lê Thị Lan',
            timestamp: '11:30 10/11/2024',
            isRead: false
        },
        {
            id: 12,
            avatar: '/path/to/avatar12.png',
            username: 'hientt',
            action: 'đã cập nhật',
            content: 'Xét nghiệm hormone',
            location: 'tại chỉ định 167141- Nguyễn Văn Minh',
            timestamp: '11:45 10/11/2024',
            isRead: true
        },
        {
            id: 13,
            avatar: '/path/to/avatar13.png',
            username: 'trangnt',
            action: 'đã gửi yêu cầu',
            content: 'Nội soi dạ dày',
            location: 'tại chỉ định 167142- Phạm Thị Nga',
            timestamp: '12:00 10/11/2024',
            isRead: false
        },
        {
            id: 14,
            avatar: '/path/to/avatar14.png',
            username: 'longdq',
            action: 'đã hoàn thành',
            content: 'Đo mật độ xương',
            location: 'tại chỉ định 167143- Trần Văn Oanh',
            timestamp: '12:15 10/11/2024',
            isRead: true
        },
        {
            id: 15,
            avatar: '/path/to/avatar15.png',
            username: 'huongnt',
            action: 'đã hủy',
            content: 'Xét nghiệm miễn dịch',
            location: 'tại chỉ định 167144- Lê Thị Phương',
            timestamp: '12:30 10/11/2024',
            isRead: false
        },
        {
            id: 16,
            avatar: '/path/to/avatar16.png',
            username: 'quynhnt',
            action: 'đã yêu cầu bổ sung',
            content: 'Chụp X-quang răng',
            location: 'tại chỉ định 167145- Nguyễn Văn Quang',
            timestamp: '12:45 10/11/2024',
            isRead: true
        }
    ];

    const [first, setFirst] = useState<number>(0);
    const [rows, setRows] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');
    const [filteredNotifications, setFilteredNotifications] = useState<INotification[]>([]);

    useEffect(() => {
        const filtered = notifications.filter((notification) => 
            activeFilter === 'all' || !notification.isRead
        );
        setFilteredNotifications(filtered);
        setCurrentPage(1);
        setFirst(0);
    }, [activeFilter]);

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
        setRows(event.rows);
        setCurrentPage(event.page + 1);
    };
    const rowsPerPageOptions = [
        { label: '5 dòng mỗi trang', value: 5 },
        { label: '10 dòng mỗi trang', value: 10 },
        { label: '15 dòng mỗi trang', value: 15 },
        { label: '20 dòng mỗi trang', value: 20 }
    ];

    const handleRowsPerPageChange = (e: DropdownChangeEvent) => {
        const newRows = e.value;
        setRows(newRows);
        setFirst(0);
        setCurrentPage(1);
    };

    const handleFilterChange = (filter: 'all' | 'unread'): void => {
        setActiveFilter(filter);
    };

    const paginatedNotifications = filteredNotifications.slice(first, first + rows);
    const totalRecords = filteredNotifications.length;
    const totalPages = Math.ceil(totalRecords / rows);

    // const customTemplate = {
    //     layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown',
    //     RowsPerPageDropdown: (options: any) => {
    //         return <Dropdown value={rows} options={rowsPerPageOptions} onChange={handleRowsPerPageChange} className="ml-2" />;
    //     }
    // };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2>THÔNG BÁO</h2>
                <div style={styles.actions}>
                    <Button 
                        label="Tất cả" 
                        className={activeFilter === 'all' ? 'p-button p-button-primary' : 'p-button-outlined'} 
                        onClick={() => handleFilterChange('all')} 
                    />
                    <Button 
                        label="Chưa đọc" 
                        className={activeFilter === 'unread' ? 'p-button p-button-primary' : 'p-button-outlined'} 
                        onClick={() => handleFilterChange('unread')} 
                    />
                </div>
            </div>

            <div style={styles.notificationList}>
                {paginatedNotifications.map((notification) => (
                    <NotificationItem 
                        key={notification.id} 
                        notification={notification} 
                    />
                ))}
            </div>

            <div style={styles.footer}>
                <Paginator 
                    first={first} 
                    rows={rows} 
                    totalRecords={totalRecords}  // Thay thế hardcode bằng totalRecords 
                    rowsPerPageOptions={[5, 10, 15, 20]} 
                    onPageChange={onPageChange} 
                    template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown" 
                />
            </div>
        </div>
    );
};

export default NotificationList;
