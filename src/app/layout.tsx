import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";
import { cn } from "@/lib/utils";
import QueryProvider from "@/providers/query-provider";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",       // ← keep this name
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",   // ← rename to avoid the self-ref collision
});

export const metadata: Metadata = {
  title: "SwiftDrop | Courier & Logistics",
  description: "Fast, reliable courier and parcel delivery management.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        geistSans.variable,
        jetbrainsMono.variable,
        "font-sans",           // ← sans as default, NOT font-mono
      )}
    >
      <body className="flex min-h-full flex-col">
        <QueryProvider>
          {children}
          <Toaster position="top-right" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}