import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUp10Icon, ChartColumnIcon, ClockIcon, PlayIcon } from "lucide-react";
import React from "react";

const CourseDetails = ({ course }) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <div className="p-6 border rounded-xl my-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
        <div className="flex gap-2 items-center">
          <ChartColumnIcon className="w-10 h-10 text-steelblue" />

          <div className="">
            <h2 className="text-xs">Skill Level</h2>
            {loading ? (
              <Skeleton className="w-[70px] h-[20px] rounded-full animate-pulse" />
            ) : (
              <h2 className="text-lg font-sans">{course?.level}</h2>
            )}
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <ClockIcon className="w-10 h-10 text-steelblue" />

          <div className="">
            <h2 className="text-xs">Duration</h2>
            {loading ? (
              <Skeleton className="w-[70px] h-[20px] rounded-full animate-pulse" />
            ) : (
              <h2 className="text-lg font-sans">
                {course?.courseOutput?.duration}
              </h2>
            )}
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <ArrowUp10Icon className="w-10 h-10 text-steelblue" />

          <div className="">
            <h2 className="text-xs">No. of Chapters</h2>
            {loading ? (
              <Skeleton className="w-[70px] h-[20px] rounded-full animate-pulse" />
            ) : (
              <h2 className="text-lg font-sans">
                {course?.courseOutput?.chapters.length}
              </h2>
            )}
          </div>
        </div>

        <div className="flex gap-2 items-center">
          <PlayIcon className="w-10 h-10 text-steelblue" />

          <div className="">
            <h2 className="text-xs">Video Include?</h2>
            {loading ? (
              <Skeleton className="w-[70px] h-[20px] rounded-full animate-pulse" />
            ) : (
              <h2 className="text-lg font-sans">{course?.includeVideo}</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
