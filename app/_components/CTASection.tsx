"use client";

import { motion } from "motion/react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function CTASection() {
  const { user } = useUser();

  const benefits = [
    { icon: "⚡", text: "Instant consultation" },
    { icon: "🎯", text: "Accurate diagnosis" },
    { icon: "💊", text: "Personalized treatment" },
    { icon: "📱", text: "Mobile accessible" },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [-30, 30, -30],
            x: [-20, 20, -20],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 left-1/3 w-32 h-32 bg-white/5 rounded-full blur-lg"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Ready to Experience
            <motion.span
              animate={{ 
                backgroundPosition: ["0%", "100%", "0%"] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent bg-300% mt-2"
            >
              AI-Powered Healthcare?
            </motion.span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto"
          >
            Join thousands of satisfied patients who trust our AI Doctor Assistant 
            for reliable, fast, and personalized medical care.
          </motion.p>

          {/* Benefits grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-white"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: index * 0.5 
                  }}
                  className="text-2xl mb-2"
                >
                  {benefit.icon}
                </motion.div>
                <p className="text-sm font-medium">{benefit.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {!user ? (
              <>
                <Link href="/sign-in">
                  <motion.button
                    whileHover={{ 
                      scale: 1.05, 
                      y: -3,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                      Start Free Consultation
                    </span>
                  </motion.button>
                </Link>
                <Link href="/learn-more">
                  <motion.button
                    whileHover={{ 
                      scale: 1.05, 
                      y: -3,
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 backdrop-blur-sm"
                  >
                    Learn More
                  </motion.button>
                </Link>
              </>
            ) : (
              <Link href="/dashboard">
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    y: -3,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-12 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    Go to Dashboard
                  </span>
                </motion.button>
              </Link>
            )}
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-wrap justify-center items-center gap-6 text-blue-100"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2"
            >
              <span className="text-xl">🔒</span>
              <span className="text-sm">100% Secure</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2"
            >
              <span className="text-xl">⚡</span>
              <span className="text-sm">Instant Access</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2"
            >
              <span className="text-xl">🏆</span>
              <span className="text-sm">Award Winning</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2"
            >
              <span className="text-xl">💯</span>
              <span className="text-sm">Money Back Guarantee</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating medical elements */}
      <motion.div
        animate={{
          y: [-20, 20, -20],
          rotate: [0, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 text-4xl opacity-20"
      >
        🩺
      </motion.div>
      <motion.div
        animate={{
          y: [20, -20, 20],
          rotate: [360, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-10 text-4xl opacity-20"
      >
        💊
      </motion.div>
      <motion.div
        animate={{
          x: [-30, 30, -30],
          y: [-10, 10, -10],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 right-20 text-3xl opacity-20"
      >
        ❤️
      </motion.div>
    </section>
  );
}