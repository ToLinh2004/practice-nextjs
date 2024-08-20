import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Zoom } from 'react-toastify';
import { ThemeProvider } from 'next-themes';
import SideBar from '@/app/_components/SideBar';
import Header from '@/app/_components/Header';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { LoginProvider } from '@/app/context/UserContext';
import { config } from '@fortawesome/fontawesome-svg-core';
import { SidebarProvider } from '@/app/context/SidebarContext';
import { CartProvider } from '@/app/context/CartContext';

config.autoAddCss = false;
const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    absolute: '',
    default: 'V-SPLUSH',
    template: '%s - V-SPLUSH ',
  },

  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class">
          <LoginProvider>
            <SidebarProvider>
              <div className="flex">
                <Header />
                <ToastContainer
                  position="top-right"
                  autoClose={1000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                  className="mr-14"
                  transition={Zoom}
                />

                <div className="w-1/6 sm:w-0">
                  <SideBar />
                </div>

                <div className="h-full w-4/5 sm:w-full">{children}</div>
              </div>
            </SidebarProvider>
          </LoginProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
