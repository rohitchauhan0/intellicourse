import Navbar from "@/app/_components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GithubIcon, Instagram, Linkedin, TwitterIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Contact = () => {
  const socialLinks = [
    {
      name: "Github",
      path: "https://github.com/intellicourse",
      icon: <GithubIcon className="h-8 w-8" />,
    },
    {
      name: "Twitter",
      path: "https://twitter.com/intellicourse",
      icon: <TwitterIcon className="h-8 w-8" />,
    },
    {
      name: "LinkedIn",
      path: "https://www.linkedin.com/company/intellicourse",
      icon: <Linkedin className="h-8 w-8" />,
    },
    {
      name: "Instagram",
      path: "https://www.instagram.com/intellicourse",
      icon: <Instagram className="h-8 w-8" />,
    },
  ];

  return (
   <>
   <Navbar/>
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full mt-5 p-6 rounded-3xl shadow-lg border-2 py-10">
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-5xl font-bold text-yellow-400 mb-2">
            Get in Touch
          </h1>
          <p className="text-emerald-600 font-semibold text-lg text-center">
            Have questions or suggestions? We’d love to hear from you!
          </p>
        </div>

        <div className="text-emerald-600 font-bold">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <Label>First Name</Label>
                <Input
                  placeholder="Enter your first name"
                  className="w-full"
                  required
                />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input
                  placeholder="Enter your last name"
                  className="w-full"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                className="w-full"
                required
              />
            </div>

            <div className="mb-4">
              <Label>Message</Label>
              <Textarea
                placeholder="Type your message here..."
                className="w-full"
                required
              />
            </div>

            <Button className="w-full bg-gradient-to-r from-emerald-500 to-yellow-400 hover:from-yellow-400 hover:to-emerald-500 transition-all duration-300 ease-in-out">
              Send Message
            </Button>
          </form>

          <hr className="h-1 w-full bg-gradient-to-r from-emerald-500 to-yellow-400 mt-5" />

          <div className="flex flex-wrap gap-4 items-center justify-center my-5">
            {socialLinks.map((link, index) => (
              <Link
                href={link.path}
                key={index}
                className="p-3 border-2 border-emerald-500 rounded-full hover:bg-yellow-500 transition-all duration-200 ease-in-out"
              >
                {link.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
   </>
  );
};

export default Contact;