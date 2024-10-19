import { connectWithDb } from "@/config/database"
import { User } from "@/model/user"
import { NextResponse } from "next/server"

connectWithDb()

export const POST = async (req) => {
    try {
        const { email, quizzId, score } = await req.json();

        // Validate score to ensure it's a number
        if (isNaN(score)) {
            throw new Error("Invalid score value");
        }

        const userExist = await User.findOne({ email });
        const currentQuizzAns = parseInt(userExist?.quizzAns) || 0;  // Default to 0 if quizzAns is undefined or NaN

        // Update the quizz array
        await User.findOneAndUpdate(
            { email },
            { $push: { quizz: quizzId } },
            { new: true }
        );

        // Update quizzAns with validated score
        await User.findOneAndUpdate(
            { email },
            { quizzAns: currentQuizzAns + parseInt(score) }
        );

        return NextResponse.json({ message: "success" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "error", error: error.message });
    }
};
