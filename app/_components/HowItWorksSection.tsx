"use client";

import { motion } from "motion/react";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Describe Your Problem",
      description: "Tell us about your symptoms, health concerns, or the type of medical assistance you need.",
      icon: "📝",
      color: "from-blue-500 to-blue-600",
    },
    {
      number: "02", 
      title: "Find Your Doctor",
      description: "Our AI analyzes your needs and suggests the best-matched specialists, or choose any doctor directly.",
      icon: "👨‍⚕️",
      color: "from-green-500 to-green-600",
    },
    {
      number: "03",
      title: "Real-time Consultation",
      description: "Chat with your selected AI doctor in real-time, discuss symptoms, and get professional advice.",
      icon: "💬",
      color: "from-purple-500 to-purple-600",
    },
    {
      number: "04",
      title: "Get Treatment Plan",
      description: "Receive personalized medicine recommendations, lifestyle guidelines, and follow-up instructions.",
      icon: "💊",
      color: "from-orange-500 to-orange-600",
    },
    {
      number: "05",
      title: "Download Report",
      description: "Get a comprehensive medical report automatically generated with all consultation details and recommendations.",
      icon: "📋",
      color: "from-red-500 to-red-600",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Get medical consultation in just 5 simple steps. Our streamlined process 
            ensures you receive quality healthcare quickly and efficiently.
          </p>
        </motion.div>

        {/* Desktop view - horizontal timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Timeline line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-red-500 transform -translate-y-1/2 origin-left"
            />
            
            <div className="flex justify-between items-center relative z-10">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center max-w-xs"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl mb-4 shadow-lg`}
                  >
                    {step.icon}
                  </motion.div>
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-sm mb-4`}>
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile view - vertical timeline */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical timeline line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-green-500 to-red-500 origin-top"
            />
            
            <div className="space-y-12">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start relative z-10"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-2xl mr-6 shadow-lg`}
                  >
                    {step.icon}
                  </motion.div>
                  <div className="flex-1">
                    <div className={`inline-flex w-8 h-8 rounded-full bg-gradient-to-br ${step.color} items-center justify-center text-white font-bold text-sm mb-2`}>
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Your Consultation Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}