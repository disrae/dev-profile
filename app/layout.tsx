import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppPointerAmbience } from "@/app/components/AppPointerAmbience";
import { StarsBackground } from "@/app/components/StarsBackground";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daniel Israel | Software engineer",
  description:
    "Portfolio of web and mobile engineering work—live project previews and contact links.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="relative flex min-h-full flex-1 flex-col">
          <StarsBackground />
          <AppPointerAmbience />
          <div className="relative z-10 flex min-h-screen w-full flex-1 flex-col">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
