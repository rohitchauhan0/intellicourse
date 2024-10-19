import { User } from "@/model/user"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {
        const {email} = await req.json()
        console.log(email)
        const user = await User.findOne({email})
        if(!user) return new Response(JSON.stringify({message: "User not found"}), {status: 404})
        return NextResponse.json({
            message: "User found",
            user
            })
    } catch (error) {
        console.log(error)
        return NextResponse({
            message: "Something went wrong",
            error
        })
    }
}