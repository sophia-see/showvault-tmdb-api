import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/custom-ui/toaster";
import { Outfit } from "next/font/google"
import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import { AppProvider } from "./contexts/AppContext";
import SearchBar from "@/components/SearchBar";

const outfit = Outfit({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "ShowVault",
  description: "Your ultimate companion for organizing movies and TV shows. Easily bookmark your favorites, build your watchlist, and keep track of what to watch next—all in one sleek and simple app",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly< RootLayoutProps>) {
  return (
    <html lang="en">
      <body
        className={`h-full min-h-dvh flex flex-col pb-20 ${outfit.className} antialiased`}
      >
        <AppProvider>
          <div className="lg:grid lg:grid-cols-[repeat(auto-fill,_minmax(90px,_1fr))]">
            <div className="relative">
              <Suspense>
                <Navbar />
              </Suspense>              
            </div>
            <div className="w-full lg:col-start-2 lg:-col-end-1">
              <Suspense>
                <SearchBar />                 
              </Suspense>
              {children}
            </div>
          </div>
          <Toaster />          
        </AppProvider>
      </body>
    </html>
  );
}
