"use client";

import { db } from "@/config/DB";
import { CourseList } from "@/config/Schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { useSession } from "next-auth/react";

const UserCourseList = () => {
  const {data:session} = useSession()
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    session && GetUserCourseList();
  }, [session]);

  const GetUserCourseList = async () => {
    const res = await db
      .select()
      .from(CourseList)
      .where(
        eq(CourseList?.createdBy, session?.user?.email)
      );

    //console.log(res);

    setCourseList(res);
  };

  return (
    <div>
      <h2 className="text-3xl outfit-regular font-bold my-5">My AI Courses</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
        {courseList?.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default UserCourseList;
