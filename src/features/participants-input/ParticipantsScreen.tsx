import { useState } from "react";
import { useDispatch } from "react-redux";
import { setParticipants } from "../../slices/wheelSlice";
import styles from "./Participants.module.css";

export default function ParticipantsScreen() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const handleStart = () => {
    const names = value
      .split(/\r?\n/)
      .map((line) => line.trim().replace(/\s+/g, " "))
      .filter((line) => line.length > 0);

    if (names.length < 2) {
      alert("Введите минимум 2 участника");
      return;
    }

    dispatch(setParticipants(names));
  };

  return (
    <div className={styles.fullscreen}>
      <div className={styles.card}>
        <h1>Имена участников</h1>
        <textarea
          placeholder={`Иванов Иван Иванович
Петров Петр Петрович
Сидоров Сергей Андреевич`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleStart}>Далее</button>
      </div>
    </div>
  );
}
