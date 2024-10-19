"use client";

import { db } from "@/config/DB";
import { CourseList } from "@/config/Schema";

import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "../components/CourseBasicInfo";
import { useRouter } from "next/navigation";
import { CopyIcon } from "lucide-react";

import { useSession } from "next-auth/react";

const FinishScreen = ({ params }) => {
  const {data:session} =useSession();
  const [course, setCourse] = useState([]);

  const router = useRouter();

  useEffect(() => {
    GetCourse();
  }, [params, session]);

  const GetCourse = async () => {
    const res = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList.courseId, params.courseID),
          eq(CourseList.createdBy, session?.user?.email)
        )
      );

    setCourse(res[0]);
   // console.log(res);
  };
  return (
    <div className="outfit-regular">
      <h2 className="text-emerald-500 my-3 text-center text-xl sm:text-4xl prata-regular font-bold">
        Congrats! Your course is ready.
      </h2>

      <CourseBasicInfo course={course} refreshData={GetCourse} />

     
    </div>
  );
};

export default FinishScreen;
