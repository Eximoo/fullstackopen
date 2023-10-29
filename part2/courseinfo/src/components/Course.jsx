/* eslint-disable react/prop-types */
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};
const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
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
export default Course;
