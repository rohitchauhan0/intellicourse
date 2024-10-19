"use client"
import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { db } from '@/config/DB'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { quizzModel } from '@/config/Schema'
import { quizzAIModel } from '@/config/QuizzModel'


const Page = () => {
    const {data: session} = useSession()
    const [quizzInput, setQuizzInput] = useState({
        topic: "",
        level: "",
        number: 0,
    })
    const [question, setQuestion] = useState()

    const generateQuestionLayout = async () => {
        try {
            const prompt = `give me ${quizzInput.number} questions on ${quizzInput.topic} of ${quizzInput.level} level and also give its 4 options and also having one right answer in json format and don't use any other word and comma`
            const response = await quizzAIModel.sendMessage(prompt)
            const data = await response.response?.text() 
            setQuestion(data)



            const response2 = await db.insert(quizzModel).values({
                topic: quizzInput.topic,
                level: quizzInput.level,
                number: quizzInput.number,
                question:JSON.parse(data),
                createdBy: session?.user?.email,
                role: session?.user?.role,
            })
            console.log("response", response2)
            toast.success("Quiz created successfully")

           
        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = async () => {
        const toastId = toast.loading("Creating quiz")
        try {
            // Check if required fields are present
            if (!quizzInput.topic || !quizzInput.level || !quizzInput.number) {
                toast.error("Please fill in all fields.")
                return
            }

            await generateQuestionLayout()
        } catch (error) {
            console.error("Error creating quiz:", error)
            toast.error("Failed to create quiz.")
        } finally {
            toast.dismiss(toastId)
        }
    }

    return (
        <div>
            <h1 className=' text-3xl font-semibold text-center'>Create a Quiz</h1>

            <div className=' w-full flex items-center flex-col justify-center px-20 py-10'>

                <div className="my-5 flex flex-col space-y-4 w-full">
                    <Label className="text-sm sm:text-xl">
                        Write a topic on which you want to create a quiz
                    </Label>
                    <Textarea
                        placeholder="Enter topic"
                        className=" w-full"
                        onChange={(e) => setQuizzInput({...quizzInput, topic: e.target.value})}
                    />
                </div>

                <div className="my-5 flex flex-col space-y-4 w-full">
                    <Label className="text-sm sm:text-xl">Choose quiz level</Label>
                    <Select
                        onValueChange={(value) => setQuizzInput({...quizzInput, level: value})}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="my-5 flex flex-col space-y-4 w-full">
                    <Label className="text-sm sm:text-xl">Choose number of questions</Label>
                    <Select
                        onValueChange={(value) => setQuizzInput({...quizzInput, number: parseInt(value)})}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Number" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
                                    <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>

                <button
                    onClick={handleSubmit}
                    className=' bg-gradient-to-r from-yellow-500 via-cyan-500 text-white to-emerald-400  px-10 py-2 rounded-xl mt-10'>
                    Create Quiz
                </button>

            </div>
        </div>
    )
}

export default Page
