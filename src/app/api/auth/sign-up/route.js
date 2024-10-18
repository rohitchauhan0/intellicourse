import { User } from "@/model/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async(req)=>{
    try {
        const {username, password, email} = req.json();
       const userExist = await User.findOne({username});
       if(userExist){
        return NextResponse.json({message:"User already exist",
    success:false});
       }

       const hashedPassword = await bcrypt.hash(password, 10);

       const user = new User({username, password:hashedPassword, email});
       await user.save();
       return NextResponse.json({
        message:"User created successfully",
        success:true
       })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message:"Something went wrong",
            success:false
        })
    }
}