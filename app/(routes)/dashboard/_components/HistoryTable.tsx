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
import { SessionDetail } from "../medical-agent/[sessionId]/page";
import { Button } from "@/components/ui/button";
import moment from "moment";
import ViewReportDialog from "./ViewReportDialog";

type Props = {
  historyList: SessionDetail[];
};
function HistoryTable({ historyList }: Props) {
  console.log(historyList);
  return (
    <div>
      <Table>
        <TableCaption>Previous Consultation Reports</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>AI Medical Specialist</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {historyList
            .filter((record) => record.selectedDoctor)
            .map((record: SessionDetail, index: number) => (
              <TableRow key={record.id || index}>
                <TableCell className="font-medium">
                  {record.selectedDoctor.specialist}
                </TableCell>
                <TableCell>{record.notes}</TableCell>
                <TableCell>
                  {moment(new Date(record.createdOn)).fromNow()}
                </TableCell>
                <TableCell className="text-right">
                  <ViewReportDialog record={record}/>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default HistoryTable;
