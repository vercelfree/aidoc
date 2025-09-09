// import React from 'react'
// import { doctorAgent } from './DoctorAgentCard'
// import Image from 'next/image'


// type props = {
//     doctorAgent:doctorAgent,
//     setSelectedDoctor: any
// }

// function SuggestedDoctorCard({doctorAgent,setSelectedDoctor}:props) {
//   return (
//     <div className='flex flex-col items-center justify-center 
//     border rounded-2xl shadow p-5 hover:border-blue-500 cursor-pointer' onClick={()=>setSelectedDoctor(doctorAgent)}>
//         <Image src={doctorAgent.image} alt={doctorAgent.specialist}
//         width={70} height={70} 
//         className='w-[50px] h-[50px] rounded-4xl obj object-cover'/>
//         <h2 className='font-bold text-sm text-center'>{doctorAgent.specialist}</h2>
//         <p className="text-xs text-center line-clamp-2">{doctorAgent.description}</p>
//     </div>
//   )
// }

// export default SuggestedDoctorCard


import React from 'react'
import { doctorAgent } from './DoctorAgentCard'
import Image from 'next/image'

type props = {
    doctorAgent: doctorAgent,
    setSelectedDoctor: any,
    isSelected?: boolean // Add this prop to track selection state
}

function SuggestedDoctorCard({ doctorAgent, setSelectedDoctor, isSelected = false }: props) {
  return (
    <div 
      className={`flex flex-col items-center justify-center 
        border rounded-2xl shadow p-5 cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-md' 
          : 'hover:border-blue-300 hover:shadow-md'
        }`}
      onClick={() => setSelectedDoctor(doctorAgent)}
    >
        <Image 
          src={doctorAgent.image} 
          alt={doctorAgent.specialist}
          width={70} 
          height={70} 
          className='w-[50px] h-[50px] rounded-full object-cover'
        />
        <h2 className={`font-bold text-sm text-center mt-2 ${isSelected ? 'text-blue-600' : ''}`}>
          {doctorAgent.specialist}
        </h2>
        <p className={`text-xs text-center line-clamp-2 mt-1 ${isSelected ? 'text-blue-500' : 'text-gray-600'}`}>
          {doctorAgent.description}
        </p>
        {isSelected && (
          <div className="mt-2 px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
            Selected
          </div>
        )}
    </div>
  )
}

export default SuggestedDoctorCard