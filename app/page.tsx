"use client";

import { motion } from "motion/react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

// Import your components from the _components folder
import HeroSection from "./_components/HeroSection";
import FeaturesSection from "./_components/FeaturesSection";
import HowItWorksSection from "./_components/HowItWorksSection";
import TestimonialsSection from "./_components/TestimonialsSection";
import CTASection from "./_components/CTASection";
import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";


export default function Home() {
  const { user } = useUser();

  return (
    <div className="relative">
      {/* Navigation */}
      <Navbar />
      
      {/* Decorative borders (keep your existing design) */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80 z-10">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80 z-10">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80 z-10">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>

      {/* Main content sections */}
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Keep your existing Navbar component
// const Navbar = () => {
//   const { user } = useUser();
//   return (
//     <nav className="relative z-20 flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 bg-white/80 backdrop-blur-sm dark:border-neutral-800 dark:bg-gray-900/80">
//       <div className="flex items-center gap-2">
//          <Image src={"/logo.png"} alt="logo" width={180} height={90} />
//       </div>
//       {!user ? (
//         <Link href={"/sign-in"}>
//           <motion.button
//             whileHover={{ scale: 1.05, y: -2 }}
//             whileTap={{ scale: 0.95 }}
//             className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200"
//           >
//             Login
//           </motion.button>
//         </Link>
//       ) : (
//         <div className="flex gap-5 items-center">
//           <UserButton />
//           <Link href={"/dashboard"}>
//             <Button>Dashboard</Button>
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// };