import React from 'react';
import { Geist } from 'next/font/google';
import './globals.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

const geist = Geist({ subsets: ['latin'] });

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geist.className} suppressHydrationWarning>
        <TanStackProvider>
          <Header />
          <main style={{ position: 'relative' }}>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
