import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./page.module.css";
import { Analytics } from "@vercel/analytics/next"
import Logo from "./components/logo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Examin U",
  description: "Test Yourself",
  manifest: '/manifest.json'
};
export const viewport = {
  themeColor: '#ffffff',
}

export default function RootLayout({ children}) {
  return (
    <html lang="en">
    <head>
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#ffffff" />

      
      <Analytics/>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`} >
       <header>
         <Logo/>
       </header>
        {children}
      </body>
    </html>
  );
}
