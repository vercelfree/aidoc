import { AIDoctorAgents } from "@/shared/list";
import React from "react";
import DoctorAgentCard from "./DoctorAgentCard";
import { Stethoscope, Users, Star, ArrowRight } from "lucide-react";

function DoctorAgentList() {
  const specialties = [
    ...new Set(AIDoctorAgents.map((doctor) => doctor.specialist)),
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 border-2 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white rounded-full"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                  <Stethoscope className="w-8 text-green-600 h-8" />
                </div>
                <h2 className="text-3xl font-bold">AI Medical Specialists</h2>
              </div>
              <p className="text-blue-100 text-lg">
                Connect with specialized AI doctors for expert medical
                consultations
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-blue-200" />
                <div>
                  <p className="text-2xl text-gray-800 font-bold">
                    {AIDoctorAgents.length}+
                  </p>
                  <p className="text-gray-500 text-sm">AI Doctors</p>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
              <div className="flex items-center space-x-3">
                <Star className="w-6 h-6 text-yellow-300" />
                <div>
                  <p className="text-2xl text-gray-800 font-bold">
                    {specialties.length}
                  </p>
                  <p className="text-gray-500 text-sm">Specialties</p>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
              <div className="flex items-center space-x-3">
                <ArrowRight className="w-6 h-6 text-green-300" />
                <div>
                  <p className="text-2xl text-gray-800 font-bold">24/7</p>
                  <p className="text-gray-500 text-sm">Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Specialty filter tags */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Available Specialties
          </h3>
          <div className="flex flex-wrap gap-2">
            {specialties.slice(0, 8).map((specialty, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200 hover:shadow-sm transition-all duration-200"
              >
                {specialty}
              </span>
            ))}
            {specialties.length > 8 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                +{specialties.length - 8} more
              </span>
            )}
          </div>
        </div>

        {/* Doctor grid with staggered animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {AIDoctorAgents.map((doctor, index) => (
            <div
              key={index}
              className="transform transition-all duration-500 hover:scale-105"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              <DoctorAgentCard doctorAgent={doctor} />
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800">
                AI-Powered Accuracy
              </h4>
              <p className="text-sm text-gray-600">
                Advanced algorithms for precise medical analysis
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800">Secure & Private</h4>
              <p className="text-sm text-gray-600">
                Your medical data is protected with encryption
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800">Instant Results</h4>
              <p className="text-sm text-gray-600">
                Get medical insights in seconds, not hours
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default DoctorAgentList;
