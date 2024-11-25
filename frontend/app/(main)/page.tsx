/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { LayoutContext } from '../../layout/context/layoutcontext';


const Dashboard = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
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
