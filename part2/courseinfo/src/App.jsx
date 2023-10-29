/* eslint-disable react/prop-types */

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};
const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};
const Content = ({ course }) => {
  return course.parts.map((value) => <Part key={value.id} part={value} />);
};
const Part = ({ part }) => {
  return (
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>
  );
};
const Total = ({ course }) => {
  const sum = course.parts.reduce((acc, p) => acc + p.exercises, 0);
  // let sum =
  //   props.course.parts[0].exercises +
  //   props.course.parts[1].exercises +
  //   props.course.parts[2].exercises;
  return <p>Number of exercises {sum}</p>;
};
export default App;
