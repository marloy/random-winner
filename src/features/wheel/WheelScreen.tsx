import { useWheelAnimation } from "./useWheelAnimation";
import styles from "./Wheel.module.css";

const WheelScreen = () => {
  const { spin, reelRef, list, winner, isSpinning } = useWheelAnimation();

  return (
    <div className={styles.fullscreen}>
      <div className={`${styles.viewport} ${isSpinning ? styles.shiftDown : ''}`}>
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
        className={`${isSpinning ? styles.hide : ''}`}
      >
        Вращать барабан!
      </button>
    </div>
  );
};

export default WheelScreen;
