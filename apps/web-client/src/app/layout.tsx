import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CssBaseline } from '@mui/material';
import ThemeRegistry from '@/app/theme/ThemeRegistry';
import { Providers } from '@/app/providers/providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Footdash',
  description: 'Together in the beautiful game',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ThemeRegistry>
            <>
              <CssBaseline /> {/* Reset CSS for MUI */}
              {children}
            </>
          </ThemeRegistry>
        </Providers>
      </body>
    </html>
  );
}
