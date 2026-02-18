import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Portfolio Pro - Showcase Your Best Work',
  description:
    'Create a stunning portfolio that captivates visitors. Manage your projects effortlessly with our beautiful, modern platform.',
  keywords: ['portfolio', 'projects', 'showcase', 'developer', 'designer'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' data-theme='orange' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className='relative min-h-screen flex flex-col'>
            <Header />
            <main className='flex-1'>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
