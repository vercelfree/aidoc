"use client"
import React, { useState } from "react";
import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@tabler/icons-react'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from "next/navigation";



export type doctorAgent = {
    id:number,
    specialist:string,
    description:string,
    image:string,
    agentPrompt:string,
    voiceId?:string
}

type props = {
    doctorAgent:doctorAgent
}


function DoctorAgentCard({doctorAgent}:props) {

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onStartConsultation = async() => {
    // Save all info to Database
    setLoading(true);
    try {
      
      const result = await axios.post('/api/session-chat', {
        notes: "New Query",
        selectedDoctor: doctorAgent
      });
      
      console.log("Session creation result:", result.data);
      
      if (result.data?.sessionId) {
        console.log("Session created successfully with ID:", );
        router.push('/dashboard/medical-agent/'+result.data.sessionId);
      } else {
        console.error("No session ID returned");
      }
    } catch (error) {
      console.error("Error starting consultation:", error);
      if (error.response?.data) {
        console.error("Error details:", error.response.data);
      }
    }
    setLoading(false);
  }
  return (
    <div>
        <Image src={doctorAgent.image} alt={doctorAgent.specialist} 
        width={200} height={300} 
        className='w-full h-[250px] object-cover rounded-xl'/>
        <h2 className="font-bold mt-1">{doctorAgent.specialist}</h2>
        <p className="line-clamp-2 text-sm text-gray-500">{doctorAgent.description}</p>
        <Button className='w-full mt-2' onClick={onStartConsultation}>Start Consultation {loading? <Loader2Icon className='animate-spin'/>:<IconArrowRight/>}</Button>
    </div>
  )
}

export default DoctorAgentCard