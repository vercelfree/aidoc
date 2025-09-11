"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AddNewSessionDialog from "./AddNewSessionDialog";
import axios from "axios";
import HistoryTable from "./HistoryTable";
import { FileText, Clock, Stethoscope, TrendingUp } from "lucide-react";

function HistoryList() {
  const [historyList, setHistoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    GetHistoryList();
  }, []);

  const GetHistoryList = async () => {
    try {
      setIsLoading(true);
      const result = await axios.get("/api/session-chat?sessionId=all");
      console.log(result.data);
      setHistoryList(result.data);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded-lg w-1/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {historyList.length == 0 ? (
        <div className="p-12">
          <div className="flex items-center flex-col justify-center text-center space-y-6">
            {/* Animated medical illustration */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-full border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={"/medical-assistance.png"}
                  alt="Medical consultation illustration"
                  width={120}
                  height={120}
                  className="drop-shadow-lg"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Start Your Medical Journey
              </h2>
              <p className="text-gray-600 max-w-md leading-relaxed">
                Connect with AI-powered medical specialists for instant consultations and personalized healthcare guidance
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 mb-8">
              {[
                { icon: Stethoscope, title: "AI Specialists", desc: "Expert diagnosis" },
                { icon: Clock, title: "24/7 Available", desc: "Instant access" },
                { icon: FileText, title: "Detailed Reports", desc: "Comprehensive analysis" },
                { icon: TrendingUp, title: "Track Progress", desc: "Health monitoring" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300 hover:scale-105 group"
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg group-hover:scale-110 transition-transform duration-200">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-gray-800">{feature.title}</h3>
                      <p className="text-xs text-gray-600">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="transform hover:scale-105 transition-all duration-200">
              <AddNewSessionDialog />
            </div>

            <p className="text-xs text-gray-500 max-w-sm">
              Get started with your first AI medical consultation. Our specialists are ready to help with your health concerns.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                Consultation History
              </h2>
              <p className="text-gray-600">
                Review your past medical consultations and reports
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <FileText className="w-4 h-4" />
              <span>{historyList.length} consultation{historyList.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
          
          <div className="transform transition-all duration-500">
            <HistoryTable historyList={historyList} />
          </div>
        </div>
      )}
    </div>
  );
}

export default HistoryList;