import React from "react";
import AddCourse from "./components/AddCourse";
import UserCourseList from "./components/UserCourseList";

const Dashboard = () => {
  return (
    <div>
      <AddCourse />

      <UserCourseList />
    </div>
  );
};

export default Dashboard;
