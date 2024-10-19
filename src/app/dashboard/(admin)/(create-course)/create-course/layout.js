"use client";

import { UserInputContext } from "@/app/context/UserInputContext";
import React, { useState } from "react";

const CreateCourseLayout = ({ children }) => {
  const [userCourseInput, setUserCourseInput] = useState([]);
  return (
    <div>
      <UserInputContext.Provider
        value={{
          userCourseInput,
          setUserCourseInput,
        }}
      >
        {children}
      </UserInputContext.Provider>
    </div>
  );
};

export default CreateCourseLayout;
