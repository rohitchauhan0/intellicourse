"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { NAVBAR_LINK } from "@/data/NavbarLinks";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { apiconnector } from "@/config/apiconnector";
import { UserCoinContext } from "../context/UserCoins";

const Navbar = () => {
    const { data: session } = useSession();
    const [coins, setcoins] = useState(0);

    useEffect(() => {
      const fetchCoins = async () => {
        try {
          const res = await apiconnector("POST", "/api/auth/get-user", {
            email: session?.user?.email,
          });
          setcoins(res?.data?.user?.coins);
        } catch (error) {
          console.log(error);
        }
      };
      session && fetchCoins();
    }, [session]);
  return (

     <div className=" w-full fixed top-0 z-[1000] bg-white ">
      <div className=" w-full max-w-screen-xl mx-auto ">
        <div className="flex items-center justify-between p-1 ">
          <div className="flex items-center space-x-10">
            <Logo />
            <div>
              {NAVBAR_LINK.map((link) => (
                <Link
                  key={link.id}
                  href={link.link}
                  className="text-lg  cursor-pointer px-4 py-2 hover:bg-gray-200 rounded-lg"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-5">
            <div className=" flex items-center space-x-1">
              <span className=" font-semibold">{coins}</span>
              <Image
                src={"/coin.gif"}
                height={50}
                width={50}
                className=" h-8 w-8 rounded-full"
              />
            </div>
            <div>
              {session ? (
                <Link
                  href={
                    session?.user?.role == "user"
                      ? "/dashboard/my-courses"
                      : "/dashboard/create-course"
                  }
                >
                  {session?.user?.picture ? (
                    <Image
                      src={session?.user?.picture}
                      alt="profile"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  )}
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="text-lg  px-4 py-2 bg-gradient-to-r from-yellow-400 to-green-500 text-white rounded-lg hover:scale-105 transition-all duration-200 "
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Navbar;
