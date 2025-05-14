import { useEffect, useState } from 'react';
import styles from '../../styles/Exam.module.scss';

const Timer = ({ endTime, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(endTime) - new Date();
    return {
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);
      
      if (newTime.minutes <= 0 && newTime.seconds <= 0) {
        clearInterval(timer);
        onExpire();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className={styles.timer}>
      Time Remaining: {timeLeft.minutes}m {timeLeft.seconds}s
    </div>
  );
};

export default Timer;