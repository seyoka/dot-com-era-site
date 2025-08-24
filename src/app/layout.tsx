import type { Metadata } from "next";
import { DotGothic16 } from "next/font/google";
import "./globals.css";

const dotGothic16 = DotGothic16({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dotgothic16",
});

export const metadata: Metadata = {
  title: "Ryan Morrissey",
  description: "Software Engineer, Co-Founder, Builder. Always debugging, occasionally sleeping.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dotGothic16.variable} ${dotGothic16.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
