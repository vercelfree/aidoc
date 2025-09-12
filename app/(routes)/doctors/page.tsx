"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Search, Star, Clock, Users, ChevronRight, Sparkles, Heart, Brain, Shield, Award, ArrowRight, Stethoscope, User, Calendar, MessageCircle } from 'lucide-react';

const AIDoctorAgents = [
    {
        id: 1,
        specialist: "General Physician",
        description: "Helps with everyday health concerns and common symptoms.",
        image: "/doctor1.png",
        agentPrompt: "You are a friendly General Physician AI. Greet the user and quickly ask what symptoms they're experiencing. Keep responses short and helpful.",
        voiceId: "orion",
        subscriptionRequired: false,
        rating: 4.9,
        consultations: "15.2k+",
        responseTime: "< 30 sec",
        specialties: ["Fever", "Headache", "General Checkup"],
        availability: "24/7"
    },
    {
        id: 2,
        specialist: "Pediatrician",
        description: "Expert in children's health, from babies to teens.",
        image: "/doctor2.png",
        agentPrompt: "You are a kind Pediatrician AI. Ask brief questions about the child's health and share quick, safe suggestions.",
        voiceId: "orion",
        subscriptionRequired: true,
        rating: 4.8,
        consultations: "8.7k+",
        responseTime: "< 45 sec",
        specialties: ["Child Care", "Vaccination", "Growth Issues"],
        availability: "24/7"
    },
    {
        id: 3,
        specialist: "Dermatologist",
        description: "Handles skin issues like rashes, acne, or infections.",
        image: "/doctor3.png",
        agentPrompt: "You are a knowledgeable Dermatologist AI. Ask short questions about the skin issue and give simple, clear advice.",
        voiceId: "orion",
        subscriptionRequired: true,
        rating: 4.7,
        consultations: "12.1k+",
        responseTime: "< 1 min",
        specialties: ["Acne", "Skin Rash", "Hair Loss"],
        availability: "24/7"
    },
    {
        id: 4,
        specialist: "Psychologist",
        description: "Supports mental health and emotional well-being.",
        image: "/doctor4.png",
        agentPrompt: "You are a caring Psychologist AI. Ask how the user is feeling emotionally and give short, supportive tips.",
        voiceId: "asteria",
        subscriptionRequired: true,
        rating: 4.9,
        consultations: "9.3k+",
        responseTime: "< 1 min",
        specialties: ["Anxiety", "Depression", "Stress Management"],
        availability: "24/7"
    },
    {
        id: 5,
        specialist: "Nutritionist",
        description: "Provides advice on healthy eating and weight management.",
        image: "/doctor5.png",
        agentPrompt: "You are a motivating Nutritionist AI. Ask about current diet or goals and suggest quick, healthy tips.",
        voiceId: "asteria",
        subscriptionRequired: true,
        rating: 4.6,
        consultations: "6.8k+",
        responseTime: "< 45 sec",
        specialties: ["Diet Plans", "Weight Loss", "Nutrition"],
        availability: "24/7"
    },
    {
        id: 6,
        specialist: "Cardiologist",
        description: "Focuses on heart health and blood pressure issues.",
        image: "/doctor6.png",
        agentPrompt: "You are a calm Cardiologist AI. Ask about heart symptoms and offer brief, helpful advice.",
        voiceId: "asteria",
        subscriptionRequired: true,
        rating: 4.8,
        consultations: "11.4k+",
        responseTime: "< 1 min",
        specialties: ["Heart Disease", "Blood Pressure", "Chest Pain"],
        availability: "24/7"
    },
    {
        id: 7,
        specialist: "ENT Specialist",
        description: "Handles ear, nose, and throat-related problems.",
        image: "/doctor7.png",
        agentPrompt: "You are a friendly ENT AI. Ask quickly about ENT symptoms and give simple, clear suggestions.",
        voiceId: "asteria",
        subscriptionRequired: true,
        rating: 4.7,
        consultations: "7.9k+",
        responseTime: "< 45 sec",
        specialties: ["Hearing Loss", "Sore Throat", "Sinus Issues"],
        availability: "24/7"
    },
    {
        id: 8,
        specialist: "Orthopedic",
        description: "Helps with bone, joint, and muscle pain.",
        image: "/doctor8.png",
        agentPrompt: "You are an understanding Orthopedic AI. Ask where the pain is and give short, supportive advice.",
        voiceId: "luna",
        subscriptionRequired: true,
        rating: 4.8,
        consultations: "10.2k+",
        responseTime: "< 1 min",
        specialties: ["Joint Pain", "Back Pain", "Sports Injury"],
        availability: "24/7"
    },
    {
        id: 9,
        specialist: "Gynecologist",
        description: "Cares for women's reproductive and hormonal health.",
        image: "/doctor9.png",
        agentPrompt: "You are a respectful Gynecologist AI. Ask brief, gentle questions and keep answers short and reassuring.",
        voiceId: "orion",
        subscriptionRequired: true,
        rating: 4.9,
        consultations: "13.6k+",
        responseTime: "< 1 min",
        specialties: ["Women's Health", "Pregnancy", "Hormonal Issues"],
        availability: "24/7"
    },
    {
        id: 10,
        specialist: "Dentist",
        description: "Handles oral hygiene and dental problems.",
        image: "/doctor10.png",
        agentPrompt: "You are a cheerful Dentist AI. Ask about the dental issue and give quick, calming suggestions.",
        voiceId: "orion",
        subscriptionRequired: true,
        rating: 4.7,
        consultations: "5.4k+",
        responseTime: "< 30 sec",
        specialties: ["Tooth Pain", "Oral Hygiene", "Gum Disease"],
        availability: "24/7"
    }
];

export default function DoctorsPage() {
    const { user } = useUser();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredDoctors, setFilteredDoctors] = useState(AIDoctorAgents);
    const [animatedCards, setAnimatedCards] = useState<number[]>([]);

    const categories = ['All', 'Free', 'Premium', 'Mental Health', 'Physical Health'];

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedCards(AIDoctorAgents.map((_, index) => index));
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        let filtered = AIDoctorAgents;

        if (searchTerm) {
            filtered = filtered.filter(doctor => 
                doctor.specialist.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doctor.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doctor.specialties.some(specialty => 
                    specialty.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        if (selectedCategory !== 'All') {
            switch (selectedCategory) {
                case 'Free':
                    filtered = filtered.filter(doctor => !doctor.subscriptionRequired);
                    break;
                case 'Premium':
                    filtered = filtered.filter(doctor => doctor.subscriptionRequired);
                    break;
                case 'Mental Health':
                    filtered = filtered.filter(doctor => 
                        ['Psychologist', 'Psychiatrist'].includes(doctor.specialist)
                    );
                    break;
                case 'Physical Health':
                    filtered = filtered.filter(doctor => 
                        !['Psychologist', 'Psychiatrist'].includes(doctor.specialist)
                    );
                    break;
            }
        }

        setFilteredDoctors(filtered);
    }, [searchTerm, selectedCategory]);

    const handleDoctorSelect = (doctorId: number) => {
        if (!user) {
            // Redirect to sign-in page
            window.location.href = '/sign-in';
        } else {
            // Navigate to dashboard/chat with selected doctor
            window.location.href = `/dashboard`;
        }
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
            {/* Decorative borders (matching your home page) */}
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
                                <Sparkles className="h-4 w-4 text-blue-600" />
                                <span className="text-sm font-medium text-blue-800">AI-Powered Healthcare Specialists</span>
                            </motion.div>
                            
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight"
                            >
                                Choose Your
                                <span className="text-blue-600"> AI Doctor</span>
                            </motion.h1>
                            
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed"
                            >
                                Get instant medical advice from specialized AI doctors. Available 24/7 with personalized treatment plans and automated health reports.
                            </motion.p>

                            {/* Search Bar */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                className="relative max-w-2xl mx-auto mb-12"
                            >
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by symptoms, specialty, or health concern..."
                                    className="w-full pl-12 pr-4 py-4 text-lg border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-lg transition-all duration-300"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </motion.div>

                            {/* Stats */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
                            >
                                {[
                                    { icon: Users, label: "Active Users", value: "50K+" },
                                    { icon: Clock, label: "Avg Response", value: "< 10 sec" },
                                    { icon: Award, label: "Success Rate", value: "98%" }
                                ].map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full mb-3 shadow-lg border border-slate-100">
                                            <stat.icon className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                                        <div className="text-slate-600">{stat.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </section>

                {/* Categories */}
                <section className="px-6 mb-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="max-w-7xl mx-auto"
                    >
                        <div className="flex flex-wrap gap-3 justify-center">
                            {categories.map((category, index) => (
                                <motion.button
                                    key={category}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: 0.1 * index }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                                        selectedCategory === category
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-sm'
                                    }`}
                                >
                                    {category}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Doctor Grid */}
                <section className="px-6 pb-20">
                    <div className="max-w-7xl mx-auto">
                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            {filteredDoctors.map((doctor, index) => (
                                <motion.div
                                    key={doctor.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ 
                                        opacity: animatedCards.includes(index) ? 1 : 0, 
                                        y: animatedCards.includes(index) ? 0 : 20 
                                    }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                    className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer relative overflow-hidden"
                                    onClick={() => handleDoctorSelect(doctor.id)}
                                >
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                                    
                                    {/* Doctor Image */}
                                    <div className="relative mb-6">
                                        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-slate-100 shadow-lg group-hover:shadow-xl transition-all duration-300">
                                            <Image
                                                src={doctor.image}
                                                alt={doctor.specialist}
                                                width={80}
                                                height={80}
                                                className="w-full h-full object-cover"
                                                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                                    // Fallback to initials if image fails
                                                    const target = e.target as HTMLImageElement;
                                                    const nextSibling = target.nextSibling as HTMLElement;
                                                    target.style.display = 'none';
                                                    if (nextSibling) {
                                                        nextSibling.style.display = 'flex';
                                                    }
                                                }}
                                            />
                                            {/* Fallback initials */}
                                            <div className="hidden w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl font-bold items-center justify-center">
                                                {doctor.specialist.split(' ').map(word => word[0]).join('').slice(0, 2)}
                                            </div>
                                        </div>
                                        
                                        {!doctor.subscriptionRequired && (
                                            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
                                                FREE
                                            </div>
                                        )}
                                        {doctor.subscriptionRequired && (
                                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg">
                                                PRO
                                            </div>
                                        )}
                                    </div>

                                    {/* Doctor Info */}
                                    <div className="text-center mb-4 relative z-10">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                            {doctor.specialist}
                                        </h3>
                                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                            {doctor.description}
                                        </p>
                                        
                                        {/* Specialties */}
                                        <div className="flex flex-wrap gap-1 justify-center mb-4">
                                            {doctor.specialties.slice(0, 2).map((specialty, idx) => (
                                                <span key={idx} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full border border-blue-100">
                                                    {specialty}
                                                </span>
                                            ))}
                                            {doctor.specialties.length > 2 && (
                                                <span className="text-xs text-slate-400">+{doctor.specialties.length - 2}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="space-y-2 mb-6 relative z-10">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center space-x-1">
                                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                <span className="font-medium">{doctor.rating}</span>
                                            </div>
                                            <span className="text-slate-500">{doctor.consultations}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center space-x-1">
                                                <Clock className="h-4 w-4 text-green-500" />
                                                <span className="text-slate-600">{doctor.responseTime}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Calendar className="h-4 w-4 text-blue-500" />
                                                <span className="text-slate-600">{doctor.availability}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button className="w-full bg-slate-900 hover:bg-blue-600 text-white py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 transform group-hover:scale-105 relative z-10">
                                        <MessageCircle className="h-4 w-4" />
                                        <span>Consult Now</span>
                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>
                            ))}
                        </motion.div>

                        {filteredDoctors.length === 0 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-center py-20"
                            >
                                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="h-12 w-12 text-slate-400" />
                                </div>
                                <h3 className="text-xl font-medium text-slate-900 mb-2">No doctors found</h3>
                                <p className="text-slate-600">Try adjusting your search or category filters</p>
                            </motion.div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}