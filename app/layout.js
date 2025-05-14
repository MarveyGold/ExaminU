import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
