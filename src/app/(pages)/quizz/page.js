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
  const [quizzByNumber, setquizzByNumber] = useState([])
  const [pointsByQuizz, setpointsByQuizz] = useState([])
  const router = useRouter()
  useEffect(() => {
    const getAdminQuizz = async () => {
      try {
        const response = await db
          .select()
          .from(quizzModel)
          .where(eq(quizzModel.role, "admin"))
          .orderBy(desc(quizzModel.createdAt));

        setquizz(response);
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

 const getQuizzNumber = async ()=>{
     try {
        const response = await apiconnector("GET", "/api/leaderboard/number-of-quizzes")
        console.log(response?.data)
        const response2 = await apiconnector("GET", `/api/leaderboard/points-of-quizzes`)
        setquizzByNumber(response?.data?.result)
        setpointsByQuizz(response2?.data?.response)
     } catch (error) {
        console.log(error)
     }
 }

 useEffect(()=>{
    getQuizzNumber()
 },[])


  return (
    <>
      <Navbar />

      <div className=" w-full">
        <div>
        </div>
        <div className=" max-w-screen-xl mx-auto py-32 flex  justify-between space-x-10">
          <div className=" w-1/2 ">
            <button onClick={()=> {
                if(!session){
                    toast.error("You need to be logged in to create a quizz")
                    return
                }
                router.push("/quizz/create-quizz")
            }} className=" bg-gradient-to-r from-emerald-400 to-lime-500 hover:from-lime-500 hover:to-emerald-500 px-4 py-2 rounded-md text-white my-4 flex items-center space-x-3">Create a quizz <Plus/></button>
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

          <div className=" w-1/2 px-20 flex flex-col space-y-20">
            <div className="flex flex-col space-y-4 border border-gray-300 rounded-xl p-9 max-h-[600px] overflow-y-scroll" >
                <h2 className="text-2xl font-bold text-center">Number of quizzes</h2>
                {
                    quizzByNumber?.map((data, index)=>{
                        return <div className="flex items-center space-x-4 justify-between border rounded-xl p-2">
                           <div className=" flex items-center space-x-4">
                           <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-lime-500 hover:from-lime-500 hover:to-emerald-500">
                                <div className="text-white text-center text-2xl font-bold">{index + 1}</div>
                            </div>
                                <div className="font-bold text-lg">{data?.username}</div>
                           </div>
                            <div className=" flex items-center space-x-5">
                                <span className=" font-bold">{data?.quizCount}</span>
                                <Image src={"/star.gif"}  width={90} height={90} className=" h-8 w-8 rounded-full"/>
                            </div>
                        </div>
                    }
                    )
                }
            </div>


            <div className="flex flex-col space-y-4 border border-gray-300 rounded-xl p-9 max-h-[600px] overflow-y-scroll" >
                <h2 className="text-2xl font-bold text-center">Points of quizzes</h2>
                {
                    pointsByQuizz?.map((data, index)=>{
                        return <div className="flex items-center space-x-4 justify-between border rounded-xl p-2">
                           <div className=" flex items-center space-x-4">
                           <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-lime-500 hover:from-lime-500 hover:to-emerald-500">
                                <div className="text-white text-center text-2xl font-bold">{index + 1}</div>
                            </div>
                                <div className="font-bold text-lg">{data?.username}</div>
                           </div>
                            <div className=" flex items-center space-x-5">
                                <span className=" font-bold">{data?.quizzAns}</span>
                                <Image src={"/star.gif"}  width={90} height={90} className=" h-8 w-8 rounded-full"/>
                            </div>
                        </div>
                    }
                    )
                }
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
