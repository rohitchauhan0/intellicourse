"use client";

import Navbar from "@/app/_components/Navbar";
import ChapterList from "@/app/dashboard/(admin)/(create-course)/create-course/[courseID]/components/ChapterList";
import CourseBasicInfo from "@/app/dashboard/(admin)/(create-course)/create-course/[courseID]/components/CourseBasicInfo";
import CourseDetails from "@/app/dashboard/(admin)/(create-course)/create-course/[courseID]/components/CourseDetails";
import { db } from "@/config/DB";
import { CourseList } from "@/config/Schema";
import { eq } from "drizzle-orm";
import React from "react";

const ViewCourse = ({ params }) => {
  const [course, setCourse] = React.useState();

  React.useEffect(() => {
    params && GetCourse();
  }, [params]);

  const GetCourse = async () => {
    try {
      const res = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, params.courseID));

    setCourse(res[0]);
    console.log(res);
    } catch (error) {
        console.log(error);
    }
  };

  return (
  <>
  <Navbar/>
    <div className=" w-full max-w-screen-xl mx-auto  py-20">
      <CourseBasicInfo course={course} edit={false} />

      <CourseDetails course={course} />

      <ChapterList course={course} edit={false} />
    </div>
  </>
  );
};

export default ViewCourse;
