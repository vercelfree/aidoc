// import React from "react";
// import HistoryList from "./_components/HistoryList";
// import { Button } from "@/components/ui/button";
// import DoctorAgentList from "./_components/DoctorAgentList";
// import AddNewSessionDialog from "./_components/AddNewSessionDialog";

// function Dashboard() {
//   return (
//     <div>
//       <div className="flex justify-between items-center">
//         <h2 className="font-bold text-2xl">My Dashboard</h2>
//         <AddNewSessionDialog/>
//       </div>
//       <HistoryList />

//       <DoctorAgentList/>
//     </div>
//   );
// }

// export default Dashboard;
















"use client";

import React, { useEffect, useState } from "react";
import HistoryList from "./_components/HistoryList";
import { Button } from "@/components/ui/button";
import DoctorAgentList from "./_components/DoctorAgentList";
import AddNewSessionDialog from "./_components/AddNewSessionDialog";
import axios from "axios";
import { AlertCircle, Mail } from "lucide-react";

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
  const MAX_REPORTS = 5;

  useEffect(() => {
    checkReportCount();
  }, []);

  const checkReportCount = async () => {
    try {
      const result = await axios.get("/api/session-chat?sessionId=all");
      const sessions: SessionDetail[] = result.data || [];
      
      console.log("All sessions:", sessions);
      
      // Count sessions that have reports generated
      const completedReports = sessions.filter((session: SessionDetail) => {
        // Check if report exists and is not null/empty
        if (!session.report) return false;
        
        // If report is a string, check if it's not empty
        if (typeof session.report === 'string') {
          return session.report.trim() !== "";
        }
        
        // If report is an object, check if it has data
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
    // Redirect to sign up/sign in page
    window.location.href = "/sign-up";
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  // Show limit reached message if user has 5 or more reports
  if (reportCount >= MAX_REPORTS) {
    return (
      <div className="flex items-center justify-center min-h-[600px] p-6">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center border">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            You reach maximum limit
          </h2>
          
          <p className="text-gray-600 mb-6">
            You have reached your maximum use of free plan. Use new email to signup and generate more 5 report.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-sm text-gray-600 mb-2">Reports Generated:</div>
            <div className="text-xl font-bold text-red-600">
              {reportCount}/{MAX_REPORTS}
            </div>
          </div>
          
          <Button 
            onClick={handleSignOut}
            className="w-full bg-blue-600 hover:bg-blue-700"
            size="lg"
          >
            <Mail className="w-4 h-4 mr-2" />
            Sign Up with New Email
          </Button>
        </div>
      </div>
    );
  }

  // Show normal dashboard if under limit
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">My Dashboard</h2>
        <AddNewSessionDialog/>
      </div>
      
      {/* Show usage indicator */}
      <div className="mt-4 mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-blue-800 font-medium">Free Plan Usage</span>
          <span className="text-sm text-blue-600">
            {reportCount}/{MAX_REPORTS} reports used
          </span>
        </div>
        <div className="w-full bg-blue-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(reportCount / MAX_REPORTS) * 100}%` }}
          ></div>
        </div>
        {reportCount >= MAX_REPORTS - 1 && (
          <p className="text-xs text-blue-700 mt-2">
            ⚠️ You're close to your limit! Consider signing up with a new email for more reports.
          </p>
        )}
      </div>
      
      <HistoryList />
      <DoctorAgentList/>
    </div>
  );
}

export default Dashboard;
