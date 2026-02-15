import { useSelector } from "react-redux";
import type {RootState} from "./store";
import ParticipantsScreen from "../features/participants-input/ParticipantsScreen";
import WheelScreen from "../features/wheel/WheelScreen";

export default function App() {
  const participants = useSelector((state: RootState) => state.wheel.participants);

  return <>{participants.length === 0 ? <ParticipantsScreen /> : <WheelScreen />}</>;
}
