"use client";

import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

const AddCourse = () => {
  const { user } = useUser();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="outfit-regular my-8 flex flex-col sm:flex-row items-center justify-between gap-y-4">
      <div>
        <h2 className="text-2xl sm:text-4xl flex items-center gap-2">
          Hello,{" "}
          <span className="prata-regular text-emerald-500">
            {loading ? (
              <Skeleton className="w-[200px] h-[35px] rounded-full animate-pulse" />
            ) : (
              user?.fullName
            )}
          </span>
        </h2>

        <p className="my-3 text-xl sm:text-2xl">
          Create new course with AI, Share with friends and earn from it.
        </p>
      </div>

      <Link href="/dashboard/create-course">
        <Button variant="outline" className="flex items-center gap-2">
          <CirclePlus /> Create New Course
        </Button>
      </Link>
    </div>
  );
};

export default AddCourse;
