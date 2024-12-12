/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react';
import { LayoutContext } from '../../layout/context/layoutcontext';
import { getCookie } from 'cookies-next';

const Dashboard = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = getCookie('token');
            if (!token) {
                router.replace('/auth/login'); 
            }
        }
    }, [router]);

    return (
        <div className="grid">

        </div>
    );
};

export default Dashboard;