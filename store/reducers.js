import { createReducer } from "@reduxjs/toolkit";

const datainitialState = {
  data: [],
};

export const dataReducer = createReducer(datainitialState, {
  DATA: (state, action) => {
    state.data = action.payload;
  },
});
