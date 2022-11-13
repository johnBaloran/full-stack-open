import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistics = ({ text, feedback }) => {
  return (
    <p>
      {text} {feedback}
    </p>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => {
    setGood(good + 1);
  };
  const increaseNeutral = () => {
    setNeutral(neutral + 1);
  };
  const increaseBad = () => {
    setBad(bad + 1);
  };

  const totalFeedback = () => good + bad + neutral;
  const averageFeedback = () => (good + bad + neutral) / 3;
  const positiveFeedback = () => (good / (bad + neutral + good)) * 100 + "%";

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={increaseGood} text="good" />
      <Button onClick={increaseNeutral} text="neutral" />
      <Button onClick={increaseBad} text="bad" />
      <h2>statistics</h2>

      {good === 0 && neutral === 0 && bad === 0 ? (
        <p>No feedback given</p>
      ) : (
        <div>
          <Statistics text="good" feedback={good} />
          <Statistics text="neutral" feedback={neutral} />
          <Statistics text="bad" feedback={bad} />
          <Statistics text="all" feedback={totalFeedback()} />
          <Statistics text="average" feedback={averageFeedback()} />
          <Statistics text="positive" feedback={positiveFeedback()} />
        </div>
      )}
    </div>
  );
};

export default App;
