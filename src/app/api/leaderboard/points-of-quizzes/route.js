import { connectWithDb } from "@/config/database"
import { User } from "@/model/user"
import { NextResponse } from "next/server"

connectWithDb()
export const GET = async (req) => {
    try {
        const response = await User.find().sort({quizzAns: -1}).exec()
        return NextResponse.json({response})

        
    } catch (error) {
        console.log(error)
        return NextResponse.json({error})
    }
}