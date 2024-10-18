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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/DB";
import { CourseList } from "@/configs/Schema";
import { eq } from "drizzle-orm";

const EditCourseBasicInfo = ({ course, refreshData }) => {
  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();

  const onUpdateHandler = async () => {
    course.courseOutput.course_name = name;
    course.courseOutput.description = description;

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
    setName(course?.courseOutput?.course_name);
    setDescription(course?.courseOutput?.description);
  }, [course]);

  return (
    <div className="outfit-regular">
      <Dialog>
        <DialogTrigger>
          <PenIcon />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="prata-regular">
              Edit Course Basic Info
            </DialogTitle>
            <DialogDescription>
              <div className="my-2">
                <Label>Course Title</Label>
                <Input
                  defaultValue={course?.courseOutput?.course_name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="my-2">
                <Label>Course Description</Label>
                <Textarea
                  className="h-40"
                  defaultValue={course?.courseOutput?.description}
                  onChange={(e) => setDescription(e.target.value)}
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

export default EditCourseBasicInfo;
