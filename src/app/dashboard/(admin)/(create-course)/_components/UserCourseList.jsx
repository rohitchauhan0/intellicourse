"use client";

import { db } from "@/configs/DB";
import { CourseList } from "@/configs/Schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";

const UserCourseList = () => {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    user && GetUserCourseList();
  }, [user]);

  const GetUserCourseList = async () => {
    const res = await db
      .select()
      .from(CourseList)
      .where(
        eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
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
