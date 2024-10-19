"use client";

import { UserInputContext } from "@/app/context/UserInputContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const TopicDesc = () => {
  const { userCourseInput, setUserCourseInput } = React.useContext(
    UserInputContext
  );

  const handleInputChange = (event, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [event]: value,
    }));
  };

  return (
    <div>
      <div className="my-5">
        <Label className="text-sm sm:text-xl">
          Write the topic for which you want to create a course
        </Label>
        <Input
          type="text"
          placeholder="Enter topic"
          onChange={(e) => handleInputChange("topic", e.target.value)}
          defaultValue={userCourseInput?.topic}
        />
      </div>

      <div className="my-5">
        <Label className="text-sm sm:text-xl">
          Tell us more about your course, what you want to include in the
          course(optional).
        </Label>
        <Textarea
          placeholder="Enter description"
          onChange={(e) => handleInputChange("description", e.target.value)}
          defaultValue={userCourseInput?.description}
        />
      </div>
    </div>
  );
};

export default TopicDesc;
