"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BookTextIcon, PuzzleIcon } from "lucide-react";
import React from "react";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { storage } from "@/configs/FirebseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db } from "@/configs/DB";
import { CourseList } from "@/configs/Schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

const CourseBasicInfo = ({ course, refreshData, edit = true }) => {
  const [loading, setLoading] = React.useState(true);
  const [selectedFile, setSelectedFile] = React.useState(null);

  React.useEffect(() => {
    if (course) {
      setSelectedFile(course?.courseBanner);
    }
  }, [course]);

  const fileSelected = async (e) => {
    const file = e.target.files[0];

    if (!file || !(file instanceof File)) {
      // console.error("No valid file selected");
      return;
    }

    try {
      const objectURL = URL.createObjectURL(file);
      setSelectedFile(objectURL);

      const fileName = Date.now() + ".jpg";
      const storageRef = ref(storage, fileName);

      await uploadBytes(storageRef, file);
      // console.log("Uploaded a file!");

      const downloadURL = await getDownloadURL(storageRef);
      // console.log("File available at", downloadURL);

      // Log the course ID and new URL for debugging
      // console.log("Updating courseBanner for course ID:", course?.courseId);
      // console.log("New courseBanner URL:", downloadURL);

      // Update the courseBanner in the database
      try {
        const result = await db
          .update(CourseList)
          .set({
            courseBanner: downloadURL,
          })
          .where(eq(CourseList.courseId, course?.courseId));
       // console.log("Update successful:", result);

        // Refresh data to reflect changes in the UI
        refreshData();
      } catch (error) {
        console.error("Update failed:", error);
      }
    } catch (error) {
      console.error("Error in file upload or database update:", error);
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    return () => {
      if (selectedFile) {
        URL.revokeObjectURL(selectedFile);
      }
    };
  }, [selectedFile]);

  return (
    <div className="p-10 rounded-xl border my-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          {loading ? (
            <Skeleton className="w-[200px] h-[35px] rounded-full animate-pulse" />
          ) : (
            <h2 className="text-xl sm:text-2xl font-bold text-softRed flex items-center gap-2 justify-between">
              {course?.courseOutput?.course_name}
              {edit && (
                <EditCourseBasicInfo
                  course={course}
                  refreshData={() => refreshData(true)}
                />
              )}
            </h2>
          )}

          {loading ? (
            <Skeleton className="w-[200px] h-[150px] my-5 rounded-xl animate-pulse" />
          ) : (
            <p className="text-sm sm:text-base text-gray-400 my-5">
              {course?.courseOutput?.description}
            </p>
          )}

          {loading ? (
            <Skeleton className="w-[100px] h-[35px] rounded-full animate-pulse" />
          ) : (
            <h2 className="font-bold text-sm sm:text-base text-steelblue flex items-center gap-2">
              <PuzzleIcon className="w-7 h-7" />
              {course?.category}
            </h2>
          )}

          {!edit && (
            <Link href={`/dashboard/view/${course?.courseId}/start`}>
              <Button className="w-full my-5">Start</Button>{" "}
            </Link>
          )}
        </div>

        <div className="w-full">
          <Label
            htmlFor="uploadImg"
            className="cursor-pointer flex justify-center items-center"
          >
            {selectedFile ? (
              <Image
                className="w-full rounded-xl h-[300px] object-cover"
                src={selectedFile}
                alt="Course Image"
                width={400}
                height={400}
              />
            ) : (
              <div className="w-full h-[300px] flex justify-center items-center rounded-xl border-dashed border-2 border-gray-300">
                <BookTextIcon className="w-44 h-44 text-gray-400" />
              </div>
            )}
          </Label>
          {edit && (
            <Input
              type="file"
              id="uploadImg"
              className="opacity-0"
              onChange={fileSelected}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;
