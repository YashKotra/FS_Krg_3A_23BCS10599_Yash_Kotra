import React, { useMemo } from "react";

const CounterDisplay = React.memo(({ count, goal }) => {
  console.log("CounterDisplay render");

  const goalReachedMessage = useMemo(() => {
    return count >= goal ? <p><strong>Goal Reached!</strong></p> : null;
  }, [count, goal]);

  return (
    <div>
      <p>{count} / {goal} glasses completed</p>
      {goalReachedMessage}
    </div>
  );
});

export default CounterDisplay;
