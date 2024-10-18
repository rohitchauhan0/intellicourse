import { ClockIcon } from "lucide-react";
import React from "react";

const ChapterListCard = ({ chapter, index }) => {
  return (
    <div className="grid grid-cols-5 gap-3 p-3 border-b">
      <div className="">
        <h2 className="p-1 bg-softRed text-center rounded-full w-8 h-8">
          {index + 1}
        </h2>
      </div>

      <div className="col-span-4">
        <h2 className="text-lg font-medium ">{chapter?.chapter_name}</h2>

        <h2 className="flex items-center gap-1 text-steelblue text-xs">
          <ClockIcon className="w-3 h-3" />
          {chapter?.duration}
        </h2>
      </div>
    </div>
  );
};

export default ChapterListCard;
