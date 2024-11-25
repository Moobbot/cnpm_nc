'use client';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';

import '../modules/demo/styles/Demos.scss';
import '../styles/layout/layout.scss';

import { PrimeReactProvider } from 'primereact/api';
import { LayoutProvider } from '../layout/context/layoutcontext';
import { UserProvider } from '../layout/context/usercontext';

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link id="theme-css" href={`/themes/lara-light-indigo/theme.css`} rel="stylesheet"></link>
            </head>
            <body>
                <PrimeReactProvider>
                    <UserProvider>
                        <LayoutProvider>
                            {children}
                        </LayoutProvider>
                    </UserProvider>
                </PrimeReactProvider>
            </body>
        </html>
    );
}