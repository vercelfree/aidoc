"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, CheckCircle, Users, Globe, Shield, Zap, Heart, Star, ArrowRight, Headphones, Calendar, Video } from 'lucide-react';

const contactMethods = [
    {
        id: 1,
        title: "Live Chat Support",
        description: "Get instant help from our AI assistants and support team",
        icon: MessageCircle,
        action: "Start Chat",
        availability: "24/7 Available",
        responseTime: "< 30 seconds",
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-50",
        iconColor: "text-blue-600",
        popular: true
    },
    {
        id: 2,
        title: "Video Consultation",
        description: "Schedule a video call with our healthcare experts",
        icon: Video,
        action: "Book Call",
        availability: "Sat-Thu 9AM-6PM",
        responseTime: "Same day",
        color: "from-purple-500 to-indigo-500",
        bgColor: "bg-purple-50",
        iconColor: "text-purple-600",
        popular: false
    },
    {
        id: 3,
        title: "Phone Support",
        description: "Speak directly with our customer care team",
        icon: Phone,
        action: "Call Now",
        availability: "24/7 Available",
        responseTime: "Immediate",
        color: "from-green-500 to-emerald-500",
        bgColor: "bg-green-50",
        iconColor: "text-green-600",
        popular: false
    },
    {
        id: 4,
        title: "Email Support",
        description: "Send us detailed queries and get comprehensive responses",
        icon: Mail,
        action: "Send Email",
        availability: "Always Open",
        responseTime: "< 2 hours",
        color: "from-orange-500 to-red-500",
        bgColor: "bg-orange-50",
        iconColor: "text-orange-600",
        popular: false
    }
];

const officeLocations = [
    {
        id: 1,
        city: "Dhaka",
        address: "123 Gulshan Avenue, Gulshan-1, Dhaka 1212",
        phone: "+880 2 9876543",
        hours: "Sat-Thu: 9AM-6PM",
        type: "Headquarters"
    },
    {
        id: 2,
        city: "Chittagong",
        address: "456 Agrabad Commercial Area, Chittagong 4100",
        phone: "+880 31 234567",
        hours: "Sat-Thu: 8AM-5PM",
        type: "Regional Office"
    },
    {
        id: 3,
        city: "Sylhet",
        address: "789 Zindabazar, Sylhet 3100",
        phone: "+880 821 123456",
        hours: "Sat-Thu: 9AM-5PM",
        type: "Branch Office"
    }
];

const faqs = [
    {
        id: 1,
        question: "How quickly can I get medical advice?",
        answer: "Our AI doctors are available 24/7 and typically respond within 30 seconds. For specialized consultations, you can book appointments that are usually available within the same day."
    },
    {
        id: 2,
        question: "Is my health data secure and private?",
        answer: "Absolutely. We use end-to-end encryption and comply with international healthcare data protection standards. Your health information is never shared without your explicit consent and is stored securely."
    },
    {
        id: 3,
        question: "What types of medical conditions can you help with?",
        answer: "Our AI doctors cover a wide range of specialties including general medicine, pediatrics, dermatology, mental health, cardiology, and more. For serious emergencies, we'll direct you to appropriate emergency services."
    },
    {
        id: 4,
        question: "What are your payment options?",
        answer: "We accept various payment methods including bKash, Nagad, Rocket, bank transfers, and major credit/debit cards. We offer flexible pricing plans to make healthcare accessible to everyone."
    }
];

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [animatedElements, setAnimatedElements] = useState<number[]>([]);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedElements([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form after showing success message
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '', category: 'general' });
        }, 3000);
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
            {/* Decorative borders */}
            <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80 z-10">
                <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
            </div>
            <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80 z-10">
                <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80 z-10">
                <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </div>

            {/* Main Content */}
            <main className="py-8">
                {/* Hero Section */}
                <section className="relative py-20 px-6 overflow-hidden">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-7xl mx-auto"
                    >
                        <div className="text-center mb-16">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-6 py-2 mb-8"
                            >
                                <Headphones className="h-4 w-4 text-blue-600" />
                                <span className="text-sm font-medium text-blue-800">24/7 Support Available</span>
                            </motion.div>
                            
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight"
                            >
                                Get in
                                <span className="text-blue-600"> Touch</span>
                            </motion.h1>
                            
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed"
                            >
                                Have questions about our AI healthcare services? Need technical support? Want to partner with us? We're here to help you every step of the way.
                            </motion.p>

                            {/* Contact Stats */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
                            >
                                {[
                                    { icon: Users, label: "Happy Customers", value: "10K+" },
                                    { icon: Clock, label: "Avg Response", value: "< 2 min" },
                                    { icon: Star, label: "Satisfaction", value: "4.9/5" },
                                    { icon: Globe, label: "Cities Covered", value: "8+" }
                                ].map((stat, index) => (
                                    <motion.div 
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: animatedElements.includes(index) ? 1 : 0, y: animatedElements.includes(index) ? 0 : 20 }}
                                        transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                                        className="text-center"
                                    >
                                        <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full mb-3 shadow-lg border border-slate-100">
                                            <stat.icon className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                                        <div className="text-slate-600">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </section>

                {/* Contact Methods */}
                <section className="px-6 mb-20">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Choose Your Preferred Way to Connect</h2>
                            <p className="text-slate-600 text-lg">We offer multiple channels to ensure you get the help you need, when you need it.</p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {contactMethods.map((method, index) => (
                                <motion.div
                                    key={method.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ 
                                        opacity: animatedElements.includes(index + 4) ? 1 : 0, 
                                        y: animatedElements.includes(index + 4) ? 0 : 20 
                                    }}
                                    transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                    className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer relative overflow-hidden"
                                >
                                    {/* Background gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-r ${method.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`} />
                                    
                                    {/* Popular badge */}
                                    {method.popular && (
                                        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
                                            Popular
                                        </div>
                                    )}

                                    {/* Icon */}
                                    <div className={`w-16 h-16 ${method.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <method.icon className={`h-8 w-8 ${method.iconColor}`} />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                            {method.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                            {method.description}
                                        </p>
                                        
                                        {/* Stats */}
                                        <div className="space-y-2 mb-6">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-500">Availability:</span>
                                                <span className="font-medium text-slate-700">{method.availability}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-500">Response:</span>
                                                <span className="font-medium text-slate-700">{method.responseTime}</span>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <button className="w-full bg-slate-900 hover:bg-blue-600 text-white py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 transform group-hover:scale-105">
                                            <span>{method.action}</span>
                                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Form & Info */}
                <section className="px-6 mb-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 1.2 }}
                                className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200"
                            >
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Send us a Message</h2>
                                    <p className="text-slate-600">Fill out the form below and we'll get back to you as soon as possible.</p>
                                </div>

                                <AnimatePresence mode="wait">
                                    {isSubmitted ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="text-center py-12"
                                        >
                                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <CheckCircle className="h-8 w-8 text-green-600" />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                                            <p className="text-slate-600">Thank you for reaching out. We'll respond within 2 hours.</p>
                                        </motion.div>
                                    ) : (
                                        <motion.form
                                            initial={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onSubmit={handleSubmit}
                                            className="space-y-6"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                                        placeholder="Your full name"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                                        placeholder="your@email.com"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                                                <select
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                                >
                                                    <option value="general">General Inquiry</option>
                                                    <option value="support">Technical Support</option>
                                                    <option value="billing">Billing Question</option>
                                                    <option value="partnership">Partnership</option>
                                                    <option value="feedback">Feedback</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                                    placeholder="Brief subject of your message"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleInputChange}
                                                    required
                                                    rows={5}
                                                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                                                    placeholder="Tell us how we can help you..."
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                                            >
                                                {isSubmitting ? (
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                ) : (
                                                    <>
                                                        <Send className="h-5 w-5" />
                                                        <span>Send Message</span>
                                                    </>
                                                )}
                                            </button>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {/* Contact Information */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 1.4 }}
                                className="space-y-8"
                            >
                                {/* Office Locations */}
                                <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
                                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
                                        <MapPin className="h-5 w-5 text-blue-600" />
                                        <span>Our Offices</span>
                                    </h3>
                                    <div className="space-y-6">
                                        {officeLocations.map((office, index) => (
                                            <div key={office.id} className="border-b border-slate-100 last:border-b-0 pb-6 last:pb-0">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h4 className="font-semibold text-slate-900">{office.city}</h4>
                                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                        {office.type}
                                                    </span>
                                                </div>
                                                <p className="text-slate-600 text-sm mb-1">{office.address}</p>
                                                <p className="text-slate-600 text-sm mb-1">{office.phone}</p>
                                                <p className="text-slate-500 text-sm">{office.hours}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Contact */}
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
                                    <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                                        <Zap className="h-5 w-5" />
                                        <span>Need Immediate Help?</span>
                                    </h3>
                                    <p className="mb-6 opacity-90">For urgent medical concerns or technical emergencies</p>
                                    <div className="space-y-4">
                                        <a href="tel:+88016XXXXXXX" className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
                                            <Phone className="h-5 w-5" />
                                            <div>
                                                <div className="font-medium">Emergency Hotline</div>
                                                <div className="text-sm opacity-90">+880 1612345678</div>
                                            </div>
                                        </a>
                                        <a href="mailto:support@aihealth.bd" className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
                                            <Mail className="h-5 w-5" />
                                            <div>
                                                <div className="font-medium">Priority Email</div>
                                                <div className="text-sm opacity-90">support@aihealth.bd</div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="px-6 pb-20 mt-10">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.6 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
                            <p className="text-slate-600 text-lg">Quick answers to common questions about our services</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.8 }}
                            className="space-y-4"
                        >
                            {faqs.map((faq, index) => (
                                <div key={faq.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                    <button
                                        onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors duration-200"
                                    >
                                        <span className="font-medium text-slate-900">{faq.question}</span>
                                        <motion.div
                                            animate={{ rotate: openFaq === faq.id ? 45 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ArrowRight className="h-5 w-5 text-slate-400" />
                                        </motion.div>
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === faq.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-6 pb-4 text-slate-600 leading-relaxed">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            </main>
        </div>
    );
}