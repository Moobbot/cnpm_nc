'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useRef } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useUser } from '../../../../layout/context/usercontext';
import { Avatar } from 'primereact/avatar';
import { Toast } from 'primereact/toast';
import { getCookie, setCookie } from 'cookies-next';
import { get } from 'http';


const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const { setUser } = useUser();
    const router = useRouter();
    const toast = useRef<Toast>(null);
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden');

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            if (response.ok) {
                const data = await response.json();

                // Lưu thông tin vào cookie
                console.log(data.data.permissions);
                setCookie('token', data.accessToken, { maxAge: 60 * 60 * 24 });
                // localStorage.setItem('token', data.accessToken);
                setCookie('permissions', JSON.stringify(data.data.permissions), { maxAge: 60 * 60 * 24 });
                setCookie('grantAll', data.data.grantAll, { maxAge: 60 * 60 * 24 });

                setUser(data.user); // Cập nhật context
                router.push('/'); // Điều hướng về trang chủ
            } else {
                const errorData = await response.json();
                let detailMessage = 'Đăng nhập thất bại';
                if (errorData.message === 'User does not exist') {
                    detailMessage = 'Người dùng không tồn tại';
                } else if (errorData.message === 'Invalid credentials') {
                    detailMessage = 'Tên đăng nhập hoặc mật khẩu không chính xác';
                }
                toast.current?.show({ severity: 'error', summary: 'Lỗi', detail: detailMessage });
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.current?.show({ severity: 'error', summary: 'Lỗi', detail: 'Đã xảy ra lỗi, vui lòng thử lại sau' });
        }
    };

    return (
        <div className={containerClassName}>
            <Toast ref={toast} />
            <div className="flex flex-column align-items-center justify-content-center">
                <img src={`/layout/images/logo (1).svg`} alt="logo" className="mb-5 w-6rem flex-shrink-0" />
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <Avatar icon="pi pi-user" className="mb-3" style={{ height: '80px', width: '80px', borderRadius: '50%' }} />
                            <div className="text-900 text-3xl font-medium mb-3">Welcome!</div>
                            <span className="text-600 font-medium">Sign in to continue</span>
                        </div>

                        <div>
                            <label htmlFor="username1" className="block text-900 text-xl font-medium mb-2">
                                Username
                            </label>
                            <InputText id="username1" type="text" placeholder="Username" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} value={username} onChange={(e) => setUsername(e.target.value)} />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                            <Password inputId="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem" />

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <div className="flex align-items-center">
                                    <Checkbox inputId="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked ?? false)} className="mr-2"></Checkbox>
                                    <label htmlFor="rememberme1">Remember me</label>
                                </div>
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    Forgot password?
                                </a>
                            </div>
                            <Button label="Sign In" className="w-full p-3 text-xl" onClick={handleLogin}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
