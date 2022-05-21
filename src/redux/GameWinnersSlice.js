import { createSlice } from "@reduxjs/toolkit";

export const GameWinnersSlice = createSlice({
  name: "gameWinners",
  initialState: {
    winners: {
      easyWinners: "",
      mediumWinners: "",
      hardWinners: "",
    },
  },
  reducers: {
    refreshWinners: (state, action) => {
      state.winners = action.payload;
    },
    getWinners: (state) => state.winners,
  },
});

export const { refreshWinners, getWinners } = GameWinnersSlice.actions;

export const { winnersReducer } = GameWinnersSlice.reducer;
