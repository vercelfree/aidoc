"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { ArrowRight, Loader2, Plus, FileText, User, AlertCircle, CheckCircle } from "lucide-react";
import axios, { AxiosError } from "axios";
import DoctorAgentCard, { doctorAgent } from "./DoctorAgentCard";
import SuggestedDoctorCard from "./SuggestedDoctorCard";
import { useRouter } from "next/navigation";

function AddNewSessionDialog() {
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>();
  const [step, setStep] = useState<'input' | 'selection' | 'confirmation'>('input');
  const router = useRouter();

  const OnClickNext = async () => {
    if (!note.trim()) return;
    
    setLoading(true);
    try {
      const result = await axios.post("/api/suggest-doctors", {
        notes: note,
      });

      console.log("API Response:", result.data);
      
      let doctors: doctorAgent[] = [];
      
      if (Array.isArray(result.data)) {
        doctors = result.data;
      } else if (result.data && Array.isArray(result.data.doctors)) {
        doctors = result.data.doctors;
      } else if (result.data && Array.isArray(result.data.suggestedDoctors)) {
        doctors = result.data.suggestedDoctors;
      } else {
        console.error("Unexpected response structure:", result.data);
        doctors = [];
      }
      
      setSuggestedDoctors(doctors);
      setStep('selection');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Error fetching suggested doctors:", error);
        if (error.response?.data) {
          console.error("Error details:", error.response.data);
        }
      } else {
        console.error("Unknown error:", error);
      }
      setSuggestedDoctors([]);
    }
    setLoading(false);
  };

  const onStartConsultation = async () => {
    setLoading(true);
    try {
      console.log("Starting consultation with:", { notes: note, selectedDoctor });
      
      const result = await axios.post('/api/session-chat', {
        notes: note,
        selectedDoctor: selectedDoctor
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

  const resetDialog = () => {
    setNote("");
    setSuggestedDoctors([]);
    setSelectedDoctor(undefined);
    setStep('input');
    setLoading(false);
  };

  const goBack = () => {
    if (step === 'selection') {
      setStep('input');
      setSuggestedDoctors([]);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-6">
      <div className={`flex items-center space-x-2 ${step === 'input' ? 'text-blue-600' : 'text-green-600'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          step === 'input' ? 'bg-blue-100 border-2 border-blue-600' : 'bg-green-100'
        }`}>
          {step === 'input' ? <FileText className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
        </div>
        <span className="text-sm font-medium">Details</span>
      </div>
      
      <div className={`w-8 h-0.5 ${step !== 'input' ? 'bg-green-400' : 'bg-gray-200'}`}></div>
      
      <div className={`flex items-center space-x-2 ${
        step === 'selection' ? 'text-blue-600' : step === 'input' ? 'text-gray-400' : 'text-green-600'
      }`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          step === 'selection' ? 'bg-blue-100 border-2 border-blue-600' : 
          step === 'input' ? 'bg-gray-100' : 'bg-green-100'
        }`}>
          {step === 'input' ? <User className="w-4 h-4" /> : 
           step === 'selection' ? <User className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
        </div>
        <span className="text-sm font-medium">Select Doctor</span>
      </div>
    </div>
  );

  return (
    <Dialog onOpenChange={(open) => !open && resetDialog()}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
          <Plus className="w-5 h-5 mr-2" />
          Start New Consultation
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-4 border-b border-gray-100">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Medical Consultation
          </DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-4">
              {renderStepIndicator()}
              
              {step === 'input' ? (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-blue-500 rounded-lg">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">
                          Describe Your Symptoms
                        </h3>
                        <p className="text-blue-600 text-sm mb-4">
                          Please provide detailed information about your symptoms, concerns, or medical questions. 
                          The more specific you are, the better we can match you with the right specialist.
                        </p>
                        
                        <div className="relative">
                          <Textarea
                            placeholder="Example: I've been experiencing chest pain and shortness of breath for the past 2 days. The pain is sharp and occurs mainly when I breathe deeply..."
                            className="min-h-[160px] resize-none border-blue-200 focus:border-blue-400 focus:ring-blue-400 rounded-lg"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                          />
                          <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                            {note.length}/500
                          </div>
                        </div>
                        
                        {note.length > 0 && note.length < 20 && (
                          <div className="flex items-center mt-2 text-amber-600">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            <span className="text-sm">Please provide more details for better assistance</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Tips section */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <h4 className="font-semibold text-gray-800 mb-3">💡 Tips for better consultation:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Include symptom duration and severity</li>
                      <li>• Mention any medications you're currently taking</li>
                      <li>• Describe when symptoms occur (morning, evening, during activity)</li>
                      <li>• Note any triggers or patterns you've observed</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-500 rounded-lg">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-green-800">
                            Recommended Specialists
                          </h3>
                          <p className="text-green-600 text-sm">
                            Based on your symptoms, here are the best matching specialists
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        onClick={goBack}
                        className="text-green-700 hover:bg-green-100"
                        size="sm"
                      >
                        ← Edit Details
                      </Button>
                    </div>
                    
                    {/* Your symptoms summary */}
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-800 mb-2">Your Consultation Request:</h4>
                      <p className="text-sm text-gray-700 italic line-clamp-3">"{note}"</p>
                    </div>
                  </div>

                  {suggestedDoctors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                      {suggestedDoctors.map((doctor, index) => (
                        <div
                          key={index}
                          className="transform transition-all duration-300 hover:scale-105"
                          style={{
                            animationDelay: `${index * 100}ms`,
                            animation: 'fadeInUp 0.5s ease-out forwards'
                          }}
                        >
                          <SuggestedDoctorCard 
                            doctorAgent={doctor} 
                            setSelectedDoctor={() => setSelectedDoctor(doctor)}
                            isSelected={selectedDoctor?.id === doctor.id}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-600">No specialists found. Please try rephrasing your symptoms.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between w-full">
            <DialogClose asChild>
              <Button 
                variant="outline" 
                className="px-6 hover:bg-gray-50"
                onClick={resetDialog}
              >
                Cancel
              </Button>
            </DialogClose>
            
            <div className="flex items-center space-x-3">
              {step === 'input' ? (
                <Button 
                  disabled={!note.trim() || note.length < 10 || loading} 
                  onClick={OnClickNext}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin w-4 h-4 mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Find Specialists
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              ) : (
                <Button 
                  disabled={loading || !selectedDoctor} 
                  onClick={onStartConsultation}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin w-4 h-4 mr-2" />
                      Starting...
                    </>
                  ) : (
                    <>
                      Start Consultation
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
      
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
    </Dialog>
  );
}


export default AddNewSessionDialog;
