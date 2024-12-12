import React from 'react';

const UserMenu = () => {
    const handleLogout = () => {
        // Xử lý logic đăng xuất tại đây
        console.log('User logged out');
    };

    return (
        <div
            style={{
                position: 'absolute',
                top: '50px',
                right: '0',
                background: '#fff',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
                width: '220px',
                zIndex: 1000,
                overflow: 'hidden',
                fontFamily: 'Arial, sans-serif'
            }}
        >
            <div
                style={{
                    padding: '12px 16px',
                    background: '#f0f0f0',
                    fontWeight: 'bold',
                    color: '#333',
                    borderBottom: '1px solid #ddd'
                }}
            >
                Tài khoản của bạn
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                <li
                    style={{
                        padding: '12px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        cursor: 'pointer',
                        transition: 'background 0.3s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#f9f9f9')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                    <img
                        src="https://scontent-hkg1-1.xx.fbcdn.net/v/t39.30808-6/289821388_774329560609650_360686506320708301_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeF8tzhMQ21xMCoEx3kOGemnLJjJF6UwO94smMkXpTA73s3LYoMAHsvFBkZaeSH0PTsFdyJcHljgB0YzJ4XcDdUr&_nc_ohc=KLp8J_iAbcAQ7kNvgGEB7oJ&_nc_zt=23&_nc_ht=scontent-hkg1-1.xx&_nc_gid=AU6kg6ssPXbbm4-f3Tqn3be&oh=00_AYCTnpzxwi6IvzyfXEAFU-ZYF2-Yw4y7rpU-uM1ZN073rQ&oe=673F93A5" // Thay đường dẫn hình ảnh
                        alt="User Info"
                        style={{ width: '20px', height: '20px', borderRadius: '50%' }}
                    />
                    <a href="/user-info" style={{ textDecoration: 'none', color: '#333' }}>
                        Thông tin người dùng
                    </a>
                </li>
                <li
                    style={{
                        padding: '12px 16px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        color: '#ff4d4f',
                        fontWeight: 'bold',
                        transition: 'background 0.3s ease, color 0.3s ease'
                    }}
                    onClick={handleLogout}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#ffe5e5')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                    Đăng xuất
                </li>
            </ul>
        </div>
    );
};

export default UserMenu;
