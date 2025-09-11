"use client";

import { motion } from "motion/react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Working Professional",
      avatar: "👩‍💼",
      rating: 5,
      text: "Amazing experience! The AI doctor understood my symptoms perfectly and provided accurate medication recommendations. The automated report was so detailed and helpful.",
      delay: 0.1,
    },
    {
      name: "Michael Chen",
      role: "Student",
      avatar: "👨‍🎓",
      rating: 5,
      text: "As a student with limited time, this service is a lifesaver. Quick consultations, expert advice, and I can access it anytime. Highly recommended!",
      delay: 0.2,
    },
    {
      name: "Emily Rodriguez",
      role: "Mother of Two",
      avatar: "👩‍👧‍👦",
      rating: 5,
      text: "Perfect for busy parents! When my kids have minor health issues, I can get quick professional advice without waiting for appointments. The doctors are very knowledgeable.",
      delay: 0.3,
    },
    {
      name: "David Wilson",
      role: "Senior Citizen",
      avatar: "👴",
      rating: 5,
      text: "The interface is so easy to use, and the doctors are patient with all my questions. The follow-up guidelines in the report help me stay on track with my treatment.",
      delay: 0.4,
    },
    {
      name: "Lisa Thompson",
      role: "Healthcare Worker",
      avatar: "👩‍⚕️",
      rating: 5,
      text: "Even as a healthcare professional, I use this service for quick consultations. The AI is remarkably accurate and the specialist matching feature is excellent.",
      delay: 0.5,
    },
    {
      name: "Alex Kumar",
      role: "Tech Professional",
      avatar: "👨‍💻",
      rating: 5,
      text: "The technology is impressive! Real-time consultations feel natural and the automated reporting system saves so much time. Great innovation in healthcare.",
      delay: 0.6,
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: index * 0.1 }}
        viewport={{ once: true }}
        className={index < rating ? "text-yellow-500" : "text-gray-300"}
      >
        ⭐
      </motion.span>
    ));
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Patients Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Real experiences from thousands of satisfied patients who trusted our AI Doctor Assistant 
            for their healthcare needs.
          </p>
        </motion.div>

        {/* Animated testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: testimonial.delay,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                rotateY: 2,
                transition: { duration: 0.3 }
              }}
              className="bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Quote decoration */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: testimonial.delay + 0.2 }}
                viewport={{ once: true }}
                className="text-6xl text-blue-200 dark:text-blue-800 mb-4 leading-none"
              >
                "
              </motion.div>

              {/* Rating stars */}
              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Testimonial text */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: testimonial.delay + 0.3 }}
                viewport={{ once: true }}
                className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"
              >
                {testimonial.text}
              </motion.p>

              {/* User info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: testimonial.delay + 0.4 }}
                viewport={{ once: true }}
                className="flex items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-2xl mr-4 shadow-md"
                >
                  {testimonial.avatar}
                </motion.div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2"
            >
              <span className="text-2xl">🏆</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Award Winning
              </span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2"
            >
              <span className="text-2xl">🔒</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                HIPAA Compliant
              </span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2"
            >
              <span className="text-2xl">⚡</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Instant Results
              </span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2"
            >
              <span className="text-2xl">✅</span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                FDA Approved
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}