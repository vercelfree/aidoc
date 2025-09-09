import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const user = await currentUser();
    

    try{        
        //check user already exits
        const users = await db.select().from(usersTable)
        //@ts-ignore
        .where(eq(usersTable.email,user?.primaryEmailAddress?.emailAddress))
        //create new user
        if(users?.length==0){
            const result = await db.insert(usersTable).values({
                //@ts-ignore
                name:user?.fullName,
                email:user?.primaryEmailAddress?.emailAddress,
                credits:10
                
                //@ts-ignore
            }).returning({ usersTable })
            return NextResponse.json(result[0]?.usersTable);
        }
        return NextResponse.json(users[0]);
        //user not exits
    }
    catch (e) {
        return NextResponse.json(e);
    }
    
}