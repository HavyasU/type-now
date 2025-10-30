import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { TypingContextProvider } from "@/context/TypingTestContext/TypingTestContextProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Type-Now",
  description: "Type-Now is a Typing Test Taking Site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TypingContextProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <>
            <Header />
            {children}
          </>
        </body>
      </TypingContextProvider>
    </html>
  );
}
