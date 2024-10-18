"use client"
import Navbar from '@/app/_components/Navbar'
import React, { useState } from 'react'
import Round from '../_components/Round'
import Image from 'next/image'
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { apiconnector } from '@/config/apiconnector'
import { toast } from 'react-toastify'


const Page = () => {
    const [formData, setformData] = useState({ email: "", password: "", username: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, username } = formData;
        const toastId = toast.loading("Signing up...")
       try {
        const response = await apiconnector("POST","/api/auth/sign-up", { email, password, username });
        if(!response.data.success){
            toast.error(response.data.message)
            toast.dismiss(toastId)
            return
        }
        signIn("credentials", {
          email, password,
        }
        )

        toast.success("Account created successfully")

       } catch (error) {
        console.log(error)
        toast.error("Something went wrong")
       }finally {
       toast.dismiss(toastId)
       }

    }
  return (
    <>
    <Navbar />
    <div className='flex items-center justify-center h-screen relative'>

        <Image src="/auth/image1.png" alt="login" width={400} height={400} className=' absolute left-0 ' />
      <div className=' w-3/4 h-3/4 flex items-center justify-between  rounded-xl'>
        <div className=' w-1/2 h-full relative '>
        <Image src="/auth/image2.png" alt="login" width={400} height={400} className='  absolute  left-0 bottom-0' />
        </div>
        <div className=' w-1/2 h-full flex flex-col items-center justify-center px-10'>
        <div className=" w-full mx-auto p-4 border-2 my-20 rounded-xl shadow-lg">
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-semibold text-center bg-gradient-to-r from-emerald-500 to-yellow-400 text-transparent bg-clip-text my-2 py-1">
          Sign up
        </h1>

        <form onSubmit={handleSubmit}>
        <div className="flex flex-col my-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="email"
              className="w-full h-10 border rounded-xl p-2"
              placeholder="darkestcoder"
              onChange={(e) => setformData({ ...formData, username: e.target.value })}
              required
            />
          </div>
          <div className="flex flex-col my-3">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className="w-full h-10 border rounded-xl p-2"
              placeholder="darkestcoder@gmail.com"
              onChange={(e) => setformData({ ...formData, email: e.target.value })}
              required
            />
          </div>

         

          <div className="flex flex-col my-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="w-full h-10 border rounded-xl p-2"
              placeholder="Password"
              onChange={(e) => setformData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full h-10 bg-gradient-to-r from-emerald-500 to-yellow-400 text-white rounded-xl hover:shadow-lg transition duration-300"
          >
            Sign up
          </button>
        </form>

        <div className="mt-4 text-center">
      <div className="flex justify-center items-center">
        <div className="w-1/2 border-t border-gray-300"></div>
        <span className="px-4 text-gray-500">OR</span>
        <div className="w-1/2 border-t border-gray-300"></div>
      </div>
      </div>


        <button className="mt-4 text-center flex items-center justify-center space-x-2 w-full border py-2 rounded-xl"
        onClick={()=> signIn("google")}
           
        >
          <p className="text-gray-500">Sign up with google</p>
          <div className="flex justify-center items-center">
            <Link
              href="/auth/google"
              className="flex items-center justify-center  bg-white rounded-full hover:bg-gray-100 transition duration-300"
            >
                <FcGoogle />
              {/* <Image src="/google.svg" alt="Google" width={20} height={20} /> */}
            </Link>
          
      </div>
    </button>
    
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
        </div>
    </div>
      </div>
    </>
  )
}

export default Page