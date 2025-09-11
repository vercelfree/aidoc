import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { FileText, User, Calendar, AlertCircle, Pill, Activity, Clock, Eye } from "lucide-react";

// Define the Report type based on your data structure
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

// Define the doctorAgent type
type DoctorAgent = {
  specialist: string;
  // Add other properties as needed
};

// Define the conversation message type
type ConversationMessage = {
  role: string;
  text: string;
};

// Define the main SessionDetail type
type SessionDetail = {
  id: number;
  notes: string;
  sessionId: string;
  report: Report;
  selectedDoctor: DoctorAgent;
  createdOn: string;
  conversation?: ConversationMessage[];
};

type Props = {
  record: SessionDetail;
};

function ViewReportDialog({ record }: Props) {
  console.log("Record:", record);
  
  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'high':
      case 'severe':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
      case 'moderate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
      case 'mild':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-blue-200 text-blue-700 hover:text-blue-800 transition-all duration-200 hover:shadow-md"
        >
          <Eye className="w-4 h-4 mr-1" />
          View Report
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-6 border-b border-gray-200">
          <DialogTitle asChild>
            <div className="space-y-3">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Medical Consultation Report
              </h2>
              <p className="text-gray-600">
                Comprehensive analysis and recommendations from AI medical specialist
              </p>
            </div>
          </DialogTitle>
          
          <DialogDescription asChild>
            <div className="mt-8 space-y-8">
              {/* Session Information Card */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-blue-800">Session Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-xl border border-blue-100">
                      <div className="flex items-center space-x-2 mb-1">
                        <Activity className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold text-gray-800">Medical Specialist</span>
                      </div>
                      <p className="text-blue-700 font-medium">{record.selectedDoctor?.specialist}</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-xl border border-blue-100">
                      <div className="flex items-center space-x-2 mb-1">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold text-gray-800">Agent Type</span>
                      </div>
                      <p className="text-gray-700">{record.report?.agent || 'AI Medical Assistant'}</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-xl border border-blue-100">
                      <div className="flex items-center space-x-2 mb-1">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold text-gray-800">Consultation Date</span>
                      </div>
                      <p className="text-gray-700">{moment(new Date(record?.createdOn)).format('MMMM DD, YYYY')}</p>
                      <p className="text-sm text-gray-500">{moment(new Date(record?.createdOn)).fromNow()}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-xl border border-blue-100">
                      <div className="flex items-center space-x-2 mb-1">
                        <User className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold text-gray-800">Patient</span>
                      </div>
                      <p className="text-gray-700">{record.report?.user || 'Anonymous User'}</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-xl border border-blue-100">
                      <div className="flex items-center space-x-2 mb-1">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold text-gray-800">Session ID</span>
                      </div>
                      <p className="text-gray-700 font-mono text-sm">{record.sessionId?.substring(0, 16)}...</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-xl border border-blue-100">
                      <div className="flex items-center space-x-2 mb-1">
                        <AlertCircle className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold text-gray-800">Initial Notes</span>
                      </div>
                      <p className="text-gray-700 text-sm line-clamp-2">{record.notes}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Summary Card */}
              {record.report && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-green-800">Medical Analysis</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {record.report?.chiefComplaint && (
                      <div className="bg-white p-4 rounded-xl border border-green-100">
                        <h4 className="font-semibold text-green-800 mb-2">Chief Complaint</h4>
                        <p className="text-gray-700">{record.report.chiefComplaint}</p>
                      </div>
                    )}
                    
                    {record.report?.symptoms && record.report.symptoms.length > 0 && (
                      <div className="bg-white p-4 rounded-xl border border-green-100">
                        <h4 className="font-semibold text-green-800 mb-2">Reported Symptoms</h4>
                        <div className="flex flex-wrap gap-2">
                          {record.report.symptoms.map((symptom, index) => (
                            <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm border border-green-200">
                              {symptom}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {record.report?.duration && (
                        <div className="bg-white p-4 rounded-xl border border-green-100">
                          <div className="flex items-center space-x-2 mb-1">
                            <Clock className="w-4 h-4 text-green-600" />
                            <h4 className="font-semibold text-green-800">Duration</h4>
                          </div>
                          <p className="text-gray-700">{record.report.duration}</p>
                        </div>
                      )}
                      
                      {record.report?.severity && (
                        <div className="bg-white p-4 rounded-xl border border-green-100">
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertCircle className="w-4 h-4 text-green-600" />
                            <h4 className="font-semibold text-green-800">Severity Assessment</h4>
                          </div>
                          <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getSeverityColor(record.report.severity)}`}>
                            {record.report.severity}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Medications & Recommendations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {record.report?.medicationsMentioned?.length > 0 && (
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-purple-500 rounded-lg">
                        <Pill className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-purple-800">Medications Mentioned</h3>
                    </div>
                    <div className="space-y-2">
                      {record.report.medicationsMentioned.map((medication, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg border border-purple-100 flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-gray-700">{medication}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {record.report?.recommendations?.length > 0 && (
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-amber-500 rounded-lg">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-amber-800">Recommendations</h3>
                    </div>
                    <div className="space-y-3">
                      {record.report.recommendations.map((rec, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg border border-amber-100">
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-amber-700 text-sm font-bold">{index + 1}</span>
                            </div>
                            <p className="text-gray-700 flex-1">{rec}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Summary Section */}
              {record.report?.summary && (
                <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-gray-600 rounded-lg">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">Consultation Summary</h3>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{record.report.summary}</p>
                  </div>
                </div>
              )}

              {/* Conversation History */}
              {record.conversation && record.conversation.length > 0 && (
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-indigo-500 rounded-lg">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-indigo-800">Conversation History</h3>
                  </div>
                  <div className="bg-white rounded-xl border border-indigo-100 max-h-64 overflow-y-auto">
                    <div className="p-4 space-y-4">
                      {record.conversation.map((msg, index) => (
                        <div 
                          key={index} 
                          className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                        >
                          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            msg.role === 'assistant' 
                              ? 'bg-indigo-100 text-indigo-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            <div className="text-xs font-medium mb-1">
                              {msg.role === 'assistant' ? '🤖 AI Doctor' : '👤 You'}
                            </div>
                            <p className="text-sm">{msg.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white text-center">
                <p className="text-blue-100 mb-2">
                  This report was generated by AI medical analysis system
                </p>
                <p className="text-sm text-blue-200">
                  ⚠️ This is for informational purposes only and should not replace professional medical advice
                </p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ViewReportDialog;