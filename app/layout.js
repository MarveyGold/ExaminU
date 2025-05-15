import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next"

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
      <Script src="https://ligheechoagool.com/88/tag.min.js" data-zone="147503" async data-cfasync="false" />
      <Analytics/>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <footer>
                <h6>
                  <div>
                  Note: This is a beta version
                  </div>
                  <div>
                  only Random mode is available
                  </div>
                   
             </h6>
            </footer>
      </body>
    </html>
  );
}
