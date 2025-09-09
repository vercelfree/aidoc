// import { db } from "@/config/db";
// import { SessionChatTable } from "@/config/schema";
// import { currentUser } from "@clerk/nextjs/server";
// import { NextRequest, NextResponse } from "next/server";
// import { v4 as uuidv4 } from 'uuid'

// export async function POST(req:NextRequest) {

//     const {notes, selectedDoctor} = await req.json();

//     try{
//         const sessionId = uuidv4();
//         const user = await currentUser();
//         const result = await db.insert(SessionChatTable).values({
//             sessionId: sessionId,
//             createdBy:user?.primaryEmailAddress?.emailAddress,
//             notes: notes,
//             selectedDoctor: selectedDoctor,
//             createdOn: (new Date()).toString()
//             //@ts-ignore
//         }).returning({SessionChatTable});
//         return NextResponse.json(result[0]?.sessionChatTable);
//     }catch(e)
//         {
//             NextResponse.json(e)
//         }

// }

import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { X } from "lucide-react";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { eq, desc } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { notes, selectedDoctor } = await req.json();

    // Validate input
    if (!notes || !selectedDoctor) {
      return NextResponse.json(
        { error: "Missing required fields: notes and selectedDoctor" },
        { status: 400 }
      );
    }

    const sessionId = uuidv4();
    const user = await currentUser();

    if (!user?.primaryEmailAddress?.emailAddress) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    console.log("Creating session with:", {
      sessionId,
      userEmail: user.primaryEmailAddress.emailAddress,
      notes,
      selectedDoctor,
    });

    const result = await db
      .insert(SessionChatTable)
      .values({
        sessionId: sessionId,
        createdBy: user.primaryEmailAddress.emailAddress,
        notes: notes,
        selectedDoctor: selectedDoctor,
        createdOn: new Date().toISOString(), // Use ISO string instead of toString()
        conversation: null, // Initialize as null
        report: null, // Initialize as null
      })
      .returning();

    console.log("Database insert result:", result);

    // Return the session data properly
    return NextResponse.json({
      success: true,
      sessionId: sessionId,
      data: result[0],
    });
  } catch (error) {
    console.error("Session chat API error:", error);

    // Return proper error response
    return NextResponse.json(
      {
        error: "Failed to create session",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  const user = await currentUser();

  if (sessionId == "all") {
    const result = await db
      .select()
      .from(SessionChatTable)
      //@ts-ignore
      .where(eq(SessionChatTable.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(SessionChatTable.id));
    return NextResponse.json(result);
  } else {
    const result = await db
      .select()
      .from(SessionChatTable)
      //@ts-ignore
      .where(eq(SessionChatTable.sessionId, sessionId));

    return NextResponse.json(result[0]);
  }
}
