"use client";

import { db } from "@/configs/DB";
import { CourseList } from "@/configs/Schema";
import { eq } from "drizzle-orm";
import React from "react";
import CourseBasicInfo from "../../create-course/[courseID]/components/CourseBasicInfo";
import CourseDetails from "../../create-course/[courseID]/components/CourseDetails";
import ChapterList from "../../create-course/[courseID]/components/ChapterList";

const ViewCourse = ({ params }) => {
  const [course, setCourse] = React.useState();

  React.useEffect(() => {
    params && GetCourse();
  }, [params]);

  const GetCourse = async () => {
    const res = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, params.courseID));

    setCourse(res[0]);
    console.log(res);
  };

  return (
    <div>
      <CourseBasicInfo course={course} edit={false} />

      <CourseDetails course={course} />

      <ChapterList course={course} edit={false} />
    </div>
  );
};

export default ViewCourse;
