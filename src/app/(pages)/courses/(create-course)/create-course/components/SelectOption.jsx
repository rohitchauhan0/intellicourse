"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  ArrowUp10,
  GraduationCapIcon,
  PlayIcon,
  TimerIcon,
} from "lucide-react";
import { UserInputContext } from "@/app/context/UserInputContext";

const SelectOption = () => {
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
    <div className="">
      <div className="grid grid-cols-2 gap-5 sm:gap-10 w-full">
        <div>
          <div className="flex items-center gap-2">
            <GraduationCapIcon />
            <Label>Difficulty Level</Label>
          </div>

          <Select
            onValueChange={(value) => handleInputChange("difficulty", value)}
            defaultValue={userCourseInput?.difficulty}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advance">Advance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <TimerIcon />
            <Label>Course Duration</Label>
          </div>

          <Select
            onValueChange={(value) => handleInputChange("duration", value)}
            defaultValue={userCourseInput?.duration}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Hour">1 Hour</SelectItem>
              <SelectItem value="2 Hours">2 Hours</SelectItem>
              <SelectItem value="More Than 3 Hours">
                More Than 3 Hours
              </SelectItem>
            </SelectContent>
          </Select>
        </div>


        <div>
          <div className="flex items-center gap-2">
            <ArrowUp10 />
            <Label>No. of chapters</Label>
          </div>
          <Input
            type="number"
            placeholder="Enter number of chapters"
            onChange={(e) => handleInputChange("chapters", e.target.value)}
            defaultValue={userCourseInput?.chapters}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectOption;
