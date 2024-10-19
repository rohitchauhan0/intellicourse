import React from "react";
import Navbar from "./_components/Navbar";
import Image from "next/image";
import CTAbutton from "./_components/CTAbutton";
import * as motion from "framer-motion/client";
import HomeCard from "./_components/HomeCard";
import WorkCard from "./_components/Working-card";

const Page = () => {
  return (
    <div className=" w-full min-h-screen">
      <Navbar />

      <div className=" max-w-screen-xl mx-auto flex items-center justify-between min-h-screen">
        <div className=" w-1/2 flex  justify-center flex-col space-y-7">
          <h1 className=" text-7xl font-bold px-8">
            <span className="text-yellow-400">Take your time</span> and learn
            from anywhere
          </h1>
          <p className=" px-8 text-gray-500 flex ">
            Transform your educational journey with our smart education
            platform, harnessing the power of AI to deliver personalized
            learning experiences, real-time feedback, and interactive tools
            designed to inspire and engage students.
          </p>

          <div className=" px-10">
            <CTAbutton text="Get Started" />
          </div>
        </div>

        <div className=" w-1/2 flex justify-center relative">
          <Image src="/home.png" width={500} height={500} alt="hero" />
          <motion.div
            initial={{ x: 0, y: 0 }}
            transition={{ duration: 1.5 }}
            whileInView={{ x: 500, y: -500 }}
            className=" absolute bottom-0 left-0 z-30"
          >
            <Image
              src="/aeroplane.png"
              width={500}
              height={500}
              alt="hero"
              className=" h-20 w-20"
            />
          </motion.div>
        </div>
      </div>

      <div className=" max-w-screen-xl mx-auto min-h-screen flex items-center justify-center relative">
        <HomeCard
          title={"AI Course Generation"}
          desc={
            "AI-powered course generation and customization, tailored to individual learning needs and preferences, ensuring a seamless and engaging learning experience."
          }
          xPos={200}
          yPos={300}
          bordercolor={"border-yellow-400"}
        />

        <HomeCard
          title={"AI Notes Generation"}
          bordercolor={"border-red-400"}
          desc={
            "Our AI-driven notes generation feature simplifies the study process by automatically summarizing course materials. "
          }
          xPos={400}
          yPos={0}
        />

        <HomeCard
          title={"AI Quizzes"}
          bordercolor={"border-green-400"}
          desc={
            "To reinforce learning, IntelliCourse offers AI-generated quizzes that adapt to the users progress. These quizzes provide immediate feedback and are designed to challenge users while reinforcing their understanding of course material."
          }
          xPos={200}
          yPos={-300}
        />

        <HomeCard
          title={"Leader Dashboard"}
          bordercolor={"border-orange-400"}
          desc={
            "The Leader Dashboard offers educators and course creators comprehensive insights into student performance and engagement. "
          }
          xPos={-300}
          yPos={-300}
        />

        <HomeCard
          title={"Course Updates"}
          bordercolor={"border-purple-400"}
          desc={
            "ntelliCourse keeps its content fresh and relevant by regularly updating courses with the latest information and industry trends."
          }
          xPos={-400}
          yPos={0}
        />

        <HomeCard
          title={" Coin System"}
          bordercolor={"border-pink-400"}
          desc={
            "To encourage engagement, IntelliCourse introduces a coin system that rewards users for completing courses and quizzes."
          }
          xPos={-200}
          yPos={300}
        />

        <motion.div
          initial={{ scale: 0 }}
          transition={{ duration: 1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className=" h-80 w-80 rounded-full border-2 border-gray-400 flex items-center justify-center "
        >
          <h2 className=" text-3xl font-semibold text-gray-500">
            Amazing Features <br /> about Intelli Course
          </h2>
        </motion.div>
      </div>

      <div className=" max-w-screen-xl mx-auto min-h-screen py-10 ">
        <h1 className=" text-7xl font-semibold text-gray-500 max-w-xl mx-auto text-center mt-20">
          How It Works?
        </h1>
        <div className=" py-20 flex items-center justify-between">
          <div className=" w-1/2">
            <Image
              src={"/how-it-work.png"}
              width={400}
              height={400}
              className=" h-full w-full"
            />
          </div>

          <div className=" w-1/2 flex flex-col  items-center space-y-6">
            <WorkCard
              head={"Select the Subject"}
              para={"Select the subject you want to learn about."}
              index={1}
            />

            <WorkCard
              head={"Enter the Topic"}
              para={"Specify the topic within your selected subject area."}
              index={2}
            />

            <WorkCard
              head={"Select the Level"}
              para={
                "Choose difficulty level: beginner, intermediate, or advanced."
              }
              index={3}
            />

            <WorkCard
              head={"Select the Duration"}
              para={
                "Determine the course length: short or long duration."
              }
              index={4}
            />

            <WorkCard
              head={"Select the Lectures"}
              para={
                "Pick specific lectures to include in your course."
              }
              index={5}
            />
            <WorkCard
              head={"Check the Course"}
              para={
                "Review all course details before finalizing."
              }
              index={6}
            />
            <WorkCard
              head={"Publish It"}
              para={
                "Finalize and publish your course for learners.."
              }
              index={7}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
