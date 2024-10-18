"use client";

import { db } from "@/configs/DB";
import { Chapter, CourseList } from "@/configs/Schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "./components/CourseBasicInfo";
import CourseDetails from "./components/CourseDetails";
import ChapterList from "./components/ChapterList";
import { Button } from "@/components/ui/button";
import { GenerateChapterContent_AI } from "@/configs/AIModel";
import LoadingDialog from "../components/LoadingDialog";
import Service from "@/configs/Service";
import { useRouter } from "next/navigation";

const CourseLayout = ({ params }) => {
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    params && GetCourse();
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

  const GenerateChapterContent = async () => {
    setLoading(true);
    const chapters = course?.courseOutput?.chapters;

    for (const [index, chapter] of chapters.entries()) {
      const PROMPT =
        "Explain the concept in Detail on Topic: " +
        course?.name +
        " Chapter: " +
        chapter?.chapter_name +
        ", in JSON format with the field as title, and description in detail. Example if applicable";

      // console.log(PROMPT);

      try {
        let videoId = "";

        // Fetch video ID and await the promise to resolve
        const videoResponse = await Service.GetVideos(
          course?.name + ":" + chapter?.chapter_name
        );
        videoId = videoResponse[0]?.id?.videoId;

        const res = await GenerateChapterContent_AI.sendMessage(PROMPT);
        const content = JSON.parse(res.response?.text());

        await db.insert(Chapter).values({
          chapterId: index,
          courseId: course?.courseId,
          content: content,
          videoId: videoId,
        });
      } catch (error) {
        // console.log(error);
      }
    }

    // Update course to publish after all chapters are processed
    await db.update(CourseList).set({
      publish: true,
    });

    router.replace(`/dashboard/create-course/${course?.courseId}/finish`);
    setLoading(false);
  };

  return (
    <div className="my-5 outfit-regular">
      <div className="flex justify-center items-center">
        <h2 className="prata-regular text-2xl sm:text-3xl font-bold bg-gradient-to-r from-softRed to-steelblue bg-clip-text text-transparent">
          Course Layout
        </h2>
      </div>

      <LoadingDialog loading={loading} />

      <CourseBasicInfo course={course} refreshData={() => GetCourse()} />

      <CourseDetails course={course} />

      <ChapterList course={course} refreshData={() => GetCourse()} />

      <Button className="my-10 float-right" onClick={GenerateChapterContent}>
        Generate Course Content
      </Button>
    </div>
  );
};

export default CourseLayout;
