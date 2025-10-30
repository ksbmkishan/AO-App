import React, { useEffect, useState, useRef } from 'react';
import { Text } from 'react-native';

const CountDown = ({ duration = 0, onComplete }) => {
  const [timer, setTimer] = useState(duration);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Reset timer whenever duration changes
    setTimer(duration);

    if (duration > 0) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            if (onComplete) onComplete(); // 🔹 trigger only when countdown completes
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Cleanup on unmount or duration change
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [duration]);

  return <Text>{timer}</Text>;
};

export default CountDown;
