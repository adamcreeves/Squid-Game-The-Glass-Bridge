import { configureStore } from "@reduxjs/toolkit";
import { winnersReducer } from "./GameWinnersSlice";

export default configureStore({
  reducer: {
    winners: winnersReducer,
  },
});
