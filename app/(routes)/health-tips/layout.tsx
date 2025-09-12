import React from "react";
import Navbar from "@/app/_components/Navbar";
import Footer from "@/app/_components/Footer";

function HealthTipsLayout({
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
      </div>
      <Footer/>
    </div>
  );
}

export default HealthTipsLayout;
