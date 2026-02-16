import {useEffect} from "react";
import { useWheelAnimation } from "./useWheelAnimation";
import styles from "./Wheel.module.css";

const WheelScreen = () => {
  const { spin, reelRef, list, winner, isSpinning } = useWheelAnimation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      spin()
    }, 300)

    return () => clearTimeout(timeout)
  }, [spin]);

  return (
    <div className={styles.fullscreen}>
      <div className={styles.viewport}>
        <div className={styles.list} ref={reelRef}>
          {list.map((name, idx) => (
            <div
              key={idx}
              className={`${styles.item} ${name === winner ? styles.winnerGlow : ''}`}
            >
              {name}
            </div>
          ))}
        </div>
        <div className={styles.selector} />
      </div>
      <button
        disabled={isSpinning}
        onClick={spin}
      >
        Вращать барабан!
      </button>
    </div>
  );
};

export default WheelScreen;
