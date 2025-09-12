"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { doctorAgent } from "../../_components/DoctorAgentCard";
import { 
  Circle, 
  Loader, 
  PhoneCall, 
  PhoneOff, 
  Mic, 
  MicOff,
  User,
  Bot,
  Activity,
  Clock,
  FileText,
  Volume2,
  VolumeX,
  Phone,
  Pause,
  Play,
  MessageCircle,
  Stethoscope
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";

export type SessionDetail = {
  id: number;
  notes: string;
  sessionId: string;
  report: JSON;
  selectedDoctor: doctorAgent;
  createdOn: string;
};

type messages = {
  role: string;
  text: string;
};

function MedicalVoiceAgent() {
  const { sessionId } = useParams();
  const [sessionDetail, setSessionDetails] = useState<SessionDetail>();
  const [callStarted, setCallStarted] = useState(false);
  const [vapiInstance, setVapiInstance] = useState<any>();
  const [currentRoll, setCurrentRole] = useState<string | null>();
  const [liveTranscript, setLiveTranscript] = useState<string>();
  const [messages, setMessages] = useState<messages[]>([]);
  const [loading, setLoading] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [reportGenerating, setReportGenerating] = useState(false);
  const router = useRouter();

  // Timer for call duration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callStarted) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [callStarted]);

  useEffect(() => {
    sessionId && GetSessionDetails();
  }, [sessionId]);

  const GetSessionDetails = async () => {
    try {
      setLoading(true);
      console.log("Fetching session details...");
      const result = await axios.get("/api/session-chat?sessionId=" + sessionId);
      console.log("Session details loaded:", result.data);
      setSessionDetails(result.data);
    } catch (error) {
      console.error("Error fetching session details:", error);
      toast.error("Failed to load session details");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const StarCall = () => {
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
    setVapiInstance(vapi);
    setCallDuration(0);

    const VapiAgentConfig = {
      name: 'AI Medical Doctor Voice Agent',
      firstMessage: "Hi, I'm your AI Medical Assistant. I'm here to help you today. Can you please tell me your full name and age?",
      transcriber: {
        provider: 'assembly-ai',
        language: 'en'
      },
      voice: {
        cachingEnabled: true,
        provider: 'deepgram',
        voiceId: sessionDetail?.selectedDoctor?.voiceId
      },
      model: {
        provider: 'google',
        model: 'gemini-2.0-flash',
        messages: [
          {
            role: 'system',
            content: sessionDetail?.selectedDoctor?.agentPrompt
          }
        ]
      }
    };

    //@ts-ignore
    vapi.start(VapiAgentConfig);

    // Listen for events
    vapi.on("call-start", () => {
      console.log("Call started");
      setCallStarted(true);
      toast.success("Call connected successfully!");
    });
    
    vapi.on("call-end", () => {
      console.log("Call ended");
      setCallStarted(false);
      setIsListening(false);
      setIsSpeaking(false);
    });
    
    vapi.on("message", (message) => {
      if (message.type === "transcript") {
        const { role, transcriptType, transcript } = message;
        console.log(`${message.role}: ${message.transcript}`);
        
        if (transcriptType == "partial") {
          setLiveTranscript(transcript);
          setCurrentRole(role);
          setIsListening(role === "user");
        } else if (transcriptType == "final") {
          setMessages((prev: any) => [
            ...prev,
            { role: role, text: transcript },
          ]);
          setLiveTranscript("");
          setCurrentRole(null);
          setIsListening(false);
        }
      }
    });

    vapi.on("speech-start", () => {
      console.log("Assistant started speaking");
      setCurrentRole("assistant");
      setIsSpeaking(true);
      setIsListening(false);
    });
    
    vapi.on("speech-end", () => {
      console.log("Assistant stopped speaking");
      setCurrentRole("user");
      setIsSpeaking(false);
    });
  };

  const endCall = async () => {
    setReportGenerating(true);
    try {
      const result = await GenerateReport();
      if (!vapiInstance) return;
      
      // Stop call
      vapiInstance.stop();
      
      // Reset call state
      setCallStarted(false);
      setVapiInstance(null);
      setIsListening(false);
      setIsSpeaking(false);
      setCallDuration(0);

      toast.success('Your medical report has been generated successfully!');
      router.replace('/dashboard');
      
      console.log("Call ended and report generated");
    } catch (error) {
      console.error("Error ending call:", error);
      toast.error("Failed to generate report");
    } finally {
      setReportGenerating(false);
    }
  };
  
  const GenerateReport = async () => {
    const result = await axios.post('/api/medical-report', {
      messages: messages,
      sessionDetail: sessionDetail,
      sessionId: sessionId
    });
    
    console.log("Report generated:", result.data);
    return result.data;
  }

  if (loading && !sessionDetail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">Loading Consultation</h3>
            <p className="text-gray-600">Preparing your AI medical session...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Connection Status */}
            <div className={`flex items-center space-x-3 px-4 py-2 rounded-full border-2 transition-all duration-300 ${
              callStarted 
                ? 'border-green-200 bg-green-50' 
                : 'border-red-200 bg-red-50'
            }`}>
              <div className="relative">
                <Circle
                  className={`h-4 w-4 ${
                    callStarted ? "fill-green-500 text-green-500" : "fill-red-500 text-red-500"
                  }`}
                />
                {callStarted && (
                  <div className="absolute inset-0 h-4 w-4 bg-green-400 rounded-full animate-ping opacity-75"></div>
                )}
              </div>
              <span className={`font-semibold ${
                callStarted ? 'text-green-700' : 'text-red-700'
              }`}>
                {callStarted ? "Connected" : "Disconnected"}
              </span>
              {callStarted && (
                <div className="flex items-center space-x-1">
                  {isListening && <Mic className="w-4 h-4 text-green-600 animate-pulse" />}
                  {isSpeaking && <Volume2 className="w-4 h-4 text-blue-600 animate-bounce" />}
                </div>
              )}
            </div>

            {/* Call Duration */}
            <div className="flex mt-5 items-center space-x-2 text-xl font-mono font-bold text-gray-700 lg:mt-0">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className={callStarted ? 'text-green-600' : 'text-gray-400'}>
                {formatTime(callDuration)}
              </span>
            </div>
          </div>
        </div>

        {sessionDetail && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Doctor Profile Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white relative overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-32 h-32 lg:border-2 border-white rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-24 h-24 lg:border-2 border-white rounded-full"></div>
              </div>
              
              <div className="relative z-10 flex items-center flex-col text-center">
                {/* Doctor Image with Status */}
                <div className="relative mb-6 group">
                  <div className="absolute inset-0 bg-white rounded-full blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300 scale-110"></div>
                  <div className={`relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl transition-transform duration-500 ${
                    callStarted ? 'scale-110 animate-pulse' : 'hover:scale-105'
                  }`}>
                    <Image
                      src={sessionDetail?.selectedDoctor?.image}
                      alt={sessionDetail?.selectedDoctor?.specialist}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Status indicator */}
                  <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center shadow-lg ${
                    callStarted ? 'bg-green-500' : 'bg-gray-400'
                  }`}>
                    {callStarted ? (
                      <Phone className="w-4 h-4 text-white" />
                    ) : (
                      <PhoneOff className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <h2 className="text-2xl font-bold">
                    {sessionDetail?.selectedDoctor?.specialist}
                  </h2>
                  <div className="flex items-center justify-center space-x-2 text-blue-100">
                    <Stethoscope className="w-4 h-4" />
                    <span>AI Medical Specialist</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-lg">{messages.length}</div>
                    <div className="text-blue-200">Messages</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">★ 4.9</div>
                    <div className="text-blue-200">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">24/7</div>
                    <div className="text-blue-200">Available</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Conversation Section */}
            <div className="p-8">
              {/* Activity Status */}
              {callStarted && (
                <div className="mb-6 flex justify-center">
                  <div className="flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-3 rounded-full border border-blue-200">
                    {isSpeaking && (
                      <div className="flex items-center space-x-2 text-blue-600">
                        <Bot className="w-4 h-4" />
                        <span className="text-sm font-medium">AI Doctor is speaking...</span>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    )}
                    {isListening && !isSpeaking && (
                      <div className="flex items-center space-x-2 text-green-600">
                        <User className="w-4 h-4" />
                        <span className="text-sm font-medium">Listening to you...</span>
                        <Mic className="w-4 h-4 animate-pulse" />
                      </div>
                    )}
                    {!isSpeaking && !isListening && (
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Activity className="w-4 h-4" />
                        <span className="text-sm font-medium">Ready to listen</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Messages Container */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 p-6 min-h-[300px] max-h-[400px] overflow-y-auto">
                {messages.length === 0 && !liveTranscript ? (
                  <div className="flex items-center justify-center h-full text-center">
                    <div className="space-y-3">
                      <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-8 h-8 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-600">
                          {callStarted ? "Conversation will appear here" : "Start your consultation"}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {callStarted ? "Speak naturally with your AI doctor" : "Click 'Start Call' to begin"}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Show recent messages */}
                    {messages.slice(-6).map((msg: messages, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'} animate-fade-in`}
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm border ${
                          msg.role === 'assistant' 
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-blue-200' 
                            : 'bg-white text-gray-800 border-gray-200'
                        }`}>
                          <div className="flex items-center space-x-2 mb-1">
                            {msg.role === 'assistant' ? (
                              <Bot className="w-3 h-3" />
                            ) : (
                              <User className="w-3 h-3" />
                            )}
                            <span className="text-xs font-medium opacity-80">
                              {msg.role === 'assistant' ? 'AI Doctor' : 'You'}
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed">{msg.text}</p>
                        </div>
                      </div>
                    ))}

                    {/* Live transcript */}
                    {liveTranscript && liveTranscript.length > 0 && (
                      <div className={`flex ${currentRoll === 'assistant' ? 'justify-start' : 'justify-end'} opacity-75`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl border-2 border-dashed ${
                          currentRoll === 'assistant' 
                            ? 'bg-blue-50 text-blue-800 border-blue-300' 
                            : 'bg-gray-50 text-gray-800 border-gray-300'
                        }`}>
                          <div className="flex items-center space-x-2 mb-1">
                            {currentRoll === 'assistant' ? (
                              <Bot className="w-3 h-3 animate-pulse" />
                            ) : (
                              <User className="w-3 h-3 animate-pulse" />
                            )}
                            <span className="text-xs font-medium">
                              {currentRoll === 'assistant' ? 'AI Doctor' : 'You'} (typing...)
                            </span>
                          </div>
                          <p className="text-sm">{liveTranscript}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-center">
                {!callStarted ? (
                  <Button 
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm lg:text-lg"
                    onClick={StarCall} 
                    disabled={loading}
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader className="animate-spin w-5 h-5 mr-3" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <PhoneCall className="w-5 h-5 mr-3" />
                        Start Consultation Call
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="destructive"
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                      onClick={endCall} 
                      disabled={reportGenerating}
                      size="lg"
                    >
                      {reportGenerating ? (
                        <>
                          <Loader className="animate-spin w-5 h-5 mr-2" />
                          Generating Report...
                        </>
                      ) : (
                        <>
                          <PhoneOff className="w-5 h-5 mr-2" />
                          End Call & Generate Report
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              {/* Help Text */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  {callStarted 
                    ? "Speak naturally. The AI doctor will analyze your conversation and generate a detailed medical report."
                    : "Your consultation will be recorded and analyzed to provide comprehensive medical insights."
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default MedicalVoiceAgent;