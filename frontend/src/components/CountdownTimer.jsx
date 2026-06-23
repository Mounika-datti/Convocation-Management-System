import { useEffect, useState } from "react";

function CountdownTimer() {
  const target = new Date("December 20, 2026 10:00:00").getTime();

  const [time, setTime] = useState(target - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(target - Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const days = Math.max(0, Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = Math.max(
    0,
    Math.floor((time / (1000 * 60 * 60)) % 24)
  );
  const minutes = Math.max(
    0,
    Math.floor((time / (1000 * 60)) % 60)
  );
  const seconds = Math.max(
    0,
    Math.floor((time / 1000) % 60)
  );

  return (
    <div className="flex justify-center gap-6 mt-8 text-white text-center">

      <div>
        <h1 className="text-4xl font-bold">{days}</h1>
        <p>Days</p>
      </div>

      <div>
        <h1 className="text-4xl font-bold">{hours}</h1>
        <p>Hours</p>
      </div>

      <div>
        <h1 className="text-4xl font-bold">{minutes}</h1>
        <p>Minutes</p>
      </div>

      <div>
        <h1 className="text-4xl font-bold">{seconds}</h1>
        <p>Seconds</p>
      </div>

    </div>
  );
}

export default CountdownTimer;