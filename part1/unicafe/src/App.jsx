/* eslint-disable react/prop-types */
import { useState } from 'react';

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};
const StatisticLine = (props) => {
  if (props.text === 'positive') {
    return (
      <div>
        {props.text} {props.count} %
      </div>
    );
  } else
    return (
      <div>
        {props.text} {props.count}
      </div>
    );
};

const Statistics = ({ good, bad, neutral, total }) => {
  if (total === 0) {
    return <h1>no feedback was given, yet.</h1>;
  } else
    return (
      <>
        <h1>statistics</h1>
        <StatisticLine count={good} text="good" />
        <StatisticLine count={neutral} text="neutral" />
        <StatisticLine count={bad} text="bad" />
        <StatisticLine count={total} text="all" />
        <StatisticLine count={(good - bad) / total} text="average" />
        <StatisticLine count={good / total} text="positive" />
      </>
    );
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClicks = (useStateVal, stateSet) => {
    stateSet(useStateVal + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => handleClicks(good, setGood)} text="good" />
      <Button
        handleClick={() => handleClicks(neutral, setNeutral)}
        text="neutral"
      />
      <Button handleClick={() => handleClicks(bad, setBad)} text="bad" />
      <br />
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        total={good + bad + neutral}
      />
    </div>
  );
};

export default App;
