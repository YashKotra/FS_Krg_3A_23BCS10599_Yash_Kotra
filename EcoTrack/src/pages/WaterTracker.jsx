import React, { useState, useEffect, useMemo } from "react";
import CounterDisplay from "../components/CounterDisplay";

const WaterTracker = () => {
  console.log("WaterTracker render");
  const [count, setCount] = useState(0);
  const [goal, setGoal] = useState(8);
  const [inputGoal, setInputGoal] = useState("");
  const [tip, setTip] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dummy, setDummy] = useState(0);

  useEffect(() => {
    const savedCount = localStorage.getItem("water-count");
    if (savedCount !== null) {
      setCount(Number(savedCount));
    }
    const savedGoal = localStorage.getItem("water-goal");
    if (savedGoal !== null) {
      setGoal(Number(savedGoal));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("water-count", count);
  }, [count]);

  useEffect(() => {
    setLoading(true);
    fetch("https://api.adviceslip.com/advice")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setTip(data.slip.advice);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load tip");
        setLoading(false);
      });
  }, []);

  const addWater = () => {
    setCount(count + 1);
  };

  const removeWater = () => {
    setCount(Math.max(0, count - 1));
  };

  const reset = () => {
    setCount(0);
  };

  const saveGoal = () => {
    const g = parseInt(inputGoal, 10);
    if (!isNaN(g) && g > 0) {
      setGoal(g);
      localStorage.setItem("water-goal", g);
      setInputGoal("");
    }
  };

  const goalReached = useMemo(() => count >= goal, [count, goal]);

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Water Tracker</h2>

      <div
        className="light-card"
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "20px",
          backgroundColor: "#f9f9f9",
          color: "#213547",
        }}
      >
        <CounterDisplay count={count} goal={goal} />

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={addWater}
            style={{
              margin: "5px",
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            +
          </button>
          <button
            onClick={removeWater}
            style={{
              margin: "5px",
              padding: "10px 20px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            -
          </button>
          <button
            onClick={reset}
            style={{
              margin: "5px",
              padding: "10px 20px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>

        <div style={{ marginTop: "20px" }}>
          <input
            type="number"
            value={inputGoal}
            onChange={(e) => setInputGoal(e.target.value)}
            placeholder="Set daily goal"
            style={{
              padding: "10px",
              marginRight: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: "100px",
            }}
          />
          <button
            onClick={saveGoal}
            style={{
              padding: "10px 20px",
              backgroundColor: "#FF9800",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Save Goal
          </button>
        </div>

        {goalReached && (
          <p
            style={{
              color: "green",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            Goal Reached!
          </p>
        )}
      </div>

      <div style={{ marginTop: "30px" }}>
        {loading && <p>Loading health tip...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && (
          <p>
            <strong>Today's Health Tip:</strong> {tip}
          </p>
        )}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setDummy(dummy + 1)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#9C27B0",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Unrelated Button ({dummy})
        </button>
      </div>
    </div>
  );
};

export default WaterTracker;
