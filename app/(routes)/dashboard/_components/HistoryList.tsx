"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AddNewSessionDialog from "./AddNewSessionDialog";
import axios from "axios";
import HistoryTable from "./HistoryTable";

function HistoryList() {
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    GetHistoryList();
  }, []);

  const GetHistoryList = async () => {
    const result = await axios.get("/api/session-chat?sessionId=all");
    console.log(result.data);
    setHistoryList(result.data);
  };
  return (
    <div className="mt-10">
      {historyList.length == 0 ? (
        <div className="flex items-center flex-col justify-center p-7 border-dashed rounded-2xl border-2">
          <Image
            src={"/medical-assistance.png"}
            alt="empty"
            width={150}
            height={150}
          />

          <h2 className="font-bold text-xl mt-2">No Recent Consultations</h2>
          <p>It looks like you haven't consulted with any doctors yet</p>
          <AddNewSessionDialog />
        </div>
      ) : (
        <div className="">
           <HistoryTable historyList={historyList}/>
        </div>
      )}
    </div>
  );
}

export default HistoryList;
