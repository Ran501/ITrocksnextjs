import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import ClientLayout from './ClientLayout';
import { NewsProvider } from '@/context/NewsContext';
import { ProductProvider } from '@/context/ProductContext';
import ScrollToTop from '@/components/ScrollToTop';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'IT FC',
  description: 'IT FC - Your Football Club',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NewsProvider>
          <ProductProvider>
            <Providers>
              <ClientLayout>{children}</ClientLayout>
              <ScrollToTop />
            </Providers>
          </ProductProvider>
        </NewsProvider>
      </body>
    </html>
  );
}