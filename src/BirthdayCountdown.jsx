import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import confetti from "canvas-confetti";

const BirthdayCountdown = () => {
  const calculateTimeLeft = () => {
    const birthdaythisyear = new Date("2025-05-25T21:27:00");
    const now = new Date();
    const diff = birthdaythisyear - now;
    const diff2 = now - birthdaythisyear;

    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isBirthday: true,
        years2: 31,
        days2: 0,
        hours2: Math.floor((diff2 / (1000 * 60 * 60)) % 24),
        minutes2: Math.floor((diff2 / (1000 * 60)) % 60),
        seconds2: Math.floor((diff2 / 1000) % 60),
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
  const confettiCount = useRef(0);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTime = calculateTimeLeft();
      setTimeLeft(updatedTime);

      if (updatedTime.isBirthday && confettiCount.current < 5) {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
        });
        confettiCount.current += 1;
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className="container">
      {timeLeft.isBirthday ? (
        <>
          <div className="center">
            <h2 className="birthday">
              🎺 Happy Birthday! To The bestest Brother In this world 🎉
            </h2>

            <div className="birthday-section">
              <Cake />
              <div className="Age">
                <Agebox label="Years" value={timeLeft.years2} />
                <Agebox label="Days" value={timeLeft.days2} />
                <Agebox label="Hours" value={timeLeft.hours2} />
                <Agebox label="Minutes" value={timeLeft.minutes2} />
                <Agebox label="Seconds" value={timeLeft.seconds2} />
              </div>
            </div>

            <div className="special-message-container">
              <button
                className="special-message-button"
                onClick={() => setShowMessage(true)}
              >
                Special Message
              </button>
              {showMessage && (
                <div className="special-message-text">
                  🎁 You are not just a brother, you're my biggest blessing.
                  Thank you for always being there. Happy Birthday! ❤️
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="title">🎉 Countdown to Your Birthday! 🎂</h1>
          <div className="countdown">
            <TimeBox label="Days" value={timeLeft.days} />
            <TimeBox label="Hours" value={timeLeft.hours} />
            <TimeBox label="Minutes" value={timeLeft.minutes} />
            <TimeBox label="Seconds" value={timeLeft.seconds} />
          </div>
        </>
      )}
    </div>
  );
};

const TimeBox = ({ label, value }) => (
  <div className="box">
    <div className="value">{value}</div>
    <div className="label">{label}</div>
  </div>
);
const Agebox = ({ label, value }) => (
  <div className="box2">
    <div className="value1">{value}</div>
    <div className="label1">{label}</div>
  </div>
);

const Cake = () => (
  <div className="cake">
    <div className="plate"></div>
    <div className="layer layer-bottom"></div>
    <div className="layer layer-middle"></div>
    <div className="layer layer-top"></div>
    <div className="icing">
      <p>Himanshu</p>
    </div>
    <div className="drip drip1"></div>
    <div className="drip drip2"></div>
    <div className="drip drip3"></div>
    <div className="candle">
      <div className="flame"></div>
    </div>
  </div>
);

export default BirthdayCountdown;
