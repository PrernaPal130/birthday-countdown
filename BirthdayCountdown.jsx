import React, { useEffect, useState } from "react";

const BirthdayCountdown = () => {
  const calculateTimeLeft = () => {
    const birthday = new Date("2025-08-10T00:00:00"); // 🎯 Replace with actual birthday
    const now = new Date();
    const diff = birthday - now;

    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isBirthday: true,
      };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isBirthday: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎉 Countdown to Your Birthday! 🎂</h1>
      {timeLeft.isBirthday ? (
        <h2 style={styles.birthday}>🎈 Happy Birthday! 🎈</h2>
      ) : (
        <div style={styles.countdown}>
          <TimeBox label="Days" value={timeLeft.days} />
          <TimeBox label="Hours" value={timeLeft.hours} />
          <TimeBox label="Minutes" value={timeLeft.minutes} />
          <TimeBox label="Seconds" value={timeLeft.seconds} />
        </div>
      )}
    </div>
  );
};

const TimeBox = ({ label, value }) => (
  <div style={styles.box}>
    <div style={styles.value}>{value}</div>
    <div>{label}</div>
  </div>
);

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    background: "linear-gradient(to right, #ffecd2, #fcb69f)",
    minHeight: "100vh",
    fontFamily: "Segoe UI, sans-serif",
    color: "#333",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "30px",
  },
  countdown: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  box: {
    background: "#fff",
    borderRadius: "10px",
    padding: "20px",
    width: "100px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  value: {
    fontSize: "2rem",
    color: "#e91e63",
  },
  birthday: {
    fontSize: "2rem",
    color: "#4CAF50",
    marginTop: "40px",
  },
};

export default BirthdayCountdown;
