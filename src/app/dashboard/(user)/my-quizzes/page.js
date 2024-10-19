"use client";
import Navbar from "@/app/_components/Navbar";
import { db } from "@/config/DB";
import { quizzModel } from "@/config/Schema";
import { desc, eq } from "drizzle-orm";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formattedDate } from "@/lib/DateFormatter";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { apiconnector } from "@/config/apiconnector";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";

const Page = () => {
    const [quizz, setquizz] = useState([]);
  const { data: session } = useSession();
  const router = useRouter()
  useEffect(() => {
    const getAdminQuizz = async () => {
      try {
        const response = await db
          .select()
          .from(quizzModel)
          .where(eq(quizzModel?.createdBy, session?.user?.email))
          .orderBy(desc(quizzModel.createdAt));

       session && setquizz(response);
      } catch (error) {
        console.log(error);
      }
    };
    getAdminQuizz();
  }, [session]);


  const handleClick = async(data)=>{
    const toastId = toast.loading("Checking if you have already played this quizz")
    try {
        const response = await apiconnector("POST", "/api/already-played", {
            email: session?.user?.email, quizzId: data?.quizzId
        }
        )
        if(!response?.data?.success){
            toast.error("You have already played this quizz")
            toast.dismiss(toastId)
            return
        }
        router.push(`/quizz/${data.quizzId}`)
        
    } catch (error) {
        console.log(error)
    }
    toast.dismiss(toastId)
 }
  return (
    <div className=" max-w-screen-xl mx-auto ">
    <div >
     
      <Table>
        <TableCaption>A list of recent quizzes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Topic</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Play</TableHead>
            <TableHead>Created At</TableHead>

            
          </TableRow>
        </TableHeader>
        <TableBody>
       {
        quizz &&  quizz?.map((data, index)=>{
           return  <TableRow 
           key={index}
           className="cursor-pointer" 
           onClick={() => {
              handleClick(data)
           }}
         >
           <TableCell>{index + 1}</TableCell>
           <TableCell className="capitalize">{data?.topic}</TableCell>
           <TableCell className="capitalize">{data?.level}</TableCell>
           <TableCell>{data?.played}</TableCell>   
           <TableCell>{formattedDate(data?.createdAt)}</TableCell>
         </TableRow>
         
          })
       }
        </TableBody>
      </Table>
    </div>
  </div>
  )
}

export default Page