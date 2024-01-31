import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lôtôtô",
  description: "Trò chơi dân gian Việt Nam",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <Providers>
        <body className={`${inter.className} bg-purple-100`}>{children}</body>
      </Providers>
    </html>
  );
}
