"use client"
import localFont from "next/font/local";
import "./globals.css";
import { Outfit } from "next/font/google";
import NextAuthProvider from "./_components/Nextauth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserCoinContext } from "./context/UserCoins";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { apiconnector } from "@/config/apiconnector";
import Provider from "./_components/Provider";
import Footer from "./_components/Footer";



const outfit = Outfit({ subsets: ["latin"] });
export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <body className={outfit.className}>
        <NextAuthProvider>
        <Provider>
       

          {children}
          <ToastContainer />
          <Footer/>
       

        </Provider>
      
        </NextAuthProvider>
      </body>
    </html>
  );
}
