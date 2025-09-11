"use client";

import { motion } from "motion/react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function HeroSection() {
  const { user } = useUser();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-20 -left-20 w-40 h-40 bg-blue-200/30 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-20 -right-20 w-60 h-60 bg-green-200/30 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [-20, 20, -20],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-purple-200/20 rounded-full blur-lg"
        />
      </div>

      <div className="relative z-10 px-4 py-10 md:py-20 text-center">
        {/* Animated medical icons */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex justify-center space-x-4 mb-6">
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center"
            >
              <span className="text-2xl">🩺</span>
            </motion.div>
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"
            >
              <span className="text-2xl">💊</span>
            </motion.div>
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center"
            >
              <span className="text-2xl">🤖</span>
            </motion.div>
          </div>
        </motion.div>

        <h1 className="max-w-4xl text-4xl font-bold text-slate-700 md:text-6xl lg:text-7xl dark:text-slate-300 mb-6">
          {"AI Doctor Assistant".split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
              className="mr-4 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="max-w-2xl mx-auto text-xl text-neutral-600 dark:text-neutral-400 mb-8"
        >
          Get instant medical consultation with our AI-powered doctor. Find the right specialist, 
          get personalized treatment recommendations, and receive comprehensive health reports.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {!user ? (
            <>
              <Link href="/sign-in">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors"
                >
                  Start Consultation
                </motion.button>
              </Link>
              <Link href="/doctors">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Browse Doctors
                </motion.button>
              </Link>
            </>
          ) : (
            <Link href="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
              </motion.button>
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}