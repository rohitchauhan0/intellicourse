import React from "react";

const WorkCard = ({ head, para, index }) => {
  return (
    <div class=" w-full p-3 px-5 bg-emerald-100 rounded-xl flex justify-between h-fit">
      <div class=" flex flex-col gap-4">
        <p class=" text-2xl font-semibold text-emerald-400">{head}</p>
        <p class=" text-emerald-600 w-[90%]">{para}</p>
      </div>
      <p class=" h-full text-end text-5xl text-yellow-300 select-none pt-20">
        {index}
      </p>
    </div>
  );
};

export default WorkCard;
