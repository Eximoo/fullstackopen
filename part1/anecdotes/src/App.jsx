/* eslint-disable react/prop-types */
import { useState } from 'react';

const Anecdote = (props) => {
  return (
    <>
      <h1>{props.head}</h1>
      <div>{props.anecdote}</div>
      <div>has {props.score} votes</div>
    </>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];
  const getRan = (range = anecdotes.length - 1) => {
    return Math.floor(Math.random() * (range - 0 + 1));
  };

  const populatePoints = (len = anecdotes.length) => {
    const points = {};
    for (let i = 0; i < len; i++) {
      points[i] = 0;
    }
    return points;
  };

  const [selected, setSelected] = useState(getRan);
  const [score, setScore] = useState(populatePoints);

  const findMostVoted = () => {
    let topScore = 0,
      index = 0;
    for (let i = 0; i < anecdotes.length; i++) {
      if (score[i] > topScore) {
        topScore = score[i];
        index = i;
      }
    }
    return index;
  };

  const nextHandler = () => {
    let next = 0;
    do {
      next = getRan(anecdotes.length - 1);
    } while (next === selected);
    setSelected(next);
  };
  const voteHandler = () => {
    let copy = { ...score };
    copy[selected] = score[selected] + 1;
    setScore(copy);
  };
  //this is better but
  // const voteHandler2 = () =>
  //   setScore((score) => ({
  //     ...score,
  //     [selected]: score[selected] + 1,
  //   }));
  return (
    <>
      <Anecdote
        head="Anecdote of the day"
        anecdote={anecdotes[selected]}
        score={score[selected]}
      />
      <button onClick={() => voteHandler()}>Vote!</button>
      <button onClick={() => nextHandler()}>next anecdote</button>
      <Anecdote
        head="Anecdote with most votes"
        anecdote={anecdotes[findMostVoted()]}
        score={score[findMostVoted()]}
      />
    </>
  );
};

export default App;
