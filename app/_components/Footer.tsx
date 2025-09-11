"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Shield,
  Clock,
  Award
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { name: "Find Doctors", href: "/doctors" },
        { name: "Emergency Care", href: "/emergency" },
        { name: "Health Tips", href: "/health-tips" },
        { name: "Medical Reports", href: "/reports" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "AI Consultation", href: "/consultation" },
        { name: "Specialist Search", href: "/specialists" },
        { name: "Health Monitoring", href: "/monitoring" },
        { name: "Prescription Management", href: "/prescriptions" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Careers", href: "/careers" },
      ],
    },
  ];

  const socialLinks = [
    { name: "Facebook", Icon: Facebook, href: "#", color: "hover:text-blue-600" },
    { name: "Twitter", Icon: Twitter, href: "#", color: "hover:text-sky-500" },
    { name: "LinkedIn", Icon: Linkedin, href: "#", color: "hover:text-blue-700" },
    { name: "Instagram", Icon: Instagram, href: "#", color: "hover:text-pink-500" },
    { name: "YouTube", Icon: Youtube, href: "#", color: "hover:text-red-600" },
  ];

  const contactInfo = [
    { Icon: Phone, text: "1-800-AI-DOCTOR", href: "tel:1800243628" },
    { Icon: Mail, text: "support@aidoctor.com", href: "mailto:support@aidoctor.com" },
    { Icon: MapPin, text: "123 Healthcare St, Medical City", href: "#" },
  ];

  const certifications = [
    { Icon: Shield, text: "HIPAA Compliant" },
    { Icon: Clock, text: "24/7 Available" },
    { Icon: Award, text: "FDA Approved" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Company Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="mb-6">
              <Image 
                src="/logo.png" 
                alt="AI Doctor" 
                width={160} 
                height={80}
                className="mb-4"
              />
              <p className="text-slate-300 text-sm leading-relaxed">
                Revolutionary AI-powered healthcare platform providing instant medical 
                consultations, expert diagnosis, and personalized treatment plans.
              </p>
            </div>

            {/* Contact Information */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 text-blue-400">Contact Info</h4>
              <div className="space-y-3">
                {contactInfo.map((contact, index) => (
                  <motion.a
                    key={index}
                    href={contact.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                  >
                    <contact.Icon size={16} />
                    <span>{contact.text}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-blue-400">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-all duration-300 ${social.color}`}
                    aria-label={social.name}
                  >
                    <social.Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-6 text-blue-400">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: (sectionIndex * 0.1) + (linkIndex * 0.05) 
                      }}
                      viewport={{ once: true }}
                    >
                      <Link
                        href={link.href}
                        className="text-slate-300 hover:text-white transition-colors duration-300 text-sm flex items-center group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {link.name}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-slate-800 rounded-xl p-8 mb-12"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-3 text-blue-400">
              Stay Updated with Health News
            </h3>
            <p className="text-slate-300 text-sm mb-6">
              Get the latest health insights and AI medical breakthroughs delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-lg bg-slate-700 border border-slate-600 focus:border-blue-500 focus:outline-none text-white placeholder-slate-400 text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors duration-300 text-sm"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-slate-700 pt-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            
            {/* Copyright and Certifications */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <p className="text-slate-400 text-sm">
                © {currentYear} AI Doctor Assistant. All rights reserved.
              </p>
              
              <div className="flex items-center gap-6">
                {certifications.map((cert, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 text-slate-400 text-xs"
                  >
                    <cert.Icon size={14} />
                    <span>{cert.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors duration-300 group"
              aria-label="Back to top"
            >
              <ArrowUp size={18} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}