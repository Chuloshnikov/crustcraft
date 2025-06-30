import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";

import { Toaster } from 'sonner';
import Providers from "./providers";


const roboto  = Roboto({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'CrustCraft',
  description: `CrustCraft: Where Artisanal Pies Meet Culinary Mastery. 
  Experience the perfection of handcrafted crusts and gourmet toppings in 
  every bite. A symphony of flavors awaits at your favorite pizza haven.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased`}
      >
        <Providers>
            <main>
              <Header/>
              {children}
              <Footer/>
            </main>
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
