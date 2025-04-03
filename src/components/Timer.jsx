import { useEffect } from "react";

function formatTime(seconds) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secondsPart = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${secondsPart}`;
}

export default function Timer({ dispatch, secondsRemaining }) {
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const time = formatTime(secondsRemaining);

  return <div className="timer">{time}</div>;
}
