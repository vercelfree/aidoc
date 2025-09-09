import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/config/OpenAIModel";
import { SessionChatTable } from "@/config/schema";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";




const REPORT_GEN_PROMPT = `You are an Al Medical Voice Agent that just finished a voice conversation with a user. Based on depends on doctor AI agent info and Conversation between AI medical agent and user, generate a structured report with the following fields:
1. sessionid: a unique session identifier
2. agent: the medical specialist name (e.g., "General Physician Al")
3. user: name of the patient or "Anonymous" if not provided
4. timestamp: current date and time in ISO format
5. chiefComplaint: one-sentence summary of the main health concern
6. summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations
7. symptoms: list of symptoms mentioned by the user
8. duration: how long the user has experienced the symptoms
9. severity: mild, moderate, or severe
10. medications Mentioned: list of any medicines mentioned
11. recommendations: list of Al suggestions (e.g., rest, see a doctor)
Return the result in this JSON format:
{ "sessionId": "string",
"agent": "string",
"user": "string"
"timestamp": "ISO Date string",
"chief Complaint": "string",
"summary": "string",
"symptoms": ["symptom1", "symptom2"],
"duration": "string",
"severity": "string",
"medicationsMentioned": ["med1", "med2"],
"recommendations": ["rec1", "rec2"],
Only include valid fields. Respond with nothing else.`

export async function POST(req: NextRequest) {
  const { sessionId, sessionDetail, messages } = await req.json();
  try {
    const UserInput  = "AI Doctor Agent Info :"+JSON.stringify(sessionDetail)+",Conversation:"+JSON.stringify(messages);
    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat-v3.1:free",
      messages: [
        { role: "system", content: REPORT_GEN_PROMPT },
        {
          role: "user",
          content: UserInput },
      ],
    });

    const rawResp = completion.choices[0].message?.content;

    if (!rawResp) {
      console.error("No response from AI");
      return NextResponse.json([]);
    }

    // Clean the response
    console.log("Raw Response:", rawResp);
    const cleanResp = rawResp
      .trim()
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let JSONResp;
    try {
      JSONResp = JSON.parse(cleanResp);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Raw Response:", rawResp);
      return NextResponse.json([]);
    }


    // Save to Database
    const result = await db.update(SessionChatTable).set({
            report: JSONResp,
            conversation:messages
    }).where(eq(SessionChatTable.sessionId, sessionId));
    
    return NextResponse.json (JSONResp)
    // Ensure we return an array
    // if (Array.isArray(JSONResp)) {
    //   return NextResponse.json(JSONResp);
    // } else if (JSONResp && Array.isArray(JSONResp.doctors)) {
    //   return NextResponse.json(JSONResp.doctors);
    // } else if (JSONResp && Array.isArray(JSONResp.suggestedDoctors)) {
    //   return NextResponse.json(JSONResp.suggestedDoctors);
    // } else {
    //   console.error("Unexpected response structure:", JSONResp);
    //   return NextResponse.json([]);
    // }
  } catch (e) {
    return NextResponse.json(e);
  }
}
