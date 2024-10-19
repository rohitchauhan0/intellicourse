import { User } from "@/model/user";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try {
        const allUser = await User.find().select("_id username email quizz").lean();

        const result = allUser.map(user => ({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            username: user.username,
            quizCount: Array.isArray(user.quizz) ? user.quizz.length : 0
        })).sort((a, b) => b.quizCount - a.quizCount); 

        return NextResponse.json({ result });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
