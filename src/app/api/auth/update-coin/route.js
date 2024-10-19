import { User } from "@/model/user"
import { NextResponse } from "next/server"

export const POST = async(req)=>{
    try {
        const {email} = await req.json()
       const coins = await User.findOne({email})

       if(coins){
        const newCoin = coins.coins - 10
        await User.updateOne({email},{coins:newCoin}, {new:true})
       }

       return NextResponse.json({success:true})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Error"})
    }
}