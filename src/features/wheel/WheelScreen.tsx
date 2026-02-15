import {memo} from "react";
import { useWheelAnimation } from "./useWheelAnimation";
import styles from "./Wheel.module.css";

const WheelScreen = memo(() => {
  const { spin, reelRef, list } = useWheelAnimation();

  return (
    <div className={styles.fullscreen}>
      <button onClick={spin}>Click</button>
      <div className={styles.viewport}>
        <div
          className={styles.list}
          ref={reelRef}
        >
          {
            list.map((name, idx) => (
              <div
                key={idx}
                className={`${styles.item}`}
              >
                {name}
              </div>
            ))
          }
        </div>
        <div className={styles.selector} />
      </div>
    </div>
  );
})

export default WheelScreen;
