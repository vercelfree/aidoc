"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { Search, Heart, Brain, Shield, Activity, Apple, Droplets, Moon, Sun, Clock, BookOpen, Star, TrendingUp, Filter, ChevronRight, Eye, Zap, Leaf } from 'lucide-react';

const healthTips = [
    {
        id: 1,
        title: "Stay Hydrated Throughout the Day",
        description: "Drinking adequate water helps maintain body temperature, joint lubrication, and nutrient transport.",
        category: "General Health",
        readTime: "3 min",
        difficulty: "Easy",
        rating: 4.9,
        image: "💧",
        tips: [
            "Drink 8-10 glasses of water daily",
            "Start your day with a glass of water",
            "Keep a water bottle nearby",
            "Add lemon or cucumber for flavor"
        ],
        benefits: ["Better skin health", "Improved digestion", "Enhanced energy levels"],
        isPopular: true,
        color: "from-blue-500 to-cyan-500"
    },
    {
        id: 2,
        title: "Get Quality Sleep for Better Health",
        description: "7-9 hours of quality sleep is essential for physical recovery and mental well-being.",
        category: "Sleep & Recovery",
        readTime: "5 min",
        difficulty: "Medium",
        rating: 4.8,
        image: "😴",
        tips: [
            "Maintain consistent sleep schedule",
            "Create a relaxing bedtime routine",
            "Keep bedroom cool and dark",
            "Avoid screens 1 hour before bed"
        ],
        benefits: ["Better memory", "Stronger immunity", "Improved mood"],
        isPopular: true,
        color: "from-indigo-500 to-purple-500"
    },
    {
        id: 3,
        title: "Exercise Regularly for Heart Health",
        description: "Regular physical activity strengthens your heart and improves cardiovascular health.",
        category: "Fitness",
        readTime: "4 min",
        difficulty: "Medium",
        rating: 4.7,
        image: "💪",
        tips: [
            "Aim for 150 minutes moderate exercise weekly",
            "Include both cardio and strength training",
            "Start slowly and gradually increase",
            "Find activities you enjoy"
        ],
        benefits: ["Stronger heart", "Better circulation", "Weight management"],
        isPopular: false,
        color: "from-red-500 to-pink-500"
    },
    {
        id: 4,
        title: "Eat a Balanced Diet Rich in Nutrients",
        description: "A well-balanced diet provides essential nutrients for optimal body function.",
        category: "Nutrition",
        readTime: "6 min",
        difficulty: "Easy",
        rating: 4.9,
        image: "🥗",
        tips: [
            "Include fruits and vegetables in every meal",
            "Choose whole grains over refined",
            "Include lean proteins",
            "Limit processed foods"
        ],
        benefits: ["Better immunity", "Sustained energy", "Healthy weight"],
        isPopular: true,
        color: "from-green-500 to-emerald-500"
    },
    {
        id: 5,
        title: "Practice Stress Management Techniques",
        description: "Managing stress effectively improves both mental and physical health.",
        category: "Mental Health",
        readTime: "7 min",
        difficulty: "Medium",
        rating: 4.8,
        image: "🧘",
        tips: [
            "Practice deep breathing exercises",
            "Try meditation or mindfulness",
            "Maintain work-life balance",
            "Connect with friends and family"
        ],
        benefits: ["Reduced anxiety", "Better focus", "Lower blood pressure"],
        isPopular: true,
        color: "from-purple-500 to-indigo-500"
    },
    {
        id: 6,
        title: "Maintain Good Posture",
        description: "Proper posture prevents back pain and improves overall body alignment.",
        category: "Physical Health",
        readTime: "4 min",
        difficulty: "Easy",
        rating: 4.6,
        image: "🚶",
        tips: [
            "Keep shoulders back and relaxed",
            "Align ears over shoulders",
            "Take regular breaks from sitting",
            "Use ergonomic furniture"
        ],
        benefits: ["Reduced back pain", "Better breathing", "Increased confidence"],
        isPopular: false,
        color: "from-orange-500 to-yellow-500"
    },
    {
        id: 7,
        title: "Protect Your Eyes from Digital Strain",
        description: "Simple habits to reduce eye strain from prolonged screen use.",
        category: "Eye Health",
        readTime: "3 min",
        difficulty: "Easy",
        rating: 4.7,
        image: "👀",
        tips: [
            "Follow the 20-20-20 rule",
            "Adjust screen brightness",
            "Blink frequently",
            "Use artificial tears if needed"
        ],
        benefits: ["Reduced eye fatigue", "Better vision health", "Less headaches"],
        isPopular: false,
        color: "from-teal-500 to-green-500"
    },
    {
        id: 8,
        title: "Boost Your Immune System Naturally",
        description: "Natural ways to strengthen your body's defense system.",
        category: "Immunity",
        readTime: "5 min",
        difficulty: "Easy",
        rating: 4.8,
        image: "🛡️",
        tips: [
            "Eat vitamin C rich foods",
            "Get adequate sleep",
            "Exercise regularly",
            "Manage stress levels"
        ],
        benefits: ["Fewer illnesses", "Faster recovery", "Better overall health"],
        isPopular: true,
        color: "from-cyan-500 to-blue-500"
    }
];

const categories = [
    { name: "All", icon: Star, count: healthTips.length },
    { name: "General Health", icon: Heart, count: healthTips.filter(tip => tip.category === "General Health").length },
    { name: "Nutrition", icon: Apple, count: healthTips.filter(tip => tip.category === "Nutrition").length },
    { name: "Fitness", icon: Activity, count: healthTips.filter(tip => tip.category === "Fitness").length },
    { name: "Mental Health", icon: Brain, count: healthTips.filter(tip => tip.category === "Mental Health").length },
    { name: "Sleep & Recovery", icon: Moon, count: healthTips.filter(tip => tip.category === "Sleep & Recovery").length },
    { name: "Physical Health", icon: Shield, count: healthTips.filter(tip => tip.category === "Physical Health").length }
];

export default function HealthTipsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredTips, setFilteredTips] = useState(healthTips);
    const [animatedCards, setAnimatedCards] = useState<number[]>([]);
    const [selectedTip, setSelectedTip] = useState<any>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedCards(healthTips.map((_, index) => index));
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        let filtered = healthTips;

        if (searchTerm) {
            filtered = filtered.filter(tip => 
                tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tip.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tip.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tip.tips.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(tip => tip.category === selectedCategory);
        }

        setFilteredTips(filtered);
    }, [searchTerm, selectedCategory]);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-100 text-green-800';
            case 'Medium': return 'bg-yellow-100 text-yellow-800';
            case 'Hard': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
            {/* Decorative borders */}
            <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80 z-10">
                <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-emerald-500 to-transparent" />
            </div>
            <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80 z-10">
                <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-emerald-500 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80 z-10">
                <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
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
                                className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 rounded-full px-6 py-2 mb-8"
                            >
                                <Leaf className="h-4 w-4 text-emerald-600" />
                                <span className="text-sm font-medium text-emerald-800">Expert Health Guidance</span>
                            </motion.div>
                            
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight"
                            >
                                Daily Health
                                <span className="text-emerald-600"> Tips & Insights</span>
                            </motion.h1>
                            
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed"
                            >
                                Discover evidence-based health tips to improve your well-being. From nutrition to fitness, mental health to sleep - we've got you covered.
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
                                    placeholder="Search health tips, categories, or keywords..."
                                    className="w-full pl-12 pr-4 py-4 text-lg border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-lg transition-all duration-300"
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
                                    { icon: BookOpen, label: "Health Articles", value: "50+" },
                                    { icon: TrendingUp, label: "Success Rate", value: "95%" },
                                    { icon: Eye, label: "Daily Readers", value: "10K+" }
                                ].map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full mb-3 shadow-lg border border-slate-100">
                                            <stat.icon className="h-6 w-6 text-emerald-600" />
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
                                    key={category.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: 0.1 * index }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedCategory(category.name)}
                                    className={`group flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                                        selectedCategory === category.name
                                            ? 'bg-emerald-600 text-white shadow-lg'
                                            : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-sm'
                                    }`}
                                >
                                    <category.icon className="h-4 w-4" />
                                    <span>{category.name}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                        selectedCategory === category.name 
                                            ? 'bg-white/20 text-white' 
                                            : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                                    }`}>
                                        {category.count}
                                    </span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Health Tips Grid */}
                <section className="px-6 pb-20">
                    <div className="max-w-7xl mx-auto">
                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            {filteredTips.map((tip, index) => (
                                <motion.div
                                    key={tip.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ 
                                        opacity: animatedCards.includes(index) ? 1 : 0, 
                                        y: animatedCards.includes(index) ? 0 : 20 
                                    }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                    className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer relative overflow-hidden"
                                    onClick={() => setSelectedTip(tip)}
                                >
                                    {/* Background gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-r ${tip.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`} />
                                    
                                    {/* Popular badge */}
                                    {tip.isPopular && (
                                        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg flex items-center space-x-1">
                                            <Star className="h-3 w-3" />
                                            <span>Popular</span>
                                        </div>
                                    )}

                                    {/* Icon */}
                                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                        {tip.image}
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors leading-tight">
                                            {tip.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                            {tip.description}
                                        </p>
                                        
                                        {/* Category and difficulty */}
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100">
                                                {tip.category}
                                            </span>
                                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${getDifficultyColor(tip.difficulty)}`}>
                                                {tip.difficulty}
                                            </span>
                                        </div>

                                        {/* Stats */}
                                        <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                                            <div className="flex items-center space-x-1">
                                                <Clock className="h-4 w-4" />
                                                <span>{tip.readTime}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                <span className="font-medium text-slate-700">{tip.rating}</span>
                                            </div>
                                        </div>

                                        {/* Quick tips preview */}
                                        <div className="space-y-2 mb-6">
                                            {tip.tips.slice(0, 2).map((quickTip, idx) => (
                                                <div key={idx} className="flex items-start space-x-2 text-sm">
                                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                                                    <span className="text-slate-600">{quickTip}</span>
                                                </div>
                                            ))}
                                            {tip.tips.length > 2 && (
                                                <div className="text-xs text-emerald-600 font-medium">
                                                    +{tip.tips.length - 2} more tips
                                                </div>
                                            )}
                                        </div>

                                        {/* Read more button */}
                                        <button className="w-full bg-slate-900 hover:bg-emerald-600 text-white py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 transform group-hover:scale-105">
                                            <BookOpen className="h-4 w-4" />
                                            <span>Read Full Guide</span>
                                            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {filteredTips.length === 0 && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="text-center py-20"
                            >
                                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="h-12 w-12 text-slate-400" />
                                </div>
                                <h3 className="text-xl font-medium text-slate-900 mb-2">No health tips found</h3>
                                <p className="text-slate-600">Try adjusting your search or category filters</p>
                            </motion.div>
                        )}
                    </div>
                </section>
            </main>

            {/* Detailed Modal */}
            <AnimatePresence>
                {selectedTip && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedTip(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center space-x-4">
                                    <div className="text-4xl">{selectedTip.image}</div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900">{selectedTip.title}</h2>
                                        <div className="flex items-center space-x-4 mt-2">
                                            <span className="text-sm text-emerald-600 font-medium">{selectedTip.category}</span>
                                            <span className="text-sm text-slate-500">•</span>
                                            <span className="text-sm text-slate-500">{selectedTip.readTime}</span>
                                            <span className="text-sm text-slate-500">•</span>
                                            <div className="flex items-center space-x-1">
                                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                <span className="text-sm font-medium">{selectedTip.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedTip(null)}
                                    className="text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            <p className="text-slate-600 mb-8 text-lg leading-relaxed">{selectedTip.description}</p>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
                                        <Zap className="h-5 w-5 text-emerald-600" />
                                        <span>Action Steps</span>
                                    </h3>
                                    <div className="space-y-3">
                                        {selectedTip.tips.map((tip: string, index: number) => (
                                            <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-xl">
                                                <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                                    {index + 1}
                                                </div>
                                                <span className="text-slate-700">{tip}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center space-x-2">
                                        <Heart className="h-5 w-5 text-emerald-600" />
                                        <span>Health Benefits</span>
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        {selectedTip.benefits.map((benefit: string, index: number) => (
                                            <div key={index} className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center">
                                                <span className="text-emerald-800 font-medium">{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}