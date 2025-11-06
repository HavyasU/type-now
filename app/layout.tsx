import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { TypingContextProvider } from "@/context/TypingTestContext/TypingTestContextProvider";
import { TextDataSet } from "@/components/Data/TextData";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next"

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

const initialRandomNumber = Math.floor(Math.random() * TextDataSet.length)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TypingContextProvider  >
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <>
            <Header />
            <Analytics/>
            {children}
            <Footer />
          </>
        </body>
      </TypingContextProvider>
    </html>
  );
}
