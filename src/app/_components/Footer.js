import { GithubIcon, Linkedin, TwitterIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Course", path: "/courses" },
    { name: "Quizzes", path: "/quizz" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    {
      name: "Github",
      path: "https://github.com/intellicourse",
      icon: <GithubIcon className="h-6 w-6" />,
    },
    {
      name: "Twitter",
      path: "https://twitter.com/intellicourse",
      icon: <TwitterIcon className="h-6 w-6" />,
    },
    {
      name: "LinkedIn",
      path: "https://www.linkedin.com/company/intellicourse",
      icon: <Linkedin className="h-6 w-6" />,
    },
  ];

  return (
    <footer className="py-10 bg-emerald-400 text-white  rounded-t-3xl  w-full ">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold mb-2">Intellicourse</h1>
          <p className="mt-2 text-lg">
            A new way to learn, powered by AI. Enhance your learning experience
            with intelligent AI.
          </p>
        </div>

        <div className="flex mb-5 flex-col items-center text-center">
          <h2 className="my-1 text-2xl font-bold ">Quick Links</h2>
          <nav>
            {navLinks.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="block text-xl p-2 rounded-full transition-colors duration-300 hover:bg-yellow-300 hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center text-center">
          <h2 className="my-2 text-2xl font-bold ">Follow Us</h2>
          <div className="flex flex-col items-center">
            {socialLinks.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="flex items-center gap-2 text-xl p-2 rounded-full transition-colors duration-300 hover:bg-yellow-300 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center  w-full">
        <p className="bg-yellow-300 w-full text-center p-3 rounded-xl font-bold">
          Copyright &copy; {new Date().getFullYear()} Intellicourse. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;