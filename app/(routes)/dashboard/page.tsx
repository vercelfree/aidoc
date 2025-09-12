"use client";

import React, { useEffect, useState } from "react";
import HistoryList from "./_components/HistoryList";
import { Button } from "@/components/ui/button";
import DoctorAgentList from "./_components/DoctorAgentList";
import AddNewSessionDialog from "./_components/AddNewSessionDialog";
import axios from "axios";
import { AlertCircle, Mail, Activity, Users, Calendar, TrendingUp } from "lucide-react";

// Define types based on your HistoryTable structure
type Report = {
  agent: string;
  chiefComplaint: string;
  duration: string;
  medicationsMentioned: string[];
  recommendations: string[];
  sessionId: string;
  severity: string;
  summary: string;
  symptoms: string[];
  timestamp: string;
  user: string;
};

type DoctorAgent = {
  specialist: string;
};

type SessionDetail = {
  id: number;
  notes: string;
  sessionId: string;
  report: Report | string | null;
  selectedDoctor: DoctorAgent;
  createdOn: string;
};

function Dashboard() {
  const [reportCount, setReportCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [totalSessions, setTotalSessions] = useState(0);
  const MAX_REPORTS = 15;

  useEffect(() => {
    checkReportCount();
  }, []);

  const checkReportCount = async () => {
    try {
      const result = await axios.get("/api/session-chat?sessionId=all");
      const sessions: SessionDetail[] = result.data || [];
      
      console.log("All sessions:", sessions);
      setTotalSessions(sessions.length);
      
      // Count sessions that have reports generated
      const completedReports = sessions.filter((session: SessionDetail) => {
        if (!session.report) return false;
        
        if (typeof session.report === 'string') {
          return session.report.trim() !== "";
        }
        
        if (typeof session.report === 'object') {
          return true;
        }
        
        return false;
      });
      
      console.log("Completed reports:", completedReports);
      console.log("Report count:", completedReports.length);
      
      setReportCount(completedReports.length);
    } catch (error) {
      console.error("Error checking report count:", error);
      setReportCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    window.location.href = "/sign-up";
  };

  // Loading Component
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="text-gray-600 font-medium animate-pulse">Loading your dashboard...</div>
        </div>
      </div>
    );
  }

  // Limit reached component with enhanced design
  if (reportCount >= MAX_REPORTS) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8 text-center border border-red-100 transform hover:scale-105 transition-all duration-300">
          <div className="relative">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <AlertCircle className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping opacity-75"></div>
          </div>
          
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Limit Reached
          </h2>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            You've maximized your free consultations! Sign up with a new email to get 5 more AI medical consultations.
          </p>
          
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 mb-8 border border-red-100">
            <div className="text-sm text-gray-600 mb-2">Reports Generated</div>
            <div className="text-3xl font-bold text-red-600 mb-2">
              {reportCount}/{MAX_REPORTS}
            </div>
            <div className="w-full bg-red-200 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-red-400 to-red-600 h-3 rounded-full w-full animate-pulse"></div>
            </div>
          </div>
          
          <Button 
            onClick={handleSignOut}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            size="lg"
          >
            <Mail className="w-5 h-5 mr-2" />
            Get More Consultations
          </Button>
          
          <p className="text-xs text-gray-500 mt-4">
            New email • 5 free reports • Instant access
          </p>
        </div>
      </div>
    );
  }

  // Stats cards data
  const stats = [
    {
      title: "Total Consultations",
      value: totalSessions,
      icon: Activity,
      color: "from-blue-400 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
    },
    {
      title: "Reports Generated",
      value: reportCount,
      icon: Calendar,
      color: "from-green-400 to-green-600",
      bgColor: "from-green-50 to-green-100",
    },
    {
      title: "AI Specialists",
      value: "10+",
      icon: Users,
      color: "from-purple-400 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
    },
    {
      title: "Success Rate",
      value: "98%",
      icon: TrendingUp,
      color: "from-pink-400 to-pink-600",
      bgColor: "from-pink-50 to-pink-100",
    },
  ];

  // Main dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Medical Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome back! Manage your AI medical consultations
            </p>
          </div>
          <div className="transform hover:scale-105 transition-all duration-200 mt-2">
            <AddNewSessionDialog />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.bgColor} rounded-xl p-6 border border-gray-100 transform hover:scale-105 transition-all duration-300 hover:shadow-lg group`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-lg group-hover:scale-110 transition-transform duration-200`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Usage Progress */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-blue-800">
                Free Plan Usage
              </span>
            </div>
            <span className="text-sm font-medium text-blue-600 bg-white px-3 py-1 rounded-full">
              {reportCount}/{MAX_REPORTS} reports
            </span>
          </div>
          
          <div className="relative">
            <div className="w-full bg-blue-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                style={{ width: `${(reportCount / MAX_REPORTS) * 100}%` }}
              >
                <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
              </div>
            </div>
          </div>
          
          {reportCount >= MAX_REPORTS - 1 && (
            <div className="flex items-center mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-amber-600 mr-2 animate-bounce" />
              <p className="text-xs text-amber-700 font-medium">
                Almost at your limit! Consider upgrading for unlimited access.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        <div className="transform transition-all duration-500 hover:translate-y-[-2px]">
          <HistoryList />
        </div>
        
        <div className="transform transition-all duration-500 hover:translate-y-[-2px]">
          <DoctorAgentList />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;