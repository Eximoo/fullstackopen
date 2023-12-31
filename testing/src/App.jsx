/* eslint-disable react/prop-types */
import { useState } from 'react';

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }

  return <div>button press history: {props.allClicks.join(' ')}</div>;
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Total = ({ clickCount }) => {
  if (clickCount > 0) {
    return <div>Total clicks = {clickCount}</div>;
  }
};

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [clickCount, setCount] = useState(0);

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    setLeft(left + 1);
    setCount(clickCount + 1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    setRight(right + 1);
    setCount(clickCount + 1);
  };
  const handleReset = () => {
    setLeft(0);
    setRight(0);
    setAll([]);
    setCount(0);
  };

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text="left" />
      <Button handleClick={handleRightClick} text="right" />
      {right}
      <History allClicks={allClicks} />
      <Total clickCount={clickCount} />
      <button onClick={handleReset}>RESET</button>
    </div>
  );
};
export default App;
