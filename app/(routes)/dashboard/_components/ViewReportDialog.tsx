// import React from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { SessionDetail } from "../medical-agent/[sessionId]/page";
// import moment from "moment";

// type Props = {
//   record: SessionDetail[];
// };

// function ViewReportDialog({ record }: Props) {
//   console.log("Record:", record);
//   return (
//     <Dialog>
//       <DialogTrigger>
//         <Button variant="link" size="sm">
//           View Report
//         </Button>
//       </DialogTrigger>
//       <DialogContent>
//         {/* <DialogHeader>
//           <DialogTitle asChild>
//             <h2 className="text-center text-4xl">Medical AI Voice Agent Report</h2>
//           </DialogTitle>
//           <DialogDescription asChild>
//             <div className="mt-10">
//                 <h2 className="font-bold text-blue-500 text-lg">Video Info:</h2>
//                 <div className="grid grid-cols-2">
//                     <div className="">
//                         <h2 className="">
//                             <span className="font-bold">Doctor Specialization :</span> {record?.selectedDoctor?.specialist}

//                         </h2>
//                         <h2 className="">
//                             Consult Date: {moment(new Date(record?.createdOn)).fromNow()}
//                         </h2>
//                     </div>

//                 </div>
//             </div>
//           </DialogDescription>
//         </DialogHeader> */}
//         <DialogHeader>
//           <DialogTitle asChild>
//             <h2 className="text-center text-4xl">
//               Medical AI Voice Agent Report
//             </h2>
//           </DialogTitle>
//           <DialogDescription asChild>
//             <div className="mt-10">
//               <h2 className="font-bold text-blue-500 text-lg">Session Info:</h2>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="">
//                   <h2 className="">
//                     <span className="font-bold">Doctor Specialization:</span>{" "}
//                     {record.selectedDoctor?.specialist}
//                   </h2>
//                   <h2 className="">
//                     <span className="font-bold">Agent Type:</span>{" "}
//                     {record.report?.agent}
//                   </h2>
//                   <h2 className="">
//                     Consult Date:{" "}
//                     {moment(new Date(record?.createdOn)).fromNow()}
//                   </h2>
//                 </div>
//                 <div className="">
//                   <h2 className="">
//                     <span className="font-bold">User:</span>{" "}
//                     {record.report?.user}
//                   </h2>
//                   <h2 className="">
//                     <span className="font-bold">Session ID:</span>{" "}
//                     {record.sessionId?.substring(0, 8)}...
//                   </h2>
//                   <h2 className="">
//                     <span className="font-bold">Notes:</span> {record.notes}
//                   </h2>
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <h2 className="font-bold text-blue-500 text-lg">
//                   Medical Summary:
//                 </h2>
//                 <div className="grid grid-cols-1 gap-2 mt-2">
//                   <div className="">
//                     <h2 className="">
//                       <span className="font-bold">Chief Complaint:</span>{" "}
//                       {record.report?.chiefComplaint}
//                     </h2>
//                   </div>
//                   <div className="">
//                     <h2 className="">
//                       <span className="font-bold">Symptoms:</span>{" "}
//                       {record.report?.symptoms?.join(", ") || "None specified"}
//                     </h2>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4 mt-2">
//                     <div className="">
//                       <h2 className="">
//                         <span className="font-bold">Duration:</span>{" "}
//                         {record.report?.duration}
//                       </h2>
//                     </div>
//                     <div className="">
//                       <h2 className="">
//                         <span className="font-bold">Severity:</span>{" "}
//                         {record.report?.severity}
//                       </h2>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {record.report?.medicationsMentioned?.length > 0 && (
//                 <div className="mt-6">
//                   <h2 className="font-bold text-blue-500 text-lg">
//                     Medications Mentioned:
//                   </h2>
//                   <div className="mt-2">
//                     <h2 className="">
//                       {record.report.medicationsMentioned.join(", ")}
//                     </h2>
//                   </div>
//                 </div>
//               )}

//               {record.report?.recommendations?.length > 0 && (
//                 <div className="mt-6">
//                   <h2 className="font-bold text-blue-500 text-lg">
//                     Recommendations:
//                   </h2>
//                   <div className="mt-2">
//                     <ul className="list-disc list-inside">
//                       {record.report.recommendations.map((rec, index) => (
//                         <li key={index} className="">
//                           {rec}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               )}

//               <div className="mt-6">
//                 <h2 className="font-bold text-blue-500 text-lg">Summary:</h2>
//                 <div className="mt-2">
//                   <p className="text-sm text-gray-600">
//                     {record.report?.summary}
//                   </p>
//                 </div>
//               </div>

//               {record.conversation?.length > 0 && (
//                 <div className="mt-6">
//                   <h2 className="font-bold text-blue-500 text-lg">
//                     Conversation History:
//                   </h2>
//                   <div className="mt-2 max-h-40 overflow-y-auto">
//                     {record.conversation.map((msg, index) => (
//                       <div key={index} className="mb-2 p-2 bg-gray-50 rounded">
//                         <span className="font-bold text-sm">
//                           {msg.role === "assistant" ? "AI:" : "User:"}
//                         </span>
//                         <span className="ml-2 text-sm">{msg.text}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </DialogDescription>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default ViewReportDialog;





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
import { SessionDetail } from "../medical-agent/[sessionId]/page";
import moment from "moment";

type Props = {
  record: SessionDetail;  // Update type here
};

function ViewReportDialog({ record }: Props) {
  console.log("Record:", record);
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="link" size="sm">
          View Report
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle asChild>
            <h2 className="text-center text-4xl">
              Medical AI Voice Agent Report
            </h2>
          </DialogTitle>
          <DialogDescription asChild>
            <div className="mt-10">
              <h2 className="font-bold text-blue-500 text-lg">Session Info:</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="">
                  <h2 className="">
                    <span className="font-bold">Doctor Specialization:</span>{" "}
                    {record.selectedDoctor?.specialist}
                  </h2>
                  <h2 className="">
                    <span className="font-bold">Agent Type:</span>{" "}
                    {record.report?.agent}
                  </h2>
                  <h2 className="">
                    Consult Date:{" "}
                    {moment(new Date(record?.createdOn)).fromNow()}
                  </h2>
                </div>
                <div className="">
                  <h2 className="">
                    <span className="font-bold">User:</span>{" "}
                    {record.report?.user}
                  </h2>
                  <h2 className="">
                    <span className="font-bold">Session ID:</span>{" "}
                    {record.sessionId?.substring(0, 8)}...
                  </h2>
                  <h2 className="">
                    <span className="font-bold">Notes:</span> {record.notes}
                  </h2>
                </div>
              </div>

              <div className="mt-6">
                <h2 className="font-bold text-blue-500 text-lg">
                  Medical Summary:
                </h2>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  <div className="">
                    <h2 className="">
                      <span className="font-bold">Chief Complaint:</span>{" "}
                      {record.report?.chiefComplaint}
                    </h2>
                  </div>
                  <div className="">
                    <h2 className="">
                      <span className="font-bold">Symptoms:</span>{" "}
                      {record.report?.symptoms?.join(", ") || "None specified"}
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="">
                      <h2 className="">
                        <span className="font-bold">Duration:</span>{" "}
                        {record.report?.duration}
                      </h2>
                    </div>
                    <div className="">
                      <h2 className="">
                        <span className="font-bold">Severity:</span>{" "}
                        {record.report?.severity}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>

              {record.report?.medicationsMentioned?.length > 0 && (
                <div className="mt-6">
                  <h2 className="font-bold text-blue-500 text-lg">
                    Medications Mentioned:
                  </h2>
                  <div className="mt-2">
                    <h2 className="">{record.report.medicationsMentioned.join(", ")}</h2>
                  </div>
                </div>
              )}

              {record.report?.recommendations?.length > 0 && (
                <div className="mt-6">
                  <h2 className="font-bold text-blue-500 text-lg">
                    Recommendations:
                  </h2>
                  <div className="mt-2">
                    <ul className="list-disc list-inside">
                      {record.report.recommendations.map((rec, index) => (
                        <li key={index} className="">
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <h2 className="font-bold text-blue-500 text-lg">Summary:</h2>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    {record.report?.summary}
                  </p>
                </div>
              </div>

              {record.conversation?.length > 0 && (
                <div className="mt-6">
                  <h2 className="font-bold text-blue-500 text-lg">
                    Conversation History:
                  </h2>
                  <div className="mt-2 max-h-40 overflow-y-auto">
                    {record.conversation.map((msg, index) => (
                      <div key={index} className="mb-2 p-2 bg-gray-50 rounded">
                        <span className="font-bold text-sm">
                          {msg.role === "assistant" ? "AI:" : "User:"}
                        </span>
                        <span className="ml-2 text-sm">{msg.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ViewReportDialog;
