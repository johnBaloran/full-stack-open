import React from "react";
import Header from "./Header";
import Total from "./Total";
import Content from "./Content";
const Course = ({ course }) => {
  const sum = course.parts.reduce((prev, cur) => {
    console.log(prev);
    console.log(cur);

    return prev + cur.exercises;
  }, 0);
  return (
    <>
      <Header course={course.name} />

      {course.parts.map((part) => (
        <Content part={part.name} exercises={part.exercises} key={part.id} />
      ))}

      <Total total={sum} />
    </>
  );
};

export default Course;
