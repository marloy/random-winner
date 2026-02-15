import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface WheelState {
  participants: string[];
  winner: string | null;
  isSpinning: boolean;
}

const initialState: WheelState = {
  participants: [],
  winner: null,
  isSpinning: false,
};

export const wheelSlice = createSlice({
  name: "wheel",
  initialState,
  reducers: {
    setParticipants: (state, action: PayloadAction<string[]>) => {
      state.participants = action.payload;
    },
    setWinner: (state, action: PayloadAction<string | null>) => {
      state.winner = action.payload;
      state.isSpinning = false;
    },
    startSpin: (state) => {
      state.winner = null;
      state.isSpinning = true;
    },
  },
});

export const { setParticipants, setWinner, startSpin } = wheelSlice.actions;
export default wheelSlice.reducer;
