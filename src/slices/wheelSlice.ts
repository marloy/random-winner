// slices/wheelSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface WheelState {
  participants: string[];
  winner: string | null;
}

const initialState: WheelState = {
  participants: [],
  winner: null,
};

export const wheelSlice = createSlice({
  name: "wheel",
  initialState,
  reducers: {
    // SOLID: single responsibility - просто сохраняем список участников
    setParticipants: (state, action: PayloadAction<string[]>) => {
      state.participants = action.payload;
      state.winner = null;
    },
    setWinner: (state, action: PayloadAction<string>) => {
      state.winner = action.payload;
    },
  },
});

export const { setParticipants, setWinner } = wheelSlice.actions;
export default wheelSlice.reducer;
