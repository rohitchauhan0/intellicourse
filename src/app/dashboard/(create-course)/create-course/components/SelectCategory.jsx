"use client";

import React from "react";
import CategoryList from "../../shared/CategoryList";
import { UserInputContext } from "@/app/context/UserInputContext";

const SelectCategory = () => {
  const { userCourseInput, setUserCourseInput } = React.useContext(
    UserInputContext
  );

  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({
      ...prev,
      category: category,
    }));
  };
  return (
    <div>
      <h2 className="outfit-regular text-base my-2 sm:text-3xl ">
        Select the Course Category
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-8 prata-regular">
        {CategoryList.map((item, index) => (
          <div
            className={`flex flex-col gap-y-2 p-5 border border-softRed hover:bg-softRed hover:cursor-pointer rounded-xl justify-center items-center ${
              userCourseInput.category === item.name && "bg-softRed"
            }`}
            onClick={() => handleCategoryChange(item.name)}

            key={index}
          >
            <div>{item.icon}</div>

            <h2 className="text-sm sm:text-base">{item.name}</h2>
          </div>
        ))}
      </div>{" "}
    </div>
  );
};

export default SelectCategory;
