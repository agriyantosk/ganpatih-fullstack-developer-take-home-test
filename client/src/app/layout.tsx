import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "../styles/globals.css";
import { AppProviders } from "./providers";
import { APP_NAME } from "@/config/theme";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Ganapatih technical test feed experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
