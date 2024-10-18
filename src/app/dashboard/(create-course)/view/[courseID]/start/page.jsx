"use client";

import { db } from "@/configs/DB";
import { Chapter, CourseList } from "@/configs/Schema";
import { and, eq } from "drizzle-orm";
import React from "react";
import ChapterListCard from "./components/ChapterListCard";
import ChapterContent from "./components/ChapterContent";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const CourseStart = ({ params }) => {
  const [course, setCourse] = React.useState();
  const [selectChapter, setSelectChapter] = React.useState();
  const [chapterContent, setChapterContent] = React.useState();
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const handleSheetToggle = () => {
    setIsSheetOpen(false);
  };

  const GetCourse = async () => {
    const res = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, params.courseID));

    // console.log(res);

    setCourse(res[0]);
    GetSelectedChapterContent(0);
  };

  const GetSelectedChapterContent = async (chapterId) => {
    const res = await db
      .select()
      .from(Chapter)
      .where(
        and(
          eq(Chapter?.chapterId, chapterId),
          eq(Chapter?.courseId, course?.courseId)
        )
      );

    console.log("res", res);

    setChapterContent(res[0]);
  };

  React.useEffect(() => {
    GetCourse();
  }, [params]);

  return (
    <div className="outfit-regular flex flex-col md:flex-row">
      <div className="md:hidden w-full flex justify-end ">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <MenuIcon className="cursor-pointer" />
          </SheetTrigger>

          <SheetContent className="w-full" side="right">
            <h2 className="p-3 bg-steelblue rounded-t-xl text-xl prata-regular">
              {course?.courseOutput?.course_name}
            </h2>
            <div>
              {course?.courseOutput?.chapters?.map((chapter, index) => (
                <div
                  key={index}
                  className={`cursor-pointer hover:bg-softRed ${
                    selectChapter?.chapter_name === chapter?.chapter_name &&
                    "bg-softRed"
                  }`}
                  onClick={() => (
                    setSelectChapter(chapter), GetSelectedChapterContent(index)
                  )}
                >
                  <ChapterListCard chapter={chapter} index={index} />
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="h-screen md:w-[350px] rounded-xl border hidden md:block overflow-y-auto">
        <h2 className="p-3 bg-steelblue rounded-t-xl text-xl prata-regular">
          {course?.courseOutput?.course_name}
        </h2>
        <div>
          {course?.courseOutput?.chapters?.map((chapter, index) => (
            <div
              key={index}
              className={`cursor-pointer hover:bg-softRed ${
                selectChapter?.chapter_name === chapter?.chapter_name &&
                "bg-softRed"
              }`}
              onClick={() => (
                setSelectChapter(chapter), GetSelectedChapterContent(index)
              )}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>

      <div className="p-2 sm:p-10 w-full my-5 ">
        <ChapterContent chapter={selectChapter} content={chapterContent} />
      </div>
    </div>
  );
};

export default CourseStart;
