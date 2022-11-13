const Header = (props) => {
  console.log(props);
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  );
};

const Total = (props) => {
  return <p>{props.total}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const sum = course.parts.reduce((prev, cur) => {
    console.log(prev);
    console.log(cur);

    return prev + cur.exercises;
  }, 0);
  console.log(sum);

  return (
    <div>
      <Header course={course.name} />

      {course.parts.map((part) => (
        <Content part={part.name} exercises={part.exercises} />
      ))}

      <Total total={sum} />
    </div>
  );
};

export default App;
