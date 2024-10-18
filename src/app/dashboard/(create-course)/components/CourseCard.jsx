"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Book, ChartColumnIcon, PuzzleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CourseCard = ({ course }) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Link href={`/dashboard/view/${course?.courseId}`}>
      <div className="border md:p-5 outfit-regular shadow-md rounded-2xl flex flex-col gap-1 hover:cursor-pointer hover:scale-105 transition-all my-5 h-[400px]"> {/* Set fixed height here */}
        {loading ? (
          <>
            <Skeleton className="rounded-lg w-full h-[200px]" />
            <div className="p-2">
              <Skeleton className="h-6 mb-2" />
              <Skeleton className="h-4 mb-2 bg-purple-400" />
              <div className="flex flex-col lg:flex-row justify-between items-center sm:gap-10 gap-y-1">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>
            </div>
          </>
        ) : (
          <>
            <Image
              src={course?.courseBanner}
              alt="Course Banner"
              width={300}
              height={200}
              className="rounded-lg w-full h-[200px] object-cover"
            />

            <div className="p-2 flex flex-col justify-between h-full"> {/* Ensure full height for flex container */}
              <h2 className="font-medium text-sm sm:text-lg">
                {course?.courseOutput?.course_name}
              </h2>

              <p className="p-1 rounded-lg my-2 bg-purple-400 flex items-center gap-2 text-xs sm:text-lg">
                <PuzzleIcon />
                {course?.category}
              </p>

              <div className="flex flex-col lg:flex-row justify-between items-center sm:gap-10 gap-y-1">
                <h2 className="flex gap-2 items-center p-1 bg-softRed rounded-lg text-xs sm:text-sm w-full">
                  <Book />
                  {course?.courseOutput?.chapters.length} Chapters
                </h2>

                <h2 className="flex gap-2 items-center p-1 w-full bg-steelblue rounded-lg text-sm">
                  <ChartColumnIcon />
                  {course?.level}
                </h2>
              </div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default CourseCard;
