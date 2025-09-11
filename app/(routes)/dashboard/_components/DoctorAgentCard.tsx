"use client";
import React, { useState } from "react";
import { Button } from '@/components/ui/button';
import { IconArrowRight } from '@tabler/icons-react';
import axios, { AxiosError } from 'axios';
import { Loader2Icon, Star, Users, Clock } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from "next/navigation";

export type doctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
  voiceId?: string;
};

type props = {
  doctorAgent: doctorAgent;
};

function DoctorAgentCard({ doctorAgent }: props) {
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const onStartConsultation = async () => {
    setLoading(true);
    try {
      const result = await axios.post('/api/session-chat', {
        notes: "New Query",
        selectedDoctor: doctorAgent,
      });

      console.log("Session creation result:", result.data);

      if (result.data?.sessionId) {
        console.log("Session created successfully with ID:", result.data.sessionId);
        router.push('/dashboard/medical-agent/' + result.data.sessionId);
      } else {
        console.error("No session ID returned");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Error starting consultation:", error);
        if (error.response?.data) {
          console.error("Error details:", error.response.data);
        }
      } else {
        console.error("Unknown error:", error);
      }
    }
    setLoading(false);
  };

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
      
      {/* Doctor image with overlay effects */}
      <div className="relative overflow-hidden">
        <Image 
          src={doctorAgent.image} 
          alt={doctorAgent.specialist} 
          width={300} 
          height={250} 
          className='w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-110' 
        />
        
        {/* Status badge */}
        <div className="absolute top-4 right-4 flex items-center space-x-1 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span>Available</span>
        </div>

        {/* Rating overlay */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span>4.9</span>
        </div>
      </div>

      {/* Content section */}
      <div className="p-6 relative z-20">
        <div className="space-y-3">
          {/* Specialist name with gradient */}
          <h2 className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
            {doctorAgent.specialist}
          </h2>
          
          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
            {doctorAgent.description}
          </p>
          
          {/* Stats section */}
          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span>1.2k patients</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>~5 min</span>
            </div>
          </div>
        </div>

        {/* Action button */}
        <Button 
          className={`w-full mt-4 rounded-xl font-semibold transition-all duration-300 ${
            isHovered 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl' 
              : 'bg-gray-800 hover:bg-gray-900'
          }`}
          onClick={onStartConsultation}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <Loader2Icon className='animate-spin w-4 h-4' />
              <span>Starting...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <span>Start Consultation</span>
              <IconArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          )}
        </Button>

        {/* Hover features */}
        <div className={`mt-3 space-y-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <div className="flex items-center justify-between text-xs">
            <span className="text-green-600 font-medium">✓ AI-Powered Diagnosis</span>
            <span className="text-blue-600 font-medium">✓ Instant Reports</span>
          </div>
        </div>
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-30">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-gray-700">Preparing consultation...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorAgentCard;