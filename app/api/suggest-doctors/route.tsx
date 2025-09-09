import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/config/OpenAIModel";
import { AIDoctorAgents } from "@/shared/list";

export async function POST(req: NextRequest) {
    const { notes } = await req.json();
    
    try {
        const completion = await openai.chat.completions.create({
            model: "deepseek/deepseek-chat-v3.1:free",
            messages: [
                { role: 'system', content: JSON.stringify(AIDoctorAgents) },
                { 
                    role: "user", 
                    content: `User Notes/Symptoms: ${notes}. Based on user notes and symptoms, please suggest a list of doctors. Return the response as a JSON array of doctor objects only, with no additional text or formatting.` 
                }
            ],
        });

        const rawResp = completion.choices[0].message?.content;
        
        if (!rawResp) {
            console.error("No response from AI");
            return NextResponse.json([]);
        }

        // Clean the response
        const cleanResp = rawResp.trim()
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim();

        let JSONResp;
        try {
            JSONResp = JSON.parse(cleanResp);
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError);
            console.error("Raw Response:", rawResp);
            return NextResponse.json([]);
        }

        // Ensure we return an array
        if (Array.isArray(JSONResp)) {
            return NextResponse.json(JSONResp);
        } else if (JSONResp && Array.isArray(JSONResp.doctors)) {
            return NextResponse.json(JSONResp.doctors);
        } else if (JSONResp && Array.isArray(JSONResp.suggestedDoctors)) {
            return NextResponse.json(JSONResp.suggestedDoctors);
        } else {
            console.error("Unexpected response structure:", JSONResp);
            return NextResponse.json([]);
        }
        
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Failed to get doctor suggestions" }, { status: 500 });
    }
}