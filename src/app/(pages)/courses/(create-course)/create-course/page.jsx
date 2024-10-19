"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisIcon,
  LibraryIcon,
  ScrollTextIcon,
} from "lucide-react";
import React, { useState } from "react";
import SelectCategory from "./components/SelectCategory";
import TopicDesc from "./components/TopicDesc";
import SelectOption from "./components/SelectOption";
import { UserInputContext } from "@/app/context/UserInputContext";
import LoadingDialog from "./components/LoadingDialog";

import uuid4 from "uuid4";
import { useRouter } from "next/navigation";
import { GenerateCourseLayout_AI } from "@/config/AIModel";
import { CourseList } from "@/config/Schema";
import { useSession } from "next-auth/react";
import { db } from "@/config/DB";
import { apiconnector } from "@/config/apiconnector";
import Navbar from "@/app/_components/Navbar";

const CreateCourse = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const {data:session} = useSession()
  const [imageLink, setimageLink] = useState(null)

  const router = useRouter();

  const { userCourseInput, setUserCourseInput } = React.useContext(
    UserInputContext
  );

  const StepperOption = [
    {
      id: 1,
      name: "Category",
      icon: <LibraryIcon />,
    },

    {
      id: 2,
      name: "Topic & Desc.",
      icon: <ScrollTextIcon />,
    },

    {
      id: 3,
      name: "Options",
      icon: <EllipsisIcon />,
    },
  ];

  const GenerateCourseLayout = async () => {
    setLoading(true);
    const BASIC_PROMPT =
      "Generate A Course Tutorial on the following  Details with fields such as Course Name, Description, Chapter Name, about, and Duration:";

    const USER_INPUT_PROMPT =
      " Category: " +
      userCourseInput?.category +
      ", topic: " +
      userCourseInput?.topic +
      ", description: " +
      userCourseInput?.description +
      ", level: " +
      userCourseInput?.difficulty +
      ", duration: " +
      userCourseInput?.duration +
      ", no. of chapters: " +
      userCourseInput?.chapters +
      ", in JSON format.";

    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;

    console.log(FINAL_PROMPT);

    const res = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);


    setLoading(false);
    SaveCourseLayoutInDB(JSON.parse(res.response?.text()));
  };

 
  const SaveCourseLayoutInDB = async (courseLayout) => {
    var id = uuid4();

    setLoading(true);
  
    const res = await db.insert(CourseList).values({
      courseId: id,
      name: userCourseInput?.topic,
      level: userCourseInput?.difficulty,
      category: userCourseInput?.category,
      courseOutput: courseLayout,
      createdBy: session?.user?.email,
      role: session?.user?.role,

    });

    router.push(`/dashboard/create-course/${id}`);

    setLoading(false);
  };

  const checkStatus = () => {
    if (!userCourseInput || typeof userCourseInput !== "object") {
      return true;
    }

    switch (activeIndex) {
      case 0:
        return (
          !userCourseInput.category || userCourseInput.category.length === 0
        );
      case 1:
        return !userCourseInput.topic || userCourseInput.topic.length === 0;
      case 2:
        const { difficulty, duration, chapters } = userCourseInput;
        return !difficulty || !duration  || !chapters || chapters <= 0;
      default:
        return false;
    }
  };

  React.useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);

  return (
    <>
    <Navbar/>
    <div className=" max-w-screen-xl mx-auto  py-20">
      <div className="flex  flex-col justify-between items-center my-10 outfit-regular">
        <h2 className="text-2xl sm:text-4xl text-emerald-500 prata-regular">
          Create Course
        </h2>

        <div className="flex">
          {StepperOption.map((item, index) => (
            <div className="flex items-center">
              <div className="flex items-center flex-col w-[50px] sm:w-[100px]">
                <div
                  className={`bg-muted p-3 rounded-full ${
                    activeIndex >= index && "bg-emerald-500"
                  }`}
                >
                  {item.icon}
                </div>

                <h2 className="hidden sm:block sm:text-sm">{item.name}</h2>
              </div>

              {index !== StepperOption?.length - 1 && (
                <div
                  className={`h-1 w-[50px] sm:w-[100px] rounded-full md:w-[170px] bg-muted ${
                    activeIndex - 1 >= index && "bg-emerald-500"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-10 md:px-20 lg:px-44 my-10">
        {activeIndex === 0 ? (
          <SelectCategory />
        ) : activeIndex === 1 ? (
          <TopicDesc />
        ) : (
          <SelectOption />
        )}
      </div>

      <div className="flex justify-between items-center my-10">
        <Button
          disabled={activeIndex === 0}
          onClick={() => setActiveIndex(activeIndex - 1)}
          size="icon"
          variant="outline"
        >
          <ChevronLeftIcon />
        </Button>

        {activeIndex < 2 && (
          <Button
            disabled={checkStatus()}
            size="icon"
            variant="outline"
            onClick={() => setActiveIndex(activeIndex + 1)}
          >
            <ChevronRightIcon />
          </Button>
        )}

        {activeIndex === 2 && (
          <Button
            disabled={checkStatus()}
            onClick={() => GenerateCourseLayout()}
            variant="outline"
          >
            Generate Course Layout
          </Button>
        )}
      </div>

      <LoadingDialog loading={loading} />
    </div>
    </>
  );
};

export default CreateCourse;
