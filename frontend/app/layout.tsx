'use client';
import { LayoutProvider } from '../layout/context/layoutcontext';
import { UserProvider } from '../layout/context/usercontext'; // Import UserProvider
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../modules/demo/styles/Demos.scss';

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