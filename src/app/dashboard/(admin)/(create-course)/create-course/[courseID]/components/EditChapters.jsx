"use client";

import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PenIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CourseList } from "@/config/Schema";
import { eq } from "drizzle-orm";
import { Label } from "@/components/ui/label";
import { db } from "@/config/DB";

const EditChapters = ({ course, index, refreshData }) => {
  const [chapterName, setChapterName] = React.useState("");
  const [chapterAbout, setChapterAbout] = React.useState("");

  const Chapters = course?.courseOutput?.chapters;

  const onUpdateHandler = async () => {
    course.courseOutput.chapters[index].chapter_name = chapterName;
    course.courseOutput.chapters[index].about = chapterAbout;

    const res = await db
      .update(CourseList)
      .set({
        courseOutput: course.courseOutput,
      })
      .where(eq(CourseList?.courseId, course?.courseId))
      .returning({ id: CourseList.id });

    refreshData(true);
  };

  React.useEffect(() => {
    setChapterName(Chapters[index]?.chapter_name);
    setChapterAbout(Chapters[index]?.about);
  }, [course]);

  return (
    <div className="outfit-regular">
      <Dialog>
        <DialogTrigger>
          <PenIcon />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit </DialogTitle>
            <DialogDescription>
              <div className="my-2">
                <Label>Chapter Title</Label>
                <Input
                  defaultValue={Chapters[index]?.chapter_name}
                  onChange={(e) => setChapterName(e.target.value)}
                />
              </div>

              <div className="my-2">
                <Label>Chapter Description</Label>
                <Textarea
                  className="h-40"
                  defaultValue={Chapters[index]?.about}
                  onChange={(e) => setChapterAbout(e.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose>
              <Button onClick={onUpdateHandler}>Update</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditChapters;
