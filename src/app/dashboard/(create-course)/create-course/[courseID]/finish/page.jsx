"use client";

import { db } from "@/configs/DB";
import { CourseList } from "@/configs/Schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "../components/CourseBasicInfo";
import { useRouter } from "next/navigation";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";

const FinishScreen = ({ params }) => {
  const { user } = useUser();
  const [course, setCourse] = useState([]);

  const router = useRouter();

  useEffect(() => {
    GetCourse();
  }, [params, user]);

  const GetCourse = async () => {
    const res = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList.courseId, params.courseID),
          eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );

    setCourse(res[0]);
   // console.log(res);
  };
  return (
    <div className="outfit-regular">
      <h2 className="text-softRed my-3 text-center text-xl sm:text-4xl prata-regular font-bold">
        Congrats! Your course is ready.
      </h2>

      <CourseBasicInfo course={course} refreshData={GetCourse} />

      <h2 className="my-3 text-xl sm:text-2xl">Copy URL: </h2>
      <h2 className="flex items-center gap-2 text-gray-400 p-4 border rounded-full">
        {process.env.NEXT_PUBLIC_HOST_NAME}/course/view/{course?.courseId}
        <CopyIcon
          className="cursor-pointer"
          onClick={async () => {
            await navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${course?.courseId}`
            );
            toast.success("URL Copied!");
          }}
        />
      </h2>
    </div>
  );
};

export default FinishScreen;
