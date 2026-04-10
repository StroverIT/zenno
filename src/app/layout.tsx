"use client";

import "./globals.css";
import type { ReactNode } from "react";
import { GeistMono } from "geist/font/mono";
import { Nunito, Playfair_Display } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${playfair.variable} ${GeistMono.variable}`}
    >
      <body className="antialiased">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <SessionProvider>
              <AuthProvider>
                <Layout>{children}</Layout>
              </AuthProvider>
            </SessionProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

