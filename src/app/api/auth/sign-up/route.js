import { User } from "@/model/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connectWithDb } from "@/config/database";


connectWithDb();
export const POST = async(req)=>{
    try {
        const {username, password, email} = await req.json();
        console.log(username, password, email);
       const userExist = await User.findOne({username});
       if(userExist){
        return NextResponse.json({message:"User already exist",
    success:false});
       }

       const hashedPassword = await bcrypt.hash(password, 10);

       const user = new User({username, password:hashedPassword, email, role:"user"});
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