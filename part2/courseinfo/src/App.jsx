/* eslint-disable react/prop-types */

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  console.log(courses);
  return courses.map((val) => <Course key={val.id}course={val} />);
  // return <Course course={course} />;
};
const Course = ({ course }) => {
  console.log(course);
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
  return (
    <p>
      <b>total of {sum} exercises</b>
    </p>
  );
};
export default App;
