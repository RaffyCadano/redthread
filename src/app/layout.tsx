import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RedThread — Follow the Connections",
  description:
    "A cinematic mystery investigation platform powered by real historical information and interactive evidence exploration.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="h-full bg-rt-bg text-rt-white antialiased">
        <div className="flex h-full min-h-screen">
          <Sidebar />
          <main className="flex-1 lg:ml-64 min-h-screen overflow-x-hidden flex flex-col pt-14 lg:pt-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
