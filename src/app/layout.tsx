// components/UserLayout.js
import { Inter } from 'next/font/google';
import './styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Zoom } from 'react-toastify';
import { ThemeProvider } from 'next-themes';
import Header from '@/app/_components/Header';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { LoginProvider } from '@/app/context/UserContext';
import { config } from '@fortawesome/fontawesome-svg-core';
import Footer from '@/app/_components/Footer';
import { SaleOffProvider } from '@/app/context/SaleOffContext';
import { CartProvider } from '@/app/context/CartContext';
import { SidebarProvider } from '@/app/context/SidebarContext';


config.autoAddCss = false;
const inter = Inter({
  subsets: ['latin'],
});

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      
      <body className={`${inter.className}`}>
        <ThemeProvider attribute="class">
          <LoginProvider>
            <CartProvider>
              <SidebarProvider>
                <div className="w-full">
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
                </div>
                <SaleOffProvider>
                  <div className="top-40 w-full">{children}</div>
                </SaleOffProvider>

                <div className="">
                  <Footer />
                </div>
              </SidebarProvider>
            </CartProvider>
          </LoginProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
