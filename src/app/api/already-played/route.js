import { connectWithDb } from "@/config/database"
import { User } from "@/model/user"
import { NextResponse } from "next/server"


connectWithDb()
export const POST = async (req) => {
    try {
        const {email, quizzId} = await req.json()

        const existUser = await User.findOne({email: email})
        const alreadyPlayed = existUser?.quizz?.includes(quizzId)
        if(alreadyPlayed) {
            return NextResponse.json({
                success:false
            })
        }

        return NextResponse.json({
            success:true
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:false
        })
    }
}