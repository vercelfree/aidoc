import React from 'react'
import { doctorAgent } from './DoctorAgentCard'
import Image from 'next/image'
import { CheckCircle, Star, Clock, Users } from 'lucide-react'

type props = {
    doctorAgent: doctorAgent,
    setSelectedDoctor: any,
    isSelected?: boolean
}

function SuggestedDoctorCard({ doctorAgent, setSelectedDoctor, isSelected = false }: props) {
  return (
    <div 
      className={`relative flex flex-col items-center justify-center border-2 rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 group ${
        isSelected 
          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl scale-105' 
          : 'border-gray-200 hover:border-blue-300 hover:shadow-xl bg-white'
      }`}
      onClick={() => setSelectedDoctor(doctorAgent)}
    >
      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
          <CheckCircle className="w-5 h-5 text-white" />
        </div>
      )}

      {/* Recommended badge for first card */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          ⭐ Best Match
        </div>
      </div>

      {/* Doctor image with enhanced styling */}
      <div className="relative mb-4 group-hover:scale-110 transition-transform duration-300">
        <div className={`w-20 h-20 rounded-full overflow-hidden border-4 ${
          isSelected ? 'border-blue-400' : 'border-white group-hover:border-blue-200'
        } shadow-lg`}>
          <Image 
            src={doctorAgent.image} 
            alt={doctorAgent.specialist}
            width={80} 
            height={80} 
            className='w-full h-full object-cover'
          />
        </div>
        
        {/* Online status indicator */}
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Doctor info */}
      <div className="text-center space-y-3 flex-1">
        <h2 className={`font-bold text-base leading-tight ${
          isSelected ? 'text-blue-700' : 'text-gray-800 group-hover:text-blue-600'
        } transition-colors duration-200`}>
          {doctorAgent.specialist}
        </h2>
        
        <p className={`text-sm line-clamp-3 ${
          isSelected ? 'text-blue-600' : 'text-gray-600'
        } leading-relaxed`}>
          {doctorAgent.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 pt-2">
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">4.9</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>850+</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>5min</span>
          </div>
        </div>
      </div>

      {/* Selection confirmation */}
      {isSelected && (
        <div className="mt-4 w-full">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center py-2 px-4 rounded-lg text-sm font-semibold shadow-md">
            ✓ Selected Specialist
          </div>
        </div>
      )}

      {/* Hover effect overlay */}
      {!isSelected && (
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      )}

      {/* Expertise tags */}
      <div className="absolute bottom-2 left-2 right-2">
        <div className={`flex justify-center transition-all duration-300 ${
          isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
        }`}>
          <span className="bg-white/90 backdrop-blur-sm text-xs text-gray-600 px-2 py-1 rounded-full border border-gray-200 shadow-sm">
            AI-Powered Analysis
          </span>
        </div>
      </div>
    </div>
  )
}

export default SuggestedDoctorCard