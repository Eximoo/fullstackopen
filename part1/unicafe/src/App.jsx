/* eslint-disable react/prop-types */
import { useState } from 'react';

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};
const ReviewCount = (props) => {
  return <div>{props.type} {props.count}</div>
}
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
      <h1>statistics</h1>
      <ReviewCount count={good} type="good" />
      <ReviewCount count={neutral} type="neutral" />
      <ReviewCount count={bad} type="bad" />
    </div>
  );
};

export default App;
