"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { CircleCheckIcon, ClockIcon } from "lucide-react";
import React from "react";
import EditChapters from "./EditChapters";

const ChapterList = ({ course, refreshData, edit = true }) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <div className="my-5 border rounded-xl p-5">
      <h2 className="text-xl sm:text-2xl text-center text-yellow-500">
        Chapters
      </h2>

      <div className="my-2">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="border p-5 rounded-xl my-3 flex items-center justify-between"
              >
                <div className="flex gap-8 items-center">
                  <Skeleton
                    className={"w-10 h-10 rounded-full animate-pulse"}
                  />
                  <div>
                    <Skeleton className="h-5 w-40 animate-pulse" />
                    <Skeleton className="h-4 w-32 mt-1 animate-pulse" />
                    <Skeleton className="h-4 w-24 mt-1 animate-pulse" />
                  </div>
                </div>
                <Skeleton className="w-10 h-10 animate-pulse" />
              </div>
            ))
          : course?.courseOutput?.chapters.map((chapter, index) => (
              <div
                key={index}
                className="border p-5 rounded-xl my-3 flex items-center justify-between"
              >
                <div className="flex gap-8 items-center">
                  <h2 className="h-10 w-10 bg-yellow-500 rounded-full text-center p-2 flex-none">
                    {index + 1}
                  </h2>
                  <div>
                    <h2 className="text-lg sm:text-xl flex items-center justify-between">
                      {chapter?.chapter_name}
                      {edit && (
                        <EditChapters
                          course={course}
                          index={index}
                          refreshData={() => refreshData(true)}
                        />
                      )}
                    </h2>
                    <p className="text-gray-500 text-base sm:text-lg">
                      {chapter?.about}
                    </p>
                    <p className="flex items-center gap-2">
                      <ClockIcon className="w-5 h-5 text-yellow-500" />
                      {chapter?.duration}
                    </p>
                  </div>
                </div>
                <CircleCheckIcon className="w-10 h-10 text-2xl flex-none" />
              </div>
            ))}
      </div>
    </div>
  );
};

export default ChapterList;
