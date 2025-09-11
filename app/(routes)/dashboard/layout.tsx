import React from "react";
import AppHeader from "./_components/AppHeader";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      {/* <AppHeader /> */}
      <Navbar/>
      <div className="px-10 mt-10 md:px-20 lg:px-40 py-10">
      {children}
        <Toaster />

      </div>
      <Footer/>
    </div>
  );
}

export default DashboardLayout;
