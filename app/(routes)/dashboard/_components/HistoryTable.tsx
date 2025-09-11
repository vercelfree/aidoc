import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import moment from "moment";
import ViewReportDialog from "./ViewReportDialog";
import { FileText, Calendar, User, Clock, AlertCircle, CheckCircle, Stethoscope } from "lucide-react";

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
  historyList: SessionDetail[];
};

function HistoryTable({ historyList }: Props) {
  console.log(historyList);
  
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

  const getStatusIcon = (record: SessionDetail) => {
    if (record.report) {
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    }
    return <Clock className="w-4 h-4 text-yellow-600" />;
  };

  const getStatusText = (record: SessionDetail) => {
    if (record.report) {
      return 'Completed';
    }
    return 'In Progress';
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-lg">
      <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Consultation History</h3>
            <p className="text-gray-600">Review your medical consultations and reports</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableCaption className="text-gray-500 py-4 bg-gray-50">
            Your medical consultation history with AI specialists
          </TableCaption>
          <TableHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <TableRow className="border-b border-blue-100">
              <TableHead className="font-semibold text-blue-800 py-4">
                <div className="flex items-center space-x-2">
                  <Stethoscope className="w-4 h-4" />
                  <span>Specialist</span>
                </div>
              </TableHead>
              <TableHead className="font-semibold text-blue-800">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Chief Complaint</span>
                </div>
              </TableHead>
              <TableHead className="font-semibold text-blue-800">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>Severity</span>
                </div>
              </TableHead>
              <TableHead className="font-semibold text-blue-800">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Date</span>
                </div>
              </TableHead>
              <TableHead className="font-semibold text-blue-800">Status</TableHead>
              <TableHead className="text-right font-semibold text-blue-800">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyList
              .filter((record) => record.selectedDoctor)
              .map((record: SessionDetail, index: number) => (
                <TableRow 
                  key={record.id || index}
                  className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200 border-b border-gray-100 group"
                >
                  <TableCell className="py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                          {record.selectedDoctor.specialist}
                        </p>
                        <p className="text-xs text-gray-500">AI Medical Specialist</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="max-w-xs">
                    <div className="space-y-1">
                      <p className="font-medium text-gray-800 line-clamp-2">
                        {record.report?.chiefComplaint || record.notes || 'No complaint specified'}
                      </p>
                      {record.report?.symptoms && record.report.symptoms.length > 0 && (
                        <p className="text-xs text-gray-500 line-clamp-1">
                          Symptoms: {record.report.symptoms.join(', ')}
                        </p>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    {record.report?.severity ? (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(record.report.severity)}`}>
                        {record.report.severity}
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                        Not specified
                      </span>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium text-gray-800">
                        {moment(new Date(record.createdOn)).format('MMM DD, YYYY')}
                      </p>
                      <p className="text-xs text-gray-500">
                        {moment(new Date(record.createdOn)).fromNow()}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(record)}
                      <span className={`text-sm font-medium ${
                        record.report ? 'text-green-700' : 'text-yellow-700'
                      }`}>
                        {getStatusText(record)}
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell className="text-right">
                    <ViewReportDialog record={record} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Empty state */}
      {historyList.filter(record => record.selectedDoctor).length === 0 && (
        <div className="p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Consultations Yet</h3>
          <p className="text-gray-600">Your consultation history will appear here</p>
        </div>
      )}

      {/* Summary footer */}
      {historyList.filter(record => record.selectedDoctor).length > 0 && (
        <div className="bg-gradient-to-r from-gray-50 to-white p-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Total consultations: <span className="font-semibold text-gray-800">
                {historyList.filter(record => record.selectedDoctor).length}
              </span>
            </span>
            <span>
              Completed reports: <span className="font-semibold text-green-700">
                {historyList.filter(record => record.selectedDoctor && record.report).length}
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default HistoryTable;