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
import { notesModel, quizzModel } from '@/config/Schema'
import { notesAiModal } from '@/config/NotesModel'
import { useRouter } from 'next/navigation'
const Page = () => {
    const {data: session} = useSession()
    const [notesData, setnotesData] = useState({
        topic: "",
        language:"English",
        pages: 0,
    })

    const router = useRouter()
    const notesGenerator = async () => {
        try {
            const prompt = `Generate notes on the topic "${notesData?.topic}" in ${notesData?.language} language. The response should be exactly ${notesData?.pages} pages long and in pure JSON format. Do not include any extra words, explanations, or formatting such as backticks or commas outside of the JSON format. Only provide valid JSON and don't use any hashtag and any other special character`;
    
            // Send the prompt to the AI model
            const response = await notesAiModal.sendMessage(prompt);
    
            // Assuming response.text() gives you the raw JSON string
            let notesText = response?.response?.text(); 
    
            // Try to parse the response to validate if it's proper JSON
            try {
                const parsedNotes = JSON.parse(notesText);
    
                // Save parsed notes to the database (example code)
                const newNotes = await db.insert(notesModel).values({
                    topic: notesData.topic,
                    language: notesData.language,
                    pages: notesData.pages,
                    note: parsedNotes,  // use parsed notes here
                    createdBy: session?.user?.email,
                    role: session?.user?.role,
                });
    
                console.log("Notes saved successfully:", newNotes);
            } catch (jsonError) {
                console.error("Error parsing JSON:", jsonError);
            }
        } catch (error) {
            console.error("Error generating or saving notes:", error);
        }
    };
    
    

    const handleSubmit = async() => {
        const toastId = toast.loading("Creating Notes")
        try {
        await    notesGenerator()

        toast.success("Notes Created Successfully")
        router.push("/dashboard/my-notes")
        } catch (error) {
            console.log(error)
        }finally{
            toast.dismiss(toastId)
        }
    }
  return (
    <div>
    <h1 className=' text-3xl font-semibold text-center'>Create Notes</h1>

    <div className=' w-full flex items-center flex-col justify-center px-20 py-10'>

        <div className="my-5 flex flex-col space-y-4 w-full">
            <Label className="text-sm sm:text-xl">
                Write a topic on which you want to create notes
            </Label>
            <Textarea
                placeholder="Enter topic"
                className=" w-full"
                onChange={(e) => setnotesData({...notesData, topic: e.target.value})}
            />
        </div>



        <div className="my-5 flex flex-col space-y-4 w-full">
            <Label className="text-sm sm:text-xl">Choose number of pages</Label>
            <Select
                onValueChange={(value) => setnotesData({...notesData, pages: value})}
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
            Create Note
        </button>

    </div>
</div>
  )
}

export default Page