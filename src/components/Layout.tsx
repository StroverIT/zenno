"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 min-h-0 overflow-x-clip">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
