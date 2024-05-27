import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  "title": "Vaquero Bot",
  "description": "Vaquero Bot is a chatbot designed to assist users with inquiries related to the University of Rio Grande Valley (UTRGV). Get quick answers to common questions, personalized assistance, and access information at any time via a user-friendly chat interface."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
