// "use client";

// import React, { useState } from "react";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { DialogClose } from "@radix-ui/react-dialog";
// import { ArrowRight, Loader2 } from "lucide-react";
// import axios from "axios";
// import { use } from "motion/react-client";
// import DoctorAgentCard, { doctorAgent } from "./DoctorAgentCard";
// import SuggestedDoctorCard from "./SuggestedDoctorCard";

// function AddNewSessionDialog() {
//   const [note, setNote] = useState<string>("");
//   const [loading, setLoading] = useState(false);
//   const [suggestedDoctors,setSuggestedDoctors]=useState <doctorAgent[]> ();
//   const [selectedDoctor,setSelectedDoctor] = useState <doctorAgent> ();

//   const OnClickNext = async () => {
//     setLoading(true);
//     const result = await axios.post("/api/suggest-doctors", {
//       notes: note,
//     });

//     console.log(result.data);
//     setSuggestedDoctors(result.data);
//     setLoading(false);
//   };

//   const onStartConsultation = async() =>{
//     // Save all info to Database
//     setLoading(true);
//     const result = await axios.post('/api/session-chat',{
//       notes:note,
//       selectedDoctor:selectedDoctor
//     });
//     console.log(result.data);
//     if(result.data?.sessionId){
//       console.log(result.data.sessionId);
//     }
//     setLoading(false);

//   }

//   return (
//     <Dialog>
//       <DialogTrigger>
//         <Button className="mt-3">+ Start a Consultation</Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Add Basic Details</DialogTitle>
//           <DialogDescription asChild>
//             {!suggestedDoctors? <div className="">
//               <h2 className="">
//                 Add Symptoms or Any other details.
//                 <Textarea
//                   placeholder="Add Details here..."
//                   className="h-[200px] mt-1"
//                   onChange={(e) => setNote(e.target.value)}
//                 />
//               </h2>
//             </div>:
//             //Suggested Doctor
//             <div className="">
//               <h2 className="">Select the Doctor</h2>

//             <div className="grid grid-cols-3 gap-5">
//               {suggestedDoctors.map((doctor,index)=>(
//                 <SuggestedDoctorCard doctorAgent={doctor} key={index} 
//                 setSelectedDoctor={()=>setSelectedDoctor(doctor)}/>
//               ))}
//             </div>
//               </div>
//             }
//           </DialogDescription>
//         </DialogHeader>
//         <DialogFooter>
//           <DialogClose>
//             <Button variant={"outline"}>Cancel</Button>
//           </DialogClose>
//           {!suggestedDoctors ? <Button disabled={!note || loading} onClick={OnClickNext}>
            
//             Next {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />} 
//           </Button> :
//           <Button disabled={loading} onClick={() => onStartConsultation()}> Start Consultation 
//           {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />} </Button>}

//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default AddNewSessionDialog;











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
import { ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";
import { use } from "motion/react-client";
import DoctorAgentCard, { doctorAgent } from "./DoctorAgentCard";
import SuggestedDoctorCard from "./SuggestedDoctorCard";
import { useRouter } from "next/navigation";

function AddNewSessionDialog() {
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>();
  const router = useRouter();

  const OnClickNext = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/suggest-doctors", {
        notes: note,
      });

      console.log("API Response:", result.data);
      
      // Handle different possible response structures
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
    } catch (error) {
      console.error("Error fetching suggested doctors:", error);
      setSuggestedDoctors([]);
    }
    setLoading(false);
  };

  const onStartConsultation = async() => {
    // Save all info to Database
    setLoading(true);
    try {
      console.log("Starting consultation with:", { notes: note, selectedDoctor });
      
      const result = await axios.post('/api/session-chat', {
        notes: note,
        selectedDoctor: selectedDoctor
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
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-3">+ Start a Consultation</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Basic Details</DialogTitle>
          <DialogDescription asChild>
            {suggestedDoctors.length === 0 ? (
              <div className="">
                <h2 className="">
                  Add Symptoms or Any other details.
                  <Textarea
                    placeholder="Add Details here..."
                    className="h-[200px] mt-1"
                    onChange={(e) => setNote(e.target.value)}
                  />
                </h2>
              </div>
            ) : (
              // Suggested Doctor
              <div className="">
                <h2 className="">Select the Doctor</h2>
                <div className="grid grid-cols-3 gap-5">
                  {suggestedDoctors.map((doctor, index) => (
                    <SuggestedDoctorCard 
                      doctorAgent={doctor} 
                      key={index} 
                      setSelectedDoctor={() => setSelectedDoctor(doctor)}
                      isSelected={selectedDoctor?.id === doctor.id}
                    />
                  ))}
                </div>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          {suggestedDoctors.length === 0 ? (
            <Button disabled={!note || loading} onClick={OnClickNext}>
              Next {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />} 
            </Button>
          ) : (
            <Button disabled={loading || !selectedDoctor} onClick={() => onStartConsultation()}> 
              Start Consultation 
              {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />} 
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSessionDialog;