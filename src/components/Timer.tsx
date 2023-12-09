import { useState, useEffect } from "react";
import Layout from "./Layout";

const Timer = ({ numSecs }: { numSecs: number }) => {
  const [timeLeft, setTimeLeft] = useState(numSecs);

  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return <h1 className="text-xl text-right">{timeLeft}</h1>;
};

export default Timer;
