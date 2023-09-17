import "./globals.css";
import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";

const font = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stardew Valley Crop Calculator",
  description: "A join venture between tackers99 and the devious one",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
